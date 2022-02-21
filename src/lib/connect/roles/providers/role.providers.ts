import { PostgreConstants } from '~server/db/db.constants'
import { createProvider } from '~server/utils'

const { CONNECT_DB: { connect, repository, roles } } = PostgreConstants


export const RolesProviders = createProvider([
  {
    connect: [connect],
    repository: repository,
    name: roles.name,
  },
])
