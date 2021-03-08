"use strict";

setTimeout(()=>{
    console.log(1);
}, 2000);
console.log(2);
setTimeout(()=>{
    console.log(3);
},3000);

//CALLBACK
setTimeout(() => {
    console.log('first');
    setTimeout(() =>{
        console.log('second');
        setTimeout(() =>{
            console.log('third');
            setTimeout(() => {
                console.log('fourth');
                setTimeout(() => {
                    console.log('fifth');
                },3000);
            },3000);
        },3000);
    },3000);
},3000);
