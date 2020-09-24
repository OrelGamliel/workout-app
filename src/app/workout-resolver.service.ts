import { Injectable } from '@angular/core';
import { Workout } from './workouts/workout.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DataStorageService } from './shared/data-storage.service';
import { WorkoutsService } from './workouts/workouts.service';

@Injectable({
  providedIn: 'root'
})
export class WorkoutResolverService implements Resolve<Workout[]> {

  constructor(private dataStorageService: DataStorageService, private workoutsService: WorkoutsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const workouts = this.workoutsService.getAllWorkouts();
    if(workouts.length === 0){
      return this.dataStorageService.fetchWorkouts();
    }
    return workouts
  }
}
