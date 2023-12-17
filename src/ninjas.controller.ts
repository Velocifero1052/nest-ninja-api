import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query, ValidationPipe
} from '@nestjs/common';
import { NinjasService } from './ninjas.service';
import { CreateNinjaDto } from './create-ninja.dto';
import { UpdateNinjaDto } from './update-ninja.dto';

@Controller('ninjas')
export class NinjasController {

  constructor(private readonly ninjaService: NinjasService) {}

  @Get()
  getNinjas(@Query('weapon') weapon: string): object {
    return this.ninjaService.getNinjas(weapon);
  }

  @Get(':id')
  getNinja(@Param('id', ParseIntPipe)id: number) : object {
    try {
      return this.ninjaService.getNinja(id);
    } catch(err) {
      throw new NotFoundException();
    }
  }

  @Post()
  createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    return this.ninjaService.createNinja(createNinjaDto);
  }

  @Put(':id')
  updateNinja(@Param('id', ParseIntPipe)id: number, @Body()updateNinjaDto: UpdateNinjaDto) {
    return this.ninjaService.updateNinja(id, updateNinjaDto);
  }

  @Delete(':id')
  deleteNinja(@Param('id', ParseIntPipe)id: number) {
    return this.ninjaService.removeNinja(id);
  }

}
