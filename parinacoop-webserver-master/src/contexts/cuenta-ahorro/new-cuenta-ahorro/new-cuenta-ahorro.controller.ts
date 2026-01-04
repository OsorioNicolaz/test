import { Controller, Post, Body } from '@nestjs/common';
import { CrearCuentaAhorroDto } from './new-cuenta-ahorro.dto';
import { NewCuentaAhorroService } from './new-cuenta-ahorro.service';
import { Get, Req } from '@nestjs/common';
import { SavingsAccount } from '../domain/models/CuentaAhorro';
import { Request } from 'express';

@Controller('savings-account')
export class NewCuentaAhorroController {
  constructor(private readonly service: NewCuentaAhorroService) {}

  @Post()
  async crearCuentaAhorro(@Body() dto: CrearCuentaAhorroDto) {
    
    return await this.service.crearCuentaAhorro(dto);
  }

  @Get('savings-account/last')
  async getLastSavingsAccount(@Req() req: Request) {
  console.dir(req, { depth: null }); // Muestra todo el objeto en consola
  // Puedes devolver algo simple para evitar error de response
  return { ok: true };
  }
}