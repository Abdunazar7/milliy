import { Body, Controller, Param, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import type { Response } from "express";
import { CookieGetter } from "../common/decorators/cookie.getter.decorator";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { LoginDto } from "../admin/dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post("registration")
  // registration(@Body() createUserDto: CreateAdminDto) {
  //   return this.authService.registration(createUserDto);
  // }

  @Post("login")
  login(
    @Body() loginUserDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.login(loginUserDto, res);
  }

  @Post("logout")
  logout(
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.logout(refreshToken, res);
  }

  @Post(":id/refresh")
  refresh(
    @Param("id") id: string,
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshToken(id, refreshToken, res);
  }
}
