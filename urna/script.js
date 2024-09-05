let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
//comandos pora votante
let aviso = document.querySelector('.d-2');
//imagens
let lateral = document.querySelector('.d-1-right');
//quadrados onde entram numeros
let numeros = document.querySelector('.d-1-3');

//etapa vereador
let etapaAtual = 0;
//espaço n piscando e armazena e concatena numero total
let numero = '';
let votoBranco = false;
let votos = [];

function comecarEtapa() {
    //PEGAR INFO DA ETAPAATUAL
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    //insercao de n numeros em numerosHtml
    for(let i=0;i<etapa.numeros;i++) {
        //se for o primeiro quadrado...
        if(i === 0) {
            numeroHtml += '<div class="numero pisca"></div>';
        } else {
            numeroHtml += '<div class="numero"></div>';
        }
    }

    //PREENCHER e
    cargo.innerHTML = etapa.titulo;
    //LIMPAR TELA
    seuVotoPara.style.display = 'none';
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    //div numeros html recebe x numerosJson
    numeros.innerHTML = numeroHtml;
}

//atualiza posicao de numero e qual candidato digitado
function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    //retorna true se houver candidato com numero digitado
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });

    //filter retorna -1 se nao achar candidato
    //se achou candidato...
    if(candidato.length > 0) {
        //candidato = candidato que achou
        candidato = candidato[0];
        //preenchimento dos dados do candidato específico
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;

        //prefeito e vice...
        let fotosHtml = '';
        //insercao de votos
        for(let i in candidato.fotos) {
            if(candidato.fotos[i].small) {
                fotosHtml += `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
            }
            //imagens voto nulo ou em branco 
            else {
                fotosHtml += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
            }
        }
        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
    }
}

//preenchimento dos espaços de numero
function clicou(n) {
    //numero piscando
    let elNumero = document.querySelector('.numero.pisca');
    //se numero está preenchido
    if(elNumero !== null) {
        //numeroHtml preenchido pelo n clicado
        elNumero.innerHTML = n;
        //let numero soma ao que já era com n cliclado
        numero = `${numero}${n}`;

        //numero para de piscar
        elNumero.classList.remove('pisca');
        //se tiver outro espaço igual depois...
        if(elNumero.nextElementSibling !== null) {
            //comece a piscar
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            //se nao houver, atualize(mostra candidato)
            atualizaInterface();
        }
    }
}
function branco() {
    numero = '';
    votoBranco = true;

    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    lateral.innerHTML = '';
}
function corrige() {
    comecarEtapa();
}
function confirma() {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if(votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if(numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
            console.log(votos);
        }
    }
}

comecarEtapa();