console.log("welcome to Spotify!");



//  Initialize  the variables
let songIndex = 0;
let audioElement = new Audio('/songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let next = document.getElementById('next');
let previous = document.getElementById('previous');


let songs = [
    {songName: "Let Me Love you", filePath: "/songs/1.mp3", coverPath: "/covers/1.jpg"},
    {songName: "Let Me Love you", filePath: "/songs/2.mp3", coverPath: "/covers/2.jpg"},
    {songName: "Let Me Love you", filePath: "/songs/3.mp3", coverPath: "/covers/3.jpg"},
    {songName: "Let Me Love you", filePath: "/songs/4.mp3", coverPath: "/covers/4.jpg"},
    {songName: "Let Me Love you", filePath: "/songs/5.mp3", coverPath: "/covers/5.jpg"},
    {songName: "Let Me Love you", filePath: "/songs/6.mp3", coverPath: "/covers/6.jpg"},
    {songName: "Let Me Love you", filePath: "/songs/7.mp3", coverPath: "/covers/7.jpg"},
]
// audioElement.play();


// Listen to events 
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
    } 
    else {
        audioElement.pause();
    }
});
