Rxjs library powerfull with functional approach.Its uses for reactive programmings. The Observer pattern done right
ReactiveX is a combination of the best ideas from
the Observer pattern, the Iterator pattern, and functional programming.

FRONTEND
Manipulate UI events and API responses, on the Web with RxJS, or on mobile with Rx.NET and RxJava

CROSS-PLATFORM
Available for idiomatic Java, Scala, C#, C++, Clojure, JavaScript, Python, Groovy, JRuby, and others

BACKEND
Embrace ReactiveX's asynchronicity, enabling concurrency and implementation independence.

Observable
In ReactiveX an observer subscribes to an Observable. Then that observer reacts to whatever item or sequence of items the Observable emits. This pattern facilitates concurrent operations because it does not need to block while waiting for the Observable to emit objects, but instead it creates a sentry in the form of an observer that stands ready to react appropriately at whatever future time the Observable does so

In an ordinary method call — that is, not the sort of asynchronous, parallel calls typical in ReactiveX — the flow is something like this:

Call a method.
Store the return value from that method in a variable.
Use that variable and its new value to do something useful.
Or, something like this:

// make the call, assign its return value to `returnVal`
returnVal = someMethod(itsParameters);
// do something useful with returnVal
In the asynchronous model the flow goes more like this:

Define a method that does something useful with the return value from the asynchronous call; this method is part of the observer.
Define the asynchronous call itself as an Observable.
Attach the observer to that Observable by subscribing it (this also initiates the actions of the Observable).
Go on with your business; whenever the call returns, the observer’s method will begin to operate on its return value or values — the items emitted by the Observable.
onNext, onCompleted, and onError
The Subscribe method is how you connect an observer to an Observable. Your observer implements some subset of the following methods:

onNext
An Observable calls this method whenever the Observable emits an item. This method takes as a parameter the item emitted by the Observable.
onError
An Observable calls this method to indicate that it has failed to generate the expected data or has encountered some other error. It will not make further calls to onNext or onCompleted. The onError method takes as its parameter an indication of what caused the error.
onCompleted
An Observable calls this method after it has called onNext for the final time, if it has not encountered any errors.
By the terms of the Observable contract, it may call onNext zero or more times, and then may follow those calls with a call to either onCompleted or onError but not both, which will be its last call. By convention, in this document, calls to onNext are usually called “emissions” of items, whereas calls to onCompleted or onError are called “notifications.”

A more complete subscribe call example looks like this:

def myOnNext     = { item -> /* do something useful with item */ };
def myError      = { throwable -> /* react sensibly to a failed call */ };
def myComplete   = { /* clean up after the final response */ };
def myObservable = someMethod(itsParameters);
myObservable.subscribe(myOnNext, myError, myComplete);

Unsubscribing
In some ReactiveX implementations, there is a specialized observer interface, Subscriber, that implements an unsubscribe method. You can call this method to indicate that the Subscriber is no longer interested in any of the Observables it is currently subscribed to. Those Observables can then (if they have no other interested observers) choose to stop generating new items to emit.

The results of this unsubscription will cascade back through the chain of operators that applies to the Observable that the observer subscribed to, and this will cause each link in the chain to stop emitting items. This is not guaranteed to happen immediately, however, and it is possible for an Observable to generate and attempt to emit items for a while even after no observers remain to observe these emissions.


“Hot” and “Cold” Observables
When does an Observable begin emitting its sequence of items? It depends on the Observable. A “hot” Observable may begin emitting items as soon as it is created, and so any observer who later subscribes to that Observable may start observing the sequence somewhere in the middle. A “cold” Observable, on the other hand, waits until an observer subscribes to it before it begins to emit items, and so such an observer is guaranteed to see the whole sequence from the beginning.

In some implementations of ReactiveX, there is also something called a “Connectable” Observable. Such an Observable does not begin emitting items until its Connect method is called, whether or not any observers have subscribed to it.


Composition via Observable Operators
Observables and observers are only the start of ReactiveX. By themselves they’d be nothing more than a slight extension of the standard observer pattern, better suited to handling a sequence of events rather than a single callback.

The real power comes with the “reactive extensions” (hence “ReactiveX”) — operators that allow you to transform, combine, manipulate, and work with the sequences of items emitted by Observables.

These Rx operators allow you to compose asynchronous sequences together in a declarative manner with all the efficiency benefits of callbacks but without the drawbacks of nesting callback handlers that are typically associated with asynchronous systems.


CHAPTER 1 
Its a push based approach.We turn the control of functione(next complete , erorr) over to the producerdata in this case then obsrvables then pushes the observer data arrives in a way this isthe essence of by invoking these callbacks as data Here we define how to react by regestriing functions to express the flow of data through our stream as it arrives.
The Rxjs has built in operator function, by which we can compose the stream in statless manner declarateviely ex[pressing the flow of data through your observables. Operators in rxjs is real time queries as data. 
The oprators las lot of functional and refreffed as lodash events. Rxjs react to data as its pushed from observable to the observer.
NGRTX librabires and tools for angular
...........................................................

npm install --save rxjs

After install we can import creation operator and classes from root rxjs.And operator pipes from operators directory. like {map} fro. 'rxjs/operators'.
Instead of useing es6 module  import we can also use sertucting to pull whatever operators or classes we need off the global rxjs and objects.
const { observables,fromEvent} =rxjs
const {map} = rxjs.operators;

Create first Observables:-
The core reactive programming with rxjs is observable. Obervables represent stream of data or collection of it delivered over time .We can create observable by helper function which rxjs offers.

1. import  Obervable 
2. Declare the variable obervable 
 const Observable = new Observable   
 const Observable = Observable.create     // we can use static craete observable function which behind the scene call observables

observable constructor   expect  a function which recaieve a subscriber. In this we decide which input value does observables  sent to the  subsriber. This is know as PUSH based approach. The Observable has the contorl and subsriber just listen to it.
In Rxjs If we say next method then its tell to sunsriber that it has new value.

In order to trigger an observable we need to call subsribe on the observable.

 const Observable = new Observable (subscriber => {
    subscriber.next('Hello');
 })

 observable.subscribe(
    //observer  here
 )

 3. Create an observer = Its just an object which contain upto three properties. 
            First is next which reperents the happy path function that is invoked when the observer will emits the new value, It can be call many times.
            Second is error - when error occured this callback is occured once ehich has the error object.
            Third is complete - When observable is complete and on;ly invoked once time and does not recieve any value
  const observer  = {

    next: value => console.log('next', value),
    error: error => console.log('error', error),
    complete: ()=> console.log("copmpleted")
  }

  Now  we have the observer we can supply to subscribe method like

  observable.subscribe(observer); // in console  next Hello

  Right now we are emmiting one value but observable can emit number of values for any period of time .
  const Observable = new Observable (subscriber => {
    subscriber.next('Hello');
     subscriber.next('World');
 })
 Here we are passing two values then we call completed so its does not run any other value. It just igonred the value piyush. 
   const Observable = new Observable (subscriber => {
    subscriber.next('Hello');
     subscriber.next('World');
    subscriber.complete();
        subscriber.next('piyush');

 })

Chapter 2 
We can pass the function in observable trought subscribe.
If we copy  function into subscribe method. Thenit hooked up to the scriber an invoked on next notification.

  observable.subscribe(
    value => console.log('next', value) // next Hello next world
  )
  for ref -image 2 and 3.

Deliver values Asyncronously with observables:-

Till now we are emitting values syncronously , which is certainly is nopt a norm.Building reactive interfaces with Rxjs will deals with long running asyncronously events dream based offuser ineration such as mouse and keyboard events.

Interval Creation Operator example : 

 const Observable = new Observable (subscriber => {
    \ let count = 0 ;

    setInterval(()=> {
      subscriber.next(count);
      count+= 1;
    },1000)

 })
 But this counter run forver ,we need to clear it once its complete. We need to create a id 
 
 const Observable = new Observable (subscriber => {
     let count = 0 ;

    const id  = setInterval(()=> {
      subscriber.next(count);
      subsrriber.complete
      count+= 1;
    },1000)
    return () = > {
      console.log(*'called);
    clearInterval (id) // the id is cleared  here after first value is emiited 
      }

 })

 Manage observable subscriptions with unsubscribe:

 Whenever we subsrcibe to the observable. A subscription object is returned.
  
  const subscription  = observable.subscribe(
    observer
  );

  Here we add a varaible called subscription here to capture subscription being returned. Its takes an un subsrvibe method as parram.For eg here its clear the set interval after 3 sec.
    const subscription  = observable.subscribe(
    observer
  );
SetTimeout(()=>{
  subscription.unsubscribe()
}, 3500)
we can also add mutiple subsrciption like 
subscription.add(subscriptionTwo)


note: -  The callback we registered for complete with our observer is not fired, with observable rulex to complete callback registers is only fire for completed notification.

Creation Oprators /Pipeable operators
of, from, from Evets,Interval(1000)
Let take how a dumb events can be turned into Stream of beservable trough (From Event)..
FromEvent takes arguments as event target or element for instance btm or input box.

 *  Each subscription creates it's own execution path between
 *  observable and observer (also known as unicasting). So, in this case,
 *  every subscription will wire up a new event listener.

 ...............................
 The of oprators supply values syncronously.
 import { of, range } from 'rxjs';

const observer = {
    next: val => console.log('next', val),
    error: err => console.log('error', err),
    complete: () => console.log('complete!')
};

/*
 * Emits each item you provide in sequence, synchronously.
 * of literally just loops through the items and emits them,
 * there is no flattening involved. For instance, if you pass an
 * array the entire array will be emitted, not each item within
 * the array.
 */
const source$ = of(1,2,3,4,5);

console.log('proving');
source$.subscribe(observer);
console.log('this is synchronous');

/*
 * If you just want to emit numbers between a specific range
 * you could also use the range operator instead.
 */
console.log('proving');
range(1,5).subscribe(observer);
console.log('this is synchronous');

..................................................

import { from } from 'rxjs';

const observer = {
  next: val => console.log('next', val),
  error: err => console.log('error', err),
  complete: () => console.log('complete!')
};

/*
 * from can turn nearly anything into an observable
 * When from receieves an array, it loops through each item
 * within that array, emitting them in sequence.
 */
from([1, 2, 3, 4, 5]).subscribe(console.log);

/*
 * This works for any array like object as well, for instance, 
 * when from receieves a string (which has a length property) 
 * it will loop through emitting each character.
 */
from('Hello').subscribe(console.log);

/*
 * When from receieves a promise, it will call .then, emitting
 * the response. We will see ways to make requests using an
 * observable interface in upcoming lessons, but for now we will
 * just use fetch.
 */
from(fetch('https://api.github.com/users/octocat')).subscribe(console.log);

function* hello() {
    yield 'Hello';
    yield 'World';
};

const iterator = hello();

/*
 * When from receieves a iterator it will drop it in a do while loop,
 * calling .next and emitting each item until there are no more items left.
 */
from(iterator).subscribe(console.log);

.......................................................................


import { interval, timer } from 'rxjs';

/*
 * interval emits numbers in sequence based on the
 * duration that you specify. In this case, a number
 * will be emitted every 1000ms (1s)
 */
const interval$ = interval(1000);

/*
 * We'll just supply a function for next in this case,
 * rather than observer object.
 */
interval$.subscribe(console.log);

/*
 * If you need the first item to be emitted on an interval
 * different than the rest, you can use the timer operator instead.
 * For example, let's have the first item emit immediately, followed
 * by a value every 1000ms after.
 */
// const timer$ = timer(0, 1000);

/*
 * You can also emit a single item after a specified duration, then complete,
 * by just supplying the first argument.
 */
// const timer$ = timer(1000);
...........................................................................................
Operators:
Non configurational operatore generally accepts some configuration options returning a functionthat aacepts observable source returning a new observable so one way to invoke an operator is to call it.

operatorOne(config)(observable$).

Pipeable operator 
observable$.pipe(
  operatorOne(config),
  operatorTwo(config)
)
In pipeable operator reacieve a source observablerather than standalone function.shown above.

observable$.pipe(
  operatorOne(config),
  operatorTwo(config)
).subscribe(observer);

.................................................

To Add opertor to stream we use pipe operator
of(1,2,3,4,5).pipe(
  map(value => value*10)
).subscribe(console.log)

The source opertor observable does impact any other stream.

const keycodeWithPluck$ = keyup$.pipe(
  pluck('code')
); the pluck operator use the property.

 * For scenarios where you ALWAYS want to map to the same,
 * static value, you can use mapTo instead. This emits the value
 * you supply on any emissions from the source observable. We will see
 * a few examples of where this can be useful in upcoming lessons.
 */
const pressed$ = keyup$.pipe(
  mapTo('Key Pressed!')
);
Map allow us to tranform of events using projectionopertots.

Filter opertors only emits the value we are interested in based on function we provide based on true or fallse for each value emmited by source observable.


.........................................................
Recucer operotor
Reduces the values from source observable to a single value that's emitted when the source completes.
Like Array.prototype.reduce(), reduce applies an accumulator function against an accumulation and each value of the source Observable (from the past) to reduce it to a single value, emitted on the output Observable. Note that reduce will only emit one value, only when the source Observable completes. It is equivalent to applying operator scan followed by operator last.

Returns an Observable that applies a specified accumulator function to each item emitted by the source Observable. If a seed value is specified, then that value will be used as the initial value for the accumulator. If no seed value is specified, the first item of the source is used as the seed.

// RxJS v6+
import { of } from 'rxjs';
import { reduce } from 'rxjs/operators';

const source = of(1, 2, 3, 4);
const example = source.pipe(reduce((acc, val) => acc + val));
//output: Sum: 10'
const subscribe = example.subscribe(val => console.log('Sum:', val));

Tap Operator

import { map, tap } from 'rxjs/operators';

const numbers$ = of(1, 2, 3, 4, 5);

/*
 * tap can be used to spy on your streams, performing side effects
 * such as logging, and is particularly useful for debugging.
 * In the example below, we are spying on the value before and after
 * the map operator.
 */
numbers$
  .pipe(
    tap(value => console.log('before', value)),
    map(value => value * 10),
    /*
  tap also accepts an observer object, if you wish to also
     * receieve notifications on complete or error. You will use this
     * far less often, but it's good to know just in case...
     */
    tap({
      next: value => console.log('after', value),
      complete: () => console.log('done!'),
      error: error => {
        // do something
      }
    })
  )
  .subscribe(value => {
    console.log('from subscribe', value);
  });

  ....................................................................
  Filtering Operator

  signature: filter(select: Function, thisArg: any): Observable

  filter will only emit values that meet the specified condition. If no values in the observable satisfy the condition, nothing gets emitted.
  // RxJS v6+
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';

//emit (1,2,3,4,5)
const source = from([1, 2, 3, 4, 5]);
//filter out non-even numbers
const example = source.pipe(filter(num => num % 2 === 0));
//output: "Even number: 2", "Even number: 4"
const subscribe = example.subscribe(val => console.log(`Even number: ${val}`));

// RxJS v6+
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';

//emit ({name: 'Joe', age: 31}, {name: 'Bob', age:25})
const source = from([
  { name: 'Joe', age: 31 },
  { name: 'Bob', age: 25 }
]);
//filter out people with age under 30
const example = source.pipe(filter(person => person.age >= 30));
//output: "Over 30: Joe"
const subscribe = example.subscribe(val => console.log(`Over 30: ${val.name}`));

Parameters
predicate	(value: T, index: number) => boolean	
A function that evaluates each value emitted by the source Observable. If it returns true, the value is emitted, if false the value is not passed to the output Observable. The index parameter is the number i for the i-th source emission that has happened since the subscription, starting from the number 0.

thisArg	any	
Optional. Default is undefined.

An optional argument to determine the value of this in the predicate function.

Take operator emits the first x values from the source then completes. In this case, 1,2,3 will be emitted.

takeWhile emits values as long as they pass
the provided condition. As soon as the predicate
returns false, takeWhile completes the observable.
You can also pass an optional second parameter of true
if you want takeWhile to emit the value that caused
your condition to return false, before completing.

takeUntil lets you complete a stream base on when another stream emits a value. For instance,in this example our counter will run until the click$ stream emits a value, at which point the observable will be completed.

Rate Limiting Operators:

Emits a notification from the source Observable only after a particular time span determined by another Observable has passed without another source emission.

debounce<T>(durationSelector: (value: T) => ObservableInput<any>): MonoTypeOperatorFunction<T>

durationSelector	(value: T) => ObservableInput<any>	
A function that receives a value from the source Observable, for computing the timeout duration for each source value, returned as an Observable or a Promise.
MonoTypeOperatorFunction<T>: A function that returns an Observable that delays the emissions of the source Observable by the specified duration Observable returned by durationSelector, and may drop some values if they occur too frequently.

import { fromEvent, scan, debounce, interval } from 'rxjs';

const clicks = fromEvent(document, 'click');
const result = clicks.pipe(
  scan(i => ++i, 1),
  debounce(i => interval(200 * i))
);
result.subscribe(x => console.log(x));

Example of debounceTime  is when user input from textbox is or doucument is pause like GOOGLE DOCS or making a request for data after a specified time like a search type
For extremely active streams like scroll events, throttleTime can be used to limit the number of emitted values. In this case, we'll just update our scroll bar every 30ms of scrolling.

AuditTime will begin window when the source emits. Then once the window passes, the last emitted valu from the source will be emitted. For instance, in thi example if you click a 4s timer will be started. At the end, the last click event during that windo will be emitted by auditTime. This is similar to th behavior of throttleTime, if you were to pass in a confi to emit the value on the trailing edge.

Sample time will emit the last emitted value within that window. For instance, in this example we are sampling at an interval of 4s. When the 4s interval timer begins, you can click twice. Once 4s passes,the second click will be emitted. This behavior is then repeated.If no values are emitted from the source in the sample window no values are emitted by sampleTime.


Transform Operators

mergeMap invokes the function you provide,subscribing to each returned observable internally.Any values emitted by these inner observablesare then emitted by mergeMap. By default thereis no limit to the number of active innersubscriptions that can be active at a timewith mergeMap, so if you continually click onthe page more and more timers will be activated.This can be dangerous if you have long running inner observables and forget to cleanthem up.

mergeMap is good for 'fire and forget' save request you do not want to be cancelled. For instance, in this example we are emulating a save of coordinates anytime the user clicks on the page.

concat based operators are the 'single file line'of operators, maintaining 1 active inner observable aa time. For instance, in this example on the first click a neinterval observable will be subscribed to internallywith any emitted values being emitted by concatMap.If you click again while that inner intervais active, the next interval will be queued untithe current active interval completes.

Combination Operator:

StartWith()
Returns an observable that, at the moment of subscription, will synchronously emit all values provided to this operator, then subscribe to the source and mirror all of its emissions to subscribers.

startWith<T, D>(...values: D[]): OperatorFunction<T, T | D>
Parameters:
values	D[]	
Items you want the modified Observable to emit first.

Returns
OperatorFunction<T, T | D>: A function that returns an Observable that synchronously emits provided values before subscribing to the source Observable.
This is a useful way to know when subscription has occurred on an existing observable.First emits its arguments in order, and then any emissions from the source.

import { timer, map, startWith } from 'rxjs';

timer(1000)
  .pipe(
    map(() => 'timer emit'),
    startWith('timer start')
  )
  .subscribe(x => console.log(x));

// results:
// 'timer start'
// 'timer emit'

EndWith

Returns an observable that will emit all values from the source, then synchronously emit the provided value(s) immediately after the source completes.

endWith<T>(...values: (SchedulerLike | T)[]): MonoTypeOperatorFunction<T>
Parameters
values	(SchedulerLike | T)[]	
Items you want the modified Observable to emit last.

Returns
MonoTypeOperatorFunction<T>: A function that returns an Observable that emits all values from the source, then synchronously emits the provided value(s) immediately after the source completes.

Description
NOTE: Passing a last argument of a Scheduler is deprecated, and may result in incorrect types in TypeScript.

This is useful for knowing when an observable ends. Particularly when paired with an operator like takeUntil

forkJoin :- Accepts an Array of ObservableInput or a dictionary Object of ObservableInput and returns an Observable that emits either an array of values in the exact same order as the passed array, or a dictionary of values in the same shape as the passed dictionary.

combineLatest :- Combines multiple Observables to create an Observable whose values are calculated from the latest values of each of its input Observables.

combineLatest<O extends ObservableInput<any>, R>(...args: any[]): Observable<R> | Observable<ObservedValueOf<O>[]>
Parameters
args	any[]	
Any number of ObservableInputs provided either as an array or as an object to combine with each other. If the last parameter is the function, it will be used to project the values from the combined latest values into a new value on the output Observable.

Returns
Observable<R> | Observable<ObservedValueOf<O>[]>: An Observable of projected values from the most recent values from each ObservableInput, or an array of the most recent values from each ObservableInput.

Description
Whenever any input Observable emits a value, it computes a formula using the latest values from all the inputs, then emits the output of that formula.

mergeWith :- Merge the values from all observables to a single observable result.

mergeWith<T, A extends readonly unknown[]>(...otherSources: [...ObservableInputTuple<A>]): OperatorFunction<T, T | A[number]>
Parameters
otherSources	[...ObservableInputTuple<A>]	
the sources to combine the current source with.

Returns
OperatorFunction<T, T | A[number]>: A function that returns an Observable that merges the values from all given Observables.

Description
Creates an observable, that when subscribed to, subscribes to the source observable, and all other sources provided as arguments. All values from every source are emitted from the resulting subscription.

When all sources complete, the resulting observable will complete.

When any source errors, the resulting observable will error.

forkJoin(...args: any[]): Observable<any>
Parameters
args	any[]	
Any number of ObservableInputs provided either as an array, as an object or as arguments passed directly to the operator.

Returns
Observable<any>: Observable emitting either an array of last values emitted by passed Observables or value from project function.

Description
Wait for Observables to complete and then combine last values they emitted; complete immediately if an empty array is passed.

