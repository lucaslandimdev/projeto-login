// ===== SELEÇÃO DE ELEMENTOS =====
const form = document.querySelector("form");
const nome = document.getElementById("nome");
const email = document.getElementById("ilogin");
const senha = document.getElementById("isenha");
const botao = document.querySelector('input[type="submit"]');


// ===== CRIAR BOTÃO MOSTRAR SENHA =====
const toggle = document.createElement("span");
toggle.innerText = ("fa-solid", "fa-eye");
toggle.style.cursor = "pointer";
toggle.style.marginLeft = "10px";
toggle.style.fontSize = "18px";
senha.parentNode.appendChild(toggle);


// ===== MOSTRAR / OCULTAR SENHA =====
toggle.addEventListener("click", () => {

    if (senha.type === "password") {
        senha.type = "text";
        toggle.classList.remove("fa-eye");
        toggle.classList.add("fa-eye-slash");
    } else {
        senha.type = "password";
        toggle.classList.remove("fa-eye-slash");
        toggle.classList.add("fa-eye");
    }

});

// ===== VALIDAR EMAIL COM REGEX =====
function emailValido(valor) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(valor);
}


// ===== MOSTRAR ERRO =====
function erro(input, mensagem) {

    input.style.border = "2px solid red";

    input.animate([
        { transform: "translateX(0px)" },
        { transform: "translateX(-6px)" },
        { transform: "translateX(6px)" },
        { transform: "translateX(-6px)" },
        { transform: "translateX(0px)" }
    ], {
        duration: 350
    });

    const msg = document.createElement("div");
    msg.classList.add("erro");
    msg.innerText = mensagem;
    msg.style.color = "red";
    msg.style.fontSize = "12px";

    input.parentNode.appendChild(msg);
}


// ===== SUCESSO VISUAL =====
function sucesso(input) {
    input.style.border = "2px solid green";
}


// ===== LIMPAR ERROS =====
function limpar() {
    document.querySelectorAll(".erro").forEach(e => e.remove());
    document.querySelectorAll(".input").forEach(i => {
        i.style.border = "1px solid orange";
    });
}


// ===== EVENTO SUBMIT =====
form.addEventListener("submit", (e) => {

    e.preventDefault();

    limpar();

    let temErro = false;

    // NOME
    if (nome.value.trim().length < 3) {
        erro(nome, "Nome precisa ter pelo menos 3 letras");
        nome.focus();
        temErro = true;
    } else {
        sucesso(nome);
    }

    // EMAIL
    if (!emailValido(email.value)) {
        erro(email, "Digite um email válido");
        if (!temErro) email.focus();
        temErro = true;
    } else {
        sucesso(email);
    }

    // SENHA
    if (senha.value.length < 8) {
        erro(senha, "Senha precisa ter no mínimo 8 caracteres");
        if (!temErro) senha.focus();
        temErro = true;
    } else {
        sucesso(senha);
    }

    if (temErro) return;


    // ===== LOADING =====
    botao.value = "Entrando...";
    botao.disabled = true;

    setTimeout(() => {

        alert("Login realizado com sucesso 🚀");

        form.reset();

        limpar();

        botao.value = "Entrar";
        botao.disabled = false;

    }, 2000);

});