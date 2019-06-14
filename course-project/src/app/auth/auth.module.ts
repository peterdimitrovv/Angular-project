import { NgModule } from "@angular/core";
import { AuthComponent } from './auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { routes } from './routes';


@NgModule({
    declarations: [AuthComponent, LoginComponent, RegistrationComponent],
    imports: [
        ReactiveFormsModule, 
        RouterModule.forChild(routes)
    ]
})

export class AuthModule {}