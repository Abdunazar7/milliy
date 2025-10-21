import {
  BadRequestException,
  ConflictException,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcrypt";
import { Response } from "express";
import { UserService } from "../user.service";
import { UserDocument } from "../schemas/user.schema";
import { CreateUserDto } from "../dto/create-user.dto";
import { LoginDto } from "../../admin/dto/login.dto";
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  private async genereteTokens(user: UserDocument) {
    const paylod = {
      id: user._id,
      email: user.email,
      protection_2nd: user.protection_2nd,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(paylod, {
        secret: process.env.ACCESS_TOKEN_KEY as any,
        expiresIn: process.env.ACCESS_TOKEN_TIME as any,
      }),
      this.jwtService.sign(paylod, {
        secret: process.env.REFRESH_TOKEN_KEY as any,
        expiresIn: process.env.REFRESH_TOKEN_TIME as any,
      }),
    ]);
    return { accessToken, refreshToken };
  }

  async registration(createuserDto: CreateUserDto) {
    const candidate = await this.userService.findUserByEmail(
      createuserDto.email
    );
    if (candidate) {
      throw new ConflictException("Bunday foydalanuvchi majud");
    }

    const newuser = await this.userService.create(createuserDto);
    return newuser;
  }

  async login(loginuserDto: LoginDto, res: Response) {
    const user = await this.userService.findUserByEmail(loginuserDto.email);
    if (!user) {
      throw new UnauthorizedException("Parol yoki email notog'ri");
    }
    const confirmPassword = await bcrypt.compare(
      loginuserDto.password,
      user.password
    );
    if (!confirmPassword) {
      throw new UnauthorizedException("Parol yoki email notog'ri");
    }
    const { accessToken, refreshToken } = await this.genereteTokens(user);

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    user.refresh_token = hashedRefreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    return { message: "user logged in", id: user.id, accessToken };
  }

  async logout(refreshToken: string, res: Response) {
    const userDate = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userDate) {
      throw new ForbiddenException("user not varified");
    }
    const user = await this.userService.findOne(userDate.id);
    if (!user) {
      throw new BadRequestException("Notog'ri token");
    }
    user.refresh_token = "";
    await user.save();

    res.clearCookie("refreshToken");
    return {
      message: "user Loged out",
    };
  }

  async refreshToken(userId: string, refresh_token: string, res: Response) {
    const decodToken = await this.jwtService.decode(refresh_token);

    if (userId !== decodToken["id"]) {
      throw new ForbiddenException("Ruxsat erilmagan id");
    }
    const user = await this.userService.findOne(userId);

    if (!user || !user.refresh_token) {
      throw new ForbiddenException("Foribbden");
    }

    const { accessToken, refreshToken } = await this.genereteTokens(user);
    user.refresh_token = await bcrypt.hash(refreshToken, 7);
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    return {
      message: "user refreshed",
      accessToken,
    };
  }
}
