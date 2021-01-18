import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryFormComponent } from './inventory-form/inventory-form.component';
import { InventoryViewComponent } from './inventory-view/inventory-view.component';
import { PrincipalComponent } from './principal/principal.component';


const routes: Routes = [
  {path:'', redirectTo:'/auth', pathMatch:'full' },
  {path:'auth', loadChildren:'./auth/auth.module#AuthModule'},
  {path:'principal',component:PrincipalComponent},
  {path:'inventory',component:InventoryViewComponent},
  {path: 'add-invItem',component:InventoryFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
