class Game {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.levelManager = new LevelManager();
        
        this.currentLevel = 1;
        this.score = 0;
        this.starsCollected = 0;
        this.gameState = 'menu';
        this.lastTime = 0;
        
        this.player = null;
        this.platforms = [];
        this.enemies = [];
        this.stars = [];
        
        this.keys = {};
        
        this.setupEventListeners();
        this.loadProgress();
        this.updateUI();
        this.updateProgressInfo();
        
        this.gameLoop();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            
            if (e.code === 'Escape' && this.gameState === 'playing') {
                this.pauseGame();
            }
        });

        document.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });

        // Кнопки меню
        document.getElementById('start-btn').addEventListener('click', () => {
            this.startNewGame(1);
        });

        document.getElementById('continue-btn').addEventListener('click', () => {
            this.startGame(this.currentLevel);
        });

        document.getElementById('level-select-btn').addEventListener('click', () => {
            this.showLevelSelect();
        });

        document.getElementById('reset-progress-btn').addEventListener('click', () => {
            this.showResetConfirm();
        });

        document.getElementById('back-to-menu-btn').addEventListener('click', () => {
            this.showMainMenu();
        });

        document.getElementById('resume-btn').addEventListener('click', () => {
            this.resumeGame();
        });

        document.getElementById('restart-btn').addEventListener('click', () => {
            this.restartLevel();
        });

        document.getElementById('main-menu-btn').addEventListener('click', () => {
            this.showMainMenu();
        });

        document.getElementById('restart-game-btn').addEventListener('click', () => {
            this.restartLevel();
        });

        document.getElementById('game-over-menu-btn').addEventListener('click', () => {
            this.showMainMenu();
        });

        document.getElementById('next-level-btn').addEventListener('click', () => {
            this.nextLevel();
        });

        document.getElementById('complete-menu-btn').addEventListener('click', () => {
            this.showMainMenu();
        });

        document.getElementById('play-again-btn').addEventListener('click', () => {
            this.startNewGame(1);
        });

        document.getElementById('complete-menu-btn-2').addEventListener('click', () => {
            this.showMainMenu();
        });

        document.getElementById('confirm-reset-btn').addEventListener('click', () => {
            this.resetProgress();
        });

        document.getElementById('cancel-reset-btn').addEventListener('click', () => {
            this.showMainMenu();
        });

        // Кнопки выбора уровня
        document.querySelectorAll('.level-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (!e.target.classList.contains('locked')) {
                    const level = parseInt(e.target.dataset.level);
                    this.startNewGame(level);
                }
            });
        });

        // Кнопка паузы в игре
        const pauseBtn = document.createElement('button');
        pauseBtn.id = 'pause-btn';
        pauseBtn.textContent = 'Пауза';
        pauseBtn.addEventListener('click', () => this.pauseGame());
        document.getElementById('game-container').appendChild(pauseBtn);
    }

    startNewGame(level = 1) {
        this.currentLevel = level;
        this.score = 0;
        this.starsCollected = 0;
        this.loadLevel(level);
        this.gameState = 'playing';
        this.hideAllScreens();
        this.updateUI();
    }

    startGame(level) {
        this.currentLevel = level;
        this.loadLevel(level);
        this.gameState = 'playing';
        this.hideAllScreens();
        this.updateUI();
    }

    restartLevel() {
        this.loadLevel(this.currentLevel);
        this.gameState = 'playing';
        this.hideAllScreens();
        this.updateUI();
    }

    loadLevel(levelNumber) {
        const level = this.levelManager.getLevel(levelNumber);
        
        if (!level) {
            console.error('Level not found:', levelNumber);
            return;
        }
        
        this.player = new Player(level.playerStart.x, level.playerStart.y);
        this.platforms = level.platforms;
        this.enemies = level.enemies;
        this.stars = level.stars;
        this.starsCollected = 0;
    }

    updateUI() {
        if (this.player) {
            document.getElementById('score').textContent = `Очки: ${this.score}`;
            document.getElementById('health').textContent = `❤️ Здоровье: ${this.player.health}`;
            document.getElementById('level').textContent = `🚀 Уровень: ${this.currentLevel}`;
            document.getElementById('coins').textContent = `⭐ Звезды: ${this.starsCollected}/${this.stars.length}`;
        }
        
        const continueBtn = document.getElementById('continue-btn');
        const progress = Utils.loadProgress();
        if (progress && progress.level > 1) {
            continueBtn.style.display = 'block';
        } else {
            continueBtn.style.display = 'none';
        }
    }

    updateProgressInfo() {
        const progressInfo = document.getElementById('progress-info');
        const progress = Utils.loadProgress();
        
        if (progress) {
            const completedLevels = progress.completedLevels ? progress.completedLevels.length : 0;
            progressInfo.innerHTML = `
                Текущий прогресс: Уровень ${progress.level}<br>
                Пройдено уровней: ${completedLevels}/8<br>
                Общий счет: ${progress.score}
            `;
        } else {
            progressInfo.innerHTML = 'Прогресс не сохранен';
        }
    }

    hideAllScreens() {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.style.display = 'none';
        });
    }

    showMainMenu() {
        this.gameState = 'menu';
        this.hideAllScreens();
        document.getElementById('menu').style.display = 'flex';
        this.updateProgressInfo();
    }

    showLevelSelect() {
        this.hideAllScreens();
        document.getElementById('level-select').style.display = 'flex';
        this.updateLevelSelectButtons();
    }

    showResetConfirm() {
        this.hideAllScreens();
        document.getElementById('reset-confirm').style.display = 'flex';
    }

    updateLevelSelectButtons() {
        const unlockedLevels = Utils.getUnlockedLevels();
        document.querySelectorAll('.level-btn').forEach(btn => {
            const level = parseInt(btn.dataset.level);
            if (unlockedLevels.includes(level)) {
                btn.classList.remove('locked');
                btn.disabled = false;
            } else {
                btn.classList.add('locked');
                btn.disabled = true;
            }
        });
    }

    pauseGame() {
        if (this.gameState === 'playing') {
            this.gameState = 'paused';
            this.hideAllScreens();
            document.getElementById('pause-menu').style.display = 'flex';
            this.saveProgress();
        }
    }

    resumeGame() {
        if (this.gameState === 'paused') {
            this.gameState = 'playing';
            this.hideAllScreens();
        }
    }

    gameOver() {
        this.gameState = 'gameOver';
        this.hideAllScreens();
        document.getElementById('final-score').textContent = `Очки: ${this.score}`;
        document.getElementById('game-over').style.display = 'flex';
        this.saveProgress();
    }

    levelComplete() {
        Utils.addCompletedLevel(this.currentLevel);
        
        this.gameState = 'levelComplete';
        this.hideAllScreens();
        document.getElementById('level-score').textContent = `Очки: ${this.score}`;
        
        if (this.currentLevel >= this.levelManager.getTotalLevels()) {
            document.getElementById('level-complete').querySelector('h1').textContent = 'Игра пройдена!';
            document.getElementById('next-level-btn').textContent = 'Начать заново';
        } else {
            document.getElementById('level-complete').querySelector('h1').textContent = 'Уровень пройден!';
            document.getElementById('next-level-btn').textContent = 'Следующий уровень';
        }
        
        document.getElementById('level-complete').style.display = 'flex';
        this.saveProgress();
    }

    nextLevel() {
        if (this.currentLevel < this.levelManager.getTotalLevels()) {
            this.currentLevel++;
            this.startGame(this.currentLevel);
        } else {
            this.startNewGame(1);
        }
    }

    resetProgress() {
        Utils.clearProgress();
        this.currentLevel = 1;
        this.score = 0;
        this.showMainMenu();
    }

    update(deltaTime) {
        if (this.gameState !== 'playing' || !this.player) return;

        let moveDirection = 0;
        if (this.keys['ArrowLeft'] || this.keys['KeyA']) {
            moveDirection = -1;
        } else if (this.keys['ArrowRight'] || this.keys['KeyD']) {
            moveDirection = 1;
        }
        this.player.move(moveDirection);

        const jumpPressed = this.keys['Space'] || this.keys['KeyW'] || this.keys['ArrowUp'];
        
        if (jumpPressed && !this.keys.jumpWasPressed) {
            this.player.jump();
            this.keys.jumpWasPressed = true;
        }
        
        if (!jumpPressed) {
            this.keys.jumpWasPressed = false;
        }

        this.player.update(deltaTime, this.platforms);

        this.platforms.forEach(platform => platform.update(deltaTime));

        this.enemies.forEach(enemy => {
            enemy.update(deltaTime);
            enemy.attack(this.player);
        });

        this.stars.forEach(star => {
            star.update();
            if (!star.collected && star.checkCollision(this.player)) {
                star.collect();
                this.starsCollected++;
                this.score += 100;
                this.updateUI();
            }
        });

        if (this.starsCollected >= this.stars.length) {
            this.score += 500 * this.currentLevel;
            this.levelComplete();
            return;
        }

        if (this.player.health <= 0) {
            this.gameOver();
            return;
        }

        this.updateUI();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawBackground();

        this.platforms.forEach(platform => platform.draw(this.ctx));
        this.stars.forEach(star => star.draw(this.ctx));
        this.enemies.forEach(enemy => enemy.draw(this.ctx));
        if (this.player) {
            this.player.draw(this.ctx);
        }
    }

    drawBackground() {
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#0f0c29');
        gradient.addColorStop(0.5, '#302b63');
        gradient.addColorStop(1, '#24243e');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Звезды на фоне
        this.ctx.fillStyle = 'white';
        for (let i = 0; i < 50; i++) {
            const x = (i * 123.456) % this.canvas.width;
            const y = (i * 76.543) % this.canvas.height;
            const size = Math.sin(Date.now() / 1000 + i) * 0.5 + 1;
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    gameLoop(timestamp = 0) {
        const deltaTime = timestamp - this.lastTime || 0;
        this.lastTime = timestamp;

        this.update(deltaTime);
        this.draw();

        requestAnimationFrame((time) => this.gameLoop(time));
    }

    saveProgress() {
        const progress = Utils.loadProgress();
        const completedLevels = progress ? progress.completedLevels : [];
        Utils.saveProgress(this.currentLevel, this.score, completedLevels);
    }

    loadProgress() {
        const progress = Utils.loadProgress();
        if (progress) {
            this.currentLevel = progress.level;
            this.score = progress.score;
        }
    }
}

window.addEventListener('load', () => {
    new Game();
});