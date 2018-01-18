var start = document.getElementById('start');
var stop = document.getElementById('stop');
var unstop = document.getElementById('unstop');
var restart = document.getElementById('restart');

var audio = document.getElementById('audio');

var goat = document.getElementById('goat');
var fl = document.getElementById('path854-9-0');
var fr = document.getElementById('path854-5');
var bl = document.getElementById('path854-9');
var br = document.getElementById('path854');

var count;
var stoplock;

var countinter = null;
var backinter = null;

var keyback = document.getElementById('keyframesback');


var seconde = document.getElementById('sec');
var minute = document.getElementById('min');

var sec = 0;
var min = 0;
var time = 0;
var total = 0;


function ending (){

    goat.classList.remove('back');

    minute.disabled = false;
    seconde.disabled = false;

    restart.disabled = true;

    unstop.style.display = 'none';
    stop.style.display = 'none';
    start.style.display = 'block';
}


function clearing (){

    clearTimeout(countinter);

    var val = (count / total * 60) + 10;
    keyback.innerHTML = 
        '@keyframes back {'
          + '0% { '
          +   'left : calc(' + val + '%);'
          + '}'
          + '100% {'
          +   'left : 10%;'
          + '}'
        + '}';      

    goat.style.animationDuration = '3s';
    goat.style.animationIterationCount = '1';

    goat.classList.remove('run');
    goat.classList.add('back');
  
    count = 0;

    backinter = setTimeout(ending, 3000);

}


function countor (){

  if(stoplock == 0){

    count ++;
    time --;

    var tmp = time%60;
    tmp < 10 ? (seconde.value = '0'+tmp) : (seconde.value = tmp);

    tmp = Math.floor(time/60);
    tmp < 10 ? (minute.value = '0'+tmp) : (minute.value = tmp);


    if (count == total){

//        audio.play();
        
        clearing();

    } else {

        countinter = setTimeout(countor, 1000);

    }


  } else if (stoplock == 1){

     goat.style.animationPlayState = 'paused';
     fl.style.animationPlayState = 'paused';
     fr.style.animationPlayState = 'paused';
     bl.style.animationPlayState = 'paused';
     br.style.animationPlayState = 'paused';

     clearTimeout(countinter);


  } else if (stoplock == -1){

    count ++;
    clearing();

  }
}



function over (){

    if (stoplock == 1){

        goat.style.animationPlayState = 'running';
        fl.style.animationPlayState = 'running';
        fr.style.animationPlayState = 'running';
        bl.style.animationPlayState = 'running';
        br.style.animationPlayState = 'running';
        
        stoplock = -1;

        countor();

    } else {
  
        stoplock = -1;
    }
}




function replay (){

  stoplock = 0;

  unstop.style.display = 'none';
  stop.style.display = 'block';
 
  goat.style.animationPlayState = 'running';
  fl.style.animationPlayState = 'running';
  fr.style.animationPlayState = 'running';
  bl.style.animationPlayState = 'running';
  br.style.animationPlayState = 'running';
 
  countor();
}



function pause (){

  stoplock = 1;

  stop.style.display = 'none';
  unstop.style.display = 'block';
}



function play (){

    count = 0;
    stoplock = 0;

    start.style.display = 'none';
    stop.style.display = 'block';

    minute.disabled = true;
    seconde.disabled = true;

    restart.disabled = false;

    min = parseInt(minute.value);
    sec = parseInt(seconde.value);

    time = (min * 60) + sec;

    if (time < 1){
        time = 1;
    }

    total = time;

    goat.style.animationDuration = '1s, '+time+'s';
    goat.style.animationIterationCount = time+', 1';

    goat.classList.remove('back');
    goat.classList.add('run');

    countinter = setTimeout(countor, 1000);
}


function checknum (el){

    if (el.checkValidity() && el.value != ''){

        var val = parseInt(el.value);

        if (val < 10){ 
            el.value = '0' + val;
        } else {
            el.value = val;
        }

    } else {
        el.value = '00';
    }
}
