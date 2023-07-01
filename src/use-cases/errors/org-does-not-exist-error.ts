export class OrgDoesNotExistsError extends Error {
  constructor() {
    super('Organization does not exist.')
  }
}
