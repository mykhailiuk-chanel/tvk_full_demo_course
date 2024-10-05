import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
} from 'sequelize-typescript';

@Table
export class User extends Model<User> {
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    })
    public id: number;

    @Column({
        allowNull: false,
    })
    first_name: string;

    @Column({
        allowNull: false,
    })
    last_name: string;

    @Column({
        allowNull: true,
        defaultValue: '',
    })
    login: string;

    @Column({
        allowNull: true,
        defaultValue: '',
    })
    profile_img: string;

    @Column({
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    })
    email: string;

    @Column({
        allowNull: false,
    })
    password: string;

    @Column({
        allowNull: false,
        defaultValue: true,
    })
    isActive: boolean;

    @CreatedAt public createdAt: Date;

    @UpdatedAt public updatedAt: Date;

    @DeletedAt public deletedAt: Date;
}
