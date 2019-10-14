let x, encode_hash, md5_str;
let price = 0;
let arr = [];

let userMoney = 10000;
reloadMoney();

$('.button').on('click', function(){ 
		$(this).toggleClass('orangeColor');
		let id = $(this).attr("value");
		pullNums(id);
});

function reloadMoney(){
	document.getElementById("money").innerHTML = userMoney + " RUB.";
}

function pullNums(num){
	let len = arr.length;
	let check = false;

	if(len > 0){
		for (let i = 0; i < arr.length; i++) {
			if(arr[i] == num) check = true;
		}
	}else{
		arr.push(num);
		getPrice();
		return;
	}

	if(check){
		for (let i = 0; i < arr.length; i++) {
			if(arr[i] == num) arr[i] = "DEL";
		}
	}else{
		arr.push(num);
	}
	getPrice();
}

function getPrice(){
	let x = 0;
	for (let i = 0; i < arr.length; i++) {
		if(arr[i] != "DEL") x++;
	}	
	price = x;
	document.getElementById("price").innerHTML = x + " RUB.";
}

function play(){
	if(price == 0) return;
	if(price > userMoney){
		alert("Недостаточно средств.");
		return;
	}

	userMoney -= price;
	reloadMoney();

	let win = false;
	for (let i = 0; i < arr.length; i++) {
		if(arr[i] == x) win = true;
	}

	if(win){
		userMoney += 90;
		reloadMoney();
	}

	hide_or_look();

	document.getElementById("look_at").innerHTML = encode_hash;

}

function hide_or_look(){
	$('#en_md5').toggleClass('displayNone');
	$('#playBtn').toggleClass('displayNone');
	$('#play_newBtn').toggleClass('displayNone');
}


function newGame(){
			x = Math.floor(Math.random() * 100) + 1;
	let y = (Math.random() * 100) + 1;
	encode_hash = "NUM:_" + x + "_SALT:" + y;
	md5_str = MD5(encode_hash);
	document.getElementById("md5_look").innerHTML = md5_str;

}

function newplay(){
	hide_or_look();
	newGame();
	$('.line div').removeClass('orangeColor');
	arr = [];
	getPrice();
}

newGame();