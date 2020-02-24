'use strict';
/*
    TV: Телевизор,
    Laptop: Ноутбук,
    Smartphone: Смартфон,
    Fridge: Холодильник,
    Boiler: Бойлер,
    Stove: Печь,
    Washing Machine: Стиральная машина,
    Vacuum Cleaner: Пылесос,
    Conditioner: Кондиционер,
    Iron: Утюг,
    Teapot: Чайник,
    Electric Shaver: Электро-бритва,
    Toaster: Тостер,
    Coffee Machine: Кофемашина
*/
var jsonProducts = '[{"category":"TV","price":1500,"manufacturer":"Sony","createdAt":"2019-05-28T17:55:29.945Z"},{"category":"Laptop","price":1200,"manufacturer":"Acer","createdAt":"2019-05-28T19:55:29.946Z"},{"category":"Smartphone","price":750,"manufacturer":"Apple","createdAt":"2018-03-08T10:45:00.000Z"},{"category":"Fridge","price":1850,"manufacturer":"Vestfrost","createdAt":"2018-05-28T17:55:29.946Z"},{"category":"Boiler","price":500,"manufacturer":"Indesit","createdAt":"2014-12-25T08:30:00.000Z"},{"category":"Stove","price":700,"manufacturer":"Gorenje","createdAt":"2018-09-17T11:00:00.000Z"},{"category":"Washing Machine","price":850,"manufacturer":"Electrolux","createdAt":"2019-05-28T18:55:29.946Z"},{"category":"Vacuum Cleaner","price":450,"manufacturer":"Samsung","createdAt":"2019-05-13T17:55:29.946Z"},{"category":"Conditioner","price":1000,"manufacturer":"Toshiba","createdAt":"2017-07-01T00:00:00.000Z"},{"category":"Iron","price":320,"manufacturer":"Philips","createdAt":"2013-11-18T07:20:00.000Z"},{"category":"Teapot","price":400,"manufacturer":"Bosch","createdAt":"2016-10-03T09:45:00.000Z"},{"category":"Electric Shaver","price":440,"manufacturer":"Braun","createdAt":"2019-05-29T03:55:29.946Z"},{"category":"Toaster","price":620,"manufacturer":"Tefal","createdAt":"2015-05-29T03:55:29.946Z"},{"category":"Coffee Machine","price":1300,"manufacturer":"Delonghi","createdAt":"2019-05-28T02:55:29.946Z"}]';
//===========================================================================


function Menu(userOptions){ //[{key:string, optionName:string, optionFn:function <true> }]
	var options = userOptions.slice()
	options.push({
		key:'q',
		optionName:'quit',
		optionFn: function(){ this.doNextChoise = false; }
	})

	var optionsText = options.reduce(function(prev, curr){
			var str = prev + curr.key + ') '+curr.optionName+'\n';
		return str
	},'Please select: \n' )

	this.doNextChoise = true;

	this.callMenu = function (){
		while (this.doNextChoise) {
			var userChoise = prompt(optionsText);
			options.forEach(function (option) {
				option.key === userChoise ?	option.optionFn.call(this) : null
			}.bind(this))
			if (this.doNextChoise){
				confirm('Do you want to continue?') 
					? null 
					: this.doNextChoise=false
			}
		}
	}
}

var testMenuOptions=[{
	key: '1', 
	optionName: 'option1', 
	optionFn: function(){alert('option1 selected'); return true}
},{
	key: '2', 
	optionName: 'option2', 
	optionFn: function(){ console.log('option2 selected'); return true}
}]

alert('Hi!')

var menu1 = new Menu(testMenuOptions);
menu1.callMenu();


// alert('Bye-bye!')