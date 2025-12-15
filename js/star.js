class Star {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 25;
        this.height = 25;
        this.collected = false;
        this.animationFrame = 0;
        this.animationSpeed = 0.3;
        this.pulseDirection = 1;
        this.pulseSize = 1;
    }

    update() {
        this.animationFrame += this.animationSpeed;
        this.pulseSize += 0.02 * this.pulseDirection;
        if (this.pulseSize > 1.3) this.pulseDirection = -1;
        if (this.pulseSize < 0.7) this.pulseDirection = 1;
    }

    draw(ctx) {
        if (this.collected) return;

        ctx.save();
        ctx.translate(this.x + this.width/2, this.y + this.height/2);
        ctx.scale(this.pulseSize, this.pulseSize);
        
        const rotation = this.animationFrame * 0.3;
        ctx.rotate(rotation);
        
        // Рисуем звезду
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            ctx.lineTo(
                Math.cos((i * 2 * Math.PI) / 5) * 12,
                Math.sin((i * 2 * Math.PI) / 5) * 12
            );
            ctx.lineTo(
                Math.cos(((i * 2 + 1) * Math.PI) / 5) * 6,
                Math.sin(((i * 2 + 1) * Math.PI) / 5) * 6
            );
        }
        ctx.closePath();
        ctx.fill();
        
        ctx.fillStyle = '#FFA500';
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            ctx.lineTo(
                Math.cos((i * 2 * Math.PI) / 5) * 8,
                Math.sin((i * 2 * Math.PI) / 5) * 8
            );
            ctx.lineTo(
                Math.cos(((i * 2 + 1) * Math.PI) / 5) * 4,
                Math.sin(((i * 2 + 1) * Math.PI) / 5) * 4
            );
        }
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
    }

    checkCollision(player) {
        if (this.collected) return false;

        return player.x < this.x + this.width &&
               player.x + player.width > this.x &&
               player.y < this.y + this.height &&
               player.y + player.height > this.y;
    }

    collect() {
        this.collected = true;
        Utils.playSound('sounds/star.mp3', 0.3);
    }
}