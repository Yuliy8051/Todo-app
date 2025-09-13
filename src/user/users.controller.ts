import { Controller, Get, Param } from "@nestjs/common";
import { UserService } from "./users.service";
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { UserEntity } from "./entities/users.entity";

@Controller("users")
@ApiTags("Users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("email/:email")
  @ApiOperation({ summary: "Selection of a user by their email" })
  @ApiOkResponse({ type: UserEntity })
  @ApiParam({ name: "email", description: "Email" })
  findByEmail(@Param("email") email: string) {
    return this.userService.findByEmail(email);
  }
}
