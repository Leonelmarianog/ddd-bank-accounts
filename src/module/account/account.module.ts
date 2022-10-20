import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceMapper } from './application/mapper/service.mapper';
import { AccountService } from './application/service/account.service';
import { MoneyTransferService } from './application/service/money-transfer.service';
import { AccountRepository } from './infrastructure/database/account.repository';
import { AccountEntity } from './infrastructure/database/entity/account.entity';
import { MoneyTransferEntity } from './infrastructure/database/entity/money-transfer.entity';
import { RepositoryMapper } from './infrastructure/database/mapper/repository.mapper';
import { MoneyTransferRepository } from './infrastructure/database/money-transfer.repository';
import { AccountController } from './interface/account.controller';
import { MoneyTransferController } from './interface/money-transfer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity, MoneyTransferEntity])],
  controllers: [AccountController, MoneyTransferController],
  providers: [
    ServiceMapper,
    RepositoryMapper,
    {
      provide: 'IAccountService',
      useClass: AccountService,
    },
    {
      provide: 'IAccountRepository',
      useClass: AccountRepository,
    },
    {
      provide: 'IMoneyTransferService',
      useClass: MoneyTransferService,
    },
    {
      provide: 'IMoneyTransferRepository',
      useClass: MoneyTransferRepository,
    },
  ],
})
export class AccountModule {}
