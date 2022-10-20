import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../../../common/infrastructure/database/entity/base.entity';
import { MoneyTransferResult } from '../../../domain/money-transfer-result.enum';
import { AccountEntity } from './account.entity';

@Entity({ name: 'money_transfers' })
export class MoneyTransferEntity extends BaseEntity {
  @Column({ name: 'sender_account_id' })
  senderAccountId: string;

  @Column({ name: 'receiver_account_id' })
  receiverAccountId: string;

  @Column()
  amount: number;

  @Column()
  result: MoneyTransferResult;

  @ManyToOne('AccountEntity', 'withdraws', { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'sender_account_id', referencedColumnName: 'accountId' })
  senderAccount?: AccountEntity;

  @ManyToOne('AccountEntity', 'deposits', { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'receiver_account_id', referencedColumnName: 'accountId' })
  receiverAccount?: AccountEntity;
}
