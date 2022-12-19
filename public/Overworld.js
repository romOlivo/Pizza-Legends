class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    }

    startGameLoop() {
        const step = () => {

            this.map.drawLowerImage(this.ctx);
            Object.values(this.map.gameObjects).forEach(obj => {
                obj.update({ });
                obj.sprite.draw(this.ctx);
            })
            this.map.drawUpperImage(this.ctx);

            requestAnimationFrame(() => {
                step();
            })
        }
        step();
    }

    init() {
        this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
        this.directionInput = new DirectionInput();
        this.directionInput.init();
        this.map.gameObjects.player.directionInput = this.directionInput;
        this.startGameLoop();

    }

}