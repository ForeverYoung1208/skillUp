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
		optionName:'Выход из программы',
			optionFn: function(){ this.doNextChoise = false; }
	})

	var optionsText = options.reduce(function(prev, curr){
		return prev + curr.key + ') '+curr.optionName+'\n';
	},'Please select: \n' )

	this.doNextChoise = true;

	this.callMenu = function (){
		var _self = this;
		while (this.doNextChoise) {

			var userChoise = prompt(optionsText);

			options.forEach(function (option) {
				option.key === userChoise ?	option.optionFn.call(_self) : null
			})

			if (this.doNextChoise){
				confirm('Do you want to continue?') 
					? null 
					: this.doNextChoise=false
			}
		}
	}
}


// a) Посмотреть список товаров
// b) Установить фильтры
// c) Сортировать товары
// q) Выход из программы //present as default in Menu

function Products(initProductList){
	this.all = JSON.parse( initProductList, function (key,value) {
		if (key ==='createdAt'){
			value = new Date(value)
		}
		return value
	})


	this.list = function(){
		var productsToDisplay = this.all.slice();

		console.table(productsToDisplay)
	}

	this.setFilter = function (filterStr) {
		//...
	}

	this.setSort



}

var products1 = new Products(jsonProducts)

var testMenuOptions=[{
	key: 'a', 
	optionName: 'Посмотреть список товаров', 
	optionFn: function(){ products1.list()}
	
	
},{
	key: 'b', 
	optionName: 'Установить фильтры', 
	optionFn: function(){ }
		
	
},{
	key: 'c', 
	optionName: 'ортировать товары', 
	optionFn: function(){ }
}]

// alert('Hi!')
var menu1 = new Menu(testMenuOptions);
menu1.callMenu();
