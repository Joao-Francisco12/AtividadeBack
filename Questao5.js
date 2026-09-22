const readline = require("readline");
// Cria a interface de leitura para capturar o que o usuário digita
// e exibir mensagens no terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Função que transforma o rl.question em uma Promise,
// permitindo usar await para esperar a resposta do usuário
function perguntar(pergunta) {
    return new Promise(resolve => {
        rl.question(pergunta, resposta => {
            resolve(resposta);
        });
    });
}

// Classe que representa um livro do acervo,
// guardando código, título, autor, ano e situação (D/E)
class Livro {
    constructor(codigo, titulo, autor, anoPublicacao, situacao) {
        this.codigo = codigo;
        this.titulo = titulo;
        this.autor = autor;
        this.anoPublicacao = anoPublicacao;
        this.situacao = situacao;
    }
}

// Classe que gerencia todos os livros cadastrados,
// usando um Map para guardar código -> livro
class Biblioteca {
    constructor() {
        this.MapLivros = new Map();
    }

    // Cadastra um ou mais livros perguntados pelo usuário,
    // validando se o código digitado já existe
    async cadastrarLivros() {
        let quantidade = Number(await perguntar("Quantidade de Livros a cadastrar: "));

        for (let i = 1; i <= quantidade; i++) {
            console.log(`\n--- Dados do ${i}º Livro ---`);

            let codigoValido = false;
            let codigo;

            // Repete até o usuário digitar um código numérico e não duplicado
            while (!codigoValido) {
                try {
                    codigo = Number(await perguntar("Digite o Código: "));

                    // Verifica se o valor digitado é realmente um número
                    if (isNaN(codigo)) {
                        throw new Error("O código precisa ser um número válido!");
                    }

                    // Verifica se esse código já está sendo usado por outro livro
                    if (this.MapLivros.has(codigo)) {
                        throw new Error(`O código ${codigo} já está cadastrado em outro livro!`);
                    }

                    codigoValido = true;

                } catch (error) {
                    console.log(`[ERRO DE CADASTRO]: ${error.message}`);
                    console.log("Por favor, tente novamente com um código diferente.\n");
                }
            }

            // Coleta as demais informações do livro
            let titulo = await perguntar("Digite o Título do livro: ");
            let autor = await perguntar("Digite o Autor: ");
            let ano = Number(await perguntar("Digite o Ano: "));
            let situacao = await perguntar("Digite a situação D / E: ");

            // Cria o objeto Livro e guarda no Map usando o código como chave
            let livro = new Livro(codigo, titulo, autor, ano, situacao);
            this.MapLivros.set(codigo, livro);

            console.log(`Livro "${titulo}" cadastrado com sucesso!`);
        }
    }

    // Mostra na tela todas as informações de um livro
    exibirLivro(livro) {
        console.log("Codigo do Livro: ", livro.codigo);
        console.log("Titulo: ", livro.titulo);
        console.log("Autor: ", livro.autor);
        console.log("Ano de Publicação: ", livro.anoPublicacao);
        console.log("Disponibilidade: ", livro.situacao);
        console.log();
    }

    // Pergunta um código e mostra os dados do livro correspondente,
    // avisando o usuário se o código não existir
    async consultarLivro() {
        try {
            let codigo = Number(await perguntar("Digite o Codigo: "));

            if (isNaN(codigo)) {
                throw new Error("O código deve ser um número válido!");
            }

            if (!this.MapLivros.has(codigo)) {
                throw new Error(`Livro com o código ${codigo} é inexistente.`);
            }

            const livro = this.MapLivros.get(codigo);
            this.exibirLivro(livro);

        } catch (error) {
            console.log(`[ERRO DE CONSULTA]: ${error.message}`);
        }
    }

    // Verifica se um livro está disponível ("D") pelo código dele
    disponibilidade(codigo) {
        if (!this.MapLivros.has(codigo)) {
            console.log("Codigo errado ou Livro Inexistente.");
            return false;
        }
        return this.MapLivros.get(codigo).situacao === "D";
    }

    // Percorre o Map e exibe todos os livros cadastrados
    listarLivros() {
        this.MapLivros.forEach(livro => {
            this.exibirLivro(livro);
        });
    }

    // Percorre o Map e exibe apenas os livros disponíveis
    livrosDisponiveis() {
        this.MapLivros.forEach(livro => {
            if (this.disponibilidade(livro.codigo)) {
                this.exibirLivro(livro);
            }
        });
    }

    // Realiza o empréstimo de um livro, marcando a situação como "E"
    async emprestimo() {
        try {
            let codigo = Number(await perguntar("Digite o Codigo do livro: "));

            if (isNaN(codigo)) {
                throw new Error("O código deve ser um número válido!");
            }

            if (!this.MapLivros.has(codigo)) {
                throw new Error(`Livro com o código ${codigo} não foi encontrado.`);
            }

            const livro = this.MapLivros.get(codigo);

            // Não permite emprestar um livro que já está emprestado
            if (livro.situacao === "E") {
                throw new Error(`O livro "${livro.titulo}" já está emprestado no momento!`);
            }

            livro.situacao = "E";
            console.log(`Livro "${livro.titulo}" emprestado com sucesso!`);

        } catch (error) {
            console.log(`[ERRO DE EMPRÉSTIMO]: ${error.message}`);
        }
    }

    // Realiza a devolução de um livro, marcando a situação como "D"
    async devolucao() {
        try {
            let codigo = Number(await perguntar("Digite o Codigo do livro: "));

            if (isNaN(codigo)) {
                throw new Error("O código deve ser um número válido!");
            }

            if (!this.MapLivros.has(codigo)) {
                throw new Error(`Livro com o código ${codigo} não foi encontrado.`);
            }

            const livro = this.MapLivros.get(codigo);

            // Não permite devolver um livro que já está disponível
            if (livro.situacao === "D") {
                throw new Error(`O livro "${livro.titulo}" já está disponível na biblioteca!`);
            }

            livro.situacao = "D";
            console.log(`Livro "${livro.titulo}" devolvido com sucesso!`);

        } catch (error) {
            console.log(`[ERRO DE DEVOLUÇÃO]: ${error.message}`);
        }
    }

    // Remove um livro do acervo pelo código
    async removerLivro() {
        try {
            let codigo = Number(await perguntar("Digite o Codigo do livro: "));

            if (isNaN(codigo)) {
                throw new Error("O código deve ser um número válido!");
            }

            if (!this.MapLivros.has(codigo)) {
                throw new Error(`Não foi possível remover: O livro com código ${codigo} é inexistente.`);
            }

            const livro = this.MapLivros.get(codigo);
            this.MapLivros.delete(codigo);

            console.log(`Livro "${livro.titulo}" foi removido do acervo com sucesso!`);

        } catch (error) {
            console.log(`[ERRO DE REMOÇÃO]: ${error.message}`);
        }
    }
}

// Instância única da biblioteca, usada em todo o programa
const biblioteca = new Biblioteca();

// Pausa a execução até o usuário apertar ENTER
async function pausar() {
    await perguntar("\nPressione ENTER para continuar...");
}

// Exibe o menu principal e trata a opção escolhida pelo usuário
async function menu() {
    let executando = true;
    console.log("---- Bem vindo a Biblioteca ----");

    // Fica em loop até o usuário escolher a opção de sair (0)
    while (executando) {

        console.log("---------  Menu Principal ---------");
        console.log(" 0 - Sair do Menu.                 ");
        console.log(" 1 - Cadastrar livro pelo código.    ");
        console.log(" 2 - Consultar livro pelo código.  ");
        console.log(" 3 - Listar todos os livros.");
        console.log(" 4 - Listar somente os livros disponíveis. ");
        console.log(" 5 - Realizar empréstimo de um livro. ");
        console.log(" 6 - Realizar devolução de um livro. ");
        console.log(" 7 - Remover um livro do acervo. ");

        const opcao = Number(await perguntar("Opção: "));

        // Direciona para a função correspondente à opção escolhida
        switch (opcao) {
            case 1:
                await biblioteca.cadastrarLivros();
                await pausar();
                break;
            case 2:
                await biblioteca.consultarLivro();
                await pausar();
                break;
            case 3:
                biblioteca.listarLivros();
                await pausar();
                break;
            case 4:
                biblioteca.livrosDisponiveis();
                await pausar();
                break;
            case 5:
                await biblioteca.emprestimo();
                await pausar();
                break;
            case 6:
                await biblioteca.devolucao();
                await pausar();
                break;
            case 7:
                await biblioteca.removerLivro();
                await pausar();
                break;
            case 0:
                executando = false;
                break;
            default:
                console.log("Valor fora dos limites!");
                await pausar();
        }
    }
}

// Função principal: inicia o menu e fecha o terminal ao final
async function main() {
    await menu();
    rl.close();
}

main();