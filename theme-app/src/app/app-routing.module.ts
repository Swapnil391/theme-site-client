import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  LoginComponent} from "./pages/login/login.component";
import {  HomeComponent} from "./pages/home/home.component";
import { AccountComponent } from './pages/account/account.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { ViewProjectComponent } from './pages/view-project/view-project.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'account', component: AccountComponent },
  { path: 'user', component: UserDetailsComponent },
  { path: 'createproject', component: CreateProjectComponent },
  { path: 'viewproject', component: ViewProjectComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
