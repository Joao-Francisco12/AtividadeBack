const alunos = []; //Array para guardar dados dos Alunos 

const readline = require("readline"); //Importa o readline que permite a entrada de dados pelo terminal 

const rl = readline.createInterface({ //Crie uma forma para meu programa conversar com o terminal
    input: process.stdin,
    output: process.stdout
});

//Função responsável por fazer perguntas e receber respostas do usuário
function perguntar(pergunta) {
    return new Promise(resolve => { //Cria uma Promise ("Vou te dar uma resposta depois.") para esperar a resposta do usuário
        rl.question(pergunta, resposta => { //Mostra a pergunta e recebe a resposta digitada pelo usuário
            resolve(resposta);
        });
    });
}

//Função para fazer as perguntas ao usuario 
async function cadastrarAluno() {

    const nome = await perguntar("Digite o nome do aluno: ");
    const idade = Number(await perguntar("Digite a idade: "));
    const curso = await perguntar("Digite o curso: ");
    const nota1 = Number(await perguntar("Digite a primeira nota: "));
    const nota2 = Number(await perguntar("Digite a segunda nota: "));
    const nota3 = Number(await perguntar("Digite a terceira nota: "));

    //Cria um objeto com todos os dados do aluno
    const Aluno = {
        nome,
        idade,
        curso,
        nota1,
        nota2,
        nota3
    };

    //Adiciona o aluno cadastrado ao array de alunos
    alunos.push(Aluno);
}

//Função para calcular a media dos alunos 
function media(nota1, nota2, nota3){

    const soma = nota1 + nota2 + nota3; //Soma as notas 
    const resultado = soma/3; //Divide por 3
    
    return resultado; 
}

//Variáveis utilizadas para contar quantos alunos estão em cada situação
let quantAprovados = 0;
let quantReprovados = 0;
let quantRecuperacao = 0;


//Função que mostra a situação dos alunos
function situacao(Aluno) {

    //Puxa a função media para calcular a media do aluno em questão 
    const resultado = media (
        Aluno.nota1,
        Aluno.nota2,
        Aluno.nota3
    )

    if(resultado >= 7){ //Se tiver nota media maior que 7, printa "Aluno Aprovado! "
        console.log("Aluno Aprovado! ");
        quantAprovados ++ //Adiciona mais um na quantAprovados
    }

    else if(resultado >= 5){ //Se tiver nota media maior ou igual a 5, printa "Aluno em Recuperação! "
        console.log("Aluno em Recuperação! ");
        quantRecuperacao++ //Adiciona mais um na quantRecuperacao
    }
        
    else{ //Se tiver nota media menor que 5, printa "Aluno Reprovado! "
        console.log("Aluno Reprovado! ");
        quantReprovados ++ //Adiciona mais um na quantReprovados
    }   
}

//Função exibir para exibir dados dos usuarios na tela 
function exibirNaTela(){

    console.log("------ Lista de Alunos ----------")

    //Percorre cada aluno que está armazenado no array
    alunos.forEach(aluno => { 

        //Puxa a função media para calcular a media do aluno em questão 
        const resultado = media(
            aluno.nota1,
            aluno.nota2,
            aluno.nota3
        )

        //Printa os Dados dos alunos 
        console.log("Nome: ", aluno.nome);
        console.log("Idade: ", aluno.idade);
        console.log("Curso: ", aluno.curso);
        console.log("Notas: ", aluno.nota1);
        console.log("Notas: ", aluno.nota2);
        console.log("Notas: ", aluno.nota3)
        console.log("Media: ", resultado);

        situacao(aluno); //Chama a função que verifica a situação do aluno
        console.log("----------------");
    });

    //Printa a quantidade de alunos em cada situação
    console.log("\n------ Quantidade ------");
    console.log("Aprovados:", quantAprovados);
    console.log("Recuperação:", quantRecuperacao);
    console.log("Reprovados:", quantReprovados);
}


//Função iniciar
async function iniciar() {

    const quantidade = Number( //Pergunta a quantidade de alunos
        await perguntar("Quantos alunos deseja cadastrar? ")
    );

    for (let i = 0; i < quantidade; i++) { //Repete as perguntas a quantidade de vezes de alunos que tem
        console.log(`\n--- Cadastro do aluno ${i + 1} ---`);  //Mostra na tela qual aluno está sendo cadastrado
        await cadastrarAluno(); //Chama a função cadastrarAluno
    }

    exibirNaTela(); //Puxa a função exibir na tela

    rl.close(); //Fecha a função dps de tudo está concluido
}

iniciar(); //Puxa a função iniciar