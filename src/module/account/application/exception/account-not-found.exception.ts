import { NotFoundException } from '@nestjs/common';

export class AccountNotFoundException extends NotFoundException {
  constructor(objectOrError?: any, description?: string) {
    super(objectOrError, description);
  }
}
