import { BaseService } from './baseService';

export class UserService extends BaseService {
  constructor(baseURL: string, request: any) {
    super(baseURL, request, '/api/users');
  }

  async getAllUsers(): Promise<any[]> {
    return this.get('/');
  }

  async createNewUser(data: Record<string, any>): Promise<any> {
    return this.post('/', data);
  }

  async updateUser(id: number, data: Record<string, any>): Promise<any> {
    return this.put(`/${id}`, data);
  }

  async deleteUser(id: number): Promise<any> {
    return this.delete(`/${id}`);
  }
}