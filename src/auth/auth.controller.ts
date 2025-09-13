import { CreateUserDto } from "src/user/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: CreateUserDto) {
    return this.authService.login(dto);
  }

  @Post("register")
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }
}
