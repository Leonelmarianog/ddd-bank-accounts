import { Column, Entity, Index, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../../../common/infrastructure/database/entity/base.entity';
import { MoneyTransferEntity } from './money-transfer.entity';

@Entity({ name: 'accounts' })
export class AccountEntity extends BaseEntity {
  @Index('account_id_idx', { unique: true })
  @Column({ name: 'account_id' })
  accountId: string;

  @Column()
  name: string;

  @Column()
  owner: string;

  @Column()
  balance: number;

  @OneToMany('MoneyTransferEntity', 'receiver')
  @JoinColumn({ name: 'account_id', referencedColumnName: 'senderAccountId' })
  deposits?: MoneyTransferEntity[];

  @OneToMany('MoneyTransferEntity', 'sender')
  @JoinColumn({ name: 'account_id', referencedColumnName: 'receiverAccountId' })
  withdraws?: MoneyTransferEntity[];
}
