import { allMusic } from './music.js';

class MusicPlayer {
  constructor() {
    this.fullTimeMilisec;
    this.num = 3;
    this.data = allMusic[this.num];
    this.songAndArtist = document.getElementById('songAndArtist');
    this.playerContainer = document.getElementById('player-container');
    this.artistAndMusic();
    this.prevBtn = document.getElementById('prev');
    this.playPauseBtn = document.getElementById('play/pause');
    this.nextBtn = document.getElementById('next');
    this.isPlaying = false;
    this.audio = document.querySelector('audio');
    this.currentTime = document.getElementById('current-time');
    this.duration = document.getElementById('duration');
    this.progressContainer = document.getElementById('progress-container');
    this.progress = document.getElementById('progress');

    this.playPauseBtn.addEventListener('click', () => {
      this.isPlaying ? this.pauseSong() : this.playSong();
    });

    this.prevBtn.addEventListener('click', () => {
      this.prev();
    });

    this.nextBtn.addEventListener('click', () => {
      this.next();
    });

    // !Making progress bar clickable & changing song position onclick

    this.progressContainer.addEventListener('click', (e) => {
      const positionOnCLick =
        (e.offsetX / e.currentTarget.clientWidth) * this.fullTimeMilisec;
      this.audio.currentTime = positionOnCLick;
    });
  }

  artistAndMusic() {
    const { data, songAndArtist } = this;
    const artistAndMusic = document.createElement('div');
    artistAndMusic.innerHTML = `
    <div class="img-container">
    <img src=${data.img} alt=${data.songName}/>
    </div>
    <h2 id="title">${data.songName}</h2>
    <h3 class="artist" id="artist">${data.artist}</h3>
    <audio src=${data.src} ></audio>
    `;
    if (songAndArtist.hasChildNodes()) songAndArtist.innerHTML = '';
    songAndArtist.appendChild(artistAndMusic);
    this.audio = document.querySelector('audio');

    this.addListener();
  }

  playSong() {
    this.audio.play();
    this.isPlaying = true;
    this.playPauseBtn.classList.replace('fa-play', 'fa-pause');
    this.playPauseBtn.setAttribute('title', 'Pause');
  }

  pauseSong() {
    this.audio.pause();
    this.isPlaying = false;
    this.playPauseBtn.classList.replace('fa-pause', 'fa-play');
    this.playPauseBtn.setAttribute('title', 'Play');
  }

  //!On updating time changes song duration & current time & progress bar

  addListener() {
    this.audio.addEventListener('timeupdate', (e) => {
      const percentages = Math.floor(
        (e.target.currentTime / e.target.duration) * 100
      );
      this.currentTime.innerText = this.convertTime(e.target.currentTime);
      this.duration.innerText = this.convertTime(e.target.duration);
      this.fullTimeMilisec = e.target.duration;
      this.progress.style.width = `${percentages}%`;

      if (this.progress.style.width === '100%') this.next();
    });
  }

  convertTime(time) {
    return (
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    );
  }

  prev() {
    if (this.num <= 0) this.num = allMusic.length - 1;
    else this.num--;
    //*Don't forget to update data!!
    this.data = allMusic[this.num];
    this.artistAndMusic();
    this.playSong();
  }

  next() {
    if (this.num === allMusic.length - 1) this.num = 0;
    else this.num++;
    this.data = allMusic[this.num];
    this.artistAndMusic();
    this.playSong();
  }
}

const musicPlayer = new MusicPlayer();
