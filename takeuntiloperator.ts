import { of, from } from 'rxjs';
import { distinctUntilChanged, distinctUntilKeyChanged, scan, map } from 'rxjs/operators';

// import { interval, fromEvent } from 'rxjs';
// import { scan, mapTo, takeWhile, takeUntil, tap } from 'rxjs/operators';


// // const counter$ = interval(1000);
// // const click$ = fromEvent(document, 'click');

// /*
//  * takeUntil lets you complete a stream based
//  * on when another stream emits a value. For instance,
//  * in this example our counter will run until the click$
//  * stream emits a value, at which point the observable
//  * will be completed.
//  */
// // counter$.pipe(
// //   takeUntil(click$)
// // ).subscribe(console.log);


// // elem refs
// const countdown = document.getElementById('countdown');
// const message = document.getElementById('message');
// const abortButton = document.getElementById('abort');

// // streams
// const counter$ = interval(1000);
// const abort$ = fromEvent(abortButton, 'click');

// counter$
//   .pipe(
//     mapTo(-1),
//     scan((accumulator, current) => {
//       return accumulator + current;
//     }, 10),
//     takeWhile(value => value >= 0),
//     /*
//      * When you want to complete a stream based on another
//      * stream you can use takeUntil. In this case, whenever
//      * our button click stream emits the observable will
//      * complete, letting us stop the countdown before
//      * it reaches zero.
//      */
//     takeUntil(abort$)
//   )
//   .subscribe((value: any) => {
//     countdown.innerHTML = value;
//     if (!value) {
//       message.innerHTML = 'Liftoff!';
//     }
//   });

const numbers$ = of(1, '1', 2, 3, 3, 3, 4, 5, 3);

/*
 * distinctUntilChanged emits unique values based
 * on a === comparison to the last emitted value.
 */
numbers$.pipe(distinctUntilChanged()).subscribe(console.log);

const user = [
  { name: 'Brian', loggedIn: false, token: null },
  { name: 'Brian', loggedIn: true, token: 'abc' },
  { name: 'Brian', loggedIn: true, token: '123' }
];

const state$ = from(user).pipe(
  scan((accumulator, currentValue) => {
    return { ...accumulator, ...currentValue };
  }, {})
);

const name$ = state$.pipe(
  /*
   * If comparing based on a property you can use
   * the distinctUntilKeyChanged helper operator instead.
   */
  // @ts-ignore
  distinctUntilKeyChanged('name'),
  /*
   * If you need to use a custom comparer, you can
   * pass distinctUntilChanged a comparer function.
   * ex. distinctUntilChanged((prev, curr) => {
   *   return prev.name === curr.name;
   * })
   */
  map((state: any) => state.name)
);

name$.subscribe(console.log);
