import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    }

    async findAll(): Promise<[UserInterface[], number]> {
        return await this.userRepository.findAndCount();
    }

    async findOne(id): Promise<UserInterface> {

        const user = await this.userRepository.findOne(id);

        if (!user) {
            throw new HttpException('User with ID #' + id + ' not found.', HttpStatus.NOT_FOUND);
        }

        return user;
    }

    async create(createUserDto: CreateUserDto): Promise<UserInterface> {

        const user = User.register(
            createUserDto.email,
            bcrypt.hashSync(createUserDto.password, bcrypt.genSaltSync(10)),
            createUserDto.firstName,
            createUserDto.lastName,
        );

        return await this.userRepository.save(user);
    }

    async update(id, updateUserDto: UpdateUserDto): Promise<UserInterface> {

        const user = await this.userRepository.findOne(id);

        if (!user) {
            throw new HttpException('User with ID #' + id + ' not found.', HttpStatus.NOT_FOUND);
        }

        user.firstName = updateUserDto.firstName;
        user.lastName = updateUserDto.lastName;

        return await this.userRepository.save(user);
    }

    async remove(id) {

        const user = await this.userRepository.findOne(id);

        if (!user) {
            throw new HttpException('User with ID #' + id + ' not found.', HttpStatus.FORBIDDEN);
        }

        user.remove();
        this.userRepository.save(user);
    }
}
