import { PostgreConstants } from '@db/db.constants'
import { createProvider } from '@utils/createProvider.utils'


const { PORTFOLIO: { connect, repository, skills } } = PostgreConstants


export const SkillsProviders = createProvider([
  {
    connect: [connect],
    repository: repository,
    name: skills.name,
  },
])
