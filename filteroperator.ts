
import { of, fromEvent,interval } from 'rxjs';
import { scan,  take, map, first, mapTo, takeWhile, tap } from 'rxjs/operators';

const numbers$ = of(1, 2, 3, 4, 5);

/*
 * take emits the first x values from the source,
 * then completes. In this case, 1,2,3 will be emitted.
 */
numbers$.pipe(take(3)).subscribe({
  next: console.log,
  complete: () => console.log('Complete!')
});

const click$ = fromEvent(document, 'click');

/*
 * In this example, we will take the first value that matches
 * the provided criteria before completing. While we could use
 * a combination of filter(condition) and take(1), we can also 
 * use the first operator to fulfill the same use case. 
 * If you supply no values to first, it is equivalent to take(1).
 */
click$
  .pipe(
    map((event: any) => ({
      x: event.clientX,
      y: event.clientY
    })),
    // like filter(condition), take(1)
    first(({ y }) => y > 200)
  )
  .subscribe({
    next: console.log,
    complete: () => console.log('Complete!')
  });
  


/**
 */
// const click$ = fromEvent(document, 'click');

// click$
//   .pipe(
//     map((event: any) => ({
//       x: event.clientX,
//       y: event.clientY
//     })),
    /*
     * takeWhile emits values as long as they pass
     * the provided condition. As soon as the predicate
     * returns false, takeWhile completes the observable.
     * You can also pass an optional second parameter of true
     * if you want takeWhile to emit the value that caused
     * your condition to return false, before completing.
     */
  //   takeWhile(({ y }) => y <= 200, true)
  // )
  // .subscribe({
  //   next: console.log,
  //   complete: () => console.log('Complete!')
  // });


// elem refs
const countdown = document.getElementById('countdown');
const message = document.getElementById('message');

// streams
const counter$ = interval(1000);

counter$
  .pipe(
    mapTo(-1),
    scan((accumulator, current) => {
      return accumulator + current;
    }, 10),
    // proving the interval stops
    tap(console.log),
    /*
     * Instead of filter let's use takeWhile. This will
     * complete the observable and clean up the interval
     * once the countdown goes below zero, rather than 
     * just preventing the numbers from being emitted.
     */
    takeWhile(value => value >= 0)
  )
  .subscribe((value: any) => {
    // countdown.innerHTML = value;
    // if (!value) {
    //   message.innerHTML = 'Liftoff!';
    // }
  });
