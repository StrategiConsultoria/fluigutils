export class Utils {

	//função que testa se a classe foi carregada corretamente
	static checkLoaded() {
		if (typeof Utils == 'undefined') {
			console.log('Utils não carregado')
		} else {
			console.log('Utils carregado')
		}
	}

	/**
	 * obtém o valor de um campo do formulário
	 * @param {string} id - id do campo
	 * @returns {string} valor do campo
	 */
	static getVal(id) {
		let el = $('#' + id)
		if (el == undefined) {
			el = $('#_' + id)
			if (el.is('span')) {
				return el.text()
			}
			return el.val()
		}
		if (el.is('span')) {
			return el.text()
		}
		return el.val()
	}

	/**
	 * converte um input para select
	 * @param {string} id - id do input
	 */
	static switchInputToSelect(id) {
		let input = $("#" + id)

		if (!input.is("input")) {
			return;
		}

		let parent = input.parent()
		let select = $("<select></select>")
			.attr("id", "select_" + id)
			.addClass(input.attr("class"))
		let option = $("<option></option>").text(input.val())

		select.on("change", function () {
			input.val($(this).val())
		})

		select.append(option)
		parent.append(select)
		input.hide()
	}

	// Busca o valor de uma opção
	static findOptionWithValue(selectId, value) {
		let select = $("#" + selectId);
		let escapedValue = value.replace(/'/g, "\\'").replace(/"/g, '\\"')
		let option = select.find("option[value='" + escapedValue + "']");
		return option; // retorna o option
	}

	/**
	  * adiciona uma opção a um select
	  * @param {string} selectId - id do select
	  * @param {string} text - texto da opção
	  * @param {string} value - valor da opção
	  */
	static addOptionToSelect(selectId, optionText, optionValue, datajson) {
		let select = $("#" + selectId);
		let option = $("<option></option>").text(optionText).val(optionValue);
		select.append(option);

		if (select.val() != "") {
			select.val(optionValue);
		}
	}

	static setSelectValue(selectId, optionValue) {
		let select = $("#" + selectId);
		select.val(optionValue);
		select.trigger('select2:select');
		select.trigger('change');
		select.trigger('blur');
	}

	/**
	   * limpa todas as opções de um select
	   * @param {string} selectId - id do select
	   */
	static clearSelect(selectId) {
		let select = $("#" + selectId);
		select.empty();
	}


	/**
	 * obtém os dados de uma tabela pai-filho
	 * @param {string} tablename - nome da tabela
	 * @returns {Array} array com os dados da tabela
	 */
	static getTableData(tablename) {
		const arrJson = [];
		const arrTr = $("[tablename='" + tablename + "'] tbody tr").not(":first").toArray();

		$.each(arrTr, (i, tr) => {
			const valuesJson = {};
			const childrenArr = getMode() == "VIEW" ? $(tr).find("span").toArray() : $(tr).find("input").toArray();
			childrenArr.forEach(function (input) {
				let id = $(input).attr("id");
				if (id[0] == "_") {
					id = id.substring(1)
				}
				let value

				if ($(input).attr("type") === "checkbox") {
					value = $(input).is(":checked") ? "on" : "off";
				} else {
					value = Utils.getVal(id);
				}
				id = id.split("___")[0];
				valuesJson[id] = value;
			});
			arrJson.push(valuesJson);
		});
		return arrJson
	}

	/**
	  * verifica se uma chave já existe em uma tabela pai-filho
	  * @param {string} tablename - nome da tabela
	  * @param {Array} keys - array de objetos com chave e valor para verificar
	  * @returns {boolean} true se existe, false caso contrário
	  */
	static hasKeyInTable(tablename, keyValuePairs) {
		//Utils.hasKeyInTable('tableName', [
		//	{ key1: 'value1' },
		//	{ key2: 'value2' }
		//]);
		let arr = Utils.getTableData(tablename);

		if (!Array.isArray(keyValuePairs) || keyValuePairs.length === 0) {
			Utils.alertError('Erro ao adicionar item na tabela', 'danger');
			return false;
		}

		return arr.some(item => {
			return keyValuePairs.every(pair => {
				const key = Object.keys(pair)[0];
				const value = pair[key];
				return item[key] === value;
			});
		});
	}

	/**
	 * remove todas as linhas de uma tabela pai-filho
	 * @param {string} tablename - nome da tabela
	 */
	static removeAllRows(tablename) {
		let table = $("[tablename='" + tablename + "'] tbody");
		table.find("tr").not(":first").remove();
	}

	/**
	 * formata um valor monetário
	 * @param {number} value - valor a ser formatado
	 * @returns {string} valor formatado como moeda brasileira
	 */
	static formatCurrency(value) {
		return "R$ " + Number(value).toLocaleString('pt-br', { minimumFractionDigits: 2 })
	}

	static setReadOnly(id) {
		let input = $(`#${id}`)
		if (input.is('select') && input.hasClass('select2Activate')) {
			input.select2('destroy')
		}
		input.prop('readonly', true)
		input.css({
			border: 'none',
			background: 'transparent',
			'font-size': 'inherit',
			'font-family': 'inherit',
			padding: '0',
			margin: '0',
			outline: 'none',
			'box-shadow': 'none',
			color: 'inherit',
			appearance: 'none',
			'pointer-events': 'none',
		})
	}

	/**
  * converte todos os inputs de uma tabela para spans
  * @param {string} tablename - nome da tabela
  */
	static swtichInputToSpanInTablename(tablename) {
		let inputs = $("[tablename='" + tablename + "'] input").toArray();
		for (let i = 0; i < inputs.length; i++) {
			let input = $(inputs[i]);
			let id = input.attr("id");
			if (id.startsWith("_")) {
				Utils.setReadOnly(id);
			}
		}
	}

	/**
	 * remove todas as linhas de uma tabela pai-filho exceto a linha selecionada
	 * @param {string} tablename - nome da tabela
	 * @param {number} selectedRowNumber - número da linha selecionada
	 */
	static removeUnselectedRows(tablename, selectedRowNumber) {
		try {
			const table = $("[tablename='" + tablename + "'] tbody")
			table.find("tr").not(":first").each(function () {
				const rowNumber = $(this).find("input[id^='selecionarMovimento___']").attr('id').split('___')[1]
				if (rowNumber != selectedRowNumber) {
					$(this).remove()
				}
			})
		} catch (error) {
			Utils.alertError('Erro ao remover linhas não selecionadas: ' + error.message, 'danger')
		}
	}

	/**
	   * busca um dataset do fluig de forma assíncrona
	   * @param {string} datasetName - nome do dataset a ser consultado
	   * @param {Array} fields - campos a serem retornados
	   * @param {Array} constraints - restrições da consulta
	   * @param {Array} order - ordenação dos resultados
	   * @returns {Promise} promise com o resultado da consulta
	   */
	static async getDataset(dataset, fields, constraints, sorters) {
		return new Promise(function (resolve, reject) {
			DatasetFactory.getDataset(
				dataset,
				fields,
				constraints,
				sorters,
				{
					success: data => resolve(data),
					error: () => reject(arguments)
				}
			);
		});
	}

	static setValue(id, value) {
		let input = $("#" + id);
		if (input.is("input")) {
			input.val(value);
		} else {
			input.text(value);
		}
	}

	static blockAllInputs() {
		const inputs = document.querySelectorAll('input, textarea, select');
		inputs.forEach(input => {
			input.disabled = true;
			input.classList.add('input-blocked');
			if (input.tagName.toLowerCase() === 'select') {
				Array.from(input.options).forEach(option => {
					option.disabled = true;
				});
			}
		});
		const buttons = document.querySelectorAll('button');
		buttons.forEach(button => {
			button.disabled = true;
			button.classList.add('input-blocked');
		});
		$(parent.$("[data-send]").parent()[0]).hide()
	}

	/**
   * exibe um alerta na tela
   * @param {string} message - mensagem a ser exibida
   * @param {string} type - tipo do alerta (success, info, warning, danger)
   */
	static alert(message, type) {
		FLUIGC.toast({
			title: '',
			message: message,
			type: type
		});
		//console.error(message)
		if (type == 'danger') {
			console.error(message)
		} else if (type == 'warning') {
			console.warn(message)
		} else if (type == 'info') {
			console.info(message)
		} else {
			console.log(message)
		}
	}

	/**
	   * verifica se um valor está vazio
	   * @param {*} value - valor a ser verificado
	   * @returns {boolean} true se vazio, false caso contrário
	   */
	static isEmpty(element) {
		if (Utils.getVal(element) == "" || !Utils.getVal(element)) {
			return true;
		}
		return false;
	}

	/**
	 * garante que apenas um checkbox esteja marcado por vez na tabela
	 * @param {string} tablename - nome da tabela 
	 * @param {HTMLElement} clickedCheckbox - checkbox que foi clicado
	 */
	static ensureSingleSelection(tablename, clickedCheckbox) {
		// desmarca todos os outros checkboxes da tabela exceto o atual
		$(`[tablename='${tablename}'] input[type='checkbox']`)
			.not(clickedCheckbox)
			.prop('checked', false);
	}
}