
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
//// This function formats our game board into a 4X4 grid, thus the integer ////
//// 4. Function takes the array of already drawn numbers as randomArray    ////
//// It also takes the jQuery object mainDiv, which points to the main <div>////
//// tag of the HTML page.                                                  ////
////////////////////////////////////////////////////////////////////////////////
function isDivisibleByFour(randomArray, mainDiv) {
  if (randomArray.length % 4 === 0) { //4X4 grid thus % 4
    mainDiv.append('<div class=\'clear\'></div>');
  }
  else {
    return;
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
      isDivisibleByFour(randomArray, mainDiv);
      console.log(randomArray);
    }
  }
      mainDiv.append('<p class=\'scoreboardtext\'>Number of Clicks: 0</p>');
}

////////////////////////////////////////////////////////////////////////////////
/// Takes a classTag and animates wrong answer fade in and fade out.         ///
////////////////////////////////////////////////////////////////////////////////
function animateFade(answers) {
  var classTag = answers[0].split(" ");
  var classTag2 = answers[1].split(" ");
  var classTagForAnimation = classTag[0];
  var classTagForAnimation2 = classTag2[2];
  $('.' + classTagForAnimation).removeClass('vanish');
  $('.'+ classTagForAnimation2).fadeOut();
  $('.' + classTagForAnimation2).fadeIn();
  $('.' + classTagForAnimation2).removeClass('vanish');
}

///////////////////////////////////////////////////////////////////////////////
///  takes parameter of number of matching pairs found, if 8 pairs found    ///
///  you win! After winCase met, startGame() is called to reset game        ///
///////////////////////////////////////////////////////////////////////////////
function checkWinCase(winCase) {
  console.log('BROKEN: ' + winCase);
  if (winCase === 8) {
    alert('YOU WIN!!!');
    startGame(gameSpaces);
  }
}

////////////////////////////////////////////////////////////////////////////////
//// Function is responsible for game onclick events and game logic.        ////
//// Takes in a winCase incrementor, an array of answers, and two integers  ////
//// to keep track of clicks as parameter clicks and clicksScore            ////
////////////////////////////////////////////////////////////////////////////////
function gameLogic(winCase, answers, clicks, clicksScore) {
  $('.front').click(function() {
    $(this).addClass('vanish');
    answers.push($(this).attr('class'));
    clicks += 1;
    clicksScore += 1;
    $('.scoreboardtext').text('Number of Clicks: ' + clicksScore);
    if (clicks === 2) {
      clicks = 0;
      //////////////////////////////////////////////
      ///         matching pieces found          ///
      //////////////////////////////////////////////
      if (answers[0] === answers[1]) {
        var classTag = answers[0].split(" ");
        $('.' + classTag[0]).addClass('pairfound');
        answers = [];
        winCase++;
        checkWinCase(winCase);
      }
      //////////////////////////////////////////////
      ///        non-matching piece found        ///
      //////////////////////////////////////////////
      else {
        animateFade(answers);
        answers = [];
      }
    }
  })
}

////////////////////////////////////////////////////////////////////////////////
//// This function starts the game, and resets the board for newgame case   ////
//// on event of win. Takes in parameter gameSpaces,an array of game spaces.////
////////////////////////////////////////////////////////////////////////////////
function startGame(gameSpaces) {
  var $mainDiv = $('.gamemain');
  var clicks = 0;
  var clicksScore = 0;
  var winCase = 0;
  var answers = [];
  $mainDiv.empty(); //clear the gameboard
  generateRandomGameBoard(gameSpaces, $mainDiv);
  gameLogic(winCase, answers, clicks, clicksScore);
}

var gameSpaces = [
              ['<div class=\'square\'><img class=\'ONE front\' src=\'face.jpg\'></div>', '<div class=\'squareback\'><img class=\'back\' src=\'back1.jpg\'></div>'],
              ['<div class=\'square\'><img class=\'ONE front\' src=\'face.jpg\'></div>', '<div class=\'squareback\'><img class=\'back\' src=\'back1.jpg\'></div>'],
              ['<div class=\'square\'><img class=\'TWO front\' src=\'face.jpg\'></div>', '<div class=\'squareback\'><img class=\'back\' src=\'back2.jpg\'></div>'],
              ['<div class=\'square\'><img class=\'TWO front\' src=\'face.jpg\'></div>', '<div class=\'squareback\'><img class=\'back\' src=\'back2.jpg\'></div>'],
              ['<div class=\'square\'><img class=\'THREE front\' src=\'face.jpg\'></div>', '<div class=\'squareback\'><img class=\'back\' src=\'back3.jpg\'></div>'],
              ['<div class=\'square\'><img class=\'THREE front\' src=\'face.jpg\'></div>', '<div class=\'squareback\'><img class=\'back\' src=\'back3.jpg\'></div>'],
              ['<div class=\'square\'><img class=\'FOUR front\' src=\'face.jpg\'></div>', '<div class=\'squareback\'><img class=\'back\' src=\'back4.jpg\'></div>'],
              ['<div class=\'square\'><img class=\'FOUR front\' src=\'face.jpg\'></div>', '<div class=\'squareback\'><img class=\'back\' src=\'back4.jpg\'></div>'],
              ['<div class=\'square\'><img class=\'FIVE front\' src=\'face.jpg\'></div>', '<div class=\'squareback\'><img class=\'back\' src=\'back5.jpg\'></div>'],
              ['<div class=\'square\'><img class=\'FIVE front\' src=\'face.jpg\'></div>', '<div class=\'squareback\'><img class=\'back\' src=\'back5.jpg\'></div>'],
              ['<div class=\'square\'><img class=\'SIX front\' src=\'face.jpg\'></div>', '<div class=\'squareback\'><img class=\'back\' src=\'back6.jpg\'></div>'],
              ['<div class=\'square\'><img class=\'SIX front\' src=\'face.jpg\'></div>', '<div class=\'squareback\'><img class=\'back\' src=\'back6.jpg\'></div>'],
              ['<div class=\'square\'><img class=\'SEVEN front\' src=\'face.jpg\'></div>', '<div class=\'squareback\'><img class=\'back\' src=\'back7.jpg\'></div>'],
              ['<div class=\'square\'><img class=\'SEVEN front\' src=\'face.jpg\'></div>', '<div class=\'squareback\'><img class=\'back\' src=\'back7.jpg\'></div>'],
              ['<div class=\'square\'><img class=\'EIGHT front\' src=\'face.jpg\'></div>', '<div class=\'squareback\'><img class=\'back\' src=\'back8.jpg\'></div>'],
              ['<div class=\'square\'><img class=\'EIGHT front\' src=\'face.jpg\'></div>', '<div class=\'squareback\'><img class=\'back\' src=\'back8.jpg\'></div>']
            ];
//var numberOfGameSpaces = gameSpaces.length;

startGame(gameSpaces);
