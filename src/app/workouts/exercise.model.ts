export class Exercise {
    constructor(public name: string,public sets: number, public reps: number,
         public rest_time: number, public id: number, public isFinished:boolean = false, public weight: number) {}
}
