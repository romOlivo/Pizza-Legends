class DirectionInput {
    constructor() {
        this.heldDirections = []

        this.map = {
            "ArrowUp"   : "up",
            "ArrowDown" : "down",
            "ArrowLeft" : "left",
            "ArrowRight": "right",
        }
    }

    init() {
        document.addEventListener("keydown", e => {
            const dir = this.map [e.code];
            console.log(dir);
            if (dir && this.heldDirections.indexOf(dir)) {
                this.heldDirections.unshift(dir); // add index to array
            }
        });
        document.addEventListener("keyup", e => {
            const dir = this.map [e.code];
            const index = this.heldDirections.indexOf(dir);
            if (index > -1) {
                this.heldDirections.splice(index, 1); // remove index
            }
        });
    }

    get direction() {
        return this.heldDirections[0];
    }

}