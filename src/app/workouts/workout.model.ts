import { Exercise } from './exercise.model';

type GuidToDo = string;

export interface Workout {
  id: GuidToDo;
  name: string;
  exercises: Exercise[];
}
