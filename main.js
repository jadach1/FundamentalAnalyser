var axios = require('axios');

const key     = '3340dea2b67650a5e57a77796910cb55';
let symbol    = 'MSFT';
let statement    = 'income-statement';


function getData() {
	return axios.all([
		axios.get('https://financialmodelingprep.com/api/v3/'+statement+'/'+symbol+'?period=quarter&apikey='+key)
	])
	// .then(axios.spread((response1) => {
	// // console.log(Object.keys(response1.data[0]));  
	// 	for(quarter of response1.data)
	// 	{
	// 		let ddate   = quarter.date.substring(0,4); 
	// 		let period  = quarter.period;
	// 		let symbol  = quarter.symbol;
	// 		for( let [keyword,value] of Object.entries(quarter)){
	// 			if(keyword != 'date'         && 
	// 				keyword != 'symbol'       && 
	// 				keyword != 'fillingDate'  && 
	// 				keyword != 'acceptedDate' && 
	// 				keyword != 'period'       && 
	// 				keyword != 'link'         && 
	// 				keyword != 'finalLink'    &&
	// 				keyword != 'eps'		   &&
	// 				keyword != 'weightedAverageShsOut'    )  {
	// 					// console.log(`${keyword}`)
	// 					arrayTables.push(`create table finance.${keyword}(
	// 							id serial PRIMARY KEY,
	// 							statement varchar(20) NOT NULL,
	// 							symbol varchar(10) UNIQUE NOT NULL,
	// 							year varchar(4) NOT NULL,
	// 							period varchar(2) NOT NULL,
	// 							value INTEGER NOT NULL
	// 					);`)
	// 					//console.log(symbol + " " + ddate + " " + period + " " + `${value}`) 
	// 			}		
	// 		}
	// 	}
	// }))
	.catch(error => {
			console.log(error);
	}).finally( f => {
		console.log("finished")
	})
}

async function createTables() {
	let arrayOfTables = new Array();
	console.log("intro")
	let tempArray = await getData();
	console.log("outro")
	for(let keyword of Object.keys(tempArray[0].data[0])){
		if(keyword  != 'date'         && 
			keyword != 'symbol'       && 
			keyword != 'fillingDate'  && 
			keyword != 'acceptedDate' && 
			keyword != 'period'       && 
			keyword != 'link'         && 
			keyword != 'finalLink'    &&
			keyword != 'eps'		   &&
			keyword != 'weightedAverageShsOut')  
			{
				arrayOfTables.push(`create table finance.${keyword}(
						id serial PRIMARY KEY,
						statement varchar(20) NOT NULL,
						symbol varchar(10) NOT NULL,
						year varchar(4) NOT NULL,
						period varchar(6) NOT NULL,
						value NUMERIC NOT NULL
				);`)
			}
	} 
	return arrayOfTables;
	//need to redefine date and value
}

async function fillTables() {
	let arrayOfData = new Array();
	console.log("first")
	let tempArray = await getData();
	console.log("second");
	for(quarter of tempArray[0].data){
		let counter = 0;
		for([keyword,value] of Object.entries(quarter)){
			let ddate   = quarter.date.substring(0,4); 
		//	let period  = quarter.period;
			let period = quarter.date.substring(5);
			let symbol  = quarter.symbol;
			if( keyword != 'date'         && 
				keyword != 'symbol'       && 
				keyword != 'fillingDate'  && 
				keyword != 'acceptedDate' && 
				keyword != 'period'       && 
				keyword != 'link'         && 
				keyword != 'finalLink'    &&
				keyword != 'eps'		   &&
				keyword != 'weightedAverageShsOut'    ) {
				arrayOfData.push(`insert into ${keyword} (statement,symbol,year,period,value) values('${statement}','${symbol}','${ddate}','${period}','${value}');`);
				}	
		}	
	}
	return arrayOfData;
}

fillTables().then(e=>{
	console.log(e.length);
	})

exports.createTables = createTables;
exports.dataFilling = fillTables;


