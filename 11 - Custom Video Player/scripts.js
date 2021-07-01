const video = document.querySelector('.player__video');
const playbtn = document.querySelector('.player__button,.toggle');
const player = document.querySelector('.player')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')
//const volume = document.get

video.play();

//console.dir(video)
function togglePlay(){
	//update();
	//console.log()
	if(video.paused) {video.play();playbtn.innerHTML = "⏸︎";}
	else {video.pause();playbtn.innerHTML="►";}
}

const progress = document.querySelector('.progress__filled');
const probar = document.querySelector('.progress');

console.log(progress);
function update(){
	document.querySelector('.progress__filled').style.flexBasis =`${100*video.currentTime/video.duration}%` ;
}
//functions
function skip(e){
	video.currentTime+=parseFloat(this.dataset.skip);
}

function handleRange(){
	video[this.name]=this.value;
}

function scrub(e){
	video.currentTime = (e.offsetX / probar.offsetWidth) * video.duration;
}

//event listener
playbtn.addEventListener('click',togglePlay);
video.addEventListener('click',togglePlay);
skipButtons.forEach(btn=> btn.addEventListener('click',skip));
ranges.forEach(r => r.addEventListener('click',handleRange))
ranges.forEach(r => r.addEventListener('mousedown',handleRange))
//player.addEventListener('change',update)
video.addEventListener('timeupdate',update);
let mousedown = false;
probar.addEventListener('click',scrub);

probar.addEventListener('mousemove',(e) => mousedown && scrub(e) );
probar.addEventListener('mousedown',() => mousedown=true);
probar.addEventListener('mouseup',() => mousedown=false);


