class Enemy {
    constructor(x, y, width, height, speed, patrolDistance = 100, type = 'alien') {
        this.x = x;
        this.y = y;
        this.width = width || 35;
        this.height = height || 45;
        this.speed = speed;
        this.direction = 1;
        this.startX = x;
        this.patrolDistance = patrolDistance;
        this.health = 100;
        this.isAlive = true;
        this.type = type;
        this.attackCooldown = 0;
        this.animationFrame = 0;
        this.isMoving = true;
    }

    update(deltaTime) {
        if (!this.isAlive) return;

        this.animationFrame += 0.1;
        
        // Движение врага
        this.x += this.speed * this.direction;

        // Изменение направления при достижении границ патрулирования
        if (this.x > this.startX + this.patrolDistance) {
            this.direction = -1;
        } else if (this.x < this.startX - this.patrolDistance) {
            this.direction = 1;
        }

        if (this.attackCooldown > 0) {
            this.attackCooldown -= deltaTime;
        }
    }

    draw(ctx) {
        if (!this.isAlive) return;

        ctx.save();
        ctx.translate(this.x, this.y);

        // Определение цвета по типу
        let bodyColor, detailColor;
        switch(this.type) {
            case 'robot':
                bodyColor = '#888888';
                detailColor = '#ff4444';
                break;
            case 'ufo':
                bodyColor = '#4a4a8a';
                detailColor = '#00ffff';
                break;
            default: // alien
                bodyColor = '#44ff44';
                detailColor = '#ffff00';
        }

        if (this.direction === -1) {
            ctx.scale(-1, 1);
            ctx.translate(-this.width, 0);
        }

        // Тело врага (аналогично игроку)
        ctx.fillStyle = bodyColor;
        ctx.fillRect(5, 5, this.width - 10, this.height - 15);

        // Голова/верхняя часть
        ctx.fillStyle = detailColor;
        if (this.type === 'ufo') {
            // НЛО - диск
            ctx.beginPath();
            ctx.ellipse(this.width/2, 10, this.width/3, 8, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Купол
            ctx.fillStyle = '#6666ff';
            ctx.beginPath();
            ctx.arc(this.width/2, 10, 6, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Обычная голова
            ctx.beginPath();
            ctx.arc(this.width / 2, 12, 10, 0, Math.PI * 2);
            ctx.fill();
        }

        // Глаза
        ctx.fillStyle = '#ffffff';
        if (this.type === 'robot') {
            // Красные глаза робота
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(this.width/2 - 6, 8, 4, 4);
            ctx.fillRect(this.width/2 + 2, 8, 4, 4);
        } else if (this.type === 'ufo') {
            // Мигающие огни НЛО
            ctx.fillStyle = Math.sin(this.animationFrame) > 0 ? '#ff0000' : '#00ff00';
            ctx.fillRect(8, 15, 3, 3);
            ctx.fillRect(this.width - 11, 15, 3, 3);
        } else {
            // Глаза пришельца
            ctx.fillStyle = '#ffff00';
            const eyeOffset = Math.sin(this.animationFrame) * 2;
            ctx.fillRect(this.width/2 - 5 + eyeOffset, 9, 3, 3);
            ctx.fillRect(this.width/2 + 2 + eyeOffset, 9, 3, 3);
        }

        // Ноги/анимация движения
        if (this.isMoving) {
            const legOffset = Math.sin(this.animationFrame) * 4;
            ctx.fillStyle = bodyColor;
            ctx.fillRect(8, this.height - 10, 5, 8 + legOffset);
            ctx.fillRect(17, this.height - 10, 5, 8 - legOffset);
        } else {
            ctx.fillStyle = bodyColor;
            ctx.fillRect(8, this.height - 10, 5, 8);
            ctx.fillRect(17, this.height - 10, 5, 8);
        }

        ctx.restore();

        // Полоска здоровья
        if (this.health < 100) {
            ctx.fillStyle = 'red';
            ctx.fillRect(this.x, this.y - 12, this.width, 4);
            ctx.fillStyle = 'green';
            ctx.fillRect(this.x, this.y - 12, this.width * (this.health / 100), 4);
        }
    }

    checkCollision(player) {
        if (!this.isAlive) return false;

        return player.x < this.x + this.width &&
               player.x + player.width > this.x &&
               player.y < this.y + this.height &&
               player.y + player.height > this.y;
    }

    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.isAlive = false;
            return true;
        }
        return false;
    }

    attack(player) {
        if (this.attackCooldown <= 0 && this.checkCollision(player)) {
            player.takeDamage(15); // УМЕНЬШЕН УРОН
            this.attackCooldown = 1500; // УВЕЛИЧЕН КУЛДАУН
            return true;
        }
        return false;
    }
}