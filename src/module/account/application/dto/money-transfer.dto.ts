import { MoneyTransferResult } from '../../domain/money-transfer-result.enum';

export class MoneyTransferDto {
  id: number;

  senderAccountId: string;

  receiverAccountId: string;

  amount: number;

  result: MoneyTransferResult;

  timestamp: Date;
}
