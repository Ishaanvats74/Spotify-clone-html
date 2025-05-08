// Initialize variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let currentArtistElement = document.querySelector('.current-artist');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let currentTimeElement = document.getElementById('currentTime');
let totalTimeElement = document.getElementById('totalTime');
let albumCover = document.getElementById('albumCover');
let currentSongTitle = document.getElementById('currentSongTitle');
let currentArtist = document.getElementById('currentArtist');
let visualizationBars = document.querySelectorAll('.music-visualization .bar');

// Song data
const songs = [
    { songName: "Let Me Love You", filePath: "songs/1.mp3", coverPath: "covers/1.jpg", artist: "DJ Snake ft. Justin Bieber" },
    { songName: "co2", filePath: "songs/2.mp3", coverPath: "covers/2.jpg", artist: "Prateek Kuhad" },
    { songName: "yoooo", filePath: "songs/3.mp3", coverPath: "covers/3.jpg", artist: "The Weeknd" },
    { songName: "la la", filePath: "songs/4.mp3", coverPath: "covers/4.jpg", artist: "Dua Lipa" },
    { songName: "How are you", filePath: "songs/5.mp3", coverPath: "covers/5.jpg", artist: "Post Malone" },
    { songName: "Love you never", filePath: "songs/6.mp3", coverPath: "covers/6.jpg", artist: "Coldplay" },
    { songName: "Love you", filePath: "songs/7.mp3", coverPath: "covers/7.jpg", artist: "Billie Eilish" },
    { songName: "bye", filePath: "songs/8.mp3", coverPath: "covers/8.jpg", artist: "Imagine Dragons" },
    { songName: "hello", filePath: "songs/9.mp3", coverPath: "covers/9.jpg", artist: "Adele" },
]

// Initialize UI with song data
document.addEventListener('DOMContentLoaded', function() {
    // Update song items
    songItems.forEach((element, i) => {
        element.getElementsByTagName("img")[0].src = songs[i].coverPath;
        element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
        element.getElementsByClassName("artist")[0].innerText = songs[i].artist;
    });

    // Set initial album cover and song info
    updateAlbumCover(0);
    
    // Set up hover effects for song items
    setupSongItemHoverEffects();
});

// Update album cover and song info
function updateAlbumCover(index) {
    albumCover.src = songs[index].coverPath;
    currentSongTitle.innerText = songs[index].songName;
    currentArtist.innerText = songs[index].artist;
    masterSongName.innerText = songs[index].songName;
    currentArtistElement.innerText = songs[index].artist;
}

// Play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        animateVisualization(true);
        highlightCurrentSong();
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        animateVisualization(false);
    }
})

// Listen to events
// Time update
audioElement.addEventListener('timeupdate', () => {
    // Update seeker
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
    
    // Update slider progress with CSS variable
    document.documentElement.style.setProperty('--slider-progress', `${progress}%`);
    
    // Update time display
    updateTimeDisplay();
})

// Format time in minutes and seconds
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
}

// Update current time and total time display
function updateTimeDisplay() {
    if (!isNaN(audioElement.duration)) {
        currentTimeElement.textContent = formatTime(audioElement.currentTime);
        totalTimeElement.textContent = formatTime(audioElement.duration);
    }
}

// Change progress bar
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

// Add click event for progress bar (not just on thumb)
myProgressBar.addEventListener('click', (e) => {
    const clickPosition = (e.offsetX / myProgressBar.clientWidth);
    audioElement.currentTime = clickPosition * audioElement.duration;
    updateTimeDisplay();
})

// Reset all songs to play button view
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

// Remove active class from all songs
const removeActiveClass = () => {
    songItems.forEach((song) => {
        song.classList.remove('active-song');
        song.classList.remove('playing');
    });
}

// Highlight current playing song
function highlightCurrentSong() {
    removeActiveClass();
    songItems[songIndex].classList.add('active-song');
    
    if (!audioElement.paused) {
        songItems[songIndex].classList.add('playing');
    }
}

// Add click listeners to play buttons on songs
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        currentArtistElement.innerText = songs[songIndex].artist;
        updateAlbumCover(songIndex);
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        highlightCurrentSong();
        animateVisualization(true);
    })
})

// Next song button
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    currentArtistElement.innerText = songs[songIndex].artist;
    updateAlbumCover(songIndex);
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    highlightCurrentSong();
})

// Previous song button
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
});