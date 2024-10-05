import {Controller, Get, Post, Body, Param, Delete, HttpCode, Put} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users') // api/users/1 => 200 status
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  public async createUser(@Body() createUser: CreateUserDto) {
    return await this.usersService.createUser(createUser);
  }

  @Get()
  @HttpCode(200)
  public async getUsers(): Promise<User[]> {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  @HttpCode(200)
  public async getUser(@Param('id') id: string): Promise<User> {
    return await this.usersService.getUser(+id);
  }

  @Put(':id')
  @HttpCode(200)
  public async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(200)
  public async remove(@Param('id') id: string): Promise<{ message: string; statusCode: number }> {
    return await this.usersService.remove(+id);
  }
}
