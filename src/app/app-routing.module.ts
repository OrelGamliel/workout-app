import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'workouts',
    pathMatch: 'full'
  },
  {
    path: 'workouts',
    children: [
      {
        path: '',
        loadChildren: () => import('./workouts/workouts.module').then(m => m.WorkoutsPageModule),

      },
      {
        path: 'new',
        loadChildren: () => import('./workouts/workout-edit/workout-edit.module').then(m => m.WorkoutEditPageModule),

      },
      {
        path: ':workoutId',
        children: [
          {
            path: '',
            loadChildren: () => import('./workouts/workout-detail/workout-detail.module').then(m => m.WorkoutDetailPageModule),
          },
          {
            path: 'edit',
            loadChildren: () => import('./workouts/workout-edit/workout-edit.module').then(m => m.WorkoutEditPageModule),
          },
          {
            path: 'timer',
            children: [
              {
                path: '',
                loadChildren: () => import('./timer/timer.module').then(m => m.TimerPageModule),
              },
              {
                path: ':exerciseId',
                loadChildren: () => import('./timer/timer.module').then(m => m.TimerPageModule),
              }
            ]
          }
        ]

      },
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
