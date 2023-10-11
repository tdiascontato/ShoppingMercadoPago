# Projeto de Comércio Eletrônico com Node.js e React #

![home2](https://github.com/tdiascontato/ShoppingMercadoPago/assets/98658691/2d9baf19-c65f-41e5-994d-b5324fc5a3ce)


Este repositório contém um projeto de comércio eletrônico desenvolvido com Node.js e React, que permite aos usuários se cadastrar para vender até 2 itens particulares apenas fornecendo a chave pública e a chave de acesso do Mercado Pago. Os usuários também podem comprar itens sem a necessidade de cadastro, e os pagamentos são processados pelo Mercado Pago. O projeto utiliza as bibliotecas crypto e bcrypt para criptografar as chaves e senhas. Todo o código foi escrito em JavaScript.

## Capturas de Tela

Aqui estão algumas capturas de tela do projeto:

1. ![home](https://github.com/tdiascontato/ShoppingMercadoPago/assets/98658691/6ffd9938-a3bb-4279-ad32-067dd16d6d77)

2. ![item](https://github.com/tdiascontato/ShoppingMercadoPago/assets/98658691/d562e315-c057-4974-819c-92897cf1241c)

3. ![item2](https://github.com/tdiascontato/ShoppingMercadoPago/assets/98658691/25e75502-3dca-4f1f-ba2a-f21978009784)

4. ![pagament](https://github.com/tdiascontato/ShoppingMercadoPago/assets/98658691/200bec19-e0c5-4df7-9748-0420d487284a)

5. ![dashboard](https://github.com/tdiascontato/ShoppingMercadoPago/assets/98658691/d421b4c4-fe58-43a9-b39f-e826403af704)
   
6. ![cadastro](https://github.com/tdiascontato/ShoppingMercadoPago/assets/98658691/c0e3e114-b006-476b-97db-69bb904787eb)



## Funcionalidades Principais

- **Cadastro de Usuários**: Os usuários podem se cadastrar fornecendo sua chave pública e chave de acesso do Mercado Pago. Suas senhas são armazenadas de forma segura usando a biblioteca bcrypt.

- **Venda de Itens**: Os usuários podem listar até 2 itens particulares para venda. Eles podem fornecer detalhes, preços e imagens dos produtos.

- **Compra de Itens**: Os visitantes do site podem navegar pelos produtos listados e comprar itens sem a necessidade de cadastro. Os pagamentos são processados pelo Mercado Pago.

- **Mudança de Tema**: O site oferece a funcionalidade de mudar o tema, permitindo aos usuários personalizar sua experiência.

## Tecnologias Utilizadas

- Node.js
- React
- Mercado Pago API
- Crypto (para criptografia)
- Bcrypt (para hashing de senhas)

## Configuração e Uso

Para executar o projeto localmente, siga os passos abaixo:

1. Clone este repositório:

```bash
git clone https://github.com/tdiascontato/ShoppingMercadoPago.git/
```

2. Navegue para o diretório do projeto:

```bash
cd ShoppingMercadoPago
```

3. Instale as dependências do servidor (Node.js):

```bash
cd backend
npm install
```

4. Instale as dependências do cliente (React):

```bash
cd frontend
npm install
```

5. Inicie o servidor e o cliente em terminais separados:

```bash
# Terminal 1 - A partir do diretório 'server'
npm start

# Terminal 2 - A partir do diretório 'client'
npm start
```

Acesse a aplicação em `http://localhost:4004` no seu navegador.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir problemas (issues) e enviar pull requests para melhorar este projeto.

## Agradecimentos

Agradecemos ao Mercado Pago por fornecer uma API apesar da documentação ser bem problemática quanto a assinatura e demais pontos.

## Notas Finais

Este projeto não possui uma implantação pública neste repositório. Sinta-se à vontade para implantá-lo em sua plataforma de escolha ou usá-lo como base para seus próprios projetos pessoais.

Se tiver alguma dúvida ou precisar de assistência, não hesite em entrar em contato. Divirta-se explorando e trabalhando com este projeto!

**Autor: @finefellings**

[Link para o seu perfil no GitHub](https://github.com/tdiascontato)

**Licença:** Este projeto é licenciado sob a Licença MIT. Consulte o arquivo `LICENSE` para obter mais informações.
