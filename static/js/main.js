document.addEventListener('DOMContentLoaded', function() {
    const colorSwitch = document.querySelector('.color-switch');
    const musicBtn = document.getElementById('musicToggleBtn');
    const backgroundMusic = document.getElementById('backgroundMusic');
    let isMusicPlaying = false;
    let hasPlayedFirstTime = false;
     
    function initModal(openBtnId, modalId) {
        const openBtn = document.getElementById(openBtnId);
        if (!openBtn) return;
        const modal = document.getElementById(modalId);
        const closeBtn = modal.querySelector('.close-btn');
      
        openBtn.addEventListener('click', function() {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            colorSwitch.style.display = 'none';
        });
      
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('show');
            document.body.style.overflow = '';
            colorSwitch.style.display = 'flex';
        });
      
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
                colorSwitch.style.display = 'flex';
            }
        });
      
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.classList.contains('show')) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
                colorSwitch.style.display = 'flex';
            }
        });
    }
     
    initModal('openModalBtn', 'myModal');
    initModal('openBlogModalBtn', 'blogModal');
    initModal('openMovieModalBtn', 'movieModal');
     
    const colorBtns = document.querySelectorAll('.color-btn');
    const savedColor = localStorage.getItem('selectedColor');
    const defaultColor = savedColor || 'color1';
     
    document.body.className = '';
    document.body.classList.add(defaultColor);
     
    colorBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const colorClass = this.getAttribute('data-color');
            document.body.className = '';
            document.body.classList.add(colorClass);
            localStorage.setItem('selectedColor', colorClass);
        });
    });
     
    function playMusic() {
        if (!backgroundMusic) return;
        
        const playPromise = backgroundMusic.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                musicBtn.classList.add('playing');
                isMusicPlaying = true;
                if (!hasPlayedFirstTime) {
                    hasPlayedFirstTime = true;
                }
            }).catch(error => {
                console.log('播放失败:', error);
            });
        }
    }
     
    function pauseMusic() {
        if (!backgroundMusic) return;
        backgroundMusic.pause();
        musicBtn.classList.remove('playing');
        isMusicPlaying = false;
    }
     
    if (musicBtn && backgroundMusic) {
        musicBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (isMusicPlaying) {
                pauseMusic();
            } else {
                playMusic();
            }
        });
        
        musicBtn.addEventListener('touchstart', function(e) {
            e.stopPropagation();
            if (isMusicPlaying) {
                pauseMusic();
            } else {
                playMusic();
            }
        });
    }
     
    document.body.addEventListener('click', function(e) {
        if (e.target.closest('.music-btn') || e.target.closest('.modal') || 
            e.target.closest('.nav-links') || e.target.closest('.color-switch') ||
            e.target.closest('.close-btn') || e.target.closest('.link-btn') ||
            e.target.closest('.enter-btn')) {
            return;
        }
        
        if (!isMusicPlaying) {
            playMusic();
        }
    }, { passive: true });
});