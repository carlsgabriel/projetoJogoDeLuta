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

stage.start();