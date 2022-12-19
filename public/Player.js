class Player extends Person {
    constructor(config) {
        super(config);
        this.directionInput = null;
    }

    getArrow(state) {
        console.log(this.directionInput.direction)
        return this.directionInput.direction
    }
}