export class InvalidCepError extends Error {
  constructor() {
    super('CEP provided is invalid.')
  }
}
