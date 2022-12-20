class GameObject {
    constructor(config) {
        this.id = null;
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
        this.behaviorLoop = config.behaviorLoop || [];
        this.behaviorLoopIndex = 0;
    }

    mount(map) {
        if (this.toMount && !this.isMounted) {
            this.isMounted = true;
            map.addWall(this.x, this.y);

            setTimeout(() => {
                this.doBehaviorEvent(map);
            }, 10);
        }
    }

    async doBehaviorEvent(map) {

        if(map.isCutscenePlaying || this.behaviorLoop.length === 0) {
            return;
        }

        // Setting up the event
        let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
        eventConfig.who = this.id;

        // Create an event
        const evenHandler = new OverworldEvent({map, event: eventConfig});
        await evenHandler.init();

        // Setting the next event to fire
        this.behaviorLoopIndex += 1;
        if (this.behaviorLoopIndex === this.behaviorLoop.length) {
            this.behaviorLoopIndex = 0;
        }

        this.doBehaviorEvent(map);
        
    }

    update() {

    }
}