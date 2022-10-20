import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateAccountRequest } from './create-account-request.dto';

export class UpdateAccountRequest extends PartialType(OmitType(CreateAccountRequest, ['owner', 'balance'])) {}
