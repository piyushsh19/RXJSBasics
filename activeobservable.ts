import { interval, fromEvent, of, merge, empty } from 'rxjs';
import { scan, mapTo, takeWhile, takeUntil, tap, startWith, switchMap } from 'rxjs/operators';

// const keyup$ = fromEvent(document, 'keyup');
// const click$ = fromEvent(document, 'click');

// keyup$.subscribe(console.log);
// click$.subscribe(console.log);

/*
 * merge subscribes to all provided streams on subscription,
 * emitting any values emitted by these streams.
 */
// merge(keyup$, click$).subscribe(console.log);



// elem refs
const countdown: any = document.getElementById('countdown');
const message = document.getElementById('message');
const pauseButton = document.getElementById('pause');
const startButton = document.getElementById('start');

// streams
const counter$ = interval(1000);
const pauseClick$ = fromEvent(pauseButton, 'click');
const startClick$ = fromEvent(startButton, 'click');

const COUNTDOWN_FROM = 10;

/*
 * With merge, we can combine the start and pause
 * streams, taking relevant action below depending
 * on which stream emits a value.
 */
merge(
  startClick$.pipe(mapTo(true)), 
  pauseClick$.pipe(mapTo(false))
)
.pipe(
  /*
   * Depending on whether start or pause was clicked,
   * we'll either switch to the interval observable,
   * or to an empty observable which will act as a pause.
   */
  switchMap(shouldStart => {
    return shouldStart ? counter$ : empty();
  }),
  mapTo(-1),
  scan((accumulator, current) => {
    return accumulator + current;
  }, COUNTDOWN_FROM),
  takeWhile(value => value >= 0),
  startWith(COUNTDOWN_FROM)
)
.subscribe(value => {
  countdown.innerHTML = value;
  if (!value) {
    message.innerHTML = 'Liftoff!';
  }
});