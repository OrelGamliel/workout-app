import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Workout } from '../workouts/workout.model';
import { WorkoutsService } from '../workouts/workouts.service';
import { Exercise } from '../workouts/exercise.model';
import { Howl } from 'howler';


const circleR = 80;
const circleDasharray = 2 * Math.PI  * circleR;


@Component({
  selector: 'app-timer',
  templateUrl: './timer.page.html',
  styleUrls: ['./timer.page.scss'],
})
export class TimerPage implements OnInit {

  time: BehaviorSubject<string> = new BehaviorSubject('00:00');
  percent: BehaviorSubject<number> = new BehaviorSubject(100);
 
  timer: number;
  interval;
  player: Howl = null;

  loadedWorkout: Workout;
  loadedExercise: Exercise
  startDuration = 1;
  loadedSets = 0;

  circleR = circleR;
  circleDasharray = circleDasharray;
  
  state: 'start' | 'stop' = 'stop';

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private workoutsService: WorkoutsService,
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
      //get exer
      this.activatedRoute.paramMap.subscribe(paramMap => {
        if (!paramMap.has('exerciseId')) {
          this.router.navigate(['./workouts']);
          return;
        }
        const exerciseId = +paramMap.get('exerciseId');
        this.loadedExercise = this.workoutsService.getExercise(this.loadedWorkout,exerciseId);
      });
    }

    
  startTimer(duration: number){
    this.loadedSets++;
    this.state = 'start';
    clearInterval(this.interval)
    this.timer = duration;
    this.updateTimeValue();
    this.interval = setInterval( ()=> {
      this.updateTimeValue();
    }, 1000)
  }

  stopTimer(){
    clearInterval(this.interval);
    this.time.next('00:00');
    this.state = 'stop';
  }

  percentageOffset(percent){
    const percentFloat = percent / 100;
    return circleDasharray * (1 - percentFloat);
  }
  updateTimeValue(){
    let minutes: any = this.timer / 60;
    let seconds: any = this.timer % 60;

    minutes = String('0' + Math.floor(minutes)).slice(-2);
    seconds = String('0' + Math.floor(seconds)).slice(-2);

    const timeText = minutes + ':' + seconds;
    this.time.next(timeText);

    const totalTime = this.startDuration;
    const percentage = ((totalTime - this.timer) / totalTime) * 100;
    this.percent.next(percentage);

    --this.timer;

    if(this.timer < 0) {
      this.loadedSets = 0;
      this.playSound();
      this.startTimer(this.startDuration)
    }
  }

  playSound(){
    this.player = new Howl({
      src: ['../assets/sounds/A-note.mp3']
    });
    this.player.play();
  }

  

}
