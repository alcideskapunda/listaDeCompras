const form = document.querySelector('form');
const elementoUl = document.querySelector('.lista_compras');

let itens = JSON.parse(localStorage.getItem('itens')) || [];

// Função para renderizar os itens na lista
function renderizarItens() {
    elementoUl.innerHTML = ''; // Limpa a lista antes de recriar

    itens.forEach(function(item, index) {
        const li = document.createElement('li');
        li.className = 'lista_compras_elemento';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox';

        const div = document.createElement('div')

        const itemNome = document.createElement('h1');
        itemNome.textContent = item.nome;
        itemNome.className = 'lista_compras_elemento_item';

        const itemQtd = document.createElement('p');
        itemQtd.textContent = `Qtd: ${item.quantidade}`;
        itemQtd.className = 'lista_compras_elemento_qtd';

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remover';
        removeBtn.className = 'delete-btn';
        removeBtn.addEventListener('click', () => {
            itens.splice(index, 1); // Remove o item do array
            atualizarLocalStorage();
            renderizarItens(); // Re-renderiza a lista
        });

        div.appendChild(itemNome);
        div.appendChild(itemQtd);

        li.appendChild(checkbox);
        li.appendChild(div);
        li.appendChild(removeBtn);
        elementoUl.appendChild(li);
    });
}

// Adicionar item ao enviar o formulário
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newItemName = document.getElementById('item').value.trim();
    const newItemQuantity = document.getElementById('quantidade').value.trim();
    
    if (newItemName !== '' && newItemQuantity !== '') {
        const newItem = {
            nome: newItemName,
            quantidade: newItemQuantity
        };
        itens.push(newItem);
        atualizarLocalStorage();
        form.reset(); // Limpa o formulário
        renderizarItens(); // Re-renderiza a lista com o novo item
    }
});

// Atualiza a localStorage com o array atual de itens
function atualizarLocalStorage() {
    localStorage.setItem('itens', JSON.stringify(itens));
}

// Renderiza os itens ao carregar a página
renderizarItens();
