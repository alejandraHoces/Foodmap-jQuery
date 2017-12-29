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


$(document).ready(function() {
  // Funcion que crea nuevas opciones
  addFilters($('#filter'));

  // Funcion que carga la primera vista de mi app
  setTimeout(function() {
    $('#first-view').fadeOut();
    $('#main-container').fadeIn();
  }, 2000);

  // Initializando modal
  $('.modal').modal();

  // Hace que las imágenes se muestren cuando el valor de una selección coincide con los filtros del restaurante
  $('#filter').change(function() {
    $('#restaurants-container').children().remove();
    var selection = $('select').val();
    for (var i = 0; i < restaurants.length; i++) {
      for (var n = 0; n < restaurants[i].filters.length; n++) {
        if (restaurants[i].filters[n] === selection) {
          var image = restaurants[i].photo;
          $('#restaurants-container').append("<div class='col s12 l6 xl6'><div class='container-img-p'><p class='overlay-text'>"+restaurants[i].name+"</p>"+image+"</div></div>");
        }
      }
    };
    // Mouseover efecto
    $('.container-img-p').mouseover(function() {
      $(':nth-child(1)', this).css({'opacity': '1'});
    });

    $('.container-img-p').mouseout(function() {
      $(':nth-child(1)', this).css({'opacity': '0'});
    });


    // Añadiendo contenido al modal

    $('.container-img-p').click(function() {
      var place = $(this).children('img').attr('alt');
      for (var i = 0; i < restaurants.length; i++) {
        if (place === restaurants[i].name) {
          $('#title-modal').empty();
          $('#modal-data').empty();
          $('#title-modal').html(restaurants[i].name);
          $('#modal-map').empty();
          for (var n = 0; n < restaurants[i].address.length; n++) {

            $('#modal-map').append("<iframe src='https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3902.7166323305355!2d-77.06060772487115!3d-11.99409894602641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1srestaurantes!5e0!3m2!1ses!2spe!4v1514321665831' allowfullscreen></iframe>");
            $('#modal-data').append('<p>' + restaurants[i].address[n] + '</p>');
          }
          $('#modal-data').append("<p><a href='"+restaurants[i].website+"'>"+restaurants[i].website+"</a></p>");
        }
      }
      $('#modal').modal('open');
      // funcion que hace que al cerrarse el modal retorne a la vista inicial
      $('.modal-overlay').click(function() {
        $('#restaurants-container').children().remove();
        $('#filter').val(null);
      });
    });
  });
});
