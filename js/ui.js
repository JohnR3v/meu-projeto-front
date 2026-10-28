// Responsável exclusivamente pela renderização de elementos no DOM
export function renderizarComponentes(itensProjeto) {
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

export function renderizarTarefas(tarefas, elementoLista) {
    if (!elementoLista) return;
    elementoLista.innerHTML = '';
    
    tarefas.forEach((tarefa, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${tarefa}</span>
            <button class="btn-apagar" data-index="${index}" style="margin-left: 10px; background: #e74c3c; color: white; border: none; border-radius: 3px; cursor: pointer;">Apagar</button>
        `;
        elementoLista.appendChild(li);
    });
}