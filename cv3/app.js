"use strict";
const assert = require("assert");

const factorialProcedural = function (n) {
    let result = 1;
    for (var i = 1; i <= n; i++){
        result *=i;
    }
}

assert.strictEqual(factorialProcedural(3), 6);
assert.strictEqual(factorialProcedural(7), 5040);

const factorialFunctional = n => n<1 ? 1: factorialFunctional(n-1) * n


assert.strictEqual(factorialFunctional(3), 6);
assert.strictEqual(factorialFunctional(7), 5040);

//rekurze je bezna ve funkcionalnim (volani sama sebe)




