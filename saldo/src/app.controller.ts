import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'get-saldo' })
  getSaldo() {
    console.log('GET SALDO');
    return [];
  }

  @EventPattern('update-saldo')
  updateSaldo() {
    console.log('UPDATE SALDO');
    return [];
  }

  @EventPattern('create-saldo')
  createSaldo() {
    console.log('CREATE SALDO');
    return [];
  }

  @EventPattern('delete-saldo')
  deleteSaldo() {
    console.log('DELETE SALDO');
    return [];
  }
}
