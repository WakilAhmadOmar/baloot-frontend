import { Environment } from "./environment.schema"

class Env implements Environment {
  apiUrl = "https://api.baloot.app/api/v1/graphql"
  mediaUrl = "https://api.baloot.app/api/v1/graphql"
  NextAuthSecret = "65IZRyEYOKS48W22I+gGxZed7oyo1FNkwthPA8RcaA0="
  NextAuthUrl = "http://localhost:3000"
  enableSecureCookie=true
}

const env = new Env()

export default env
