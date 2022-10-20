import { MoneyTransferResult } from '../../domain/money-transfer-result.enum';
import { AccountResponse } from './account-response.dto';

export class MoneyTransferResponse {
  id: number;

  senderAccountId: string;

  receiverAccountId: string;

  amount: number;

  result: MoneyTransferResult;

  timestamp: Date;

  senderAccount?: AccountResponse;

  receiverAccount?: AccountResponse;
}
