import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import fs from 'fs';
import * as path from 'path';

type BaseURL = string;

const API_SCHEMA_FILEPATH = path.join(__dirname, `../utils/api`);

export class BaseService {
  private baseURL: BaseURL;
  private prefix: string;
  private apiContext: APIRequestContext;

  constructor(baseURL: BaseURL, apiContext: APIRequestContext, prefix = '') {
    this.baseURL = baseURL;
    this.prefix = prefix;
    this.apiContext = apiContext;
  }

  private buildURL(endpoint: string): string {
    return `${this.baseURL}${this.prefix}${endpoint}`;
  }

  private async validateResponse(response: APIResponse): Promise<JSON> { //TODO: what exactly should be returned?? JSON or object???
    // console.log("Response", response); // TODO: add debug in this line???
    await expect(response, `HTTP error! Status: 200 Status code was not displayed. Actual Status = ${response.status()}`).toBeOK();

    return response.json();
  }

  async verifyResponseBody(expectedResponseBodyParams: string, response: any[]): Promise<void> { 
    const keys = expectedResponseBodyParams.split(`#`)[0].split("|");
    for (let key of keys) {
      expect(response[0], `${key} was not present in`).toHaveProperty(key);
    }
  }

  async verifyResponseValue(response: object, responseKey: string, value: string): Promise<void> { 
    expect(response[responseKey], `${responseKey} is not equal to correct value ${value}`).toBe(value)
  }

  async readValuesFromTextFile(fileName: string): Promise<string> {
    const filePath = path.join(API_SCHEMA_FILEPATH, `${fileName}.txt`);

    try {
      // read file
      const content = fs.readFileSync(filePath, 'utf8');

      return content;
    }
    catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error(`File ${filePath} does not exist`);
      }
      throw new Error(`Error reading file ${filePath}: ${error.message}`);
    }
  }

  async get(endpoint: string): Promise<any[]> {
    const response = await this.apiContext.get(this.buildURL(endpoint));

    return await this.validateResponse(response);
  }

  async post(endpoint: string, data: Record<string, any>): Promise<object> {
    const response = await this.apiContext.post(this.buildURL(endpoint), {
      data,
    });
    return await this.validateResponse(response);    
  }

  async put(endpoint: string, data: Record<string, any>): Promise<object> {
    const response = await this.apiContext.put(this.buildURL(endpoint), {
      data,
    });
    return await this.validateResponse(response);
  }

  async delete(endpoint: string): Promise<object> {
    const response = await this.apiContext.delete(this.buildURL(endpoint));
    return await this.validateResponse(response);
  }
}