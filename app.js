
////////////////////////////////////////////////////////////////////////////////
///Function will check if a number, num, is inside of an array, randomArray, ///
///for use with function to randomly populate page with game pieces.         ///
////////////////////////////////////////////////////////////////////////////////
function isInArray(randomArray, num) {
  if (randomArray.indexOf(num) !== -1) {
    return true;
  }
  else {
    return false;
  }
}
////////////////////////////////////////////////////////////////////////////////
///Takes in array of game pieces, and jQuery object mainDiv. Populates page ////
///with game tokens.                                                        ////
////////////////////////////////////////////////////////////////////////////////
function generateRandomGameBoard(game_token_array, mainDiv) {
  var randomArray = [];
  while (randomArray.length < game_token_array.length) {
    var num = Math.floor(Math.random() * (game_token_array.length));
  //  alert(num);
    if (isInArray(randomArray, num)) {
      continue;
    }
    else {
      mainDiv.append(game_token_array[num][0]);
      console.log(game_token_array[num][0]);
      mainDiv.append(game_token_array[num][1]);
      console.log(game_token_array[num][1]);
      randomArray.push(num);
      console.log(randomArray);
    }
  }
}

var gameSpaces = [
              ['<div class=\'square\'><img src=\'\\face.jpg\'></div>', '<div class=\'square\'><img src=\'\\back.jpg\'></div>'],
              ['<div class=\'square\'><img src=\'\\face.jpg\'></div>', '<div class=\'square\'><img src=\'\\back.jpg\'></div>'],
              ['<div class=\'square\'><img src=\'\\face.jpg\'></div>', '<div class=\'square\'><img src=\'\\back.jpg\'></div>']
            ];
//var numberOfGameSpaces = gameSpaces.length;

var mainDiv = $('.gamemain');
generateRandomGameBoard(gameSpaces, mainDiv);
