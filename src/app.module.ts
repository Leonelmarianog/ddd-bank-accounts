import { Module } from '@nestjs/common';
import { AccountModule } from './module/account/account.module';

@Module({
  imports: [AccountModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
