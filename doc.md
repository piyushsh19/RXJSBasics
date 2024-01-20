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


