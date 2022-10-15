import { NotFoundException } from '@nestjs/common';

export class ReceiverNotFoundException extends NotFoundException {
  constructor(objectOrError?: any, description?: string) {
    super(objectOrError, description);
  }
}
