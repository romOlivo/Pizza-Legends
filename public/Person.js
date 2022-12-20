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
    }

    getArrow(state) {
        return state.arrow;
    }

    updateDirection(state, arrow, canMove) {
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
            this.updatePosition();
        } else {
            const arrow = this.getArrow(state);
            this.updateDirection(state, arrow, !state.map.isSpaceTaken(this.x, this.y, arrow));
        }
        this.updateSprite();
    }

}