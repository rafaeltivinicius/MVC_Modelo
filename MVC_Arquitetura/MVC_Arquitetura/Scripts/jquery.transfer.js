
var Transfer = (function ($) {
    // 全局变量，已选择项个数
    var selected_total_num = 0;
    // 当前时间，作为 id 使用
    var currentTimeStr = (new Date()).getTime() + parseInt(10000 * Math.random());
    // input 的 id
    var inputId = "";

    /**
     * 构造穿梭框
     * @param settings 设置项
     */
    function transfer(settings) {
        debugger;
        inputId = settings.inputId;
        // O nome do item de dados
        var itemName = settings.itemName;
        // Nome do grupo
        var groupItemName = settings.groupItemName;
        //Nome da lista agrupada
        var groupListName = settings.groupListName;
        // O nome do valor
        var valueName = settings.valueName;
        // 容器
        var container = "." + settings.container;
        // Nome da função de retorno de chamada para alteração de dados de valor
        var callable = settings.callable;
        // Shuttle box
        var transferId = "#transfer_double_" + inputId;

        // Receber caixa de texto selecionada
        var selectInputId = "#" + inputId;

        // Listar dados
        var data = settings.data || [];
        //Dados da lista de grupos
        var groupData = settings.groupData || [];

        // Número total de itens de dados
        var total_num = settings.data.length;
        // Número total de texto
        var total_num_str = settings.data.length + " Itens";

        // Número total de grupos
        var total_group_num = getGroupNum(groupData, groupListName);
        // Número total de grupos para exibir texto
        var total_group_num_str = total_group_num + " Itens";

        // Novo número total
        var new_total_num = 0;
        // O número total de novos grupos
        var new_group_total_num = 0;

        // Página de guia
        var tabItemName = ".tab-item-name-" + currentTimeStr;
        // Conteúdo da guia
        var transferDoubleList = ".transfer-double-list-" + currentTimeStr;

        //Caixa de pesquisa à esquerda id
        var listSearchId = "#listSearch_" + currentTimeStr;
        // Caixa de pesquisa de grupo à esquerda id
        var groupListSearchId = "#groupListSearch_" + currentTimeStr;
        //  Caixa de pesquisa direita id
        var selectedListSearchId = "#selectedListSearch_" + currentTimeStr;

        //Itens não selecionados à esquerda
        var tabContentFirst = ".tab-content-first-" + currentTimeStr;
        // Lista de itens não selecionados à esquerda ul
        var transferDoubleListUl = ".transfer-double-list-ul-" + currentTimeStr;
        // Lista de itens não selecionados à esquerda li
        var transferDoubleListLi = ".transfer-double-list-li-" + currentTimeStr;
        // Listar item à esquerda checkbox
        var checkboxItem = ".checkbox-item-" + currentTimeStr;
        //Listar nome do item à esquerda
        var checkboxName = ".checkbox-name-" + currentTimeStr;
        // Número total de elementos à esquerda
        var totalNum = ".total_num_" + currentTimeStr;
        // Selecione todos os itens à esquerda da lista não selecionadaid
        var selectAllId = "#selectAll_" + currentTimeStr;

        // Lista de grupos à esquerda ul
        var transferDoubleGroupListUl = ".transfer-double-group-list-ul-" + currentTimeStr;
        // Lista de grupos à esquerda li
        var transferDoubleGroupListLi = ".transfer-double-group-list-li-" + currentTimeStr;
        // Agrupando lista à esquerda，É uma seleção de grupo，Nem todos
        var groupSelectAll = ".group-select-all-" + currentTimeStr;
        //  Nome do grupo da lista de nomes de grupos à esquerda
        var groupName = ".group-name-" + currentTimeStr;
        // Grupos diferentes à esquerda ul
        var transferDoubleGroupListLiUl = ".transfer-double-group-list-li-ul-" + currentTimeStr;
        //Grupos diferentes à esquerda li
        var transferDoubleGroupListLiUlLi = ".transfer-double-group-list-li-ul-li-" + currentTimeStr;
        // Grupos diferentes à esquerda checkbox
        var groupCheckboxItem = ".group-checkbox-item-" + currentTimeStr;
        // Diferentes nomes de opções de agrupamento à esquerda
        var groupCheckboxName = ".group-checkbox-name-" + currentTimeStr;
        // Número total de grupos no elemento de exibição à esquerda
        var groupTotalNum = ".group_total_num_" + currentTimeStr;
        // A lista de grupos não está selecionada à esquerda id
        var groupsSelectAllId = "#groupsSelectAll_" + currentTimeStr;

        // Lista correta ul
        var transferDoubleSelectedListUl = ".transfer-double-selected-list-ul-" + currentTimeStr;
        // Lista correta li
        var transferDoubleSelectedListLi = ".transfer-double-selected-list-li-" + currentTimeStr;
        // Item selecionado na lista da direita
        var checkboxSelectedItem = ".checkbox-selected-item-" + currentTimeStr;
        // Lado direito lista nome do item selecionado
        var checkboxSelectedName = ".checkbox-selected-name-" + currentTimeStr;
        // Seleção do lado direito id，Reservado para uso subseqüente
        var selectedAllId = "#selectedAll_" + currentTimeStr;
        // Número total de elementos à direita
        var selectedTotalNum = ".selected_total_num_" + currentTimeStr;

        // Adicionar botão à direita
        var addSelected = "#add_selected_" + currentTimeStr;
        // Adicionar botão à esquerda
        var deleteSelected = "#delete_selected_" + currentTimeStr;


        // Renderização da caixa de transporte
        $(container).append(generateTransfer(inputId, currentTimeStr));

        /**
         * Chama Função que Carrega lado Esquerdo
         */
        $(transferId).find(transferDoubleListUl).empty();
        $(transferId).find(transferDoubleListUl).append(generateLeftList(currentTimeStr, data, itemName, valueName));
        $(transferId).find(totalNum).empty();
        $(transferId).find(totalNum).append(total_num_str);

        $(transferId).find(transferDoubleGroupListUl).empty();
        $(transferId).find(transferDoubleGroupListUl).append(generateLeftGroupList(currentTimeStr, groupData, itemName, groupListName, groupItemName, valueName));
        $(transferId).find(groupTotalNum).empty();
        $(transferId).find(groupTotalNum).append(total_group_num_str);

        /**
         * Chama Função que Carrega lado Direito
         */
        $(transferId).find(transferDoubleListUl).empty();
        $(transferId).find(transferDoubleListUl).append(generateLeftList(currentTimeStr, data, itemName, valueName));
        $(transferId).find(totalNum).empty();
        $(transferId).find(totalNum).append(total_num_str);

        $(transferId).find(transferDoubleGroupListUl).empty();
        $(transferId).find(transferDoubleGroupListUl).append(generateLeftGroupList(currentTimeStr, groupData, itemName, groupListName, groupItemName, valueName));
        $(transferId).find(groupTotalNum).empty();
        $(transferId).find(groupTotalNum).append(total_group_num_str);

        /**
         Clique na guia para alternar
         */
        $(transferId).find(tabItemName).on("click", function () {
            $(selectAllId).prop("checked", false);
            if (!$(this).is(".tab-active")) {
                $(this).addClass("tab-active").siblings().removeClass("tab-active");
                $(transferDoubleList).eq($(transferId).find(tabItemName).index(this)).addClass("tab-content-active").siblings().removeClass("tab-content-active");
                $(transferId).find(".checkbox-normal").each(function () {
                    $(this).prop("checked", false);
                });
                $(addSelected).removeClass("btn-arrow-active");
                $(transferId).find(transferDoubleSelectedListUl).empty();
                // Limpar o número à direita
                $(transferId).find(selectedTotalNum).text("0 Itens");
                // Item não selecionado
                if ($(transferId).find(tabContentFirst).css("display") != "none") {
                    $(transferId).find(transferDoubleGroupListLiUlLi).each(function () {
                        $(this).css('display', 'block');
                    });
                    $(transferId).find(groupCheckboxItem).each(function () {
                        $(this).prop("checked", false);
                    });

                    $(transferId).find(selectAllId).prop("disabled", "");

                    $(transferId).find(groupTotalNum).empty();
                    $(transferId).find(groupTotalNum).append($(transferId).find(transferDoubleGroupListLiUlLi).length + " Itens");
                } else {
                    // Agrupamento

                    // Vazio disabled
                    for (var j = 0; j < $(transferId).find(groupSelectAll).length; j++) {
                        $(transferId).find(groupSelectAll).eq(j).prop("disabled", "");
                    }
                    $(transferId).find(groupsSelectAllId).prop("disabled", "");

                    $(transferId).find(transferDoubleListLi).each(function () {
                        $(this).css('display', 'block');
                    });
                    $(transferId).find(checkboxItem).each(function () {
                        $(this).prop("checked", false);
                    });
                    $(transferId).find(totalNum).empty();
                    $(transferId).find(totalNum).append($(transferId).find(transferDoubleListLi).length + " Itens");
                }
                // Alteração de dados aciona retorno de chamada
                callable.call(this, getSelected(), getSelectedName());
                // Botão de alternância de etiqueta modificado para inativo
                $(addSelected).removeClass("btn-arrow-active");
                $(deleteSelected).removeClass("btn-arrow-active");
            }
        });

        /**
         guarda Itens Selecionados da Esquerda (Que NÂO estão associados)
         */
        $(transferId).on("click", checkboxItem, function () {
            var selected_num = 0;
            for (var i = 0; i < $(transferId).find(checkboxItem).length; i++) {
                if ($(transferId).find(transferDoubleListLi).eq(i).css('display') != "none" && $(transferId).find(checkboxItem).eq(i).is(':checked')) {
                    selected_num++;
                }
            }
            if (selected_num > 0) {
                $(addSelected).addClass("btn-arrow-active");
            } else {
                $(addSelected).removeClass("btn-arrow-active");
            }
        });

        /**
         * Ouça o lado esquerdo do grupo checkBox está selecionado
         */
        $(transferId).on("click", groupCheckboxItem, function () {
            var selected_num = 0;
            for (var i = 0; i < $(transferId).find(groupCheckboxItem).length; i++) {
                if ($(transferId).find(transferDoubleGroupListLiUlLi).eq(i).css('display') != "none" && $(transferId).find(groupCheckboxItem).eq(i).is(':checked')) {
                    selected_num++;
                }
            }
            if (selected_num > 0) {
                $(addSelected).addClass("btn-arrow-active");
            } else {
                $(addSelected).removeClass("btn-arrow-active");
            }
        });

        // Monitore o item não selecionado no lado direito CheckBox está selecionado
        $(transferId).on("click", checkboxSelectedItem, function () {
            var deleted_num = 0;
            for (var i = 0; i < $(transferId).find(checkboxSelectedItem).length; i++) {
                if ($(transferId).find(checkboxSelectedItem).eq(i).is(':checked')) {
                    deleted_num++;
                }
            }
            if (deleted_num > 0) {
                $(deleteSelected).addClass("btn-arrow-active");
            } else {
                $(deleteSelected).removeClass("btn-arrow-active");
            }
        });

        //Marque ou desmarque todos os itens não selecionados no grupo
        $(groupSelectAll).on("click", function () {
            // Índice de grupo
            var groupIndex = ($(this).attr("id")).split("_")[1];
            // um grupo é selecionado
            if ($(this).is(':checked')) {
                // Botão de ativação
                $(addSelected).addClass("btn-arrow-active");
                for (var i = 0; i < $(transferId).find(".belongs-group-" + groupIndex + "-" + currentTimeStr).length; i++) {
                    if (!$(transferId).find(".belongs-group-" + groupIndex + "-" + currentTimeStr).eq(i).is(':checked') && $(transferId).find(".belongs-group-" + groupIndex + "-" + currentTimeStr).eq(i).parent().parent().css("display") != "none") {
                        // Se usado aqui attr，Haverá uma terceira falha
                        $(transferId).find(".belongs-group-" + groupIndex + "-" + currentTimeStr).eq(i).prop("checked", true);
                    }
                }
                var groupCheckedNum = 0;
                $(transferId).find(groupSelectAll).each(function () {
                    if ($(this).is(":checked")) {
                        groupCheckedNum = groupCheckedNum + 1;
                    }
                });
                if (groupCheckedNum == $(transferId).find(groupSelectAll).length) {
                    $(groupsSelectAllId).prop("checked", true);
                }
            } else {
                for (var j = 0; j < $(transferId).find(".belongs-group-" + groupIndex + "-" + currentTimeStr).length; j++) {
                    if ($(transferId).find(".belongs-group-" + groupIndex + "-" + currentTimeStr).eq(j).is(':checked') && $(transferId).find(".belongs-group-" + groupIndex + "-" + currentTimeStr).eq(i).parent().parent().css("display") != "none") {
                        $(transferId).find(".belongs-group-" + groupIndex + "-" + currentTimeStr).eq(j).prop("checked", false);
                    }
                }
                var groupCheckedNum = 0;
                $(transferId).find(groupSelectAll).each(function () {
                    if ($(this).is(":checked")) {
                        groupCheckedNum = groupCheckedNum + 1;
                    }
                });
                if (groupCheckedNum != $(transferId).find(groupSelectAll).length) {
                    $(groupsSelectAllId).prop("checked", false);
                }
                if (groupCheckedNum == 0) {
                    $(addSelected).removeClass("btn-arrow-active");
                }
            }
        });

        /**
         *Lista de seleção
         */
        $(selectAllId).on("click", function () {
            if ($(this).is(':checked')) {
                for (var i = 0; i < $(transferId).find(checkboxItem).length; i++) {
                    if ($(transferId).find(transferDoubleListLi).eq(i).css('display') != "none" && !$(transferId).find(checkboxItem).eq(i).is(':checked')) {
                        //Se usado aqui attr，Haverá uma terceira falha
                        $(transferId).find(checkboxItem).eq(i).prop("checked", true);
                    }
                }
                $(addSelected).addClass("btn-arrow-active");
            } else {
                for (var i = 0; i < $(transferId).find(checkboxItem).length; i++) {
                    if ($(transferId).find(transferDoubleListLi).eq(i).css('display') != "none" && $(transferId).find(checkboxItem).eq(i).is(':checked')) {
                        $(transferId).find(checkboxItem).eq(i).prop("checked", false);
                    }
                }
                $(addSelected).removeClass("btn-arrow-active");
            }
        });

        /**
         * Seleção de grupo
         */
        $(groupsSelectAllId).on("click", function () {
            if ($(this).is(':checked')) {
                for (var i = 0; i < $(transferId).find(groupCheckboxItem).length; i++) {
                    if ($(transferId).find(transferDoubleGroupListLiUlLi).eq(i).css('display') != "none" && !$(transferId).find(groupCheckboxItem).eq(i).is(':checked')) {
                        // Se usado aqui attr，Haverá uma terceira falha
                        $(transferId).find(groupCheckboxItem).eq(i).prop("checked", true);
                    }
                    if (!$(transferId).find(groupSelectAll).eq(i).is(':checked')) {
                        $(transferId).find(groupSelectAll).eq(i).prop("checked", true);
                    }
                }
                $(addSelected).addClass("btn-arrow-active");
            } else {
                for (var i = 0; i < $(transferId).find(groupCheckboxItem).length; i++) {
                    if ($(transferId).find(transferDoubleGroupListLiUlLi).eq(i).css('display') != "none" && $(transferId).find(groupCheckboxItem).eq(i).is(':checked')) {
                        $(transferId).find(groupCheckboxItem).eq(i).prop("checked", false);
                    }
                    if ($(transferId).find(groupSelectAll).eq(i).is(':checked')) {
                        $(transferId).find(groupSelectAll).eq(i).prop("checked", false);
                    }
                }
                $(addSelected).removeClass("btn-arrow-active");
            }
        });

        /**
         Move Item Para a Direita (Associados)
         */
        $(addSelected).on("click", function () {
            var listHtmlStr = "";
            var selectedItemNum = 0;
            // Agrupamento
            if ($(transferId).find(tabContentFirst).css("display") != "none") {
                for (var i = 0; i < $(transferId).find(groupCheckboxItem).length; i++) {
                    if ($(transferId).find(groupCheckboxItem).eq(i).is(':checked')) {
                        var checkboxItemId = $(transferId).find(groupCheckboxItem).eq(i).attr("id");
                        var checkboxItemArray = checkboxItemId.split("_");
                        var groupIdIndex = checkboxItemArray[1];
                        var idIndex = checkboxItemArray[3];
                        var val = $(transferId).find(groupCheckboxName).eq(i).text();
                        var value = $(transferId).find(groupCheckboxItem).eq(i).val();
                        $(transferId).find(transferDoubleGroupListLiUlLi).eq(i).css('display', 'none');
                        listHtmlStr = listHtmlStr + '<li class="transfer-double-selected-list-li transfer-double-selected-list-li-' + currentTimeStr + ' .clearfix">' +
                            '<div class="checkbox-group">' +
                            '<input type="checkbox" value="' + value + '" class="checkbox-normal checkbox-selected-item-' + currentTimeStr + '" id="group_' + groupIdIndex + '_selectedCheckbox_' + idIndex + '_' + currentTimeStr + '">' +
                            '<label class="checkbox-selected-name-' + currentTimeStr + '" for="group_' + groupIdIndex + '_selectedCheckbox_' + idIndex + '_' + currentTimeStr + '">' + val + '</label>' +
                            '</div>' +
                            '</li>'
                        selectedItemNum = selectedItemNum + 1;
                    }
                }
                for (var j = 0; j < $(transferId).find(groupSelectAll).length; j++) {
                    if ($(transferId).find(groupSelectAll).eq(j).is(":checked")) {
                        $(transferId).find(groupSelectAll).eq(j).prop("disabled", "disabled");
                    }
                }
                $(transferId).find(groupTotalNum).empty();
                // Calcular o total do lado esquerdo
                new_group_total_num = total_group_num - selectedItemNum;
                // Calcular o lado direito total
                selected_total_num = selectedItemNum;
                var new_total_num_str = new_group_total_num + " Itens";
                // Número à esquerda
                $(transferId).find(groupTotalNum).append(new_total_num_str);
                // Número de quantidades à direita
                $(transferId).find(selectedTotalNum).text(selected_total_num + " Itens");
                if (new_group_total_num == 0) {
                    $(groupsSelectAllId).prop("checked", true);
                    $(groupsSelectAllId).prop("disabled", "disabled");
                }
            } else {
                // Item não selecionado
                for (var i = 0; i < $(transferId).find(checkboxItem).length; i++) {
                    if ($(transferId).find(checkboxItem).eq(i).is(':checked')) {
                        var checkboxItemId = $(transferId).find(checkboxItem).eq(i).attr("id");
                        var idIndex = checkboxItemId.split("_")[1];
                        var val = $(transferId).find(checkboxName).eq(i).text();
                        var value = $(transferId).find(checkboxItem).eq(i).val();
                        $(transferId).find(transferDoubleListLi).eq(i).css('display', 'none');
                        listHtmlStr = listHtmlStr + '<li class="transfer-double-selected-list-li  transfer-double-selected-list-li-' + currentTimeStr + ' .clearfix">' +
                            '<div class="checkbox-group">' +
                            '<input type="checkbox" value="' + value + '" class="checkbox-normal checkbox-selected-item-' + currentTimeStr + '" id="selectedCheckbox_' + idIndex + '_' + currentTimeStr + '">' +
                            '<label class="checkbox-selected-name-' + currentTimeStr + '" for="selectedCheckbox_' + idIndex + '_' + currentTimeStr + '">' + val + '</label>' +
                            '</div>' +
                            '</li>';
                        selectedItemNum = selectedItemNum + 1;
                    }
                }
                $(transferId).find(totalNum).empty();
                // Calcular o número total de lados esquerdos
                new_total_num = total_num - selectedItemNum;
                // Calcular o lado direito total
                selected_total_num = selectedItemNum;
                var new_total_num_str = new_total_num + " Items";
                // Número à esquerda
                $(transferId).find(totalNum).append(new_total_num_str);
                // Número à direita
                $(transferId).find(selectedTotalNum).text(selected_total_num + " Itens");
                if (new_total_num == 0) {
                    $(selectAllId).prop("checked", true);
                    $(selectAllId).prop("disabled", "disabled");
                }
            }
            $(addSelected).removeClass("btn-arrow-active");
            $(transferId).find(transferDoubleSelectedListUl).empty();
            $(transferId).find(transferDoubleSelectedListUl).append(listHtmlStr);
            // aciona retorno de chamada
            callable.call(this, getSelected(), getSelectedName());
        });

        /**
         Move Item para Esquerda (Desassociados)
         */
        $(deleteSelected).on("click", function () {
            var deleteItemNum = 0;
            // 分组
            if ($(transferId).find(tabContentFirst).css("display") != "none") {
                for (var i = 0; i < $(transferId).find(checkboxSelectedItem).length;) {
                    if ($(transferId).find(checkboxSelectedItem).eq(i).is(':checked')) {
                        var checkboxSelectedItemId = $(transferId).find(checkboxSelectedItem).eq(i).attr("id");
                        var groupItemIdArray = checkboxSelectedItemId.split("_")
                        var groupId = groupItemIdArray[1];
                        var idIndex = groupItemIdArray[3];
                        $(transferId).find(transferDoubleSelectedListLi).eq(i).remove();
                        $(transferId).find("#group_" + groupId + "_" + currentTimeStr).prop("checked", false);
                        $(transferId).find("#group_" + groupId + "_" + currentTimeStr).removeAttr("disabled");
                        $(transferId).find("#group_" + groupId + "_checkbox_" + idIndex + "_" + currentTimeStr).prop("checked", false);
                        $(transferId).find("#group_" + groupId + "_checkbox_" + idIndex + "_" + currentTimeStr).parent().parent().css('display', 'block');
                        deleteItemNum = deleteItemNum + 1;
                    } else {
                        i++;
                    }
                }
                $(transferId).find(groupTotalNum).empty();
                // 计算左侧总数
                new_group_total_num = new_group_total_num + deleteItemNum;
                // 计算右侧总数
                selected_total_num -= deleteItemNum;
                var new_total_num_str = new_group_total_num + " Itens";
                // 左侧总数
                $(transferId).find(groupTotalNum).append(new_total_num_str);
                // 右侧总数
                $(transferId).find(selectedTotalNum).text(selected_total_num + " Itens");
                if ($(groupsSelectAllId).is(':checked')) {
                    $(groupsSelectAllId).prop("checked", false);
                    $(groupsSelectAllId).removeAttr("disabled");
                }
            } else {
                // 未选中项
                for (var i = 0; i < $(transferId).find(checkboxSelectedItem).length;) {
                    if ($(transferId).find(checkboxSelectedItem).eq(i).is(':checked')) {
                        var checkboxSelectedItemId = $(transferId).find(checkboxSelectedItem).eq(i).attr("id");
                        var idIndex = checkboxSelectedItemId.split("_")[1];
                        var val = $(transferId).find(checkboxSelectedName).eq(i).text();
                        $(transferId).find(transferDoubleSelectedListLi).eq(i).remove();
                        $(transferId).find(checkboxItem).eq(idIndex).prop("checked", false);
                        $(transferId).find(transferDoubleListLi).eq(idIndex).css('display', 'block');
                        deleteItemNum = deleteItemNum + 1;
                    } else {
                        i++;
                    }
                }
                $(transferId).find(totalNum).empty();
                // 计算左侧总数
                new_total_num = new_total_num + deleteItemNum;
                // 计算右侧总数
                selected_total_num -= deleteItemNum;
                var new_total_num_str = new_total_num + " Itens";
                // 左侧总数
                $(transferId).find(totalNum).append(new_total_num_str);
                // 右侧总数
                $(transferId).find(selectedTotalNum).text(selected_total_num + " Itens");
                if ($(selectAllId).is(':checked')) {
                    $(selectAllId).prop("checked", false);
                    $(selectAllId).removeAttr("disabled");
                }
            }
            $(deleteSelected).removeClass("btn-arrow-active");
            // 数据变化触发回调
            callable.call(this, getSelected(), getSelectedName());
        });

        /**
         * Consulta difusa esquerda
         */
        $(listSearchId).on("keyup", function () {
            // Basta entrar na caixa de listagem
            $(transferId).find(transferDoubleListUl).css('display', 'block');
            // Se nada for preenchido, mantenha todos os status de exibição
            if ($(listSearchId).val() == "") {
                for (var i = 0; i < $(transferId).find(checkboxItem).length; i++) {
                    if (!$(transferId).find(checkboxItem).eq(i).is(':checked')) {
                        $(transferId).find(transferDoubleListLi).eq(i).css('display', 'block');
                    }
                }
                return;
            }

            // Se preenchido，Ocultar todas as opções primeiro
            $(transferId).find(transferDoubleListLi).css('display', 'none');

            for (var j = 0; j < $(transferId).find(transferDoubleListLi).length; j++) {
                // Correspondência difusa，Mostrar todos os jogos
                if (!$(transferId).find(checkboxItem).eq(j).is(':checked')
                    && $(transferId).find(transferDoubleListLi).eq(j).text()
                        .substr(0, $(listSearchId).val().length).toLowerCase() == $(listSearchId).val().toLowerCase()) {
                    $(transferId).find(transferDoubleListLi).eq(j).css('display', 'block');
                }
            }
        });

        /**
         * Consulta difusa do grupo à esquerda
         */
        $(groupListSearchId).on("keyup", function () {
            // Basta entrar na caixa de listagem
            $(transferId).find(transferDoubleGroupListUl).css('display', 'block');
            // Se nada for preenchido，Mantenha todo o status de exibição
            if ($(groupListSearchId).val() == "") {
                for (var i = 0; i < $(transferId).find(groupCheckboxItem).length; i++) {
                    if (!$(transferId).find(checkboxItem).eq(i).is(':checked')) {
                        // Agrupamento li Alterar para exibir
                        $(transferId).find(transferDoubleGroupListLiUlLi).eq(i).parent().parent().css('display', 'block');
                        // Agrupe cada li Alterar para exibir
                        $(transferId).find(transferDoubleGroupListLiUlLi).eq(i).css('display', 'block');
                    }
                }
                return;
            }

            // Se preenchido， Ocultar todas as opções primeiro
            $(transferId).find(transferDoubleGroupListLi).css('display', 'none');
            $(transferId).find(transferDoubleGroupListLiUlLi).css('display', 'none');

            for (var j = 0; j < $(transferId).find(transferDoubleGroupListLiUlLi).length; j++) {
                // Correspondência difusa，Mostrar todos os jogos
                if (!$(transferId).find(groupCheckboxItem).eq(j).is(':checked')
                    && $(transferId).find(transferDoubleGroupListLiUlLi).eq(j).text()
                        .substr(0, $(groupListSearchId).val().length).toLowerCase() == $(groupListSearchId).val().toLowerCase()) {
                    // Agrupamento li Alterar para exibir
                    $(transferId).find(transferDoubleGroupListLiUlLi).eq(j).parent().parent().css('display', 'block');
                    $(transferId).find(transferDoubleGroupListLiUlLi).eq(j).css('display', 'block');
                }
            }
        });

        /**
         *Consulta difusa à direita
         */
        $(selectedListSearchId).keyup(function () {
            // 只要输入就显示列表框
            $(transferId).find(transferDoubleSelectedListUl).css('display', 'block');

            // 如果什么都没填,保持全部显示状态
            if ($(selectedListSearchId).val() == "") {
                $(transferId).find(transferDoubleSelectedListLi).css('display', 'block');
                return;
            }
            $(transferId).find(transferDoubleSelectedListLi).css('display', 'none');

            for (var i = 0; i < $(transferId).find(transferDoubleSelectedListLi).length; i++) {
                // 模糊匹配，将所有匹配项显示
                if ($(transferId).find(transferDoubleSelectedListLi).eq(i).text()
                        .substr(0, $(selectedListSearchId).val().length).toLowerCase() == $(selectedListSearchId).val().toLowerCase()) {
                    $(transferId).find(transferDoubleSelectedListLi).eq(i).css('display', 'block');
                }
            }
        });
    }

    /**
     Carrega os itens do lado esquerda (3° função a ser chamada)
     * @param currentTimeStr
     * @param data
     * @returns {string}
     */
    function generateLeftList(currentTimeStr, data, itemName, valueName) {
        var listHtmlStr = "";
        for (var i = 0; i < data.length; i++) {
            listHtmlStr = listHtmlStr +
                '<li class="transfer-double-list-li transfer-double-list-li-' + currentTimeStr + '">' +
                '<div class="checkbox-group">' +
                '<input type="checkbox" value="' + data[i][valueName] + '" class="checkbox-normal checkbox-item-' + currentTimeStr + '" id="itemCheckbox_' + i + '_' + currentTimeStr + '">' +
                '<label class="checkbox-name-' + currentTimeStr + '" for="itemCheckbox_' + i + '_' + currentTimeStr + '">' + data[i][itemName] + '</label>' +
                '</div>' +
                '</li>'
        }
        return listHtmlStr;
    }

    /**
     * Carrega Grupo (Quantidade) de itens do lado Esquerdo
     * @param currentTimeStr
     * @param data
     * @returns {string}
     */
    function generateLeftGroupList(currentTimeStr, data, itemName, groupListName, groupItemName, valueName) {
        var listHtmlStr = "";
        for (var i = 0; i < data.length; i++) {
            listHtmlStr = listHtmlStr +
                '<li class="transfer-double-group-list-li transfer-double-group-list-li-' + currentTimeStr + '">'
                + '<div class="checkbox-group">' +
                '<input type="checkbox" class="checkbox-normal group-select-all-' + currentTimeStr + '" id="group_' + i + '_' + currentTimeStr + '">' +
                '<label for="group_' + i + '_' + currentTimeStr + '" class="group-name-' + currentTimeStr + '">' + data[i][groupItemName] + '</label>' +
                '</div>';
            if (data[i][groupListName].length > 0) {
                listHtmlStr = listHtmlStr + '<ul class="transfer-double-group-list-li-ul transfer-double-group-list-li-ul-' + currentTimeStr + '">'
                for (var j = 0; j < data[i][groupListName].length; j++) {
                    listHtmlStr = listHtmlStr + '<li class="transfer-double-group-list-li-ul-li transfer-double-group-list-li-ul-li-' + currentTimeStr + '">' +
                        '<div class="checkbox-group">' +
                        '<input type="checkbox" value="' + data[i][groupListName][j][valueName] + '" class="checkbox-normal group-checkbox-item-' + currentTimeStr + ' belongs-group-' + i + '-' + currentTimeStr + '" id="group_' + i + '_checkbox_' + j + '_' + currentTimeStr + '">' +
                        '<label for="group_' + i + '_checkbox_' + j + '_' + currentTimeStr + '" class="group-checkbox-name-' + currentTimeStr + '">' + data[i][groupListName][j][itemName] + '</label>' +
                        '</div>' +
                        '</li>';
                }
                listHtmlStr = listHtmlStr + '</ul>'
            } else {
                listHtmlStr = listHtmlStr + '</li>';
            }
            listHtmlStr = listHtmlStr + '</li>';
        }
        return listHtmlStr;
    }

    /**
     Primeiro metodo a ser carregado - Conta Total de Grupo
     * @param data
     * @returns {number}
     */
    function getGroupNum(data, groupListName) {
        var total_group_num = 0;
        for (var i = 0; i < data.length; i++) {
            var groupData = data[i][groupListName];
            if (groupData.length > 0) {
                total_group_num = total_group_num + groupData.length;
            }
        }
        return total_group_num;
    }


    /**
     * 返回选中的项目 value 数组
     * @returns {Array}
     */
    function getSelected() {
        // 穿梭框
        var transferId = "#transfer_double_" + inputId;
        var selected = [];
        var transferDoubleSelectedListLi = ".transfer-double-selected-list-li-" + currentTimeStr;

        for (var i = 0; i < $(transferId).find(transferDoubleSelectedListLi).length; i++) {
            // 模糊匹配，将所有匹配项显示
            var value = $(transferId).find(transferDoubleSelectedListLi).eq(i).find(".checkbox-group").find("input").val();
            selected.push(value);
        }
        return selected;
    }

    /**
     * 返回选中的项目名称数组
     * @returns {Array}
     */
    function getSelectedName() {
        // 穿梭框
        var transferId = "#transfer_double_" + inputId;
        var selected = [];
        var transferDoubleSelectedListLi = ".transfer-double-selected-list-li-" + currentTimeStr;

        for (var i = 0; i < $(transferId).find(transferDoubleSelectedListLi).length; i++) {
            // 模糊匹配，将所有匹配项显示
            var value = $(transferId).find(transferDoubleSelectedListLi).eq(i).find(".checkbox-group").find("label").text();
            selected.push(value);
        }
        return selected;
    }

    /**
     Monta os componentes da tela (2° função a ser carregado)
     * @param inputId
     * @param currentTimeStr
     * @returns {string}
     */
    function generateTransfer(inputId, currentTimeStr) {
        var htmlStr =
            '<div class="transfer-double" id="transfer_double_' + inputId + '">'
            + '<div class="transfer-double-header"></div>'
            + '<div class="transfer-double-content clearfix">'
            + '<div class="transfer-double-content-left">'
            + '<div class="transfer-double-content-tabs">'
            + '<div id="lbGrupo" class="tab-item-name tab-item-name-' + currentTimeStr + ' ">Groups</div>'
            + '<div id="lbItem" class="tab-item-name tab-item-name-' + currentTimeStr + ' tab-active"><h4><b>Itens</b></h4></div>'
            + '</div>'

            + '<div class="transfer-double-list transfer-double-list-' + currentTimeStr + ' tab-content-first-' + currentTimeStr + '">'
            + '<div class="transfer-double-list-header">'
            + '<div class="transfer-double-list-search">'
            + '<input class="transfer-double-list-search-input" type="text" id="groupListSearch_' + currentTimeStr + '" placeholder="Buscar" value="" />'
            + '</div>'
            + '</div>'
            + '<div class="transfer-double-list-content">'
            + '<div class="transfer-double-list-main">'
            + '<ul class="transfer-double-group-list-ul transfer-double-group-list-ul-' + currentTimeStr + '">'
            + '</ul>'
            + '</div>'
            + '</div>'
            + '<div class="transfer-double-list-footer">'
            + '<div class="checkbox-group">'
            + '<input type="checkbox" class="checkbox-normal" id="groupsSelectAll_' + currentTimeStr + '"><label for="groupsSelectAll_' + currentTimeStr + '" class="group_total_num_' + currentTimeStr + '"></label>'
            + '</div>'
            + '</div>'
            + '</div>'

            + '<div class="transfer-double-list transfer-double-list-' + currentTimeStr + '  tab-content-active">'
            + '<div class="transfer-double-list-header">'
            + '<div class="transfer-double-list-search">'
            + '<input class="transfer-double-list-search-input" type="text" id="listSearch_' + currentTimeStr + '" placeholder="Bucar" value="" />'
            + '</div>'
            + '</div>'
            + '<div class="transfer-double-list-content">'
            + '<div class="transfer-double-list-main">'
            + '<ul class="transfer-double-list-ul transfer-double-list-ul-' + currentTimeStr + '">'
            + '</ul>'
            + '</div>'
            + '</div>'
            + '<div class="transfer-double-list-footer">'
            + '<div class="checkbox-group">'
            + '<input type="checkbox" class="checkbox-normal" id="selectAll_' + currentTimeStr + '"><label for="selectAll_' + currentTimeStr + '" class="total_num_' + currentTimeStr + '"></label>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>'

            + '<div class="transfer-double-content-middle">'
            + '<div class="btn-select-arrow" id="add_selected_' + currentTimeStr + '"><i class="iconfont icon-forward"></i></div>'
            + '<div class="btn-select-arrow" id="delete_selected_' + currentTimeStr + '"><i class="iconfont icon-back"></i></div>'
            + '</div>'
            + '<div class="transfer-double-content-right">'
            + '<div class="transfer-double-content-param">'
            + '<div class="param-item"><h4><b>Associados</h4></b></div>'
            + '</div>'
            + '<div class="transfer-double-selected-list">'
            + '<div class="transfer-double-selected-list-header">'
            + '<div class="transfer-double-selected-list-search">'
            + '<input class="transfer-double-selected-list-search-input" type="text" id="selectedListSearch_' + currentTimeStr + '" placeholder="Buscar" value="" />'
            + '</div>'
            + '</div>'
            + '<div class="transfer-double-selected-list-content">'
            + '<div class="transfer-double-selected-list-main">'
            + '<ul class="transfer-double-selected-list-ul transfer-double-selected-list-ul-' + currentTimeStr + '">'
            + '</ul>'
            + '</div>'
            + '</div>'
            + '<div class="transfer-double-list-footer">'
            + '<label class="selected_total_num_' + currentTimeStr + '">0 Item</label>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '<div class="transfer-double-footer">'
            + '</div>'
            + '</div>';
        return htmlStr;
    }

    return {
        transfer: transfer
    }
})($);
