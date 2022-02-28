import { Module } from '@nestjs/common'
import { DatabaseModule } from '@db/db.module'
import { UserService } from '@lib/connect/users/user.service'
import { RolesProviders } from './providers/role.providers'
import { RoleService } from './role.service'
import { RoleResolver } from './role.resolver'

@Module({
  imports: [DatabaseModule],
  providers: [...RolesProviders, RoleService, RoleResolver, UserService],
  exports: [RoleService],
})
export class RoleModule {}
