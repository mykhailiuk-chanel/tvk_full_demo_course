import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {IsOptional, IsString, IsEmail, IsBoolean, Matches, MinLength} from 'class-validator';
// import { IsUnique } from "@/utils/IsUnique";
// import { User } from "@/user/entities/user.entity";

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsString()
    @Matches(/^(?!\s)[^\s].*$/, {
        message: 'First name cannot be empty or contain only spaces',
    })
    first_name?: string;

    @IsOptional()
    @IsString()
    @Matches(/^(?!\s)[^\s].*$/, {
        message: 'Last name cannot be empty or contain only spaces',
    })
    last_name?: string;

    @IsOptional()
    @IsEmail({}, { message: 'Invalid email address' })
    // @IsUnique(User, 'email', { message: 'Email already exists!' })
    email?: string;

    @IsOptional()
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).*$/, {
        message:
            'Password must contain a letter, a number, and a special character',
    })
    password?: string;

    @IsOptional()
    @IsString()
    @Matches(/^(?!\s)[^\s]{3,}$/, {
        message: 'Login must contain at least 3 characters',
    })
    login?: string;

    @IsOptional()
    @IsString()
    profile_img?: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
