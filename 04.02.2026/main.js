let array = ['a', 'b', 'c', 'd', 'e', 123, [], {}, function () { }];
let array2 = new Array(1, 2, 3, 4, 5);

// array.push(6);
// array.unshift(0)

// array.pop()
// array.shift()

for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
}

for (let index in array) {
    console.log(array[index]);
}

console.log("Arrray len:" + array.length)
// console.log(array.pop())
console.log(array);

let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

console.log(matrix[1][2]);


let a = [1, 2, 3, 4, 5, 6];
let b = a;

console.log("a: " + a);
console.log(a === b)
console.log([1, 2, 3] == [1, 2, 3]);

let num1 = 10;
let num2 = 10;

if (num1 === num2) {
    console.log("Equal");
}

console.log(String([1, 2, 3]) === String(a))


console.log(a.slice(1, 2));
console.log(a.splice(1, 3, 20, 30, 40));

arr1 = ['HELLO', 'WORLD'];
console.log(arr1.concat(['!', '!!', '!!!'], ['????', "asd"], '....', '----'));
console.log(arr1);

console.log(a);

arr1.forEach(function (element, index, array) {
    console.log(element, index, array);
});

let bigArray = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua"];

let result = bigArray.find(function (item) {
    return item.length == 5;
})

let result2 = bigArray.filter(function (item) {
    return item.length == 5;
})

console.log(bigArray);
console.log(result);
console.log(result2);

let numbers = [1, 12, 3, 76, 4, 7];
numbers.sort(compareNumbers)

function compareNumbers(a, b) {
    if (a > b) return 1;
    if (a == b) return 0;
    if (a < b) return -1;
}

let stingsArrUnsorted = ["banana", "apple", "abrikos", "mango", "kiwi"];
stingsArrUnsorted.sort();
console.log(stingsArrUnsorted);

console.log(numbers);

let arr = Array.from({ length: 5 }, (_, k) => (k + 1));
console.log(arr);

let result4 = arr.reduce((sum, current) => sum * current, 1);

console.log(result4);


let mappingArr = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Jack' },
    { id: 4, name: 'Jill' },
    { id: 5, name: 'Jerry' }
]

// let container = document.getElementById('contaniner');

// let newArr = mappingArr.map((item) => {
//     return `<div class="item"> ${item.name} (ID: ${item.id}) </div>`
// })

// newArr.forEach(element => {
//     container.innerHTML += element;
// })

// console.log(newArr);






console.log(typeof function () { });

function test() {
    console.log("Test function");
}
test.prototype.name = "Test function prototype";

console.log(test.prototype.name);
