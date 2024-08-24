# Back-end de cursos de graduação

Este aplicativo consiste em um back-end para consultar dados de cursos de graduação via API. O aplicativo possui as seguintes características:
- existem rotas para consultar todos os cursos, consultar um único curso pelo ID dele, incluir, atualizar e deletar cursos;
- todas as rotas são protegidas;
- existe uma rota contendo a documentação da API; e
- há controle de log das rotas.

Do ponto de vista técnico, o aplicativo possui as seguintes características:
- foi desenvolvido usando as bibliotecas Express e Typescript;
- por simplicidade, os dados dos cursos estão armazenados em um arquivo local no formato JSON;
- todas as rotas estão protegidas por uma chave de acesso;
- a documentação das rotas foi criada utilizando a biblioteca Swagger e
- há tratamento personalizado dos erros que possam ocorrer ao acessar as rotas.
