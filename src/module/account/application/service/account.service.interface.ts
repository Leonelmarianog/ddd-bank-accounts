import { Account } from '../../domain/account.entity';
import { MoneyTransfer } from '../../domain/money-transfer.entity';

export interface IAccountService {
  getAll(): Promise<Account[]>;

  getOneById(id: number): Promise<Account>;

  create(account: Account): Promise<Account>;

  update(id: number, updates: Account): Promise<boolean>;

  softDelete(id: number): Promise<boolean>;

  delete(id: number): Promise<boolean>;

  transferMoney(moneyTransfer: MoneyTransfer): Promise<MoneyTransfer>;
}
