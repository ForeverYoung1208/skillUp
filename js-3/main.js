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

function findMinMax(inArray, propName){
	var arr = inArray.map(function(el){	return el[propName] })
	var min = Math.min.apply(Math, arr) 
	var max = Math.max.apply(Math, arr) 
	return {min:min, max:max}
}


//===========================================================================

////      /////
/// ///  /// ///
///   ///   ///
///   ///    ///
///         ///
///         ///

function Menu(userOptions, quitString, wrongChoiseFn, isAutoclose = false){ //[{key:string, optionName:string, optionFn:function, wrongChoiseFn:function, isAutoclose:boolean }, string]
	var options = userOptions.slice()
	options.push({
		key:'q',
		optionName: quitString,
		optionFn: function(){ this.doNextChoise = false; },
	})

	var optionsText = options.reduce(function(prev, curr){
		return prev + curr.key + ') '+curr.optionName+'\n';
	},'Please select: \n' )

	this.doNextChoise = true;

	this.callMenu = function (){
		var _self = this;
		while (this.doNextChoise) {

			var userChoise = prompt(optionsText);
			var isOptionFound = false;

			options.forEach(function (option) {
				if (option.key === userChoise){
					isOptionFound = true;
					option.optionFn.call(_self) //sets doNextChoise to fasle if "q" selected
				}
			})

			if (!isOptionFound){ 
				console.log(userChoise+' selected, processing and redirecting to main menu!')
				wrongChoiseFn(userChoise);
			}

			isAutoclose ? null : this.doNextChoise = false;

		}
	}
}

///////////
//////////
///
/// 
/////////
/////////
///
///
///
function Filters(initFilters){
	
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
	var categoryPasses = isIncludes;
	var manufacturerPasses = isIncludes;
	var pricePasses = isInMinMax;
	var createdAtPasses = isInMinMax;
	
	//seter function
	this.applyFilters = function(filters){
		this.category = filters.category;
		this.manufacturer = filters.manufacturer;
		this.price = Object.assign({},filters.price);
		this.createdAt = Object.assign({},filters.createdAt);
	}.bind(this)

	//call seter function
	this.applyFilters(initFilters)
	this.addIsIncludesFilters = function(categoryFilters,filterType){
		this[filterType] = this[filterType].concat(categoryFilters)
		// console.log(JSON.stringify(this))
	}

	this.setIsIncludesFilters = function(categoryFilters,filterType){
		this[filterType] = categoryFilters.slice('')
		// console.log(JSON.stringify(this))
	}

	this.setMinMaxFilter = function(min, max, filterType) {
		this[filterType].min = min;
		this[filterType].max = max;
		// console.log(JSON.stringify(this))
	}

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


	///////
/////////
/// 
///	
  /////
   /////
		 ///
		 ///
//////
/////

function Sorter(initSortOn){
	this.sortOn = initSortOn,
	this.isDescend = false;
	this.setSortOn = function(sortOn, isDescend){
		this.sortOn = sortOn
		this.isDescend = isDescend
	}.bind(this)


	this.sort = function(product1,product2){
		var invert;
		this.isDescend ? invert=-1 : invert=1;
	

		function stringSort(stringA,stringB,desc) {
			var a = stringA.toUpperCase();
			var b = stringB.toUpperCase();
			if (a < b) {
				return -1*invert;
			}
			if (a > b) {
				return 1*invert;
			}
			return 0;			
		}

		switch (this.sortOn){
			case 'category':
				return stringSort(product1[this.sortOn], product2[this.sortOn]);
				break;
			case 'manufacturer':
				return stringSort(product1[this.sortOn], product2[this.sortOn]);
				break;
			case 'price':
				return (product1[this.sortOn] - product2[this.sortOn])*invert;
				break;
			case 'createdAt':
				return (product1[this.sortOn] - product2[this.sortOn])*invert;
				break;
		}

	}.bind(this)
}

///////////
///////////
///     ///
///     ///
//////////
//////////
///
///
///

function Products(initProductList){
	var _self = this
	this.all = JSON.parse( initProductList, function (key,value) {
		if (key ==='createdAt'){
			value = new Date(value)
		}
		return value
	})
	
	var testFilters = {
		category:['TV', 'Laptop'],
		manufacturer:[],
		price:{min:400, max:1250},
		createdAt:{}
	}
	var emptyFilters = {
		category:[],
		manufacturer:[],
		price:{},
		createdAt:{}
	}

	this.activeFilters = new Filters( emptyFilters );
	this.activeSorter = new Sorter('category');
	this.list = function(){
		var totalQuantity = 0, totalPrice = 0, averagePrice = 0;
		var productsToDisplay = this.all
			.filter(this.activeFilters.testProduct)
			.sort(this.activeSorter.sort)
			.map(function(product) {
				totalQuantity ++;
				totalPrice += product.price
				var productToDisplay = {}
				return Object.assign(productToDisplay, product,{createdAt: product.createdAt.toLocaleString('ru', { hour12: false })} )
		});
		
		console.table(productsToDisplay)
		console.log('[this.activeFilters]', JSON.stringify(this.activeFilters));
		console.log('[this.activeSorter]', JSON.stringify(this.activeSorter));
		console.log('[totalQuantity]', totalQuantity);
		console.log('[totalPrice]', totalPrice);
		totalQuantity > 0 ? averagePrice = totalPrice/totalQuantity : averagePrice = 0 ;
		console.log('[averagePrice]', averagePrice.toFixed(2));
	}

	this.askFilters = function () {
		var filtersMenu = new Menu( filtersMenuOptions, '--Back--', function(selection){
			console.log('wrong choise!', selection)
		} );
		filtersMenu.callMenu();
	}

	this.askSorting = function () {
		var sortMenu = new Menu( sortMenuOptions, '--Back--', function(selection){
			if ( selection[1]==='r' && ['a','b','c','d'].includes(selection[0]) ){
				// _self.activeSorter.isDescend = true;

				// ОХ И КАСТЫЛЬ... приходится так как мы уже в отбраковке, и в обычный колбек меню уже не попадём
				switch(selection[0]){
					case 'a':
						products1.activeSorter.setSortOn('category', true);					
						break;
					case 'b':
						products1.activeSorter.setSortOn('price', true);					
						break;
					case 'c':
						products1.activeSorter.setSortOn('manufacturer', true);					
						break;
					case 'd':
						products1.activeSorter.setSortOn('createdAt', true);					
						break;
				}

			} else {
				console.log('wrong choise:', selection);
			}

			console.log('[_self.activeSorter]', JSON.stringify(_self.activeSorter));
			
		} );
		
		sortMenu.callMenu();
	}

	//use this method to show dialog to ask array of values (prop filterType) to filter products with this array
		this.includesFilterDialog = function(filterType){
		var dialogOptions = []
		var abc = 'abcdefghijklmnoprstuvwxyz'

		// prepare menu options and behavior of each single selection
		this.all.forEach(function(product,index) {
			dialogOptions.push(
				{
					key: abc[index],
					optionName: product[filterType],
					optionFn: function (){ 
						_self.activeFilters.setIsIncludesFilters([product[filterType]], filterType) 
						console.log('[_self.activeFilters]', JSON.stringify(_self.activeFilters));
					}
				}
			)
		})

		//service function for transformation of selection string like 'abc-' into
		//corresponding array of strings taken from menuOptions
		function selectionToNamesArray(selectionStr, menuOptions){
			if (!selectionStr) return[];
			var categories = [];
			var foundOption;
			var isInvert = selectionStr[selectionStr.length-1]==='-'
			var selectionArr = selectionStr.split('')
			menuOptions.forEach(function(menuOption,index){
				foundOption = null;
				!isInvert 
					? foundOption = selectionArr.some(sel => sel===menuOption.key )
				 	: foundOption = !selectionArr.some(sel => sel===menuOption.key )

				foundOption ? categories.push( menuOptions[index].optionName) : null
			})
			return categories
		}

		// set filter dialog menu and set it's behavior in case of other selection (we need to process
		// selection like 'abc-')
		var filterDialog = new Menu(dialogOptions, '--Back--', function(otherSelection){ 
			_self.activeFilters.setIsIncludesFilters(selectionToNamesArray(otherSelection, dialogOptions), filterType);
			console.log('[_self.activeFilters]', JSON.stringify(_self.activeFilters));
			// _self.list();
		})
		// launch filter dialog
		filterDialog.callMenu();
	}

	this.addPriceFilterDialog = function() {
		var min = prompt('filter on price, enter min price: ' , findMinMax(_self.all, 'price').min); 
		var max = prompt('filter on price, enter max price: ' , findMinMax(_self.all, 'price').max);
		_self.activeFilters.setMinMaxFilter(min, max, 'price')
		console.log('[_self.activeFilters]', JSON.stringify(_self.activeFilters));
		// _self.list();
	}

	this.addCreatedAtFilterDialog = function() {
		var min = prompt('filter on createrAt, enter min date (format MM.YYYY): '); 
		var max = prompt('filter on createrAt, enter max date (format MM.YYYY): ');
		var minDate = new Date(+min.split('.')[1], +min.split('.')[0]); 
		var maxDate = new Date(+max.split('.')[1], +max.split('.')[0]);
		_self.activeFilters.setMinMaxFilter(minDate, maxDate, 'createdAt')
		console.log('[_self.activeFilters]', JSON.stringify(_self.activeFilters));

		// _self.list();		
	}

	this.clearFilters = function () {
		this.activeFilters.applyFilters(emptyFilters)
		console.log('[_self.activeFilters]', JSON.stringify(_self.activeFilters));
	}
}







///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


var products1 = new Products(jsonProducts)

///////// static menus
var mainMenuOptions=[{
	key: 'a', 
	optionName: 'Посмотреть список товаров', 
	optionFn: function(){ products1.list()}
},{
	key: 'b', 
	optionName: 'Установить фильтры', 
	optionFn: function(){ products1.askFilters() }
},{
	key: 'c', 
	optionName: 'Сортировать товары', 
	optionFn: function(){ products1.askSorting()}
}]

var filtersMenuOptions = [{
	key: 'a', 
	optionName: 'категория', 
	optionFn: function(){ products1.includesFilterDialog('category');}
},{
	key: 'b', 
	optionName: 'цена', 
	optionFn: function(){ products1.addPriceFilterDialog();}
},{
	key: 'c', 
	optionName: 'производитель', 
	optionFn: function(){ products1.includesFilterDialog('manufacturer');}
},{
	key: 'd', 
	optionName: 'дата изготовления', 
	optionFn: function(){ products1.addCreatedAtFilterDialog();}
},{
	key: 'e', 
	optionName: 'сброс фильтров', 
	optionFn: function(){ products1.clearFilters();}
}]

var sortMenuOptions = [{
	key: 'a', 
	optionName: 'категория', 
	optionFn: function(){ 
		products1.activeSorter.setSortOn('category');
		console.log('[products1.activeSorter]', JSON.stringify(products1.activeSorter));
	}
},{
	key: 'b', 
	optionName: 'цена', 
	optionFn: function(){ 
		products1.activeSorter.setSortOn('price');
		console.log('[products1.activeSorter]', JSON.stringify(products1.activeSorter));
	}
},{
	key: 'c', 
	optionName: 'производитель', 
	optionFn: function(){ 
		products1.activeSorter.setSortOn('manufacturer');
		console.log('[products1.activeSorter]', JSON.stringify(products1.activeSorter));
	}

},{
	key: 'd', 
	optionName: 'дата изготовления', 
	optionFn: function(){ 
		products1.activeSorter.setSortOn('createdAt');
		console.log('[products1.activeSorter]', JSON.stringify(products1.activeSorter));
	}

},{
	key: 'r', 
	optionName: 'В обратном порядке', 
	optionFn: function(){console.log('you need to add "r" to other selection');}
}]


var mainMenu = new Menu(mainMenuOptions, 'Выход из программы', function(selection){console.log('wrong choise!', selection)}, true)


mainMenu.callMenu();
