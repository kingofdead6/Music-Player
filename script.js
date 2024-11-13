const songs = [];

const audioPlayer = document.getElementById("audioPlayer");
const songListContainer = document.getElementById("songList");
const currentSongInfo = document.getElementById("currentSongInfo");
const playPauseButton = document.getElementById("playPauseButton");
const fileInput = document.getElementById("fileInput");
const addSongsButton = document.getElementById("addSongsButton");
const musicCircle = document.getElementById("musicCircle");
const loader = document.getElementById('loader');
const progressContainer = document.querySelector('.progress-container');


let currentSong = null;
let isPlaying = false;

customFileButton.addEventListener("click", () => {
  fileInput.click();  
});
function displaySongs() {
  songListContainer.innerHTML = '';
  songs.forEach((song) => {
    const songItem = document.createElement("div");
    songItem.classList.add("song-item");
    songItem.textContent = `${song.title}`;
    songItem.addEventListener("click", () => playSong(song));
    songListContainer.appendChild(songItem);
  });
}

function playSong(song) {
  if (currentSong !== song) {
    currentSong = song;
    audioPlayer.src = song.src;
    currentSongInfo.textContent = `${song.title}`;
    playAudio();
  } else {
    togglePlayPause();
  }
}

function playAudio() {
    audioPlayer.play();
    isPlaying = true;
    playPauseButton.textContent = "Pause";
    musicCircle.style.animationPlayState = "running";

  }
  
  function pauseAudio() {
    audioPlayer.pause();
    isPlaying = false;
    playPauseButton.textContent = "Play";
    musicCircle.style.animationPlayState = "paused";
  }


  function togglePlayPause() {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }

function handleFileUpload() {
  const files = fileInput.files;
  Array.from(files).forEach((file, index) => {
    const song = {
      id: songs.length + index + 1,
      title: file.name.replace(/\.[^/.]+$/, ""),
      src: URL.createObjectURL(file),
    };
    songs.push(song);
  });
  displaySongs();

}

  
playPauseButton.addEventListener("click", togglePlayPause);

addSongsButton.addEventListener("click", handleFileUpload);

displaySongs();
"use strict";

const screen = document.getElementById("screen");
const xmlns = "http://www.w3.org/2000/svg";
const xlinkns = "http://www.w3.org/1999/xlink";

window.addEventListener(
	"pointermove",
	(e) => {
		pointer.x = e.clientX;
		pointer.y = e.clientY;
		rad = 0;
	},
	false
);

const resize = () => {
	width = window.innerWidth;
	height = window.innerHeight;
};

let width, height;
window.addEventListener("resize", () => resize(), false);
resize();

const prepend = (use, i) => {
	const elem = document.createElementNS(xmlns, "use");
	elems[i].use = elem;
	elem.setAttributeNS(xlinkns, "xlink:href", "#" + use);
	screen.prepend(elem);
};

const N = 40;

const elems = [];
for (let i = 0; i < N; i++) elems[i] = { use: null, x: width / 2, y: 0 };
const pointer = { x: width / 2, y: height / 2 };
const radm = Math.min(pointer.x, pointer.y) - 20;
let frm = Math.random();
let rad = 0;

for (let i = 1; i < N; i++) {
	if (i === 1) prepend("Cabeza", i);
	else if (i === 8 || i === 14) prepend("Aletas", i);
	else prepend("Espina", i);
}

const run = () => {
	requestAnimationFrame(run);
	let e = elems[0];
	const ax = (Math.cos(3 * frm) * rad * width) / height;
	const ay = (Math.sin(4 * frm) * rad * height) / width;
	e.x += (ax + pointer.x - e.x) / 10;
	e.y += (ay + pointer.y - e.y) / 10;
	for (let i = 1; i < N; i++) {
		let e = elems[i];
		let ep = elems[i - 1];
		const a = Math.atan2(e.y - ep.y, e.x - ep.x);
		e.x += (ep.x - e.x + (Math.cos(a) * (100 - i)) / 5) / 4;
		e.y += (ep.y - e.y + (Math.sin(a) * (100 - i)) / 5) / 4;
		const s = (162 + 4 * (1 - i)) / 50;
		e.use.setAttributeNS(
			null,
			"transform",
			`translate(${(ep.x + e.x) / 2},${(ep.y + e.y) / 2}) rotate(${(180 / Math.PI) * a
			}) translate(${0},${0}) scale(${s},${s})`
		);
	}
	if (rad < radm) rad++;
	frm += 0.003;
	if (rad > 60) {
		pointer.x += (width / 2 - pointer.x) * 0.05;
		pointer.y += (height / 2 - pointer.y) * 0.05;
	}
};

run();


audioPlayer.addEventListener('timeupdate', () => {
  const progressPercentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  loader.style.width = `${progressPercentage}%`;
});

progressContainer.addEventListener('click', (e) => {
  const clickX = e.offsetX;
  const containerWidth = progressContainer.offsetWidth;
  const newTime = (clickX / containerWidth) * audioPlayer.duration;
  audioPlayer.currentTime = newTime;
});
