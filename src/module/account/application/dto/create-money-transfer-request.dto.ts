import { IsNumber, IsNotEmpty, IsPositive, IsAlphanumeric } from 'class-validator';

export class CreateMoneyTransferRequest {
  @IsAlphanumeric()
  @IsNotEmpty()
  senderAccountId: string;

  @IsAlphanumeric()
  @IsNotEmpty()
  receiverAccountId: string;

  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
