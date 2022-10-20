import { MoneyTransfer } from '../../domain/money-transfer.entity';
import { IMoneyTransferRepository } from '../repository/money-transfer.repository.interface';
import { IMoneyTransferService } from './money-transfer.service.interface';
import { IAccountRepository } from '../repository/account.repository.interface';
import { NotSufficientBalance } from '../exception/not-sufficient-balance.exception';
import { ReceiverNotFoundException } from '../exception/receiver-not-found.exception';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { MoneyTransferResult } from '../../domain/money-transfer-result.enum';
import { SenderNotFoundException } from '../exception/sender-not-found.exception';

@Injectable()
export class MoneyTransferService implements IMoneyTransferService {
  constructor(
    @Inject('IMoneyTransferRepository')
    private readonly moneyTransferRepository: IMoneyTransferRepository,
    @Inject('IAccountRepository')
    private readonly accountRepository: IAccountRepository
  ) {}

  async transferMoney(moneyTransfer: MoneyTransfer): Promise<MoneyTransfer> {
    try {
      const sender = await this.accountRepository.getOneByAccountId(moneyTransfer.senderAccountId);

      if (!sender) {
        throw new SenderNotFoundException(`Sender account with ID ${moneyTransfer.senderAccountId} not found`);
      }

      const receiver = await this.accountRepository.getOneByAccountId(moneyTransfer.receiverAccountId);

      if (!receiver) {
        throw new ReceiverNotFoundException(`Receiver account with ID ${moneyTransfer.receiverAccountId} not found`);
      }

      if (sender.balance < moneyTransfer.amount) {
        throw new NotSufficientBalance('Not enough balance to realize this operation');
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
