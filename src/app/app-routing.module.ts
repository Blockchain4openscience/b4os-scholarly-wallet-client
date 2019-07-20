import { CreateDiscoComponent } from './components/create-disco/create-disco.component';
import { AddRoComponent } from './components/add-ro/add-ro.component';
import { MainComponent } from './layouts/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: 'home', component: HomeComponent, data: {animation: 'Home'} },
      { path: 'add', component: AddRoComponent, data: {animation: 'NewRo'} },
      { path: 'bundle', component: CreateDiscoComponent, data: {animation: 'NewRo'} },
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path: '**',
    redirectTo: 'main/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
