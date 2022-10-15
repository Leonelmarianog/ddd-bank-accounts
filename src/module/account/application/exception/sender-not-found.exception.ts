import { NotFoundException } from '@nestjs/common';

export class SenderNotFoundException extends NotFoundException {
  constructor(objectOrError?: any, description?: string) {
    super(objectOrError, description);
  }
}
