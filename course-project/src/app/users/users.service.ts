import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import UserInterface from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export default class UsersService {

  user: UserInterface;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>("http://localhost:3000/users");
  }

  deleteUser(userId: number): Observable<any>{
    return this.http.delete(`http://localhost:3000/users/${userId}`);
  }

  addNewUser(user: UserInterface): Observable<any>{
    if (user.id){
      return this.http.put(`http://localhost:3000/users/${user.id}`, user);
    }
    return this.http.post('http://localhost:3000/users', user);
  }

  getById(userId: number): Observable<UserInterface>{
    return this.http.get<UserInterface>(`http://localhost:3000/users/${userId}`);
  }

  public blockUser(user: UserInterface): Observable<any> {
    return this.http.put(`http://localhost:3000/users/${user.id}`, user);
  }
}
