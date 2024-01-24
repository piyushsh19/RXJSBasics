// import { from, interval } from 'rxjs';
// import { reduce, take } from 'rxjs/operators';

// const numbers = [1, 2, 3, 4, 5];

// /*
//  * Reducer functions take the accumulated value (last return) 
//  * and current value, returning a new accumulated value. 
//  * You can think of this like a snowball rolling downhill, 
//  * collecting values over time.
//  */
// const totalReducer = (accumulator, currentValue) => {
//   return accumulator + currentValue;
// };

// /*
//  * Our reducer function is invoked on each emission and the accumulated
//  * value stored. On completion the current accumulated value is emitted.
//  * In this example we are supplying a seed value (initial accumulator) of 0
//  * as the second parameter.
//  */
// from(numbers)
//   .pipe(reduce(totalReducer, 0))
//   .subscribe(console.log);

// interval(1000)
//   .pipe(
//     /*
//      * Important! reduce only emits one value, the final accumulated value
//      * on completion. We are forcing completion by using the take operator.
//      * If you want to emit each new accumulated value, you will use the scan
//      * operator, which is the focus of the next lesson.
//      */
//     take(3),
//     reduce(totalReducer, 0)
//   )
//   .subscribe({
//     next: console.log,
//     complete: () => console.log('Complete!')
//   });

  

import { from, interval } from 'rxjs';
import { scan, map } from 'rxjs/operators';

const numbers = [1, 2, 3, 4, 5];


/*
 * scan is similar to reduce, except it emits each new acculumated
 * value as it occurs. This is great for managing state changes 
 * in your application over time.
 */
from(numbers)
  .pipe(scan((accumulator, currentValue) => {
    return accumulator + currentValue;
   }, 0))
  .subscribe(console.log);

const user = [
  { name: 'Brian', loggedIn: false, token: null },
  { name: 'Brian', loggedIn: true, token: 'abc' },
  { name: 'Brian', loggedIn: true, token: '123' }
];

/*
 * For instance, in this example we are building up an object 
 * as new entries are emitted. Using scan, you can create a redux-like
 * pattern with just one operator. In fact, early versions of @ngrx/store,
 * Angular's reactive redux solution, were not much more than this:
 * https://github.com/ngrx/store/blob/d3a786aecafcda9b81fe60215af5852aae9de3a5/src/store.ts#L22
 */
const state$ = from(user).pipe(scan((accumulator, currentValue) => {
    return { ...accumulator, ...currentValue }
  }, {})
);

/*
 * We could then use map to grab certain properties from our
 * state for display. As it stands, even if the name doesn't change 
 * the name will be emitted on any emissions from scan. In future lessons
 * we will see how to only emit unique values based on the previous
 * emission. We will also see how to share an execution path between 
 * subscribers when necessary.
 */
const name$ = state$.pipe(
  map((state: any) => state.name)
);

name$.subscribe(console.log);
