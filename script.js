class MusicPlayer {
  constructor() {
    this.music = document.querySelector('audio');
    this.prevBtn = document.getElementById('prev');
    this.playBtn = document.getElementById('play');
    this.pauseBtn = document.getElementById('pause');
    this.nextBtn = document.getElementById('next');
    this.playBtn.addEventListener('click', this.playSong.bind(this));
    this.pauseBtn.addEventListener('click', this.pauseSong.bind(this));
  }
  playSong() {
    this.music.play();
    this.playBtn.classList.add('hide');
    this.pauseBtn.classList.remove('hide');
  }
  pauseSong() {
    this.music.pause();
    this.playBtn.classList.remove('hide');
    this.pauseBtn.classList.add('hide');
  }
}

const musicPlayer = new MusicPlayer();
