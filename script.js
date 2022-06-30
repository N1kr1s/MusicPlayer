import { allMusic } from './music.js';

class MusicPlayer {
  constructor() {
    this.num = 3;
    this.data = allMusic[this.num];
    this.songAndArtist = document.getElementById('songAndArtist');
    this.playerContainer = document.getElementById('player-container');
    this.artistAndMusic();
    this.prevBtn = document.getElementById('prev');
    this.playPauseBtn = document.getElementById('play/pause');
    this.nextBtn = document.getElementById('next');
    this.isPlaying = false;
    this.music = document.querySelector('audio');
    this.currentTime = document.getElementById('current-time');
    this.duration = document.getElementById('duration');

    this.playPauseBtn.addEventListener('click', () => {
      this.isPlaying ? this.pauseSong() : this.playSong();
    });
    this.prevBtn.addEventListener('click', () => {
      if (this.num <= 0) this.num = allMusic.length - 1;
      else this.num--;
      //*Dont forget to update data!!
      this.data = allMusic[this.num];
      this.pauseSong();
      this.artistAndMusic();
    });
    this.nextBtn.addEventListener('click', () => {
      if (this.num === allMusic.length - 1) this.num = 0;
      else this.num++;
      this.data = allMusic[this.num];
      this.pauseSong();
      this.artistAndMusic();
    });

    this.music.addEventListener('timeupdate', (e) => {
      this.currentTime.innerText = e.target.currentTime;
      this.duration.innerText = e.target.duration;
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
    this.music = document.querySelector('audio');
  }

  playSong() {
    this.music.play();
    this.isPlaying = true;
    this.playPauseBtn.classList.replace('fa-play', 'fa-pause');
  }
  pauseSong() {
    this.music.pause();
    this.isPlaying = false;
    this.playPauseBtn.classList.replace('fa-pause', 'fa-play');
  }
}

const musicPlayer = new MusicPlayer();
