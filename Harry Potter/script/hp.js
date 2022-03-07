async function Init() {
    carregar(0);
    document.body.setAttribute('data-theme', 't-gryffindor');
    document.querySelector("#carregar").addEventListener("click", carregarPersonagens);
    document.querySelector("#carregaraz").addEventListener("click", carregarPersonagensSortAZ);
    document.querySelector("#carregarza").addEventListener("click", carregarPersonagensSortZA);
    document.querySelector("#filtrar").addEventListener("click", filtrarNome);
    document.querySelector('#professores').addEventListener("click", filtrarProfessores);
    document.querySelector('#alunos').addEventListener("click", filtrarAlunos);
    document.querySelector('#gryffindor').addEventListener("click", filtrarGryffindor);
    document.querySelector('#slytherin').addEventListener("click", filtrarSlytherin);
    document.querySelector('#hufflepuff').addEventListener("click", filtrarHufflepuff);
    document.querySelector('#ravenclaw').addEventListener("click", filtrarRavenclaw);
}

let url= 'https://hp-api.herokuapp.com/api/characters';

async function carregar(sort) {
    let content = document.querySelector("section");
    content.innerHTML = '';
    let personagens;

    personagens = await consultar();

    if (sort === 0) {

    }
    if (sort === 1) {
        personagens = personagens.sort(function (a, b) {
            return a.name > b.name ? 1 : -1;
        });
    }
    if (sort === 2) {
        personagens = personagens.sort(function (a, b) {
            return a.name < b.name ? 1 : -1;
        });
    }
    if (sort === 3) {
        filtroNome = document.querySelector("#nome").value;
        function filterByValue(array, value) {
            return array.filter((data) => JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1);
        }
        personagens = filterByValue(personagens, filtroNome);
    }

    console.log(personagens.results);

    for (let personagem of personagens) {
        criarDiv(personagem.name, personagem.actor, personagem.dateOfBirth,
            personagem.eyeColour, personagem.house, personagem.image);
    }
    SetAllImages();
}

async function filtrarProfessores(event) {
    event.preventDefault();
    url= 'https://hp-api.herokuapp.com/api/characters/staff';
    carregar(0);
}

async function filtrarAlunos(event) {
    event.preventDefault();
    url= 'https://hp-api.herokuapp.com/api/characters/students';
    carregar(0);
}

async function filtrarGryffindor(event) {
    event.preventDefault();
    document.body.setAttribute('data-theme', 't-gryffindor');
    url= 'https://hp-api.herokuapp.com/api/characters/house/gryffindor';
    carregar(0);
}

async function filtrarSlytherin(event) {
    event.preventDefault();
    document.body.setAttribute('data-theme', 't-slytherin');
    url= 'https://hp-api.herokuapp.com/api/characters/house/slytherin';
    carregar(0);
}

async function filtrarHufflepuff(event) {
    event.preventDefault();
    document.body.setAttribute('data-theme', 't-hufflepuff');
    url= 'https://hp-api.herokuapp.com/api/characters/house/hufflepuff';
    carregar(0);
}

async function filtrarRavenclaw(event) {
    event.preventDefault();
    document.body.setAttribute('data-theme', 't-ravenclaw');
    url= 'https://hp-api.herokuapp.com/api/characters/house/ravenclaw';
    carregar(0);
}

async function backToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function carregarPersonagens(event) {
    event.preventDefault();
    url= 'https://hp-api.herokuapp.com/api/characters'
    carregar(0);
}

async function carregarPersonagensSortAZ(event) {
    event.preventDefault();
    carregar(1);
}

async function carregarPersonagensSortZA(event) {
    event.preventDefault();
    carregar(2);
}

async function filtrarNome(event) {
    event.preventDefault();
    carregar(3);
}

function criarDiv(nome, ator, nascimento, corolhos, casa, imagem) {
    let divPai = document.createElement("div");
    let divContent = document.createElement("div");
    let divImagem = document.createElement("div");
    let divCol2 = document.createElement("div");
    let divPersonagem = document.createElement("div");
    let divLinha1 = document.createElement("div");
    let divAtor = document.createElement("div");
    let divNascimento = document.createElement("div");
    let divLinha2 = document.createElement("div");
    let divOlhos = document.createElement("div");
    let divCasa = document.createElement("div");

    divPai.setAttribute("class", "col-6 pai mb-4")
    divContent.setAttribute("class", "p-3 m-2 h-100 rounded content ");
    divImagem.setAttribute("class", "col-3");
    divImagem.innerHTML = "<img id=\"myImg\" class=\"miniatura\" src=\"" + imagem + "\" />";
    divCol2.setAttribute("class", "col-9 mt-2");
    divPersonagem.setAttribute("class", "row");
    divPersonagem.innerHTML = "<h1>" + nome + "</h1>";
    divLinha1.setAttribute("class", "row mb-3");
    divAtor.setAttribute("class", "col-6");
    divAtor.innerHTML = "<h4>Ator:</h4><h5>" + ator + "</h5>";
    divNascimento.setAttribute("class", "col-6");
    divNascimento.innerHTML = "<h4>Nascimento:</h4><h5>" + nascimento + "</h5>";
    divLinha2.setAttribute("class", "row");
    divOlhos.setAttribute("class", "col-6");
    divOlhos.innerHTML = "<h4>Cor dos Olhos:</h4><h5>" + corolhos + "</h5>";
    divCasa.setAttribute("class", "col-6");
    divCasa.innerHTML = "<h4>Casa:</h4><h5>" + casa + "</h5>";

    divPai.appendChild(divContent);
    divContent.appendChild(divImagem);
    divContent.appendChild(divCol2);
    divCol2.appendChild(divPersonagem);
    divCol2.appendChild(divLinha1);
    divCol2.appendChild(divLinha2);
    divLinha1.appendChild(divAtor);
    divLinha1.appendChild(divNascimento);
    divLinha2.appendChild(divOlhos);
    divLinha2.appendChild(divCasa);

    let content = document.querySelector("section");
    content.appendChild(divPai);
}

async function consultar() {
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (err) {
        console.log(err);
    }
}

async function SetAllImages() {
    var images = document.getElementsByClassName("miniatura");
    for (var i = 0; i < images.length; i++) {
        var img = images[i].getAttribute("src");
        images[i].setAttribute("onclick", "OpenModal('" + img + "')");
    }
}

async function OpenModal(src) {
    dvContent.innerHTML = "";
    var img = document.createElement("img");
    img.src = src;
    dvContent.appendChild(img);
    dvModal.style.display = "block";
    dvModal.setAttribute("onclick", "CloseModal()");
}

async function CloseModal() {
    dvModal.style.display = "none";
}

const themes = {
    't-gryffindor': 't-slytherin',
    't-slytherin': 't-hufflepuff',
    't-hufflepuff': 't-ravenclaw',
    't-ravenclaw': 't-gryffindor',
}

const btn = document.querySelector('.js-theme');
if (btn){
    btn.addEventListener('click', event => {
        event.preventDefault();
        const currentTheme = document.body.dataset.theme;
        document.body.setAttribute('data-theme', themes[currentTheme] || 't-gryffindor');
    });
}
