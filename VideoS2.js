const videos = [
    {   
        id: 1, 
        name: "Puro Guayeteo", 
        artist: "Wisin, Don Omar, Jowell & Randy - Puro Guayeteo", 
        img: "GUAYETEOPICCC.jpg", 
        video: "Wisin, Don Omar, Jowell & Randy - Puro Guayeteo (Official Video).mp4" 
    },
    {   
        id: 2, 
        name: "PRC", 
        artist: "Peso Pluma, Natanael Cano ", 
        img: "pesoplumapic.jpg", 
        video: "Peso Pluma, Natanael Cano - PRC (Video Oficial).mp4" 
    },
    {   
        id: 3, 
        name: "Lollipop", 
        artist: "Darell", 
        img: "darrellolpic.jpg", 
        video: "Darell - Lollipop (Official Video).mp4" 
    },
    {   
        id: 4, 
        name: "Segun Quien", 
        artist: "Maluma x Carin Leon", 
        img: "malucarinsequienpic1.jpg", 
        video: "Maluma, Carin Leon - Según Quién (Official Video).mp4" 
    },
    {   
        id: 5, 
        name: "DORA", 
        artist: "FARIANA x El Alfa", 
        img: "elalfadorayouPic.jpg", 
        video: "FARIANA x El Alfa - DORA.mp4" 
    },
    {   
        id: 6, 
        name: "Por el Resto de Tu Vida", 
        artist: "Christian Nodal x TINI", 
        img: "ChrisNitiporelrestoSpotPic.jpg", 
        video: "Christian Nodal, TINI - Por el Resto de Tu Vida (Video Oficial).mp45" 
    },
    {   
        id: 7, 
        name: "Amantes & Amigos", 
        artist: "Arcángel x Sech", 
        img: "arcangelsechpicc.jpg", 
        video: "Arcángel, Sech - Amantes & Amigos (Video Oficial).mp4" 
    },
    {   
        id: 8, 
        name: "Shampoo de Coco", 
        artist: "Anuel AA", 
        img: "anuelshampooPic11.jpg", 
        video: "Anuel AA - Shampoo de Coco (Video Oficial).mp4" 
    },
    {   
        id: 9, 
        name: "ESTE", 
        artist: "El Alfa  El Jefe  x Nfasis", 
        img: "este_pic.jpg", 
        video: "El Alfa  El Jefe  x Nfasis - ESTE (Oficial Video).mp4" 
    },
    {   
        id: 10, 
        name: "Si Antes Te Hubiera Conocido", 
        artist: "Karol G", 
        img: "karolgsiantePIC.jpg", 
        video: "KAROL G - Si Antes Te Hubiera Conocido(video).mp4" 
    }
    
];

const searchInput = document.getElementById("search-input");
const videoList = document.getElementById("video-list");
const videoPlayer = document.getElementById("video-player");
const videoSource = document.getElementById("video-source");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const randomButton = document.getElementById("random-button");
const playPauseButton = document.getElementById("play-pause-button");
const progressBar = document.getElementById("progress-bar");
const volumeSlider = document.getElementById("volume-slider");
const muteButton = document.getElementById("mute-button");

let isPlaying = false;
let currentVideoId = null;
let isMuted = false;

function renderVideos(filteredVideos = videos) {
    videoList.innerHTML = "";

    filteredVideos.forEach(video => {
        const videoItem = document.createElement("div");
        videoItem.classList.add("video-item");
        videoItem.dataset.videoId = video.id;
        videoItem.innerHTML = `
            <img src="${video.img}" alt="${video.name}">
            <span>${video.name} - ${video.artist}</span>
            <button class="play-button"><i class="fas fa-play"></i></button>
        `;
        const playButton = videoItem.querySelector(".play-button");
        playButton.addEventListener("click", () => {
            playOrPauseVideo(video, playButton);
        });

        videoList.appendChild(videoItem);
    });
}

function playOrPauseVideo(video, button) {
    if (isPlaying && currentVideoId === video.id) {
        videoPlayer.pause();
        button.querySelector("i").classList.replace("fa-pause", "fa-play");
        playPauseButton.querySelector("i").classList.replace("fa-pause", "fa-play");
        isPlaying = false;
    } else {
        videoSource.src = video.video;
        videoSource.dataset.videoId = video.id;
        videoPlayer.load();
        videoPlayer.play();
        button.querySelector("i").classList.replace("fa-play", "fa-pause");
        playPauseButton.querySelector("i").classList.replace("fa-play", "fa-pause");
        isPlaying = true;
        currentVideoId = video.id;
    }
}

videoPlayer.addEventListener("ended", function() {
    const currentVideoIndex = videos.findIndex(video => video.id === parseInt(videoSource.dataset.videoId));
    const nextVideoIndex = (currentVideoIndex + 1) % videos.length;
    playOrPauseVideo(videos[nextVideoIndex], document.querySelector(`[data-video-id="${videos[nextVideoIndex].id}"] .play-button`));
});

function playNextVideo() {
    const currentVideoIndex = videos.findIndex(video => video.id === parseInt(videoSource.dataset.videoId));
    const nextVideoIndex = (currentVideoIndex + 1) % videos.length;
    playOrPauseVideo(videos[nextVideoIndex], document.querySelector(`[data-video-id="${videos[nextVideoIndex].id}"] .play-button`));
}

function playPrevVideo() {
    const currentVideoIndex = videos.findIndex(video => video.id === parseInt(videoSource.dataset.videoId));
    const prevVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
    playOrPauseVideo(videos[prevVideoIndex], document.querySelector(`[data-video-id="${videos[prevVideoIndex].id}"] .play-button`));
}

function playRandomVideo() {
    const randomIndex = Math.floor(Math.random() * videos.length);
    playOrPauseVideo(videos[randomIndex], document.querySelector(`[data-video-id="${videos[randomIndex].id}"] .play-button`));
}

prevButton.addEventListener("click", playPrevVideo);
nextButton.addEventListener("click", playNextVideo);
randomButton.addEventListener("click", playRandomVideo);

// Handle play/pause button toggle
playPauseButton.addEventListener("click", () => {
    if (isPlaying) {
        videoPlayer.pause();
        playPauseButton.querySelector("i").classList.replace("fa-pause", "fa-play");
        isPlaying = false;
    } else {
        if (currentVideoId === null) {
            // If no video is playing, start the first video
            playOrPauseVideo(videos[0], document.querySelector(`[data-video-id="${videos[0].id}"] .play-button`));
        } else {
            videoPlayer.play();
            playPauseButton.querySelector("i").classList.replace("fa-play", "fa-pause");
            isPlaying = true;
        }
    }
});

// Progress Bar update
videoPlayer.addEventListener("timeupdate", () => {
    if (videoPlayer.duration) {
        const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
        progressBar.value = progress;
    }
});

// Seek functionality
progressBar.addEventListener("click", (event) => {
    const seekTime = (event.offsetX / progressBar.offsetWidth) * videoPlayer.duration;
    videoPlayer.currentTime = seekTime;
});

// Handle volume control slider
volumeSlider.addEventListener("input", (event) => {
    videoPlayer.volume = event.target.value;
});

// Handle mute/unmute button
muteButton.addEventListener("click", () => {
    if (isMuted) {
        videoPlayer.muted = false;
        volumeSlider.value = videoPlayer.volume;
        muteButton.querySelector("i").classList.replace("fa-volume-mute", "fa-volume-up");
    } else {
        videoPlayer.muted = true;
        muteButton.querySelector("i").classList.replace("fa-volume-up", "fa-volume-mute");
    }
    isMuted = !isMuted;
});

videoPlayer.addEventListener("play", () => {
    playPauseButton.querySelector("i").classList.replace("fa-play", "fa-pause");
    isPlaying = true;
});

videoPlayer.addEventListener("pause", () => {
    playPauseButton.querySelector("i").classList.replace("fa-pause", "fa-play");
    isPlaying = false;
});

renderVideos();

// Search functionality
searchInput.addEventListener("input", function() {
    const searchQuery = searchInput.value.toLowerCase();

    const filteredVideos = videos.filter(video =>
        video.name.toLowerCase().includes(searchQuery) ||
        video.artist.toLowerCase().includes(searchQuery)
    );

    renderVideos(filteredVideos);
});
// Lights Section //////////////////////////////////
function toggleClassPlayer(){

    const body = document.querySelector('body');
    body.classList.toggle('lightPlayer');
    
    }