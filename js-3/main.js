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


function Menu(userOptions, quitString){ //[{key:string, optionName:string, optionFn:function }, string]
	var options = userOptions.slice()
	options.push({
		key:'q',
		optionName: quitString,
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

function isIncludes(inArray, thing) {
	if (!inArray || inArray.length<1) return true;
	if (inArray.includes(thing)) return true;
	return false
}

function isInMinMax(min, max, thing){
	if (!min || !max) return true;
	if (thing>min && thing<max) return true;
	return false
}


function Filters(initFilters){
	this.category = initFilters.category;
	this.manufacturer = initFilters.manufacturer;
	this.price = initFilters.price;
	this.createdAt = initFilters.createdAt;

	var categoryPasses = isIncludes;
	var manufacturerPasses = isIncludes;
	var pricePasses = isInMinMax;
	var createdAtPasses = isInMinMax;

	this.testProduct = function(product){
		var isFilteredOut = false

		if ( !categoryPasses(this.category, product.category) )
			{isFilteredOut = true};

		if ( !manufacturerPasses(this.manufacturer, product.manufacturer) )
			{isFilteredOut = true};

		if( !pricePasses(this.price.min, this.price.max, product.price) )
			{isFilteredOut = true};

		if( !createdAtPasses(this.createdAt.min, this.createdAt.max, product.createdAt) )
			{isFilteredOut = true};		

		return !isFilteredOut
	}.bind(this)
}

function Products(initProductList){
	this.all = JSON.parse( initProductList, function (key,value) {
		if (key ==='createdAt'){
			value = new Date(value)
		}
		return value
	})

	// var testFilters = {
	// 	category:['TV','Laptop'],
	// 	manufacturer:['man'],
	// 	price:{min:111, max:222},
	// 	createdAt:{min:4444, max:5555}
	// }
	var testFilters = {
		category:['TV', 'Laptop'],
		manufacturer:[],
		price:{},
		createdAt:{}
	}

	this.activeFilters = new Filters( testFilters );
	
	this.list = function(){

		var totalQuantity = 0, totalPrice = 0, averagePrice = 0;

		var productsToDisplay = this.all
		.filter(this.activeFilters.testProduct)
		.map(function(product) {
			totalQuantity ++;
			totalPrice += product.price
			var productToDisplay = {}
			return Object.assign(productToDisplay, product,{createdAt: product.createdAt.toLocaleString('ru', { hour12: false })} )
		});
		
		console.table(productsToDisplay)

		console.log('[this.activeFilters]', JSON.stringify(this.activeFilters));
		console.log('[totalQuantity]', totalQuantity);
		console.log('[totalPrice]', totalPrice);
		totalQuantity > 0 ? averagePrice = totalPrice/totalQuantity : averagePrice = 0 ;
		console.log('[averagePrice]', averagePrice.toFixed(2));
	}

	this.setFilter = function (filterStr) {
		//...
	}

	this.askFilters = function (params) {
		//...
	}

	this.setSort



}

//  alert('Hi!')

var products1 = new Products(jsonProducts)
var mainMenuOptions=[{
	key: 'a', 
	optionName: 'Посмотреть список товаров', 
	optionFn: function(){ products1.list()}
},{
	key: 'b', 
	optionName: 'Установить фильтры', 
	optionFn: function(){ 
		filters = products1.askFilters()
		products1.setFilters() 
	}
},{
	key: 'c', 
	optionName: 'Сортировать товары', 
	optionFn: function(){ }
}]
var mainMenu = new Menu(mainMenuOptions, 'Выход из программы');

mainMenu.callMenu();
