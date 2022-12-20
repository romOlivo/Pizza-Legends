class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    }

    startGameLoop() {
        const step = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

            const cameraPerson = this.map.gameObjects.player;
            Object.values(this.map.gameObjects).forEach(obj => {
                obj.update({ map: this.map });
            })
            this.map.drawLowerImage(this.ctx, cameraPerson);
            Object.values(this.map.gameObjects).forEach(obj => {
                obj.sprite.draw(this.ctx, cameraPerson);
            })
            this.map.drawUpperImage(this.ctx, cameraPerson);

            requestAnimationFrame(() => {
                step();
            })
        }
        step();
    }

    init() {
        this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
        this.map.mountGameObjects();
        this.directionInput = new DirectionInput();
        this.directionInput.init();
        this.map.gameObjects.player.directionInput = this.directionInput;
        this.startGameLoop();

    }

}