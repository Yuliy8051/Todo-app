import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { UserModule } from "./user/users.module";
import { AuthModule } from "./auth/auth.module";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
  ],
})
export class AppModule {}
