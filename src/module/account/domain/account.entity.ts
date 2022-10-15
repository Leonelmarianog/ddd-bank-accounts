import { BaseEntity } from '../../../common/domain/Base.entity';

export class Account extends BaseEntity {
  accountId: string;

  name: string;

  owner: string;

  balance: number;

  withdraw(money: number): this {
    this.balance = this.balance - money;
    return this;
  }

  deposit(money: number): this {
    this.balance = this.balance + money;
    return this;
  }
}
