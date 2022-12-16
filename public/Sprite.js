class Sprite {
    constructor(config) {
        // Setting up Image
        this.isLoaded = false;
        this.image = new Image();
        this.image.onload = () => {
            this.isLoaded = true;
        };
        this.image.src = config.src;

        // Shadow
        this.useShadow = config.useShadow || false;
        this.isShadowLoaded = false;
        this.shadow = new Image();
        if (this.useShadow) {
            this.shadow.src = "/images/characters/shadow.png";
        }
        this.shadow.onload = () => {
            this.isShadowLoaded = true;
        }

        // Configuring Animation
        this.animations = config.animation || {
            idleDown: [
                [0, 0]
            ],
            walkDown: [
                [0, 0],
                [1, 0],
                [2, 0],
                [3, 0]
            ],
        };
        this.currentAnimation = config.currentAnimation || "idleDown";
        this.currentAnimationFrame = 0;

        // Reference GameObject
        this.gameObject = config.gameObject;
    }

    draw(ctx) {
        const squareXSize = 16;
        const squareYSize = 16;

        const x = this.gameObject.x * squareXSize - 8;
        const y = this.gameObject.y * squareYSize - 18;

        const leftCut = 0;
        const topCut = 0;
        const widthCut = 32;
        const heightCut = 32;
        const width = 32;
        const height = 32;

        this.isShadowLoaded && ctx.drawImage(this.shadow, leftCut, topCut, 
            widthCut, heightCut, x, y, width, height);
        this.isLoaded && ctx.drawImage(this.image, leftCut, topCut, 
            widthCut, heightCut, x, y, width, height);
    }
}