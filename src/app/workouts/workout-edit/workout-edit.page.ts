import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { WorkoutsService } from '../workouts.service';
import { formGroupInitializer } from 'src/app/shared/formType';
import { Exercise } from '../exercise.model';
import { Workout } from '../workout.model';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';


const params = {
  workoutId: 'workoutId'
}

@Component({
  selector: 'app-workout-edit',
  templateUrl: './workout-edit.page.html',
  styleUrls: ['./workout-edit.page.scss'],
})
export class WorkoutEditPage implements OnInit {
  id: string;
  workoutForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private workoutsService: WorkoutsService,
    //(possible go back method) private navCtrl:NavController,
    private _location: Location,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (paramMap: ParamMap) => {
        const workoutId = paramMap['workoutId'];
        if (workoutId != null) {
          this.id = workoutId;
        }
        this.initForm();
      }
    )
  }
  goback() {
    // (possible go back method) this.navCtrl.pop();
    this._location.back();
  }

  get editMode() {
    return this.id != null;
  }

  private initForm() {
    let workoutName = ''
    let WorkoutExercises = new FormArray([]);


    if (this.editMode) {
      const workout = this.workoutsService.getWorkout(this.id)
      workoutName = workout.name;
      if (workout['exercises']) {
        for (let exercise of workout.exercises) {
          WorkoutExercises.push(
            new FormGroup(formGroupInitializer<Exercise>({
              id: new FormControl(exercise.id),
              isFinished: new FormControl(exercise.isFinished),
              name: new FormControl(exercise.name, [
                Validators.required,
              ]),
              reps: new FormControl(exercise.reps, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ]),
              rest_time: new FormControl(exercise.rest_time, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ]),
              sets: new FormControl(exercise.sets, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ]),
            }))
          )
        }
      }
    }
    this.workoutForm = new FormGroup(formGroupInitializer<Workout>({
      id: new FormControl(this.id),
      name: new FormControl(workoutName, [
        Validators.required,
      ]),
      exercises: WorkoutExercises
    }));
  }

  get controls() {
    return (<FormArray>this.workoutForm.get('exercises')).controls;
  }

  onSubmit() {
    const newWorkout = this.workoutForm.value as Workout
    if (this.editMode) {
      this.workoutsService.updateWorkout(newWorkout)
    } else {
      this.workoutsService.addWorkout(newWorkout)
      this.router.navigate(['./workouts']);
    }
  }
  onAddExercise() {
    (<FormArray>this.workoutForm.get('exercises')).push(
      new FormGroup(formGroupInitializer<Exercise>({
        id: new FormControl((Math.floor(Math.random() * 100))),
        isFinished: new FormControl(false),
        name: new FormControl(null, Validators.required),
        reps: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
        rest_time: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
        sets: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      }))
    )
  }

  onDeleteExercise(index){
    (<FormArray>this.workoutForm.get('exercises')).removeAt(index);
  }

}
