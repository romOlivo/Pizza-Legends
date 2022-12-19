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
        if (this.movingProgressRemaining > 0) {
            const [property, change] = this.directionUpdate[this.direction];
            this[property] += change;
            this.movingProgressRemaining -= 1;
        }
    }

    getArrow(state) {
        return state.arrow;
    }

    updateDirection(state) {
        const arrow = this.getArrow(state);
        if (this.movingProgressRemaining === 0 && arrow) {
            this.direction = arrow;
            this.movingProgressRemaining = 16;
        }
    }

    update(state) {
        this.updateDirection(state);
        this.updatePosition();
    }

}