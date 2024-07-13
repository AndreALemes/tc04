let espacos = [
    {
        id: 1,
        tipo: "quadra esportiva",
        nome: "quadra de futebol",
        status: "ativo"
    },
    {
        id: 2,
        tipo: "quadra esportiva",
        nome: "quadra de volei",
        status: "ativo"
    },
    {
        id: 3,
        tipo: "sala de reunião",
        nome: "sala G",
        status: "ativo"
    },
    {
        id: 4,
        tipo: "sala de reunião",
        nome: "sala P",
        status: "ativo"
    },
    {
        id: 5,
        tipo: "salão de festa",
        nome: "salão grande",
        status: "Desativado"
    },
    {
        id: 6,
        tipo: "salão de festa",
        nome: "salão médio",
        status: "ativo"
    },
];

const listPlaces = document.querySelector("#list");

function renderList() {
    let list = "";

    if (espacos.length <= 0) {
        list += '<div>Nenhum espaço disponível</div>';
    } else {
        espacos.forEach((espaco, index) => {
            list += 
                `<li class="list-group-item d-flex justify-content-between align-items-center"> 
                    <span>${espaco.nome}</span>
                    <button class="btn btn-sm btn-${espaco.status === 'ativo' ? 'success' : 'danger'}" data-index="${index}">
                        ${espaco.status}
                    </button>
                </li>`;
        });
    }

    listPlaces.innerHTML = list;

    // Adiciona event listener aos botões após renderizar a lista
    document.querySelectorAll("#list button").forEach(button => {
        button.addEventListener("click", function() {
            const index = this.getAttribute("data-index");
            toggleStatus(index);
        });
    });
}

function toggleStatus(index) {
    espacos[index].status = espacos[index].status === "ativo" ? "Desativado" : "ativo";
    renderList();
}

renderList();
