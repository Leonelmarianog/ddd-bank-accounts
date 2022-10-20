import { createTestAccount } from './helper/helper';

describe('Account', () => {
  it('should be able to withdraw money', () => {
    const account = createTestAccount({
      id: 1,
      accountId: '123456789',
      name: 'Main Account',
      owner: 'John Doe',
      balance: 1000,
    });

    const balanceBeforeWithdraw = account.balance;
    const withdrawAmount = 500;
    const balanceAfterWithdraw = balanceBeforeWithdraw - withdrawAmount;

    account.withdraw(withdrawAmount);

    expect(account.balance).toBe(balanceAfterWithdraw);
  });

  it('should be able to deposit money', () => {
    const account = createTestAccount({
      id: 1,
      accountId: '123456789',
      name: 'Main Account',
      owner: 'John Doe',
      balance: 1000,
    });

    const balanceBeforeDeposit = account.balance;
    const depositAmount = 500;
    const balanceAfterDeposit = balanceBeforeDeposit + depositAmount;

    account.deposit(depositAmount);

    expect(account.balance).toBe(balanceAfterDeposit);
  });
});
