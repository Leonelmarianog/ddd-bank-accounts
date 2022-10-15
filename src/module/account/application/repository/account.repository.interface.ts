import { Account } from '../../domain/account.entity';

export interface IAccountRepository {
  getAll(): Promise<Account[]>;

  getOneById(id: number): Promise<Account>;

  getOneByAccountId(accountId: string): Promise<Account>;

  create(account: Account): Promise<Account>;

  update(id: number, updates: Account): Promise<Account>;

  softDelete(id: number): Promise<void>;

  delete(id: number): Promise<void>;
}
