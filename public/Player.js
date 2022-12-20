class Player extends Person {
    constructor(config) {
        super(config);
        this.directionInput = null;
    }

    getArrow(state) {
        if (!state.map.isCutscenePlaying) {
            return this.directionInput.direction
        } else {
            return null;
        }
    }
}