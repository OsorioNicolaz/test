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

    // b) Dirección y comuna (usa la primera o principal, según tu modelo)
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
    
    // 2. Armar correo
    const mailBody = `
      Nueva solicitud recibida desde la web:
      RUN: ${dto.user_run}
      Nombre completo: ${profile?.names ?? ''} ${profile?.first_last_name ?? ''} ${profile?.second_last_name ?? ''}
      Teléfono: ${profile?.cellphone ?? ''}
      Email: ${profile?.email ?? ''}
      Dirección: ${address?.street ?? ''} #${address?.number ?? ''}, ${address?.commune_name ?? ''}

      Monto inicial: ${dto.initial_amount}
      Sexo: ${dto.sex}
      Ciudad: ${dto.city}
      Nacionalidad: ${dto.nationality}
      Educación: ${dto.education}
      Ocupación: ${dto.occupation}
      Estado civil: ${dto.marital_status}
      Departamento: ${dto.department}
      Block/condominio: ${dto.block_condo}
      Fecha de nacimiento: ${dto.birth_date}
      Otros...
        `.trim();
    
    await this.mailerService.sendMail({
      to: 'nicolas.osorio.aravena@alumnos.uta.cl', // Cambia al correo real destino
      subject: 'Nueva solicitud de apertura de cuenta de ahorro',
      text: mailBody,
    });

    return cuenta;
  }
}