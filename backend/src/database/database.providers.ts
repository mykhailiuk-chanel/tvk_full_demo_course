import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE } from '@/utils/constants';
import { User } from '@/users/entities/user.entity';

// ============== start CONSTANTS only section

require('dotenv').config();

const { 
    DB_TEST_HOST,
    DB_TEST_USERNAME,
    DB_TEST_PASSWORD,
    DB_TEST_DATABASE,
    DB_TEST_PORT 
} = process.env;

const MYSQL_DIALECT = "mysql";

// ============== end CONSTANTS only section

export const databaseProviders = [
    {
      provide: SEQUELIZE,
      useFactory: async () => {
        const sequelize = new Sequelize({
          dialect: MYSQL_DIALECT,
          host: DB_TEST_HOST,
          port: DB_TEST_PORT ? +DB_TEST_PORT : 3306, // Should be number
          username: DB_TEST_USERNAME,
          password: DB_TEST_PASSWORD,
          database: DB_TEST_DATABASE,
      });
  
        /**
         * Add Models Here
         * ===============
         */
        sequelize.addModels([
          User
        ]);
  
        // await sequelize.sync({ force: true }); //TODO: only for testing - When your application starts up, this deletes all tables including the data in them, and recreate them from scratch
        await sequelize.sync(); //TODO: This only creates new tables that don’t exist and if an existing table has changed it won’t update it. This is not recommended for production but it is suitable for development
        return sequelize;
      },
    },
  ];