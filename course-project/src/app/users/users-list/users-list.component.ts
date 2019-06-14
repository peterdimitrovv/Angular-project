import { Component, OnInit } from '@angular/core';
import UserInterface from '../models/user.model';
import UsersService from '../users.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: UserInterface[] = [];
  loggedUser: UserInterface;

  constructor(private usersService: UsersService,
              private router: Router,
              private authService: AuthService) {
    this.loggedUser = this.authService.getLoggedUser();
  }

  ngOnInit() {
    this.usersService.getAllUsers().subscribe((response) => {
      this.users = response;
    });
  }

  onItemDeleted(userId: number): void {
      const index = this.users.findIndex(u => u.id === userId);
      if(index !== -1){
        this.users.splice(index, 1);
        this.usersService.deleteUser(userId).subscribe(() => {
          console.log('USER DELETED');
        });
      }
    }

    onAddUser(): void{
      this.router.navigateByUrl('/users/add');
    }
}
