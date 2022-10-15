import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateAccountDto } from './create-account.dto';

export class UpdateAccountDto extends PartialType(OmitType(CreateAccountDto, ['owner', 'balance'])) {}
