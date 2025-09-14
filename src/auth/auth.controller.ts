import { CreateUserDto } from "src/user/dto/create-user.dto";
import { AuthService } from "./auth.service";
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { TokenDto } from "./dto/token.dto";
import { JwtNotAuthGuard } from "./jwt-not-auth.guard";
import { LoginUserDto } from "src/user/dto/login-user-dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Logs a user in and return an access token" })
  @ApiOkResponse({ type: TokenDto })
  @UseGuards(JwtNotAuthGuard)
  login(@Body() dto: LoginUserDto) {
    return this.authService.login(dto);
  }

  @Post("register")
  @ApiOperation({ summary: "Registers a user and return an access token" })
  @ApiOkResponse({ type: TokenDto })
  @UseGuards(JwtNotAuthGuard)
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }
}
