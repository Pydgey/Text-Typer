var placarUrl = "http://localhost:3000/placar";

// mostrar / esconder placar 
$("#bPlacar").click(mostrarPlacar);

function mostrarPlacar(){
    $(".placar").stop().slideToggle(1000);
    scroll();
}

// evento de remover linha do placar
function removerPlacar(event){
    event.preventDefault();

    var linha =  $(this).parent().parent();
    linha.fadeOut(1000);
    setTimeout(function(){
        linha.remove();
    }, 2000);
}

// cria os elementos html da linha da tabela
function novaLinha(usuario,nPalavras){
    var linha = $("<tr>");
    var colUsu = $("<td>").text(usuario);
    var colPal = $("<td>").text(nPalavras);
    var colBT = $("<td>");
    var link = $("<a>")
                .addClass("btDelete")
                .attr("href","#");
    var icon = $("<i>")
                .addClass("material-icons")
                .addClass("green-text")
                .addClass("text-accent-2")
                .text("delete");
    
    link.append(icon);
    colBT.append(link);
    linha.append(colUsu);
    linha.append(colPal);
    linha.append(colBT);

    return linha;
}

// pega os elementos do usuario e cria a linha da tabela
function Placar(){
    var tabela = $(".placar").find("tbody");
    var usuario = "jhonson";
    var nPalavras = $("#cont-palav").text();
    var linha = novaLinha(usuario,nPalavras);

    linha.find(".btDelete").click(removerPlacar);
    tabela.prepend(linha);

    $(".placar").slideDown(500);
    scroll();
}

function scroll(){
    var posPlacar = $(".placar").offset().top;
    
    $("html").animate({
        scrollTop: posPlacar + "px"
    }, 1000);
}

$("#bSync").click(syncPlacar);

function syncPlacar(){
    var placar = [];
    var linhas = $("tbody>tr");

    linhas.each(function(){
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();
        var score = {
            usuario: usuario,
            pontos: palavras
        };

        placar.push(score);
    });
    
    var dados = {placar: placar};

    $.post(placarUrl,dados,function(){
        console.log("Placar sincronizado com sucesso");
    })
}

function atualizarPlacar(){
    $.get(placarUrl, function(data){
        $(data).each(function(){
            var linha = novaLinha(this.usuario, this.pontos);
            linha.find(".btDelete").click(removerPlacar);
            $("tbody").append(linha);
        });
    });
}