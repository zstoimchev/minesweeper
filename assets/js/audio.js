let audioEnd = new Audio();
const audio = new Audio('../assets/audio/tic-tac-timer.wav');
audio.loop = true;

function toggleAudioOnOff(volume) {
    localStorage.setItem('myValue', volume);
    console.log(volume);
}
// this is nto working