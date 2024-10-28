import { test as baseTest, APIRequestContext } from '@playwright/test';
import { UserService } from '../services/userService';
import dotenv from 'dotenv';

type TestFixtures = {
  request: APIRequestContext;
  userService: UserService;
};

const { BACKEND_HOST, BACKEND_PORT } = process.env;

const BASE_API_URL = `${BACKEND_HOST}:${BACKEND_PORT}` || "http://localhost:3053";

const test = baseTest.extend<TestFixtures>({
  // UserService fixtures
  userService: async ({ request }, use) => {
    const userService = new UserService(BASE_API_URL, request);
    await use(userService);
  }
});

export const backend = test;