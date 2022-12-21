class OverworldMap {
    constructor(config) {
        this.overworld = null;
        this.gameObjects = config.gameObjects;
        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;
        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
        this.walls = config.walls || {}
        this.isCutscenePlaying = false;
        this.cutscenesSpaces = config.cutscenesSpaces || {};
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
        Object.keys(this.gameObjects).forEach(key => {
            let obj = this.gameObjects[key];
            obj.id = key;
            obj.mount(this);
        });
    }

    moveWall(x, y, direction) {
        this.removeWall(x, y);
        const {newX, newY} = utils.nextPosition(x, y, direction);
        this.addWall(newX, newY);
    }

    async startCutscene(events) {
        this.isCutscenePlaying = true;
        for (let i = 0; i < events.length; i++) {
            const eventHandler = new OverworldEvent({
                event: events[i],
                map: this,
            });
            await eventHandler.init();
        }
        this.isCutscenePlaying = false;

        // Set normal behavior to NPCs
        Object.values(this.gameObjects).forEach(obj => obj.doBehaviorEvent(this));
    }

    checkForActionCutscene() {
        const player = this.gameObjects["player"];
        const {newX, newY} = utils.nextPosition(player.x, player.y, player.direction);
        const match = Object.values(this.gameObjects).find(obj => {
            return obj.x == newX && obj.y == newY;
        });
        if (match && match.talking.length) {
            this.startCutscene(match.talking[0].events)
        }
    }

    checkForFootstepCutscene() {
        const player = this.gameObjects["player"];
        const match = this.cutscenesSpaces[player.x + "," + player.y]
        if (!this.isCutscenePlaying && match) {
            this.startCutscene(match[0].events);
        }
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
                x: utils.withGrid(10),
                y: utils.withGrid(6),
                useShadow: true,
                src: "/images/characters/people/npc1.png",
                behaviorLoop: [
                    {type: "walk", direction: "left"},
                    {type: "stand", direction: "left", time: 1600},
                    {type: "walk", direction: "up"},
                    {type: "stand", direction: "up", time: 1600},
                    {type: "walk", direction: "right"},
                    {type: "stand", direction: "right", time: 1600},
                    {type: "walk", direction: "down"},
                    {type: "stand", direction: "down", time: 1600},
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Hello player", faceHero: "npc1"},
                            {type: "textMessage", text: "Nice to meet you!"},
                        ]
                    }
                ]
            }),
        },
        walls: {
            [utils.asGridCoord(7, 6)]: true,
            [utils.asGridCoord(8, 6)]: true,
            [utils.asGridCoord(7, 7)]: true,
            [utils.asGridCoord(8, 7)]: true,
        },
        cutscenesSpaces: {
            [utils.asGridCoord(7, 4)]: [
                {
                    events: [
                        { type: "walk", who: "player", direction: "down"},
                        { type: "textMessage", text: "You can't be in there!"},
                    ]
                }
            ],
            [utils.asGridCoord(5, 10)]: [
                {
                    events: [
                        { type: "changeMap", map: "Kitchen"},
                    ]
                }
            ],

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
