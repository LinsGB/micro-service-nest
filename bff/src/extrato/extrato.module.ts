import { Module } from '@nestjs/common';
import { ExtratoService } from './extrato.service';
import { ExtratoController } from './extrato.controller';
import { ClientsModule } from '@nestjs/microservices/module/clients.module';
import { Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EXTRATO_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'extrato-queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [ExtratoController],
  providers: [ExtratoService],
})
export class ExtratoModule {}
