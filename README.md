# Movies App
<a href="README_en.md">English Version</a><br>
Este é o frontend da aplicação Movies, que consome a API OMDbApi para buscar filmes e exibir seus detalhes. A aplicação foi desenvolvida utilizando React e TypeScript.

## Rodando o projeto
Antes de executar o projeto, verifique se o backend está em execução e funcionando corretamente. Certifique-se de seguir as instruções fornecidas no arquivo README.md do backend para configurar corretamente as variáveis de ambiente, incluindo a API Key gerada no serviço OMDbApi.

Siga as etapas abaixo para executar o frontend:

Instale as dependencias:
```shell
npm install
```

Inicie a aplicação:
```shell
npm run dev
```

## Utilizando a aplicação
A interface do usuário da aplicação Movies é simples e intuitiva. Ela consiste em duas páginas:
### Página de Busca de Filmes
Na página inicial, você pode pesquisar filmes pelo título usando a barra de pesquisa. Digite o título desejado e clique no botão de pesquisa ou pressione Enter para ver os resultados. Os filmes correspondentes serão exibidos em uma grade, mostrando o cartaz e o título do filme.

Você também pode navegar pelos resultados das páginas usando os botões de paginação na parte superior.
### Página de Detalhes do Filme
Ao clicar em um filme na página de busca, você será redirecionado para a página de detalhes do filme. Nessa página, você pode ver informações mais detalhadas sobre o filme, como o título, ano de lançamento, classificação, gênero, sinopse e outros detalhes relevantes.
Aproveite para utilizar o botão de favoritar!

## Testes automatizados
A aplicação Movies App possui testes automatizados para garantir seu bom funcionamento. Os testes foram desenvolvidos utilizando o Cypress.

### Modo Visual
Em outra janela do terminal, execute o seguinte comando para abrir o Cypress no modo visual:
```shell
npx cypress open
```
O Cypress abrirá uma janela com os testes disponíveis. Clique em um arquivo de teste para executá-lo e ver os resultados no navegador.

### Modo Terminal
Em outra janela do terminal, execute o seguinte comando:
```shell
npx cypress run
```
O Cypress executará os testes e exibirá os resultados no terminal.

Certifique-se de que o backend esteja em execução e acessível para que o frontend possa se comunicar com ele corretamente. Se você encontrar algum problema durante a execução do frontend ou dos testes, verifique se as variáveis de ambiente foram configuradas corretamente e se o servidor do backend está em execução.