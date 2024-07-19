/*
A classe pai dos personagens.
Todos os personagens vão herdar as propriedades e métodos desta classe. 
*/
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

    //O personagem não poderá ter uma vida menor que 0
    set life(newLife) {
        if (newLife < 0) {
            this._life = 0
        } else {
            this._life = newLife;
        }
    }
}

//Primeiro personagem
class Player1 extends Player {
    constructor(name) {
        super(name);
        this._life = 100;
        this.maxLife = this._life;
        this.attack = 10;
        this.defense = 8;
    }
}

//Segundo personagem
class Player2 extends Player {
    constructor(name) {
        super(name);
        this._life = 100;
        this.maxLife = this._life;
        this.attack = 8;
        this.defense = 10;
    }
}

/*
Stage é a classe responsável por fazer o jogo acontecer.
E pra que isso aconteça você deve passar 5 parâmetros:
1. O player1
2. O player2
3. O elemento do player1. É necessário o elemento do player1 para que possamos manipular o player1, sem isso a manipulação não acontece.
4. O elemento do player2. É necessário o elemento do player2 para que possamos manipular o player2, sem isso a manipulação não acontece.
5. O log.

É meio que: Pro jogo começar você tem que ter 1 player de cada lado, seus respectivos elementos prontos para serem manipulados e o log.
*/
class Stage {
    constructor(p1, p2, p1El, p2El, logObj) {
        this.p1 = p1;
        this.p2 = p2;
        this.p1El = p1El;
        this.p2El = p2El;
        this.logObj = logObj;
    }

    /*
    Método que vai fazer com que o jogo inicie.
    1. Chamará a função update(), função essa que tem como objetivo atualizar o game, atualizando o nome do player, sua barra de vida, seu hp, suas caracteristicas visuais e etc.
    Faz isso para que o jogo já começe com as informações corretas.

    2. Adiciona um evento de click no botão de atacar e define o seguinte:
    Se Math.random() gerar um número de 0 até 0.5 então o player1 será o atacante, caso contrário, o player2.
    O defensor será o inverso do atacante.
    Chame a classe que realizará o ataque passando o atacante e o defensor.
    */
    start() {
        this.update();

        document.querySelector('.attackButton').addEventListener('click', () => {
            let attacker = Math.random() <= 0.5 ? this.p1 : this.p2;
            let defenser = attacker === this.p1 ? this.p2 : this.p1;

            this.doAttack(attacker, defenser)
        })

    }


    /*
    Função necessária para atualizar as informações do jogo naquele momento.
    1. Adicionará o nome inserido no personagem no topo, com a respectiva cor.
    
    2. Atualizará o nome do player.
    3. Fará o calculo de porcentagem da vida baseado na vida atual e vida maxima do player.
    4. Mostrará o nome do player, com base no que vão inserir além de tambem mostrar seu hp, graças ao calculo feito no 2.

    5. Se a vida do personagem chegar a 0, então:
    Suma com a área de batalha
    Suma com o log
    Apresente a página do vencedor
    Bote a imagem do personagem que está vivo, pois ele foi o ganhador
    Adicione a borda nessa imagem com base na respectiva cor do time
    E mostre uma legenda falando quem foi o ganhador.

    Tudo isso vai ser feito para os 2 players.
    */
    update() {
        document.querySelector('.first').innerHTML = `${this.p1.name}`;
        document.querySelector('.first').style.color = 'red';
        document.querySelector('.second').innerHTML = `${this.p2.name}`;
        document.querySelector('.second').style.color = 'blue';

        this.p1El.querySelector('.name').innerHTML = `${this.p1.name} - ${this.p1.life.toFixed(1)}HP`;
        let hpPercent = (this.p1.life / this.p1.maxLife) * 100;
        this.p1El.querySelector('.lifeBar-bar').style.width = `${hpPercent}%`;


        this.p2El.querySelector('.name').innerHTML = `${this.p2.name} - ${this.p2.life.toFixed(1)}HP`;
        let hpPercent2 = (this.p2.life / this.p2.maxLife) * 100;
        this.p2El.querySelector('.lifeBar-bar').style.width = `${hpPercent2}%`;

        if (this.p1.life == 0) {
            document.querySelector('.battleCamp').style.display = 'none';
            document.querySelector('.log').style.display = 'none';
            document.querySelector('.winner').style.display = 'flex';
            document.querySelector('.img').setAttribute('src', 'assets/imgs/pitbull.jpg');
            document.querySelector('.winner img').style.border = '5px solid blue';
            document.querySelector('.winner h1').innerHTML = `${this.p2.name} foi o vencedor!`;
        } else if (this.p2.life == 0) {
            document.querySelector('.battleCamp').style.display = 'none';
            document.querySelector('.log').style.display = 'none';
            document.querySelector('.winner').style.display = 'flex';
            document.querySelector('.img').setAttribute('src', 'assets/imgs/pinscher.jpg');
            document.querySelector('.winner img').style.border = '5px solid red';
            document.querySelector('.winner h1').innerHTML = `${this.p1.name} foi o vencedor!`;
        }
    }

    /*
    Função responsável por realizar os ataques. Essa função terá dois parametros, o atacante e o defensor.
    1. Se o hp do atacante ou do defensor for 0, então:
    Mande pro console uma mensagem que não tem como prosseguir e não permita que mais ataques acontecam, com o return.
    
    2. O fator de ataque será o seguinte: Um número de 0 a 1 * 2. Ou seja, tanto faz diminuir o ataque real como tambem pode aumentar.
    3. Ataque atual vai ser o ataque do atacante * o fator de ataque.
    4. O fator de defesa será o seguinte: Um número de 0 a 1 * 2. Ou seja, tanto faz diminuir a defesa real como tambem pode aumentar.
    5. Defesa atual vai ser a defesa do defensor * o fator de defesa.
    
    6.Se o ataque atual for maior que a defesa atual:
    O defensor vai levar o dano
    E uma mensagem será enviada ao log falando sobre isso.
      Se não for:
    o defensor defende o dano.
    E uma mensagem será enviada ao log falando sobre isso.

    7. Após tudo isso, atualize as informações do jogo.
    */
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


/*
Classe responsável pelo log da batalha.
1. O array List é para onde serão enviadas as mensagens.

2. A classe tem um método constructor que exige o elemento do log para que a manipulação seja realizada.

3. O método addMessage() recebe um parâmetro, que é a mensagem, e adiciona ela ao topo do array(.unshift).
   Depois chama o método explainMessages() para que as mensagens sejam exibidas.

4. Este método fará o seguinte:
   Limpe o log
   Percorra o log mostrando cada um dos elementos da lista, passando eles para um <li> e com isso fazendo com que a exibição aconteça.

*/
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