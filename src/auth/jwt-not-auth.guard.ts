import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtNotAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader: string = req.headers?.authorization;
    const bearer = authHeader?.split(" ")?.[0];
    const token = authHeader?.split(" ")?.[1];

    console.log(authHeader, bearer, token);

    if (bearer === "Bearer" && token) {
      try {
        const user = this.jwtService.verify(token);
        // Навіщо ми додаємо користувача у запит?
        req.user = user;
      } catch {
        return true;
      }
      throw new ForbiddenException(
        "This endpoint is available for unauthorized users"
      );
    }
    return true;
  }
}
