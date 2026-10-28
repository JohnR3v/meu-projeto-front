// Dados de origem simulados (poderiam vir de uma API)
const itensProjeto = [
    { id: 1, nome: "Módulo de Frontend", status: "Em desenvolvimento" },
    { id: 2, nome: "Arquitetura SPA", status: "Concluído" },
    { id: 3, nome: "Templates Dinâmicos", status: "Em andamento" }
];

// Função para renderizar os componentes dinâmicos iniciais
function renderizarComponentes() {
    const containerDinamico = document.getElementById('lista-projeto-estatico');
    if (!containerDinamico) return;

    const conteudoHTML = itensProjeto.map(item => `
        <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; border-radius: 5px;">
            <h4>${item.nome}</h4>
            <p>Estado: <strong>${item.status}</strong></p>
        </div>
    `).join('');

    containerDinamico.innerHTML = `
        <h2>Lista Dinâmica de Tarefas do Projeto</h2>
        ${conteudoHTML}
    `;
}

// Inicialização única quando o DOM estiver totalmente carregado
document.addEventListener('DOMContentLoaded', () => {
    // 1. Executa a renderização dos componentes estáticos/simulados
    renderizarComponentes();

    // 2. Seleção de elementos do DOM
    const form = document.getElementById('form-tarefa');
    const input = document.getElementById('input-tarefa');
    const lista = document.getElementById('lista-tarefas');

    // Carregar tarefas salvas no localStorage ao iniciar
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    // Função de renderização com o botão de apagar integrado
    function renderizarTarefas() {
        if (!lista) return;
        lista.innerHTML = '';
        
        tarefas.forEach((tarefa, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${tarefa}</span>
                <button class="btn-apagar" data-index="${index}" style="margin-left: 10px; background: #e74c3c; color: white; border: none; border-radius: 3px; cursor: pointer;">Apagar</button>
            `;
            lista.appendChild(li);
        });
    }

    renderizarTarefas();

    // 3. Gestão do envio do formulário
    if (form && input) {
        form.addEventListener('submit', (evento) => {
            evento.preventDefault();
            const valor = input.value.trim();

            // Limpa mensagens de erro anteriores se existirem
            const erroAnterior = document.querySelector('.mensagem-erro');
            if (erroAnterior) erroAnterior.remove();

            if (valor === '') {
                input.classList.add('erro-visual');
                
                // Notificação de erro com SweetAlert2
                Swal.fire({
                    icon: 'error',
                    title: 'Campo Vazio',
                    text: 'Por favor, preencha o campo da tarefa antes de submeter!',
                    confirmButtonColor: '#333'
                });
                return;
            }

            input.classList.remove('erro-visual');

            // Adicionar nova tarefa ao array e atualizar o localStorage
            tarefas.push(valor);
            localStorage.setItem('tarefas', JSON.stringify(tarefas));
            renderizarTarefas();

            // Notificação de sucesso com SweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'Adicionado!',
                text: 'A tarefa foi guardada com sucesso.',
                timer: 1500,
                showConfirmButton: false
            });

            input.value = '';
        });
    }

    // 4. Delegação de eventos para apagar tarefas
    if (lista) {
        lista.addEventListener('click', (evento) => {
            if (evento.target.classList.contains('btn-apagar')) {
                const index = evento.target.getAttribute('data-index');

                // Remove o item do array pelo índice
                tarefas.splice(index, 1);

                // Atualiza o localStorage e re-renderiza a lista
                localStorage.setItem('tarefas', JSON.stringify(tarefas));
                renderizarTarefas();
            }
        });
    }
});