import { Account } from '../../domain/account.entity';
import { MoneyTransfer } from '../../domain/money-transfer.entity';

export interface IAccountService {
  getAll(): Promise<Account[]>;

  getOneById(id: number): Promise<Account>;

  create(account: Account): Promise<Account>;

  update(id: number, updates: Account): Promise<Account>;

  softDelete(id: number): Promise<void>;

  delete(id: number): Promise<void>;

  transferMoney(moneyTransfer: MoneyTransfer): Promise<MoneyTransfer>;
}
