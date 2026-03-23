import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';

export const routes: Routes = [
  { path: 'home', component: MainComponent },
  { path: 'user/:id', component: MainComponent },
  { path: 'newuser', component: MainComponent },
  { path: 'updateuser/:id', component: MainComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];