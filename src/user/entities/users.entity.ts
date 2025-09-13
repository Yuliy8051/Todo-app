import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";

export class UserEntity implements User {
  @ApiProperty({ example: 1, description: "User id in a database" })
  id: number;
  @ApiProperty({ example: "example@mail.com", description: "Email" })
  email: string;
  @ApiProperty({ example: "VeryStrongPassword123", description: "Password" })
  password: string;
}
