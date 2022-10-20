import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { IMoneyTransferRepository } from '../../application/repository/money-transfer.repository.interface';
import { MoneyTransfer } from '../../domain/money-transfer.entity';
import { MoneyTransferEntity } from './entity/money-transfer.entity';
import { RepositoryMapper } from './mapper/repository.mapper';

@Injectable()
export class MoneyTransferRepository implements IMoneyTransferRepository {
  private readonly repository: Repository<MoneyTransferEntity>;

  constructor(private readonly dataSource: DataSource, private readonly repositoryMapper: RepositoryMapper) {
    this.repository = this.dataSource.getRepository(MoneyTransferEntity);
  }

  async create(moneyTransfer: MoneyTransfer): Promise<MoneyTransfer> {
    const moneyTransferEntity = await this.repository.save(
      this.repositoryMapper.fromMoneyTransferToMoneyTransferEntity(moneyTransfer)
    );
    return this.repositoryMapper.fromMoneyTransferEntityToMoneyTransfer(moneyTransferEntity);
  }
}
