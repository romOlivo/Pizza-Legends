class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;
        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
    }

    drawLowerImage(ctx) {
        ctx.drawImage(this.lowerImage, 0, 0);
    }

    drawUpperImage(ctx) {
        ctx.drawImage(this.upperImage, 0, 0);
    }
}

window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "/images/maps/DemoLower.png",
        upperSrc: "/images/maps/DemoUpper.png",
        gameObjects: {
            player: new GameObject({
                x: 5,
                y: 6,
                useShadow: true,
                src: "/images/characters/people/hero.png",
            }),
            npc1: new GameObject({
                x: 7,
                y: 9,
                useShadow: true,
                src: "/images/characters/people/npc1.png",
            })
        }
    },
    Kitchen: {
        lowerSrc: "/images/maps/KitchenLower.png",
        upperSrc: "/images/maps/KitchenUpper.png",
        gameObjects: {
            player: new GameObject({
                x: 3,
                y: 5,
                useShadow: true,
                src: "/images/characters/people/hero.png",
            }),
            npc1: new GameObject({
                x: 9,
                y: 6,
                useShadow: true,
                src: "/images/characters/people/npc1.png",
            }),
            npc2: new GameObject({
                x: 10,
                y: 8,
                useShadow: true,
                src: "/images/characters/people/npc2.png",
            })
        }
    },
}
