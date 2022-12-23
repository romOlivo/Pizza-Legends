class TextMessage {
    constructor({text, onComplete}) {
        this.text = text;
        this.onComplete = onComplete;
        this.element = null;
    }

    done() {
        if (this.revealingText.isDone) {
            this.actionListener.unbind();
            this.element.remove();
            this.onComplete();
        } else {
            this.revealingText.warpToDone();
        }
    }

    crearteElement() {
        this.element = document.createElement("div");
        this.element.classList.add("TextMessage");

        this.element.innerHTML = (
            '<p class="TextMessageP"> </p>' +
            '<button class="TextMessageButton">Next</button>'
        );

        this.revealingText = new RevealingText({
            element: this.element.querySelector(".TextMessageP"),
            text: this.text,
        })

        this.element.querySelector("button").addEventListener("click", () => {
            this.done();
        });

        this.actionListener = new KeyPressListener("Enter", () => {
            this.done();
        })

    }

    init(container) {
        this.crearteElement();
        container.appendChild(this.element);
        this.revealingText.init();
    }

}