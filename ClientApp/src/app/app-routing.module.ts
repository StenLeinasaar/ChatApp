import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEventComponent } from './add-event/add-event.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterToEventComponent } from './register-to-event/register-to-event.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch: 'full'},
  {path:'chat', component: HomeComponent},
  {path:'events', component: EventsComponent},
  {path:'events/add', component: AddEventComponent},
  {path:'events/register/:id', component: RegisterToEventComponent},
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignUpComponent},
  {path:'dashboard', component:DashboardComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
