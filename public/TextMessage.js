class TextMessage {
    constructor({text, onComplete}) {
        this.text = text;
        this.onComplete = onComplete;
        this.element = null;
    }

    done() {
        this.actionListener.unbind();
        this.element.remove();
        this.onComplete();
    }

    crearteElement() {
        this.element = document.createElement("div");
        this.element.classList.add("TextMessage");

        this.element.innerHTML = (
            '<p class="TextMessageP">' + this.text + '</p>' +
            '<button class="TextMessageButton">Next</button>'
        );

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
    }

}