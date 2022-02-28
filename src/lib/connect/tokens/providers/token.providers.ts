import { PostgreConstants } from '@db/db.constants'
import { createProvider } from '@utils/createProvider.utils'

const { CONNECT_DB: { connect, repository, tokens } } = PostgreConstants

export const TokenProviders = createProvider([
  {
    connect: [connect],
    repository: repository,
    name: tokens.name,
  },
])
