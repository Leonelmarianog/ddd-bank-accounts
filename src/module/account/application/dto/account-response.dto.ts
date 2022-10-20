import { MoneyTransferResponse } from './money-transfer-response.dto';

export class AccountResponse {
  id: number;

  accountId: string;

  name: string;

  owner: string;

  balance: number;

  timestamp: Date;

  deposits?: MoneyTransferResponse[];

  withdraws?: MoneyTransferResponse[];
}
