var intervalFunction; //global variable is used to clear interval in timer function.
var time_global;
////////////////////////////////////////////////////////////////////////////////
///function takes in mainDiv jquery object and then sets up a timer using the
///setInterval function.
////////////////////////////////////////////////////////////////////////////////

function timer(main_div) {
  var seconds = 0;
  var minutes = 0;
  main_div.append('<div class=\'timer\'>00:00</div>')
  clearInterval(intervalFunction);
  intervalFunction = setInterval(function() {
    seconds += 1;
    if (seconds > 59) {
      minutes = seconds / 60;
      seconds = 0;
    }
    if (minutes < 10) {
      $('.timer').text('0' + minutes + ':' + seconds);
      time_global = ('0' + minutes + ':' + seconds);
    }
    else {
      $('.timer').text(minutes + ':' + seconds);
      time_global = (minutes + ':' + seconds);
    }
  },1000);
}


////////////////////////////////////////////////////////////////////////////////
///Function will check if a number, num, is inside of an array, randomArray, ///
///for use with function generateRandomGameBoard()                           ///
////////////////////////////////////////////////////////////////////////////////
function isInArray(random_array, num) {
  if (random_array.indexOf(num) !== -1) {
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
function isDivisibleByFour(random_array, main_div) {
  if (random_array.length % 4 === 0) { //4X4 grid thus % 4
    main_div.append('<div class=\'clear\'></div>');
  }
  else {
    return;
  }
}

////////////////////////////////////////////////////////////////////////////////
///Takes in array of game pieces, and jQuery object mainDiv. Populates page ////
///with game tokens.                                                        ////
////////////////////////////////////////////////////////////////////////////////
function generateRandomGameBoard(game_token_array, main_div) {
  var randomArray = [];
  main_div.append('<img id=\'reset\' src=\'reset.jpg\'> <h1>Memory</h1>');
  while (randomArray.length < game_token_array.length) {
    var num = Math.floor(Math.random() * (game_token_array.length));
  //  alert(num);
    if (isInArray(randomArray, num)) {
      continue;
    }
    else {
      main_div.append(game_token_array[num][0]);
      main_div.append(game_token_array[num][1]);
      randomArray.push(num);
      isDivisibleByFour(randomArray, main_div);
    }
  }
      main_div.append('<p class=\'scoreboardtext\'>Number of Clicks: 0</p><p class=\'rating\'>★★★</p>');
      timer(main_div);

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
  $('.'+ classTagForAnimation2).fadeOut(1000);
  $('.' + classTagForAnimation2).fadeIn(1000);
  $('.' + classTagForAnimation2).removeClass('vanish');
}

///////////////////////////////////////////////////////////////////////////////
///  takes parameter of number of matching pairs found, if 8 pairs found    ///
///  you win! After winCase met, startGame() is called to reset game        ///
///////////////////////////////////////////////////////////////////////////////
function checkWinCase(win_case, clicks_score, time_global) {
  if (win_case === 8) {
    var stars_end = rateStars(clicks_score)
    alert('YOU WON IN ' + clicks_score + ' CLICKS IN ' + time_global + ', WITH A SCORE OF: ' + stars_end);
    startGame(gameSpaces);
  }
}


////////////////////////////////////////////////////////////////////////////////
//// Function is responsible for game onclick events and game logic.        ////
//// Takes in a winCase incrementor, an array of answers, and two integers  ////
//// to keep track of clicks as parameter clicks and clicksScore            ////
////////////////////////////////////////////////////////////////////////////////
function gameLogic(win_case, answers, clicks, clicks_score) {
  resetButton();
  $('.front').click(function() {
    $(this).addClass('vanish');
    answers.push($(this).attr('class'));
    clicks += 1;
    clicks_score += 1; //for use in our 'number of clicks: ' notification.
    rateStars(clicks_score);
    $('.scoreboardtext').text('Number of Clicks: ' + clicks_score);
    if (clicks === 2) {
      clicks = 0;
      //////////////////////////////////////////////
      ///         matching pieces found          ///
      //////////////////////////////////////////////
      if (answers[0] === answers[1]) {
        var classTag = answers[0].split(" ");
        $('.' + classTag[0]).addClass('pairfound');
        answers = [];
        win_case++;
        checkWinCase(win_case, clicks_score, time_global);
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
///////////////////////////////////////////////////////////////////////////////
////  Function takes in number of clicks as parameter clicksScore. After   ////
////  10 clicks rating is lowered to 2 stars, and after 14 clicks rating is////
////  lowered to 1 star.                                                   ////
///////////////////////////////////////////////////////////////////////////////
function rateStars(clicks_score) {
  if (clicks_score <= 25 && clicks_score > 20) {
    $('.rating').text('★★☆');
    return '★★☆';
  }
  else if (clicks_score > 25) {
    $('.rating').text('★☆☆');
    return '★☆☆';
  }
  else {
    return '★★★';
  }
}

////////////////////////////////////////////////////////////////////////////////
//// This function starts the game, and resets the board for newgame case   ////
//// on event of win. Takes in parameter gameSpaces,an array of game spaces.////
////////////////////////////////////////////////////////////////////////////////
function startGame(game_spaces) {
  var $mainDiv = $('.gamemain');
  var clicks = 0;
  var clicksScore = 0;
  var winCase = 0;
  var answers = [];
  $mainDiv.empty(); //clear the gameboard
  generateRandomGameBoard(game_spaces, $mainDiv);
  gameLogic(winCase, answers, clicks, clicksScore);
}

////////////////////////////////////////////////////////////////////////////////
////        This function makes our reset button into a clickable object.    ///
////////////////////////////////////////////////////////////////////////////////
function resetButton() {
  $('#reset').click(function() {
    startGame(gameSpaces);
  })
}

//////////////////////////////////////////////////////////
/// This array of arrays contains all our game pieces. ///
//////////////////////////////////////////////////////////
var gameSpaces = [];
for (i = 1; i < 9; i++) {
  gameSpaces.push(['<div class=\'square\'><img class=\'' + i +' front\' src=\'face.jpg\'></div>',
  '<div class=\'squareback\'><img class=\'back\' src=\'back'+ i +'.jpg\'></div>']);
  gameSpaces.push(['<div class=\'square\'><img class=\'' + i +' front\' src=\'face.jpg\'></div>',
  '<div class=\'squareback\'><img class=\'back\' src=\'back'+ i +'.jpg\'></div>']);
}


//Top of program. let's start the game!
startGame(gameSpaces);
