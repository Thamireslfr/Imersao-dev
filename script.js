const cardContainer = document.querySelector(".card-container");
const campoBusca = document.querySelector("#campo-busca");
let dados = [];

// Função que carrega os dados do JSON e exibe todos os cards na tela
async function carregarEExibirDados() {
    try {
        const resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarCards(dados);
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
        cardContainer.innerHTML = "<p>Não foi possível carregar os dados.</p>";
    }
}

// Função chamada pelo botão "Buscar"
function iniciarBusca() {
    const termoBusca = campoBusca.value.toLowerCase();
    const resultados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descrição.toLowerCase().includes(termoBusca)
    );
    renderizarCards(resultados);
}

function renderizarCards(dadosParaRenderizar) {
    // Limpa o container antes de adicionar os novos cards
    cardContainer.innerHTML = '';

    for (let dado of dadosParaRenderizar) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p>${dado.data_criacao}</p>
            <p>${dado.descricao}</p>
            <a href="${dado.link}" target="_blank">Saiba mais</a>

        `;
        cardContainer.appendChild(article);
    }
}

// Carrega todos os dados quando a página é aberta
document.addEventListener("DOMContentLoaded", carregarEExibirDados);