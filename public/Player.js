class Player extends Person {
    constructor(config) {
        super(config);
        this.directionInput = null;
    }

    getArrow(state) {
        return this.directionInput.direction
    }
}