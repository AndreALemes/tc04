const listPlaces = document.querySelector("#list");
let espacos = [];

async function fetchEspacos() {
    try {
        const response = await fetch('espacos.json');
        espacos = await response.json();
        renderList();
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
        listPlaces.innerHTML = '<div>Erro ao carregar os dados</div>';
    }
}

function renderList() {
    let list = "";

    if (espacos.length <= 0) {
        list += '<div>Nenhum espaço disponível</div>';
    } else {
        espacos.forEach((espaco, index) => {
            list += 
                `<li class="list-group-item d-flex justify-content-between align-items-center"> 
                    <span>${espaco.nome}</span>
                    <button class="btn btn-sm btn-success" data-index="${index}">${espaco.status}</button>
                </li>`;
        });
    }

    listPlaces.innerHTML = list;

    // Adicionar evento de clique aos botões após renderizar a lista
    document.querySelectorAll("button[data-index]").forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            toggleStatus(index);
        });
    });
}

function toggleStatus(index) {
    // Alternar status entre "ativo" e "desativado"
    espacos[index].status = espacos[index].status === "ativo" ? "desativado" : "ativo";
    renderList();  // Re-renderizar a lista para refletir a mudança de status
}

document.addEventListener("DOMContentLoaded", fetchEspacos);
