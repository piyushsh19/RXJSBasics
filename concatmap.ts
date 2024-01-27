import { fromEvent, interval, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  concatMap,
  catchError,
  take,
  delay
} from 'rxjs/operators';


// const interval$ = interval(1000);
// const click$ = fromEvent(document, 'click');

// click$.pipe(
  /*
   * concat based operators are the 'single file line' 
   * of operators, maintaining 1 active inner observable at
   * a time. For instance, in this example on the first click a new
   * interval observable will be subscribed to internally,
   * with any emitted values being emitted by concatMap. 
   * If you click again while that inner interval
   * is active, the next interval will be queued until
   * the current active interval completes. At this point,
   * the next inner observable will be activated and so on...
   */
//   concatMap(() => interval$.pipe(take(3)))
// ).subscribe(console.log);

const saveAnswer = answer => {
  // simulate delayed request
  return of(`Saved: ${answer}`).pipe(delay(1500));
};

// elems
const radioButtons = document.querySelectorAll('.radio-option');

// streams
const answerChange$ = fromEvent(radioButtons, 'click');

answerChange$
  .pipe(
    /*
     * concatMap can be useful if you need to queue
     * requests client side. For instance, in this example
     * we are emulating save requests on a quiz, ensuring
     * order remains in tact by not initiating the next 
     * request until the previous completes. Be careful though,
     * as long running inner observables could cause backups.
     */
    concatMap((event: any) => saveAnswer(event.target.value))
  )
  .subscribe(console.log);

// import { fromEvent, empty } from 'rxjs';
// import { ajax } from 'rxjs/ajax';
// import {
//   debounceTime,
//   pluck,
//   distinctUntilChanged,
//   switchMap,
  
// } from 'rxjs/operators';

// const BASE_URL = 'https://api.openbrewerydb.org/breweries';

// //elems
// const inputBox = document.getElementById('text-input');
// const typeaheadContainer = document.getElementById('typeahead-container');

// // streams
// const input$ = fromEvent(inputBox, 'keyup');

// input$
//   .pipe(
//     debounceTime(200),
//     pluck('target', 'value'),
//     distinctUntilChanged(),
//     switchMap(searchTerm => ajax.getJSON(
//       `${BASE_URL}?by_name=${searchTerm}`
//       ).pipe(
//         /*
//          * catchError receives the error and the
//          * observable on which the error was caught
//          * (in case you wish to retry). In this case,
//          * we are catching the error on the ajax
//          * observable returned by our switchMap
//          * function, as we don't want the entire
//          * input$ stream to be completed in the
//          * case of an error.
//          */
//         catchError((error, caught) => {
//           /*
//            * In this case, we just want to ignore
//            * any errors and hope the next request
//            * succeeds so we will just return an 
//            * empty observable (completes without
//            * emitting any values).
//            * 
//            * You can also use the EMPTY import, 
//            * which is just a shortcut for empty(). 
//            * Behind the scenes empty() returns the
//            * EMPTY constant when a scheduler is not provided.
//            * ex. import { EMPTY } from 'rxjs';
//            * return EMPTY;
//            * https://github.com/ReactiveX/rxjs/blob/fc3d4264395d88887cae1df2de1b931964f3e684/src/internal/observable/empty.ts#L62-L64
//            */
//           return empty();
//         })
//       )
//     )
//   )
//   .subscribe((response: any[]) => {
//     // update ui
//     typeaheadContainer.innerHTML = response.map(b => b.name).join('<br>');
//   });

