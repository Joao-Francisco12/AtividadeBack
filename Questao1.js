const alunos = [];

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function perguntar(pergunta) {
    return new Promise(resolve => {
        rl.question(pergunta, resposta => {
            resolve(resposta);
        });
    });
}

async function cadastrarAluno() {

    const nome = await perguntar("Digite o nome do aluno: ");
    const idade = Number(await perguntar("Digite a idade: "));
    const curso = await perguntar("Digite o curso: ");
    const nota1 = Number(await perguntar("Digite a primeira nota: "));
    const nota2 = Number(await perguntar("Digite a segunda nota: "));
    const nota3 = Number(await perguntar("Digite a terceira nota: "));

    const Aluno = {
        nome,
        idade,
        curso,
        nota1,
        nota2,
        nota3
    };

    alunos.push(Aluno);
}

function media(nota1, nota2, nota3){

    const soma = nota1 + nota2 + nota3;
    const resultado = soma/3;
    
    return resultado;
}

let quantAprovados = 0;
let quantReprovados = 0;
let quantRecuperacao = 0;

function situacao(Aluno) {

    const resultado = media (
        Aluno.nota1,
        Aluno.nota2,
        Aluno.nota3
    )

    if(resultado >= 7){
        console.log("Aluno Aprovado! ");
        quantAprovados ++
    }

    else if(resultado >= 5){
        console.log("Aluno em Recuperação!");
        quantRecuperacao++;
    }
        
    else{
        console.log("Aluno Reprovado! ");
        quantReprovados ++
    }   
}

function exibirNaTela(){

    console.log("------ Lista de Alunos ----------")

    alunos.forEach(aluno => {

        const resultado = media(
            aluno.nota1,
            aluno.nota2,
            aluno.nota3
        )

        console.log("Nome: ", aluno.nome);
        console.log("Idade: ", aluno.idade);
        console.log("Curso: ", aluno.curso);
        console.log("Notas: ", aluno.nota1);
        console.log("Notas: ", aluno.nota2);
        console.log("Notas: ", aluno.nota3)
        console.log("Media: ", resultado);

        situacao(aluno);
        console.log("----------------");
    });

    console.log("\n------ Quantidade ------");
    console.log("Aprovados:", quantAprovados);
    console.log("Recuperação:", quantRecuperacao);
    console.log("Reprovados:", quantReprovados);
}

async function iniciar() {

    const quantidade = Number(
        await perguntar("Quantos alunos deseja cadastrar? ")
    );

    for (let i = 0; i < quantidade; i++) {
        console.log(`\n--- Cadastro do aluno ${i + 1} ---`);
        await cadastrarAluno();
    }

    exibirNaTela();

    rl.close();
}

iniciar();