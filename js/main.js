const player = document.querySelector('.player'),
  playBtn = document.querySelector('.play'),
  prevBtn = document.querySelector('.prev'),
  nextBtn = document.querySelector('.next'),
  audio = document.querySelector('.audio'),
  progressContainer = document.querySelector('.progress__container'),
  progress = document.querySelector('.progress'),
  title = document.querySelector('.song'),
  cover = document.querySelector('.cover'),
  imgSrc = document.querySelector('.img__src');

//   Названия песен
const songs = ['Do I Have to Say the Words', 'Paint It Black', 'Living Next Door to Alice'];

// Песня по умолчанию
let songIndex = 0;

// Init
function loadSong(song) {
  title.innerHTML = song;

  audio.src = `audio/$ {
    song
  }
  .mp3`;

  cover.src = `img/$ {
    songIndex+1
  }
  .jpg`;
}

loadSong(songs[songIndex]);

// Play
function playSong() {
  player.classList.add('play');
  cover.classList.add('active');
  imgSrc.src = './img/pause.svg';
  audio.play();
}

// Pause
function pauseSong() {
  player.classList.remove('play');
  cover.classList.remove('active');
  imgSrc.src = './img/play.svg';
  audio.pause();
}

playBtn.addEventListener('click', () => {
  const isPlaying = player.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// _Next song
function nextSong() {
  songIndex++;

  // проверка
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  // подгрузка песни (обязательно)
  loadSong(songs[songIndex]);
  // запустить
  playSong();
}

// повесить функцию на кнопку
nextBtn.addEventListener('click', nextSong);

// _Prev song
function prevSong() {
  songIndex--;

  // проверка
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  // подгрузка песни (обязательно)
  loadSong(songs[songIndex]);
  // запустить
  playSong();
}

// повесить функцию на кнопку
prevBtn.addEventListener('click', prevSong);

// Progress bar
// получить данные = это event (e)
function updateProgress(e) {
  // src.Element это аудио
  // через деструктуризацию вытащить длительность и current time из e.srcElement
  const { duration, currentTime } = e.srcElement;
  // проверять данные через консоль - пример !
  // console.log(duration);
  // console.log(currentTime);

  // Рассчитать прогресс бар
  const progressPercent = (currentTime / duration) * 100;
  // привязка  прогресс бар переменной из данных к формуле
  progress.style.width = `${progressPercent}%`;
}
audio.addEventListener('timeupdate', updateProgress);

// set Progress
function setProgress(e) {
  // надо вытащить ширину контейнера.. через clientWidth
  const width = this.clientWidth;
  // console.log(clientWidth);
  // надо вычислить координаты клика на прогресс для манип-я (x - гориз, y - верт. координаты)
  // так достанем координату
  const clickX = e.offsetX;
  // console.log(clickX);
  // Получить длину трека ( уже доставали - напоминание себе..... = ИЩИИИ!!! )
  const duration = audio.duration;
  // Установить currentTime для нашего трека
  audio.currentTime = (clickX / width) * duration;
  // console.log(currentTime);
}
progressContainer.addEventListener('click', setProgress);

// AutoPlay
// После окончания трека тишина = это плохо, надо чтобы переключалась !
audio.addEventListener('ended', nextSong);
