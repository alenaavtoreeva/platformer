class LevelManager {
    constructor() {
        this.levels = this.createLevels();
    }

    createLevels() {
        return [
            // Уровень 1 - Обучающий (лёгкий)
            {
                platforms: [
                    new Platform(0, 450, 800, 50), // Земля
                    new Platform(100, 350, 200, 20),
                    new Platform(400, 300, 150, 20),
                    new Platform(200, 250, 100, 20),
                    new Platform(500, 200, 200, 20)
                ],
                enemies: [
                    new Enemy(300, 410, 35, 45, 0.8, 150, 'alien')
                ],
                stars: [
                    new Star(150, 310),
                    new Star(450, 260),
                    new Star(250, 210),
                    new Star(550, 160)
                ],
                playerStart: { x: 50, y: 400 },
                requiredStars: 4
            },
            // Уровень 2 - С движущимися платформами
            {
                platforms: [
                    new Platform(0, 450, 800, 50),
                    new Platform(50, 350, 150, 20),
                    new Platform(300, 320, 100, 20),
                    new Platform(500, 280, 120, 20, '#8B4513', true, 80, 1.2),
                    new Platform(200, 220, 150, 20),
                    new Platform(450, 180, 100, 20),
                    new Platform(100, 150, 120, 20)
                ],
                enemies: [
                    new Enemy(200, 410, 35, 45, 1.0, 120, 'alien'),
                    new Enemy(550, 240, 35, 45, 1.2, 90, 'robot')
                ],
                stars: [
                    new Star(100, 310),
                    new Star(350, 280),
                    new Star(550, 240),
                    new Star(250, 180),
                    new Star(500, 140),
                    new Star(150, 110)
                ],
                playerStart: { x: 50, y: 400 },
                requiredStars: 6
            },
            // Уровень 3 - НЛО
            {
                platforms: [
                    new Platform(0, 450, 800, 50),
                    new Platform(50, 380, 100, 20),
                    new Platform(250, 350, 120, 20, '#8B4513', true, 60, 1.5),
                    new Platform(500, 320, 100, 20),
                    new Platform(150, 280, 150, 20),
                    new Platform(400, 240, 120, 20, '#8B4513', true, 100, 1.5),
                    new Platform(100, 200, 100, 20),
                    new Platform(350, 160, 150, 20),
                    new Platform(600, 120, 100, 20)
                ],
                enemies: [
                    new Enemy(150, 410, 35, 45, 1.2, 100, 'alien'),
                    new Enemy(400, 370, 40, 40, 1.4, 120, 'ufo'),
                    new Enemy(600, 290, 35, 45, 1.3, 80, 'robot')
                ],
                stars: [
                    new Star(100, 340),
                    new Star(300, 310),
                    new Star(550, 280),
                    new Star(200, 240),
                    new Star(450, 200),
                    new Star(150, 160),
                    new Star(400, 120),
                    new Star(650, 80)
                ],
                playerStart: { x: 50, y: 400 },
                requiredStars: 8
            },
            // Уровень 4 - Звёздный
            {
                platforms: [
                    new Platform(0, 450, 800, 50),
                    new Platform(80, 350, 120, 20, '#4a2a5a', false, 0, 0, 'energy'),
                    new Platform(300, 320, 100, 20, '#3a3a6a', true, 120, 1.8),
                    new Platform(550, 290, 150, 20, '#4a2a5a', false, 0, 0, 'energy'),
                    new Platform(200, 250, 180, 20),
                    new Platform(450, 210, 120, 20, '#3a3a6a', true, 90, 2.0),
                    new Platform(100, 170, 140, 20),
                    new Platform(350, 130, 160, 20)
                ],
                enemies: [
                    new Enemy(180, 410, 35, 45, 1.4, 130, 'robot'),
                    new Enemy(450, 340, 35, 45, 1.6, 100, 'alien'),
                    new Enemy(650, 250, 35, 45, 1.5, 85, 'robot'),
                    new Enemy(300, 190, 40, 40, 1.7, 95, 'ufo')
                ],
                stars: [
                    new Star(130, 310),
                    new Star(350, 280),
                    new Star(600, 250),
                    new Star(280, 210),
                    new Star(500, 170),
                    new Star(150, 130),
                    new Star(400, 90)
                ],
                playerStart: { x: 50, y: 400 },
                requiredStars: 7
            },
            // Уровень 5 - Сложный
            {
                platforms: [
                    new Platform(0, 450, 800, 50),
                    new Platform(100, 370, 140, 20, '#111144', true, 100, 2.0),
                    new Platform(400, 340, 130, 20, '#4a2a5a', false, 0, 0, 'energy'),
                    new Platform(200, 300, 160, 20, '#111144', true, 140, 1.8),
                    new Platform(500, 270, 120, 20),
                    new Platform(150, 230, 140, 20, '#111144', true, 110, 2.2),
                    new Platform(450, 190, 150, 20, '#4a2a5a', false, 0, 0, 'energy'),
                    new Platform(300, 150, 120, 20)
                ],
                enemies: [
                    new Enemy(250, 410, 40, 40, 1.6, 140, 'ufo'),
                    new Enemy(500, 320, 40, 40, 1.8, 120, 'robot'),
                    new Enemy(350, 250, 40, 40, 2.0, 100, 'alien'),
                    new Enemy(600, 220, 40, 40, 1.9, 90, 'ufo'),
                    new Enemy(200, 180, 40, 40, 2.1, 110, 'robot')
                ],
                stars: [
                    new Star(150, 330),
                    new Star(450, 300),
                    new Star(270, 260),
                    new Star(550, 230),
                    new Star(200, 190),
                    new Star(500, 150),
                    new Star(330, 110)
                ],
                playerStart: { x: 50, y: 400 },
                requiredStars: 7
            },
            // Уровень 6 - Метеорный
            {
                platforms: [
                    new Platform(0, 450, 800, 100, '#333333', false, 0, 0, 'asteroid'),
                    new Platform(120, 360, 110, 25, '#444444', true, 130, 2.2, 'asteroid'),
                    new Platform(380, 330, 140, 25, '#444444', false, 0, 0, 'asteroid'),
                    new Platform(220, 280, 130, 25, '#444444', true, 150, 2.0, 'asteroid'),
                    new Platform(520, 250, 120, 25, '#444444'),
                    new Platform(180, 200, 160, 25, '#444444', true, 120, 2.4, 'asteroid'),
                    new Platform(480, 170, 140, 25, '#444444', false, 0, 0, 'asteroid')
                ],
                enemies: [
                    new Enemy(300, 410, 45, 50, 1.8, 150, 'robot'),
                    new Enemy(550, 330, 45, 50, 2.0, 130, 'ufo'),
                    new Enemy(400, 230, 45, 50, 2.2, 120, 'alien'),
                    new Enemy(650, 200, 45, 50, 2.1, 110, 'robot'),
                    new Enemy(250, 150, 45, 50, 2.3, 140, 'ufo')
                ],
                stars: [
                    new Star(170, 320),
                    new Star(440, 290),
                    new Star(280, 240),
                    new Star(570, 210),
                    new Star(230, 160),
                    new Star(530, 130),
                    new Star(330, 90),
                    new Star(380, 90)
                ],
                playerStart: { x: 50, y: 400 },
                requiredStars: 8
            },
            // Уровень 7 - Пришельцы
            {
                platforms: [
                    new Platform(0, 450, 800, 50),
                    new Platform(90, 370, 130, 20, '#3a6a3a', true, 140, 2.2),
                    new Platform(370, 340, 150, 20, '#4a2a5a', false, 0, 0, 'energy'),
                    new Platform(210, 300, 140, 20, '#3a6a3a', true, 160, 2.4),
                    new Platform(510, 270, 130, 20),
                    new Platform(160, 230, 170, 20, '#3a6a3a', true, 130, 2.6),
                    new Platform(460, 190, 140, 20, '#4a2a5a', false, 0, 0, 'energy'),
                    new Platform(290, 150, 120, 20, '#3a6a3a', true, 110, 2.8)
                ],
                enemies: [
                    new Enemy(350, 410, 50, 55, 2.0, 160, 'alien'),
                    new Enemy(600, 340, 50, 55, 2.2, 140, 'alien'),
                    new Enemy(450, 240, 50, 55, 2.4, 130, 'alien'),
                    new Enemy(700, 220, 50, 55, 2.3, 120, 'alien'),
                    new Enemy(300, 180, 50, 55, 2.5, 150, 'alien')
                ],
                stars: [
                    new Star(140, 330),
                    new Star(430, 300),
                    new Star(270, 260),
                    new Star(560, 230),
                    new Star(220, 190),
                    new Star(520, 150),
                    new Star(320, 110),
                    new Star(370, 110),
                    new Star(420, 110)
                ],
                playerStart: { x: 50, y: 400 },
                requiredStars: 9
            },
            // Уровень 8 - Финальный
            {
                platforms: [
                    new Platform(0, 450, 800, 50),
                    new Platform(80, 370, 140, 20, '#2a2a6a', true, 150, 2.5),
                    new Platform(360, 340, 160, 20, '#4a2a5a', false, 0, 0, 'energy'),
                    new Platform(190, 300, 150, 20, '#2a2a6a', true, 170, 2.7),
                    new Platform(490, 270, 140, 20),
                    new Platform(140, 230, 180, 20, '#2a2a6a', true, 140, 2.9),
                    new Platform(440, 190, 150, 20, '#4a2a5a', false, 0, 0, 'energy'),
                    new Platform(270, 150, 130, 20, '#2a2a6a', true, 120, 3.1),
                    new Platform(560, 120, 160, 20)
                ],
                enemies: [
                    new Enemy(400, 410, 55, 60, 2.2, 170, 'ufo'),
                    new Enemy(650, 350, 55, 60, 2.4, 150, 'robot'),
                    new Enemy(500, 240, 55, 60, 2.6, 140, 'alien'),
                    new Enemy(750, 210, 55, 60, 2.5, 130, 'ufo'),
                    new Enemy(350, 170, 55, 60, 2.7, 160, 'robot'),
                    new Enemy(600, 130, 55, 60, 2.8, 120, 'alien')
                ],
                stars: [
                    new Star(150, 330),
                    new Star(440, 300),
                    new Star(260, 260),
                    new Star(550, 230),
                    new Star(210, 190),
                    new Star(510, 150),
                    new Star(310, 110),
                    new Star(360, 110),
                    new Star(410, 110),
                    new Star(590, 80)
                ],
                playerStart: { x: 50, y: 400 },
                requiredStars: 10
            }
        ];
    }

    getLevel(levelNumber) {
        return this.levels[levelNumber - 1];
    }

    getTotalLevels() {
        return this.levels.length;
    }
}