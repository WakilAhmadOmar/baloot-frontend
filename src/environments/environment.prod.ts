import { Environment } from "./environment.schema"

class Env implements Environment {
  apiUrl = "https://api.ads.raha.af"
  mediaUrl = "https://cdn.dev.removie.raha.af/ads"
  NextAuthSecret = "65IZRyEYOKS48W22I+gGxZed7oyo1FNkwthPA8RcaA0="
  NextAuthUrl = "http://localhost:3000"
  enableSecureCookie=true
}

const env = new Env()

export default env
