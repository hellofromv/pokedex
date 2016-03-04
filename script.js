$(document).ready(function() {
  var allPokemonURL = 'http://pokeapi.co/api/v2/pokemon/';
  
  // myPokeObj {
  //   charmander: {
  //     index: 4,
  //     pic: '';
  //   }
  // }

  var myPokeObj = {};
  var pokeIndex;

  $.get(allPokemonURL, function(pokemonArray) {
    var firstGen = pokemonArray.slice(0, 151)

    firstGen.forEach(function(pokemonObj, index) {
      var newRow = $("<tr>");
      pokeIndex = index + 1;
      myPokeObj[pokemonObj.name] = {
        index: pokeIndex,
        pic: function(index) {
          return "http://pokeapi.co/media/img/" + index + ".png";
        }(pokeIndex)
      }

      newRow.append("<td>" + pokeIndex + "</td>");
      newRow.append("<td><a data-url='" + pokemonObj.url + "'>" + pokemonObj.name + "</a></td>");
      newRow.append("<td><button add-poke class='" + pokemonObj.name + "'>Add</button></td>");
      newRow.append("<td><button remove-poke class='" + pokemonObj.name + "'>Remove</button></td>");


      $("table").append(newRow);
    });

  }, 'json');


  // in pokemon-table, when you click the data-url attribute
  $("[data-container=pokemon-table]").on('click', 'a[data-url]', function(event) {
    event.preventDefault();

    if ($('div[poke-img]').children().length > 0) {
      $('div[poke-img]').children().remove();
    }

    // retrieves the data-url attribute from what you clicked (the pokemon name)
    var specificURL = $(event.target).attr('data-url');

    $.get(specificURL, function(pokemonObj) {
      var name = pokemonObj.name;
      var height = pokemonObj.height;
      var weight = pokemonObj.weight;
      var types = pokemonObj.types.map(function(el) {
        return el.type.name;
      }).join(', ');
      var moves = pokemonObj.moves.map(function(el) {
        return el.move.name;
      }).join(', ');

      var pokedex = $('[data-container=pokedex]');

      pokedex.find('h3[poke-name]').text(name);
      pokedex.find('h2[poke-height]').text("Height: " + height);
      pokedex.find('h2[poke-weight]').text("Weight: " + weight);
      pokedex.find('h4[poke-types]').text("Type: " + types);
      pokedex.find('h4[poke-moves]').text(moves);

      var aPokemon = $('<img class=a-pokemon>');
      for (var key in myPokeObj) {
        if (key === pokemonObj.name) {
          $(aPokemon).attr('src', "http://pokeapi.co/media/img/" + myPokeObj[pokemonObj.name].index + ".png");
          $('div[poke-img]').append(aPokemon);
        }
      }
    }, 'json');
  });


  // in pokemon-table, when you click the button
  $("[data-container=pokemon-table]").on('click', 'button[add-poke]', function(event) {
    event.preventDefault();

      // retrieve the src attribute which returns string of pokemon name
      var poke = $(event.target).attr('class');
      // returns link in a string
      var link = myPokeObj[poke].pic;
      // adds this img tag to the end of the paragraph elements
      $('p').append("<img class='team-" + poke + "'" + "src='" + link + "'>");
  });


  $("[data-container=pokemon-table]").on('click', 'button[remove-poke]', function(event) {
    event.preventDefault();

      var poke = $(event.target).attr('class');
      var link = myPokeObj[poke].pic;
      $(".team-".concat(poke)).remove();
  });


});
