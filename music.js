document.addEventListener("DOMContentLoaded", function () {
    const botaoTopo = document.getElementById("btnTopo");
    const player = document.getElementById("player");

    // Função para rolar ao topo
    if (botaoTopo) {
        botaoTopo.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        window.addEventListener("scroll", function () {
            if (window.scrollY > 300) {
                botaoTopo.style.display = "block";
            } else {
                botaoTopo.style.display = "none";
            }
        });
    }

/*BOTÃO SUBIR*/
// Função para rolar ao topo
function subirAoTopo() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}
// Mostrar o botão apenas ao chegar ao final da página
window.onscroll = function () {
    let botao = document.getElementById("btnTopo");
    let alturaPagina = document.documentElement.scrollHeight;
    let alturaTela = window.innerHeight;
    let posicaoAtual = window.scrollY + alturaTela;

    if (posicaoAtual >= alturaPagina - 10) {
        botao.classList.add("mostrar-botao");
    } else {
        botao.classList.remove("mostrar-botao");
    }
};




    // Função para tocar música
    window.tocarMusica = function (caminho) {
        if (player) {
            player.src = caminho;
            player.play();
        }
    };
});

