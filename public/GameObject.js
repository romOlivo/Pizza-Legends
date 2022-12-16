class GameObject {
    constructor(config) {
        this.x = config.x || 0; // 0 if not config.x is find
        this.y = config.y || 0; // 0 if not config.y is find
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "/images/characters/people/hero.png",
            useShadow: config.useShadow || false,
        });
    }
}