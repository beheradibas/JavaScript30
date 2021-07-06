const buttons = document.querySelectorAll('[data-time]');
const up = document.querySelector('.display__time-left');
const low = document.querySelector('.display__end-time');
let countDown;
function timer(dur = 0){
    clearInterval(countDown);
    const sec = Date.now();
    const then = sec + (dur+1) * 1000;
    displayTimeLeft(dur);
    displayTimeEnd(then);    
    countDown = setInterval(()=>{
        if(Date.now()<=then) displayTimeLeft(--dur);
        else clearInterval(countDown);
    },1000);


}
function displayTimeLeft(seconds){
    let min = Math.floor(seconds/60);
    seconds%=60;

    seconds = (seconds<10 ? '0':'')+seconds;

    up.textContent = `${min}:${seconds}`;
    // console.log(up);
}
function displayTimeEnd(second){
    const d = new Date(second);
    let min = d.getMinutes();
    min = (min<10 ? '0':'')+min; 
    //console.log(`${d.getHours()}:${min}`)
    low.textContent = `We will be back at ${(d.getHours()+11)%12+1}:${min}`;
}

function startTimer(){
    timer(parseInt(this.dataset.time));
}

buttons.forEach(button => button.addEventListener('click',startTimer));
document.customForm.addEventListener('submit',function(e){
    e.preventDefault();
    timer(parseInt(this.minutes.value)*60)
    this.reset();
})