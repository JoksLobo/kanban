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

// referente à modal
const modal = document.getElementById("myModal");
const cModal = document.getElementById("myCModal");
const openModal = document.getElementById("openModal");
const closeModal = document.querySelector(".close");
const openCModal = document.getElementById("open-comments-modal");
const closeCModal = document.querySelector(".CModalclose");

openModal.addEventListener("click", () => { //abre a modal
    modal.style.display = "block";
});

closeModal.addEventListener("click", () => { //fecha a modal clicando no x
    modal.style.display = "none";
});

window.addEventListener("click", (e) => { //fecha a modal clicando fora dela
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

openCModal.addEventListener("click", () => {
    cModal.style.display = "block";
});

closeCModal.addEventListener("click", () => {
    cModal.style.display = "none";
});

//referente à criação de cards novos
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    //Capturara prioridade e a descrição
    const priority = document.querySelector("input[type='radio']:checked")?.id;
    const description = document.querySelector("input[type='text']").value;

    if (!priority || !description) {
        alert("Preencha todos os campos!");
        return;
    }

    //cria o card dinamicamente
    const card = document.createElement("div");
    card.className = "kanban-card";
    card.setAttribute("draggable", "true");

    //badge de prioridade
    const badge = document.createElement("div");
    badge.className = `badge ${priority}`;
    const badgeText = document.createElement("span");
    badgeText.textContent = priority === "high" ? "Alta prioridade" : priority === "medium" ? "Média prioridade" : "Baixa prioridade";
    badge.appendChild(badgeText);

    //titulo do card
    const cardTitle = document.createElement("p");
    cardTitle.className = "card-title";
    cardTitle.textContent = description;

    //informações do card
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

    //montar o card
    card.appendChild(badge);
    card.appendChild(cardTitle);
    card.appendChild(cardInfos);

    //adicionar o card à coluna correspondente
    const columns = document.querySelectorAll(".kanban-cards");
    const columnIndex = priority === "high" ? 0 : priority === "medium" ? 0 : priority === "low" ? 0 : 3; // Ajuste o índice conforme necessári
    columns[columnIndex].appendChild(card);

    //adiona eventos de drang-n-drop ao novo card
    card.addEventListener("dragstart", e => {
        e.currentTarget.classList.add("dragging");
    });

    card.addEventListener("dragend", e => {
        e.currentTarget.classList.remove("dragging");
    });

    // Fechar a modal e resetar o formulário
    document.querySelector("form").reset();
    document.getElementById("myModal").style.display = "none";
});
