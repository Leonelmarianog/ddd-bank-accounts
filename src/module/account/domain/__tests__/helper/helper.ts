/* eslint-disable @typescript-eslint/ban-types */
import { Account } from '../../account.entity';

type OnlyAttributeKeys<Entity> = {
  [P in keyof Entity]: Entity[P] extends Function ? never : P;
}[keyof Entity];

type AccountProps = Pick<Account, OnlyAttributeKeys<Account>>;

export const createTestAccount = (props: AccountProps): Account => {
  const account = new Account();

  account.id = props.id;
  account.accountId = props.accountId;
  account.name = props.name;
  account.owner = props.owner;
  account.balance = props.balance;

  return account;
};
