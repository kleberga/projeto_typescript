# Back-end de cursos de graduação

Este aplicativo consiste em um back-end para consultar dados de cursos de graduação e de campus de uma faculdade via API. O aplicativo possui as seguintes características:
- existem rotas para consultar todos os cursos, consultar um único curso pelo ID dele, incluir, atualizar e deletar cursos;
- existem rotas para consultar todos os campus, incluir e deletar campus e adicionar um curso de gradução previamente cadastrado ao um campus;
- todas as rotas são protegidas;
- existe uma rota contendo a documentação da API; e
- há controle de log das rotas.

Do ponto de vista técnico, o aplicativo possui as seguintes características:
- a arquitetura é formada por camadas: entidades, domínio, infra e api;
- foi desenvolvido usando as bibliotecas Express e Typescript;
- os dados dos cursos e dos campus são armazenados no banco de dados MongoDB, utilizando o Object Document Mapping (ODM) Mongoose;
- o cursos são adicionados aos campus por meio de referência indireta;
- existe inversão de dependência com a utilização de interfaces;
- existe injeção de dependência, de modo que os métodos não ficam vinculados diretamente às classes;
- todas as rotas estão protegidas por uma chave de acesso;
- a documentação das rotas foi criada utilizando a biblioteca Swagger; e
- há tratamento personalizado dos erros que possam ocorrer ao acessar as rotas.
