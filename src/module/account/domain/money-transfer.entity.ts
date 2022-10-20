import { BaseEntity } from '../../../common/domain/Base.entity';
import { Account } from './account.entity';
import { MoneyTransferResult } from './money-transfer-result.enum';

export class MoneyTransfer extends BaseEntity {
  senderAccountId: string;

  receiverAccountId: string;

  amount: number;

  result: MoneyTransferResult;

  senderAccount?: Account;

  receiverAccount?: Account;
}
