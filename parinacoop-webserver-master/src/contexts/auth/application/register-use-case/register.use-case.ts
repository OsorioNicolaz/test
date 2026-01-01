import { Injectable } from '@/contexts/shared/dependency-injection/injectable';
import { UserRepository } from '../../domain/user.repository';

import { RegisterDto } from './register.dto';
import { HashingService } from '@/contexts/shared/providers/hashing.service';
import { rutToNumber } from '@/contexts/shared/utils/rut-utils';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly hashingService: HashingService,
  ) {}

  async execute(dto: RegisterDto): Promise<void> {
    const hashedPassword = await this.hashingService.hash(dto.password);

    const runNum = rutToNumber(dto.run);
    
    await this.userRepo.createUser({
      run: runNum,
      password: hashedPassword,
      // otros campos si es necesario
    });
  }
}