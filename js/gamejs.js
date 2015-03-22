var latestInput; //used to check for input
var clearTextTimer = null;
var timer;
var timesRun = 0;
var textOnScreen = "";
var previousAct = 0;
var i = 0,
    isTag=false,
    text;
var typeTime = 55;

//<GAME VARIABLES!!!>
var name;
//</GAME VARIABLES!!!>

window.onLoad = (function($) {
  timer = setInterval(fixSizes, 1);
  $("#inputTextMain").keypress(printText);
  $("#inputTextNotes").keypress(printNotes);
})(jQuery);

$(window).resize(fixSizes);

function fixSizes(){
  mapContainer = document.getElementById("map");
  padder = document.getElementById("breaker");
  mainRect = document.getElementById("mainContainer");
  size = (map.clientHeight * 2 + 30 + padder.clientHeight);
  mainRect.style.height = size + "px";

  timesRun++;
  if(timesRun > 5){
    clearInterval(timer);
  }
}



function type() {
    if (text === textOnScreen){
      setTimeout(function(){type();}, typeTime);
      return;
    }


    text = textOnScreen.slice(0, i+1);
    i++;
    var elem = document.getElementById('paraText');

    elem.innerHTML = text;

    var char = text.slice(-1);

    if( char === '<' ) isTag = true;
    if( char === '>' ) isTag = false;
    elem.scrollTop = elem.scrollHeight;
    if (isTag) return type();
    setTimeout(function(){type();}, typeTime);
}

function addTextToScreen(textForScreen){
  textOnScreen = textOnScreen + textForScreen;
}

function getPrintedText(){
  return elem = document.getElementById('paraText').innerHTML;
}

function printText(event) {
  if(event.keyCode == 13){
      printMainText = document.getElementById("inputTextMain").value;
      addTextToScreen("<i>" + printMainText + "</i><br>");
      latestInput = printMainText;
      x = document.getElementById("inputTextMain");
      x.value = "";
      startNextAct();
  }
}

function printNotes(event) {
  if(event.keyCode == 13){
    var x = document.getElementById("inputTextNotes");
      if(x.value != ""){
        var printNotesText = document.getElementById("inputTextNotes").value;
        var inputText = "&bull;" + printNotesText + "<br />";
        var elem = document.getElementById('notesText');
        elem.innerHTML += inputText;
        elem.scrollTop = elem.scrollHeight;
        x.value = "";
      }
  }
}

function startNextAct(){
  if(previousAct == 0){
    firstAct();
    previousAct = 1;
  }
  if(previousAct == 1){
    secondAct();
    previousAct = 2;
  }
  if(previousAct == 2){

  }
}

function clearText(){
  var currentText = textOnScreen;

    var thread = setInterval(function(){
        if(currentText === getPrintedText()){
          textOnScreen = textOnScreen.substring(currentText.length);
          console.log(currentText.length);
          text = "";
          i=0;
          document.getElementById('paraText').innerHTML = "";
          clearInterval(thread);
        }
        console.log(currentText);
        console.log(getPrintedText());
    },1);
}

function firstAct(){ //Intro
  name = latestInput;
  addTextToScreen('<p style="font-family:ebitparty">"Ah, well it\'s a pleasure to meet you ' + name + '"</p>            ');
  addTextToScreen('<p style="font-family:ebitparty">"Now, down to this case of yours. As you may already know there have been a string of murders here in Sandyford - 3 to be precise. Each murder 2 nights after the last. If this pattern continues, there will be a murder tomorrow night. Your job is to find out whoever is behind this and get them behind bars before there is no one left in this bloody town to save."</p>');
  addTextToScreen('<p style="font-family:ebitparty">"Good luck detective.       I know you won\'t let me down."                    </p>');
}

function secondAct(){ //Ch1
  clearText();
  addTextToScreen('<p style="font-family:ebitparty"><u>Chapter 1:       The Town</u></p>            ');
  addTextToScreen('<p style="font-family:ebitparty">"It must have been a long journey down here, perhaps you\'d like to turn in for the night. There is a fantastic hotel a few streets away from here, I can give you dircetions if you\'d like."</p>');
  var directionsResponce;
  switch() {
    case "Give me directions to the hotel":
        directionsResponce = "Sure, ...";
        break;
    case "No thanks":
        directionsResponce = "Looks like you still got some energy inside of you. How about you visit ..."
        break;
    }
}
type();
addTextToScreen('<h2 id="title" style="font-family:neb">Detetxtive...               It is time to begin your story.</h2>                                           ');
clearText();
addTextToScreen('<p style="font-family:ebitparty">"Welcome to Sandyford Detective-       uh,    I never caught your name.      I\'m Cheif Burns,      you are?"</p>');
