import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkoutsPage } from './workouts.page';

const routes: Routes = [
  {
    path: '',
    component: WorkoutsPage
  },
  {
    path: 'workout-detail',
    loadChildren: () => import('./workout-detail/workout-detail.module').then( m => m.WorkoutDetailPageModule)
  },
  {
    path: 'workout-edit',
    loadChildren: () => import('./workout-edit/workout-edit.module').then( m => m.WorkoutEditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutsPageRoutingModule {}
