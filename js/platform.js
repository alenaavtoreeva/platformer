class Platform {
    constructor(x, y, width, height, color = '#4a4a8a', isMoving = false, moveDistance = 0, moveSpeed = 0, type = 'normal') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.isMoving = isMoving;
        this.moveDistance = moveDistance;
        this.moveSpeed = moveSpeed;
        this.direction = 1;
        this.startX = x;
        this.type = type;
        this.animationFrame = 0;
    }

    update(deltaTime) {
        this.animationFrame += 0.05;
        
        if (this.isMoving) {
            // ИСПРАВЛЕНО: Убрана нормализация deltaTime для платформ
            this.x += this.moveSpeed * this.direction;

            if (this.x > this.startX + this.moveDistance) {
                this.direction = -1;
            } else if (this.x < this.startX - this.moveDistance) {
                this.direction = 1;
            }
        }
    }

    draw(ctx) {
        ctx.save();
        
        if (this.type === 'energy') {
            // Энергетическая платформа
            const pulse = Math.sin(this.animationFrame) * 0.2 + 0.8;
            ctx.globalAlpha = pulse;
            ctx.fillStyle = '#00ffff';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.strokeRect(this.x, this.y, this.width, this.height);
            
        } else if (this.type === 'asteroid') {
            // Астероидная платформа
            ctx.fillStyle = this.color;
            ctx.beginPath();
            for (let i = 0; i < this.width; i += 10) {
                const heightVar = Math.sin((i + this.animationFrame * 10) * 0.5) * 3;
                ctx.lineTo(this.x + i, this.y + heightVar);
            }
            ctx.lineTo(this.x + this.width, this.y + this.height);
            ctx.lineTo(this.x, this.y + this.height);
            ctx.closePath();
            ctx.fill();
            
        } else {
            // Обычная платформа
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            
            // Текстура с звездами
            ctx.fillStyle = '#6666ff';
            for (let i = 0; i < this.width; i += 25) {
                const starX = this.x + i + Math.sin(this.animationFrame + i) * 2;
                const starY = this.y + 8;
                ctx.beginPath();
                ctx.arc(starX, starY, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        ctx.restore();
    }
}