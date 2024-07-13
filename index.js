let espacos = [
    {
        id: 1,
        tipo: "quadra esportiva",
        nome: "quadra de futebol",
        status: "Desativado"
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

// Funções de Gestão de Espaços
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

    if (listPlaces) {
        listPlaces.innerHTML = list;
        document.querySelectorAll("#list button").forEach(button => {
            button.addEventListener("click", function() {
                const index = this.getAttribute("data-index");
                toggleStatus(index);
            });
        });
    }
}

function toggleStatus(index) {
    espacos[index].status = espacos[index].status === "ativo" ? "Desativado" : "ativo";
    renderList();
}

// Funções de Reservar
function gerarHorarios() {
    var startHour = 8;
    var endHour = 19;
    var calendar = document.getElementById('calendar');
    calendar.innerHTML = ''; // Limpar o calendário antes de gerar novos horários
    for (var hour = startHour; hour <= endHour; hour++) {
        var colDiv = document.createElement('div');
        colDiv.className = 'col-md-4 mb-3';
        var timeSlot = document.createElement('div');
        timeSlot.className = 'btn btn-success btn-block rounded';
        timeSlot.textContent = hour + ':00';
        timeSlot.setAttribute('data-hour', hour); // Adicionar atributo data-hour com o valor do horário
        colDiv.appendChild(timeSlot);
        calendar.appendChild(colDiv);
    }
}

function resetarCampos() {
    document.getElementById('espacoSelect').selectedIndex = -1;
    document.getElementById('data').value = '';
    document.getElementById('calendar').innerHTML = ''; // Limpar o conteúdo
    document.getElementById('reservar').innerHTML = ''; // Limpar o conteúdo
}

document.addEventListener("DOMContentLoaded", function() {
    // Carregar opções do select com base nos nomes dos espaços ativos
    const selectEspaco = document.getElementById('espacoSelect');
    if (selectEspaco) {
        espacos.forEach(espaco => {
            if (espaco.status === 'ativo') {
                const option = document.createElement('option');
                option.value = espaco.nome;
                option.textContent = espaco.nome;
                selectEspaco.appendChild(option);
            }
        });
    }

    // Inicializar o menu de salas vazio se estiver na página de reserva
    if (document.getElementById('espacoSelect')) {
        document.getElementById('espacoSelect').selectedIndex = -1;
    }

    // Adicionar evento de clique ao botão de verificação de disponibilidade
    if (document.getElementById('dateSearch')) {
        document.getElementById('dateSearch').addEventListener('click', function(event) {
            event.preventDefault(); // Impedir que o formulário seja enviado

            var espaco = document.getElementById('espacoSelect').value;
            var data = document.getElementById('data').value;

            // Verificar se ambos os campos foram preenchidos
            if (espaco && data) {
                gerarHorarios();
            } else {
                // Mostrar mensagem de erro ou tomar outra ação adequada
                alert('Por favor, preencha os campos de Espaço e Data.');
            }
        });
    }

    // Adicionar evento de clique aos botões de horário
    if (document.getElementById('calendar')) {
        document.getElementById('calendar').addEventListener('click', function(event) {
            if (event.target.classList.contains('btn-success')) {
                var hour = event.target.getAttribute('data-hour');
                var reservaHTML = '<p>Deseja reservar o horário ' + hour + ':00?</p>';
                reservaHTML += '<button id="confirmarReserva" class="btn btn-primary mr-2">Confirmar</button>';
                reservaHTML += '<button id="cancelarReserva" class="btn btn-danger">Cancelar</button>';
                document.getElementById('reservar').innerHTML = reservaHTML;
            }
        });
    }

    // Evento para cancelar a reserva
    if (document.getElementById('reservar')) {
        document.getElementById('reservar').addEventListener('click', function(event) {
            if (event.target && event.target.id === 'cancelarReserva') {
                resetarCampos(); // Resetar campos de data e espaço
            }
        });

        // Evento para confirmar a reserva
        document.getElementById('reservar').addEventListener('click', function(event) {
            if (event.target && event.target.id === 'confirmarReserva') {
                Swal.fire('Reserva confirmada');
                resetarCampos(); // Resetar campos de data e espaço
            }
        });
    }

    // Renderizar lista de espaços se estivermos na página de gestão de espaços
    if (document.getElementById('list')) {
        renderList();
    }
});
