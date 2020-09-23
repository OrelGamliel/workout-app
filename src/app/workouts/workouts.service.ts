import { Injectable } from '@angular/core';
import { Workout } from './workout.model';
import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {
  workoutsChanged = new Subject<Workout[]>();
  // private workouts: Workout[] = [
  //   {
  //     id: '0',
  //     name: 'Basic',
  //     exercises: [
  //       new Exercise('pushups', 3, 10, 3, 1),
  //       new Exercise('mega-pushups', 3, 15, 45, 2)
  //     ]
  //   },
  //   {
  //     id: '1',
  //     name: 'adv',
  //     exercises: [
  //       new Exercise('pushupsz', 3, 10, 30, 1),
  //       new Exercise('mega-pushupsz', 3, 15, 45, 2)
  //     ]
  //   }
  // ]
  private workouts: Workout[] = [];
  constructor(private http: HttpClient) { }

  getAllWorkouts() {
    return this.workouts.slice();
  }
  setWorkouts(workouts) {
     this.workouts = workouts;
     this.workoutsChanged.next(this.workouts.slice());
  }
  getExercise(loadedWorkout: Workout, ExerciseId: number) {
    return {
      ...loadedWorkout.exercises.find(exercise => {
        return exercise.id === ExerciseId;
      })
    };
  }
  getWorkout(workoutId: string) {
    return {
      ...this.workouts.find(workout => {
        return workout.id === workoutId;
      })
    };
  }
  deleteWorkout(workoutId: string) {
    this.workouts = this.workouts.filter(workout => workout.id !== workoutId);
    this.workoutsChanged.next(this.workouts.slice())
  }
  addWorkout(workout: Workout) {
    workout.id = (Math.floor(Math.random() * 100)).toString(10); //todo generate guid
    this.workouts.push(workout);
    this.workoutsChanged.next(this.workouts.slice())
  }
  updateWorkout(newWorkout: Workout) {
    const index = this.workouts.findIndex(workout => workout.id === newWorkout.id);
    const updatedArray = [...this.workouts];
    updatedArray[index] = newWorkout;
    this.workouts = updatedArray;
    this.workoutsChanged.next(updatedArray)
  }
  storeWorkouts(){
    const workouts = this.getAllWorkouts();
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
      this.setWorkouts(workouts)
    });
  }
}
