// Salvar imagens no localStorage
function salvarImagem(event) {
    const imagensDiv = document.getElementById("imagens");
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgContainer = document.createElement("div");
            imgContainer.classList.add("foto-container");

            const img = document.createElement("img");
            img.src = e.target.result;
            img.classList.add("foto");

            const btn = document.createElement("button");
            btn.innerText = "❌";
            btn.classList.add("apagar");
            btn.onclick = function() {
                imgContainer.remove();
                let imagensSalvas = JSON.parse(localStorage.getItem("imagens")) || [];
                imagensSalvas = imagensSalvas.filter(item => item.src !== e.target.result);
                localStorage.setItem("imagens", JSON.stringify(imagensSalvas));
            };

            const inputDescricao = document.createElement("input");
            inputDescricao.type = "text";
            inputDescricao.placeholder = "Adicionar descrição...";
            inputDescricao.classList.add("descricao");

            inputDescricao.oninput = function() {
                let imagensSalvas = JSON.parse(localStorage.getItem("imagens")) || [];
                let index = imagensSalvas.findIndex(item => item.src === e.target.result);
                if (index !== -1) {
                    imagensSalvas[index].descricao = inputDescricao.value;
                    localStorage.setItem("imagens", JSON.stringify(imagensSalvas));
                }
            };

            imgContainer.appendChild(img);
            imgContainer.appendChild(inputDescricao);
            imgContainer.appendChild(btn);
            imagensDiv.appendChild(imgContainer);

            let imagensSalvas = JSON.parse(localStorage.getItem("imagens")) || [];
            imagensSalvas.push({ src: e.target.result, descricao: "" });
            localStorage.setItem("imagens", JSON.stringify(imagensSalvas));
        };
        reader.readAsDataURL(file);
    }
}

// Carregar imagens salvas
function carregarImagens() {
    const imagensDiv = document.getElementById("imagens");
    let imagensSalvas = JSON.parse(localStorage.getItem("imagens")) || [];

    imagensSalvas.forEach(imagem => {
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("foto-container");

        const img = document.createElement("img");
        img.src = imagem.src;
        img.classList.add("foto");

        const btn = document.createElement("button");
        btn.innerText = "❌";
        btn.classList.add("apagar");
        btn.onclick = function() {
            imgContainer.remove();
            let imagensSalvas = JSON.parse(localStorage.getItem("imagens")) || [];
            imagensSalvas = imagensSalvas.filter(item => item.src !== imagem.src);
            localStorage.setItem("imagens", JSON.stringify(imagensSalvas));
        };

        const inputDescricao = document.createElement("input");
        inputDescricao.type = "text";
        inputDescricao.placeholder = "Adicionar descrição...";
        inputDescricao.value = imagem.descricao;
        inputDescricao.classList.add("descricao");

        inputDescricao.oninput = function() {
            let imagensSalvas = JSON.parse(localStorage.getItem("imagens")) || [];
            let index = imagensSalvas.findIndex(item => item.src === imagem.src);
            if (index !== -1) {
                imagensSalvas[index].descricao = inputDescricao.value;
                localStorage.setItem("imagens", JSON.stringify(imagensSalvas));
            }
        };

        imgContainer.appendChild(img);
        imgContainer.appendChild(inputDescricao);
        imgContainer.appendChild(btn);
        imagensDiv.appendChild(imgContainer);
    });
}

// Enviar mensagens
function enviarMensagem(event) {
    event.preventDefault();
    const mensagensDiv = document.getElementById("mensagens");
    const texto = document.getElementById("texto").value;

    if (texto.trim() !== "") {
        const p = document.createElement("p");
        p.innerText = texto;
        mensagensDiv.appendChild(p);

        document.getElementById("texto").value = "";
    }
}

window.onload = function() {
    carregarImagens();
    document.getElementById("form-mensagem").addEventListener("submit", enviarMensagem);
};