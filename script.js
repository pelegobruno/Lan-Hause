// Lista de respostas e gatilhos para conversas modernas e informações do site
const responses = {
    greetings: [
        "E aí, beleza? Como posso te ajudar?",
        "Oi! Tudo tranquilo? Bora conversar.",
        "Fala aí! Tá precisando de algo?"
    ],
    services: [
        "Oferecemos serviços de impressão, digitalização, e envio de documentos. O que você tá procurando exatamente?",
        "Precisa imprimir ou enviar documentos? Manda aí o que precisa, que te ajudo!",
        "Impressões coloridas, preto e branco, digitalizações... Temos de tudo! Quer mais detalhes sobre preços?"
    ],
    prices: [
        "As impressões começam a partir de R$ 0,50 por folha em preto e branco. Quer saber mais detalhes?",
        "Impressões coloridas são R$ 1,50 por folha. Se precisar de algo diferente, me fala!",
        "Digitalizações custam R$ 1,00 por página. Qualquer dúvida, tô aqui!"
    ],
    dont_know: [
        "Hmm, não sei te ajudar com isso agora. Quer que eu te encaminhe pra um encantador?",
        "Cara, tô meio perdido aqui... Quer falar com um encantador pra resolver?",
        "Acho que não sei como resolver isso. Posso te passar pro nosso encantador, o que acha?"
    ],
    redirect_message: `Olá! Fui redirecionado pelo *Little Lan* e gostaria de mais informações sobre seus serviços além dos que ele já me apresentou no site.`
};

// Palavras positivas para confirmar o redirecionamento
const positiveWords = ["sim", "claro", "aham", "pode ser", "ok", "quero", "tudo bem", "isso", "simples"];

// Número do Telegram da empresa
const telegramNumber = "+5551998733012";
let waitingForRedirectConfirmation = false;

// Função para enviar mensagens ao clicar no botão ou pressionar Enter
function sendMessage(event) {
    if (event.type === "click" || (event.type === "keypress" && event.key === "Enter")) {
        const input = document.getElementById("chat-input");
        const output = document.getElementById("chat-output");
        const message = input.value.trim();

        if (message === "") return;

        // Adicionar mensagem do usuário
        const userMessage = document.createElement("div");
        userMessage.textContent = "Você: " + message;
        userMessage.style.color = "lightblue";
        output.appendChild(userMessage);

        // Adicionar "digitando" para o bot
        const typingIndicator = document.createElement("div");
        typingIndicator.textContent = "Little Lan está digitando...";
        typingIndicator.style.color = "gray";
        typingIndicator.id = "typing-indicator";
        output.appendChild(typingIndicator);

        // Simular tempo de resposta do bot (2 a 3 segundos)
        setTimeout(() => {
            output.removeChild(typingIndicator); // Remover "digitando"

            const botMessage = document.createElement("div");
            botMessage.textContent = "Little Lan: " + getBotResponse(message);
            botMessage.style.color = "lightgreen";
            output.appendChild(botMessage);

            // Rolar para a parte inferior do chat
            output.scrollTop = output.scrollHeight;

            // Limpar input
            input.value = "";
        }, Math.random() * 1000 + 2000); // Tempo aleatório entre 2 e 3 segundos
    }
}

// Função para obter resposta do Little Lan
function getBotResponse(userMessage) {
    const lowerCaseMessage = userMessage.toLowerCase();

    if (waitingForRedirectConfirmation) {
        // Se estamos esperando a confirmação do redirecionamento
        if (positiveWords.some((word) => lowerCaseMessage.includes(word))) {
            waitingForRedirectConfirmation = false; // Reseta o estado
            return addTelegramButton();
        } else {
            waitingForRedirectConfirmation = false; // Reseta o estado
            return "Beleza, seguimos por aqui! Me fala mais o que precisa.";
        }
    }

    // Gatilhos de conversa baseados na mensagem do usuário
    if (lowerCaseMessage.includes("olá") || lowerCaseMessage.includes("oi")) {
        return getRandomResponse(responses.greetings);
    } else if (lowerCaseMessage.includes("serviço") || lowerCaseMessage.includes("impressão") || lowerCaseMessage.includes("documento")) {
        return getRandomResponse(responses.services);
    } else if (lowerCaseMessage.includes("preço") || lowerCaseMessage.includes("valor")) {
        return getRandomResponse(responses.prices);
    } else {
        // Caso o bot não saiba a resposta, pergunta sobre o encantador
        waitingForRedirectConfirmation = true;
        return getRandomResponse(responses.dont_know);
    }
}

// Função para obter uma resposta aleatória de um array
function getRandomResponse(responseArray) {
    return responseArray[Math.floor(Math.random() * responseArray.length)];
}

// Função para adicionar o botão do Telegram
function addTelegramButton() {
    const output = document.getElementById("chat-output");

    const telegramDiv = document.createElement("div");
    telegramDiv.innerHTML = `
        <a href="https://t.me/${telegramNumber}?text=${encodeURIComponent(responses.redirect_message)}" target="_blank" style="text-decoration: none;">
            <button style="background-color: #0088cc; border: none; padding: 10px; border-radius: 50%; cursor: pointer;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" alt="Telegram" style="width: 24px; height: 24px;">
            </button>
        </a>
    `;
    output.appendChild(telegramDiv);

    return "Beleza! Clique no botão do Telegram pra falar com um encantador.";
}

// Adicionar evento ao botão e ao pressionar Enter
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("chat-input");
    const button = document.querySelector("button");

    button.addEventListener("click", sendMessage);
    input.addEventListener("keypress", sendMessage);
});


/* não mexer Little lan*/
document.addEventListener("DOMContentLoaded", function () {
    const littleLan = document.querySelector(".little-lan-icon");

    // Movimento automático (balanço)
    let angle = 0;
    setInterval(() => {
        angle += 3; // Define a velocidade do balanço
        const yOffset = Math.sin(angle * (Math.PI / 180)) * 5; // Movimento suave
        littleLan.style.transform = `translateY(${yOffset}px)`;
    }, 50);

    // Efeito ao passar o mouse (pulo)
    littleLan.addEventListener("mouseover", () => {
        littleLan.style.transform = "scale(1.2) rotate(10deg)";
    });

    littleLan.addEventListener("mouseout", () => {
        littleLan.style.transform = "scale(1) rotate(0deg)";
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("toggleDetalhes");
    const detalhes = document.getElementById("detalhesServicos");

    btn.addEventListener("click", function () {
        detalhes.classList.toggle("mostrar");

        // Alterar o texto do botão
        if (detalhes.classList.contains("mostrar")) {
            btn.textContent = "Ocultar detalhes ⬆️";
        } else {
            btn.textContent = "Ver detalhes ⬇️";
        }
    });
});


/* radio music*/
function playMusic(track) {
    let player = document.getElementById("musicPlayer");
    let source = document.getElementById("musicSource");

    if (track === "track1") {
        source.src = "static/music/music1.mp3";
    } else if (track === "track2") {
        source.src = "static/music/music2.mp3";
    }

    player.load();
    player.play();
}




