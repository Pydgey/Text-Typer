var tempoInicial = $("#tempo").text();
var campo = $(".cDigita");

$(function(){
    tamanhoFrase();
    inicializaContadores();
    inicializaCrono();
    $("#bReStart").click(ReStart);
    bordas();
    atualizarPlacar();
    $("#Selec-usu").selectize({
        create: true,
        sortField: 'text'
    })
});

function inicializaContadores(){
    campo.on("input", function(){
        var conteudo = campo.val();
        var qtCarac = conteudo.length;
        var qtPalav = conteudo.split(/\S+/).length - 1 ;
        
        $("#cont-carac").text(qtCarac);
        $("#cont-palav").text(qtPalav);
    });
}

function inicializaCrono(){
    campo.one("focus", function(){
        var tempo = $("#tempo").text();
        var timer = setInterval(function(){
            tempo --;
            $("#tempo").text(tempo);        
            if(tempo < 1){
                campo.attr("disabled", true);
                clearInterval(timer);
                campo.toggleClass("desable")
                Placar();
            }
        },1000);
    })
}

function ReStart(){
    campo.attr("disabled",false);
    campo.val("");
    $("#cont-carac").text(0);
    $("#cont-palav").text(0);
    $("#tempo").text(tempoInicial);
    inicializaCrono();
    campo.removeClass("desable");
    campo.removeClass("truer");
    campo.removeClass("error");
}

function bordas(){
    var frase = $(".frase").text();
    campo.on("input", function(){
        var digitado = campo.val(); 
        var comparavel = frase.substr(0, digitado.length);
        
        if(digitado == comparavel) {
            campo.addClass("truer");
            campo.removeClass("error");
        }else {
            campo.addClass("error");
            campo.removeClass("truer");
        }  
    })
}

function atualizatempo(tempo){
    tempoInicial = tempo;
    $("#tempo").text(tempo);
}