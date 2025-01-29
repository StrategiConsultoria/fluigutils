# FormUtils

Uma classe utilitária contendo funções auxiliares para formulários Fluig.

## Atenção ⚠️

Este módulo é utilizado por diversos formulários em produção. Ao modificar funções existentes:

- Faça testes extensivos para garantir compatibilidade
- Documente bem as alterações
- Evite quebrar a compatibilidade com código existente
- Em caso de dúvida, crie uma nova função ao invés de modificar uma existente

## Adicionando Novas Funções

1. Sempre adicione novas funções como métodos `static` na classe `Utils`
2. Siga o padrão de nomenclatura existente - use camelCase
3. Inclua comentários JSDoc acima de cada função com:
   - Uma descrição clara do propósito
   - Anotações @param para cada parâmetro
   - Anotação @returns se a função retornar algum valor
4. Adicione declarações de tipo no arquivo *.d.ts correspondente
   - Mantenha a documentação consistente com o código
   - Declare todos os tipos de parâmetros e retorno
   - Não utilize `any` ou `unknown` a menos que seja estritamente necessário