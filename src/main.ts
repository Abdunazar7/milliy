import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import cookieParser from "cookie-parser";

async function start() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn"],
  });
  app.use(cookieParser());
  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Server start at: http://localhost:${PORT}`);
  });
}
start();
