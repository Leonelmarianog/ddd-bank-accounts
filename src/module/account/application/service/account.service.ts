import { Inject, Injectable } from '@nestjs/common';
import { Account } from '../../domain/account.entity';
import { MoneyTransfer } from '../../domain/money-transfer.entity';
import { AccountNotFoundException } from '../exception/account-not-found.exception';
import { IAccountRepository } from '../repository/account.repository.interface';
import { IAccountService } from './account.service.interface';
import { IMoneyTransferService } from './money-transfer.service.interface';

@Injectable()
export class AccountService implements IAccountService {
  constructor(
    @Inject('IAccountRepository')
    private readonly accountRepository: IAccountRepository,
    @Inject('IMoneyTransferService')
    private readonly moneyTransferService: IMoneyTransferService
  ) {}

  async getAll(): Promise<Account[]> {
    return this.accountRepository.getAll();
  }

  async getOneById(id: number): Promise<Account> {
    const account = await this.accountRepository.getOneById(id);

    if (!account) {
      throw new AccountNotFoundException(`Account with ID ${id} not found`);
    }

    return account;
  }

  async create(account: Account): Promise<Account> {
    return this.accountRepository.create(account);
  }

  async update(id: number, updates: Account): Promise<boolean> {
    return this.accountRepository.update(id, updates);
  }

  async softDelete(id: number): Promise<boolean> {
    return this.accountRepository.softDelete(id);
  }

  async delete(id: number): Promise<boolean> {
    return this.accountRepository.delete(id);
  }

  async transferMoney(moneyTransfer: MoneyTransfer): Promise<MoneyTransfer> {
    return this.moneyTransferService.transferMoney(moneyTransfer);
  }
}
