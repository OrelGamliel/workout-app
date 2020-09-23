import { Component, OnInit } from '@angular/core';
import { WorkoutsService } from './workouts.service';
import { Workout } from './workout.model';
import { DataStorageService } from '../shared/data-storage.service';


@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.page.html',
  styleUrls: ['./workouts.page.scss'],
})
export class WorkoutsPage implements OnInit {
  workouts: Workout[];

  constructor(private workoutsService: WorkoutsService,
              private dataStorageService: DataStorageService,
    ) { }
  
  ngOnInit() {
    this.workoutsService.fetchWorkouts();
    this.workoutsService.workoutsChanged.subscribe(
      (workouts: Workout[])=> {
        this.workouts = workouts
      }
    )
   this.workouts = this.workoutsService.getAllWorkouts();
  }
  putWorkouts(){
    this.dataStorageService.storeWorkouts();
  }
  fetchWorkouts(){
    this.dataStorageService.fetchWorkouts();
  }
}
