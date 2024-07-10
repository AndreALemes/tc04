$(document).ready(function() {
    // Inicializar o menu de salas vazio
    document.getElementById('espaco').selectedIndex = -1;

    // Função para gerar os horários de 8h até 19h
    function gerarHorarios() {
        var startHour = 8;
        var endHour = 19;
        $('#calendar').empty(); // Limpar o calendário antes de gerar novos horários
        for (var hour = startHour; hour <= endHour; hour++) {
            var colDiv = $('<div class="col-md-4 mb-3"></div>');
            var timeSlot = $('<div class="btn btn-success btn-block rounded">' + hour + ':00</div>');
            timeSlot.attr('data-hour', hour); // Adicionar atributo data-hour com o valor do horário
            colDiv.append(timeSlot);
            $('#calendar').append(colDiv);
        }
    }

    // Função para resetar os campos de data e espaço
    function resetarCampos() {
        $('#espaco').val('');
        $('#data').val('');
        document.getElementById('espaco').selectedIndex = -1;
        $('#calendar').html(''); // Limpar o conteúdo
        $('#reservar').html(''); // Limpar o conteúdo
    }

    // Adicionar evento de clique ao botão de verificação de disponibilidade
    $('#dateSearch').on('click', function(event) {
        event.preventDefault(); // Impedir que o formulário seja enviado

        var espaco = $('#espaco').val();
        var data = $('#data').val();

        // Verificar se ambos os campos foram preenchidos
        if (espaco && data) {
            gerarHorarios();
        } else {
            // Mostrar mensagem de erro ou tomar outra ação adequada
            alert('Por favor, preencha os campos de Espaço e Data.');
        }
    });

    // Adicionar evento de clique aos botões de horário
    $('#calendar').on('click', '.btn-success', function() {
        var hour = $(this).data('hour');
        var reservaHTML = '<p>Deseja reservar o horário ' + hour + ':00?</p>';
        reservaHTML += '<button id="confirmarReserva" class="btn btn-primary mr-2">Confirmar</button>';
        reservaHTML += '<button id="cancelarReserva" class="btn btn-danger">Cancelar</button>';
        $('#reservar').html(reservaHTML);
    });

    // Evento para cancelar a reserva
    $('#reservar').on('click', '#cancelarReserva', function() {
        resetarCampos(); // Resetar campos de data e espaço
    });

    // Evento para confirmar a reserva
    $('#reservar').on('click', '#confirmarReserva', function() {
        Swal.fire('Reserva confirmada');
        resetarCampos(); // Resetar campos de data e espaço
    });
});
