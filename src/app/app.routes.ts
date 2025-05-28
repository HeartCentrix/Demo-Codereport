import { Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RequestResourceComponent } from './components/request-resource/request-resource.component';
import { ManageRequestComponent } from './components/manage-request/manage-request.component';

export const routes: Routes = [
    { path: 'sign-in', component: SignInComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'request-resource', component: RequestResourceComponent },
    { path: 'manage-request', component: ManageRequestComponent },
    // default and wildcard
    { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
    { path: '**', redirectTo: '/sign-in' }
];
