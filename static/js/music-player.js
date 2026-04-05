document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audioPlayer');
    const playBtn = document.getElementById('playBtn');
    const playIcon = document.getElementById('playIcon');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.getElementById('progressBar');
    const progressFill = document.getElementById('progressFill');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeIcon = document.getElementById('volumeIcon');
    const albumCover = document.getElementById('albumCover');
    const songTitle = document.getElementById('songTitle');
    const songArtist = document.getElementById('songArtist');
    const playlistItems = document.querySelectorAll('.playlist-item');
    const albumArt = document.querySelector('.album-art');

    let currentTrack = 0;
    let isPlaying = false;

    const playlist = [
        { name: '占位符歌曲 1', artist: '占位符歌手', src: '#' },
        { name: '占位符歌曲 2', artist: '占位符歌手', src: '#' },
        { name: '占位符歌曲 3', artist: '占位符歌手', src: '#' },
        { name: '占位符歌曲 4', artist: '占位符歌手', src: '#' },
        { name: '占位符歌曲 5', artist: '占位符歌手', src: '#' }
    ];

    function loadTrack(index) {
        currentTrack = index;
        const track = playlist[index];
        songTitle.textContent = track.name;
        songArtist.textContent = track.artist;
        audioPlayer.src = track.src;

        playlistItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    }

    function togglePlay() {
        if (isPlaying) {
            audioPlayer.pause();
            playIcon.className = 'fas fa-play';
            albumArt.classList.remove('playing');
        } else {
            audioPlayer.play().catch(() => {});
            playIcon.className = 'fas fa-pause';
            albumArt.classList.add('playing');
        }
        isPlaying = !isPlaying;
    }

    function playTrack(index) {
        loadTrack(index);
        audioPlayer.play().catch(() => {});
        isPlaying = true;
        playIcon.className = 'fas fa-pause';
        albumArt.classList.add('playing');
    }

    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    playBtn.addEventListener('click', togglePlay);

    prevBtn.addEventListener('click', () => {
        const newIndex = currentTrack > 0 ? currentTrack - 1 : playlist.length - 1;
        playTrack(newIndex);
    });

    nextBtn.addEventListener('click', () => {
        const newIndex = currentTrack < playlist.length - 1 ? currentTrack + 1 : 0;
        playTrack(newIndex);
    });

    audioPlayer.addEventListener('timeupdate', () => {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressFill.style.width = percent + '%';
        currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    });

    audioPlayer.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(audioPlayer.duration);
    });

    audioPlayer.addEventListener('ended', () => {
        const newIndex = currentTrack < playlist.length - 1 ? currentTrack + 1 : 0;
        playTrack(newIndex);
    });

    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audioPlayer.currentTime = percent * audioPlayer.duration;
    });

    volumeSlider.addEventListener('input', (e) => {
        audioPlayer.volume = e.target.value / 100;
        if (e.target.value == 0) {
            volumeIcon.className = 'fas fa-volume-mute';
        } else if (e.target.value < 50) {
            volumeIcon.className = 'fas fa-volume-down';
        } else {
            volumeIcon.className = 'fas fa-volume-up';
        }
    });

    volumeIcon.addEventListener('click', () => {
        if (audioPlayer.volume > 0) {
            audioPlayer.volume = 0;
            volumeSlider.value = 0;
            volumeIcon.className = 'fas fa-volume-mute';
        } else {
            audioPlayer.volume = 0.8;
            volumeSlider.value = 80;
            volumeIcon.className = 'fas fa-volume-up';
        }
    });

    playlistItems.forEach((item, index) => {
        item.addEventListener('click', () => playTrack(index));
    });

    audioPlayer.volume = 0.8;
    loadTrack(0);
});