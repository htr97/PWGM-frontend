import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { EquipmentDetailComponent } from './equipment-detail/equipment-detail.component';
import { AuthGuard } from './guards/auth.guard';
import { InventoryFormComponent } from './inventory-form/inventory-form.component';
import { InventoryViewComponent } from './inventory-view/inventory-view.component';
import { MaintenanceCalendarComponent } from './maintenance-calendar/maintenance-calendar.component';
import { MaintenanceDetailComponent } from './maintenance-detail/maintenance-detail.component';
import { MaintenanceFormComponent } from './maintenance-form/maintenance-form.component';
import { MaintenanceOrdersComponent } from './maintenance-orders/maintenance-orders.component';
import { PaymentViewComponent } from './payment-view/payment-view.component';
import { PrincipalComponent } from './principal/principal.component';
import { ProblemViewComponent } from './problem-view/problem-view.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {path:'', redirectTo:'auth/login', pathMatch:'full' },
  {path:'auth', loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule)},
  {
    path:'',
    runGuardsAndResolvers:'always',
    canActivate: [AuthGuard],
    children: [
    {path:'principal',component:PrincipalComponent},
    {path:'inventory',component:InventoryViewComponent},
    {path: 'add-invItem',component:InventoryFormComponent},
    {path: 'add-maintenance', component:MaintenanceFormComponent},
    {path: 'maintenance-orders', component:MaintenanceOrdersComponent},
    {path: 'profile', component:ProfileViewComponent},
    {path: 'problems', component:ProblemViewComponent},
    {path: 'maintenance-detail', component:MaintenanceDetailComponent},
    {path: 'equipment-detail', component:EquipmentDetailComponent},
    {path: 'edit-profile', component:ProfileComponent},
    {path: 'maintenance-calendar', component:MaintenanceCalendarComponent},
    {path: 'payment-view', component:PaymentViewComponent}
    ]
  },
  {path: '**', redirectTo:'/principal', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
