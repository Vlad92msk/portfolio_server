import { Module } from '@nestjs/common'
import { DatabaseModule } from '@db/db.module'
import { UsersProviders } from './providers/user.providers'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { AuthGuard } from '../auth/guards/auth-guard'
import { RoleModule } from '@lib/connect/roles/role.module'

@Module({
  imports: [DatabaseModule, RoleModule],
  providers: [...UsersProviders, UserService, UserResolver, AuthGuard],
  exports: [UserService],
})
export class UserModule {}
