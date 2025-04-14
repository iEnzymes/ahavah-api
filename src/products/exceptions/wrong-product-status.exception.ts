export class WrongProductStatusException extends Error {
  constructor() {
    super('Wrong product status transition');
    this.name = 'WrongProductStatusExceptions';
  }
}
