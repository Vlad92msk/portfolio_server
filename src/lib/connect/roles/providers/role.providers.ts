import { PostgreConstants } from '@db/db.constants'
import { createProvider } from '@utils/createProvider.utils'

const { CONNECT_DB: { connect, repository, roles } } = PostgreConstants


export const RolesProviders = createProvider([
  {
    connect: [connect],
    repository: repository,
    name: roles.name,
  },
])
