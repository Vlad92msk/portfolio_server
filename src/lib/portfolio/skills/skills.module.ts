import { Module } from '@nestjs/common'
import { DatabaseModule } from '@db/db.module'
import { SkillsProviders } from './providers/skills.providers'
import { SkillsService } from './skills.service'
import { SkillsResolver } from './skills.resolver'

@Module({
  imports: [DatabaseModule],
  providers: [...SkillsProviders, SkillsService, SkillsResolver],
  exports: [SkillsService],
})
export class SkillsModule {}
