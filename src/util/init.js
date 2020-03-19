export function RenderViewMoney(number){
	if(number === undefined || number <= 0 || typeof(number) !== "number"){
		return
	}
	let strNumber = number.toString();
	let arrString = strNumber.split("");
	let count = 1;

	for(let x = arrString.length; x > 0 ; x--){
		if(count !== 3 || x === 1){
			count += 1;
			continue;
		}
		arrString[x-1] = `.${arrString[x-1]}`
		count = 1;
	}
	return arrString.join('')
}

