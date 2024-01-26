
import { fromEvent } from 'rxjs';
import { debounceTime, pluck, distinctUntilChanged } from 'rxjs/operators';

//elems
const inputBox = document.getElementById('text-input');

// streams
const click$ = fromEvent(document, 'click');
const input$ = fromEvent(inputBox, 'keyup'); // need to add text-input top index.html file

input$
  .pipe(
    /*
     * debounceTime emits the last emitted value from the source 
     * after a pause, based on a duration you specify.
     * For instance, in this case when the user starts typing all values
     * will be ignored until they paused for at least 200ms,
     * at which point the last value will be emitted.
     */
    debounceTime(200),
    // we could also use map here
    pluck('target', 'value'),
    /* 
     * If the user types, then backspaces quickly, the same value could
     * be emitted twice in a row. Using distinctUntilChanged will prevent
     * this from happening.
     */
    distinctUntilChanged()
  )
  .subscribe(console.log);