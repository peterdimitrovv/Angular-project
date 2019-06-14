import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import UsersService from '../users/users.service';
import UserInterface from '../users/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private usersService: UsersService) { 

  }

  public isLogged(): boolean{
    return !!sessionStorage.getItem('userLogged');
  }

  public getLoggedUser(): UserInterface{
    return JSON.parse(sessionStorage.getItem('userLogged'));
  }

  public login(username: string, password: string): Observable<UserInterface>{
    return new Observable((o) => {
      this.usersService.getAllUsers().subscribe((users) => {
        const user = users.find(u => u.username === username && u.password === password);
      
       if(user){
         if(user.isBlocked == "false"){
          sessionStorage.setItem('userLogged', JSON.stringify(user));
          o.next(user);
          o.complete();
         }
         else{
           alert("You are blocked!");
         }
       }
       else{
         o.error("The username or/and password are incorrect. Please try again!");
       }
      });
    });
  }
}
