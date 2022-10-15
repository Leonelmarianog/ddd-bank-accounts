import { MoneyTransfer } from '../../domain/money-transfer.entity';

export interface IMoneyTransferService {
  transferMoney(moneyTransfer: MoneyTransfer): Promise<MoneyTransfer>;
}
