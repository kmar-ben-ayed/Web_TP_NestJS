import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import type { Request } from 'express';

@ApiTags('cv')
@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a CV for the connected user' })
  create(@Body() createCvDto: CreateCvDto, @Req() req: Request) {
    return this.cvService.createWithUser(createCvDto, (req as any).user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin gets all CVs, users get only their CVs' })
  findAll(@Req() req: Request) {
    return this.cvService.findAllForUser((req as any).user);
  }

  @Get('admin/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin-only endpoint to fetch all CVs' })
  findAllAsAdmin() {
    return this.cvService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get one CV if you are owner or admin' })
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.cvService.findOwnedOrThrow(+id, (req as any).user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update one CV if you are owner or admin' })
  update(@Param('id') id: string, @Body() updateCvDto: UpdateCvDto, @Req() req: Request) {
    return this.cvService.updateOwned(+id, updateCvDto, (req as any).user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete one CV if you are owner or admin' })
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.cvService.removeOwned(+id, (req as any).user);
  }
}
