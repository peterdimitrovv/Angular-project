import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import UserInterface from '../models/user.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import UsersService from '../users.service';

@Component({
  selector: 'app-users-card',
  templateUrl: './users-card.component.html',
  styleUrls: ['./users-card.component.css']
})
export class UsersCardComponent implements OnInit {

  @Input() user: UserInterface;
  @Output() onDelete: EventEmitter<number> = new EventEmitter();

  @Input() isAdmin: boolean = false;
  @Input() loggedUserId: number;
  loggedUser: UserInterface;

  constructor(private router: Router,
    private usersService: UsersService,
    private authService: AuthService) { 
    this.loggedUser = this.authService.getLoggedUser();
  }
      
  ngOnInit() {
  }

  getUserImage(){
    return this.user.picture + "?random=" + this.user.id;
  }

  onDeleteClicked() {
    const role = this.authService.getLoggedUser().role;
    if(role === "admin"){
      this.onDelete.emit(this.user.id);
    }
    else{
      alert ("You are not admin! You are not allowed to delete users!");
    }
  }

  onUserEdit() { 
    const role = this.authService.getLoggedUser().role;
    if(role === "admin"){
      this.router.navigate(['users/add', this.user.id]);
    }
    else{
      alert ("You are not admin! You are not allowed to edit users");
    }
  }

  onBlockClicked(){
    const role = this.authService.getLoggedUser().role;

    if(role === "admin"){
      if(this.user.isBlocked=="true")
        this.user.isBlocked="false"; 
      else
        this.user.isBlocked="true";
    }
    else
    alert ("You are not admin");
    console.log(this.user.isBlocked);

    this.usersService.blockUser(this.user).subscribe(() => {
      console.log('SUCCESS RATE');
    });
  }

  get canManipulate(): boolean{
    return this.isAdmin && this.loggedUserId !== this.user.id;
  }

}
