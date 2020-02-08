# Foodfy
Projeto web para site de receitas

Para o projeto ser executado é necessário ter o PostgreSQL, Node e NPM instalados em sua máquina. 
Com o projeto aberto no VS code/ou terminal realizar as seguintes etapas:

* Acesse a pasta src/config e no arquivo db.js altere as propriedades (user e password) de acordo com sua configuração;
* Na pasta src/lib/mailer altere os campos user e pass de acordo com o suas credenciais no nodemailer (essa configuração é necessária para testar a funcionalidade de recuperação da senha)
* Use o comando npm install (para instalar todas as libs e dependências do projeto)
* Utilize o arquivo database.sql para gerar o banco de dados
* Com o comando node seed.js popule o banco de dados
* Agora o comando npm start para que o projeto seja executado (porta 3000)

Obs1: Todos os usuários possuem a senha 1234 (conforme no arquivo seed.js)o email e outros dados são aleatórios.

Obs2: Por padrão está sendo criado um usuário admin com email admin@email.com senha 1234 para que você tenha permissão a executar tudo que foi elaborado no projeto.


