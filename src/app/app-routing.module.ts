import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InventoryFormComponent } from './inventory-form/inventory-form.component';
import { InventoryViewComponent } from './inventory-view/inventory-view.component';
import { MaintenanceFormComponent } from './maintenance-form/maintenance-form.component';
import { MaintenanceOrdersComponent } from './maintenance-orders/maintenance-orders.component';
import { PrincipalComponent } from './principal/principal.component';


const routes: Routes = [
  {path:'', redirectTo:'/auth/login', pathMatch:'full' },
  {path:'auth', loadChildren:'./auth/auth.module#AuthModule'},
  {path:'principal',component:PrincipalComponent},
  {path:'inventory',component:InventoryViewComponent},
  {path: 'add-invItem',component:InventoryFormComponent},
  {path: 'add-maintenance', component:MaintenanceFormComponent},
  {path: 'maintenance-orders', component:MaintenanceOrdersComponent},
  {path: 'home', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
