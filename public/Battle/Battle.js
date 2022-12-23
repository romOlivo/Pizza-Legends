class Battle {
    constructor() {
        this.baseUrl = "/images/characters/people/";
        this.heroImage = "hero.png";
        this.enemyImage = "npc3.png";

        this.combatants = {
            "player1": new Combatant({
                ...Pizzas.s001,
                team: "player",
                hp: 50,
                maxHp: 50,
                xp: 0,
                level: 1,
                status: null,
            }, this),
            "enemy1": new Combatant({
                ...Pizzas.v001,
                team: "enemy",
                hp: 60,
                maxHp: 80,
                xp: 0,
                level: 2,
                status: null,
            }, this),
            "enemy2": new Combatant({
                ...Pizzas.f001,
                team: "enemy",
                hp: 50,
                maxHp: 50,
                xp: 0,
                level: 1,
                status: null,
            }, this),
        }
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("Battle");
        this.element.innerHTML = '' +
        '<div class="BattleHero">' +
          '<img src="' + this.baseUrl + this.heroImage + '" alt="Hero" />' +
        '</div>' + 
        '<div class="BattleEnemy">' +
          '<img src="' + this.baseUrl + this.enemyImage + '" alt="Enemy" />' +
        '</div>'; 

    }

    init(container) {
        this.createElement();
        container.appendChild(this.element);
    }

}