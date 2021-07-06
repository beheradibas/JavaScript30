const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
    navigator.mediaDevices.getUserMedia({video :true, audio: false})
    .then(localMediaStream =>{
        console.log(localMediaStream); 
    //  this has been depreciated
        // video.src = window.URL.createObjectURL(localMediaStream);
        // new sytax

      video.srcObject = localMediaStream;
        video.play();
    })
    .catch(err =>{
        console.error("Oh NO!!",err);
    })
}

function paintToCanvas(){
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    return setInterval(()=>{ 
        ctx.drawImage(video,0,0,width,height) 
        //take out
        let pixels = ctx.getImageData(0,0,width,height);

        //mess with it
        //pixels = redEffect(pixels);

        pixels = greenScreen(pixels);
        //put it back
        ctx.putImageData(pixels,0,0);
    },16);

}

function redEffect(pixels){
    for(let i=0;i<pixels.data.length;i+=4) {
        pixels.data[i+0] = pixels.data[i+0] + 150; // red
        pixels.data[i+1] = pixels.data[i+1] -40; // blue
        pixels.data[i+2] = pixels.data[i+2] +40; // green
    }
    return  pixels;
}

function greenScreen(pixels) {
    const levels = {};
  
    document.querySelectorAll('.rgb input').forEach((input) => {
      levels[input.name] = input.value;
    });
  
    for (i = 0; i < pixels.data.length; i = i + 4) {
      red = pixels.data[i + 0];
      green = pixels.data[i + 1];
      blue = pixels.data[i + 2];
      alpha = pixels.data[i + 3];
  
      if (red >= levels.rmin
        && green >= levels.gmin
        && blue >= levels.bmin
        && red <= levels.rmax
        && green <= levels.gmax
        && blue <= levels.bmax) {
        // take it out!
        pixels.data[i + 3] = 0;
      }
    }
  
    return pixels;
  }
function takePhoto(){
    snap.currentTime = 0;
    snap.play();

    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download','Handsome');
    //link.textContent = 'Download image';
    link.innerHTML = `<img src=${data} alt="Screenshot">`;
    strip.insertBefore(link,strip.firstChild);
}
getVideo();
video.addEventListener('canplay',paintToCanvas);