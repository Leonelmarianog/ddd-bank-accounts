import { BaseEntity } from '../../../common/domain/Base.entity';
import { MoneyTransfer } from './money-transfer.entity';

export class Account extends BaseEntity {
  accountId: string;

  name: string;

  owner: string;

  balance: number;

  deposits?: MoneyTransfer[];

  withdraws?: MoneyTransfer[];

  withdraw(money: number): this {
    this.balance = this.balance - money;
    return this;
  }

  deposit(money: number): this {
    this.balance = this.balance + money;
    return this;
  }
}
