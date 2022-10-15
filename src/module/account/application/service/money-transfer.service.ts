import { MoneyTransfer } from '../../domain/money-transfer.entity';
import { IMoneyTransferRepository } from '../repository/money-transfer.repository.interface';
import { IMoneyTransferService } from './money-transfer.service.interface';
import { IAccountRepository } from '../repository/account.repository.interface';
import { SenderNotFoundException } from '../exception/sender-not-found.exception';
import { NotSufficientBalance } from '../exception/not-sufficient-balance.exception';
import { ReceiverNotFoundException } from '../exception/receiver-not-found.exception';
import { HttpException } from '@nestjs/common';
import { MoneyTransferResult } from '../../domain/money-transfer-result.enum';

export class MoneyTransferService implements IMoneyTransferService {
  constructor(
    private readonly moneyTransferRepository: IMoneyTransferRepository,
    private readonly accountRepository: IAccountRepository
  ) {}

  async transferMoney(moneyTransfer: MoneyTransfer): Promise<MoneyTransfer> {
    try {
      const sender = await this.accountRepository.getOneByAccountId(moneyTransfer.senderAccountId);

      if (!sender) {
        throw new SenderNotFoundException(moneyTransfer.senderAccountId);
      }

      const receiver = await this.accountRepository.getOneByAccountId(moneyTransfer.receiverAccountId);

      if (!receiver) {
        throw new ReceiverNotFoundException(moneyTransfer.receiverAccountId);
      }

      if (sender.balance < moneyTransfer.amount) {
        throw new NotSufficientBalance(moneyTransfer.senderAccountId);
      }

      sender.withdraw(moneyTransfer.amount);
      receiver.deposit(moneyTransfer.amount);

      await this.accountRepository.update(sender.id, sender);
      await this.accountRepository.update(receiver.id, receiver);

      moneyTransfer.result = MoneyTransferResult.SUCCESSFUL;

      return this.moneyTransferRepository.create(moneyTransfer);
    } catch (error) {
      if (error instanceof HttpException) {
        moneyTransfer.result = MoneyTransferResult.FAILED;
        await this.moneyTransferRepository.create(moneyTransfer);
      }

      throw error;
    }
  }
}
