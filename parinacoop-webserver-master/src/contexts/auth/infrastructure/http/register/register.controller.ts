import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUseCase } from '@/contexts/auth/application/register-use-case/register.use-case'; 
import { RegisterHttpDto } from './register.http-dto'; 

@Controller('auth')
export class RegisterController {
  constructor(private readonly registerUseCase: RegisterUseCase) {}

  @Post('register')
  async register(@Body() dto: RegisterHttpDto) {
    await this.registerUseCase.execute(dto);
    return { msg: 'Registro exitoso' };
  }
}