class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
    }

    init() {
        const image = new Image();
        image.onload = () => {
            this.ctx.drawImage(image, 0, 0);
        }
        image.src = "/images/maps/DemoLower.png";
        const squareXSize = 16;
        const squareYSize = 16;
        const x = 1;
        const y = 4;

        const shadow = new Image();
        shadow.onload = () => {
            const leftCut = 0;
            const topCut = 0;
            const widthCut = 32;
            const heightCut = 32;
            const width = 32;
            const height = 32;
            this.ctx.drawImage(shadow, leftCut, topCut, 
                widthCut, heightCut, x * squareXSize - 8, 
                y * squareYSize - 16, width, height);
        }
        shadow.src = "/images/characters/shadow.png";

        const player = new Image();
        player.onload = () => {
            const leftCut = 0;
            const topCut = 0;
            const widthCut = 32;
            const heightCut = 32;
            const width = 32;
            const height = 32;
            this.ctx.drawImage(player, leftCut, topCut, 
                widthCut, heightCut, x * squareXSize - 8, 
                y * squareYSize - 16, width, height);
        }
        player.src = "/images/characters/people/hero.png";
    }

}