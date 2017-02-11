//jshint esversion: 6
var dataset = require('./dataset.json');
var bankBalances = dataset.bankBalances;

/*
  create an array with accounts from bankBalances that are
  greater than 100000.00
  assign the resulting array to `hundredThousandairs`
*/
var hundredThousandairs = null;

hundredThousandairs = bankBalances.filter((element, index, array) => {
  if( element.amount > 100000.00){
    return true;
  }
  return false;
});


/*
  set a new key for each object in bankBalances named `rounded`
  the value of this key will be the `amount` rounded to the nearest dollar
  example 
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting array to `roundedDollar`
*/
var roundedDollar = null;
roundedDollar = [];
let roundedAmount = bankBalances.map((element, index, array) =>{
  let newObject = {};
  newObject.rounded = Math.round(element.amount);
  newObject.state = element.state;
  roundedDollar.push(newObject);

});

/*
  set a the `amount` value for each object in bankBalances
  to the value of `amount` rounded to the nearest 10 cents
  example 
    {
      "amount": 134758.4,
      "state": "HI"
    }
  assign the resulting array to `roundedDime`
*/
var roundedDime = null;
roundedDime = [];
let roundedDimeAmount = bankBalances.map((element, index, array) => {
  let newObject = {};
  newObject.amount = Math.round(element.amount*10)/10;
  newObject.state = element.state;
  roundedDime.push(newObject);
});





// set sumOfBankBalances to the sum of all amounts in bankBalances
var sumOfBankBalances = null;

function summarize(prev, curr, i, arr){
 let newSum = prev + parseFloat(curr.amount);

return Math.round(newSum*100)/100;

}
sumOfBankBalances = bankBalances.reduce(summarize, 0);
 

/*
  set sumOfInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  in each of the following states
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */
var sumOfInterests = null;
var newState = {};

function filterState(element, index, array){
  switch(element.state){
    case "WI":
      return true;
      break;
    case "IL":
      return true;
      break;
    case "WY":
      return true;
      break;
    case "OH":
      return true;
      break;
    case "GA":
      return true;
      break;
    case "DE":
      return true;
      break;
    default:
      return false;


  }
 //  if(element.state === "WI" || "IL" || "WY" || "OH" || "GA" || "DE"){
 //   return true;
 // }
  
}

function interest(prev, curr, i, arr){
  let stateInterest = curr.amount * (18.9/100);
  let total = prev  + stateInterest;
  return Math.round(total * 100)/100;


}
 
 sumOfInterests = bankBalances.filter(filterState).reduce(interest, 0);
 console.log(sumOfInterests); 





/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table
    where the key is the two letter state abbreviation
    and the value is the sum of all amounts from that state
      the value must be rounded to the nearest cent
 */
var stateSums = dataset.bankBalances.reduce((accounts, currentAccount) => {
  if(!accounts.hasOwnProperty(currentAccount.state)){
    accounts[currentAccount.state]= 0;
  }
  accounts[currentAccount.state] += parseFloat(currentAccount.amount);
  accounts[currentAccount.state] = Math.round(accounts[currentAccount.state]*100)/100;
  return accounts;
}, {});

/*
  set sumOfHighInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  where the amount of the sum of interests in that state is
    greater than 50,000
  in every state except
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */
var sumOfHighInterests = Object.keys(stateSums)
.filter((state) =>  ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'].indexOf(state) === -1)

//convert amount to be the interest
.map((state) => {
  return {
    state,
    interest: Math.round(stateSums[state] * 18.9)/100
  };
})

//use only interest amounts that are greater than 50,000
.filter((account) => {
  return account.interest > 50000;
})

//add all the states interest together
.reduce((prevInterest, currentAccount) => {
  return prevInterest + currentAccount.interest;
}, 0);

sumofHighInterest = Math.round(sumOfHighInterests * 100) /100;

console.log(sumOfHighInterests);


// function filterHighState(element, index, array){

//   if(element.state !== "WI" || "IL" || "WY" || "OH" || "GA" || "DE" && ){

//   }
// }



/*
  set lowerSumStates to an array containing
  only the two letter state abbreviation of each state 
  where the sum of amounts in the state is
    less than 1,000,000
 */
var lowerSumStates = null;

/*
  set higherStateSums to be the sum of 
    all amounts of every state
    where the sum of amounts in the state is
      greater than 1,000,000
 */
var higherStateSums = null;

/*
  set areStatesInHigherStateSum to be true if
    all of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var areStatesInHigherStateSum = null;

/*
  Stretch Goal && Final Boss
  
  set anyStatesInHigherStateSum to be true if
    any of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var anyStatesInHigherStateSum = null;


module.exports = {
  hundredThousandairs : hundredThousandairs,
  roundedDollar : roundedDollar,
  roundedDime : roundedDime,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};
