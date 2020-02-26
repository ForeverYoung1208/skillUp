'use strict'

function filterOnInclusion() {
  var filterParams = arguments[0]
  var value = arguments[1]
  
  return filterParams.includes(value)
}

function filterOnMinMax() {
  var filterParams = arguments[0]
  var value = arguments[1]
  
  return ( value > filterParams.min && value < filterParams.max )
}