import { expect } from '@playwright/test';
import { backend } from '../../src/fixtures/fixtures';
import { v4 as uuidv4 } from 'uuid';

const SERVISE_FILE_NAME = "getUsers";

let uuid = uuidv4();

const DEFAULT_USER_DATA = {
    first_name: "e2e_user",
    last_name: "e2e_lastname",
    login: `user_${uuid}`,
    profile_img: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=826",
    email: `e2e-user_${uuid}@gmail.com`,
    password: "pwdTest123$1"
};

let ASSERTION = {
    startNumber: 0,
    userId: 0,
};

backend.describe('[ Backend API tests ]: User service', {
    tag: ['@be-smoke'],
},
() => {
    backend.beforeAll(async ({ userService }) => {
        // Get list of all available users
        const users = await userService.getAllUsers();
        // [Verififcation 1] = result should be array of lessons
        expect(Array.isArray(users)).toBeTruthy();
        ASSERTION.startNumber = users.length;
        // ASSERTION.lastId = users[users.length - 1].id;
    });
    backend('Should be option to create a new user', async ({ userService }) => {
        const user = await userService.createNewUser(DEFAULT_USER_DATA);
        ASSERTION.userId = user?.id;
        // [Verififcation 3] = user should be created succesfully and return specific keys
        expect(user).toHaveProperty('id');
        expect(user.email).toBe(DEFAULT_USER_DATA.email);
        // [Verififcation 4] = After successfully creating a user, the list should increase by 1
        const users = await userService.getAllUsers();
        expect(users.length).toBe(ASSERTION.startNumber + 1);
    });
    backend('Verify that user list should return valid user schema', async ({ userService }) => {
        const users = await userService.getAllUsers();
        // [Verififcation 2] = lesson object should includes correct object keys (from getUsers.txt)
        const responseBodyParams = (await userService.readValuesFromTextFile(SERVISE_FILE_NAME));
        await userService.verifyResponseBody(responseBodyParams, users);
    });
    backend('Should be option to update existing user', async ({ userService }) => {
        const updateUser = {
            "last_name": "e2e_update_name"
        }
        const user = await userService.updateUser(ASSERTION.userId, updateUser);
        // [Verififcation 5] = user should be updated succesfully and return specific keys
        expect(user).toHaveProperty('id');
        expect(user.last_name).toBe(updateUser.last_name);
    });
    backend('Should be option to delete a user', async ({ userService }) => {
        const result = await userService.deleteUser(ASSERTION.userId);
        expect(result).toHaveProperty('message');
        expect(result.message).toBe('The user was successfully deleted');
    });
    // TODO: These tests are performed one after another if if workers = 1
});