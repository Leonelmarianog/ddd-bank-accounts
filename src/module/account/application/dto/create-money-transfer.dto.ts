import { IsString, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateMoneyTransferDto {
  @IsString()
  @IsNotEmpty()
  senderAccountId: string;

  @IsString()
  @IsNotEmpty()
  receiverAccountId: string;

  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
