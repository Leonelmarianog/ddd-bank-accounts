import { Account } from '../../../domain/account.entity';
import { MoneyTransfer } from '../../../domain/money-transfer.entity';
import { AccountEntity } from '../entity/account.entity';
import { MoneyTransferEntity } from '../entity/money-transfer.entity';

export class RepositoryMapper {
  fromAccountEntityToAccount(accountEntity: AccountEntity): Account {
    const account = new Account();

    account.id = accountEntity.id;
    account.accountId = accountEntity.accountId;
    account.name = accountEntity.name;
    account.owner = accountEntity.owner;
    account.balance = accountEntity.balance;
    account.createdAt = accountEntity.createdAt;
    account.updatedAt = accountEntity.updatedAt;
    account.deletedAt = accountEntity.deletedAt;

    if (accountEntity.deposits) {
      account.deposits = accountEntity.deposits.map((deposit) => this.fromMoneyTransferEntityToMoneyTransfer(deposit));
    }

    if (accountEntity.withdraws) {
      account.withdraws = accountEntity.deposits.map((withdraw) =>
        this.fromMoneyTransferEntityToMoneyTransfer(withdraw)
      );
    }

    return account;
  }

  fromAccountToAccountEntity(account: Account): AccountEntity {
    const accountEntity = new AccountEntity();

    accountEntity.id = account.id;
    accountEntity.accountId = account.accountId;
    accountEntity.name = account.name;
    accountEntity.owner = account.owner;
    accountEntity.balance = account.balance;
    accountEntity.deposits = account.deposits;
    accountEntity.withdraws = account.withdraws;
    accountEntity.createdAt = account.createdAt;
    accountEntity.updatedAt = account.updatedAt;
    accountEntity.deletedAt = account.deletedAt;

    if (account.deposits) {
      accountEntity.deposits = account.deposits.map((deposit) => this.fromMoneyTransferToMoneyTransferEntity(deposit));
    }

    if (account.withdraws) {
      accountEntity.withdraws = account.withdraws.map((withdraw) =>
        this.fromMoneyTransferToMoneyTransferEntity(withdraw)
      );
    }

    return accountEntity;
  }

  fromMoneyTransferEntityToMoneyTransfer(moneyTransferEntity: MoneyTransferEntity): MoneyTransfer {
    const moneyTransfer = new MoneyTransfer();

    moneyTransfer.id = moneyTransferEntity.id;
    moneyTransfer.senderAccountId = moneyTransferEntity.senderAccountId;
    moneyTransfer.receiverAccountId = moneyTransferEntity.receiverAccountId;
    moneyTransfer.amount = moneyTransferEntity.amount;
    moneyTransfer.result = moneyTransferEntity.result;
    moneyTransfer.createdAt = moneyTransferEntity.createdAt;
    moneyTransfer.updatedAt = moneyTransferEntity.updatedAt;
    moneyTransfer.deletedAt = moneyTransferEntity.deletedAt;

    if (moneyTransferEntity.senderAccount) {
      moneyTransfer.senderAccount = this.fromAccountEntityToAccount(moneyTransferEntity.senderAccount);
    }

    if (moneyTransferEntity.receiverAccount) {
      moneyTransfer.receiverAccount = this.fromAccountEntityToAccount(moneyTransferEntity.receiverAccount);
    }

    return moneyTransfer;
  }

  fromMoneyTransferToMoneyTransferEntity(moneyTransfer: MoneyTransfer): MoneyTransferEntity {
    const moneyTransferEntity = new MoneyTransferEntity();

    moneyTransferEntity.id = moneyTransfer.id;
    moneyTransferEntity.senderAccountId = moneyTransfer.senderAccountId;
    moneyTransferEntity.receiverAccountId = moneyTransfer.receiverAccountId;
    moneyTransferEntity.amount = moneyTransfer.amount;
    moneyTransferEntity.result = moneyTransfer.result;
    moneyTransferEntity.createdAt = moneyTransfer.createdAt;
    moneyTransferEntity.updatedAt = moneyTransfer.updatedAt;
    moneyTransferEntity.deletedAt = moneyTransfer.deletedAt;

    if (moneyTransfer.senderAccount) {
      moneyTransferEntity.senderAccount = this.fromAccountToAccountEntity(moneyTransfer.senderAccount);
    }

    if (moneyTransfer.receiverAccount) {
      moneyTransferEntity.receiverAccount = this.fromAccountToAccountEntity(moneyTransfer.receiverAccount);
    }

    return moneyTransferEntity;
  }
}
