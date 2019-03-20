function callBackOpcoes(value) {

    return '<a href="#" onclick="editaAutor(' + value + ')" title="Editar" style="margin-left:20%;margin-right:10%"><img src="../img/editar.png" height="25" width="25"/>' +
        '<a href="#" onclick="deletaAutor(' + value + ')" title="Deletar"> <img src="../img/delete.png" height="25" width="25"/>';
}

//Url Com filtro em Rota
function editaAutor(value) {
    window.location.href = '/autores/editar/'+value+'';
}

//Url sem filtro em Rota
function deletaAutor(value) {
    window.location.href = '/autores/editar/?id='+value+'';
}


//function editaAutor(value) {
//    $.ajax({
//        url: '/autores/editar/',
//        type: "POST",
//        data: "{'id':'" + value + "'}",
//        dataType: "json",
//        traditional: true,
//        contentType: "application/json; charset=utf-8",
//        success: function (data) {
//            if (data) {
//                debugger;
//            } else {
//                debugger;
//                alert("Erro ao acessar a pagina");
//            }
//        },
//        error: function () {
//        }
//    });
//}
