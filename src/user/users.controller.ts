import { Body, Controller, Get, HttpCode, Param, Post } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("email/:email")
  findByEmail(@Param("email") email: string) {
    return this.userService.findByEmail(email);
  }

  @Post()
  @HttpCode(201)
  save(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }
}
