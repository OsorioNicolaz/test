import { IsNotEmpty } from 'class-validator';

export class AceptarContratoDto {
  @IsNotEmpty()
  run!: number;
}