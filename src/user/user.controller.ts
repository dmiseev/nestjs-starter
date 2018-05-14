import { Get, Controller, Post, Param, Body, Delete, Put, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get(':id')
    async findOne(@Param('id') id, @Res() res) {

        const user = await this.userService.findOne(id);
        res.status(HttpStatus.OK).json(user);
    }

    @Get()
    async findAll(@Res() res) {

        const data = await this.userService.findAll();

        res.set('X-Items-Count', data[1].toString());
        res.status(HttpStatus.OK).json(data[0]);
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto, @Res() res) {

        const user = await this.userService.create(createUserDto);
        res.status(HttpStatus.CREATED).json(user);
    }

    @Put(':id')
    async update(@Param('id') id, @Body() updateUserDto: UpdateUserDto, @Res() res) {

        const user = await this.userService.update(id, updateUserDto);
        res.status(HttpStatus.ACCEPTED).json(user);
    }

    @Delete(':id')
    async remove(@Param('id') id, @Res() res) {

        await this.userService.remove(id);
        res.status(HttpStatus.NO_CONTENT).json();
    }
}
