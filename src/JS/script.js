// Eventos de drag-and-drop para os cards
document.querySelectorAll('.kanban-card').forEach(card => {
    card.addEventListener('dragstart', e => {
        e.currentTarget.classList.add('dragging'); // adiciona a classe dragging quando começa a arrastar o card
    });

    card.addEventListener('dragend', e => {
        e.currentTarget.classList.remove('dragging'); // remove a classe dragging quando para de arrastar o card
    });
});

document.querySelectorAll('.kanban-cards').forEach(column => { // seleciona todas as colunas
    column.addEventListener('dragover', e => {
        e.preventDefault(); // previne que o card grude automaticamente
        e.currentTarget.classList.add('cards-hover'); // adiciona uma cor à coluna quando o card é colocado sobre ela
    });

    column.addEventListener('dragleave', e => {
        e.preventDefault(); // previne que o card grude automaticamente
        e.currentTarget.classList.remove('cards-hover'); // remove a cor quando o card é retirado de sobre a coluna
    });

    column.addEventListener('drop', e => {
        e.currentTarget.classList.remove('cards-hover'); // remove a cor da coluna ao soltar o card nela

        const dragCard = document.querySelector('.kanban-card.dragging');
        e.currentTarget.appendChild(dragCard);
    });
});

// Modal para criação de novos cards e comentários
const modal = document.getElementById("myModal");
const cModal = document.getElementById("myCModal");
const openModal = document.getElementById("openModal");
const closeModal = document.querySelector(".close");
const closeCModal = document.querySelector(".CModalclose");

openModal.addEventListener("click", () => { // abre a modal
    modal.style.display = "block";
});

closeModal.addEventListener("click", () => { // fecha a modal clicando no X
    modal.style.display = "none";
});

window.addEventListener("click", (e) => { // fecha a modal clicando fora dela
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

closeCModal.addEventListener("click", () => {
    cModal.style.display = "none";
});

// Criação de novos cards
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Captura prioridade e descrição
    const priority = document.querySelector("input[type='radio']:checked")?.id;
    const description = document.querySelector("input[type='text']").value;

    if (!priority || !description) {
        alert("Preencha todos os campos!");
        return;
    }

    // Cria o card dinamicamente
    const card = document.createElement("div");
    card.className = "kanban-card";
    card.setAttribute("draggable", "true");
    card.dataset.id = `card-${Date.now()}`; // Adiciona um ID único ao card

    // Badge de prioridade
    const badge = document.createElement("div");
    badge.className = `badge ${priority}`;
    const badgeText = document.createElement("span");
    badgeText.textContent = priority === "high" ? "Alta prioridade" : priority === "medium" ? "Média prioridade" : "Baixa prioridade";
    badge.appendChild(badgeText);

    // Título do card
    const cardTitle = document.createElement("p");
    cardTitle.className = "card-title";
    cardTitle.textContent = description;

    // Informações do card
    const cardInfos = document.createElement("div");
    cardInfos.className = "card-infos";

    const cardIcons = document.createElement("div");
    cardIcons.className = "card-icons";
    const commentIcon = document.createElement("p");
    commentIcon.innerHTML = `<i class="fa-regular fa-comment"></i> 0`;

    const attachmentIcon = document.createElement("p");
    attachmentIcon.innerHTML = `<i class="fa-solid fa-paperclip"></i> 0`;

    cardIcons.appendChild(commentIcon);
    cardIcons.appendChild(attachmentIcon);
    cardInfos.appendChild(cardIcons);

    const userDiv = document.createElement("div");
    userDiv.className = "user";
    const userImage = document.createElement("img");
    userImage.src = "/src/images/woman-9210161_1280.jpg";
    userDiv.appendChild(userImage);

    cardInfos.appendChild(userDiv);

    // Adiciona espaço para comentários
    const commentsContainer = document.createElement("div");
    commentsContainer.className = "card-comments";
    card.appendChild(commentsContainer);

    // Monta o card
    card.appendChild(badge);
    card.appendChild(cardTitle);
    card.appendChild(cardInfos);

    // Adiciona o evento de abrir o modal de comentários
    commentIcon.addEventListener("click", () => {
        cModal.style.display = "block";
        cModal.dataset.currentCardId = card.dataset.id; // Armazena o ID do card no modal
    });

    // Adiciona eventos de drag-and-drop ao novo card
    card.addEventListener("dragstart", e => {
        e.currentTarget.classList.add("dragging");
    });

    card.addEventListener("dragend", e => {
        e.currentTarget.classList.remove("dragging");
    });

    // Adiciona o card à coluna correspondente
    const columns = document.querySelectorAll(".kanban-cards");
    const columnIndex = priority === "high" ? 0 : priority === "medium" ? 0 : priority === "low" ? 0 : 3; // Ajuste o índice conforme necessário
    columns[columnIndex].appendChild(card);

    // Fecha a modal e reseta o formulário
    document.querySelector("form").reset();
    modal.style.display = "none";
});



// Evento para enviar o comentário
cModal.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Captura o comentário e o ID do card associado
    const comment = cModal.querySelector("input[type='text']").value;
    const currentCardId = cModal.dataset.currentCardId;

    if (!comment) {
        alert("Escreva um comentário!");
        return;
    }

    // Encontra o card correspondente
    const card = document.querySelector(`.kanban-card[data-id="${currentCardId}"]`);
    if (card) {
        const commentsContainer = card.querySelector(".card-comments");

        // Cria um novo comentário e adiciona ao contêiner
        const commentElement = document.createElement("p");
        commentElement.textContent = comment;
        commentElement.className = "comment-item";
        commentsContainer.appendChild(commentElement);

        // Atualiza o contador de comentários
        const commentIcon = card.querySelector(".card-icons p:first-child");
        let commentCount = parseInt(commentIcon.textContent.match(/\d+/)[0]);
        commentCount++;
        commentIcon.innerHTML = `<i class="fa-regular fa-comment"></i> ${commentCount}`;
    }

    // Fecha o modal e reseta o formulário
    cModal.style.display = "none";
    this.reset();
});
