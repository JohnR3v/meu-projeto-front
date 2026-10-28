// Responsável exclusivamente pela gestão do Web Storage
export function obterTarefas() {
    return JSON.parse(localStorage.getItem('tarefas')) || [];
}

export function guardarTarefas(tarefas) {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}