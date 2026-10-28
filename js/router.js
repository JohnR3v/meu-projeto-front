function carregarSecao(secao) {
    const app = document.getElementById('app');
    
    if (secao === 'home') {
        app.innerHTML = `
            <h2>Página Inicial</h2>
            <p>Este é o conteúdo carregado dinamicamente para a Home.</p>
        `;
    } else if (secao === 'sobre') {
        app.innerHTML = `
            <h2>Sobre o Projeto</h2>
            <p>Esta aplicação demonstra a separação de responsabilidades e conceitos de SPA.</p>
        `;
    }
}
