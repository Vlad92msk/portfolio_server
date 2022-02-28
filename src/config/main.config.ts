import { registerAs } from '@nestjs/config'

export default registerAs('main', () => ({
  host: process.env.CLIENT_HOST,
  port: process.env.SERVER_PORT,
}));
