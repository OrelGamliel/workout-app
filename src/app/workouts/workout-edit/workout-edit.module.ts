import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutEditPageRoutingModule } from './workout-edit-routing.module';

import { WorkoutEditPage } from './workout-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    WorkoutEditPageRoutingModule
  ],
  declarations: [WorkoutEditPage]
})
export class WorkoutEditPageModule {}
