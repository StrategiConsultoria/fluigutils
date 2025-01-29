declare class Utils {

	static checkLoaded(): void;

    /**
     * obtém o valor de um campo do formulário
     * @param id - id do campo
     */
    static getVal(id: string): string;

    /**
     * converte um input para select
     * @param id - id do input
     */
    static switchInputToSelect(id: string): void;

    /**
     * Busca o valor de uma opção
     */
    static findOptionWithValue(selectId: string, value: string): HTMLOptionElement;

    /**
     * adiciona uma opção a um select
     * @param selectId - id do select
     * @param optionText - texto da opção
     * @param optionValue - valor da opção
     * @param datajson - dados adicionais em JSON
     */
    static addOptionToSelect(selectId: string, optionText: string, optionValue: string, datajson?: any): void;

    /**
     * Define o valor de um select
     */
    static setSelectValue(selectId: string, optionValue: string): void;

    /**
     * limpa todas as opções de um select
     */
    static clearSelect(selectId: string): void;

    /**
     * obtém os dados de uma tabela pai-filho
     * @returns array com os dados da tabela
     */
    static getTableData(tablename: string): Array<Record<string, any>>;

    /**
     * verifica se uma chave já existe em uma tabela pai-filho
     * @returns true se existe, false caso contrário
     */
    static hasKeyInTable(tablename: string, keyValuePairs: Array<Record<string, any>>): boolean;

    /**
     * remove todas as linhas de uma tabela pai-filho
     */
    static removeAllRows(tablename: string): void;

    /**
     * formata um valor monetário
     * @returns valor formatado como moeda brasileira
     */
    static formatCurrency(value: number): string;

    /**
     * Define um campo como somente leitura
     */
    static setReadOnly(id: string): void;

    /**
     * converte todos os inputs de uma tabela para spans
     */
    static swtichInputToSpanInTablename(tablename: string): void;

    /**
     * remove todas as linhas de uma tabela pai-filho exceto a linha selecionada
     */
    static removeUnselectedRows(tablename: string, selectedRowNumber: number): void;

    /**
     * busca um dataset do fluig de forma assíncrona
     * @returns promise com o resultado da consulta
     */
    static getDataset(dataset: string, fields: string[], constraints: any[], sorters: any[]): Promise<any>;

    /**
     * Define o valor de um elemento
     */
    static setValue(id: string, value: string): void;

    /**
     * Bloqueia todos os inputs do formulário
     */
    static blockAllInputs(): void;

    /**
     * exibe um alerta na tela
     */
    static alert(message: string, type: 'success' | 'info' | 'warning' | 'danger'): void;

    /**
     * verifica se um valor está vazio
     * @returns true se vazio, false caso contrário
     */
    static isEmpty(element: string): boolean;

    /**
     * garante que apenas um checkbox esteja marcado por vez na tabela
     */
    static ensureSingleSelection(tablename: string, clickedCheckbox: HTMLElement): void;
}

export = Utils;