import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'get-saldo' })
  getSaldo(@Payload() payload: {id: string}) {
    console.log('GET SALDO');
    return [];
  }

  @EventPattern('update-saldo')
  updateSaldo(@Payload() payload: {id: string}) {
    console.log('UPDATE SALDO');
    return [];
  }

  @EventPattern('create-saldo')
  createSaldo(@Payload() payload: {id: string}) {
    console.log('CREATE SALDO');
    return [];
  }

  @EventPattern('delete-saldo')
  deleteSaldo(@Payload() payload: {id: string}) {
    console.log('DELETE SALDO');
    return [];
  }
}
