import { IsNumber, IsNotEmpty, IsPositive, IsString, IsAlphanumeric } from 'class-validator';

export class CreateAccountRequest {
  @IsAlphanumeric()
  @IsNotEmpty()
  accountId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  owner: string;

  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  balance: number;
}
