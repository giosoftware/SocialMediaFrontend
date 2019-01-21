import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './commons/notfound/notfound.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { GuardService } from './services/guard.service';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [GuardService] },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user', component: UserComponent, canActivate: [GuardService] },
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
