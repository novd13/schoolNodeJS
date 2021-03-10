"use strict";

setTimeout(() => {
    console.log(1);
}, 2000);
console.log(2);
setTimeout(() => {
    console.log(3);
}, 3000);

//CALLBACK HELL
setTimeout(() => {
    console.log('first');
    setTimeout(() => {
        console.log('second');
        setTimeout(() => {
            console.log('third');
            setTimeout(() => {
                console.log('fourth');
                setTimeout(() => {
                    console.log('fifth');
                }, 3000);
            }, 3000);
        }, 3000);
    }, 3000);
}, 3000);

//PROMISE, ASYNC/WAIT
//THENABLE
const delay = t => new Promise(res => setTimeout(res, t));

delay(3000)
.then(()=>console.log('ONE'))
.then(()=>delay(3000))
.then(()=>console.log('TWO'))
.catch(console.error);

//.then(() => {throw 'some error'})

//Waits on all to be done (so this would wait 3 secs)
Promise.all([
    delay(1000),
    delay(2000),
    delay(3000),
]).then(()=>console.log('waited on everyone'))

//Waits for the first one
Promise.race([
    delay(1000),
    delay(2000),
    delay(3000),
]).then(()=>console.log('waited on the fastest'))

async function myAsyncFunction() {
    await delay(3000);
    console.log('0-1');
    await delay (3000);
    console.log('0-2');
    await Promise.all([
        delay(3000),
        delay(2000)
    ]);
    console.log('0-5');
}
myAsyncFunction().then(()=> console.log('0-3'));
console.log('0-4');