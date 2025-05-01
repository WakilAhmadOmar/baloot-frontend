export type ClientError<ExecCodes extends string | undefined = undefined> = {
  status: number
  statusText: string
  exception?: {
    message: string
    code?: ExecCodes
    errors?: Record<string, string[]>
  }
}