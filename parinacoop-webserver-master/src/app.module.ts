import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './config/environment-variables.schema';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './contexts/auth/infrastructure/auth.module';
import { LocationModule } from './contexts/location/infrastructure/location.module';
import { HealthModule } from './health/health.module';
import { SharedModule } from './contexts/shared/shared.module';
import { ClientProfileModule } from './contexts/client-profile/infrastructure/client-profile.module';
import { DapModule } from './contexts/dap/infrastructure/dap.module';
import { ConfigModule } from './config/config.module';
import { AdminModule } from './contexts/admin/infrastructure/admin.module';
import { CuentaAhorroModule } from './contexts/cuenta-ahorro/infrastructure/cuenta-ahorro.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',  // Gmail: smtp.gmail.com (requiere configuración de App Password)
        port: 587,
        secure: false,                 // true para 465, false para 587
        auth: {
          user: 'nicolas.osorio.aravena@alumnos.uta.cl',
          pass: 'xkkmajhovxukyjmq', // Usa una App Password si tienes 2FA habilitado
        },
      },
      defaults: {
        from: '"No-Reply" <nicolas.osorio.aravena@alumnos.uta.cl>',
      },
    }),
    ConfigModule,
    DatabaseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        host: configService.get('DB_HOST'),
        database: configService.get('DB_NAME'),
        port: configService.get('DB_PORT'),
        user: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
      }),
    }),
    HealthModule,
    AdminModule,
    AuthModule,
    ClientProfileModule,
    DapModule,
    LocationModule,
    SharedModule,
    CuentaAhorroModule,
  ],
})
export class AppModule {}
