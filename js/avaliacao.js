let Salvar = () => {
    let dados = localStorage.info==null?[]:JSON.parse(localStorage.info);
    let NameFilm = document.querySelector("#NameFilm").value;
    let Avaliacao = vNota;
    let Critica = document.querySelector("#Critica").value;
    dados.push({
        'NameFilm': NameFilm,
        Avaliacao : vNota,
        'Critica': Critica,

    })
    localStorage.info = JSON.stringify(dados);
    Listar();
    alert("A Avaliação foi Guardada!");
}

let Listar = () => {
    let dados = localStorage.info==null?[]:JSON.parse(localStorage.info);
    let table = document.getElementById("tDados");
    table.innerHTML = "";
    

    
    dados.forEach(element => {
        
        table.innerHTML += `
        <tr>
            <td>${element.NameFilm}</td>
            <td>${element.Avaliacao} Estrelas</td>
            <td>${element.Critica}</td>
            <td>
                <button class="btn-blue" onclick="Editar('${element.NameFilm}')">Editar</button><br>
                <button class="btn-red" onclick="Deletar('${element.NameFilm}')">Deletar</button>
            </td>
        </tr>
        `;
    });
}

let Editar = (NameF) =>{
    let dados = localStorage.info==null?[]:JSON.parse(localStorage.info);
    let resultado = dados.find(e => e.NameFilm == NameF);
    let resultadoIndex = dados.findIndex(e => e.NameFilm == NameF);
    let NameFilm = document.querySelector("#NameFilm");
    let Critica = document.querySelector("#Critica");
    let id = document.querySelector("#Codigo");
    let bUpdate = document.querySelector("#submitUpdate");
    let bInsert = document.querySelector("#submitInsert");
    if(resultado != undefined){
        bInsert.style.display = "none";
        bUpdate.style.display = "block";
        NameFilm.value = resultado.NameFilm;        
        Critica.value = resultado.Critica;
        id.value = resultadoIndex;
        selecionaStar(resultado.Avaliacao);
    }else{
        alert("Filme não encontrado!");
    }
}

let Modificar = () => {
    let dados = localStorage.info==null?[]:JSON.parse(localStorage.info);
    let NameFilm = document.querySelector("#NameFilm").value;
    let Avaliacao = vNota;
    let Critica = document.querySelector("#Critica").value;
    let id = document.querySelector("#Codigo").value;
    let bUpdate = document.querySelector("#submitUpdate");
    let bInsert = document.querySelector("#submitInsert");
    dados[id].NameFilm = NameFilm;
    dados[id].Avaliacao = Avaliacao;
    dados[id].Critica = Critica;
    bInsert.style.display = "block";
    bUpdate.style.display = "none";
    localStorage.info = JSON.stringify(dados); 
    Listar(); 
    alert("A Avaliação foi Modificada!");
}

let Deletar = (NameF) =>{
    let dados = localStorage.info==null?[]:JSON.parse(localStorage.info);
    let resultadoIndex = dados.findIndex(e => e.NameFilm == NameF);
    var r=confirm("Tem certeza que deseja Excluir?");
    if (r==true)
    {
        if(resultadoIndex != -1){       
            dados.splice(resultadoIndex, 1);
            localStorage.info = JSON.stringify(dados);
            Listar();
        }else{
            alert("Filme não encontrado!");
        }
    }

    
    
}

var vNota = 0;

let defineNota = (n) =>{
    if(n==1){
        vNota = 1;
    }else if(n==2){
        vNota = 2;
    }else if(n==3){
        vNota = 3;
    }else if(n==4){
        vNota = 4;
    }else if(n==5){
        vNota = 5;
    }
}
let selecionaStar = (Star) =>{
    var star5 = document.querySelector("#star5");
    var star4 = document.querySelector("#star4");
    var star3 = document.querySelector("#star3");
    var star2 = document.querySelector("#star2");
    var star1 = document.querySelector("#star1");

    if(Star == 1){
        star1.checked = true;
    }else if(Star == 2){
        star2.checked = true;
    }else if(Star == 3){
        star3.checked = true;
    }else if(Star == 4){
        star4.checked = true;
    }else if(Star == 5){
        star5.checked = true;
    }
}

