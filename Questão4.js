// Classe principal dos funcionários
class Funcionario {

  // Construtor que recebe os dados do funcionário
  constructor(nome, salario, cargo) {
    this.nome = nome;
    this.salario = salario;
    this.cargo = cargo;
  }

  // Mostra os dados do funcionário
  exibirDados() {
    console.log(`Nome: ${this.nome}`);
    console.log(`Cargo: ${this.cargo}`);
    console.log(`Salário: R$ ${this.salario.toFixed(2)}`);
  }

  // Calcula o bônus do funcionário comum
  calcularBonus() {
    return this.salario * 0.67;
  }

  // Soma o salário com o bônus
  calcularSalarioFinal() {
    return this.salario + this.calcularBonus();
  }
}


// Professor herda as características de Funcionario
class Professor extends Funcionario {

  // Define o cargo como Professor
  constructor(nome, salario) {
    super(nome, salario, "Professor");
  }

  // Sobrescreve o bônus para o professor
  calcularBonus() {
    return this.salario * 0.69;
  }
}


// Programador também herda de Funcionario
class Programador extends Funcionario {

  // Define o cargo como Programador
  constructor(nome, salario) {
    super(nome, salario, "Programador");
  }

  // Sobrescreve o bônus para o programador
  calcularBonus() {
    return this.salario * 0.13;
  }
}


// Cria um objeto Professor
const professor1 = new Professor("Rebeka", 67000);

// Cria um objeto Programador
const programador1 = new Programador("Vinicius", 69000);

// Cria um funcionário comum
const funcionario1 = new Funcionario("Rodolfo", 67000, "Gerente");


// Junta todos os funcionários em uma lista
const funcionarios = [professor1, programador1, funcionario1];


// Percorre todos os funcionários da lista
funcionarios.forEach((func) => {

  // Mostra um separador
  console.log("-");

  // Exibe os dados do funcionário
  func.exibirDados();

  // Mostra o bônus calculado
  console.log(`Bônus: R$ ${func.calcularBonus().toFixed(2)}`);

  // Mostra o salário final
  console.log(`Salário Final: R$ ${func.calcularSalarioFinal().toFixed(2)}`);
});