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

            // Set camera
            const cameraPerson = this.map.gameObjects.player;
            Object.values(this.map.gameObjects).forEach(obj => {
                obj.update({ map: this.map });
            })

            // Draw lower map
            this.map.drawLowerImage(this.ctx, cameraPerson);

            // Draw the game objects
            Object.values(this.map.gameObjects).sort((a,b) => {
                return a.y - b.y;
            }).forEach(obj => {
                obj.sprite.draw(this.ctx, cameraPerson);
            })

            // Draw upper map
            this.map.drawUpperImage(this.ctx, cameraPerson);

            requestAnimationFrame(() => {
                step();
            })
        }
        step();
    }

    bindActionInput() {
        new KeyPressListener("Enter", () => {
            if(!this.map.isCutscenePlaying) {
                this.map.checkForActionCutscene();
            }
        });
    }

    bindHeroPositionCheck() {
        document.addEventListener("PersonWalkingComplete", e => {
            if (e.detail.whoId === "player") {
                this.map.checkForFootstepCutscene();
            }
        })
    }

    startMap(mapConfig) {
        this.map = new OverworldMap(mapConfig);
        this.map.overworld = this;
        this.map.mountGameObjects();
        
        this.map.gameObjects.player.directionInput = this.directionInput;
    }

    init() {
        this.directionInput = new DirectionInput();
        this.directionInput.init();

        this.startMap(window.OverworldMaps.DemoRoom);

        this.bindActionInput();
        this.bindHeroPositionCheck();

        
        this.startGameLoop();

        this.map.startCutscene([
            {type: "walk", who: "player", direction: "down"},
            {type: "walk", who: "player", direction: "down"},
            {type: "walk", who: "npc1",   direction: "down"},
            {type: "textMessage", text: "Hello!"},
            {type: "textMessage", text: "Welcome to Pizza Legends!"},
            {type: "battle"},
        ])

    }

}