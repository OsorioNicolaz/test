import { Controller, Post, Body, Req } from '@nestjs/common';
import { Request } from 'express';
import { ContratoService } from './contrato.service';
import { AceptarContratoDto } from './aceptar-contrato.dto';

@Controller('contrato')
export class ContratoController {
  constructor(private contratoService: ContratoService) {}

  @Post('aceptar')
  async aceptarContrato(@Body() body: AceptarContratoDto, @Req() req: Request) {
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    if (Array.isArray(ip)) {
      ip = ip[0];
    }
    ip = ip ? ip.toString() : '';
    await this.contratoService.aceptarContrato(body.run, ip);
    return { ok: true };
  }
}