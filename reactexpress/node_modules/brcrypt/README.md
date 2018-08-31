# brcrypt.js
[![Build Status](https://travis-ci.org/kelektiv/node.bcrypt.js.svg?branch=master)](https://travis-ci.org/kelektiv/node.bcrypt.js)
[![Dependency Status](https://david-dm.org/kelektiv/node.bcrypt.js.svg)](https://david-dm.org/kelektiv/node.bcrypt.js)

Biblioteca para te ajudar a misturar senhas com base no bcrypt.

Tradução para Português por Coloringa.

Bcrypt Author: [kelektiv]

[bcrypt na wikipedia][bcryptwiki]

Catalisador para este módulo: [How To Safely Store A Password][codahale]

## Se você for submeter Bugs/Problemas

Primeiramente, tenha certeza que a versão do Node que você está usando é uma versão _stable_. Você saberá disto porque ele terá um número de lançamento mais alto. Nós atualmente não suportamos versões instáveis e enquanto o módulo pode funcionar em algumas versões instáveis, você irá descobrir que nós fechamos problemas rápidamente se você não está usando uma versão estável.

Se você está usando uma versão estável do Node, nós podemos magicamente saber o que você está fazendo para expor um problema, é melhor se você fornecer um pedaço do código ou arquivos de log se você está com problemas na instalação. Este pedaço de código não precisa incluir seu molho secreto, mas ele deve replicar o problema como você está descrevendo. Os problemas que fechamos sem solução tendem a ser os que não nos ajuda a te ajudar. Obrigado!


## Compatibilidade de versão

| Versão do Node | Versão do brcrypt |
| ---- | ---- |
| 0.4.x | <= 0.4.x |
| 0.6.x | >= 0.5.x |
| 0.8.x | >= 0.5.x |
| 0.10.x | >= 0.5.x |
| 0.11.x | >= 0.8.x |

Usuários de Windows devem se assegurar de ter pelo menos o node 0.8.5 instalado e a versão >= 0.7.1 deste módulo.

`node -v` ou `node --version`no terminal devem te ajudar a saber a versão.

`node-gyp` só funciona com versões do Node estáveis/lançadas. Já que o módulo `bcrypt` usa `node-gyp` para construir e instalar, você precisará de uma versão estável do Node para usar bcrypt. Se você não ver um erro que começa com:

```
gyp ERR! stack Error: "pre" versions of node cannot be installed, use the --nodedir flag instead
```

## Problemas de Segurança/Preocupações

> Por implementação do bcrypt, somente os primeiros 72 caracteres de uma string são usados. Quaisquer caractere extra é ignorado quando combinada uma senha.

Como deve ser o caso com qualquer ferramenta de segurança, esta biblioteca deve ser examinada por qualquer que tiver que usá-la. Se você encontrar ou suspeitar de um problema com o código- por favor traga para nossa atenção e iremos trabalhar para fazer esta ferramenta mais segura possível.

Para tornar fácil para pessoas que usam esta ferramenta para analisar o que foi pesquisado, aqui está uma lista de problemas/preocupações de segurança relacionadas ao BCrypt assim que elas aparecem.

* Um [problema com senhas][jtr] foi encontrado com uma versão do algaritmo do Blowfish desenvolvido para John the Ripper. Isto não está presente na versão OpenBSD e não é um problema para este módulo. HT [zooko][zooko].

## Nota de compatibilidade

Esta biblioteca suporta `$2a$` e `$2b$` prefixar misturas com brcrypt. `$2x$` e `$2y$` misturas são específicas para a implementação do brcrypt desenvolvida para John the Ripper. Em teoria, eles devem ser compatíveis com o prefixo `$2b$`.

Compatibilidade com misturas geradas por outras línguas não é 100% garantido pela diferença em codificação de caracteres. Contudo, não deve ser um problema para a maioria dos casos.

## Dependências

* NodeJS
* `node-gyp`
 * Favor conferir as dependências para esta ferramenta em: https://github.com/nodejs/node-gyp
  * Usuários de Windows vão precisar as opções para c# e c++ instalados com sua instância do visual studio.
  * Python 2.x
* `OpenSSL` - Isto só é requerido para construir o projeto `brcrypt` se você está usando versões <= 0.7.7. De outra maneira, nós estamos usando ligações do node crypto embutidas para dados semente(que usa os mesmo caminhos do código OpenSSL que nós estávamos, mas não tem uma dependência externa.

## Instale via NPM
Tenha certeza que você tem as dependências apropriadas instaladas e configuradas para sua plataforma. Você pode encontrar instruções de instalação para as dependências para algumas plataformas comuns [nesta páginas][depsinstall].

```
npm install brcrypt
```
***Nota:*** Usuários de OS X usando Xcode 4.3.1 ou posterior precisam rodar o seguinte comando em seu terminal para instalar se erros em relação ao xcodebuild ocorram: ```sudo xcode-select -switch /Applications/Xcode.app/Contents/Developer```

## Uso

### async (recomendado)

```javascript
var brcrypt = require('brcrypt');
const pitadasDeSal = 10;
const minhaSenhaSimples = 's0/\/\P4$$w0rD';
const outraSenhaSimples = 'quero_bacon';
```

#### Para misturar uma senha:

Técnica 1 (gere um sal e uma mistura em chamadas de função separadas):

```javascript
brcrypt.gerarSal(pitadasDeSal, function(err, sal) {
    brcrypt.mistura(minhaSenhaSimples, sal, function(err, mistura) {
        // Armazene a mistura em seu DB de senha.
    });
});
```

Technique 2 (gerar automaticamente um sal e uma mistura):

```javascript
brcrypt.mistura(minhaSenhaSimples, pitadasDeSal, function(err, mistura) {
  // Armazene a mistura em seu DB de senha.
});
```

Note que ambas técnicas alcançam o mesmo resultado final.

#### Para conferir uma senha:

```javascript
// Carregue a mistura em seu DB de senha.
brcrypt.comparar(minhaSenhaSimples, mistura, function(err, res) {
    // res == true
});
brcrypt.comparar(outraSenhaSimples, mistura, function(err, res) {
    // res == false
});
```

A função "comparar" combate ataque de temporização (usando um algoritmo já conhecido chamado 'constant-time').
Em geral, não use as comparações normais de string em Javascript para comparar senhas,
chaves criptográficas, ou misturas criptográficas se eles são relevantes para segurança.

### com promessas

brcrypt usa quaisquer implementação de Promise disponível em `global.Promise`. NodeJS >= 0.12 tem uma implementação nativa de Promise embutida. No entanto, isto deve funcionar em quaisquer implementação de Promises/A+.

Métodos async que aceitam um callback, retornam uma `Promise` quando o callback não é especificado se o suporte de Promise está disponível.

```javascript
brcrypt.mistura(minhaSenhaSimples, rodadasDeSal).then(function(mistura) {
    // Guarde a mistura em seu DB de senha
});
```
```javascript
// Carregue a mistura de seu DB de senha.
brcrypt.comparar(minhaSenhaSimples, mistura).then(function(res) {
    // res == true
});
brcrypt.comparar(outraSenhaSimples, mistura).then(function(res) {
    // res == false
});
```

### sinc

```javascript
var brcrypt = require('brcrypt');
const pitadasDeSal = 10;
const minhaSenhaSimples = 's0/\/\P4$$w0rD';
const outraSenhaSimples = 'quero_bacon';
```

#### To hash a password:

Técnica 1 (gerar um sal e uma mistura em funções separadas):

```javascript
var sal = brcrypt.gerarSalSinc(rodadasDeSal);
var hash = brcrypt.misturaSinc(minhaSenhaSimples, sal);
// Guarde a mistura em seu DB de senha.
```

Technique 2 (gerar um sal e uma mistura automaticamente):

```javascript
var hash = brcrypt.misturaSinc(minhaSenhaSimples, rodadasDeSal);
// Guarde a mistura em seu DB de senha.
```

Com async, ambas técnicas alcançam o mesmo resultado final.

#### Para conferir uma senha:

```javascript
// Carregue a mistura do seu DB de senha.
brcrypt.compararSinc(minhaSenhaSimples, mistura); // true
brcrypt.compararSinc(outraSenhaSimples, mistura); // false
```
A função "compararSinc" combate ataques de tempo (usando um algoritmo já conhecido 'constant-time').
Em geral, não use as comparações normais de string em Javascript para comparar senhas,
chaves criptográficas, ou misturas criptográficas se eles são relevantes para segurança.

### Por que o modo async é mais recomendado que sync mode?
Se você está usando brcrypt em um script simples, usar o modo sync cai muito bem. No entanto, se você está usando bcrypt em um servidor, o modo async é recomendado. Isto porque a mistura feita por bcrypt é instensiva no uso de CPU, então a versão sync irá bloquear o loop de eventos e impedir que seu aplicativo atenda a quaisquer outras solicitações ou eventos de entrada.

## API

`BRCrypt.`

  * `gerarSincDeSal(rodadas)`
    * `pitadas` - [OPTIONAL] - o custo de processamento de dado. (default - 10)
  * `gerarSal(rounds, cb)`
    * `pitadas` - [OPTIONAL] - o custo de processamento de dado. (default - 10)
    * `cb` - [OPTIONAL] - um callback a ser acionado assim que o sal foi gerado. Usa eio fazendo-o assíncrono. Se `cb`não é especificado, uma `Promise` é retornada se suporte a Promise está disponível.
      * `err` - Primeiro parâmetro para o callback detalhando quaisquer erros.
      * `sal` - Segundo parâmetro para o callback fornecendo o sal gerado.
  * `misturaSinc(dado, sal)`
    * `dado` - [REQUIRED] - dado a ser encriptado.
    * `sal` - [REQUIRED] - o sal a ser usado para misturar a senha. se especificado como um número então um sal será gerado com o número especificado de rodadas e usado (veja exemplo em **Uso**).
  * `hash(dado, sal, cb)`
    * `dado` - [REQUIRED] - dado a ser encriptado.
    * `sal` - [REQUIRED] - o sal a ser usado para misturar a senha. se especificado como um número então um sal será gerado com o número especificado de rodadas e usado (veja exemplo em **Uso**).
    * `cb` - [OPTIONAL] - um callback a ser acionado assim que o sal foi gerado. Usa eio fazendo-o assíncrono. Se `cb`não é especificado, uma `Promise` é retornada se suporte a Promise está disponível.
      * `err` - Primeiro parâmetro para o callback detalhando quaisquer erros.
      * `encrypted` - Segundo parâmetro para o callback fornecendo a forma encriptada.
  * `compararSinc(data, encrypted)`
    * `dado` - [REQUIRED] - dado para comparar.
    * `encriptado` - [REQUIRED] - dado para ser comparado com.
  * `comparar(dado, encriptado, cb)`
    * `dado` - [REQUIRED] - dado para comparar.
    * `encriptado` - [REQUIRED] - dado para ser comparado com.
    * `cb` - [OPTIONAL] - um callback a ser acionado assim que o sal foi gerado. Usa eio fazendo-o assíncrono. Se `cb`não é especificado, uma `Promise` é retornada se suporte a Promise está disponível.
      * `err` - Primeiro parâmetro para o callback detalhando quaisquer erros.
      * `same` - Segundo parâmetro para o callback fornecendo ou dado ou combinações de formulários encriptados [true | false].
  * `pegarPitadas(encriptado)` - retorna o número de rodadas usado para encriptar uma mistura
    * `encriptado` - [REQUIRED] - mistura da qual o número de rodadas usado deve ser extraído.

## Uma nota em Rodadas

Uma nota sobre o custo. Quando você está misturando seus dados o módulo passará através de uma série de rodadas para te dar um hash seguro. O valor que você submete não é somente o número de rodadas que o módulo irá passar para misturar seus dados. O módulo irá usar o valor que você disser e irá fazer `2^rodadas` iterações de processamento.

From @garthk, on a 2GHz core you can roughly expect:

    pitadas=8 : ~40 misturas/sec
    pitadas=9 : ~20 misturas/sec
    pitadas=10: ~10 misturas/sec
    pitadas=11: ~5  misturas/sec
    pitadas=12: 2-3 misturas/sec
    pitadas=13: ~1 segundo/mistura
    pitadas=14: ~1.5 segundo/mistura
    pitadas=15: ~3 segundo/mistura
    pitadas=25: ~1 hora/mistura
    pitadas=31: 2-3 dias/mistura


## Informações de mistura

Os caracteres que abrangem a mistura resultante são `./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$`.

Misturas resultantes terão 60 caracteres de comprimento.

## Testes

Se você criar um pull request, é melhor que o teste passe :)

```
npm install
npm test
```

## Créditos

O código para isto vem de algumas fontes:

* blowfish.cc - OpenBSD
* bcrypt.cc - OpenBSD
* bcrypt::gen_salt - [gen_salt inclusion to bcrypt][bcryptgs]
* bcrypt_node.cc - me

## Contributors

* [Antonio Salazar Cardozo][shadowfiend] - Suporte antecipado ao MacOS X (quando usamos libbsd)
* [Ben Glow][pixelglow] - Correções para segurança de thread com chamadas assíncronas
* [Van Nguyen][thegoleffect] - Encontrou um ataque de temporização no comparador
* [NewITFarmer][newitfarmer] - Suporte inicial a Cygwin
* [David Trejo][dtrejo] - correções de embalagem
* [Alfred Westerveld][alfredwesterveld] - correções de embalagem
* [Vincent Côté-Roy][vincentr] - Testando em torno de problemas de concorrência
* [Lloyd Hilaiel][lloyd] - Correções na documentação
* [Roman Shtylman][shtylman] - Refatoração de código, Code refactoring, redução geral de podridão, opções de compilação, melhor gerenciamento de memória com delete e new, e um upgrade ao libuv em eio/ev.
* [Vadim Graboys][vadimg] - Mudanças no código para suportar 0.5.5+
* [Ben Noordhuis][bnoordhuis] - Corrigiu um problema de segurança em nodejs que foi perfeitamente mapeável para este módulo.
* [Nate Rajlich][tootallnate] - Ligações e processo de construção.
* [Sean McArthur][seanmonstar] - Suporte a Windows
* [Fanie Oosthuysen][weareu] - Suporte a Windows
* [Amitosh Swain Mahapatra][agathver] - Suporte a Promise ES6

## License
A menos que especificado em outro lugar, cabeçalhos de arquivo ou outros, a licença, conforme declarada no arquivo LICENSE.

[bcryptwiki]: https://pt.wikipedia.org/wiki/Bcrypt
[bcryptgs]: http://mail-index.netbsd.org/tech-crypto/2002/05/24/msg000204.html
[codahale]: http://codahale.com/how-to-safely-store-a-password/
[gh13]: https://github.com/ncb000gt/node.bcrypt.js/issues/13
[jtr]: http://www.openwall.com/lists/oss-security/2011/06/20/2
[depsinstall]: https://github.com/kelektiv/node.bcrypt.js/wiki/Installation-Instructions

[shadowfiend]:https://github.com/Shadowfiend
[thegoleffect]:https://github.com/thegoleffect
[pixelglow]:https://github.com/pixelglow
[dtrejo]:https://github.com/dtrejo
[alfredwesterveld]:https://github.com/alfredwesterveld
[newitfarmer]:https://github.com/newitfarmer
[zooko]:https://twitter.com/zooko
[vincentr]:https://twitter.com/vincentcr
[lloyd]:https://github.com/lloyd
[shtylman]:https://github.com/shtylman
[vadimg]:https://github.com/vadimg
[bnoordhuis]:https://github.com/bnoordhuis
[tootallnate]:https://github.com/tootallnate
[seanmonstar]:https://github.com/seanmonstar
[weareu]:https://github.com/weareu
[agathver]:https://github.com/Agathver
[kelektiv]: https://github.com/kelektiv/node.bcrypt.js
[coloringa]: https://github.com/coloringa/brcrypt.js
