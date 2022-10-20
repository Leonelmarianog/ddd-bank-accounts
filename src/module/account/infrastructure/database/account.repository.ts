import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { IAccountRepository } from '../../application/repository/account.repository.interface';
import { Account } from '../../domain/account.entity';
import { AccountEntity } from './entity/account.entity';
import { RepositoryMapper } from './mapper/repository.mapper';

@Injectable()
export class AccountRepository implements IAccountRepository {
  private readonly repository: Repository<AccountEntity>;

  constructor(private readonly dataSource: DataSource, private readonly repositoryMapper: RepositoryMapper) {
    this.repository = this.dataSource.getRepository(AccountEntity);
  }

  async getAll(): Promise<Account[]> {
    const accountEntities = await this.repository.find();
    return accountEntities.map((accountEntity) => this.repositoryMapper.fromAccountEntityToAccount(accountEntity));
  }

  async getOneById(id: number): Promise<Account> {
    const accountEntity = await this.repository.findOne({ where: { id } });

    if (!accountEntity) {
      return null;
    }

    return this.repositoryMapper.fromAccountEntityToAccount(accountEntity);
  }

  async getOneByAccountId(accountId: string): Promise<Account> {
    const accountEntity = await this.repository.findOne({ where: { accountId } });

    if (!accountEntity) {
      return null;
    }

    return this.repositoryMapper.fromAccountEntityToAccount(accountEntity);
  }

  async create(account: Account): Promise<Account> {
    const accountEntity = await this.repository.save(this.repositoryMapper.fromAccountToAccountEntity(account));
    return this.repositoryMapper.fromAccountEntityToAccount(accountEntity);
  }

  async update(id: number, updates: Account): Promise<boolean> {
    const { affected } = await this.repository.update(id, updates);

    if (affected === 0) {
      return false;
    }

    return true;
  }

  async softDelete(id: number): Promise<boolean> {
    const { affected } = await this.repository.softDelete(id);

    if (affected === 0) {
      return false;
    }

    return true;
  }

  async delete(id: number): Promise<boolean> {
    const { affected } = await this.repository.delete(id);

    if (affected === 0) {
      return false;
    }

    return true;
  }
}
