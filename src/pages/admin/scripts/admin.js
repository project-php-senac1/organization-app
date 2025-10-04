document.addEventListener('DOMContentLoaded', () => {

    // Lógica para marcar o link ativo na sidebar
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.sidebar-nav a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        // Remove a classe 'active' do pai (li)
        link.parentElement.classList.remove('active');
        
        if (linkPage === currentPage) {
            link.parentElement.classList.add('active');
        }
    });


    // Lógica para confirmação de exclusão
    const deleteButtons = document.querySelectorAll('.actions .delete');

    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Impede a navegação do link

            const userConfirmed = confirm('Tem certeza que deseja excluir este item?');

            if (userConfirmed) {
                // Em um projeto real, aqui você faria a chamada para o backend.
                // Por enquanto, vamos apenas remover a linha da tabela para demonstração.
                const row = event.target.closest('tr');
                row.remove();
                alert('Item excluído com sucesso!');
            } else {
                alert('Exclusão cancelada.');
            }
        });
    });

});