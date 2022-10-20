import { Account } from '../../domain/account.entity';
import { MoneyTransfer } from '../../domain/money-transfer.entity';
import { AccountResponse } from '../dto/account-response.dto';
import { CreateAccountRequest } from '../dto/create-account-request.dto';
import { CreateMoneyTransferRequest } from '../dto/create-money-transfer-request.dto';
import { MoneyTransferResponse } from '../dto/money-transfer-response.dto';
import { UpdateAccountRequest } from '../dto/update-account-request.dto';

export class ServiceMapper {
  fromCreateAccountRequestToAccount(createAccountRequest: CreateAccountRequest): Account {
    const account = new Account();

    account.accountId = createAccountRequest.accountId;
    account.name = createAccountRequest.name;
    account.owner = createAccountRequest.owner;
    account.balance = createAccountRequest.balance;

    return account;
  }

  fromUpdateAccountRequestToAccount(UpdateAccountRequest: UpdateAccountRequest): Account {
    const account = new Account();

    account.accountId = UpdateAccountRequest.accountId;
    account.name = UpdateAccountRequest.name;

    return account;
  }

  fromAccountToAccountResponse(account: Account): AccountResponse {
    const accountResponse = new AccountResponse();

    accountResponse.id = account.id;
    accountResponse.accountId = account.accountId;
    accountResponse.name = account.name;
    accountResponse.owner = account.owner;
    accountResponse.balance = account.balance;
    accountResponse.timestamp = account.createdAt;

    if (account.deposits) {
      accountResponse.deposits = account.deposits.map((deposit) =>
        this.fromMoneyTransferToMoneyTransferResponse(deposit)
      );
    }

    if (account.withdraws) {
      accountResponse.withdraws = account.deposits.map((withdraws) =>
        this.fromMoneyTransferToMoneyTransferResponse(withdraws)
      );
    }

    return accountResponse;
  }

  fromCreateMoneyTransferRequestToMoneyTransfer(createMoneyTransferRequest: CreateMoneyTransferRequest): MoneyTransfer {
    const moneyTransfer = new MoneyTransfer();

    moneyTransfer.senderAccountId = createMoneyTransferRequest.senderAccountId;
    moneyTransfer.receiverAccountId = createMoneyTransferRequest.receiverAccountId;
    moneyTransfer.amount = createMoneyTransferRequest.amount;

    return moneyTransfer;
  }

  fromMoneyTransferToMoneyTransferResponse(moneyTransfer: MoneyTransfer): MoneyTransferResponse {
    const moneyTransferResponse = new MoneyTransferResponse();

    moneyTransferResponse.id = moneyTransfer.id;
    moneyTransferResponse.senderAccountId = moneyTransfer.senderAccountId;
    moneyTransferResponse.receiverAccountId = moneyTransfer.receiverAccountId;
    moneyTransferResponse.amount = moneyTransfer.amount;
    moneyTransferResponse.result = moneyTransfer.result;
    moneyTransferResponse.timestamp = moneyTransfer.createdAt;

    if (moneyTransfer.senderAccount) {
      moneyTransferResponse.senderAccount = this.fromAccountToAccountResponse(moneyTransfer.senderAccount);
    }

    if (moneyTransfer.receiverAccount) {
      moneyTransferResponse.senderAccount = this.fromAccountToAccountResponse(moneyTransfer.receiverAccount);
    }

    return moneyTransferResponse;
  }
}
