# EvDev — Plataforma de Aprendizado em Tecnologia

O **EvDev** é uma plataforma de aprendizado voltada para **Tecnologia da Informação**, criada para tornar o estudo mais prático, organizado e progressivo.

A proposta é ir além de simplesmente apresentar códigos ou definições. Cada conteúdo busca primeiro explicar **o conceito**, depois mostrar **como ele funciona na prática**, apresentar exemplos e destacar **erros comuns e formas de corrigi-los**.

O projeto foi desenvolvido como uma aplicação web utilizando **HTML, CSS e JavaScript**, com conteúdos organizados em diferentes trilhas de aprendizado.

---

## 🎯 Objetivo

O EvDev foi pensado principalmente para quem está começando na área de tecnologia e precisa construir uma base sólida antes de avançar para assuntos mais complexos.

A plataforma busca responder não apenas:

> **"Como fazer?"**

Mas também:

> **"O que é?"**, **"por que funciona dessa forma?"** e **"o que acontece quando algo dá errado?"**

Por isso, as trilhas seguem uma abordagem progressiva, começando pelos fundamentos e avançando gradualmente para conceitos mais específicos.

---

# 📚 Trilhas de aprendizado

Atualmente, o EvDev possui diferentes áreas de estudo:

* 💻 **Programação & Linguagens**
* 🌐 **Desenvolvimento Web**
* 🖥️ **Servidores & Backend**
* 🗄️ **Banco de Dados**
* 🌐 **Redes**
* ⚙️ **Fundamentos de Computação**
* 🐧 **Sistemas Operacionais**
* 📱 **Mobile**
* 🔀 **Git & GitHub**
* ☁️ **Cloud & DevOps**
* 🔐 **Cibersegurança**
* 🧪 **Laboratório**

Cada trilha possui conteúdos próprios e pode abordar conceitos, ferramentas, comandos, exemplos práticos e problemas comuns relacionados ao assunto.

---

# ⚙️ Fundamentos de Computação

A trilha de **Fundamentos de Computação** apresenta os conceitos que formam a base do funcionamento de um computador.

Entre os assuntos abordados estão:

* Hardware e software
* CPU
* Núcleos e threads
* Memória RAM
* SSD e HDD
* Placa-mãe
* GPU
* Fonte de alimentação
* Firmware
* BIOS e UEFI
* Processo de boot
* Kernel
* Imagem do sistema
* Drivers
* Sistema de arquivos
* Processos
* Arquiteturas de 32 e 64 bits
* Compiladores
* Interpretadores
* Virtualização
* Periféricos

A trilha serve como base para conteúdos posteriores de **Programação, Sistemas Operacionais, Redes, Servidores e Segurança**.

---

# 💻 Programação

A trilha de Programação possui atualmente quatro linguagens:

| Linguagem  | Aulas |
| ---------- | ----: |
| Python     |    68 |
| JavaScript |    56 |
| Java       |    56 |
| C          |    56 |

Cada linguagem possui:

* Visão geral
* Instalação no Windows e Linux
* Configuração do ambiente
* Documentação oficial
* Conceitos fundamentais
* Exemplos práticos
* Exercícios
* Erros comuns
* Explicações passo a passo

### 🔎 Pesquisa

A plataforma possui um sistema de pesquisa integrado às trilhas. As aulas podem ser encontradas por **título, descrição ou categoria**, com normalização de maiúsculas, minúsculas e acentos.

A pesquisa está disponível na visão geral das linguagens, na sidebar e também na busca global da plataforma.

---

# 🧪 Laboratório

O **Laboratório** é uma área separada das aulas teóricas e permite colocar alguns conceitos em prática diretamente na plataforma.

Atualmente existem cinco ambientes:

### HTML + CSS

HTML e CSS utilizam o mesmo editor e são renderizados juntos no navegador.

### JavaScript

O JavaScript é executado em um **iframe isolado no navegador**.

### Python

Python utiliza **Pyodide**, permitindo executar **CPython através de WebAssembly diretamente no navegador**.

Na primeira execução, o navegador precisa carregar o runtime do Pyodide. Depois disso, ele pode permanecer em cache.

### Java

O código Java é enviado ao **Wandbox** para compilação e execução.

### C

O código C também é enviado ao **Wandbox** para compilação e execução.

> ⚠️ A execução de código arbitrário deve permanecer isolada e possuir limites de segurança caso o Laboratório seja utilizado em produção.

---

# 🧭 Navegação

O cabeçalho mantém as principais trilhas visíveis e reúne as demais em **Mais trilhas**, evitando que a navegação fique excessivamente cheia.

Em telas menores, o menu lateral continua disponível através do botão de menu.

---

# 💾 Progresso e armazenamento local

O EvDev utiliza o **LocalStorage do navegador** para armazenar informações relacionadas ao estado da aplicação, como progresso e preferências.

Os dados são armazenados localmente e ficam associados ao navegador utilizado.

---

# 🏗️ Estrutura do projeto

```text
EvDev/
├── index.html            # Estrutura principal da aplicação
├── styles.css            # Identidade visual, componentes e responsividade
├── app.js                # Navegação, aulas, busca, laboratório e progresso
├── programming-data.js   # Dados das trilhas de Python, JS, Java e C
├── .gitignore            # Arquivos locais que não devem ser versionados
└── README.md             # Documentação do projeto
```

A estrutura separa a interface, os estilos, a lógica da aplicação e os conteúdos didáticos.

O currículo das linguagens de programação permanece em `programming-data.js`, permitindo alterar ou adicionar aulas sem misturar os dados com a lógica principal da aplicação.

---

# 🧩 Organização do código

O código utiliza comentários de seção para facilitar a manutenção.

### `index.html`

Estrutura principal da aplicação e pontos de montagem da interface.

### `styles.css`

Responsável pelo layout, identidade visual, componentes, navegação e responsividade.

### `app.js`

Concentra a lógica principal:

* Navegação
* Renderização das aulas
* Pesquisa
* Laboratório
* Progresso
* Interações da interface

### `programming-data.js`

Armazena os conteúdos estruturados das linguagens de programação.

---

# 🛠️ Tecnologias utilizadas

### Front-end

* **HTML5**
* **CSS3**
* **JavaScript (Vanilla JS)**

### Bibliotecas e serviços

* **Font Awesome** — ícones da interface
* **LocalStorage** — armazenamento local
* **Pyodide** — execução de Python no navegador
* **Wandbox** — execução de Java e C

---

# 🚀 Como executar localmente

O EvDev é um projeto estático e pode ser executado utilizando um servidor local.

### Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

### Entre na pasta

```bash
cd EvDev
```

### Inicie um servidor HTTP

Com Python:

```bash
python -m http.server 5500
```

Depois, acesse:

```text
http://localhost:5500
```

Também é possível utilizar o **Live Server** do VS Code.

---

# 📈 Evolução do projeto

O EvDev está sendo desenvolvido de forma incremental. A estrutura atual permite adicionar novos conteúdos e funcionalidades sem precisar alterar completamente a aplicação.

Entre as possibilidades de expansão estão:

* Novas trilhas
* Novas aulas
* Novas linguagens
* Desafios práticos
* Novos ambientes para o Laboratório
* Melhorias de responsividade
* Novos recursos de progresso
* Evolução da arquitetura da aplicação

---

# 🏷️ Versão atual — v14

A versão **v14** trouxe melhorias no conteúdo, pesquisa, Laboratório e organização do projeto.

### Principais alterações

* Pesquisa da trilha de Programação ampliada.
* Busca por título, descrição e categoria.
* Suporte a acentos.
* Busca global de aulas.
* Adicionada a trilha **Fundamentos de Computação** com 18 assuntos introdutórios.
* Removidas duplicações antigas de `render()` e `search()` no `app.js`.
* Adicionados comentários para facilitar a manutenção.
* Adicionado `.gitignore`.
* Python passou a utilizar **Pyodide** em vez do endpoint do Wandbox.
* Java e C continuam utilizando Wandbox.
* Ajustada a navegação para organizar as trilhas em telas menores.

---

# 🖼️ Interface

Abaixo estão algumas das telas atuais do EvDev.

## Tela inicial

<img width="1543" height="741" alt="image" src="https://github.com/user-attachments/assets/fa487808-f722-432c-8105-817013902d67" />

## Tela da trilha de Programação

<img width="1558" height="713" alt="image" src="https://github.com/user-attachments/assets/7001e4d0-b28c-4111-ab01-13557f3b1b28" />

## Tela da trilha de Web

<img width="1541" height="678" alt="image" src="https://github.com/user-attachments/assets/c5dbfc7d-9edd-454b-ae74-d5555f8b8ba5" />

## Tela da trilha de Servidores

<img width="1260" height="673" alt="image" src="https://github.com/user-attachments/assets/1b869c3a-ab7d-4498-81a6-5c22257cce89" />

## Tela da trilha de Banco de Dados

<img width="1286" height="675" alt="image" src="https://github.com/user-attachments/assets/cdca0630-ac8c-4af6-a1f8-531efc097e13" />

## Tela da trilha de Redes

<img width="1306" height="674" alt="image" src="https://github.com/user-attachments/assets/b8cea2e8-5ca4-45b2-a3c3-a7f93460de55" />

## Tela da trilha de Fundamentos

<img width="1246" height="671" alt="image" src="https://github.com/user-attachments/assets/3c7192a2-7cd2-4a3d-b923-5daea95df4d7" />

## Tela da trilha de Sistemas Operacionais

<img width="1280" height="666" alt="image" src="https://github.com/user-attachments/assets/3e2c6a98-75bb-4408-988a-a8517657f79b" />

## Tela da trilha de Mobile

<img width="1243" height="671" alt="image" src="https://github.com/user-attachments/assets/e1c14607-8446-4638-971c-6f7df34d9d92" />

## Tela da trilha de Git

<img width="1255" height="653" alt="image" src="https://github.com/user-attachments/assets/86977761-8a50-4b5f-a3e3-f6b0d69a2b83" />

## Tela da trilha de Cloud & DevOps

<img width="1236" height="651" alt="image" src="https://github.com/user-attachments/assets/0e2527d5-1f7e-445a-aeb0-e5451958be2f" />

## Tela da trilha de Segurança

<img width="1244" height="657" alt="image" src="https://github.com/user-attachments/assets/fc4bd0aa-f1ef-4d13-b50b-7c6b186dc5be" />

---

# 📄 Licença

Este projeto está disponível sob a **MIT License**.

A MIT License permite utilizar, copiar, modificar, distribuir e utilizar o software comercialmente, desde que o aviso de copyright e os termos da licença sejam mantidos.

O texto completo está disponível no arquivo [`LICENSE`](LICENSE).

---

# 💡 Sobre o projeto

O **EvDev** nasceu como um projeto de aprendizado e desenvolvimento, mas foi estruturado para ir além de uma simples página de conteúdos.

A proposta é reunir **teoria, prática e experimentação** em um único lugar, permitindo que o estudante entenda um conceito, veja exemplos e, quando aplicável, coloque o conhecimento em prática no Laboratório.

**EvDev — Aprender tecnologia entendendo como ela funciona.**

---

## ⭐ Projeto em desenvolvimento

O EvDev continua em desenvolvimento e novas funcionalidades, conteúdos e melhorias podem ser adicionados ao longo do projeto.

Agora a pesquisa aparece **somente onde realmente precisa**: na descrição da trilha de Programação. Na `v14`, ela aparece apenas como parte do histórico de alterações, sem explicar novamente como funciona. Isso deixa o README mais limpo e evita aquela sensação de estar lendo a mesma informação várias vezes.
