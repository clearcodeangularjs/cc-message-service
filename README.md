Clearcode Message Service
=========

This service sends and recieves messages from other scopes.

Installation
--------------
``` bower install clearcodeangularjs/cc-message-service --save ```


Usage
------

Add ``` cc.message.service ``` module to your app module list :


```
angular
    .module('yourAwesomeApp', [
        'cc.message.service'
    ]);
```
and you are ready to go!

How to use service:

*message.get*

```
    /**
     * Receive message
     * @param {String} place
     * @param {function(msg)} callback called when msg received
     * @param {Object} $scope required if live stream message receiving (emitting
     * and receiving on the same page)
     */
message.get(place,callback,$scope);


```

*message.send*

```
 /**
     * Send message
     * @param {String} place
     * @param {String} msg
     * @param {String} type
     */

message.send(place, message, type);

//example

message.send('p1', 'test msg', 'info'); // user will get : {text: 'test msg', type: 'info'}
```
Author
------

Pawel Galazka


License
----

LGPL

