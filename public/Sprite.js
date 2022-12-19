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
            "idle-down":  [ [0, 0] ],
            "idle-right": [ [0, 1] ],
            "idle-up":    [ [0, 2] ],
            "idle-left":  [ [0, 3] ],
            "walk-down": [
                [1, 0],
                [0, 0],
                [3, 0],
                [0, 0]
            ],
            "walk-right": [
                [1, 1],
                [0, 1],
                [3, 1],
                [0, 1]
            ],
            "walk-up": [
                [1, 2],
                [0, 2],
                [3, 2],
                [0, 2]
            ],
            "walk-left": [
                [1, 3],
                [0, 3],
                [3, 3],
                [0, 3]
            ],
        };
        this.currentAnimation = config.currentAnimation || "idle-down";
        this.currentAnimationFrame = 0;
        this.animationFrameTime = config.animationFrameTime || 8;
        this.animationFrameProgress = this.animationFrameTime;

        // Reference GameObject
        this.gameObject = config.gameObject;
    }

    get frame() {
        return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }

    setAnimation(key) {
        if (this.currentAnimation !== key && Object.keys(this.animations).indexOf(key) != -1) {
            console.log(key)
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameTime;
        }
    }

    updateAnimationProgress() {
        if(this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1;
            return;
        }

        this.animationFrameProgress = this.animationFrameTime;
        this.currentAnimationFrame = (this.currentAnimationFrame + 1) % this.animations[this.currentAnimation].length
    }

    draw(ctx) {
        const x = this.gameObject.x - 8;
        const y = this.gameObject.y - 18;

        const [xFrame, yFrame] = this.frame;
        const frameSize = 32;
        const leftCut = xFrame * frameSize;
        const topCut = yFrame * frameSize;
        const widthCut = 32;
        const heightCut = 32;
        const width = 32;
        const height = 32;

        this.isShadowLoaded && ctx.drawImage(this.shadow, 0, 0, 
            widthCut, heightCut, x, y, width, height);
        this.isLoaded && ctx.drawImage(this.image, leftCut, topCut, 
            widthCut, heightCut, x, y, width, height);

        this.updateAnimationProgress();
    }
}