class Player {
    _life = 1;
    maxLife = 1;
    attack = 1;
    defense = 1;

    constructor(name) {
        this.name = name;
    }

    get life() {
        return this._life;
    }

    set life(newLife) {
        if (newLife < 0) {
            this._life = 0
        } else {
            this._life = newLife;
        }
    }
}

class Player1 extends Player {
    constructor(name) {
        super(name);
        this._life = 100;
        this.maxLife = this._life;
        this.attack = 10;
        this.defense = 8;
    }
}

class Player2 extends Player {
    constructor(name) {
        super(name);
        this._life = 100;
        this.maxLife = this._life;
        this.attack = 8;
        this.defense = 10;
    }
}

class Stage {
    constructor(p1, p2, p1El, p2El, logObj) {
        this.p1 = p1;
        this.p2 = p2;
        this.p1El = p1El;
        this.p2El = p2El;
        this.logObj = logObj;
    }

    start() {
        this.update();

        this.p1El.querySelector('.attackButton').addEventListener('click', () => {
            this.doAttack(this.p1, this.p2);
        })
        this.p2El.querySelector('.attackButton').addEventListener('click', () => {
            this.doAttack(this.p2, this.p1);
        })
    }

    update() {
        this.p1El.querySelector('.name').innerHTML = `${this.p1.name} - ${this.p1.life.toFixed(1)}HP`;
        let hpPercent = (this.p1.life / this.p1.maxLife) * 100;
        this.p1El.querySelector('.lifeBar-bar').style.width = `${hpPercent}%`;


        this.p2El.querySelector('.name').innerHTML = `${this.p2.name} - ${this.p2.life.toFixed(1)}HP`;
        let hpPercent2 = (this.p2.life / this.p2.maxLife) * 100;
        this.p2El.querySelector('.lifeBar-bar').style.width = `${hpPercent2}%`;
    }

    doAttack(ata, def) {

        if (ata.life <= 0 || def.life <= 0) {
            this.logObj.addMessage('Chutando cachorro morto.');
            return;
        }

        let attackFactor = (Math.random() * 2).toFixed(2);
        let actualAttack = ata.attack * attackFactor;

        let defenseFactor = (Math.random() * 2).toFixed(2);
        let actualDefense = def.defense * defenseFactor;

        if (actualAttack > actualDefense) {
            def.life -= actualAttack;
            this.logObj.addMessage(`${ata.name} atacou e tirou ${actualAttack.toFixed(2)} de dano.`);
        } else {
            this.logObj.addMessage(`${def.name} defendeu...`);
        }

        this.update();
    }

}

class Log {
    List = []

    constructor(listEl) {
        this.listEl = listEl;
    }

    addMessage(msg) {
        this.List.unshift(msg);
        this.explainMessages();
    }

    explainMessages() {
        this.listEl.innerHTML = '';

        for (let i in this.List) {
            this.listEl.innerHTML += `<li>${this.List[i]}</li>`
        }

    }
}