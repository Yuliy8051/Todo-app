import { BadRequestException, Injectable } from "@nestjs/common";
import { DbService } from "src/db/db.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
  constructor(private readonly db: DbService) {}

  findByEmail(email: string) {
    return this.db.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async create(dto: CreateUserDto) {
    const candidate = await this.findByEmail(dto.email);

    if (candidate)
      throw new BadRequestException("User with this email already exists");

    return this.db.user.create({ data: dto });
  }
}
