import { IsNumber, IsString, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CrearCuentaAhorroDto {
  @IsNumber()
  user_run!: number;

  @IsNumber()
  initial_amount!: number;

  @Type(() => Date)
  @IsDate()
  birth_date!: Date;

  @IsString()
  sex!: string;

  @IsOptional()
  @IsString()
  department?: number;

  @IsOptional()
  @IsString()
  block_condo?: string;

  @IsString()
  city!: string;

  @IsString()
  nationality!: string;

  @IsString()
  education!: string;

  @IsString()
  occupation!: string;

  @IsString()
  marital_status!: string;
}