import { Inject, Injectable } from '@nestjs/common';
import { CrearCuentaAhorroDto } from './new-cuenta-ahorro.dto';
import { NewCuentaAhorroRepository, NewCuentaAhorroRepositoryToken } from './domain/ports/new-cuenta-ahorro.repository';
import { MailerService } from '@nestjs-modules/mailer';
import { Database } from '@/database/database';

@Injectable()
export class NewCuentaAhorroService {
  constructor(
    @Inject(NewCuentaAhorroRepositoryToken)
    private readonly repo: NewCuentaAhorroRepository,
    private readonly mailerService: MailerService,
    private readonly db: Database,
  ) {}

  async crearCuentaAhorro(dto: CrearCuentaAhorroDto) {
    const cuenta = await this.repo.crearCuentaAhorro({
      ...dto,
      status: 'pendiente',
    });

    // 1. Traer datos extras del usuario (usar el run)
    const userRun = dto.user_run;

    // a) Perfil del cliente
    const profile = await this.db
      .selectFrom('client_profile')
      .select([
        'names',
        'first_last_name',
        'second_last_name',
        'cellphone',
        'email',
      ])
      .where('user_run', '=', userRun)
      .executeTakeFirst();

    // b) Dirección y comuna
    const address = await this.db
      .selectFrom('address')
      .innerJoin('commune', 'address.commune_id', 'commune.id')
      .select([
        'address.street',
        'address.number',
        'commune.name as commune_name',
      ])
      .where('address.user_run', '=', userRun)
      .executeTakeFirst();
    // 2. muestra no informado si no pone algun dato opcional
      const showValue = (val: any, fallback = 'No informado') =>
        val === undefined || val === null || val === '' ? fallback : val;
    
    // 3. Armar correo
    const mailBody = `
      Nueva solicitud recibida desde la web:

      Monto inicial: ${dto.initial_amount}
      RUN: ${dto.user_run}
      Nombre completo: ${profile?.names ?? ''} ${profile?.first_last_name ?? ''} ${profile?.second_last_name ?? ''}
      Fecha de nacimiento: ${new Date(dto.birth_date).toLocaleDateString('es-CL', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })}
      Sexo: ${dto.sex}
      Dirección: ${address?.street ?? ''} #${address?.number ?? ''}
      Departamento: ${showValue(dto.department)}
      Block/condominio: ${showValue(dto.block_condo)}
      Ciudad: ${dto.city}
      Comuna: ${address?.commune_name ?? ''}
      Nacionalidad: ${dto.nationality}
      Estudios: ${dto.education}
      Ocupación: ${dto.occupation}
      Teléfono: ${profile?.cellphone ?? ''}
      Estado civil: ${dto.marital_status}
      Email: ${profile?.email ?? ''}
        `.trim();
    
    await this.mailerService.sendMail({
      to: 'correodeEjemplo@gmail.com', // Correo a donde va a llegar la información, el remitente se encuentra en app.module.ts
      subject: 'Nueva solicitud de apertura de cuenta de ahorro',
      text: mailBody,
    });

    return cuenta;
  }
}