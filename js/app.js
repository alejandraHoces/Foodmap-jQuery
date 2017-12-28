// funcion que coloca todos los filtros de comida en las opciones de seleccion
var addFilters = (function(element) {
  var filtersArr = [];
  for (var i = 0; i < restaurants.length; i++) {
    for (var n = 0; n < restaurants[i].filters.length; n++) {
      filtersArr.push(restaurants[i].filters[n]);
    }
  }
  var uniqueFilters = [...new Set(filtersArr)];
  var filtersFinal = uniqueFilters.sort();
  for (var a = 0; a < filtersFinal.length; a++) {
    element.append("<option value='"+filtersFinal[a]+"'>"+filtersFinal[a]+"");
  };
  return filtersFinal;
});
