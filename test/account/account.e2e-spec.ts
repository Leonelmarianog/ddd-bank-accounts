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
import { CreateAccountRequest } from '../../src/module/account/application/dto/create-account-request.dto';
import { UpdateAccountRequest } from '../../src/module/account/application/dto/update-account-request.dto';

describe('Account - /api/account', () => {
  let app: INestApplication;

  const newAccountRequest: CreateAccountRequest = {
    accountId: '741852963',
    name: 'Main Account',
    owner: 'Richard Doe',
    balance: 1000,
  };

  let newAccountResponse: AccountResponse;

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

  describe('Get all [GET /api/accounts]', () => {
    it('returns an array of accounts', async () => {
      await request(app.getHttpServer())
        .get('/api/accounts')
        .expect(HttpStatus.OK)
        .then(({ body }) => {
          const expectedAccounts = expect.arrayContaining([
            expect.objectContaining<AccountResponse>({
              id: expect.any(Number),
              accountId: expect.any(String),
              name: expect.any(String),
              owner: expect.any(String),
              balance: expect.any(Number),
              timestamp: expect.any(String),
            }),
          ]);
          expect(body).toEqual(expectedAccounts);
        });
    });
  });

  describe('Get one by id [GET /api/accounts/:id]', () => {
    it('returns a specific account', async () => {
      await request(app.getHttpServer())
        .get('/api/accounts/1')
        .expect(HttpStatus.OK)
        .then(({ body }) => {
          const expectedAccount = expect.objectContaining<AccountResponse>({
            id: 1,
            accountId: expect.any(String),
            name: expect.any(String),
            owner: expect.any(String),
            balance: expect.any(Number),
            timestamp: expect.any(String),
          });

          expect(body).toEqual(expectedAccount);
        });
    });

    it("throw an error if account can't be found", async () => {
      await request(app.getHttpServer())
        .get('/api/accounts/9999')
        .expect(HttpStatus.NOT_FOUND)
        .then(({ body }) => {
          expect(body.message).toBe('Account with ID 9999 not found');
        });
    });
  });

  describe('Create [POST /api/accounts]', () => {
    it('creates an account', async () => {
      await request(app.getHttpServer())
        .post('/api/accounts')
        .send(newAccountRequest)
        .expect(HttpStatus.CREATED)
        .then(({ body }) => {
          const expectedAccount = expect.objectContaining<AccountResponse>({
            ...newAccountRequest,
            id: expect.any(Number),
            timestamp: expect.any(String),
          });

          expect(body).toEqual(expectedAccount);

          newAccountResponse = { ...body };
        });
    });
  });

  describe('Update [POST /api/accounts/:id]', () => {
    it('updates an account', async () => {
      const updates: UpdateAccountRequest = {
        accountId: '963852741',
        name: 'Extinguisher Account',
      };

      await request(app.getHttpServer())
        .post(`/api/accounts/${newAccountResponse.id}`)
        .send(updates)
        .expect(HttpStatus.CREATED)
        .then(({ text }) => {
          expect(text).toBe('true');
        });

      await request(app.getHttpServer())
        .get(`/api/accounts/${newAccountResponse.id}`)
        .expect(HttpStatus.OK)
        .then(({ body }) => {
          const expectedAccount = expect.objectContaining<AccountResponse>({
            ...(updates as AccountResponse),
            id: expect.any(Number),
            owner: expect.any(String),
            balance: expect.any(Number),
            timestamp: expect.any(String),
          });

          expect(body).toEqual(expectedAccount);
        });
    });

    it("returns false if account doesn't exist", async () => {
      const updates: UpdateAccountRequest = {
        accountId: '963852741',
        name: 'Extinguisher Account',
      };

      await request(app.getHttpServer())
        .post(`/api/accounts/9999`)
        .send(updates)
        .expect(HttpStatus.CREATED)
        .then(({ text }) => {
          expect(text).toBe('false');
        });
    });
  });

  describe('Soft delete [DELETE /api/accounts/s/:id]', () => {
    it('soft deletes an account', async () => {
      await request(app.getHttpServer())
        .delete(`/api/accounts/s/${newAccountResponse.id}`)
        .expect(HttpStatus.OK)
        .then(({ text }) => {
          expect(text).toBe('true');
        });
    });

    it("returns false if account doesn't exist", async () => {
      await request(app.getHttpServer())
        .delete(`/api/accounts/s/9999`)
        .expect(HttpStatus.OK)
        .then(({ text }) => {
          expect(text).toBe('false');
        });
    });
  });

  describe('Delete [DELETE /api/accounts/h/:id]', () => {
    it('hard deletes an account', async () => {
      await request(app.getHttpServer())
        .delete(`/api/accounts/h/${newAccountResponse.id}`)
        .expect(HttpStatus.OK)
        .then(({ text }) => {
          expect(text).toBe('true');
        });
    });

    it("returns false if account doesn't exist", async () => {
      await request(app.getHttpServer())
        .delete(`/api/accounts/h/9999`)
        .expect(HttpStatus.OK)
        .then(({ text }) => {
          expect(text).toBe('false');
        });
    });
  });
});
