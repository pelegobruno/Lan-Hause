/* Movimento automático e efeito ao passar o mouse no ícone Little Lan */
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

/* Botão para mostrar/ocultar detalhes dos serviços */
document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("toggleDetalhes");
    const detalhes = document.getElementById("detalhesServicos");

    if (btn && detalhes) {
        btn.addEventListener("click", function () {
            detalhes.classList.toggle("mostrar");

            // Alterar o texto do botão
            if (detalhes.classList.contains("mostrar")) {
                btn.textContent = "Ocultar detalhes ⬆️";
            } else {
                btn.textContent = "Ver detalhes ⬇️";
            }
        });
    }
});

/* Player de música */
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





























const ChatBot = {
    whatsappNumber: "+5551998733012",
    telegramNumber: "+5551998733012", // Número do Telegram
    chatContainer: null,
    input: null,
    output: null,
    isNewClient: null,
    userName: "",
    userPhone: "",

    // Inicializa o chatbot
    init: function () {
        this.chatContainer = document.getElementById("chat-container");
        this.input = document.getElementById("chat-input");
        this.output = document.getElementById("chat-output");

        if (!this.chatContainer || !this.input || !this.output) {
            console.error("❌ Elementos do chat não encontrados!");
            return;
        }

        document.getElementById("chat-toggle").addEventListener("click", this.openChat.bind(this));
        document.getElementById("close-chat").addEventListener("click", this.closeChat.bind(this));
        document.getElementById("send-btn").addEventListener("click", this.sendMessage.bind(this));
        this.input.addEventListener("keypress", (event) => {
            if (event.key === "Enter") this.sendMessage();
        });

        this.displayMessage("Little Lan", this.getResponse("greetings"), "bot-message");
    },

    // Abre o chat
    openChat: function () {
        this.chatContainer.style.display = "flex";
    },

    // Fecha o chat
    closeChat: function () {
        this.chatContainer.style.display = "none";
    },

    // Envia mensagem e processa resposta
    sendMessage: function () {
        const message = this.input.value.trim();
        if (message === "") {
            alert("Por favor, digite uma mensagem.");
            return;
        }

        this.displayMessage("Você", message, "user-message");

        // Simula efeito de "digitando..."
        const typingIndicator = document.createElement("div");
        typingIndicator.textContent = "Little Lan está digitando...";
        typingIndicator.classList.add("typing-indicator");
        this.output.appendChild(typingIndicator);
        this.output.scrollTop = this.output.scrollHeight;

        // Responde após 2 segundos
        setTimeout(() => {
            this.output.removeChild(typingIndicator);
            this.displayMessage("Little Lan", this.getResponse(message), "bot-message");
        }, 2000);

        this.input.value = "";
    },

    // Exibe mensagens no chat
    displayMessage: function (sender, text, type) {
        const messageElement = document.createElement("div");
        messageElement.innerHTML = `<strong>${sender}:</strong><br>${text}`;
        messageElement.classList.add("message", type);
        this.output.appendChild(messageElement);
        this.output.scrollTop = this.output.scrollHeight;
    },

    // Responde ao usuário baseado nas opções
    getResponse: function (message) {
        const responses = {
            greetings: `👋 Olá! Bem-vindo à Lan House! Como posso te ajudar?<br><br>
                1️⃣ *Serviços disponíveis*<br>
                2️⃣ *Preços*<br>
                3️⃣ *Falar com um atendente*<br>
                4️⃣ *Músicas mais tocadas*`,

            services: `📌 *Temos os seguintes serviços:*<br><br>
                1️⃣ *Impressão* (colorida e preto e branco)<br>
                2️⃣ *Digitalização de documentos*<br>
                3️⃣ *Envio de documentos*<br>
                4️⃣ *Acesso à internet*<br><br>
                Gostaria de mais alguma coisa?<br>
                (A) Voltar ao menu principal<br>
                (B) Falar com um atendente`,

            prices: `💰 *Aqui estão os preços:*<br><br>
                📄 *Impressão Preto e Branco* → R$ 0,50 por folha<br>
                🖨️ *Impressão Colorida* → R$ 1,50 por folha<br>
                📃 *Digitalização* → R$ 1,00 por página<br><br>
                Gostaria de mais alguma coisa?<br>
                (A) Voltar ao menu principal<br>
                (B) Falar com um atendente`,

            ask_if_client: `📞 Você já é cliente?<br><br>
                1️⃣ Sim, sou cliente frequente<br>
                2️⃣ Não, sou um novo cliente`
        };

        const lowerCaseMessage = message.toLowerCase();

        if (this.isNewClient === null) {
            if (lowerCaseMessage.includes("sim") || lowerCaseMessage === "1") {
                this.isNewClient = false;
                return this.redirectToTelegram();
            } else if (lowerCaseMessage.includes("não") || lowerCaseMessage.includes("nao") || lowerCaseMessage === "2") {
                this.isNewClient = true;
                return "📝 Por favor, informe seu *NOME* para cadastro.";
            }
        } else if (this.isNewClient && this.userName === "") {
            this.userName = message;
            return "📞 Agora, informe seu *NÚMERO DE TELEFONE* para completar o cadastro.";
        } else if (this.isNewClient && this.userPhone === "") {
            this.userPhone = message;
            return this.completeRegistration();
        }

        if (lowerCaseMessage === "1") return responses["services"];
        if (lowerCaseMessage === "2") return responses["prices"];
        if (lowerCaseMessage === "3") return responses["ask_if_client"];
        if (lowerCaseMessage === "4") return this.getTop10Music();
        if (lowerCaseMessage === "a") return responses["greetings"];
        if (lowerCaseMessage === "b") return responses["ask_if_client"];

        return responses["greetings"];
    },

    // Finaliza cadastro e direciona para atendimento
    completeRegistration: function () {
        return `✅ Cadastro concluído!<br><br>
        Nome: *${this.userName}*<br>
        Telefone: *${this.userPhone}*<br><br>
        Agora, clique no botão abaixo para falar com um atendente no Telegram:<br><br>
        <a href="https://t.me/${this.telegramNumber}" target="_blank">
            <button style="background-color: #0088cc; border: none; padding: 10px; border-radius: 5px;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" width="20" style="vertical-align: middle;">
                📩 Falar com um atendente
            </button>
        </a>`;
    },

    // Redireciona diretamente para o Telegram caso já seja cliente
    redirectToTelegram: function () {
        return `👋 *Você é um cliente frequente!*<br><br>
        Clique no botão abaixo para falar conosco no Telegram:<br><br>
        <a href="https://t.me/${this.telegramNumber}" target="_blank">
            <button style="background-color: #0088cc; border: none; padding: 10px; border-radius: 5px;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" width="20" style="vertical-align: middle;">
                Falar no Telegram
            </button>
        </a>`;
    },

    // Retorna a lista dos 10 mais tocados
    getTop10Music: function () {
        return `🎵 *Aqui estão os 10 mais tocados na Rádio Lan:*<br>
        <a href="http://127.0.0.1:5500/lan_house/music.html" target="_blank">
            <button style="background-color: #25D366; border: none; padding: 10px; border-radius: 5px;">
                🎧 Ouvir as músicas
            </button>
        </a>`;
    }
};

// Inicializa o chatbot após o carregamento da página
document.addEventListener("DOMContentLoaded", function () {
    ChatBot.init();
});
