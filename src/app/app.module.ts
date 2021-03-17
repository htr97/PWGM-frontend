import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MatDatepickerModule} from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { InventoryViewComponent } from './inventory-view/inventory-view.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PrincipalComponent } from './principal/principal.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { InventoryFormComponent } from './inventory-form/inventory-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MaintenanceFormComponent } from './maintenance-form/maintenance-form.component';
import { MaintenanceOrdersComponent } from './maintenance-orders/maintenance-orders.component';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProblemFormComponent } from './problem-form/problem-form.component';
import { ProblemViewComponent } from './problem-view/problem-view.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MaintenanceDetailComponent } from './maintenance-detail/maintenance-detail.component';
import { EquipmentDetailComponent } from './equipment-detail/equipment-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    InventoryViewComponent,
    PrincipalComponent,
    InventoryFormComponent,
    MaintenanceFormComponent,
    MaintenanceOrdersComponent,
    ProfileViewComponent,
    ProblemFormComponent,
    ProblemViewComponent,
    MaintenanceDetailComponent,
    EquipmentDetailComponent
  ],
  entryComponents:[ProblemFormComponent, MaintenanceDetailComponent,EquipmentDetailComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
