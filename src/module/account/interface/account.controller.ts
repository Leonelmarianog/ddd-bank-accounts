import { Body, Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { AccountResponse } from '../application/dto/account-response.dto';
import { CreateAccountRequest } from '../application/dto/create-account-request.dto';
import { UpdateAccountRequest } from '../application/dto/update-account-request.dto';
import { ServiceMapper } from '../application/mapper/service.mapper';
import { IAccountService } from '../application/service/account.service.interface';

@Controller('/api/accounts')
export class AccountController {
  constructor(
    @Inject('IAccountService')
    private readonly accountService: IAccountService,
    private readonly serviceMapper: ServiceMapper
  ) {}

  @Get('/')
  async getAll(): Promise<AccountResponse[]> {
    const accounts = await this.accountService.getAll();
    return accounts.map((account) => this.serviceMapper.fromAccountToAccountResponse(account));
  }

  @Get(':id')
  async getOneById(@Param('id') id: number): Promise<AccountResponse> {
    const account = await this.accountService.getOneById(id);
    return this.serviceMapper.fromAccountToAccountResponse(account);
  }

  @Post('/')
  async create(@Body() createAccountRequest: CreateAccountRequest): Promise<AccountResponse> {
    const account = await this.accountService.create(
      this.serviceMapper.fromCreateAccountRequestToAccount(createAccountRequest)
    );
    return this.serviceMapper.fromAccountToAccountResponse(account);
  }

  @Post(':id')
  async update(@Param('id') id: number, @Body() updateAccountRequest: UpdateAccountRequest): Promise<boolean> {
    return this.accountService.update(id, this.serviceMapper.fromUpdateAccountRequestToAccount(updateAccountRequest));
  }

  @Delete('/s/:id')
  async softDelete(@Param() id: number): Promise<boolean> {
    return this.accountService.softDelete(id);
  }

  @Delete('/h/:id')
  async delete(@Param() id: number): Promise<boolean> {
    return this.accountService.softDelete(id);
  }
}
