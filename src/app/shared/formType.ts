import { AbstractControl, FormControl } from '@angular/forms';

//making sure every parameter is met in the exercise (T) type by passing each key in the exercise (T) and giving it an AbstractControl
//which is the parent of all the angular form classes and ensuring each key is that type
type FormType<T> = { [P in keyof T]: AbstractControl };

//making sure every parameter is met in the exercise (T) type
export function formGroupInitializer<T>(formControls:FormType<T>){
    return formControls;
}