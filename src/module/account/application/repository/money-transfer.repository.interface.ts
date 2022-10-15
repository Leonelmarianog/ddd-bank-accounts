import { MoneyTransfer } from '../../domain/money-transfer.entity';

export interface IMoneyTransferRepository {
  create(moneyTransfer: MoneyTransfer): Promise<MoneyTransfer>;
}
