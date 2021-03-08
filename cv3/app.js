"use strict";
const assert = require("assert");

let ar = [10,20,30,40,50,60];

//for (var x of ar){ console.log(x)} //proceduralni
ar.map(x=>x*3).filter(x=>x>100).reduce((acc,x)=>acc+x); //funkcionalni

//rekurze je bezna ve funkcionalnim (volani sama sebe)




