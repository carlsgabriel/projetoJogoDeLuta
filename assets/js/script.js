/*
1. Criando uma instancia da classe Log.
2. Criando uma instancia do Player1.
3. Criando uma instancia do Player2.
4. Criando uma instancia de Stage e passando os parâmetros necessários para que o jogo funcionasse.
*/
let log = new Log(document.querySelector('.log'));
let jogador1 = new Player1('TIÃO');
let jogador2 = new Player2('TOTÓ');

const stage = new Stage(
    jogador1,
    jogador2,
    document.querySelector('#character1'),
    document.querySelector('#character2'),
    log
);

//Inicializando o jogo.
stage.start();


//Tenho planos de futuramente deixar que o usuário selecione o nome dos players.