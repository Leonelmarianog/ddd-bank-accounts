import { join } from 'path';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { loadFixtures } from '../../data/loader/fixture-loader';
import { dataSourceOptions } from '../../ormconfig';
import { AccountModule } from '../../src/module/account/account.module';
import { AccountResponse } from '../../src/module/account/application/dto/account-response.dto';
import { CreateMoneyTransferRequest } from '../../src/module/account/application/dto/create-money-transfer-request.dto';
import { MoneyTransferResponse } from '../../src/module/account/application/dto/money-transfer-response.dto';
import { MoneyTransferResult } from '../../src/module/account/domain/money-transfer-result.enum';

describe('MoneyTransfer - /api/transfer/transfer', () => {
  let app: INestApplication;

  beforeAll(() => {
    return loadFixtures(join(__dirname, '..', '..', 'data/fixtures'), join(__dirname, '..', '..', 'ormconfig.ts'));
  });

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
          ...dataSourceOptions,
          autoLoadEntities: true,
          logging: true,
        }),
        AccountModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      })
    );

    return app.init();
  });

  describe('Transfer money [GET /api/transfers/transfer]', () => {
    it('transfers money between two accounts', async () => {
      let senderAccount: AccountResponse;
      let receiverAccount: AccountResponse;
      const transferAmount = 500;

      await request(app.getHttpServer())
        .get('/api/accounts/1')
        .expect(HttpStatus.OK)
        .then(({ body }) => {
          senderAccount = { ...body };
        });

      await request(app.getHttpServer())
        .get('/api/accounts/2')
        .expect(HttpStatus.OK)
        .then(({ body }) => {
          receiverAccount = { ...body };
        });

      const moneyTransferRequest: CreateMoneyTransferRequest = {
        senderAccountId: senderAccount.accountId,
        receiverAccountId: receiverAccount.accountId,
        amount: transferAmount,
      };

      await request(app.getHttpServer())
        .post('/api/transfers/transfer')
        .send(moneyTransferRequest)
        .expect(HttpStatus.CREATED)
        .then(({ body }) => {
          const expectedMoneyTransfer = expect.objectContaining<MoneyTransferResponse>({
            id: expect.any(Number),
            senderAccountId: senderAccount.accountId,
            receiverAccountId: receiverAccount.accountId,
            amount: moneyTransferRequest.amount,
            result: MoneyTransferResult.SUCCESSFUL,
            timestamp: expect.any(String),
          });
          expect(body).toEqual(expectedMoneyTransfer);
        });

      await request(app.getHttpServer())
        .get('/api/accounts/1')
        .expect(HttpStatus.OK)
        .then(({ body }) => {
          const expectedAccount = expect.objectContaining({
            balance: senderAccount.balance - transferAmount,
          });
          expect(body).toEqual(expectedAccount);
        });

      await request(app.getHttpServer())
        .get('/api/accounts/2')
        .expect(HttpStatus.OK)
        .then(({ body }) => {
          const expectedAccount = expect.objectContaining({
            balance: receiverAccount.balance + transferAmount,
          });
          expect(body).toEqual(expectedAccount);
        });
    });

    it("throws an error if sender account can't be found", async () => {
      const senderAccountId = '999999999';
      let receiverAccount: AccountResponse;
      const transferAmount = 500;

      await request(app.getHttpServer())
        .get('/api/accounts/2')
        .expect(HttpStatus.OK)
        .then(({ body }) => {
          receiverAccount = { ...body };
        });

      const moneyTransferRequest: CreateMoneyTransferRequest = {
        senderAccountId,
        receiverAccountId: receiverAccount.accountId,
        amount: transferAmount,
      };

      await request(app.getHttpServer())
        .post('/api/transfers/transfer')
        .send(moneyTransferRequest)
        .expect(HttpStatus.NOT_FOUND)
        .then(({ body }) => {
          expect(body.message).toBe(`Sender account with ID ${senderAccountId} not found`);
        });
    });

    it("throws an error if receiver account can't be found", async () => {
      const receiverAccountId = '999999999';
      let senderAccount: AccountResponse;
      const transferAmount = 500;

      await request(app.getHttpServer())
        .get('/api/accounts/1')
        .expect(HttpStatus.OK)
        .then(({ body }) => {
          senderAccount = { ...body };
        });

      const moneyTransferRequest: CreateMoneyTransferRequest = {
        senderAccountId: senderAccount.accountId,
        receiverAccountId,
        amount: transferAmount,
      };

      await request(app.getHttpServer())
        .post('/api/transfers/transfer')
        .send(moneyTransferRequest)
        .expect(HttpStatus.NOT_FOUND)
        .then(({ body }) => {
          expect(body.message).toBe(`Receiver account with ID ${receiverAccountId} not found`);
        });
    });

    it("throws an error if sender doesn't have enough balance", async () => {
      let senderAccount: AccountResponse;
      let receiverAccount: AccountResponse;
      const transferAmount = 9999;

      await request(app.getHttpServer())
        .get('/api/accounts/1')
        .expect(HttpStatus.OK)
        .then(({ body }) => {
          senderAccount = { ...body };
        });

      await request(app.getHttpServer())
        .get('/api/accounts/2')
        .expect(HttpStatus.OK)
        .then(({ body }) => {
          receiverAccount = { ...body };
        });

      const moneyTransferRequest: CreateMoneyTransferRequest = {
        senderAccountId: senderAccount.accountId,
        receiverAccountId: receiverAccount.accountId,
        amount: transferAmount,
      };

      await request(app.getHttpServer())
        .post('/api/transfers/transfer')
        .send(moneyTransferRequest)
        .expect(HttpStatus.BAD_REQUEST)
        .then(({ body }) => {
          expect(body.message).toBe('Not enough balance to realize this operation');
        });
    });
  });
});
