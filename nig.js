let krok = {};
let stock = new Array();


 krok = new Object(
    {
        keyword: 'revenue',
        value: [1,2,3,4]
    }
)

stock.push(krok);

krok.value.push(6);

console.log(stock)