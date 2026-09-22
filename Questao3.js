// Importa o readline para receber informações do teclado
const readline = require("readline");

// Cria a comunicação entre o programa e o terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout // Mostra informações no terminal
});

// Função usada para fazer perguntas ao usuário
function perguntar(pergunta) {

    // Cria uma promessa para esperar a resposta
    return new Promise(resolve => {

        // Mostra a pergunta e espera o usuário responder
        rl.question(pergunta, resposta => {

            // Retorna a resposta digitada
            resolve(resposta);
        });
    });
}

// Função principal do programa
async function main() {

    // Lista que armazena todos os produtos
    const produtos = [

        // Cada objeto representa um produto
        { codigo: 1, nome: "Teclado", preco: 100, quantidade: 5 },
        { codigo: 2, nome: "Mouse", preco: 50, quantidade: 20 },
        { codigo: 3, nome: "Monitor", preco: 800, quantidade: 8 },
        { codigo: 4, nome: "Fone", preco: 150, quantidade: 15 },
        { codigo: 5, nome: "Webcam", preco: 250, quantidade: 3 }
    ];


    // Filtra somente os produtos com menos de 10 unidades
    const produtosEstoqueBaixo = produtos.filter(

        // Verifica a quantidade de cada produto
        produto => produto.quantidade < 10
    );

    // Mostra o título no terminal
    console.log("Produtos com menos de 10 unidades:");


    // Percorre os produtos que foram filtrados
    for (
        let i = 0; // Começa pelo primeiro produto
        i < produtosEstoqueBaixo.length; // Continua até o último
        i++ // Passa para o próximo produto
    ) {

        // Mostra as informações do produto
        console.log(
            "Código:", produtosEstoqueBaixo[i].codigo,
            "| Nome:", produtosEstoqueBaixo[i].nome,
            "| Preço:", produtosEstoqueBaixo[i].preco,
            "| Quantidade:", produtosEstoqueBaixo[i].quantidade
        );
    }


    // Cria uma nova lista somente com os nomes
    const nomesProdutos = produtos.map(

        // Pega o nome de cada produto
        produto => produto.nome
    );

    // Mostra a lista de nomes
    console.log("Nomes dos produtos:", nomesProdutos);


    // Cria uma lista com os preços após o desconto
    const precosComDesconto = produtos.map(

        // Multiplica o preço por 0.90 para retirar 10%
        produto => produto.preco * 0.90
    );

    // Mostra os preços com desconto
    console.log("Preços com 10% de desconto:", precosComDesconto);


    // Calcula o valor do estoque de cada produto
    const valorTotalPorProduto = produtos.map(

        // Preço multiplicado pela quantidade
        produto => produto.preco * produto.quantidade
    );

    // Mostra o valor de cada produto em estoque
    console.log("Valor de cada produto em estoque:", valorTotalPorProduto);


    // Soma o valor de todos os produtos do estoque
    const valorTotalEstoque = produtos.reduce(

        // Soma o valor de cada produto ao total
        (total, produto) =>
            total + produto.preco * produto.quantidade,

        // Começa a soma com zero
        0
    );

    // Mostra o valor total do estoque
    console.log("Valor total de todo o estoque:", valorTotalEstoque);


    // Verifica se existe pelo menos um produto com estoque zero
    const existeEstoqueZero = produtos.some(

        // Verifica se a quantidade é igual a zero
        produto => produto.quantidade === 0
    );

    // Verifica o resultado do some()
    if (existeEstoqueZero) {

        // Caso exista algum produto com estoque zero
        console.log("Existe produto com estoque zero.");

    } else {

        // Caso não exista nenhum
        console.log("Não existe produto com estoque zero.");
    }


    // Verifica se todos os produtos têm preço maior que zero
    const todosPrecosMaioresQueZero = produtos.every(

        // Testa o preço de cada produto
        produto => produto.preco > 0
    );

    // Verifica o resultado do every()
    if (todosPrecosMaioresQueZero) {

        // Caso todos tenham preço maior que zero
        console.log("Todos os produtos possuem preço maior que zero.");

    } else {

        // Caso algum produto não tenha
        console.log("Existe produto com preço igual ou menor que zero.");
    }


    // Pede ao usuário o código do produto que deseja procurar
    let codigoBuscado = Number(

        // Number transforma a resposta em número
        await perguntar(
            "\nDigite o código do produto (0 para sair): "
        )
    );


    // Continua permitindo pesquisas enquanto o código não for 0
    while (codigoBuscado !== 0) {

        // Procura um produto que tenha o código digitado
        const produtoEncontrado = produtos.find(

            // Compara o código do produto com o código informado
            produto => produto.codigo === codigoBuscado
        );


        // Verifica se o produto foi encontrado
        if (produtoEncontrado) {

            // Mostra as informações do produto encontrado
            console.log(
                "Código:", produtoEncontrado.codigo,
                "| Nome:", produtoEncontrado.nome,
                "| Preço:", produtoEncontrado.preco,
                "| Quantidade:", produtoEncontrado.quantidade
            );

        } else {

            // Aparece quando o código não existe
            console.log("Produto não encontrado.");
        }


        // Pergunta novamente qual produto o usuário deseja procurar
        codigoBuscado = Number(
            await perguntar("Digite outro código (0 para sair): ")
        );
    }


    // Fecha a comunicação com o terminal
    rl.close();
}

// Chama a função principal e inicia o programa
main();