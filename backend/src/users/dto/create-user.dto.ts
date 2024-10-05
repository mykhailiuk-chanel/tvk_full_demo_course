import {
    IsEmail,
    IsOptional,
    IsString,
    Matches,
    MinLength,
  } from 'class-validator';
  // import { IsUnique } from '@/utils/IsUnique'; //TODO: 
  // import { User } from '@/user/entities/user.entity';
  
  /**
   * DTO for creating a user.
   */
  export class CreateUserDto {
    /**
     * @description The email address of the user. It must be unique and valid.
     * @example "user@example.com"
     */
    @IsString({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email address' })
    // @IsUnique(User, 'email', { message: 'Email already exists!' })
    readonly email: string;
  
    /**
     * @description The first name of the user. Cannot be empty or contain only spaces.
     * @example "John"
     */
    @IsString({ message: 'First name is required' })
    @Matches(/^(?!\s)[^\s].*$/, {
      message: 'First name cannot be empty or contain only spaces',
    })
    readonly first_name: string;
  
    /**
     * @description The last name of the user. Cannot be empty or contain only spaces.
     * @example "Doe"
     */
    @IsString({ message: 'Last name is required' })
    @Matches(/^(?!\s)[^\s].*$/, {
      message: 'Last name cannot be empty or contain only spaces',
    })
    readonly last_name: string;
  
    /**
     * @description The password for the user's account. Must be at least 6 characters long and contain a letter, a number, and a special character.
     * @example "Passw0rd!"
     */
    @IsString({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).*$/, {
      message:
        'Password must contain a letter, a number, and a special character',
    })
    readonly password: string;
  
    /**
     * @description The login name of the user. Optional, but if provided, it must be at least 3 characters long and cannot contain only spaces.
     * @example "johndoe"
     */
    @IsOptional()
    @Matches(/^(?!\s)[^\s]{3,}$/, {
      message: 'Login must contain at least 3 characters',
    })
    readonly login?: string;
  
    /**
     * @description The profile image URL or path. Optional and can be null.
     * @example "https://example.com/profile.jpg"
     */
    @IsOptional()
    @IsString()
    readonly profile_img?: string;

    readonly isActive: boolean;
  }