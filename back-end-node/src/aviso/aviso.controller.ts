import { Controller, Get, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { AvisoService } from './aviso.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
@Controller('aviso')
export class AvisoController {
  constructor(private readonly avisoService: AvisoService) {}

  @Get()
  async getAvisos(
    @Req() req: any,
    @Res() res: Response,
    @CurrentUser() user: User,
  ) {
    await this.avisoService.getAvisos(res);
    console.log(user);
  }
}
