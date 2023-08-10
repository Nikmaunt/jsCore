
function myFilter () {
	let filterNum= [];
	for(let i=0; i<numbers.length; i++){
		if(numbers[i]>5) filterNum.push( numbers[i] );
	}
}


document.write(`Исходный массив: ${numbers}<br>
  Отфильтрованный массив: ${filterNum}`);