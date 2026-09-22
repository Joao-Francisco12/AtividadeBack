const readline = require('readline');

// Cria um Map para armazenar os produtos usando o código como chave
const produto = new Map();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Função responsável por fazer perguntas e receber respostas do usuário
function perguntar(pergunta) {
    return new Promise((resolve) => {
        rl.question(pergunta, (resposta) => {
            resolve(resposta);
        });
    });
}

// Função responsável por cadastrar um novo produto no Map
async function cadastrarProduto() {

    const codigo = Number(
        await perguntar("Digite o código do produto: ")
    );

    // Verifica se já existe um produto com esse código
    if (produto.has(codigo)) {
        console.log("Produto já cadastrado!");
        return;
    }

    const nome = await perguntar("Digite o nome do produto: ");

    const preco = Number(
        await perguntar("Digite o preço do produto: ")
    );

    // Verifica se o preço é menor ou igual a zero
    if (preco <= 0) {
        console.log("O preço deve ser maior que zero!");
        return;
    }

    const quant = Number(
        await perguntar("Digite a quantidade do produto: ")
    );

    // Verifica se a quantidade é negativa
    if (quant < 0) {
        console.log("A quantidade não pode ser negativa!");
        return;
    }

    // Cria um objeto com os dados do produto
    const produtos = {
        codigo,
        nome,
        preco,
        quant
    };

    // Adiciona o produto ao Map usando o código como chave
    produto.set(codigo, produtos);

    console.log("Produto cadastrado com sucesso!");
}

// Função responsável por buscar um produto pelo código
async function consultarProduto() {

    const codigo = Number(
        await perguntar("Digite o código do produto: ")
    );

    // Procura o produto no Map pelo código informado
    const produtoEncontrado = produto.get(codigo);

    // Verifica se o produto foi encontrado
    if (produtoEncontrado) {

        console.log("\n--- Produto encontrado ---");
        console.log("Código:", produtoEncontrado.codigo);
        console.log("Nome:", produtoEncontrado.nome);
        console.log("Preço:", produtoEncontrado.preco);
        console.log("Quantidade:", produtoEncontrado.quant);

    } else {
        console.log("Produto não encontrado!");
    }
}

// Função responsável por alterar a quantidade em estoque
async function alterarQuantidade() {

    const codigo = Number(
        await perguntar("Digite o código do produto que deseja alterar: ")
    );

    // Procura o produto pelo código informado
    const produtoEncontrado = produto.get(codigo);

    // Verifica se o produto existe
    if (!produtoEncontrado) {
        console.log("Produto não encontrado!");
        return;
    }

    const novaQuantidade = Number(
        await perguntar("Digite a nova quantidade do produto: ")
    );

    // Verifica se a nova quantidade é negativa
    if (novaQuantidade < 0) {
        console.log("A quantidade não pode ser negativa!");
        return;
    }

    // Altera a quantidade do produto
    produtoEncontrado.quant = novaQuantidade;

    // Atualiza o produto dentro do Map
    produto.set(codigo, produtoEncontrado);

    console.log("Quantidade alterada com sucesso!");
}

// Função responsável por alterar o preço de um produto
async function alterarPreco() {

    const codigo = Number(
        await perguntar("Digite o código do produto: ")
    );

    // Procura o produto pelo código informado
    const produtoEncontrado = produto.get(codigo);

    // Verifica se o produto existe
    if (!produtoEncontrado) {
        console.log("Produto não encontrado!");
        return;
    }

    const novoPreco = Number(
        await perguntar("Digite o novo preço: ")
    );

    // Verifica se o novo preço é menor ou igual a zero
    if (novoPreco <= 0) {
        console.log("O preço deve ser maior que zero!");
        return;
    }

    // Altera o preço do produto
    produtoEncontrado.preco = novoPreco;

    // Atualiza o produto dentro do Map
    produto.set(codigo, produtoEncontrado);

    console.log("Preço alterado com sucesso!");
}

// Função responsável por remover um produto do Map
async function excluirProduto() {

    const codigo = Number(
        await perguntar("Digite o código do produto que deseja excluir: ")
    );

    // Verifica se o produto existe antes de excluir
    if (produto.has(codigo)) {

        // Remove o produto do Map
        produto.delete(codigo);

        console.log("Produto excluído com sucesso!");

    } else {
        console.log("Produto não encontrado!");
    }
}

// Função responsável por verificar se um produto está cadastrado
async function verificarProduto() {

    const codigo = Number(
        await perguntar("Digite o código do produto que deseja verificar: ")
    );

    // Verifica se existe um produto com esse código
    if (produto.has(codigo)) {
        console.log("Produto encontrado!");
    } else {
        console.log("Produto não encontrado!");
    }
}

// Função responsável por exibir todos os produtos cadastrados
async function listarProdutos() {

    // Verifica se o Map está vazio
    if (produto.size === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    console.log("\n--- Lista de produtos ---");

    // Percorre todos os produtos armazenados no Map
    for (const [codigo, dados] of produto.entries()) {

        console.log(
            `Código: ${codigo}, Nome: ${dados.nome}, Preço: ${dados.preco}, Quantidade: ${dados.quant}`
        );
    }
}

// Função responsável por controlar as opções do sistema
async function iniciar() {

    let opcao;

    // Mantém o menu funcionando até o usuário escolher sair
    do {

        console.log("\n===== SISTEMA DE PRODUTOS =====");
        console.log("1 - Cadastrar produto");
        console.log("2 - Consultar produto");
        console.log("3 - Alterar quantidade");
        console.log("4 - Alterar preço");
        console.log("5 - Remover produto");
        console.log("6 - Verificar produto");
        console.log("7 - Exibir todos os produtos");
        console.log("0 - Sair");

        // Recebe a opção escolhida pelo usuário
        opcao = await perguntar("Escolha uma opção: ");

        // Verifica qual função deve ser executada
        switch (opcao) {

            case "1":
                await cadastrarProduto();
                break;

            case "2":
                await consultarProduto();
                break;

            case "3":
                await alterarQuantidade();
                break;

            case "4":
                await alterarPreco();
                break;

            case "5":
                await excluirProduto();
                break;

            case "6":
                await verificarProduto();
                break;

            case "7":
                await listarProdutos();
                break;

            case "0":
                console.log("Programa encerrado.");
                break;

            default:
                console.log("Opção inválida!");
        }

    } while (opcao !== "0");

    // Fecha a entrada de dados do terminal
    rl.close();
}

// Inicia o programa
iniciar();