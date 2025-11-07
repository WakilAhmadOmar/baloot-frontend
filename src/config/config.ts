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

  get enableSecureCookie(): boolean {
    return this.env.enableSecureCookie
  }

}

export const appConfig = new AppConfig(env)
