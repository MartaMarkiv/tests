const fs = require("node:fs");

const fileName = "10m.txt";

try {
  const data = fs.readFileSync(`./${fileName}`, "utf8");
  const dataList = data.split("\n").filter(item => item !== "").map(item => Number(item));

  let minNumber = dataList[0];
  let maxNumber = dataList[0];
  let sumNumbers = 0;
  let maxChain = [], maxChainTemp = [dataList[0]];
  let minChain = [], minChainTemp = [dataList[0]];

  for (let i = 1; i < dataList.length; i++) {
    sumNumbers += dataList[i];

    if(dataList[i] < minNumber) {
      minNumber = dataList[i];
    }

    if(dataList[i] > maxNumber) {
      maxNumber = dataList[i];
    }

    if(dataList[i] > dataList[i-1]) {
      maxChainTemp.push(dataList[i]);

      if(minChain.length < minChainTemp.length) {
        minChain = minChainTemp;
      }
      minChainTemp = [dataList[i]];
    } else {
      minChainTemp.push(dataList[i]);

      if(maxChain.length < maxChainTemp.length) {
        maxChain = maxChainTemp;
      }
      maxChainTemp = [dataList[i]];
    }
  }

  if(maxChain.length < maxChainTemp.length) {
    maxChain = maxChainTemp;
  }
  if(minChain.length < minChainTemp.length) {
    minChain = minChainTemp;
  }

  const isOdd = dataList.length % 2 !== 0;
  const centerIndex = Math.round(dataList.length / 2);
  const median = isOdd ? dataList[centerIndex] :
    0.5 * (dataList[centerIndex-1] + dataList[centerIndex]);
    
  console.log("Max number: ", maxNumber);
  console.log("Min number:", minNumber);
  console.log("The arithmetic mean: ", sumNumbers/dataList.length);
  console.log("The median: ", median);
  console.log("The largest sequence of numbers that increases:");
  console.log(maxChain);
  console.log("The largest sequence of numbers that decrease:");
  console.log(minChain);
} catch (err) {
  console.error(err);
}