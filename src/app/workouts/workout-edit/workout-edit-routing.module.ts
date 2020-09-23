import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkoutEditPage } from './workout-edit.page';

const routes: Routes = [
  {
    path: '',
    component: WorkoutEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutEditPageRoutingModule {}
