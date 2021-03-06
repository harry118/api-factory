import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Param,
  HttpException,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { ApiHeader, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

// import { User } from './user.entity';
import { CreateUserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('用户模块')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(`list`)
  @ApiOperation({ summary: '查询用户列表' })
  @ApiHeader({ name: 'token', required: true })
  getUsers(@Req() request: Request): any {
    console.log('请求用户列表==========');
    return this.userService.findAll();
  }

  @Post()
  @ApiOperation({ summary: '创建用户' })
  async createUser(
    @Req() request: Request,
    @Body() createUserDto: CreateUserDto,
  ): Promise<any> {
    const { name } = createUserDto;
    const existUser = await this.userService.findOneByName(name);
    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }
    return this.userService.createOne(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(`:id`)
  @ApiOperation({ summary: '查询用户' })
  @ApiParam({
    name: '用户Id',
    description: '用户Id的描述',
    required: true,
    example: '1',
  })
  getUserById(@Param('id') id: string): any {
    return this.userService.findOneById(id);
  }
}
