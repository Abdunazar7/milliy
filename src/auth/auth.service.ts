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
import { AdminService } from "../admin/admin.service";
import { AdminDocument } from "../admin/schemas/admin.schema";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { LoginDto } from "../admin/dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService
  ) {}

  private async genereteTokens(admin: AdminDocument) {
    const paylod = {
      id: admin._id,
      email: admin.email,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
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

  async registration(createadminDto: CreateAdminDto) {
    const candidate = await this.adminService.findAdminByEmail(
      createadminDto.email
    );
    if (candidate) {
      throw new ConflictException("Bunday foydalanuvchi majud");
    }

    const newadmin = await this.adminService.create(createadminDto);
    return newadmin;
  }

  async login(loginadminDto: LoginDto, res: Response) {
    const admin = await this.adminService.findAdminByEmail(loginadminDto.email);
    if (!admin) {
      throw new UnauthorizedException("Parol yoki email notog'ri");
    }
    const confirmPassword = await bcrypt.compare(
      loginadminDto.password,
      admin.password
    );
    if (!confirmPassword) {
      throw new UnauthorizedException("Parol yoki email notog'ri");
    }
    const { accessToken, refreshToken } = await this.genereteTokens(admin);

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    admin.refresh_token = hashedRefreshToken;
    await admin.save();

    res.cookie("refreshToken", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    return { message: "admin logged in", id: admin.id, accessToken };
  }

  async logout(refreshToken: string, res: Response) {
    const adminDate = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!adminDate) {
      throw new ForbiddenException("admin not varified");
    }
    const admin = await this.adminService.findOne(adminDate.id);
    if (!admin) {
      throw new BadRequestException("Notog'ri token");
    }
    admin.refresh_token = "";
    await admin.save();

    res.clearCookie("refreshToken");
    return {
      message: "admin Loged out",
    };
  }

  async refreshToken(adminId: string, refresh_token: string, res: Response) {
    const decodToken = await this.jwtService.decode(refresh_token);

    if (adminId !== decodToken["id"]) {
      throw new ForbiddenException("Ruxsat erilmagan id");
    }
    const admin = await this.adminService.findOne(adminId);

    if (!admin || !admin.refresh_token) {
      throw new ForbiddenException("Foribbden");
    }

    const { accessToken, refreshToken } = await this.genereteTokens(admin);
    admin.refresh_token = await bcrypt.hash(refreshToken, 7);
    await admin.save();

    res.cookie("refreshToken", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    return {
      message: "admin refreshed",
      accessToken,
    };
  }
}
