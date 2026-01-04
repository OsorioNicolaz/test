import { Controller, Post, Body } from '@nestjs/common';
import { CrearCuentaAhorroDto } from './new-cuenta-ahorro.dto';
import { NewCuentaAhorroService } from './new-cuenta-ahorro.service';

@Controller('savings-account')
export class NewCuentaAhorroController {
  constructor(private readonly service: NewCuentaAhorroService) {}

  @Post()
  async crearCuentaAhorro(@Body() dto: CrearCuentaAhorroDto) {
    
    return await this.service.crearCuentaAhorro(dto);
  }
}