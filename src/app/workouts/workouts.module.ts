import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutsPageRoutingModule } from './workouts-routing.module';
import { GoogleLoginComponent } from '../google-login/google-login.component';

import { WorkoutsPage } from './workouts.page';
import { LoadingSpinComponent } from '../shared/loading-spin/loading-spin.component';

@NgModule({
  imports: [
   
    CommonModule,
    FormsModule,
    IonicModule,
    WorkoutsPageRoutingModule,
    
  ],
  declarations: [WorkoutsPage,LoadingSpinComponent,GoogleLoginComponent]
})
export class WorkoutsPageModule {}
