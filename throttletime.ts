
import { fromEvent } from 'rxjs';
import { map, throttleTime, tap } from 'rxjs/operators';

// const click$ = fromEvent(document, 'click');

// click$.pipe(
     /*
      * throttleTime will emit the first value, then ignore
      * values for the specified duration. After that duration
      * has passed, the next value from the source will be
      * emitted, with the previous behavior repeated.
      */
//   throttleTime(3000),
// ).subscribe(console.log);


/*
 * Calculate progress based on scroll position
 */
function calculateScrollPercent(element) {
  const { scrollTop, scrollHeight, clientHeight } = element;

  return (scrollTop / (scrollHeight - clientHeight)) * 100;
}

// elems
const progressBar: any = document.querySelector('.progress-bar');

// streams
const scroll$ = fromEvent(document, 'scroll');

const progress$ = scroll$.pipe(
  /*
   * For extremely active streams like scroll events,
   * throttleTime can be used to limit the number of emitted
   * values. In this case, we'll just update our scroll bar every
   * 30ms of scrolling.
   */
  throttleTime(30),
  /*
   * For every scroll event, we use our helper function to 
   * map to a current scroll progress value.
   */
  map(({ target }: any) => calculateScrollPercent(target.documentElement)),
  tap(console.log)
);
/*
 * We can then take the emitted percent and set the width
 * on our progress bar.
 */
progress$.subscribe(percent => {
  progressBar.style.width = `${percent}%`;
});


// import { fromEvent, interval } from 'rxjs';
// import { sample, sampleTime, map } from 'rxjs/operators';

// const click$ = fromEvent(document, 'click');
// const timer$ = interval(1000);

// click$
//   .pipe(
//     /*
//      * At the duration you specify, sample time will emit the last
//      * emitted value within that window. For instance, in this 
//      * example we are sampling at an interval of 4s. When the 4s
//      * interval timer begins, you can click twice. Once 4s passes,
//      * the second click will be emitted. This behavior is then repeated.
//      * If no values are emitted from the source in the sample
//      * window no values are emitted by sampleTime.
//      */
//     sampleTime(4000),
//     // @ts-ignore
//     map(({ clientX, clientY }) => ({
//       clientX,
//       clientY
//     }))
//   )
//   .subscribe(console.log);

// timer$.pipe(
//   /*
//    * The sample window can also be based off another stream. 
//    * For instance, in this example every time you click the
//    * last value emitted by the timer$ observable will be emitted
//    * by sample.
//    */
//   sample(click$)
// ).subscribe(console.log);


// import { fromEvent } from 'rxjs';
// import { auditTime, map } from 'rxjs/operators';

// const click$ = fromEvent(document, 'click');

// click$
//   .pipe(
//     /*
//      * auditTime will begin window when the source emits. Then,
//      * once the window passes, the last emitted value
//      * from the source will be emitted. For instance, in this
//      * example if you click a 4s timer will be started. 
//      * At the end, the last click event during that window
//      * will be emitted by auditTime. This is similar to the
//      * behavior of throttleTime, if you were to pass in a config
//      * to emit the value on the trailing edge.
//      */
//     auditTime(4000),
//     /*
//      * adding mapping to stackblitz example since logging
//      * raw events is flaky
//      */
//     // @ts-ignore
//     map(({clientX, clientY}) => ({clientX, clientY}))
//   )
//   .subscribe(console.log);