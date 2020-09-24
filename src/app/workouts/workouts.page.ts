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

  showSpinner = true;

  constructor(private workoutsService: WorkoutsService,
              private dataStorageService: DataStorageService,
    ) { }
  
  ngOnInit() {
    this.workoutsService.workoutsChanged.subscribe(
      (workouts: Workout[])=> {
        this.workouts = workouts
      }
    )
    this.dataStorageService.fetchWorkouts().subscribe((workouts)=>{
      this.workouts = workouts
      this.showSpinner = false;
    });
   
  }
  putWorkouts(){
    this.dataStorageService.storeWorkouts();
  }
  fetchWorkouts(){
    this.dataStorageService.fetchWorkouts().subscribe()
  }
}
