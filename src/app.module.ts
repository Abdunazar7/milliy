import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminModule } from "./admin/admin.module";
import { UserModule } from "./user/user.module";
import { RegionModule } from "./region/region.module";
import { DistrictModule } from "./district/district.module";

import { ChenelModule } from "./chenel/chenel.module";
import { ChenelUserModule } from "./chanel-user/chanel-user.module";
import { EventModule } from "./event/event.module";
import { EventguestsModule } from "./eventguests/eventguests.module";
import { InvitationModule } from "./invitation/invitation.module";
import { GroupModule } from "./group/group.module";
import { GroupUserModule } from "./group-users/group-users.module";
import { RelationModule } from "./relation/relation.module";
import { ChatModule } from "./chat/chat.module";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    AdminModule,
    UserModule,
    RegionModule,
    DistrictModule,
    EventModule,
    EventguestsModule,
    InvitationModule,
    GroupModule,
    GroupUserModule,
    ChenelModule,
    ChenelUserModule,
    RelationModule,
    ChatModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
