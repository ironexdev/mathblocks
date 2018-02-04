"use strict";

var pointerStartEvent;

if("ontouchstart" in document.documentElement === false)
{
  pointerStartEvent = "click";
}
else
{
  pointerStartEvent = "touchstart";
}

mathblocks();

function mathblocks()
{
  /* id */
  var $autosaveInfo = document.getElementById("js-autosave-info");
  var $autosaveInfoToggle = document.getElementById("js-autosave-info-toggle");
  var $autosaveToggle = document.getElementById("js-autosave-toggle");
  var $board = document.getElementById("js-board");
  var $evaluate = document.getElementById("js-evaluate");
  var $gameOver = document.getElementById("js-game-over");
  var $intro = document.getElementById("js-intro");
  var $level = document.getElementById("js-level");
  var $levelFail = document.getElementById("js-level-fail");
  var $levelSuccess = document.getElementById("js-level-success");
  var $mathblocks = document.getElementById("js-mathblocks");
  var $menu = document.getElementById("js-menu");
  var $newGame = document.getElementById("js-new-game");
  var $restartGame = document.getElementById("js-restart-game");
  var $result = document.getElementById("js-result");
  var $savedGame = document.getElementById("js-saved-game");
  
  /* class */
  var $menuToggle = document.getElementsByClassName("js-menu-toggle");
  var $nextLevel = document.getElementsByClassName("js-next-level");
  var $restartGame = document.getElementsByClassName("js-restart-game");
  var $restartLevel = document.getElementsByClassName("js-restart-level");
  var $resume = document.getElementsByClassName("js-resume");
  var $startGame = document.getElementsByClassName("js-start-game");
  var $tryAgain = document.getElementsByClassName("js-try-again");

  /* string */
  var _noTouch = "js-no-touch";
  var _selected = "js-selected";

  mathblocks.difficultyIndex = 5; // increase difficulty (setSize) every x levels
  mathblocks.limit = { min : -20, max : 20 };
  mathblocks.maxLevel = 40;
  mathblocks.size = 16;
  mathblocks.result = 0; 
  mathblocks.values = [];
  mathblocks.$blocks = "";

  /* Load level from localStorage */
  if(typeof localStorage.level !== "undefined" && localStorage.level > 1) // saved game
  {
    $autosaveToggle.checked = true;
    mathblocks.level = localStorage.level;
    mathblocks.setSize = mathblocks.level < (mathblocks.difficultyIndex * 2) ? 2 : Math.floor(mathblocks.level / mathblocks.difficultyIndex);
    addClass($savedGame, _selected);
  }
  else // new game
  {
    mathblocks.level = 1;
    mathblocks.setSize = 2;
    addClass($newGame, _selected);
  }

  if(pointerStartEvent === "click")
  {
    addClass($mathblocks, _noTouch);
  }

  /* Update level in document */
  $level.innerHTML = mathblocks.level;

  /* Store game progress in localStorage before unloading the window */
  window.onbeforeunload = function()
  {
    if($autosaveToggle.checked === true)
    {
      localStorage.level = mathblocks.level;
    }
    else
    {
      delete localStorage["level"];
    }
  };

  $autosaveInfoToggle.addEventListener(pointerStartEvent, function()
  {
    if(hasClass(this, _selected) === true)
    {
      removeClass(this, _selected);
      removeClass($autosaveInfo, _selected);
    }
    else
    {
      addClass(this, _selected);
      addClass($autosaveInfo, _selected);
    }
  });

  $evaluate.addEventListener(pointerStartEvent, function()
  {
    if(hasClass(this, _selected) === true)
    {
      evaluateBoard();
    }
  });

  massAddEventListener($menuToggle, pointerStartEvent, function()
  {
    addClass($menu, _selected);
  });

  massAddEventListener($nextLevel, pointerStartEvent, function()
  {
    setBoard((function()
    {
      removeClass($levelSuccess, _selected);
    }));
  });  

  massAddEventListener($resume, pointerStartEvent, function()
  {
    removeClass($menu, _selected);
  });
  
  massAddEventListener($restartGame, pointerStartEvent, function()
  {
    mathblocks.level = 1;

    $level.innerHTML = mathblocks.level;

    setBoard((function()
    {
      removeClass($intro, _selected);
    }));
  });

  massAddEventListener($restartLevel, pointerStartEvent, function()
  {
    setBoard((function()
    {
      removeClass($menu, _selected);
    }));
  });

  massAddEventListener($startGame, pointerStartEvent, function()
  {
    setBoard((function()
    {
      removeClass($intro, _selected);
    }));
  });

  massAddEventListener($tryAgain, pointerStartEvent, function()
  {
    removeClass($levelFail, _selected);
  });
  
  function evaluateBoard()
  {
    if(getSum(mathblocks.values) === mathblocks.result) // level success
    {
      if(mathblocks.level < mathblocks.maxLevel)
      {
        if(mathblocks.level % mathblocks.difficultyIndex === 0)
        {
          mathblocks.setSize++; // increase setSize
        }

        mathblocks.level++; // increase level

        $level.innerHTML = mathblocks.level;

        addClass($levelSuccess, _selected);
      }
      else // game finished
      {
        addClass($gameOver, _selected);
      }
    }
    else // level fail
    {
      addClass($levelFail, _selected);
    }
  }

  function setBoard(callback)
  {
    var blocks = randomUniqueInts(mathblocks.limit.min, mathblocks.limit.max, mathblocks.size, true);
    var positions = randomUniqueInts(0, mathblocks.size - 1, mathblocks.setSize, false);
    var result = 0;

    mathblocks.values = [];
    removeClass($evaluate, _selected);

    for(var i = 0; i < blocks.length; i++)
    {
      if(inArray(i, positions) === true)
      {
        result = result + blocks[i];
      }
    }

    var number;
    var html = "";
    var lastColumn;
    var lastRow;

    for(var i = 1; i <= blocks.length; i++)
    {
      lastColumn = "";
      lastRow = "";

      if(i % Math.sqrt(mathblocks.size) === 0) // last column
      {
        lastColumn = "last-column";
      }

      if(i > (mathblocks.size - Math.sqrt(mathblocks.size))) // last row
      {
        lastRow = "last-row";
      }

      number = blocks[i-1] > 0 ? "+" + blocks[i-1] : blocks[i-1];
      html += "<div class='block js-block " + lastColumn + " " + lastRow + "' data-value='" + number + "'><div>" + number + "</div></div>";
    }

    $board.innerHTML = html;
    $result.innerHTML = result;

    mathblocks.result = result;
    mathblocks.$blocks = $board.getElementsByClassName("js-block");

    massAddEventListener(mathblocks.$blocks, pointerStartEvent, triggerBlock);

    callback();
  }
  
  function triggerBlock()
  {
    var value = parseInt(this.getAttribute("data-value"));

    if(inArray(value, mathblocks.values) === true) // value is already selected
    {
      mathblocks.values = removeFromArrayByValue(value, mathblocks.values);

      removeClass(this, _selected);
      removeClass($evaluate, _selected);
    }
    else
    {
      if(mathblocks.values.length < mathblocks.setSize)
      {
        mathblocks.values.push(value);

        addClass(this, _selected);

        if(mathblocks.values.length === mathblocks.setSize)
        {
          addClass($evaluate, _selected);
        }
      }
    }
  }
}