class RevealingText {
    constructor(config) {
        this.element = config.element;
        this.text = config.text;
        this.speed = config.speed || 30;

        this.timeout = null;
        this.isDone = false;
    }

    warpToDone() {
        clearTimeout(this.timeout);
        this.isDone = true;
        this.element.querySelectorAll("span").forEach(s => {
            s.classList.add("revealed");
        })
    }

    revealOneCharacter(characters) {
        const character = characters.splice(0,1)[0];
        character.span.classList.add("revealed");

        if (characters.length > 0) {
            this.timeout = setTimeout(() => {
                this.revealOneCharacter(characters);
            }, character.delayAfter);
        } else {
            this.isDone = true;
        }
    }

    init() {
        let characters = [];
        this.text.split("").forEach(character => {
            // Create the span character
            let span = document.createElement("span");
            span.textContent = character;
            this.element.appendChild(span);
            // Add the span to our internal system
            characters.push({
                span,
                delayAfter: character === " " ? 0 : this.speed,
            })
        });

        this.revealOneCharacter(characters);
    }

}