import env from "../environments/environment"
import { Environment } from "../environments/environment.schema"

class AppConfig {
  constructor(private readonly env: Environment) {}

  get apiUrl(): string {
    return this.env.apiUrl
  }
  get NextAuthSecret(): string {
    return this.env.NextAuthSecret
  }
  get mediaUrl(): string {
    return this.env.mediaUrl
  }
}

export const appConfig = new AppConfig(env)
