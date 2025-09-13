import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/user/users.module";
import { CacheModule } from "@nestjs/cache-manager";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UserModule,
    JwtModule.register({
      secret: "SECRET",
      signOptions: {
        expiresIn: "24h",
      },
    }),
    CacheModule.register(),
  ],
})
export class AuthModule {}
