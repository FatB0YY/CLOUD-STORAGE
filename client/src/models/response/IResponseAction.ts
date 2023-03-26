export interface IResponseError {
  data: {
    errors: unknown[]
    message: string
  }
  status: number
}
