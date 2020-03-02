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
var outputEl = document.getElementById('output')
var jsonProducts = '[{"category":"TV","price":1500,"manufacturer":"Sony","createdAt":"2019-05-28T17:55:29.945Z"},{"category":"Laptop","price":1200,"manufacturer":"Acer","createdAt":"2019-05-28T19:55:29.946Z"},{"category":"Smartphone","price":750,"manufacturer":"Apple","createdAt":"2018-03-08T10:45:00.000Z"},{"category":"Fridge","price":1850,"manufacturer":"Vestfrost","createdAt":"2018-05-28T17:55:29.946Z"},{"category":"Boiler","price":500,"manufacturer":"Indesit","createdAt":"2014-12-25T08:30:00.000Z"},{"category":"Stove","price":700,"manufacturer":"Gorenje","createdAt":"2018-09-17T11:00:00.000Z"},{"category":"Washing Machine","price":850,"manufacturer":"Electrolux","createdAt":"2019-05-28T18:55:29.946Z"},{"category":"Vacuum Cleaner","price":450,"manufacturer":"Samsung","createdAt":"2019-05-13T17:55:29.946Z"},{"category":"Conditioner","price":1000,"manufacturer":"Toshiba","createdAt":"2017-07-01T00:00:00.000Z"},{"category":"Iron","price":320,"manufacturer":"Philips","createdAt":"2013-11-18T07:20:00.000Z"},{"category":"Teapot","price":400,"manufacturer":"Bosch","createdAt":"2016-10-03T09:45:00.000Z"},{"category":"Electric Shaver","price":440,"manufacturer":"Braun","createdAt":"2019-05-29T03:55:29.946Z"},{"category":"Toaster","price":620,"manufacturer":"Tefal","createdAt":"2015-05-29T03:55:29.946Z"},{"category":"Coffee Machine","price":1300,"manufacturer":"Delonghi","createdAt":"2019-05-28T02:55:29.946Z"}]';



function Machine(param) {
	const {dimensions={x:0,y:0,z:0}, color} = param;
	this._dimensions = dimensions;
	this._color = color;
};
Machine.prototype.output = outputEl
Machine.prototype.showInfo = function(){
	let out = document.createElement('div')
	out.innerText = 'size: ' + JSON.stringify(this._dimensions) + ', color:' + this._color;
	output.appendChild(out)
}


function HomeMachine(param){
	Machine.apply(this, arguments)
	const {manufacturer} = param;
	this._manufacturer = manufacturer;
}
HomeMachine.prototype = Object.create( Machine.prototype )
HomeMachine.prototype.constructor= HomeMachine ;
HomeMachine.showInfo = function () {
    Machine.showInfo.call(this);
}
HomeMachine.prototype.setManufacturer = function(mName){
    this._manufacturer = mName;
}
HomeMachine.prototype.showManufacturer = function(){
	let out = document.createElement('div')
	out.innerText = this._manufacturer;
	output.appendChild(out)

}


let tv = new Machine({color:'black'});
tv.showInfo();

let fridge = new Machine({dimensions: {x:500, y:500, z:2000}, color:'white'})
fridge.showInfo();

let coffeeMachine = new HomeMachine({dimensions: {x:300, y:300, z:300}, color:'white'}, {manufacturer:'Samsung'})
coffeeMachine.showInfo();
coffeeMachine.showManufacturer();
coffeeMachine.setManufacturer('Samsung')
coffeeMachine.showManufacturer();
console.log('[coffeMachine]', coffeeMachine);