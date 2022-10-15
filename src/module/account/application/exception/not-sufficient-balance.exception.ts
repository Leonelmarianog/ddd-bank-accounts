import { BadRequestException } from '@nestjs/common';

export class NotSufficientBalance extends BadRequestException {
  constructor(objectOrError?: any, description?: string) {
    super(objectOrError, description);
  }
}
