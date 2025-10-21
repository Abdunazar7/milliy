import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './schemas/chat.schema';
import { User, UserSchema } from '../user/schemas/user.schema';

@Module({
  imports: [
      MongooseModule.forFeature([
        {
          name: Chat.name,
          schema: ChatSchema,
        },
        {
          name: User.name,
          schema: UserSchema,
        },
      ]),
    ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
