document.querySelectorAll('.kanban-card').forEach(card => {
    card.addEventListener('dragstart', e => {
        e.currentTarget.classList.add('dragging'); //adiciona a classe dragging quando começa a arrastar o card
    })

    card.addEventListener('dragend', e => {
        e.currentTarget.classList.remove('dragging'); //remove a classe dragging quando para de arrastar o card
    })
})

document.querySelectorAll('.kanban-cards').forEach(column => { //seleciona todas as colunas
    column.addEventListener('dragover', e => {
        e.preventDefault(); //previne que o card grude automaticamente
        e.currentTarget.classList.add('cards-hover'); //adiciona uma cor à coluna quando o card é colocado sobre ela
    })

    column.addEventListener('dragleave', e => {
        e.preventDefault(); //previne que o card grude automaticamente
        e.currentTarget.classList.remove('cards-hover'); //remove a cor quando o card é retirado de sobre coluna
    })

    column.addEventListener('drop', e => {
        e.currentTarget.classList.remove('cards-hover'); //remove a cor da coluna ao soltar o card nela

        const dragCard = document.querySelector('.kanban-card.dragging');
        e.currentTarget.appendChild(dragCard);
    })
})

const modal = document.getElementById("myModal");
const openModal = document.getElementById("openModal");
const closeModal = document.querySelector(".close");

openModal.addEventListener("click", () => {
    modal.style.display = "block";
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});