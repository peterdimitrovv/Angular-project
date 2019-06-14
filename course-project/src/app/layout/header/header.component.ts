import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged: boolean = false;

  constructor(private authService: AuthService) {
    this.isLogged = this.authService.isLogged(); 
  }

  ngOnInit() {
  }

  onLogout(){
    return sessionStorage.removeItem('userLogged');
  }

}
