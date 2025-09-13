import { Module } from "@nestjs/common";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { DbModule } from "src/db/db.module";

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [DbModule],
  exports: [UserService],
})
export class UserModule {}
