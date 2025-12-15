class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 50;
        this.velocityX = 0;
        this.velocityY = 0;
        this.speed = 5;
        this.jumpForce = -11; // УВЕЛИЧЕНА СИЛА ПРЫЖКА
        this.gravity = 0.5;
        this.maxFallSpeed = 15;
        
        this.isOnGround = false;
        this.health = 100;
        this.maxHealth = 100;
        this.facing = 'right';
        this.animationFrame = 0;
        this.isMoving = false;
        
        this.invincible = false;
        this.invincibleTimer = 0;
        
        this.canJump = true;
        this.jumpCooldown = 0;
    }

    update(deltaTime, platforms) {
        const normalizedDelta = Math.min(deltaTime, 16) / 16;
        
        if (!this.isOnGround) {
            this.velocityY += this.gravity * normalizedDelta;
        }
        
        this.velocityY = Math.min(this.velocityY, this.maxFallSpeed);

        this.x += this.velocityX * normalizedDelta;
        this.y += this.velocityY * normalizedDelta;

        if (this.isMoving && this.isOnGround) {
            this.animationFrame += 0.2 * normalizedDelta;
        }

        if (this.invincible) {
            this.invincibleTimer -= deltaTime;
            if (this.invincibleTimer <= 0) {
                this.invincible = false;
            }
        }
        
        if (this.jumpCooldown > 0) {
            this.jumpCooldown -= deltaTime;
        }

        this.isOnGround = false;

        for (const platform of platforms) {
            const collision = this.checkPlatformCollision(platform);
            
            if (collision === 'top') {
                this.isOnGround = true;
                this.velocityY = 0;
                this.canJump = true;
            } else if (collision === 'bottom') {
                this.velocityY = 0;
            } else if (collision === 'left') {
                this.velocityX = 0;
                this.x = platform.x - this.width;
            } else if (collision === 'right') {
                this.velocityX = 0;
                this.x = platform.x + platform.width;
            }
        }

        this.x = Utils.clamp(this.x, 0, 800 - this.width);
        
        if (this.y > 600) {
            this.takeDamage(100);
        }
    }
    
    checkPlatformCollision(platform) {
        const collisionMargin = 5;
        
        const horizontalOverlap = this.x < platform.x + platform.width && 
                                 this.x + this.width > platform.x;
        const verticalOverlap = this.y < platform.y + platform.height && 
                               this.y + this.height > platform.y;
        
        if (!horizontalOverlap || !verticalOverlap) return false;
        
        const bottom = this.y + this.height;
        const top = this.y;
        const platformBottom = platform.y + platform.height;
        const platformTop = platform.y;
        
        const left = this.x;
        const right = this.x + this.width;
        const platformLeft = platform.x;
        const platformRight = platform.x + platform.width;
        
        const bottomOverlap = bottom - platformTop;
        const topOverlap = platformBottom - top;
        const leftOverlap = right - platformLeft;
        const rightOverlap = platformRight - left;
        
        const minOverlap = Math.min(bottomOverlap, topOverlap, leftOverlap, rightOverlap);
        
        if (minOverlap === bottomOverlap && this.velocityY >= 0) {
            this.y = platformTop - this.height;
            return 'top';
        } else if (minOverlap === topOverlap && this.velocityY <= 0) {
            this.y = platformBottom;
            return 'bottom';
        } else if (minOverlap === leftOverlap) {
            return 'left';
        } else if (minOverlap === rightOverlap) {
            return 'right';
        }
        
        return false;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        if (this.facing === 'left') {
            ctx.scale(-1, 1);
            ctx.translate(-this.width, 0);
        }

        if (this.invincible && Math.floor(this.invincibleTimer / 100) % 2 === 0) {
            ctx.globalAlpha = 0.5;
        }

        // Тело космонавта
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(5, 5, this.width - 10, this.height - 15);

        // Шлем
        ctx.fillStyle = '#00ffff';
        ctx.beginPath();
        ctx.arc(this.width / 2, 15, 12, 0, Math.PI * 2);
        ctx.fill();

        // Визор
        ctx.fillStyle = '#1a1a1a';
        ctx.beginPath();
        ctx.arc(this.width / 2, 15, 8, 0, Math.PI * 2);
        ctx.fill();

        // Анимация движения
        if (this.isMoving && this.isOnGround) {
            const legOffset = Math.sin(this.animationFrame) * 6;
            ctx.fillStyle = '#6666ff';
            ctx.fillRect(8, this.height - 12, 6, 10 + legOffset);
            ctx.fillRect(16, this.height - 12, 6, 10 - legOffset);
        } else {
            ctx.fillStyle = '#6666ff';
            ctx.fillRect(8, this.height - 12, 6, 10);
            ctx.fillRect(16, this.height - 12, 6, 10);
        }

        ctx.restore();

        // Полоска здоровья
        if (this.health < this.maxHealth) {
            ctx.fillStyle = 'red';
            ctx.fillRect(this.x, this.y - 15, this.width, 5);
            ctx.fillStyle = 'green';
            ctx.fillRect(this.x, this.y - 15, this.width * (this.health / this.maxHealth), 5);
        }
    }

    move(direction) {
        this.velocityX = direction * this.speed;
        this.isMoving = direction !== 0;
        if (direction !== 0) {
            this.facing = direction > 0 ? 'right' : 'left';
        }
    }

    jump() {
        if (this.canJump && this.jumpCooldown <= 0) {
            this.velocityY = this.jumpForce;
            this.isOnGround = false;
            this.canJump = false;
            this.jumpCooldown = 200;
            return true;
        }
        return false;
    }

    takeDamage(amount) {
        if (this.invincible) return false;

        this.health = Math.max(0, this.health - amount);
        this.invincible = true;
        this.invincibleTimer = 1000;

        if (this.health <= 0) {
            return true;
        }
        return false;
    }

    heal(amount) {
        this.health = Math.min(this.health + amount, this.maxHealth);
    }
}