document.addEventListener('DOMContentLoaded', () => {
    // Tenta carregar o carrinho do localStorage, se não existir, cria um array vazio
    let cart = JSON.parse(localStorage.getItem('deltaStoreCart')) || [];

    // --- FUNÇÕES GLOBAIS ---
    const saveCart = () => {
        localStorage.setItem('deltaStoreCart', JSON.stringify(cart));
    };

    const updateCartCount = () => {
        const cartCountElement = document.getElementById('cart-count');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        if (cartCountElement) { // Verifica se o elemento existe
            if (totalItems > 0) {
                cartCountElement.textContent = totalItems;
                cartCountElement.style.display = 'flex';
            } else {
                cartCountElement.style.display = 'none';
            }
        }
    };

    // --- LÓGICA DE ADICIONAR AO CARRINHO (AGORA GENERALIZADA) ---
    const allAddToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    allAddToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const clickedButton = event.currentTarget; // O botão que foi clicado

            const product = {
                id: clickedButton.dataset.id,
                name: clickedButton.dataset.nome,
                price: parseFloat(clickedButton.dataset.preco),
                image: clickedButton.dataset.imagem,
            };

            const existingItem = cart.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                product.quantity = 1;
                cart.push(product);
            }

            saveCart();
            updateCartCount();
            
            // Feedback visual
            const originalText = clickedButton.textContent;
            clickedButton.textContent = 'Adicionado!';
            setTimeout(() => {
                clickedButton.textContent = originalText;
            }, 2000);
        });
    });


    // --- LÓGICA DA PÁGINA DO CARRINHO (permanece a mesma) ---
    const cartItemsContainer = document.getElementById('cart-items-container');
    if (cartItemsContainer) {
        const emptyCartMessage = document.getElementById('empty-cart-message');

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
        } else {
            let total = 0;
            cart.forEach(item => {
                total += item.price * item.quantity;
                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('cart-item');
                cartItemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>R$ ${item.price.toFixed(2)}</p>
                    </div>
                    <p>Qtd: ${item.quantity}</p>
                    <p>Subtotal: R$ ${(item.price * item.quantity).toFixed(2)}</p>
                `;
                cartItemsContainer.appendChild(cartItemElement);
            });

            const cartTotalElement = document.createElement('div');
            cartTotalElement.classList.add('cart-total');
            cartTotalElement.innerHTML = `Total: R$ ${total.toFixed(2)}`;
            cartItemsContainer.appendChild(cartTotalElement);

            const cartActionsElement = document.createElement('div');
            cartActionsElement.classList.add('cart-actions');
            cartActionsElement.innerHTML = `
                <a href="index.html" class="btn btn-secondary">Continuar comprando</a>
                <a href="#" id="checkout-btn" class="btn btn-primary">Finalizar compra</a>
            `;
            cartItemsContainer.appendChild(cartActionsElement);

            document.getElementById('checkout-btn').addEventListener('click', (e) => {
                e.preventDefault();
                cart = [];
                saveCart();
                window.location.href = 'confirmacao.html';
            });
        }
    }

    // --- ATUALIZAÇÃO INICIAL ---
    updateCartCount();
});