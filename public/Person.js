class Person extends GameObject {
    constructor(config) {
        super(config);
        this.movingProgressRemaining = 0;
        this.arrow = null;
        this.directionUpdate = {
            "up":    ["y", -1],
            "down":  ["y",  1],
            "left":  ["x", -1],
            "right": ["x",  1],
        }
    }

    updatePosition() {
        const [property, change] = this.directionUpdate[this.direction];
        this[property] += change;
        this.movingProgressRemaining -= 1;

        if (this.movingProgressRemaining == 0) {
            utils.emitEvent("PersonWalkingComplete", {whoId: this.id});
        }

    }

    getArrow(state) {
        return state.arrow;
    }

    updateDirection(state, arrow) {
        const canMove = !state.map.isSpaceTaken(this.x, this.y, arrow)
        if (arrow) {
            this.direction = arrow;
            if (canMove) {
                this.movingProgressRemaining = 16;
                state.map.moveWall(this.x, this.y, this.direction)
            }
        }
    }

    updateSprite() {
        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-" + this.direction);
        } else {
            this.sprite.setAnimation("idle-" + this.direction);
        }
    }

    update(state) {
        if (this.movingProgressRemaining > 0) {
            this.updateSprite();
            this.updatePosition();
        } else {
            const arrow = this.getArrow(state);
            this.updateDirection(state, arrow);
            this.updateSprite();
        }
        
    }

    startBehavior(state, behavior) {
        this.direction = behavior.direction;
        this.isStanding = false;
        if(behavior.type === "walk") {
            if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
                behavior.retry && setTimeout(() => {
                    this.startBehavior(state, behavior)
                }, 100)
            } else {
                this.updateDirection(state, this.direction)
            }
        } else if (behavior.type === "stand") {
            this.isStanding = true;
            setTimeout(() => {
                utils.emitEvent("PersonStandComplete", {whoId: this.id});
                this.isStanding = false;
            }, behavior.time)
        }
    }

}