// Утилиты для игры
class Utils {
    static loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    static playSound(src, volume = 1.0) {
        try {
            const audio = new Audio(src);
            audio.volume = volume;
            audio.play().catch(e => console.log("Автовоспроизведение заблокировано:", e));
        } catch (error) {
            console.log("Ошибка воспроизведения звука:", error);
        }
    }

    static random(min, max) {
        return Math.random() * (max - min) + min;
    }

    static clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    static saveProgress(level, score, completedLevels = []) {
        const progress = {
            level: level,
            score: score,
            completedLevels: completedLevels,
            timestamp: Date.now()
        };
        localStorage.setItem('spacePlatformerProgress', JSON.stringify(progress));
    }

    static loadProgress() {
        const progress = localStorage.getItem('spacePlatformerProgress');
        if (progress) {
            try {
                return JSON.parse(progress);
            } catch (e) {
                console.error("Ошибка загрузки прогресса:", e);
                return null;
            }
        }
        return null;
    }

    static clearProgress() {
        localStorage.removeItem('spacePlatformerProgress');
    }

    static getUnlockedLevels() {
        const progress = this.loadProgress();
        if (!progress) return [1];
        
        const unlocked = [1];
        
        for (let i = 2; i <= 8; i++) {
            if (progress.completedLevels && progress.completedLevels.includes(i - 1)) {
                unlocked.push(i);
            }
        }
        
        return unlocked;
    }

    static addCompletedLevel(level) {
        const progress = this.loadProgress();
        if (progress) {
            if (!progress.completedLevels) {
                progress.completedLevels = [];
            }
            if (!progress.completedLevels.includes(level)) {
                progress.completedLevels.push(level);
            }
            this.saveProgress(progress.level, progress.score, progress.completedLevels);
        }
    }
}