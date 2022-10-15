import { Account } from '../../domain/account.entity';
import { MoneyTransfer } from '../../domain/money-transfer.entity';
import { IAccountRepository } from '../repository/account.repository.interface';
import { IAccountService } from './account.service.interface';
import { IMoneyTransferService } from './money-transfer.service.interface';

export class AccountService implements IAccountService {
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly moneyTransferService: IMoneyTransferService
  ) {}

  async getAll(): Promise<Account[]> {
    return this.accountRepository.getAll();
  }

  async getOneById(id: number): Promise<Account> {
    return this.accountRepository.getOneById(id);
  }

  async create(account: Account): Promise<Account> {
    return this.accountRepository.create(account);
  }

  async update(id: number, updates: Account): Promise<Account> {
    return this.accountRepository.update(id, updates);
  }

  async softDelete(id: number): Promise<void> {
    return this.accountRepository.softDelete(id);
  }

  async delete(id: number): Promise<void> {
    return this.accountRepository.delete(id);
  }

  async transferMoney(moneyTransfer: MoneyTransfer): Promise<MoneyTransfer> {
    return this.moneyTransferService.transferMoney(moneyTransfer);
  }
}
