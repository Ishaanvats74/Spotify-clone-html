console.log("welcome to Spotify!");

//  Initialize  the variables
let songIndex = 0;
let audioElement = new Audio('/songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let next = document.getElementById('next');
let previous = document.getElementById('previous');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');
let container = document.querySelector('.container');


let songs = [
    {songName: "Let Me Love you", filePath: "/songs/1.mp3", coverPath: "/covers/1.jpg"},
    {songName: "co2", filePath: "/songs/2.mp3", coverPath: "/covers/2.jpg"},
    {songName: "yoooo", filePath: "/songs/3.mp3", coverPath: "/covers/3.jpg"},
    {songName: "la la", filePath: "/songs/4.mp3", coverPath: "/covers/4.jpg"},
    {songName: "How are you", filePath: "/songs/5.mp3", coverPath: "/covers/5.jpg"},
    {songName: "Love you never", filePath: "/songs/6.mp3", coverPath: "/covers/6.jpg"},
    {songName: "Love you", filePath: "/songs/7.mp3", coverPath: "/covers/7.jpg"},
    {songName: "bye", filePath: "/songs/8.mp3", coverPath: "/covers/8.jpg"},
    {songName: "hello", filePath: "/songs/9.mp3", coverPath: "/covers/9.jpg"},
];
// audioElement.play();
songItems.forEach((element, i)=>{
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Listen to events 
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } 
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

audioElement.addEventListener('timeupdate',()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;

});

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-play-circle');
        element.classList.remove('fa-pause-circle');
    });
};



Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        const clickedIndex = parseInt(e.target.id);
         // If the same song is clicked and it's playing — pause it
         if (songIndex === clickedIndex && !audioElement.paused) {
            audioElement.pause();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
            
        } else {
            makeAllPlays();
            songIndex = clickedIndex;
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
            container.style.backgroundImage = `url('${songs[songIndex].coverPath}')`;
        }
    
    })
});

next.addEventListener('click',()=>{
    if(songIndex>9){
        songIndex = 0 ;
    } else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0 ;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    container.style.backgroundImage = `url("${songs[songIndex].coverPath}")`;
});

previous.addEventListener('click', ()=>{
    if(songIndex<0){
        songIndex = 9;
    } else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0 ;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    container.style.backgroundImage = `url("${songs[songIndex].coverPath}")`;
})