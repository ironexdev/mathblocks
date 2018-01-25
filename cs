<!doctype html>               
<html lang="cs">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta name="description" content="Pomůcka pro výuku matematiky hrou.">
<meta name="keywords" content="matematika hrou,matematika,javascript,css">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<link href="https://fonts.googleapis.com/css?family=Josefin+Sans" rel="stylesheet">
<link rel="stylesheet" href="css/style.css" type="text/css"> 
<link href="media/favicon.png" rel="icon" type="image/png">
<!-- Global Site Tag (gtag.js) - Google Analytics -->
<script async src='https://www.googletagmanager.com/gtag/js?id=UA-107065075-1'></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)};
  gtag('js', new Date());
  gtag('config', 'UA-107065075-1');
</script>
<title>Mathblocks</title> 
</head>
<body id="language-cs">

  <div id="js-mathblocks">
    
    <div id="js-header">
      <div class="js-menu-toggle">
        <i class="material-icons md-light md-36">playlist_play</i>
      </div>
      <h1 class="logo">Mathblocks</h1>
    </div>

    <div id="js-board"></div>

    <div id="js-footer">
      <div id="js-result"></div>
      <div id="js-evaluate"><i class="material-icons md-light md-48">done</i></div>
    </div>

    <div id="js-intro" class="overlay js-selected">
      <div id="js-new-game" class="title">Ahoj, pojďmě <u class="js-start-game">hrát</u></div>
      <div id="js-saved-game" class="title"><u class="js-start-game">pokračovat</u> nebo <u class="js-restart-game">začít znovu</u></div>
      <div class="autosave">
        <input id="js-autosave-toggle" type="checkbox">
        <label for="js-autosave-toggle">automatické ukládání</label>
        <i id="js-autosave-info-toggle" class="material-icons md-24">info</i>
      </div>
      <div id="js-autosave-info">
        Pokud povolíte automatické ukládání, tak Váš postup bude průběžně ukládán do <a href="https://en.wikipedia.org/wiki/Web_storage" target="_blank">paměti prohlížeče</a>, což je obdoba <a href="https://en.wikipedia.org/wiki/HTTP_cookie" target="_blank">cookies</a>.
      </div>
      <div class="description">
        obtížnost se mění každých pět úrovní a to zvýšením počtu číslic potřebných k dosažení výsledku
        <br><br>
<pre class="easy">
1  - 5  úroveň : 2 číslice
6  - 10 úroveň : 3 číslice
11 - 15 úroveň : 4 číslice
</pre>
<pre class="medium">
16 - 20 úroveň : 5 číslice
21 - 25 úroveň : 6 číslice
26 - 30 úroveň : 7 číslice
</pre>
<pre class="hard">
31 - 35 úroveň : 8 číslice
36 - 40 úroveň : 9 číslice
</pre>
      </div>
    </div>

    <div id="js-level-fail" class="overlay">
      <button class="button js-try-again">zkusit znovu</button>
      <img class="image-level-fail js-try-again" src="media/fail.svg" alt="Fail">
    </div>

    <div id="js-level-success" class="overlay">
      <button class="button js-next-level">další úroveň</button>
      <img class="image-level-success js-next-level" src="media/success.svg" alt="Success">
    </div>

    <div id="js-game-over" class="overlay">
      <div class="title">Vítězství</div>
      <img class="image-game-over" src="media/game-over.svg" alt="Game Over">
    </div>

    <div id="js-menu" class="overlay">
      <div class="menu-header">
        <div class="info">úroveň <span id="js-level">1</span></div>
        <button class="button js-resume">pokračovat</button>
        <div class="line"></div>
        <button class="button js-restart-level">restartovat úroveň</button>
        <div class="line"></div>
      </div>
      <div class="menu-footer">
        <div class="info">
          Vyberte *x číslic, tak abyste jejich součtem dosáhli *výsledku a následně klikněte na *tlačítko hotovo.
          <br>
          <br>
          Každá úroveň může být neomezeně restartována.
          <br>
          <br>
          --
          <br>
          <br>
          <span class="legend">
            <b>*x</b> - při vybrání dostatečného počtu číslic se *tlačitko hotovo se rozsvítí a bude možné na něj kliknout.
            <br>
            <br>
            <b>*tlačítko hotovo</b> - tlačítko v pravém dolním rohu.
            <br>
            <br>
            <b>*výsledek</b> - velké číslo dole uprostřed.
          </span>
        </div>
      </div>
    </div>
  </div>

  <script type="text/javascript" src="js/library.js"></script>  
  <script type="text/javascript" src="js/directive.js"></script>
</body>
</html>