import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { UserModule } from "./user/users.module";
import { AuthModule } from "./auth/auth.module";
import { AppController } from "./app.controller";

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UserModule, AuthModule],
})
export class AppModule {}
