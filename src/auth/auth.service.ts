import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserService } from "src/user/users.service";
import { TokenDto } from "./dto/token.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  async login(dto: CreateUserDto) {
    const errMessage = "Email or password is incorrect";

    const user = await this.userService.findByEmail(dto.email);

    if (!user) {
      throw new BadRequestException(errMessage);
    }

    const isPassCorr = await bcrypt.compare(dto.password, user.password);
    if (!isPassCorr) {
      throw new BadRequestException(errMessage);
    }

    const token = this.generateToken(user);
    this.cacheToken(token);

    return token;
  }

  async register(dto: CreateUserDto) {
    const sol = 10;
    const encodedPassword = await bcrypt.hash(dto.password, sol);

    const user = await this.userService.create({
      ...dto,
      password: encodedPassword,
    });

    const token = this.generateToken(user);
    this.cacheToken(token);

    return token;
  }

  private generateToken(user: User) {
    const payload = { email: user.email, id: user.id, password: user.password };
    return new TokenDto(this.jwtService.sign(payload));
  }

  private cacheToken(token: TokenDto) {
    this.cacheManager.set("token", token.token);
  }
}
