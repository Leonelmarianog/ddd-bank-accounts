import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateMoneyTransferRequest } from '../application/dto/create-money-transfer-request.dto';
import { MoneyTransferResponse } from '../application/dto/money-transfer-response.dto';
import { ServiceMapper } from '../application/mapper/service.mapper';
import { IAccountService } from '../application/service/account.service.interface';

@Controller('/api/transfers')
export class MoneyTransferController {
  constructor(
    @Inject('IAccountService')
    private readonly accountService: IAccountService,
    private readonly serviceMapper: ServiceMapper
  ) {}

  @Post('/transfer')
  async transferMoney(@Body() createMoneyTransferRequest: CreateMoneyTransferRequest): Promise<MoneyTransferResponse> {
    const transfer = await this.accountService.transferMoney(
      this.serviceMapper.fromCreateMoneyTransferRequestToMoneyTransfer(createMoneyTransferRequest)
    );
    return this.serviceMapper.fromMoneyTransferToMoneyTransferResponse(transfer);
  }
}
