class GameObject {
    constructor(config) {
        this.toMount = true;
        this.isMounted = false;
        this.x = config.x || 0; // 0 if not config.x is find
        this.y = config.y || 0; // 0 if not config.y is find
        this.direction = config.direction || "down";
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "/images/characters/people/hero.png",
            useShadow: config.useShadow || false,
        });
    }

    mount(map) {
        if (this.toMount && !this.isMounted) {
            this.isMounted = true;
            map.addWall(this.x, this.y);
        }
    }

    update() {

    }
}