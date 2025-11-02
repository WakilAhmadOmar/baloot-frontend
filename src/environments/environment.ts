import { Environment } from "./environment.schema"

class Env implements Environment {
  apiUrl = "http://localhost:5000/api/v1/graphql"
  mediaUrl = "http://localhost:5000/api/v1/graphql"
  NextAuthSecret = "65IZRyEYOKS48W22I+gGxZed7oyo1FNkwthPA8RcaA0="
  NextAuthUrl = "http://localhost:3000"
  enableSecureCookie=true
}

const env = new Env()

export default env
