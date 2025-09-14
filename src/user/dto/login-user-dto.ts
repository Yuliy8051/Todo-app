import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginUserDto {
  @ApiProperty({ example: "example@mail.com", description: "Email" })
  @IsString({ message: "Email must be a string" })
  @IsEmail({}, { message: "Email is invalid" })
  readonly email: string;
  @ApiProperty({ example: "VeryStrongPassword123", description: "Password" })
  readonly password: string;
}
