import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService,
              private fb: FormBuilder,  
              private router: Router) { 

  this.loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  }); 
               }

  ngOnInit() {
  }

  onLogin(): void {

    this.authService
    .login(this.loginForm.value.username, this.loginForm.value.password)
    .subscribe((user) => {
      if(user.isBlocked == "false"){
        console.log('LOGIN SUCCESS');
        console.log(user);
        this.router.navigateByUrl('courses/list');
      }
    }, (error) => {
      console.error(error);
      alert("Incorrect username/password!!!")
    });
  }
}
