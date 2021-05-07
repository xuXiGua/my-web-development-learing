const media = document.querySelector('video');
const controls = document.querySelector('.controls');

// 按钮
const play = document.querySelector('.play');
const stop = document.querySelector('.stop');
const rwd = document.querySelector('.rwd');
const fwd = document.querySelector('.fwd');

// 进度条
const timerWrapper = document.querySelector('.timer');
const timer = document.querySelector('.timer span');
const timerBar = document.querySelector('.timer div');

// 删除默认控件，显示自定义控件
media.removeAttribute('controls');
controls.style.visibility = 'visible';

// 播放/暂定按钮
play.addEventListener('click', playPauseMedia);
function playPauseMedia() {
    if(media.paused) {
      play.setAttribute('data-icon','u');
      media.play();
    } else {
      play.setAttribute('data-icon','P');
      media.pause();
    }

    rwd.classList.remove('active');
    fwd.classList.remove('active');
    clearInterval(intervalRwd);
    clearInterval(intervalFwd);
}

// 停止按钮
stop.addEventListener('click', stopMedia);
media.addEventListener('ended', stopMedia); // 视频结束设置
function stopMedia() {
    media.pause();
    media.currentTime = 0;
    play.setAttribute('data-icon','P');

    rwd.classList.remove('active');
    fwd.classList.remove('active');
    clearInterval(intervalRwd);
    clearInterval(intervalFwd);
    }

// 快进 快退
rwd.addEventListener('click', mediaBackward);
fwd.addEventListener('click', mediaForward);

let intervalFwd;
let intervalRwd;

function mediaBackward() {
  clearInterval(intervalFwd);
  fwd.classList.remove('active');

  if(rwd.classList.contains('active')) {
    rwd.classList.remove('active');
    clearInterval(intervalRwd);
    media.play();
  } else {
    rwd.classList.add('active');
    media.pause();
    intervalRwd = setInterval(windBackward, 200);
  }
}

function mediaForward() {
  clearInterval(intervalRwd);
  rwd.classList.remove('active');

  if(fwd.classList.contains('active')) {
    fwd.classList.remove('active');
    clearInterval(intervalFwd);
    media.play();
  } else {
    fwd.classList.add('active');
    media.pause();
    intervalFwd = setInterval(windForward, 200);
  }
}

function windBackward() {
    if(media.currentTime <= 3) {
      rwd.classList.remove('active');
      clearInterval(intervalRwd);
      stopMedia();
    } else {
      media.currentTime -= 3;
    }
  }
  
  function windForward() {
    if(media.currentTime >= media.duration - 3) {
      fwd.classList.remove('active');
      clearInterval(intervalFwd);
      stopMedia();
    } else {
      media.currentTime += 3;
    }
}

// 更新显示时间
media.addEventListener('timeupdate', setTime);
function setTime() {
    var minutes = Math.floor(media.currentTime / 60);
    var seconds = Math.floor(media.currentTime - minutes * 60);
    var minuteValue;
    var secondValue;
  
    if (minutes < 10) {
      minuteValue = '0' + minutes;
    } else {
      minuteValue = minutes;
    }
  
    if (seconds < 10) {
      secondValue = '0' + seconds;
    } else {
      secondValue = seconds;
    }
  
    var mediaTime = minuteValue + ':' + secondValue;
    timer.textContent = mediaTime;
  
    var barLength = timerWrapper.clientWidth * (media.currentTime/media.duration);
    timerBar.style.width = barLength + 'px';
  }

  // 滑动条
  timerWrapper.addEventListener('click', function(e){
      let timerPos = timerWrapper.getBoundingClientRect();
      media.currentTime = (e.x - timerPos.x)/timerPos.width * media.duration; 
  })