import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkoutsService } from '../workouts/workouts.service';
import { Workout } from '../workouts/workout.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http:HttpClient,
    private workoutsService:WorkoutsService,
    ) { }

    storeWorkouts(){
      const workouts = this.workoutsService.getAllWorkouts();
      this.http.put('https://workout-app-orel.firebaseio.com/workouts.json', workouts).subscribe(response => {
        console.log(response)
      });
    }
    fetchWorkouts(){
      this.http
      .get<Workout[]>('https://workout-app-orel.firebaseio.com/workouts.json')
      .pipe(map(workouts => {
        return workouts.map(workout => {
          return {...workout, exercises: workout.exercises ? workout.exercises : []}
        });
      }))
      .subscribe(workouts => {
        this.workoutsService.setWorkouts(workouts)
      });
    }

}
