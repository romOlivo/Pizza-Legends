class KeyPressListener {
    constructor(keyCode, callback) {
        let keySafe = true;

        this.keydownFunction = function(event) {
            if (event.code === keyCode) {
                if (keySafe) {
                    keySafe = false;
                    callback();
                }
            }
        };

        document.addEventListener("keydown", this.keydownFunction);

        this.keyupFunction = function(event) {
            if (event.code === keyCode) {
                keySafe = true;
            }
        };

        document.addEventListener("keyup", this.keyupFunction);

    }

    unbind() {
        document.removeEventListener("keydown", this.keydownFunction);
        document.removeEventListener("keyup", this.keyupFunction);
    }

}