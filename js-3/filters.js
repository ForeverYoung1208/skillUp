'use strict'


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





function filtersFn(argument) {
	var filterParams = arguments[0]
	var product = arguments[1]
	var isFilteredOut = false
	console.log(filterParams)
	console.log(product)

	if ( isIncludes(filterParams.category, product.category) )
		{isFilteredOut = true};

	if ( filterParams.manufacturer.length>0 && !filterParams.manufacturer.includes(product.category))
		{isFilteredOut = true};

	if( filterParams.price.min 
			&& filterParams.price.max 
			&& (product.price<filterParams.price.min || product.price>filterParams.price.max) 
		)
		{isFilteredOut = true};

	if( filterParams.createdAt.min 
			&& filterParams.createdAt.max 
			&& (product.createdAt<filterParams.createdAt.min || product.createdAt>filterParams.createdAt.max) 
		)
		{isFilteredOut = true};


	// if ( filterParams.category.length>0 && !filterParams.category.includes(product.category))
	// 	{isFilteredOut = true};

	// if ( filterParams.manufacturer.length>0 && !filterParams.manufacturer.includes(product.category))
	// 	{isFilteredOut = true};

	// if( filterParams.price.min 
	// 		&& filterParams.price.max 
	// 		&& (product.price<filterParams.price.min || product.price>filterParams.price.max) 
	// 	)
	// 	{isFilteredOut = true};

	// if( filterParams.createdAt.min 
	// 		&& filterParams.createdAt.max 
	// 		&& (product.createdAt<filterParams.createdAt.min || product.createdAt>filterParams.createdAt.max) 
	// 	)
	// 	{isFilteredOut = true};


	return !isFilteredOut
}
