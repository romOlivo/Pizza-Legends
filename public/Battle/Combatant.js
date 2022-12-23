class Combatant {
    constructor(config, battle) {
        Object.keys(config).forEach(key => {
            this[key] = config[key];
        })
        this.battle = battle;

    }

    createElement() {
        this.hudElement = document.createElement("div");
        this.hudElement.classList.add("Combatant");
        this.hudElement.setAttribute("dataCombatant", this.id);
        this.hudElement.setAttribute("dataTeam", this.team);
        this.hudElement.innerHTML = '' +
        '<p class="CombatantName">' + this.name + "</p>" +
        '<p class="CombatantLevel"> </p>' + 
        '<div class="CombatantCharacterCrop">' +
          '<img class="CombatantCharacter" alt="' + this.name + '" src="' + this.src + '" />' + 
        '</div>' + 
        '<img class="CombatantType" src="' + this.icon + '" alt="' + this.type + '" />' +
        '<svg viewBox="0 0 26 3" class="CombatantLifeContainer">' + 
          '<rect x=0 y=0 width="0%" height=1 fill="#82ff71" />' +
          '<rect x=0 y=1 width="0%" height=2 fill="#3ef126" />' +
        '</svg>' + 
        '<svg viewBox="0 0 26 2" class="CombatantXpContainer">' + 
          '<rect x=0 y=0 width="0%" height=1 fill="#ffd76a" />' +
          '<rect x=0 y=1 width="0%" height=1 fill="#ffc934" />' +
        '</svg>' + 
        '<p class="CombatantStatus"> </p>';
    }

    init() {

    }

}