var fraseUrl = "http://localhost:3000/frases";

function tamanhoFrase(){
    var frase = $(".frase").text();
    var nPalavras = frase.split(/\S+/).length - 1;
    var tFrase = $("#tFrase");
    tFrase.text(nPalavras);
}

$("#bFrase").click(randomFrase);
$("#bSearch").click(searchFrase);

function randomFrase(){
    $("#spinner").show();

    $.get(fraseUrl,function(data){
        var frase = $(".frase");
        var random =Math.floor(Math.random() * data.length);
        frase.text(data[random].texto);
        tamanhoFrase();
        atualizatempo(data[random].tempo);
        bordas();
    })
    .fail(function(){
        $("#erro").show();
        setTimeout(function(){
            $("#erro").toggle();
        }, 2000);
    })
    .always(function(){
        $("#spinner").toggle();
    });
}

function searchFrase(){
    $("#spinner").show();
    var fraseId = $("#searchId").val();
    var dados = {id: fraseId};

    $.get(fraseUrl,dados,function(data){
        var frase = $(".frase");
        frase.text(data.texto);
        tamanhoFrase();
        atualizatempo(data.tempo);
        bordas();
    })
    .fail(function(){
        $("#erro").show();
        setTimeout(function(){
            $("#erro").toggle();
        }, 2000);
    })
    .always(function(){
        $("#spinner").toggle();
    });
}