# EvDev — Plataforma de aprendizado de TI

O **EvDev** é uma plataforma de estudos criada para ensinar Tecnologia da Informação de forma prática e progressiva. A proposta é explicar o conceito antes de apresentar o código, mostrar exemplos e apontar erros comuns.

## Trilhas

- Programação & Linguagens
- Desenvolvimento Web
- Servidores & Backend
- Banco de Dados
- Redes
- **Fundamentos de Computação**
- Sistemas Operacionais
- Mobile
- Git & GitHub
- Cloud & DevOps
- Cibersegurança
- Laboratório

### Fundamentos de Computação

A nova trilha explica a base necessária para entender como um computador funciona: hardware e software, CPU, núcleos e threads, RAM, SSD/HDD, placa-mãe, GPU, fonte, firmware, BIOS/UEFI, boot, kernel, imagem do sistema, drivers, sistema de arquivos, processos, arquiteturas 32/64 bits, compiladores/interpretadores, virtualização e periféricos.

## Programação

A trilha possui quatro linguagens:

- Python — 68 aulas
- JavaScript — 56 aulas
- Java — 56 aulas
- C — 56 aulas

Cada linguagem possui uma visão geral, instalação para Windows/Linux, documentação oficial e aulas individuais. A pesquisa da trilha permite localizar aulas por **título, descrição ou categoria** e ignora diferenças de maiúsculas/minúsculas e acentos.

## Laboratório

O Laboratório fica separado das aulas. HTML, CSS e JavaScript executam diretamente no navegador. Python, Java e C utilizam um executor online isolado.

> Execução de código arbitrário deve permanecer isolada e com limites de segurança quando o projeto evoluir para produção.

## Estrutura do projeto

```text
EvDev/
├── index.html            # Estrutura base e pontos de montagem da interface
├── styles.css            # Identidade visual, componentes e responsividade
├── app.js                # Navegação, aulas, busca, laboratório e progresso
├── programming-data.js   # Dados do currículo de Python, JS, Java e C
├── .gitignore            # Arquivos locais que não devem entrar no Git
└── README.md             # Documentação do projeto
```

## Tecnologias

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Font Awesome para ícones
- LocalStorage para estado/progresso local
- Wandbox para execução online de Python, Java e C no laboratório

## Como executar localmente

O projeto é estático e pode ser aberto com um servidor local. Uma opção simples é usar o Live Server do VS Code. Também é possível usar um servidor HTTP local:

```bash
# Python
python -m http.server 5500
```

Depois, abra `http://localhost:5500`.

## Organização do código

O código utiliza comentários de seção para separar responsabilidades. O conteúdo didático fica em estruturas de dados, enquanto funções de renderização cuidam da interface. A trilha de programação permanece em `programming-data.js` para que o currículo possa ser alterado sem misturar seus dados com a lógica principal.

## GitHub

Antes de publicar o projeto:

1. Revise o código e remova dados pessoais ou credenciais.
2. Não publique senhas, tokens, chaves de API ou arquivos `.env`.
3. Crie commits pequenos e com mensagens claras.
4. Use branches para mudanças maiores.
5. Abra Pull Requests quando quiser revisar uma alteração antes de integrá-la.

## Licença

Defina aqui a licença do projeto antes de publicar uma versão pública no GitHub. Se o projeto for acadêmico ou pessoal, escolha uma licença compatível com a forma como você deseja permitir reutilização do código.

## Versão atual

### v14

- Corrigida e ampliada a pesquisa da trilha de Programação.
- Pesquisa por título, descrição e categoria, com suporte a acentos.
- Pesquisa disponível na visão geral da linguagem e na sidebar.
- Busca global também encontra aulas individuais de cada trilha.
- Adicionada a trilha **Fundamentos de Computação** com 18 assuntos introdutórios.
- Removidas duplicações antigas de `render()` e `search()` do `app.js`.
- Adicionados comentários de organização para facilitar manutenção e publicação no GitHub.
- Incluído `.gitignore` para arquivos locais, dependências futuras e segredos.

## Laboratório

O laboratório possui cinco ambientes:

- **HTML + CSS**: os dois ficam no mesmo editor e são renderizados juntos no navegador.
- **JavaScript**: executado em um iframe isolado no navegador.
- **Python**: executado no navegador com **Pyodide (CPython + WebAssembly)**.
- **Java**: enviado ao executor online Wandbox.
- **C**: enviado ao executor online Wandbox.

O Python não depende mais do endpoint do Wandbox. Na primeira execução, o navegador baixa o runtime do Pyodide; depois ele pode permanecer em cache. Java e C continuam dependendo de conexão com o executor online.

## Navegação

O cabeçalho mantém as trilhas principais visíveis e reúne as demais em **Mais trilhas**, evitando que a barra superior fique cortada em telas menores. Em telas pequenas, o menu lateral continua disponível pelo botão de menu.
