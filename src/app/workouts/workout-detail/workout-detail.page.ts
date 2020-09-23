import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutsService } from '../workouts.service';
import { Workout } from '../workout.model';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-detail.page.html',
  styleUrls: ['./workout-detail.page.scss'],
})
export class WorkoutDetailPage implements OnInit {

  loadedWorkout: Workout;
  time: BehaviorSubject<string>;

  constructor(private activatedRoute: ActivatedRoute,
    private workoutsService: WorkoutsService,
    private router: Router,
    private alertController: AlertController,
    ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('workoutId')) {
        this.router.navigate(['./workouts']);
        return;
      }
      const workoutId = paramMap.get('workoutId');
      this.loadedWorkout = this.workoutsService.getWorkout(workoutId);
    });
  }
  onDeleteWorkout() {
    this.alertController.create({
      header: 'are you sure', message: 'are you sure you want to delete this', buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.workoutsService.deleteWorkout(this.loadedWorkout.id);
            this.router.navigate(['./workouts']);
          }
        }
      ]
    })
      .then(alertEl => {
        alertEl.present();
      })
  }


}
