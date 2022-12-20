class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;
        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
        this.walls = config.walls || {}
    }

    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(this.lowerImage, 
            // Math.max(utils.withGrid(10.5) - cameraPerson.x, utils.withGrid(4.5)), 
            utils.withGrid(10.5) - cameraPerson.x,
            utils.withGrid(6) - cameraPerson.y);
    }

    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(this.upperImage, 
            utils.withGrid(10.5) - cameraPerson.x, 
            utils.withGrid(6) - cameraPerson.y);
    }

    isSpaceTaken(x, y, direction) {
        const {newX, newY} = utils.nextPosition(x, y, direction);
        return this.walls[newX + "," + newY] || false;
    }

    addWall(x, y) {
        this.walls[x + "," + y] = true;
    }

    removeWall(x, y) {
        delete this.walls[x + "," + y];
    }

    mountGameObjects() {
        Object.values(this.gameObjects).forEach(obj => {
            obj.mount(this);
        });
    }

    moveWall(x, y, direction) {
        this.removeWall(x, y);
        const {newX, newY} = utils.nextPosition(x, y, direction);
        this.addWall(newX, newY);
    }

}

window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "/images/maps/DemoLower.png",
        upperSrc: "/images/maps/DemoUpper.png",
        gameObjects: {
            player: new Player({
                x: utils.withGrid(5),
                y: utils.withGrid(6),
                useShadow: true,
                src: "/images/characters/people/hero.png",
            }),
            npc1: new Person({
                x: utils.withGrid(9),
                y: utils.withGrid(6),
                useShadow: true,
                src: "/images/characters/people/npc1.png",
            }),
        },
        walls: {
            [utils.asGridCoord(7, 6)]: true,
            [utils.asGridCoord(8, 6)]: true,
            [utils.asGridCoord(7, 7)]: true,
            [utils.asGridCoord(8, 7)]: true,
        }
    },
    Kitchen: {
        lowerSrc: "/images/maps/KitchenLower.png",
        upperSrc: "/images/maps/KitchenUpper.png",
        gameObjects: {
            player: new Player({
                x: utils.withGrid(3),
                y: utils.withGrid(5),
                useShadow: true,
                src: "/images/characters/people/hero.png",
            }),
            npc1: new Person({
                x: utils.withGrid(9),
                y: utils.withGrid(6),
                useShadow: true,
                src: "/images/characters/people/npc1.png",
            }),
            npc2: new Person({
                x: utils.withGrid(10),
                y: utils.withGrid(8),
                useShadow: true,
                src: "/images/characters/people/npc2.png",
            })
        }
    },
}
