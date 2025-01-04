const add = function(a,b){
    if(isNaN(a) || isNaN(b)){
        throw new Error("Type valid numbers...");
    }
    return a+b;
}
const subtract = function(a,b){
    if(isNaN(a) || isNaN(b)){
        throw new Error("Type valid numbers...");
    }
    return a-b;
}
const multiply = function(a,b){
    if(isNaN(a) || isNaN(b)){
        throw new Error("Type valid numbers...");
    }
    return a*b;
}
const divide = function(a,b){
    if(isNaN(a) || isNaN(b)){
        throw new Error("Type valid numbers...");
    }
    if(b === 0){
        throw new Error("Cannot divide by 0.");
    }
    return a/b;
}

console.log(subtract(7,8));
console.log(divide("dfsdfd",2));

// export {add, subtract, divide, multiply};