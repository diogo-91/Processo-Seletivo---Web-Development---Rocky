// Leitura do .json (banco de dados corrompido)
var bancoCorrompido = require('./broken-database.json')
var bancoCorrigido = new Array() 
 
// Laço for para percorrer cada elemento do array
bancoCorrompido.forEach(element => {
    //Exercício 01 Nomes
    // Correção dos caracteres corrompidos (substituição)
    var nomeCorrigido = element.name.replace(/æ/g, "a").replace(/¢/g, "c").replace(/ø/g, "o").replace(/ß/g, "b")

    //Exercício 02 Preços
    // Conversão Preço: String para Number de modo direto 
    var precoCorrigido = Number(element.price);

    //Exercício 03 Quantidades
    // Volta o valor 0 onde o estoque estiver vazio
    var quantidadeCorrigida 
    if (element.quantity == null) {
        quantidadeCorrigida = 0
    }
    else {
        quantidadeCorrigida = element.quantity
    }
    
    // Criação de novo elemento com a variavel preço do tipo numerico
    var elemento = new Object();
        elemento.id = element.id
        elemento.name = nomeCorrigido
        elemento.quantity = quantidadeCorrigida
        elemento.price = precoCorrigido
        elemento.category = element.category

   // Push adicionar o elemento no array do banco corrigido (novo)
    bancoCorrigido.push(elemento)
});
// Conversão de array para json Pretty-printing (melhorar a aparência)  
//stringfy = Transforma o array em uma string do tipo .json
const bancoCorrigidoJsonArray = JSON.stringify(bancoCorrigido, null, 4)
//fs = File save para salvar o arquivo na pasta e criar um novo banco de dados
const fs = require('fs')
fs.writeFileSync('saida.json', bancoCorrigidoJsonArray)

var banco = require('./saida.json') //le o arquivo saida.json e  joga na variavel banco
banco.sort(CompareId).sort(CompareCategoria) // sort = ordenar (id, categoria)
//Comparar e ordenar por id e Categoria Exercicio 02. A
// Conversão de array para json Pretty-printing (melhorar a aparência)  stringfy = Transforma o array em uma string do tipo .json
const bancoJsonArray = JSON.stringify(banco, null, 2); 
console.log(bancoJsonArray)

//função utilizada para ordenação de categoria e id.
function CompareCategoria( a, b ) {
  //https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
  if ( a.category < b.category ){
    return -1;
  }
  if ( a.category > b.category ){
    return 1;
  }
  return 0;
}

function CompareId( a, b ) {
  //https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
  if ( a.id < b.id ){    
    return -1;
  }
  if ( a.id > b.id ){    
    return 1;
  }
  return 0;
}


//Retorna a lista de categoria distinta(um de cada) - https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript
const categoriasDistintas = [...new Set(banco.map(item => item.category))];

categoriasDistintas.forEach(categoria => {
  //https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d
  const totalCategoria = banco
  // Filtra
  .filter(item => item.category === categoria)
  //Map = Retorna quantidade
  .map(item => item.quantity)
  //Reduce Soma de maneira acumulativa - uma em cima da outra.
  .reduce((acumulado, quantidade) => acumulado + quantidade, 0);
    
  console.log("Categoria: " + categoria + " - Total: " + totalCategoria)

});