import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {

  private url = 'https://peticiones.online/users';

  constructor(private http: HttpClient) {}

  getAll() { return this.http.get<any>(this.url); }
  getById(id: string) { return this.http.get<any>(`${this.url}/${id}`); }
  create(u: any) { return this.http.post(this.url, u); }
  update(id: string, u: any) { return this.http.put(`${this.url}/${id}`, u); }
  delete(id: string) { return this.http.delete(`${this.url}/${id}`); }
}