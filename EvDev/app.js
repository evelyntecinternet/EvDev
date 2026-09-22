/* ==========================================================
   EvDev — aplicação principal
   Responsabilidade: navegação, trilhas, aulas, progresso,
   laboratório e integração com os dados de programação.

   Organização geral deste arquivo:
   1. Catálogo de trilhas e assuntos
   2. Conteúdo das aulas
   3. Navegação e renderização
   4. Laboratório
   5. Trilha de Programação
   6. Inicialização da aplicação
   ========================================================== */

const topics={
 programming:{icon:'fa-terminal',title:'Programação & Lógica',desc:'Aprenda a pensar como programador: lógica, algoritmos, estruturas e orientação a objetos.',tag:'LÓGICA • POO • ALGORITMOS'},
 web:{icon:'fa-code',title:'Desenvolvimento Web',desc:'Construa páginas e aplicações entendendo HTML, CSS, JavaScript e como a Web funciona.',tag:'HTML • CSS • JS'},
 server:{icon:'fa-server',title:'Servidores & Backend',desc:'Entenda cliente, servidor, HTTP, APIs, backend, JSON e o caminho de uma requisição.',tag:'BACKEND • API • HTTP'},
 database:{icon:'fa-database',title:'Banco de Dados',desc:'Aprenda a modelar, armazenar, consultar e relacionar informações.',tag:'SQL • MODELAGEM • DADOS'},
 networks:{icon:'fa-network-wired',title:'Redes',desc:'Do IP ao DNS: descubra como computadores, roteadores e serviços se comunicam.',tag:'TCP/IP • DNS • REDES'},
 linux:{icon:'fa-desktop',title:'Sistemas Operacionais',desc:'Sistemas operacionais, terminal, arquivos, processos, permissões e administração.',tag:'LINUX • WINDOWS • CLI'},
 mobile:{icon:'fa-mobile-screen',title:'Mobile',desc:'Interfaces, estado, navegação, armazenamento, APIs e ciclo de desenvolvimento mobile.',tag:'FLUTTER • MOBILE • API'},
 git:{icon:'fa-code-branch',title:'Git & GitHub',desc:'Controle versões, organize branches e colabore em projetos reais.',tag:'GIT • GITHUB • COLABORAÇÃO'},
 cloud:{icon:'fa-cloud',title:'Cloud & DevOps',desc:'Containers, imagens, CI/CD, deploy, logs e fundamentos de computação em nuvem.',tag:'DOCKER • CLOUD • CI/CD'},
 security:{icon:'fa-shield-halved',title:'Cibersegurança',desc:'Aprenda fundamentos defensivos para proteger sistemas, aplicações, contas e dados.',tag:'SEGURANÇA • IAM • WEB'},
 computing:{icon:'fa-microchip',title:'Fundamentos de Computação',desc:'Entenda o computador por dentro: hardware, memória, armazenamento, sistema operacional, kernel, boot, drivers e outros fundamentos.',tag:'HARDWARE • SO • KERNEL'}
};

const subtopics={
 programming:[['variables','Variáveis','Guardar informações e trabalhar com valores.'],['types','Tipos de dados','Texto, números, booleanos, listas e objetos.'],['conditions','Condicionais','Fazer o programa tomar decisões.'],['loops','Repetição','Executar uma ação várias vezes.'],['functions','Funções','Organizar e reutilizar lógica.'],['arrays','Listas e coleções','Trabalhar com vários valores.'],['errors','Erros','Entender, tratar e depurar problemas.'],['oop','POO','Classes, objetos, atributos e métodos.'],['algorithms','Algoritmos','Transformar problemas em passos.']],
 web:[['html','HTML — estrutura','Como montar a estrutura de um site do zero.'],['html-head','HTML — head','Título, metadados, CSS, favicon e configurações.'],['html-tags','HTML — tags essenciais','Títulos, textos, links, imagens, listas, tabelas e divs.'],['html-semantic','HTML semântico','header, nav, main, section, article, aside e footer.'],['html-forms','Formulários','Inputs, labels, tipos, atributos e envio.'],['css','CSS — estilos','Seletores, propriedades, cores e tipografia.'],['css-box','CSS — Box Model','Margin, border, padding e content.'],['css-layout','CSS — layout','Flexbox, Grid, position e alinhamento.'],['css-responsive','Responsividade','Media queries e adaptação para celular.'],['javascript','JavaScript','Lógica e comportamento no navegador.'],['dom','DOM','Encontrar e alterar elementos da página.'],['events','Eventos','Cliques, teclado, formulário e interação.'],['web-http','HTTP','Requisição, resposta, métodos e status.'],['hosting','Hospedagem','Onde os arquivos e serviços do site ficam disponíveis na internet.'],['domain','Domínio e DNS','O que é um domínio, como ele aponta para um servidor e como funciona o DNS.']],
 server:[['client','Cliente','Quem faz uma requisição e por quê.'],['server','Servidor','O que é e o que acontece por trás de um site.'],['server-http','HTTP','Como navegador e servidor conversam.'],['server-api','API','Como sistemas oferecem dados e operações.'],['rest','REST','Uma forma comum de organizar APIs HTTP.'],['json','JSON','Formato de dados muito usado em APIs.'],['status','Status HTTP','200, 201, 400, 401, 403, 404 e 500.'],['backend','Backend','Regras de negócio, autenticação e acesso a dados.']],
 database:[['tables','Tabelas','Linhas, colunas e registros.'],['select','SELECT','Consultar informações.'],['insert','INSERT','Adicionar registros.'],['update','UPDATE','Alterar registros com segurança.'],['delete','DELETE','Remover dados com cuidado.'],['joins','JOIN','Relacionar tabelas.'],['keys','Chaves','PK, FK e identificação.'],['indexes','Índices','Por que consultas podem ficar mais rápidas.'],['transactions','Transações','Manter operações consistentes.'],['modeling','Modelagem','Pensar entidades e relacionamentos.'],['connection','Conectando código ao banco','Como uma aplicação abre uma conexão, executa SQL e recebe dados, com exemplos em Python, Java e C.']],
 networks:[['ip','IP','Endereço lógico de uma interface.'],['privatepublic','IP privado x público','Diferença e onde cada um aparece.'],['dns','DNS','Como nomes viram endereços IP.'],['dhcp','DHCP','Configuração automática de rede.'],['tcpudp','TCP x UDP','Diferenças entre os protocolos.'],['ports','Portas','Como serviços são identificados.'],['router','Roteador','Como pacotes passam entre redes.'],['subnet','Máscara e sub-rede','Como redes são divididas.'],['network-http','Rede e Web','Como DNS, TCP/TLS e HTTP entram no acesso a um site.']],
 linux:[['terminal','Terminal Linux','Comandos, caminhos, navegação e cuidados desde o zero.'],['files','Arquivos e pastas','Estrutura de diretórios, caminhos absolutos/relativos, copiar, mover e remover.'],['permissions','Permissões','Usuários, grupos, r/w/x, chmod, chown e princípio do menor privilégio.'],['processes','Processos e serviços','Processos, PID, tarefas em segundo plano, serviços e diagnóstico.'],['packages','Gerenciadores de pacotes','APT, DNF, Pacman e como instalar/atualizar software com segurança.'],['shell','Shell e variáveis','Bash, Zsh, PATH, aliases, variáveis de ambiente e scripts.'],['windows','Windows e PowerShell','PowerShell, caminhos, processos, serviços e ferramentas administrativas.'],['compare','Linux x Windows','Diferenças práticas de estrutura, terminal, software, permissões e administração.'],['install-linux','Como instalar Linux','ISO, backup, pendrive bootável, UEFI/Boot Menu, Live USB e instalação.'],['distros','Distros para iniciantes','Zorin OS, Pop!_OS e como escolher uma distribuição para começar.'],['usb-safety','Pendrive bootável e cuidados','Rufus, balenaEtcher, Popsicle, verificação da ISO e cuidados com pendrive falso.']],
 mobile:[['ui','UI','Telas e componentes.'],['state','Estado','Dados que mudam durante o uso.'],['navigation','Navegação','Troca entre telas.'],['storage','Armazenamento','Guardar dados no aparelho.'],['mobile-api','APIs','Consumir serviços.'],['build','Build','Gerar uma versão executável.']],
 git:[['identity','Identidade do Git','Configurar nome e email global e local, entender a diferença e relacionar o email ao GitHub.'],['repo','Repositório','O que é, git init, .git, status e como organizar um repositório local.'],['commit','Commit','Working tree, staging, git add, commit, mensagens e histórico.'],['log','Histórico','git log, diff, show e como investigar alterações.'],['branch','Branch','Criar, trocar, atualizar, renomear e excluir branches com segurança.'],['merge','Merge','Integrar branches, entender fast-forward e resolver conflitos.'],['remote','Remoto','Origin, remote -v, adicionar e alterar repositórios remotos.'],['clone','Clone','Baixar um projeto existente e entender o vínculo com o remoto.'],['push-pull','Push e Pull','Enviar e buscar alterações sem confundir local e remoto.'],['github','GitHub','Como criar e organizar repositórios, README, fork, clone, download, compartilhamento, Pull Requests, Issues e colaboração.'],['conflicts','Conflitos','Entender marcadores, resolver, revisar diff e testar.'],['gitignore','.gitignore','Evitar node_modules, .env, builds e arquivos que não devem entrar no Git.'],['undo','Desfazer no Git','restore, reset, revert e quando cada um faz sentido.'],['workflow','Fluxo profissional','Branch, commits pequenos, Pull Request, revisão e integração.']],
 cloud:[['docker','Docker','O que é um container.'],['images','Imagens','O que uma imagem contém.'],['cicd','CI/CD','Automatizar testes e entrega.'],['deploy','Deploy','Colocar uma aplicação em um ambiente.'],['logs','Logs','Observar o que acontece.'],['cloud','Cloud','Recursos computacionais sob demanda.']],
 security:[['auth','Autenticação','Confirmar quem é o usuário.'],['authorization','Autorização','Definir o que ele pode fazer.'],['passwords','Senhas','Hashing e boas práticas.'],['https','HTTPS','Proteger a comunicação.'],['injection','Injeção','Entender e prevenir entradas perigosas.'],['backup','Backup','Recuperar dados quando algo dá errado.'],['legislation','Legislação para desenvolvedores','LGPD, Marco Civil, software, direitos autorais, dados pessoais, responsabilidades e cuidados no desenvolvimento.']],
 computing:[
  ['computer-basics','Computador: hardware e software','Entenda a diferença entre as partes físicas e os programas.'],
  ['cpu','CPU, núcleos e threads','O que o processador faz e como núcleos e threads participam da execução.'],
  ['ram','Memória RAM','Por que a RAM é diferente do armazenamento e como ela participa da execução dos programas.'],
  ['storage','SSD, HDD e armazenamento','Onde arquivos ficam guardados e o que muda entre RAM, SSD e HDD.'],
  ['motherboard','Placa-mãe e barramentos','Como os principais componentes se conectam e trocam dados.'],
  ['gpu','GPU e gráficos','O que a GPU faz e quando ela é usada além de jogos.'],
  ['psu','Fonte de alimentação','Como a fonte fornece energia aos componentes e por que potência e qualidade importam.'],
  ['firmware','Firmware, BIOS e UEFI','O software de baixo nível que prepara o hardware antes do sistema operacional.'],
  ['boot','Boot e inicialização','O que acontece desde o botão de ligar até o sistema operacional ficar disponível.'],
  ['kernel','Kernel','A ponte entre software e hardware e o núcleo do sistema operacional.'],
  ['system-image','Imagem do sistema','O que é uma imagem de sistema, para que serve e como ela difere de um arquivo comum.'],
  ['drivers','Drivers','Como o sistema operacional conversa com placas, impressoras, áudio e outros dispositivos.'],
  ['filesystem','Sistema de arquivos','Como o sistema organiza arquivos, diretórios, permissões e armazenamento.'],
  ['processes-computer','Processos e programas','Diferença entre programa, processo e serviço e como a memória entra nisso.'],
  ['architecture','32 bits e 64 bits','O que significa arquitetura de CPU e por que isso aparece em sistemas e programas.'],
  ['compiler-interpreter','Compilador, interpretador e executável','Como o código-fonte vira algo que o computador consegue executar.'],
  ['virtualization','Máquina virtual e virtualização','Como executar outro sistema dentro do computador e o papel do hypervisor.'],
  ['peripherals','Periféricos e interfaces','Teclado, mouse, monitor, USB, HDMI, Wi-Fi e outras formas de entrada e saída.']
 ]
};

const detailContent={
 html:{title:'HTML — como montar a estrutura de um site',level:'Iniciante',time:'25 min',lang:'html',intro:'HTML é a linguagem usada para estruturar o conteúdo de uma página. Antes de pensar em cores e animações, você precisa saber montar essa estrutura. Pense no HTML como a planta da casa: ele define o que existe e qual é o papel de cada parte.',sections:[
  ['1. O documento HTML básico',`Todo documento começa com uma estrutura padrão. O navegador usa essa estrutura para interpretar corretamente a página.`, `<!DOCTYPE html>\n<html lang="pt-BR">\n  <head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Meu site</title>\n  </head>\n  <body>\n    <h1>Olá!</h1>\n    <p>Meu primeiro site.</p>\n  </body>\n</html>`,['DOCTYPE informa que o documento usa HTML moderno.','html é o elemento raiz da página.','head guarda configurações e informações sobre a página.','body contém aquilo que será apresentado ao usuário.']],
  ['2. O que vai no head?',`O head não é o conteúdo principal que você lê na tela. Ele contém informações importantes para o navegador e para a página, como título, codificação, viewport, CSS e outros metadados.`,`<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>EvDev</title>\n  <link rel="stylesheet" href="styles.css">\n</head>`,['title define o título exibido na aba.','charset ajuda a interpretar corretamente caracteres como ç e acentos.','viewport é importante para páginas responsivas em celulares.','link pode conectar o HTML a um arquivo CSS.']],
  ['3. Tags essenciais',`Você não precisa decorar centenas de tags de uma vez. Comece pelas que aparecem em praticamente todos os sites.`,`<h1>Título</h1>\n<h2>Subtítulo</h2>\n<p>Um parágrafo.</p>\n<a href="https://exemplo.com">Abrir</a>\n<img src="foto.jpg" alt="Descrição da foto">\n<ul><li>Item</li></ul>`,['h1 até h6 representam níveis de título.','p representa um parágrafo.','a cria links.','img insere imagem e deve ter alt descritivo quando apropriado.','ul/ol/li criam listas.']],
  ['4. Div, span e organização',`div é um contêiner genérico de bloco e span é um contêiner genérico em linha. Eles são úteis, mas não substituem elementos semânticos quando existe um elemento que descreve melhor o conteúdo.`,`<div class="card">\n  <h2>Curso de HTML</h2>\n  <span>Iniciante</span>\n</div>`,['Use class para identificar grupos de elementos para CSS/JS.','Evite criar uma página inteira formada apenas por divs quando elementos semânticos fizerem sentido.']],
  ['5. HTML semântico',`HTML semântico significa escolher elementos pelo significado do conteúdo, e não apenas pela aparência. Isso melhora organização, acessibilidade e manutenção.`,`<header>Topo</header>\n<nav>Menu</nav>\n<main>\n  <section>\n    <article>Conteúdo</article>\n  </section>\n</main>\n<footer>Rodapé</footer>`,['header representa uma área introdutória.','nav representa navegação.','main representa o conteúdo principal.','section agrupa uma seção temática.','article representa conteúdo que pode fazer sentido por si só.','footer representa informações de rodapé.']],
  ['6. Formulários',`Formulários permitem receber dados do usuário. Aprenda primeiro a relacionar label e input e a entender os principais tipos de campo.`,`<form>\n  <label for="nome">Nome</label>\n  <input id="nome" name="nome" type="text" required>\n  <button type="submit">Enviar</button>\n</form>`,['label explica o campo e pode ser associado pelo for/id.','name identifica o dado quando o formulário é enviado.','type define o tipo de entrada.','required indica uma informação obrigatória no navegador.']],
  ['7. Atributos',`Atributos acrescentam informações ou comportamentos aos elementos. Alguns aparecem em praticamente todos os projetos.`,`<a href="/sobre" class="link" id="menu-sobre">Sobre</a>\n<input type="email" placeholder="seu@email.com" required>`,['class é muito usada para CSS e JavaScript.','id identifica um elemento de forma única na página.','href define o destino de um link.','src define a origem de uma imagem ou outro recurso.']],
  ['8. Como pensar a estrutura de um site',`Antes de escrever código, pense nas áreas da página. Um site simples pode ter cabeçalho, navegação, conteúdo principal, seções e rodapé. Depois você transforma cada área em elementos HTML.`,`<body>\n  <header>Logo + menu</header>\n  <main>\n    <section>Apresentação</section>\n    <section>Projetos</section>\n    <section>Contato</section>\n  </main>\n  <footer>Direitos e links</footer>\n</body>`,['Primeiro organize o conteúdo.','Depois escolha elementos semânticos.','Só depois pense no CSS.','Por fim use JavaScript para comportamento quando necessário.']],
  ['9. Checklist de HTML',`Uma boa base de HTML envolve mais do que saber criar um h1. Você deve conseguir estruturar uma página completa e entender por que cada elemento está ali.`,null,['Documento com DOCTYPE e lang.','head com charset, viewport e title.','Conteúdo organizado dentro do body.','Títulos em uma hierarquia coerente.','Links e imagens com atributos adequados.','Formulários com labels.','Uso de elementos semânticos quando fizer sentido.']]
 ]},
 'html-head':{title:'HTML — o que acontece dentro do head?',level:'Iniciante',time:'15 min',lang:'html',intro:'O head concentra informações que ajudam o navegador, mecanismos de busca e outros recursos a entender e carregar a página.',sections:[['Meta tags essenciais','Use charset e viewport desde o começo.',`<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">`,['charset cuida da codificação.','viewport ajuda no comportamento em telas menores.']],['Título e CSS','O title aparece na aba do navegador e o link conecta uma folha de estilos.',`<title>Minha página</title>\n<link rel="stylesheet" href="styles.css">`,['Mantenha o title descritivo.','Prefira CSS externo em projetos maiores.']]]},
 'html-tags':{title:'HTML — tags que você precisa conhecer',level:'Iniciante',time:'20 min',lang:'html',intro:'Você não precisa decorar tudo. Aprenda as categorias principais e consulte a documentação quando esquecer uma tag.',sections:[['Textos e títulos','Use h1-h6, p, strong, em e pequenas marcações.',`<h1>Meu projeto</h1>\n<p>Estou <strong>aprendendo</strong> HTML.</p>`,['h1 é o título principal da página ou seção conforme a estrutura.','strong indica importância.','em indica ênfase.']],['Links e imagens','Links conectam páginas e imagens precisam de contexto.',`<a href="sobre.html">Sobre</a>\n<img src="foto.jpg" alt="Pessoa estudando programação">`,['href aponta para o destino.','alt descreve a imagem quando ela transmite informação.']],['Listas e tabelas','Use listas para itens e tabelas para dados tabulares.',`<ul><li>HTML</li><li>CSS</li></ul>\n<table><tr><th>Curso</th><th>Nível</th></tr></table>`,['Não use tabela apenas para montar layout.']] ]},
 css:{title:'CSS — como dar estilo ao site',level:'Iniciante',time:'25 min',lang:'css',intro:'CSS controla a apresentação do HTML: cores, tamanhos, espaçamentos, fontes, layout, responsividade e muito mais.',sections:[['Seletores','O seletor diz quais elementos receberão as regras.',`h1 {\n  color: #ff7a18;\n  font-size: 36px;\n}\n.card {\n  padding: 20px;\n}`,['Seletores por elemento, classe e id têm usos diferentes.','Classes são uma escolha comum para estilos reutilizáveis.']],['Box Model','Todo elemento de caixa envolve conteúdo, padding, border e margin.',`.card {\n  width: 300px;\n  padding: 20px;\n  border: 1px solid #ddd;\n  margin: 20px;\n}`,['padding cria espaço interno.','margin cria espaço externo.','border fica entre os dois.']],['Flexbox e Grid','Use Flexbox para organizar itens em uma dimensão e Grid para layouts em duas dimensões.',`.menu { display: flex; gap: 16px; }\n.cards { display: grid; grid-template-columns: repeat(3, 1fr); }`,['Aprenda justify-content e align-items.','Depois avance para Grid.']],['Responsividade','O layout deve se adaptar ao tamanho da tela.',`@media (max-width: 700px) {\n  .cards { grid-template-columns: 1fr; }\n}`,['Pense primeiro em conteúdo e depois em breakpoint.']]]},
 javascript:{title:'JavaScript — fazendo a página reagir',level:'Iniciante',time:'25 min',lang:'javascript',intro:'JavaScript permite criar comportamento: responder a cliques, alterar conteúdo, validar formulários, trabalhar com dados e consumir APIs.',sections:[['Variáveis e valores',`Use variáveis para guardar dados que seu programa precisa manipular.`,`const nome = 'Ana';\nlet idade = 20;\nconsole.log(nome, idade);`,['const é usado quando a referência não será reatribuída.','let permite reatribuição.']],['Funções','Funções agrupam uma tarefa e podem receber dados.',`function saudacao(nome) {\n  return 'Olá, ' + nome;\n}\nconsole.log(saudacao('Ana'));`,['Dê nomes claros às funções.','Prefira funções pequenas e com responsabilidade definida.']],['DOM','O DOM representa a página como objetos que JavaScript pode consultar e modificar.',`const titulo = document.querySelector('h1');\ntitulo.textContent = 'Olá, JavaScript!';`,['querySelector encontra um elemento.','textContent altera texto.']],['Eventos','Eventos conectam uma ação do usuário a uma função.',`document.querySelector('button').addEventListener('click', () => {\n  alert('Você clicou!');\n});`,['click é um exemplo.','Também existem eventos de teclado, formulário, mouse e outros.']]]},
 client:{title:'Cliente — quem pede um recurso?',level:'Iniciante',time:'10 min',lang:'text',intro:'Cliente é o lado que inicia uma comunicação. O navegador é um exemplo de cliente, mas aplicativos e outros serviços também podem ser clientes.',sections:[['Exemplo','Quando você abre um site, o navegador faz requisições.',`Navegador\n   ↓ requisição\nServidor\n   ↓ resposta\nNavegador`,['Cliente não significa necessariamente pessoa.','Um programa pode ser cliente de outro programa.']]]},
 server:{title:'Servidor — o que existe por trás de um site?',level:'Iniciante',time:'15 min',lang:'text',intro:'Servidor pode significar o computador, serviço ou processo que fica disponível para receber solicitações e fornecer recursos.',sections:[['Fluxo','Um site moderno pode envolver servidor web, backend e banco de dados.',`Cliente → Servidor Web → Backend → Banco\n                       ↓\n                    resposta`,['O backend executa regras.','O banco guarda dados.','O servidor web pode entregar arquivos e encaminhar requisições.']]]},
 dns:{title:'DNS — como www.exemplo.com vira um IP?',level:'Iniciante',time:'15 min',lang:'text',intro:'DNS é o sistema que permite usar nomes de domínio em vez de decorar endereços IP.',sections:[['A ideia','Quando você digita um domínio, seu dispositivo precisa descobrir qual endereço usar.',`www.exemplo.com\n       ↓ consulta DNS\n203.0.113.10`,['O nome é mais fácil para humanos.','O IP é usado na comunicação de rede.']],['Passo a passo','A resolução pode envolver cache e servidores DNS.',`1. navegador/sistema verifica cache\n2. consulta um resolvedor\n3. resolvedor encontra o registro\n4. retorna um endereço`,['Na prática, caches podem evitar novas consultas.']]]},
 ip:{title:'Endereço IP',level:'Iniciante',time:'12 min',lang:'text',intro:'Um endereço IP identifica logicamente uma interface em uma rede. É uma das peças básicas para a comunicação entre dispositivos.',sections:[['Exemplo local',`Em uma rede doméstica, aparelhos podem ter endereços privados.`,`PC       192.168.1.10\nCelular  192.168.1.20\nRoteador 192.168.1.1`,['O endereço do roteador costuma ser usado como gateway na rede local.']]]},
 api:{title:'API — sistemas conversando com sistemas',level:'Iniciante',time:'15 min',lang:'javascript',intro:'Uma API define uma forma organizada para um sistema oferecer dados ou operações para outro sistema.',sections:[['Exemplo','Uma aplicação pode pedir dados de um usuário.',`GET /usuarios/42\n\n{\n  "id": 42,\n  "nome": "Ana"\n}`,['GET costuma representar leitura em APIs HTTP.','JSON é um formato comum de resposta.']],['Fluxo','A aplicação cliente envia uma requisição e recebe uma resposta.',`Aplicativo → API → regra de negócio → banco\nAplicativo ← JSON ← API`,['Uma API também precisa tratar erros e autenticação quando necessário.']]]},
 tables:{title:'Tabelas — organizando dados',level:'Iniciante',time:'12 min',lang:'sql',intro:'Em bancos relacionais, tabelas organizam registros em linhas e atributos em colunas.',sections:[['Exemplo',`Imagine uma tabela de usuários.`,`usuarios\nID | nome | email\n1  | Ana  | ana@email.com\n2  | João | joao@email.com`,['Cada linha representa um registro.','Cada coluna representa um atributo.']]]},
 select:{title:'SELECT — consultando dados',level:'Iniciante',time:'12 min',lang:'sql',intro:'SELECT é usado para consultar dados em bancos relacionais.',sections:[['Consulta básica',`Comece escolhendo colunas e a tabela.`,`SELECT nome, email\nFROM usuarios;`,['FROM indica de onde os dados vêm.','Você pode selecionar apenas as colunas necessárias.']],['Filtrando',`WHERE limita os registros que atendem a uma condição.`,`SELECT nome\nFROM usuarios\nWHERE ativo = 1;`,['Cuidado com condições e com UPDATE/DELETE sem WHERE.']]]},
 joins:{title:'JOIN — relacionando tabelas',level:'Intermediário',time:'18 min',lang:'sql',intro:'JOIN permite combinar dados relacionados de duas ou mais tabelas.',sections:[['Exemplo',`Se pedidos têm um usuario_id, você pode trazer dados das duas tabelas.`,`SELECT usuarios.nome, pedidos.id\nFROM usuarios\nJOIN pedidos ON pedidos.usuario_id = usuarios.id;`,['A condição ON explica como os registros se relacionam.']]]},
 terminal:{title:'Terminal — conversando com o sistema',level:'Iniciante',time:'15 min',lang:'shell',intro:'O terminal permite executar comandos para navegar, criar arquivos, instalar ferramentas e administrar sistemas.',sections:[['Comandos iniciais',`Comece aprendendo poucos comandos e entendendo o que cada um faz.`,`pwd\nls\ncd projeto\nmkdir estudos\ntouch anotacoes.txt`,['pwd mostra o diretório atual.','ls lista conteúdo.','cd muda de diretório.','mkdir cria pasta.']]]},
 compare:{title:'Linux x Windows — diferenças práticas',level:'Iniciante',time:'15 min',lang:'text',intro:'Os dois sistemas podem executar muitas tarefas semelhantes, mas possuem ferramentas, estruturas e formas de administração diferentes.',sections:[['Comparação',`Não pense em um como “certo” e o outro como “errado”. O objetivo é entender as ferramentas de cada ambiente.`,`Linux: /home/eu/projeto\nWindows: C:\\Users\\Eu\\projeto\n\nLinux: Bash / Zsh\nWindows: PowerShell / Prompt`,['Linux usa uma hierarquia iniciada em /.','Windows trabalha com unidades como C:.','Ambos possuem terminais e ferramentas de automação.']]]}
};

const challenges={
 programming:[['Fácil','Par ou ímpar','Crie uma função que receba um número e informe se ele é par ou ímpar.','Use o operador resto (%).'],['Médio','Maior valor','Percorra uma lista e encontre o maior valor sem usar Math.max.','Mantenha uma variável com o maior valor encontrado.'],['Difícil','Sistema de biblioteca','Modele Livro, Usuario e Emprestimo e defina as regras de empréstimo.','Separe responsabilidades e valide disponibilidade.']],
 web:[['Fácil','Primeira página','Crie uma página com h1, parágrafo e um link.','Use a estrutura HTML básica.'],['Médio','Card responsivo','Crie três cards que fiquem em coluna no celular e em linha no desktop.','Combine HTML, CSS Grid/Flexbox e media query.'],['Difícil','Mini site','Crie uma página completa com header, navegação, conteúdo, formulário e footer.','Use HTML semântico e CSS responsivo.']],
 server:[['Fácil','Cliente x servidor','Explique o fluxo de uma requisição de página.','Cliente envia; servidor processa e responde.'],['Médio','Status HTTP','Diga quando você usaria 200, 201, 404 e 500.','Associe cada código ao tipo de resultado.'],['Difícil','API','Desenhe o fluxo de uma API que consulta usuários no banco.','Inclua cliente, endpoint, validação, banco e resposta.']],
 database:[['Fácil','SELECT','Consulte nome e email de todos os usuários.','SELECT nome, email FROM usuarios;'],['Médio','JOIN','Relacione usuários e pedidos usando usuario_id.','Use JOIN e uma condição ON.'],['Difícil','Modelagem','Modele clientes, pedidos e itens de pedido.','Identifique chaves e relacionamentos.']],
 networks:[['Fácil','DNS','Explique o que acontece quando você digita um domínio no navegador.','O sistema resolve o domínio para um endereço usando DNS.'],['Médio','TCP x UDP','Dê um exemplo de situação adequada para cada um.','Compare confiabilidade, conexão e overhead.'],['Difícil','Diagnóstico','Monte uma sequência de comandos para investigar uma falha de acesso a um site.','Comece por conectividade, DNS e caminho de rede.']],
 linux:[['Fácil','Terminal','Crie uma pasta e entre nela usando comandos.','Use mkdir e cd.'],['Médio','Permissões','Explique r, w e x para um arquivo.','Leia como read, write e execute.'],['Difícil','Diagnóstico','Investigue por que um serviço não iniciou.','Considere processos, logs, portas e permissões.']],
 mobile:[['Fácil','Tela','Descreva os componentes de uma tela de login.','Campo de email, senha e botão são exemplos.'],['Médio','Estado','Explique como a tela muda quando o login está carregando.','Use um estado que represente loading.'],['Difícil','Arquitetura','Separe UI, estado, serviço HTTP e armazenamento.','Evite concentrar toda a lógica no componente visual.']],
 git:[['Fácil','Commit','Explique para que serve um commit.','Ele registra um conjunto coerente de alterações.'],['Médio','Branch','Crie um fluxo para desenvolver uma nova funcionalidade sem alterar main diretamente.','Use branch, commits e integração posterior.'],['Difícil','Conflito','Descreva como resolver um conflito de merge com segurança.','Analise as mudanças, teste e só então finalize.']],
 cloud:[['Fácil','Container','Explique o que é um container.','É um ambiente isolado para executar uma aplicação e suas dependências.'],['Médio','CI/CD','Desenhe um pipeline com testes antes do deploy.','Código → testes → build → deploy.'],['Difícil','Deploy','Monte um fluxo com homologação, produção e monitoramento.','Inclua validação antes da produção e observabilidade.']],
 security:[['Fácil','Acesso','Diferencie autenticação e autorização.','Autenticação identifica; autorização define permissões.'],['Médio','Senhas','Explique por que senha não deve ser armazenada em texto puro.','Use hashing adequado e controles complementares.'],['Difícil','Web','Liste medidas defensivas para uma aplicação web.','Validação, controle de acesso, sessões seguras, atualizações e testes.']]
};

const lessonExtra={
'html-forms':{title:'HTML — formulários do zero',intro:'Formulários são usados para receber informações do usuário. Você vai entender os campos, labels, tipos de input e o que acontece quando o formulário é enviado.',lang:'html',sections:[['1. Estrutura básica', 'Um formulário normalmente possui form, label e campos de entrada. O label explica o campo e ajuda na acessibilidade.', '<form>\n  <label for="nome">Nome</label>\n  <input id="nome" name="nome" type="text">\n  <button type="submit">Enviar</button>\n</form>', ['Use for no label apontando para o id do input.','name é importante quando os dados serão enviados.']],['2. Tipos de campo','O tipo do input muda o comportamento e a validação básica do navegador.','<input type="text">\n<input type="email">\n<input type="password">\n<input type="number">\n<input type="date">',['Escolha o tipo que representa melhor o dado.','Não use password para esconder dados comuns; ele existe para entradas de senha.']],['3. O que acontece ao enviar?','O navegador pode enviar os dados para uma URL usando GET ou POST. O backend é quem normalmente valida e processa os dados.','<form action="/cadastro" method="post">\n  ...\n</form>', ['Nunca confie apenas na validação do navegador.','Dados recebidos pelo servidor precisam ser validados novamente.']]]},
'insert':{title:'INSERT — adicionando dados com segurança',intro:'INSERT cria novos registros em uma tabela. O segredo é saber quais colunas receberão valores e conferir as regras da tabela antes de inserir.',lang:'sql',sections:[['1. Inserção básica','Informe a tabela, as colunas e os valores correspondentes.','INSERT INTO usuarios (nome, email)\nVALUES (\'Ana\', \'ana@email.com\');',['A ordem das colunas precisa corresponder à ordem dos valores.','Evite depender de uma ordem implícita de colunas.']],['2. Inserindo vários registros','Você pode inserir mais de uma linha em uma única instrução.','INSERT INTO usuarios (nome, email)\nVALUES\n  (\'Ana\', \'ana@email.com\'),\n  (\'Bruno\', \'bruno@email.com\');',['Isso pode ser mais eficiente do que vários comandos separados.']],['3. O que evitar','Nunca monte SQL com texto de entrada do usuário diretamente. Em aplicações, use consultas parametrizadas/prepared statements.','INSERT INTO usuarios (nome, email)\nVALUES (?, ?);',['Valide os dados.','Use parâmetros para reduzir o risco de SQL injection.']] ]},
'update':{title:'UPDATE — alterando informações sem destruir a tabela',intro:'UPDATE modifica registros que já existem. É uma operação poderosa: esquecer o WHERE pode alterar muitas linhas de uma vez.',lang:'sql',sections:[['1. Alteração com WHERE','Escolha quais registros serão alterados usando uma condição.','UPDATE usuarios\nSET nome = \'Ana Silva\'\nWHERE id = 10;',['Leia o WHERE como: “somente onde...”.','Use uma chave ou condição suficientemente específica.']],['2. O perigo de esquecer WHERE','Sem WHERE, o banco pode alterar todos os registros da tabela.','UPDATE usuarios\nSET nome = \'Erro\';',['Antes de um UPDATE importante, faça primeiro um SELECT com o mesmo WHERE para conferir os registros.']],['3. Prática segura','Em sistemas reais, considere transações, permissões adequadas, backup e testes antes de alterações grandes.','SELECT * FROM usuarios WHERE id = 10;\nUPDATE usuarios SET nome = \'Ana Silva\' WHERE id = 10;',['Confirme o resultado depois da alteração.']] ]},
'delete':{title:'DELETE — removendo dados com cuidado',intro:'DELETE remove registros. É uma das operações que mais exige atenção porque um filtro errado pode apagar dados que você não queria remover.',lang:'sql',sections:[['1. Remover um registro','Use WHERE para selecionar exatamente o registro desejado.','DELETE FROM usuarios\nWHERE id = 10;',['Confira antes com SELECT.','Tenha cuidado especialmente em produção.']],['2. O grande perigo','DELETE sem WHERE remove todos os registros da tabela.','DELETE FROM usuarios;',['Nunca execute uma exclusão ampla sem saber exatamente o impacto.']],['3. Soft delete','Muitos sistemas preferem marcar um registro como inativo em vez de apagá-lo imediatamente.','UPDATE usuarios\nSET ativo = false\nWHERE id = 10;',['Isso pode facilitar auditoria e recuperação.','A estratégia depende do sistema e das regras dos dados.']] ]},
'keys':{title:'Chaves — como as tabelas se relacionam',intro:'Chaves ajudam o banco a identificar registros e criar relações entre tabelas. Você vai entender chave primária e chave estrangeira.',lang:'sql',sections:[['1. Primary Key (PK)','A chave primária identifica de forma única cada registro.','CREATE TABLE usuarios (\n  id INT PRIMARY KEY,\n  nome VARCHAR(100)\n);',['Não deve haver dois registros com a mesma PK.','Normalmente cada tabela possui uma identificação principal.']],['2. Foreign Key (FK)','A chave estrangeira aponta para uma chave de outra tabela e representa uma relação.','CREATE TABLE pedidos (\n  id INT PRIMARY KEY,\n  usuario_id INT,\n  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)\n);',['Um pedido pode apontar para um usuário.','O banco pode ajudar a impedir referências inválidas.']]]},
'commit':{title:'Git Commit — registrando uma mudança',intro:'Um commit é um ponto registrado no histórico do projeto. Pense nele como uma fotografia organizada das alterações que você decidiu guardar.',lang:'shell',sections:[['1. Veja o que mudou','Antes de criar o commit, confira o estado do projeto.','git status\ngit diff',['status mostra arquivos modificados.','diff ajuda a revisar o conteúdo alterado.']],['2. Coloque as alterações na área de stage','O stage é a seleção do que entrará no próximo commit.','git add arquivo.html\n# ou\ngit add .',['git add . adiciona todas as alterações do diretório atual; use com atenção.']],['3. Crie o commit','Agora registre as alterações com uma mensagem clara.','git commit -m "Adiciona página de contato"',['Prefira mensagens curtas que expliquem a mudança.','Um commit deve representar uma mudança coerente.']],['4. Confira o histórico','Depois, consulte os commits registrados.','git log --oneline',['O commit fica no histórico local.','Enviar para o GitHub é outra etapa: git push.']] ]},
'branch':{title:'Git Branch — trabalhando sem bagunçar a main',intro:'Branch permite criar uma linha de desenvolvimento separada. É comum usar uma branch para desenvolver uma funcionalidade antes de integrá-la ao projeto principal.',lang:'shell',sections:[['1. Criar e entrar em uma branch','Crie uma branch com um nome que explique o trabalho.','git switch -c feature/login',['Você pode usar nomes como feature/login ou fix/menu-mobile.']],['2. Trabalhar normalmente','Edite arquivos, faça testes e crie commits nessa branch.','git status\ngit add .\ngit commit -m "Adiciona validação do login"',['Os commits ficam associados à branch atual.']],['3. Integrar','Depois de revisar, a branch pode ser integrada à principal, muitas vezes por Pull Request no GitHub.','git switch main\ngit merge feature/login',['Em equipes, siga o fluxo definido pelo projeto.']] ]},
'permissions':{title:'Linux — permissões de arquivos',intro:'Linux usa permissões para controlar quem pode ler, alterar ou executar arquivos. Entender r, w e x é essencial para trabalhar com servidores e terminal.',lang:'shell',sections:[['1. Leia as permissões','ls -l mostra informações como proprietário, grupo e permissões.','ls -l arquivo.txt',['r = read (ler).','w = write (escrever).','x = execute (executar).']],['2. Proprietário, grupo e outros','As permissões são organizadas para o dono, o grupo e os demais usuários.','-rwxr-xr-- arquivo.sh',['Não dê permissão de escrita ou execução sem necessidade.']],['3. chmod','chmod altera permissões.','chmod +x script.sh\n./script.sh',['Use permissões mínimas necessárias.','Evite usar chmod 777 como solução automática.']] ]},
'docker':{title:'Docker — entendendo containers do zero',intro:'Docker empacota uma aplicação e suas dependências em um container. A ideia é reduzir diferenças entre ambientes e tornar a execução mais previsível.',lang:'shell',sections:[['1. Imagem x container','Imagem é o modelo; container é uma instância em execução dessa imagem.','docker pull nginx\ndocker run -d -p 8080:80 nginx',['Uma imagem pode originar vários containers.','O container é o ambiente isolado em execução.']],['2. Portas','O parâmetro -p liga uma porta do computador à porta do container.','docker run -p 8080:80 nginx',['8080 é a porta no computador.','80 é a porta do serviço dentro do container.']],['3. Dockerfile','Dockerfile descreve como construir uma imagem própria.','FROM node:22\nWORKDIR /app\nCOPY . .\nRUN npm install\nCMD ["node", "server.js"]',['Cada instrução cria uma etapa da construção da imagem.']],['4. O que Docker não é','Container não é simplesmente uma máquina virtual completa. Ele compartilha o kernel do sistema hospedeiro e usa isolamento de processos.',['Use containers para empacotar e executar serviços de forma reproduzível.','Para persistência, entenda volumes; para múltiplos serviços, conheça Docker Compose.']] ]},
'oop':{title:'POO — Programação Orientada a Objetos',intro:'POO é uma forma de organizar programas usando objetos que possuem dados e comportamentos. A ideia fica mais fácil quando você relaciona o código a coisas do problema que está modelando.',lang:'java',sections:[['1. Classe e objeto','Classe é o molde; objeto é uma instância criada a partir desse molde.','class Pessoa {\n  String nome;\n}\n\nPessoa pessoa = new Pessoa();',['A classe descreve o que o objeto pode ter e fazer.']],['2. Atributos e métodos','Atributos representam dados; métodos representam comportamentos.','class Conta {\n  double saldo;\n\n  void depositar(double valor) {\n    saldo += valor;\n  }\n}',['saldo é um atributo.','depositar é um método.']],['3. Encapsulamento','Encapsular significa controlar como o estado interno pode ser acessado ou alterado.','class Conta {\n  private double saldo;\n\n  public void depositar(double valor) {\n    if (valor > 0) saldo += valor;\n  }\n}',['Isso ajuda a proteger regras do objeto.']],['4. Outros conceitos','Herança, polimorfismo e abstração são conceitos importantes, mas devem ser estudados depois de dominar classes, objetos, atributos e métodos.',['Não tente decorar os quatro pilares sem entender primeiro o problema que o código está modelando.']] ]}
};
// Conteúdo didático para todos os cartões que ainda não possuem uma aula específica.
const genericLessons={
variables:['Variáveis','Uma variável é um nome usado para guardar um valor que o programa pode consultar ou alterar.','let idade = 20;\nlet nome = "Ana";',['Escolha nomes claros.','O valor pode mudar durante a execução.']],
types:['Tipos de dados','O tipo informa que tipo de valor está sendo trabalhado, como texto, número ou booleano.','let nome = "Ana";\nlet idade = 20;\nlet ativo = true;',['Conheça os tipos da linguagem que estiver estudando.']],
conditions:['Condicionais','Condicionais permitem executar caminhos diferentes dependendo de uma condição.','if (idade >= 18) {\n  console.log("Maior de idade");\n} else {\n  console.log("Menor de idade");\n}',['Use condições para representar regras do problema.']],
loops:['Repetição','Loops repetem uma tarefa enquanto uma condição ou sequência determinar.','for (let i = 0; i < 5; i++) {\n  console.log(i);\n}',['Cuidado com condições que nunca terminam.']],
functions:['Funções','Funções agrupam uma tarefa em um bloco reutilizável.','function somar(a, b) {\n  return a + b;\n}',['Dê nomes que expliquem o que a função faz.']],
arrays:['Listas e coleções','Uma coleção guarda vários valores para serem percorridos ou acessados.','const frutas = ["maçã", "banana", "uva"];\nconsole.log(frutas[0]);',['Entenda índice e tamanho da coleção.']],
errors:['Erros e depuração','Erro não significa que você fracassou: é uma pista sobre o que precisa ser corrigido.','try {\n  // código que pode falhar\n} catch (erro) {\n  console.log(erro);\n}',['Leia a mensagem do erro.','Teste uma mudança por vez.']],
algorithms:['Algoritmos','Algoritmo é uma sequência de passos para resolver um problema. Antes de programar, descreva a solução em linguagem simples.','1. Receber os números\n2. Comparar os valores\n3. Mostrar o maior',['Um bom algoritmo reduz a confusão antes do código.']],
'css-box':['CSS — Box Model','Todo elemento pode ser entendido como uma caixa formada por conteúdo, padding, border e margin.','div {\n  width: 200px;\n  padding: 20px;\n  border: 2px solid black;\n  margin: 10px;\n}',['Padding é espaço interno.','Margin é espaço externo.']],
'css-layout':['CSS — layout','Flexbox e Grid ajudam a organizar elementos sem depender de posicionamentos manuais.','.cards {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n}',['Comece entendendo flex container e flex items.']],
'css-responsive':['CSS — responsividade','Responsividade adapta o layout a diferentes tamanhos de tela.','@media (max-width: 700px) {\n  .menu { display: block; }\n}',['Pense primeiro no conteúdo e depois nas telas.']],
'dom':['DOM — controlando a página','O DOM representa o HTML como uma estrutura que o JavaScript pode consultar e modificar.','const titulo = document.querySelector("h1");\ntitulo.textContent = "Novo título";',['Selecione o elemento e altere apenas o que precisa.']],
events:['JavaScript — eventos','Eventos permitem reagir a ações como clique, teclado e envio de formulário.','button.addEventListener("click", () => {\n  alert("Clicou!");\n});',['O navegador dispara o evento e sua função reage.']],
'rest':['REST — organizando APIs','REST é um estilo muito usado para APIs HTTP. Recursos são acessados por URLs e operações usam métodos HTTP.','GET /usuarios\nPOST /usuarios\nGET /usuarios/10\nDELETE /usuarios/10',['A prática comum usa HTTP de forma semântica.']],
json:['JSON — formato de dados','JSON é um formato textual simples para representar objetos, listas e valores.','{\n  "nome": "Ana",\n  "idade": 20\n}',['É muito usado para trocar dados entre frontend e backend.']],
backend:['Backend — regras por trás da aplicação','Backend roda no servidor e normalmente cuida de regras de negócio, autenticação, acesso ao banco e APIs.','Cliente → API → Backend → Banco\n       ← resposta ←',['Não coloque segredos ou regras sensíveis apenas no frontend.']],
status:['Status HTTP','Códigos HTTP ajudam a indicar o resultado de uma requisição.','200 OK\n201 Created\n400 Bad Request\n401 Unauthorized\n403 Forbidden\n404 Not Found\n500 Server Error',['Leia o código junto com o contexto da operação.']],
'dhcp':['DHCP — recebendo configuração de rede','DHCP automatiza a entrega de informações como endereço IP, gateway e DNS para dispositivos.','Dispositivo → DHCP → configuração\nIP + gateway + DNS',['Isso evita configurar tudo manualmente em redes comuns.']],
tcpudp:['TCP x UDP','TCP prioriza uma comunicação orientada a conexão e entrega confiável; UDP é mais simples e não oferece a mesma garantia de entrega.','TCP: conexão → dados → confirmação\nUDP: dados → envio',['A escolha depende da aplicação.']],
ports:['Portas de rede','Portas identificam serviços dentro de um dispositivo que usa IP.','IP + porta → serviço\n192.168.1.10:443',['Não confunda porta com endereço IP.']],
router:['Roteador','O roteador encaminha pacotes entre redes e normalmente conecta uma rede local a outras redes.','PC → roteador → Internet',['Gateway padrão é um conceito importante aqui.']],
subnet:['Máscara e sub-rede','A máscara ajuda a separar a parte de rede e a parte de host de um endereço IP.','192.168.1.10/24\nrede: 192.168.1.0',['CIDR /24 é uma forma compacta de representar a máscara.']],
files:['Linux — arquivos e pastas','No terminal, você navega por uma árvore de diretórios e pode criar, copiar, mover e remover arquivos.','pwd\nls\ncd projetos\nmkdir teste\ntouch arquivo.txt',['Sempre confirme o caminho antes de remover arquivos.']],
processes:['Linux — processos','Um processo é um programa em execução. O sistema atribui recursos e identifica cada processo.','ps\ntop\nkill PID',['Não finalize processos sem entender o que são.']],
packages:['Linux — pacotes','Gerenciadores de pacotes instalam, atualizam e removem software de forma organizada.','sudo apt update\nsudo apt install git',['O comando muda conforme a distribuição.']],
shell:['Shell e variáveis','Shell é o interpretador que recebe comandos. Bash e Zsh são exemplos de shells.','echo $HOME\nVAR="EvDev"\necho $VAR',['Entenda variáveis de ambiente e PATH.']],
windows:['Windows — PowerShell','PowerShell permite administrar o Windows por comandos e scripts.','Get-Location\nGet-ChildItem\nSet-Location .\\Projetos',['PowerShell trabalha com objetos e possui muitos cmdlets.']],
ui:['Mobile — interfaces','UI é a parte visual com a qual o usuário interage: botões, textos, campos, listas e navegação.','Tela → componentes → interação',['Uma boa UI deixa claro o que pode ser feito.']],
state:['Mobile — estado','Estado são dados que podem mudar e fazer a interface ser atualizada.','carregando = true\n→ mostrar indicador\ncarregando = false\n→ mostrar conteúdo',['Pense em quais dados realmente precisam ser observados pela interface.']],
navigation:['Mobile — navegação','Navegação é a troca entre telas ou destinos da aplicação.','Login → Home → Detalhes',['Planeje o fluxo antes de criar muitas telas.']],
storage:['Mobile — armazenamento','Armazenamento local guarda informações no dispositivo para uso posterior.','Preferências\n→ armazenamento local\n→ leitura ao abrir o app',['Não guarde segredos de forma insegura no armazenamento local.']],
build:['Mobile — build','Build é o processo de transformar o projeto em uma versão executável/distribuível.','Código → dependências → build → APK/IPA/outro artefato',['Build e deploy são etapas diferentes.']],
repo:['Git — repositório','Repositório é a pasta/projeto acompanhado pelo Git, incluindo seu histórico.','git init\ngit status',['O histórico permite comparar e recuperar versões.']],
merge:['Git — merge','Merge integra os commits de uma branch em outra.','git switch main\ngit merge feature/login',['Conflitos podem aparecer quando as mesmas linhas foram alteradas de formas incompatíveis.']],
github:['GitHub — colaboração','GitHub hospeda repositórios Git e oferece recursos como Pull Requests, Issues e revisão de código.','git push origin main',['Git é a ferramenta de versionamento; GitHub é uma plataforma que trabalha com Git.']],
conflicts:['Git — conflitos','Conflito acontece quando o Git não consegue escolher automaticamente entre alterações incompatíveis.','<<<<<<< HEAD\nversão A\n=======\nversão B\n>>>>>>> branch',['Edite o arquivo, escolha a versão correta, depois faça git add e commit.']],
workflow:['Git — fluxo de trabalho','Um fluxo comum é criar branch, desenvolver, fazer commits, enviar ao remoto e abrir um Pull Request.','branch → commits → push → Pull Request → revisão → merge',['O fluxo pode variar conforme a equipe.']],
images:['Docker — imagens','Imagem é um pacote imutável usado como base para criar containers.','docker images\ndocker pull nginx',['Tags ajudam a identificar versões.']],
cicd:['CI/CD — automatizando o caminho do código','CI automatiza integração e testes; CD automatiza etapas de entrega/deploy.','push → build → testes → deploy',['Automação reduz tarefas manuais e torna o processo repetível.']],
deploy:['Deploy — colocando a aplicação no ambiente','Deploy é disponibilizar uma versão da aplicação em um ambiente onde ela será usada.','código → build → servidor/cloud → aplicação',['Ambientes podem ser desenvolvimento, teste e produção.']],
logs:['Logs — enxergando o que acontece','Logs registram eventos de uma aplicação ou sistema e ajudam a diagnosticar problemas.','INFO servidor iniciado\nERROR conexão recusada',['Não registre senhas ou dados sensíveis nos logs.']],
cloud:['Cloud — recursos sob demanda','Computação em nuvem oferece recursos como máquinas, armazenamento e serviços pela rede.','usuário → Internet → serviço cloud',['Cloud não significa simplesmente “um computador mágico”; ainda existem servidores e recursos físicos.']],
auth:['Autenticação','Autenticação responde “quem é você?”. Login é um exemplo.','email + senha → identidade confirmada',['Autenticação é diferente de autorização.']],
authorization:['Autorização','Autorização responde “o que você pode fazer?”.','usuário autenticado → pode editar? → sim/não',['Permissões devem ser verificadas no servidor quando aplicável.']],
passwords:['Senhas e hashing','Senhas devem ser armazenadas usando mecanismos adequados de hashing com salt, nunca em texto puro.','senha → função de hash → hash armazenado',['Não confunda hash com criptografia reversível.']],
https:['HTTPS','HTTPS usa TLS para proteger a comunicação HTTP contra leitura ou alteração indevida durante o transporte.','navegador ⇄ TLS ⇄ servidor',['HTTPS protege a comunicação, mas não torna uma aplicação automaticamente segura.']],
injection:['Injeção','Injeção acontece quando dados fornecidos pelo usuário são interpretados como parte de uma linguagem ou comando.','entrada do usuário → validação + parâmetros → banco',['Use consultas parametrizadas e valide entradas conforme o contexto.']],
backup:['Backup','Backup é uma cópia planejada dos dados para permitir recuperação após perda ou falha.','dados → backup → armazenamento separado → restauração',['Backup que nunca foi testado pode não ser suficiente; restauração também precisa ser verificada.']]
};
const areaIntro={programming:'Programação é transformar uma necessidade em instruções executáveis. Variáveis guardam dados, condições escolhem caminhos, laços repetem tarefas e funções organizam responsabilidades. Esses conceitos aparecem em praticamente todas as linguagens.',web:'Na Web, o navegador recebe HTML, CSS e JavaScript e transforma esses recursos em uma interface. HTML define estrutura, CSS define apresentação e JavaScript adiciona comportamento. Os conceitos se conectam: um botão pode existir no HTML, receber estilo no CSS e reagir a um evento no JavaScript.',server:'Uma aplicação Web normalmente possui um cliente, uma camada de servidor e, quando necessário, serviços e banco de dados. A requisição percorre essas camadas, regras são aplicadas e uma resposta volta para o cliente. Entender essa divisão ajuda a saber onde cada código deve ficar.',database:'Banco de dados organiza informações para que aplicações possam armazenar, consultar e modificar registros. Em bancos relacionais, tabelas, chaves, relacionamentos, índices e transações trabalham juntos para manter os dados úteis e consistentes.',networks:'Uma comunicação de rede passa por várias etapas. O dispositivo precisa de configuração de rede, encontra o destino, usa protocolos e chega ao serviço correto por meio de portas. DNS, DHCP, IP, roteamento, TCP/UDP e HTTP resolvem problemas diferentes.',linux:'No Linux, o sistema é composto por kernel, serviços, arquivos, usuários, permissões e ferramentas. O terminal oferece uma forma direta de administrar tudo isso. Os comandos parecem pequenos, mas cada opção pode mudar bastante o resultado.',mobile:'Uma aplicação mobile é formada por telas e componentes que mudam conforme o estado da aplicação. Navegação, armazenamento e chamadas de API conectam a interface à lógica e aos dados. O desenvolvimento também precisa considerar diferentes telas e recursos do dispositivo.',git:'Git registra alterações em um histórico local. Branches permitem separar linhas de desenvolvimento e commits registram pontos importantes desse histórico. GitHub adiciona hospedagem, revisão e colaboração, mas o conceito de versionamento continua sendo do Git.',cloud:'Aplicações precisam ser construídas, executadas, observadas e atualizadas. Docker empacota aplicações, CI/CD automatiza etapas, deploy disponibiliza versões e logs ajudam a descobrir o que aconteceu em execução.',security:'Segurança é uma combinação de controles. Identidade, permissões, comunicação, armazenamento, validação e recuperação precisam ser considerados juntos. Um único recurso, como HTTPS, não corrige todas as vulnerabilidades.',computing:'Um computador é um conjunto de componentes físicos e camadas de software trabalhando juntos. CPU, RAM, armazenamento, firmware, drivers e sistema operacional têm responsabilidades diferentes. Entender essa base ajuda a compreender programação, Linux, servidores, redes e desenvolvimento de aplicações.'};
const errorMap={
variables:'Confundir = com comparação; usar variável antes de inicializar; reatribuir const; escrever o nome com outra grafia.',types:'Confundir texto com número, como "20" com 20; ignorar conversões; não verificar null/undefined.',conditions:'Usar = no lugar de comparação; inverter condição; esquecer else; criar condição impossível.',loops:'Esquecer contador e criar loop infinito; índice fora do limite; alterar coleção durante iteração.',functions:'Esquecer return; argumentos na ordem errada; responsabilidade demais na mesma função; dependência global desnecessária.',arrays:'Índice inexistente; esquecer que o primeiro índice normalmente é 0; alterar lista sem perceber.',errors:'Ignorar linha indicada; corrigir várias coisas de uma vez; confundir sintaxe e lógica; esconder o erro sem corrigir a causa.',oop:'Criar classes para tudo; responsabilidades demais; herança sem necessidade; atributos sem controle.',algorithms:'Codificar sem definir entrada/saída; esquecer casos de borda; testar só um exemplo; complexidade desnecessária.',html:'Esquecer DOCTYPE/lang; tags mal fechadas; IDs repetidos; imagem sem alt; div para tudo.', 'html-head':'Caminho errado no CSS; charset/viewport ausentes; title genérico; recurso inexistente.', 'html-tags':'Tag inadequada; atributo incorreto; tabela para layout; lista mal estruturada.', 'html-semantic':'Usar section/article apenas pela aparência; várias áreas main; escolher elemento pelo visual.', 'html-forms':'Input sem label; type inadequado; esquecer name; confiar só na validação do navegador; action incorreto.',css:'Seletor errado; CSS não carregado; propriedade inválida; especificidade; unidade/valor inválido.','css-box':'Confundir padding e margin; calcular largura sem considerar box model; box-sizing inconsistente.','css-layout':'Usar absolute para tudo; esquecer flex/grid; confundir eixos; larguras fixas.','css-responsive':'Largura maior que a tela; breakpoints demais; imagens sem adaptação; testar só desktop.',javascript:'Script antes do DOM; seletor null; nome incorreto; erro assíncrono sem tratamento.',dom:'Elemento inexistente; script cedo demais; innerHTML sem necessidade; querySelector retorna null.',events:'Listener duplicado; esquecer preventDefault; elemento errado; evento inadequado.',http:'Método inadequado; dado sensível na URL; HTTP sem proteção quando necessário; interpretar todo 200 como sucesso.',client:'Confundir cliente e usuário; frontend acessando banco diretamente; regra protegida apenas no cliente.',server:'Confundir servidor e banco; portas expostas; credenciais no código; ambientes misturados.',api:'Endpoint inconsistente; entrada sem validação; dados em excesso; autenticação/autorização ignoradas.',rest:'GET alterando dados; códigos HTTP ignorados; endpoints inconsistentes; segredo na URL.',json:'Vírgula extra; aspas ausentes; JSON inválido; confundir texto JSON com objeto.',status:'Tratar 401 e 403 como iguais; 200 para erro de negócio; 500 para erro do cliente.',backend:'Confiar no frontend; lógica toda em um arquivo; stack trace para usuário; validação ausente.',tables:'Sem chave primária; dados duplicados; vários valores em uma coluna; tipos inadequados.',select:'SELECT * sem necessidade; esquecer WHERE; filtro errado; sem paginação em volume grande.',insert:'Colunas/valores invertidos; NOT NULL ausente; chave duplicada; SQL concatenado.',update:'UPDATE sem WHERE; alterar linhas demais; não conferir SELECT; transação ausente quando necessária.',delete:'DELETE sem WHERE; apagar registros referenciados; sem critério/backup; confundir exclusão lógica.',joins:'ON incorreto; produto cartesiano; duplicação inesperada; JOIN em vez de LEFT JOIN.',keys:'Chave duplicada; foreign key errada; apagar pai sem entender dependências.',indexes:'Índice em toda coluna; custo de escrita ignorado; consulta não analisada.',transactions:'Esquecer COMMIT/ROLLBACK; transação aberta; falha no meio não tratada.',modeling:'Entidades mal definidas; duplicação; relacionamentos errados; estrutura misturada com apresentação.',ip:'Confundir IP com MAC/porta; IP privado tratado como público; trocar IP como solução universal.','private-public':'Achar que IP privado é segurança; expor serviço sem firewall; confundir NAT e firewall.',dns:'Confundir DNS com hospedagem; esperar atualização instantânea; registro errado; cache/TTL.',dhcp:'Dois DHCP na mesma rede; escopo errado; IP duplicado; gateway/DNS incorretos.',tcpudp:'Dizer que UDP é sempre melhor; escolher sem considerar confiabilidade, ordem e latência.',ports:'Bloquear porta errada; porta ocupada; expor serviço administrativo desnecessariamente.',router:'Gateway errado; confundir roteador e switch; não testar conectividade/DNS.',subnet:'Máscara incorreta; redes diferentes sem rota; confundir máscara e gateway.',ui:'Componentes pequenos; feedback ausente; layout quebrado; excesso de informação.',state:'Estado duplicado; atualizar depois da tela destruída; guardar estado derivado.',navigation:'Rota protegida sem autenticação; fluxo sem retorno; parâmetros incorretos.',storage:'Segredo em armazenamento inseguro; migração ausente; dados demais localmente.',build:'Build de desenvolvimento em produção; versões diferentes; assinatura/configuração ausente.',repo:'git init na pasta errada; .env versionado; .gitignore ausente; confundir local e remoto.',commit:'Segredo no commit; mensagem vaga; tarefas misturadas; achar que commit faz push.',branch:'Branch desatualizada; trabalhar em main; misturar tarefas.',merge:'Conflito resolvido sem revisar; sem testes após merge; código incompleto.',github:'Git e GitHub confundidos; segredo no push; remote/branch errados.',conflicts:'Marcadores apagados sem entender; esquecer git add; não testar.',workflow:'Tudo em main; commits gigantes; PR sem testes; branch desatualizada.',docker:'Imagem e container confundidos; porta esquecida; dados sem volume; segredo na imagem.',images:'latest sem controle; imagem grande; contexto excessivo; .dockerignore ausente.',cicd:'Deploy sem testes; segredos no repositório; permissões excessivas; ambientes não separados.',deploy:'Produção manual; variáveis esquecidas; sem rollback; saúde não verificada.',logs:'Senha/token em log; pouco contexto; excesso; níveis ausentes.',cloud:'Recurso público; custos esquecidos; chaves no código; falsa sensação de segurança.',auth:'Autenticado tratado como administrador; confiança no navegador; sessão/token sem expiração.',authorization:'Botão escondido como “segurança”; permissão não verificada no backend.',passwords:'Texto puro; MD5/SHA-1 para senha; senha em logs.',https:'HTTPS tratado como segurança total; certificado inválido; mistura HTTP/HTTPS.',injection:'Entrada concatenada em SQL/comandos; confiança no frontend; parâmetros ausentes.',backup:'Backup no mesmo disco; restauração nunca testada; retenção insuficiente; arquivos esquecidos.'
};
// ===== Conteúdo aprofundado EvDev v6 =====
// Cada assunto recebe uma aula estruturada. O Laboratório continua separado no menu.
const lessonSpecific={
 variables:['Uma variável dá um nome a um valor para que o programa possa reutilizá-lo e alterá-lo.','nome = "Ana"\nidade = 20\nidade = idade + 1','Confundir atribuição com comparação; usar variável antes de inicializar; trocar maiúsculas/minúsculas; criar estado global sem necessidade.'],
 types:['Tipos informam que espécie de valor está sendo manipulada. Isso afeta operações, conversões e validações.','"10" + "5"  // texto\n10 + 5      // número','Receber número como texto; conversão inválida; misturar null/undefined/NaN; assumir que toda linguagem trata tipos da mesma forma.'],
 conditions:['Condicionais permitem escolher caminhos diferentes conforme uma expressão seja verdadeira ou falsa.','if (idade >= 18) {\n  console.log("Maior de idade");\n} else {\n  console.log("Menor");\n}','Condição invertida; operador errado; caso não previsto; comparação entre tipos incompatíveis.'],
 loops:['Loops repetem uma operação sem duplicar o mesmo código manualmente.','for (let i = 0; i < 3; i++) {\n  console.log(i);\n}','Loop infinito por não atualizar a condição; limite errado; índice fora do intervalo; alterar coleção durante a iteração sem entender o efeito.'],
 functions:['Funções agrupam uma responsabilidade que pode ser chamada várias vezes. Elas podem receber parâmetros e devolver um resultado.','function somar(a, b) {\n  return a + b;\n}\nconst total = somar(2, 3);','Argumento ausente; retorno esquecido; função fazendo responsabilidades demais; variável fora do escopo.'],
 arrays:['Coleções armazenam vários valores relacionados. Em muitas linguagens, o primeiro índice é 0.','const nomes = ["Ana", "Lia", "João"];\nconsole.log(nomes[0]);','Acessar índice inexistente; confundir array com objeto; alterar a coleção sem perceber; assumir que toda linguagem usa a mesma API.'],
 errors:['Depuração é o processo de encontrar a causa de um comportamento incorreto. Nem todo erro é de sintaxe: um programa também pode funcionar e calcular algo errado.','console.log(valor);\nconsole.log(typeof valor);','Leia a primeira mensagem de erro; confira arquivo e linha; reproduza o problema; não faça várias mudanças de uma vez.'],
 oop:['POO organiza o programa em objetos que combinam estado e comportamento. Classe é um molde; objeto é uma instância desse molde.','class Pessoa {\n  constructor(nome) { this.nome = nome; }\n}\nconst ana = new Pessoa("Ana");','Classe gigante; herança usada apenas para reaproveitar código; atributos sem controle; objeto acumulando responsabilidades demais.'],
 algorithms:['Algoritmo é uma sequência de passos para transformar entradas em uma saída. Antes do código, descreva a solução com exemplos simples.','Entrada: preço\nProcessamento: desconto\nSaída: preço final','Não testar casos-limite; algoritmo que não termina; repetir trabalho desnecessário; otimizar sem medir.'],
 html:['HTML estrutura o conteúdo de uma página. Uma página completa normalmente separa configuração no head e conteúdo no body.','<!DOCTYPE html>\n<html lang="pt-BR">\n<head>...</head>\n<body><h1>Oi</h1></body>\n</html>','Tags mal fechadas; hierarquia de títulos confusa; href/src trocados; id duplicado; esquecer alt quando a imagem é informativa.'],
 'html-head':['O head contém informações e recursos da página que não são o conteúdo principal visível.','<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>EvDev</title>','Arquivo CSS com caminho errado; charset ausente; viewport ausente; título genérico; favicon/link apontando para arquivo inexistente.'],
 'html-tags':['Tags são elementos que dão estrutura e significado ao conteúdo. Comece por títulos, parágrafos, links, imagens, listas e tabelas.','<h1>Produtos</h1>\n<p>Conheça nossos produtos.</p>\n<a href="/contato">Contato</a>','Usar tabela para layout; img sem src; a sem href quando deveria navegar; título escolhido apenas pelo tamanho visual.'],
 'html-semantic':['HTML semântico usa elementos de acordo com o papel do conteúdo. Isso melhora organização e acessibilidade.','<header>...</header>\n<nav>...</nav>\n<main>...</main>\n<footer>...</footer>','Usar div para tudo; vários main sem necessidade; nav contendo conteúdo que não é navegação; escolher elemento pela aparência.'],
 'html-forms':['Formulários recebem dados. label, input, name, type e submit são partes importantes para criar uma entrada bem estruturada.','<label for="email">E-mail</label>\n<input id="email" name="email" type="email" required>','label apontando para id errado; input sem name; confiar somente na validação do navegador; aceitar dados no backend sem validação.'],
 css:['CSS define aparência e layout. As regras combinam seletor, propriedade e valor e participam da cascata.','.card {\n  color: white;\n  padding: 20px;\n  background: #071a2d;\n}','Classe escrita diferente no HTML; seletor que não encontra elemento; propriedade inválida; especificidade inesperada; excesso de !important.'],
 'css-box':['Box Model explica como tamanho e espaço são calculados: content, padding, border e margin.','* { box-sizing: border-box; }\n.card { padding: 20px; border: 1px solid; }','Largura maior que o esperado; scroll horizontal; confundir margin com padding; esquecer que content-box pode aumentar o tamanho total.'],
 'css-layout':['Flexbox organiza itens em uma dimensão; Grid organiza linhas e colunas. position controla posicionamento em relação ao fluxo e referências definidas.','.menu { display:flex; gap:16px; align-items:center; }\n.cards { display:grid; grid-template-columns:repeat(3,1fr); }','Alinhar no eixo errado; container sem largura disponível; absolute sem ancestral de referência; grid que não se adapta ao espaço.'],
 'css-responsive':['Responsividade adapta estrutura e conteúdo a diferentes larguras. Media queries são apenas uma das ferramentas disponíveis.','@media (max-width: 700px) {\n  .menu { flex-direction: column; }\n}','Larguras fixas; imagem maior que o container; texto cortado; overflow horizontal; testar somente no monitor do desenvolvedor.'],
 javascript:['JavaScript adiciona lógica e comportamento à página e pode trabalhar com DOM, eventos, armazenamento e APIs.','const nome = "Ana";\ndocument.querySelector("h1").textContent = nome;','ReferenceError; TypeError; elemento retornando null; script executando antes do DOM; função chamada no lugar de passada como callback.'],
 dom:['DOM é a representação em objetos da estrutura HTML. JavaScript pode selecionar, alterar, criar e remover elementos.','const titulo = document.querySelector("h1");\ntitulo.textContent = "Olá";','Seletor incorreto; querySelector retornando null; script cedo demais; inserir HTML com dados não confiáveis.'],
 events:['Eventos permitem reagir a cliques, teclado, input e envio de formulários.','button.addEventListener("click", () => {\n  console.log("clicou");\n});','Listener no elemento errado; função executada imediatamente; submit sem preventDefault quando necessário; criar listeners repetidos.'],
 client:['Cliente é o lado que inicia uma comunicação para consumir um recurso. Navegador, app mobile e curl podem atuar como clientes.','Navegador → GET /produtos → servidor','URL errada; DNS sem resolução; timeout; CORS no navegador; autenticação ausente.'],
 server:['Servidor é um sistema que recebe requisições e oferece serviços. Pode ser uma máquina física, VM, container ou serviço gerenciado.','Cliente → servidor → banco\n        ← resposta','Serviço parado; porta ocupada; variável de ambiente ausente; timeout; conexão com banco recusada.'],
 http:['HTTP define como requisições e respostas são trocadas entre cliente e servidor.','GET /usuarios HTTP/1.1\n\nHTTP/1.1 200 OK','404 recurso não encontrado; 401 autenticação; 403 permissão; 500 falha interna; método ou URL incorretos.'],
 api:['API é uma interface que permite que um software utilize recursos ou operações de outro sistema.','GET /api/produtos\nPOST /api/produtos','Entrada fora do formato; token ausente; endpoint errado; status inconsistente; contrato da API mal compreendido.'],
 rest:['REST é um estilo para organizar APIs usando recursos e operações HTTP de maneira coerente.','GET /usuarios\nGET /usuarios/10\nPOST /usuarios','Usar verbos desnecessários na URL; status incoerente; recurso mal definido; documentação divergente da implementação.'],
 json:['JSON é um formato textual para representar objetos, listas e valores e aparece com frequência em APIs.','{"nome":"Ana","idade":20,"ativo":true}','Vírgula sobrando; aspas simples; chave sem aspas; esperar undefined no JSON; Content-Type incorreto.'],
 status:['Status HTTP resumem o resultado de uma requisição. Saber diferenciá-los ajuda a localizar o problema.','200 OK\n201 Created\n400 Bad Request\n401 Unauthorized\n404 Not Found\n500 Internal Server Error','Confundir 401 com 403; tratar todo 4xx como erro do servidor; ignorar o corpo da resposta; não olhar a aba Network.'],
 backend:['Backend concentra regras de negócio, validação, acesso a dados e serviços que não devem depender apenas do navegador.','Request → Controller → Service → Database','Confiar no frontend para autorização; entrada sem validação; segredo no código; exceção sem tratamento; conexão de banco mal configurada.'],
 tables:['Tabela organiza dados em linhas e colunas. A definição da tabela determina nomes, tipos, restrições e relações.','CREATE TABLE usuarios (\n id INT PRIMARY KEY,\n nome VARCHAR(100),\n email VARCHAR(150)\n);','Coluna com tipo inadequado; chave ausente; nomes inconsistentes; guardar vários valores em uma coluna; alterar schema sem planejar migração.'],
 select:['SELECT consulta dados sem alterar os registros. WHERE filtra, ORDER BY ordena e LIMIT limita resultados em bancos que suportam essa sintaxe.','SELECT id, nome\nFROM usuarios\nWHERE idade >= 18\nORDER BY nome;','Esquecer WHERE; usar coluna inexistente; comparar NULL com =; retornar dados demais sem necessidade.'],
 insert:['INSERT adiciona registros. Liste explicitamente as colunas para deixar claro o que está sendo gravado.','INSERT INTO usuarios (nome, email)\nVALUES (\'Ana\', \'ana@email.com\');','Campo obrigatório ausente; chave duplicada; tipo incompatível; foreign key apontando para registro inexistente.'],
 update:['UPDATE altera registros existentes. A condição WHERE é essencial quando somente algumas linhas devem mudar.','SELECT * FROM usuarios WHERE id=10;\nUPDATE usuarios SET nome=\'Ana\' WHERE id=10;','UPDATE sem WHERE; condição ampla demais; alterar coluna errada; não conferir o resultado antes.'],
 delete:['DELETE remove linhas. É destrutivo e deve ser precedido por uma verificação da condição quando os dados importam.','SELECT * FROM usuarios WHERE id=10;\nDELETE FROM usuarios WHERE id=10;','DELETE sem WHERE; FK impedindo exclusão; apagar registros relacionados; não ter estratégia de recuperação.'],
 joins:['JOIN combina registros de tabelas relacionadas por uma condição. A quantidade de linhas pode aumentar quando existe relação um-para-muitos.','SELECT u.nome, p.id\nFROM usuarios u\nJOIN pedidos p ON p.usuario_id=u.id;','JOIN sem condição adequada; duplicação esperada interpretada como erro; coluna ambígua; relacionamento errado.'],
 keys:['Chaves identificam registros e representam relacionamentos. PK identifica a linha; FK aponta para uma chave relacionada; UNIQUE evita duplicidade conforme a regra.','id INT PRIMARY KEY\nusuario_id INT REFERENCES usuarios(id)','PK duplicada; FK inexistente; UNIQUE violado; usar como chave um dado que muda sem avaliar as consequências.'],
 indexes:['Índice é uma estrutura auxiliar que pode acelerar filtros, joins e ordenações, mas tem custo de armazenamento e escrita.','CREATE INDEX idx_email ON usuarios(email);','Criar índices sem medir; índice redundante; ordem inadequada em índice composto; esperar que todo índice seja usado.'],
 transactions:['Transação agrupa operações que precisam manter consistência. COMMIT confirma; ROLLBACK desfaz alterações não confirmadas conforme o banco e contexto.','BEGIN;\nUPDATE contas SET saldo=saldo-100 WHERE id=1;\nUPDATE contas SET saldo=saldo+100 WHERE id=2;\nCOMMIT;','Transação longa; deadlock; esquecer rollback após erro; assumir comportamento de isolamento sem conhecer o banco.'],
 modeling:['Modelagem transforma requisitos em entidades, atributos e relacionamentos antes ou junto da criação do banco.','Usuário 1 ─── N Pedido\nPedido N ─── 1 Produto','Misturar entidades; repetir dados desnecessariamente; não definir chaves; muitos-para-muitos sem tabela associativa.'],
 ip:['IP fornece endereçamento para interfaces de rede. IPv4 usa quatro octetos; IPv6 usa endereços maiores em hexadecimal.','IPv4: 192.168.1.10/24\nIPv6: 2001:db8::10','IP duplicado; máscara errada; gateway incorreto; interface desligada; confundir endereço local com público.'],
 'private-public':['IP privado é usado em redes locais; IP público é usado para endereçamento na Internet conforme o provedor e a configuração. NAT frequentemente faz a tradução entre eles.','PC 192.168.1.20 → roteador/NAT → Internet','Tentar acessar IP privado pela Internet; port forwarding errado; firewall bloqueando; confundir NAT com firewall.'],
 dns:['DNS traduz nomes de domínio em registros que podem apontar para endereços e outros serviços.','A: exemplo.com → 203.0.113.10\nAAAA → IPv6','NXDOMAIN; SERVFAIL; registro apontando para IP errado; cache/TTL fazendo uma alteração antiga continuar aparecendo.'],
 dhcp:['DHCP fornece automaticamente configurações de rede, como IP, máscara, gateway e DNS.','Discover → Offer → Request → ACK','Pool esgotado; DHCP indisponível; configuração manual conflitante; cliente recebendo endereço inesperado.'],
 tcpudp:['TCP fornece conexão e mecanismos de entrega/ordenação; UDP envia datagramas sem essas garantias por padrão.','TCP → conexão/confiabilidade\nUDP → datagrama/baixa sobrecarga','Cliente usando TCP para serviço UDP; porta bloqueada; firewall; esperar que UDP garanta entrega automaticamente.'],
 ports:['Porta é um identificador lógico usado com IP e protocolo de transporte para direcionar tráfego a serviços.','192.168.1.10:443 → HTTPS\n192.168.1.10:22 → SSH','Porta ocupada; serviço não escutando; firewall; testar TCP quando o serviço usa UDP.'],
 router:['Roteador encaminha pacotes entre redes. O gateway padrão é o próximo passo comum quando o destino está fora da rede local.','PC → 192.168.1.1 → Internet','Gateway errado; rota ausente; interface desligada; firewall; testar DNS antes de confirmar conectividade IP.'],
 subnet:['Sub-rede separa uma rede em partes usando máscara/CIDR. /24 em IPv4 normalmente corresponde a 255.255.255.0.','192.168.1.10/24\nrede: 192.168.1.0','Máscara errada; hosts em redes diferentes sem roteamento; cálculo incorreto de rede/host.'],
 files:['No Linux, arquivos e diretórios formam uma árvore. Caminhos podem ser absolutos ou relativos.','pwd\nls -la\ncd ~/Projetos\nmkdir estudos\ntouch aula.txt','Caminho digitado errado; diferença entre maiúsculas/minúsculas; espaço no nome sem aspas; remover pasta errada.'],
 permissions:['Permissões Linux controlam leitura, escrita e execução para dono, grupo e outros.','ls -l script.sh\nchmod u+x script.sh\n./script.sh','Permission denied; dono/grupo incorreto; falta de x no diretório; usar chmod 777 sem necessidade.'],
 processes:['Processo é uma instância de programa em execução. PID identifica o processo naquele momento.','ps aux\ntop\nkill 1234','Matar processo errado; serviço reiniciado automaticamente; CPU/memória alta sem investigar qual processo é responsável.'],
 packages:['Gerenciadores de pacotes instalam e atualizam software usando repositórios da distribuição.','Ubuntu/Debian: sudo apt update && sudo apt install git\nFedora: sudo dnf install git\nArch: sudo pacman -S git','Usar comando da distribuição errada; repositório indisponível; pacote inexistente; dependência em conflito.'],
 shell:['Shell interpreta comandos e permite scripts. Bash e Zsh são shells comuns no Linux. PATH ajuda o shell a localizar executáveis.','echo $PATH\nwhich git\nVAR="EvDev"\necho "$VAR"','command not found; PATH incorreto; variável vazia; esquecer aspas quando há espaços.'],
 windows:['PowerShell é um shell e ambiente de automação do Windows. Seus comandos principais são cmdlets.','Get-Location\nGet-ChildItem\nSet-Location .\\Projetos','CommandNotFoundException; caminho inexistente; acesso negado; política de execução; confundir sintaxe do Bash com PowerShell.'],
 ui:['UI é a interface visual e interativa do aplicativo. Componentes, hierarquia, espaçamento e estados precisam funcionar em telas pequenas.','Tela → AppBar → conteúdo → botão','Botão pequeno; texto cortado; teclado cobrindo campo; falta de estado de loading/erro/vazio.'],
 state:['Estado são dados que mudam durante o uso e determinam o que a interface mostra.','loading=true → mostrar carregamento\nloading=false → mostrar conteúdo','Estado desatualizado; loading que nunca termina; alterar estado de forma incompatível com o framework.'],
 navigation:['Navegação organiza a passagem entre telas e pode carregar parâmetros e histórico de retorno.','Login → Home → Produto/10 → Checkout','Rota inexistente; parâmetro nulo; pilha de navegação confusa; perder estado ao voltar.'],
 storage:['Armazenamento local guarda dados no dispositivo. Preferências simples e bancos locais têm usos diferentes.','tema="dark"\nSQLite → usuarios/pedidos','Guardar senha em texto puro; schema sem migração; chave inexistente; ler antes de inicializar o armazenamento.'],
 build:['Build transforma o projeto e dependências em um artefato instalável/distribuível.','Código → dependências → build → APK/AAB','SDK ausente; dependência incompatível; assinatura inválida; versão/configuração incorreta.'],
 repo:['Repositório é o projeto acompanhado pelo Git, incluindo histórico e estado de arquivos.','git init\ngit status\ngit log --oneline','Inicializar dentro de outro repositório; não entender .gitignore; trabalhar na pasta errada.'],
 commit:['Commit registra no histórico local as alterações preparadas no staging.','git status\ngit diff\ngit add index.html\ngit commit -m "Adiciona página inicial"','Committar arquivo errado; esquecer git add; mensagem vaga; colocar .env/chaves no commit; acreditar que commit já enviou ao GitHub.'],
 branch:['Branch cria uma linha de desenvolvimento separada para trabalhar sem misturar imediatamente a alteração com a base.','git switch -c feature/login\ngit branch','Criar a branch a partir de base desatualizada; trabalhar na branch errada; apagar trabalho não integrado.'],
 merge:['Merge integra o histórico de uma branch em outra e pode gerar conflitos quando as alterações não podem ser combinadas automaticamente.','git switch main\ngit merge feature/login','Fazer merge na branch errada; resolver conflito aceitando tudo sem revisar; esquecer git add após resolver.'],
 github:['GitHub é uma plataforma que hospeda repositórios Git e oferece Pull Requests, Issues, revisão e automações.','git remote -v\ngit push -u origin main','Remote incorreto; push rejeitado; branch protegida; autenticação; usar force push sem entender o histórico.'],
 conflicts:['Conflito aparece quando o Git não consegue escolher automaticamente entre alterações incompatíveis.','<<<<<<< HEAD\nversão A\n=======\nversão B\n>>>>>>> feature','Resolver sem entender o conteúdo; esquecer marcadores; não executar git add; continuar rebase/merge sem conferir status.'],
 workflow:['Fluxo comum: atualizar a base, criar branch, desenvolver, commitar, enviar ao remoto, revisar e integrar.','git switch main\ngit pull\ngit switch -c feature/busca\ngit push -u origin feature/busca','Misturar várias tarefas em uma branch; commits sem relação; push na branch errada; ignorar testes/revisão.'],
 docker:['Docker usa imagens para criar containers isolados em nível de processo. Container não é uma máquina virtual completa.','docker pull nginx\ndocker run -p 8080:80 nginx','Porta já ocupada; container parado; imagem errada; volume não persistido; segredo colocado na imagem.'],
 images:['Imagem Docker é um artefato composto por camadas usado como base para containers. Tags ajudam a identificar versões.','docker build -t evdev-app:1.0 .\ndocker images','Contexto de build errado; tag incorreta; imagem gigante; copiar arquivos desnecessários por falta de .dockerignore.'],
 cicd:['CI/CD automatiza etapas como build, testes e entrega para tornar o processo repetível.','push → checkout → build → test → package → deploy','Segredo exposto; teste instável; dependência não fixada; pipeline diferente do ambiente real.'],
 deploy:['Deploy é disponibilizar uma versão da aplicação em um ambiente onde ela será executada.','build → servidor/cloud → aplicação','Variável ausente; porta; permissão; banco inacessível; versão diferente entre dev e produção.'],
 logs:['Logs registram eventos para acompanhar comportamento e investigar problemas.','INFO servidor iniciado\nERROR conexão recusada','Log sem contexto; excesso de ruído; senha/token nos logs; horário ou identificador ausente.'],
 cloud:['Cloud fornece recursos computacionais e serviços pela rede, como máquinas, armazenamento, bancos e serviços gerenciados.','usuário → Internet → serviço cloud','Região errada; permissão IAM; recurso inexistente; limite de serviço; custo inesperado.'],
 auth:['Autenticação verifica a identidade de quem está tentando acessar um sistema.','email + senha → servidor → sessão/token','Senha em texto puro; ausência de MFA quando adequado; credencial exposta; mensagens que revelam contas.'],
 authorization:['Autorização define o que uma identidade autenticada pode fazer.','usuário → role=editor → pode editar\nrole=user → somente ler','Confiar no frontend; permissão ampla demais; não verificar propriedade do recurso; IDOR/BOLA.'],
 passwords:['Senhas devem ser protegidas com mecanismos específicos de password hashing e boas práticas de credenciais.','senha → Argon2/bcrypt/scrypt + salt → hash','Texto puro; hash inadequado para senha; senha em log; salt reutilizado; senha de teste em produção.'],
 https:['HTTPS é HTTP protegido por TLS, ajudando a proteger a comunicação entre cliente e servidor.','Browser ⇄ TLS ⇄ Server','Certificado expirado; domínio diferente; cadeia inválida; conteúdo misto; acreditar que HTTPS corrige vulnerabilidades da aplicação.'],
 injection:['Injeção acontece quando entrada não confiável é interpretada como parte de uma linguagem ou comando.','SQL seguro: SELECT * FROM users WHERE email = ?','Concatenar SQL; montar comando de sistema com entrada; tentar bloquear poucas palavras em vez de usar parametrização/API segura.'],
 backup:['Backup é uma cópia planejada para permitir recuperação de dados após perda, corrupção ou incidente.','dados → backup → teste de restauração','Único backup no mesmo disco; backup nunca testado; credencial exposta; cópia sem proteção ou sem histórico suficiente.']
};
function buildDeepLesson(key,title,category){
 const g=lessonSpecific[key];
 const area={programming:'Programação',web:'Desenvolvimento Web',server:'Servidores e Backend',database:'Banco de Dados',networks:'Redes',linux:'Linux e Windows',mobile:'Mobile',git:'Git e GitHub',cloud:'Cloud e DevOps',security:'Cibersegurança'}[category]||'TI';
 const intro=g?g[0]:`Este assunto faz parte de ${area}. A aula apresenta o conceito, mostra um exemplo e explica os erros mais comuns para que você consiga reconhecer o tema na prática.`;
 const example=g?g[1]:'Exemplo relacionado ao assunto:\n' + title;
 const errors=g?g[2]:'Confira a mensagem de erro, o arquivo/comando, os nomes usados e os valores envolvidos. Não faça várias alterações ao mesmo tempo.';
 return {title,level:'Iniciante',time:'25 min',lang:key==='html'||key.startsWith('css')||key==='javascript'||key==='dom'||key==='events'?'html':category==='database'?'sql':category==='git'||category==='linux'?'shell':'text',intro,sections:[
 ['1. O que é e para que serve',intro,null,['Entenda primeiro qual problema esse recurso resolve.','Veja onde ele aparece em projetos reais.']],
 ['2. Conceitos principais',`Aqui estão os pontos que você precisa dominar em ${title}: definição, partes envolvidas, relação com os conceitos anteriores e situações em que o recurso é usado. Em vez de decorar uma palavra isolada, observe como ela participa do sistema.`,null,['Identifique as entradas e saídas.','Relacione o conceito aos recursos que normalmente aparecem junto dele.','Compare o exemplo com uma situação real.']],
 ['3. Exemplo explicado',`Leia o exemplo de cima para baixo. Cada linha representa uma ação ou uma parte do conceito. Altere um valor por vez para perceber o que muda.`,example,['O exemplo é propositalmente pequeno para facilitar a leitura.','Quando quiser testar HTML, CSS ou JavaScript, use o Laboratório no menu principal.']],
 ['4. Erros específicos e como identificar',`Erros não são apenas “cuidado para não errar”. Para este assunto, observe especificamente: ${errors}`,null,['Leia a mensagem completa e a linha/comando indicado.','Confira nomes, caminhos, tipos, permissões, parâmetros ou configurações relacionados.','Depois da correção, teste novamente o mesmo caso que produziu o problema.']],
 ['5. O que você deve conseguir explicar',`Ao terminar esta aula, você deve conseguir definir ${title.toLowerCase()}, reconhecer um exemplo simples e explicar por que o recurso é usado. Se ainda não conseguir, volte aos exemplos e compare cada parte com a explicação.`,null,['Explique o conceito com suas próprias palavras.','Reconheça o exemplo em um projeto.','Use o desafio da trilha depois de estudar a aula.']]
 ]};
}
Object.entries(subtopics).forEach(([category,items])=>items.forEach(([key,title])=>{
 if(!detailContent[key]) detailContent[key]=buildDeepLesson(key,title,category);
}));
// Sobrescreve os cartões genéricos com aulas detalhadas para todos os assuntos catalogados.
Object.entries(subtopics).forEach(([category,items])=>items.forEach(([key,title])=>{
 if(lessonSpecific[key]) detailContent[key]=buildDeepLesson(key,title,category);
}));
// ===== Fim conteúdo aprofundado =====

function lessonCategory(key){if(['variables','types','conditions','loops','functions','arrays','errors','oop','algorithms'].includes(key))return 'programming';if(['html','html-head','html-tags','html-semantic','html-forms','css','css-box','css-layout','css-responsive','javascript','dom','events'].includes(key))return 'web';if(['client','server','server-http','server-api','rest','json','status','backend'].includes(key))return 'server';if(['tables','select','insert','update','delete','joins','keys','indexes','transactions','modeling'].includes(key))return 'database';if(['ip','private-public','privatepublic','dns','dhcp','tcpudp','ports','router','subnet','network-http'].includes(key))return 'networks';if(['terminal','files','permissions','processes','packages','shell','windows','compare','install-linux','distros','usb-safety'].includes(key))return 'linux';if(['ui','state','navigation','storage','mobile-api','build'].includes(key))return 'mobile';if(['identity','repo','commit','log','branch','merge','remote','clone','push-pull','github','conflicts','gitignore','undo','workflow'].includes(key))return 'git';if(['docker','images','cicd','deploy','logs','cloud'].includes(key))return 'cloud';if(['computer-basics','cpu','ram','storage','motherboard','gpu','psu','firmware','boot','kernel','system-image','drivers','filesystem','processes-computer','architecture','compiler-interpreter','virtualization','peripherals'].includes(key))return 'computing';return 'security'}
function buildGeneratedLesson(key,title){
 const g=genericLessons[key]; if(!g)return detailFallback(key,title);
 const lang=(g[2]||'').startsWith('SELECT')?'sql':(['commit','branch','merge','repo','github','conflicts','workflow','terminal','files','permissions','processes','packages','shell','windows','docker','images','cicd','deploy'].includes(key)?'shell':'javascript');
 return {title:g[0],level:'Iniciante',time:'20 min',lang,intro:`${g[1]} Nesta aula você vai aprender o conceito com mais detalhes, ver um exemplo e conhecer erros específicos que aparecem durante a prática.`,sections:[
 ['O que é e para que serve',g[1],null,[]],
 ['Explicação detalhada',`${areaIntro[lessonCategory(key)]||''}\n\nNeste assunto especificamente: ${g[1]}`,null,['Comece pelo conceito e só depois memorize a sintaxe.','Entenda qual responsabilidade pertence a este recurso.']],
 ['Exemplo',`Comece com um exemplo pequeno. Leia cada parte, altere uma coisa por vez e execute novamente.`,g[2],g[3]||[]],
 ['Erros específicos e como identificar',errorMap[key]||'Confira a mensagem, a linha/comando indicado e o contexto antes de alterar qualquer coisa.',null,['Leia a primeira mensagem de erro e a localização indicada.','Confira nomes, caminhos, tipos, permissões e valores envolvidos.','Faça uma mudança por vez e teste novamente.']],
 ['Resumo',`Agora você consegue explicar ${g[0].toLowerCase()} e reconhecer sua utilização básica.`,null,['Consulte a documentação para detalhes de sintaxe.','Pratique primeiro em um ambiente de teste.']]
 ]};
}
function expandLessonContent(){Object.entries(subtopics).forEach(([topic,items])=>items.forEach(([key,title])=>{if(!detailContent[key])detailContent[key]=lessonExtra[key]||buildGeneratedLesson(key,title)}))}
expandLessonContent();

// Conteúdo aprofundado para aulas que precisam de passo a passo específico.
detailContent.terminal={title:'Linux — Terminal do zero: comandos, caminhos e erros',level:'Iniciante',time:'35 min',lang:'shell',intro:'Aprenda o terminal desde o começo: onde você está, como navegar, criar, ler, copiar, mover e remover arquivos, além de entender permissões, sudo e as mensagens de erro mais comuns.',sections:[
['1. Terminal x shell','O terminal é a interface onde você digita. O shell interpreta o comando e inicia o programa correspondente. Bash e Zsh são exemplos de shells.','$ pwd\n$ ls -la',['O terminal é a interface; o shell interpreta.','Não é necessário decorar tudo de uma vez.']],
['2. pwd — descobrir onde está','pwd significa print working directory e mostra o diretório atual. Isso evita executar um comando na pasta errada.','pwd\n/home/usuario/Projetos',['~ normalmente representa a pasta pessoal.','Use pwd quando estiver em dúvida sobre o caminho.']],
['3. ls — listar arquivos','ls lista o conteúdo. -l mostra detalhes, -a inclui ocultos e -h deixa tamanhos legíveis quando combinado com -l.','ls\nls -l\nls -la\nls -lah',['Arquivos iniciados por . normalmente ficam ocultos no ls simples.','Use ls antes de operações importantes.']],
['4. cd — navegar entre diretórios','cd muda o diretório. Caminho absoluto começa em /; caminho relativo usa o diretório atual como ponto de partida.','cd Projetos\ncd ..\ncd ~\ncd /tmp',['cd .. sobe um nível.','cd ~ vai para sua home.','Com espaços: cd "Meu Projeto".']],
['5. mkdir e touch','mkdir cria diretórios. touch cria um arquivo vazio ou atualiza seu timestamp se ele já existir.','mkdir estudos\nmkdir -p estudos/html/aulas\ntouch estudos/anotacoes.txt',['mkdir -p cria diretórios-pai necessários.','touch não escreve texto no arquivo.']],
['6. cp e mv','cp copia. mv move ou renomeia. O destino pode ser uma pasta ou outro nome de arquivo.','cp arquivo.txt backup.txt\nmv backup.txt backups/\nmv antigo.txt novo.txt',['mv também serve para renomear.','Confira o destino antes de usar *.']],
['7. cat, less, head e tail','cat é bom para arquivos pequenos; less permite navegar; head mostra o início; tail mostra o final. tail -f acompanha novas linhas de um log.','cat anotacoes.txt\nless app.log\nhead -n 20 app.log\ntail -f app.log',['No less, q sai da visualização.','tail -f é útil para logs.']],
['8. echo e redirecionamento','echo imprime texto. > grava substituindo o conteúdo; >> acrescenta ao final.','echo "Olá EvDev" > aula.txt\necho "Nova linha" >> aula.txt\ncat aula.txt',['O erro clássico é usar > quando queria preservar o conteúdo.','Confira o arquivo depois de redirecionar.']],
['9. rm — exclusão com cuidado','rm remove arquivos. rm -r remove diretórios e conteúdo. A recuperação pode ser difícil.','rm arquivo.txt\nrm -r pasta-teste',['Confira pwd e ls antes.','Nunca use rm -rf sem entender o caminho e as opções.','Cuidado com *.']],
['10. Permissões e sudo','ls -l mostra permissões e proprietário. chmod altera permissões. sudo executa um comando com privilégios administrativos quando sua conta possui autorização.','ls -l script.sh\nchmod u+x script.sh\n./script.sh\nsudo apt update',['Não use sudo automaticamente.','chmod 777 não é uma solução universal; pode conceder acesso excessivo.']],
['11. Erros de digitação','Linux diferencia maiúsculas e minúsculas. arquivo.txt e Arquivo.txt podem ser diferentes. Espaços também fazem parte do caminho.','cd Projetos\n# diferente de: cd projetos\ncd "Meu Projeto"',['Use Tab para completar nomes.','Use ↑ para recuperar comandos anteriores.','Leia a mensagem inteira do erro.']],
['12. Mensagens de erro importantes','command not found normalmente indica comando inexistente ou fora do PATH. No such file or directory indica caminho/nome inexistente. Permission denied indica falta de permissão. Is a directory indica que o tipo do caminho não combina com o comando.','$ cd projetoss\nbash: cd: projetoss: No such file or directory\n\n$ ./script.sh\nbash: Permission denied',['Não corrija Permission denied automaticamente com sudo ou chmod 777.','Confira nome, caminho, permissões e proprietário.']],
['13. Exercício seguro','Treine criando uma pasta exclusiva para estudo, fazendo alterações dentro dela e removendo somente o que você criou.','mkdir evdev-teste\ncd evdev-teste\ntouch aula.txt\necho "Olá" > aula.txt\ncat aula.txt\ncd ..\nrm -r evdev-teste',['Pratique em uma pasta de estudos.','Antes de rm, confirme o diretório atual.']]
]};
detailContent.compare={title:'Linux x Windows — diferenças, distribuições e como instalar',level:'Iniciante',time:'40 min',lang:'text',intro:'Entenda a diferença entre Windows e Linux, o que é uma distribuição, por que Ubuntu, Mint, Fedora, Debian e Arch são diferentes e como funciona uma instalação por pendrive.',sections:[
['1. Windows','Windows é um sistema operacional desenvolvido pela Microsoft. Ele integra interface gráfica, gerenciamento de arquivos, dispositivos, serviços e ferramentas como PowerShell.','Windows → PowerShell / Prompt\nC:\\Users\\Nome\\Projetos',['Unidades como C: e D: são comuns.','PowerShell é o shell moderno para administração e automação.']],
['2. Linux','Linux é o nome do kernel. Uma distribuição combina o kernel com ferramentas, bibliotecas, gerenciador de pacotes, instalador e geralmente um ambiente gráfico.','Distribuição = kernel + ferramentas + pacotes + configurações + ambiente',['Por isso duas distribuições Linux podem ter aparência e comandos de administração diferentes.']],
['3. Ubuntu, Mint, Debian, Fedora e Arch','Ubuntu é baseado em Debian e possui bastante documentação. Mint é baseado em Ubuntu/Debian e busca uma experiência familiar. Debian é conhecido pelo foco em estabilidade. Fedora usa o ecossistema RPM e dnf. Arch é mais manual e rolling release.','Ubuntu/Mint/Debian → apt\nFedora → dnf\nArch → pacman',['O gerenciador de pacotes é uma das diferenças práticas.','A escolha depende de hardware, objetivo e familiaridade.']],
['4. Ambiente gráfico','GNOME, KDE Plasma, Cinnamon e XFCE são ambientes gráficos usados no Linux. Eles podem mudar bastante a aparência e a forma de interagir sem mudar o conceito do kernel.','Linux → GNOME / KDE Plasma / Cinnamon / XFCE\nWindows → interface própria',['Distribuição e ambiente gráfico não são a mesma coisa.']],
['5. Linux x Windows no desenvolvimento','Linux é muito usado em servidores e oferece ferramentas Unix-like. Windows possui PowerShell e também pode usar WSL para disponibilizar um ambiente Linux. Git, VS Code, linguagens e Docker podem existir nos dois sistemas.','Windows → PowerShell / WSL\nLinux → Bash / Zsh',['Você não precisa trocar de sistema para aprender programação.','Conhecer os dois ajuda quando desenvolvimento e produção usam ambientes diferentes.']],
['6. Antes de instalar','Faça backup. Confirme espaço e compatibilidade. Decida se vai substituir o Windows ou usar dual boot. Identifique corretamente os discos e partições.','Backup → ISO oficial → USB bootável → Live → instalação',['Não apague uma partição sem saber o que ela contém.','Se houver BitLocker/criptografia, confira as orientações atuais antes de mexer no boot.']],
['7. Instalar por pendrive','Baixe a ISO da distribuição, crie um USB bootável, reinicie, abra o menu de boot/UEFI, escolha o USB e teste o modo Live quando disponível. Depois inicie o instalador.','ISO → USB → UEFI/Boot Menu → Live → Instalador',['A criação do USB normalmente apaga o conteúdo dele.','Use a documentação oficial da distribuição escolhida.']],
['8. Substituir Windows','O instalador pode oferecer usar o disco inteiro para Linux. Essa opção normalmente remove as partições/sistema daquele disco.','Backup → usar/apagar disco → instalar Linux',['Confirme o disco correto antes de aceitar. Se houver dois SSDs/HDs, compare capacidade e identificação.']],
['9. Dual boot','Dual boot mantém Windows e Linux e permite escolher o sistema ao iniciar. O processo envolve espaço livre, partições e carregador de inicialização.','UEFI → bootloader → Windows ou Linux',['Faça backup.','Se o Windows usa BitLocker, confira a documentação antes de alterar partições e boot.']],
['10. Testar sem instalar','O modo Live executa o sistema a partir do USB. Você pode verificar Wi-Fi, áudio, teclado, tela e outros componentes antes de alterar o disco.','USB → Live → testar hardware → instalar ou reiniciar',['O modo Live é temporário e pode ser mais lento.']],
['11. Erros comuns','Os problemas mais comuns incluem ISO inadequada, USB criado incorretamente, boot errado, disco errado, falta de espaço, hardware incompatível e comandos de pacote da distribuição errada.','Ubuntu/Debian → apt\nFedora → dnf\nArch → pacman',['Não misture repositórios aleatórios.','Anote a mensagem de erro e o hardware envolvido antes de procurar uma solução.']]
]};


// Navegação principal: apenas as trilhas mais usadas ficam visíveis.
// As demais continuam acessíveis pelo menu "Mais trilhas", evitando que
// o cabeçalho fique espremido ou corte itens em telas menores.
const nav=[['home','fa-house','Início'],['lab','fa-flask','Laboratório'],['programming','fa-terminal','Programação'],['web','fa-code','Web'],['server','fa-server','Servidores'],['database','fa-database','Banco de Dados'],['networks','fa-network-wired','Redes'],['computing','fa-microchip','Fundamentos'],['linux','fa-desktop','Sistemas Operacionais'],['mobile','fa-mobile-screen','Mobile'],['git','fa-code-branch','Git'],['cloud','fa-cloud','Cloud & DevOps'],['security','fa-shield-halved','Segurança']];
const topNavVisible=['home','lab','programming','web','server','database'];
const topNavMore=nav.filter(n=>!topNavVisible.includes(n[0]));
function renderTopNav(activeKey){
  const visible=nav.filter(n=>topNavVisible.includes(n[0]));
  const moreActive=topNavMore.some(n=>n[0]===activeKey);
  navEl.innerHTML=visible.map(n=>`<a href="#${n[0]}" class="${activeKey===n[0]?'active':''}"><i class="fa-solid ${n[1]}"></i> ${n[2]}</a>`).join('')+
    `<div class="nav-more">
      <button class="nav-more-btn ${moreActive?'active':''}" type="button"><i class="fa-solid fa-layer-group"></i> Mais trilhas <i class="fa-solid fa-chevron-down nav-more-chevron"></i></button>
      <div class="nav-more-menu">${topNavMore.map(n=>`<a href="#${n[0]}" class="${activeKey===n[0]?'active':''}"><i class="fa-solid ${n[1]}"></i><span>${n[2]}</span></a>`).join('')}</div>
    </div>`;
}
let state=JSON.parse(localStorage.getItem('evdevState')||'null')||{completed:{},practice:{},streak:0};
const app=document.getElementById('app'),navEl=document.getElementById('nav'),side=document.getElementById('side-links');
function save(){localStorage.setItem('evdevState',JSON.stringify(state));updateProgress()}

// ===== Currículo expandido: cada cartão vira uma aula em seções independentes =====
const expandedLessons={
variables:{title:'Variáveis',sections:[
['1. O que é uma variável','Uma variável é um nome usado pelo programa para guardar ou referenciar um valor durante a execução. O valor pode mudar conforme o programa avança.','let idade = 20;\nidade = 21;',['O nome deve representar o dado.','Em linguagens tipadas, o tipo pode fazer parte da declaração.']],
['2. Declaração e atribuição','Declarar é criar a variável; atribuir é colocar um valor nela. Em JavaScript, let e const têm comportamentos diferentes: let pode receber outro valor e const não pode ser reatribuída.','let nome = "Ana";\nconst cidade = "Lorena";\nnome = "Bia";',['Não confunda = com comparação.','const impede reatribuição, mas não torna todo objeto imutável.']],
['3. Escopo','Escopo define onde uma variável pode ser acessada. Variáveis locais são visíveis dentro de um bloco ou função; globais podem ficar disponíveis em uma área muito maior.','function saudacao() {\n  const nome = "Ana";\n  console.log(nome);\n}\n// nome não existe aqui',['Evite globais desnecessárias.','Erro de variável não definida pode ser consequência de escopo.']],
['4. Tipos e valores','Variável e valor são coisas diferentes: a variável é o nome/referência e o valor é o dado guardado. Os tipos disponíveis dependem da linguagem.','let idade = 20;       // número\nlet ativo = true;     // booleano\nlet nome = "Ana";     // texto',['Não trate texto numérico como número sem verificar.','Em linguagens como Java, tipos influenciam o que pode ser atribuído.']],
['5. Erros específicos','Erros comuns incluem usar uma variável antes de inicializá-la, digitar o nome errado, sobrescrever um valor por acidente ou misturar tipos incompatíveis.','let total = 10;\nconsole.log(totla); // nome digitado errado',['Confira maiúsculas/minúsculas quando a linguagem diferenciar.','Leia a linha indicada pelo erro antes de mudar o código.']]]},
types:{title:'Tipos de dados',sections:[
['1. Por que existem tipos','Tipos descrevem que espécie de valor está sendo trabalhada e quais operações fazem sentido para ela.','int idade = 20;\nString nome = "Ana";',['O tipo ajuda o programa e o desenvolvedor a entender o dado.']],
['2. Números','Números podem representar inteiros ou valores com casas decimais, dependendo da linguagem e do tipo escolhido.','int quantidade = 10;\ndouble preco = 19.90;',['Escolher o tipo errado pode perder precisão ou impedir uma operação.']],
['3. Texto e booleano','Strings representam texto; booleanos representam verdadeiro ou falso e são muito usados em condições.','String nome = "EvDev";\nboolean ativo = true;',['Não use "true" entre aspas quando precisa de um booleano.']],
['4. Coleções e objetos','Listas armazenam vários valores e objetos agrupam propriedades relacionadas. A forma exata muda entre linguagens.','const aluno = { nome: "Ana", idade: 20 };\nconst notas = [8, 9, 10];',['Confundir objeto com lista causa acesso incorreto aos dados.']],
['5. Conversão de tipos','Converter significa transformar um valor em outro tipo quando isso faz sentido.','Number("20")\nString(20)',['Conversão de texto para número pode resultar em valor inválido; valide a entrada.']]]},
conditions:{title:'Condicionais',sections:[
['1. O que é uma condição','Uma condição permite executar caminhos diferentes conforme uma expressão seja verdadeira ou falsa.','if (idade >= 18) {\n  console.log("Maior de idade");\n}',['A condição precisa produzir um resultado lógico.']],
['2. if e else','if executa quando a condição é verdadeira; else cobre o caminho alternativo.','if (saldo >= 100) {\n  console.log("Compra liberada");\n} else {\n  console.log("Saldo insuficiente");\n}',['Confira os operadores >=, <=, == e === conforme a linguagem.']],
['3. else if','else if permite testar mais de uma possibilidade em sequência.','if (nota >= 7) {\n  resultado = "Aprovado";\n} else if (nota >= 5) {\n  resultado = "Recuperação";\n} else {\n  resultado = "Reprovado";\n}',['A ordem das condições importa. Uma condição ampla pode impedir as seguintes de serem alcançadas.']],
['4. Operadores lógicos','&& representa “e”, || representa “ou” e ! inverte um booleano em JavaScript.','if (idade >= 18 && documentoValido) {\n  entrar();\n}',['Use parênteses quando a expressão ficar difícil de ler.']],
['5. Erros específicos','Os problemas mais comuns são usar = em vez de comparação, esquecer chaves/parênteses ou criar uma condição que nunca será verdadeira.','if (idade = 18) { /* atribuição, não comparação */ }',['Teste casos verdadeiros e falsos.','Inclua valores de limite, como 17, 18 e 19.']]]},
loops:{title:'Laços de repetição',sections:[
['1. Por que repetir','Laços evitam copiar o mesmo código muitas vezes. Você define uma regra de repetição e o programa executa o bloco enquanto ela for satisfeita.','for (let i = 0; i < 3; i++) {\n  console.log(i);\n}',['Identifique início, condição e atualização.']],
['2. for','for é útil quando existe um contador ou quando você sabe a estrutura da repetição.','for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}',['i < 5 e i <= 5 produzem quantidades diferentes de repetições.']],
['3. while','while repete enquanto a condição continuar verdadeira. É útil quando o número de repetições depende de um estado.','let tentativa = 0;\nwhile (tentativa < 3) {\n  tentativa++;\n}',['Atualize a variável usada na condição para não criar loop infinito.']],
['4. for...of e coleções','Em JavaScript, for...of percorre valores de uma coleção iterável.','const nomes = ["Ana", "Bia", "Caio"];\nfor (const nome of nomes) console.log(nome);',['Não confunda for...of com for...in: eles percorrem coisas diferentes.']],
['5. Erros específicos','Loop infinito, limite errado e alteração inesperada da coleção são problemas frequentes.','let i = 0;\nwhile (i < 3) {\n  console.log(i);\n  // faltou i++\n}',['Quando o programa “trava”, verifique primeiro a condição e a atualização do laço.']]]},
functions:{title:'Funções',sections:[
['1. O que é uma função','Função é um bloco de código criado para realizar uma tarefa que pode ser chamado quando necessário.','function somar(a, b) {\n  return a + b;\n}\nconst total = somar(2, 3);',['Uma boa função costuma ter uma responsabilidade clara.']],
['2. Parâmetros e argumentos','Parâmetro é a variável definida na função; argumento é o valor enviado na chamada.','function saudacao(nome) {\n  return `Olá, ${nome}`;\n}\nsaudacao("Ana");',['Quantidade e ordem dos argumentos podem importar.']],
['3. return','return envia um valor de volta para quem chamou a função e encerra sua execução naquele ponto.','function dobro(n) {\n  return n * 2;\n}',['Não confunda console.log com return: imprimir não significa devolver o valor.']],
['4. Escopo e reutilização','Variáveis criadas dentro de uma função normalmente pertencem ao escopo dela. Isso ajuda a evitar alterações acidentais fora da função.','function calcular() {\n  const total = 10 + 5;\n  return total;\n}',['Escolha nomes claros e evite efeitos colaterais desnecessários.']],
['5. Erros específicos','Chamadas com parâmetros errados, esquecer return e usar uma variável fora do escopo são erros comuns.','const resultado = dobro; // referência à função\nconst valor = dobro(5); // chamada',['Leia se o código precisa da função ou do resultado produzido por ela.']]]},
arrays:{title:'Listas e coleções',sections:[
['1. O que é uma coleção','Uma coleção agrupa vários valores para que possam ser percorridos, filtrados ou transformados. Arrays são uma coleção comum em JavaScript.','const frutas = ["maçã", "banana", "uva"];',['O índice normalmente começa em 0 em arrays.']],
['2. Acessar posições','Cada posição pode ser acessada pelo índice.','const frutas = ["maçã", "banana"];\nconsole.log(frutas[0]); // maçã',['Acessar um índice que não existe pode produzir undefined ou erro, conforme a linguagem.']],
['3. Adicionar e remover','Métodos como push e pop alteram o final de um array em JavaScript.','frutas.push("uva");\nconst ultima = frutas.pop();',['Saiba se o método modifica a coleção ou cria outra.']],
['4. Percorrer','Laços e métodos como map, filter e forEach ajudam a trabalhar com cada item.','const numeros = [1,2,3];\nconst dobrados = numeros.map(n => n * 2);',['map cria outra coleção; forEach é usado para executar uma ação.']],
['5. Erros específicos','Índice errado, misturar tipos sem intenção e modificar uma coleção enquanto ela é percorrida podem gerar resultados inesperados.','console.log(frutas[10]); // undefined',['Verifique length e valide a coleção antes de acessar posições.']]]},
oop:{title:'Programação Orientada a Objetos (POO)',sections:[
['1. O que é POO','POO organiza o programa em objetos que combinam dados e comportamentos. Uma classe pode servir como molde para criar objetos.','class Pessoa {\n  constructor(nome) { this.nome = nome; }\n  apresentar() { return `Olá, ${this.nome}`; }\n}\nconst pessoa = new Pessoa("Ana");',['O objetivo não é transformar tudo em classe; use objetos quando o modelo fizer sentido.']],
['2. Classe e objeto','Classe descreve uma estrutura e objeto é uma instância concreta dessa estrutura.','class Carro {}\nconst carro1 = new Carro();\nconst carro2 = new Carro();',['Dois objetos da mesma classe podem possuir estados diferentes.']],
['3. Atributos e métodos','Atributos representam dados do objeto; métodos representam comportamentos relacionados a ele.','class Conta {\n  saldo = 0;\n  depositar(valor) { this.saldo += valor; }\n}',['Mantenha as regras do objeto próximas aos dados que elas protegem quando isso melhora a organização.']],
['4. Encapsulamento, herança e polimorfismo','Encapsulamento controla como o estado é acessado; herança permite especializar uma estrutura; polimorfismo permite tratar objetos diferentes por uma interface comum.','class Animal { falar() { return "som"; } }\nclass Cachorro extends Animal { falar() { return "latido"; } }',['Herança em excesso cria acoplamento. Composição muitas vezes é uma alternativa melhor.']],
['5. Erros específicos','Erros comuns incluem confundir classe com objeto, acessar estado interno sem controle e criar hierarquias de herança sem necessidade.','const p = new Pessoa("Ana");\n// Pessoa("Ana") sem new pode falhar em várias linguagens/estruturas',['Entenda primeiro as responsabilidades antes de criar muitas classes.']]]},
algorithms:{title:'Algoritmos',sections:[
['1. O que é um algoritmo','Algoritmo é uma sequência finita de passos para resolver um problema ou produzir um resultado.','Entrada: [5, 2, 8]\nPassos: comparar valores e identificar o maior\nSaída: 8',['Um algoritmo pode ser escrito em linguagem natural, pseudocódigo ou código.']],
['2. Entrada, processamento e saída','Muitos problemas podem ser organizados em entrada → processamento → saída.','idade = entrada\nif idade >= 18:\n  saída = "maior"',['Separar essas etapas ajuda a encontrar onde está o problema.']],
['3. Decomposição','Problemas grandes ficam mais simples quando divididos em partes menores.','Cadastrar usuário:\n1. validar dados\n2. salvar dados\n3. confirmar cadastro',['Se uma função faz muitas coisas, talvez o problema possa ser dividido.']],
['4. Eficiência','Algoritmos diferentes podem produzir a mesma resposta usando quantidades diferentes de operações.','Buscar em lista: testar item por item\nBuscar em dados ordenados: usar estratégia adequada',['Não otimize antes de medir, mas reconheça quando uma solução cresce mal.']],
['5. Erros específicos','Um algoritmo pode estar sintaticamente correto e ainda produzir resultado errado por causa da lógica ou de casos não considerados.','Entrada: []\n// o que acontece se o algoritmo espera pelo menos um item?',['Teste casos normais, vazios, mínimos, máximos e entradas inválidas.']]]},
html:{title:'HTML — estrutura completa de uma página',sections:[
['1. O que é HTML','HTML é a linguagem de marcação usada para estruturar conteúdo. Ele informa ao navegador se algo é título, parágrafo, link, imagem, formulário e assim por diante.','<!DOCTYPE html>\n<html lang="pt-BR">\n<head><title>Meu site</title></head>\n<body><h1>Oi</h1></body>\n</html>',['HTML define estrutura; CSS cuida da apresentação e JavaScript adiciona comportamento.']],
['2. DOCTYPE, html, head e body','DOCTYPE declara HTML moderno. html é a raiz. head reúne metadados e recursos; body contém o conteúdo da página.','<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <title>EvDev</title>\n</head>\n<body>Conteúdo</body>\n</html>',['Colocar conteúdo visual principal dentro do head é uma estrutura incorreta.']],
['3. Hierarquia de títulos e texto','h1 até h6 representam níveis de título. p representa parágrafo. A hierarquia deve refletir a organização do conteúdo, não apenas o tamanho visual.','<h1>Curso de HTML</h1>\n<h2>Estrutura</h2>\n<p>Aprenda a criar páginas.</p>',['Evite escolher h3 só porque parece menor; use CSS para aparência.']],
['4. Links, imagens e listas','Links usam a; imagens usam img com src e, quando apropriado, alt; listas usam ul/ol com li.','<a href="/cursos">Cursos</a>\n<img src="foto.jpg" alt="Tela do EvDev">\n<ul><li>HTML</li><li>CSS</li></ul>',['Caminho errado causa imagem quebrada ou link que não funciona.']],
['5. Semântica e formulários','Elementos semânticos comunicam função. Formulários agrupam campos para receber dados e precisam de labels claros.','<main>\n  <article><h2>Curso</h2></article>\n</main>\n<form><label for="email">E-mail</label><input id="email" type="email"></form>',['Não dependa apenas de divs; não associe label ao input errado.']],
['6. Erros específicos','Erros frequentes incluem tags não fechadas, atributos digitados incorretamente, IDs duplicados, caminhos relativos errados e estrutura mal hierarquizada.','<img src="imagens/logo.png" alt="Logo">\n<!-- confira se imagens/logo.png realmente existe -->',['Use o inspetor do navegador e valide a estrutura quando algo não aparecer como esperado.']]]},
'html-head':{title:'HTML — head e metadados',sections:[
['1. O que é o head','head contém informações que ajudam navegador, mecanismos de busca e recursos da página, mas que normalmente não são o conteúdo principal exibido.','<head>\n  <meta charset="UTF-8">\n  <title>EvDev</title>\n</head>',['Não coloque o conteúdo principal do site no head.']],
['2. charset','charset informa a codificação usada pelo documento. UTF-8 permite representar grande variedade de caracteres.','<meta charset="UTF-8">',['Se caracteres aparecem quebrados, verifique codificação do arquivo e declaração do documento.']],
['3. viewport','viewport orienta o navegador móvel sobre a largura e escala inicial da página.','<meta name="viewport" content="width=device-width, initial-scale=1.0">',['Sem viewport, layouts responsivos podem parecer ampliados ou com escala inesperada.']],
['4. title e favicon','title define o nome da aba; favicon define o ícone associado à página.','<title>EvDev — HTML</title>\n<link rel="icon" href="favicon.png">',['Caminho errado para favicon não impede a página de funcionar, mas o ícone não será carregado.']],
['5. CSS e outros recursos','link pode conectar CSS, fontes e outros recursos externos conforme o tipo.','<link rel="stylesheet" href="styles.css">',['Arquivo CSS com caminho errado resulta em página sem os estilos esperados.']]]},
'html-tags':{title:'HTML — tags essenciais',sections:[
['1. Títulos e parágrafos','h1-h6 organizam títulos; p cria parágrafos. A hierarquia ajuda leitura e acessibilidade.','<h1>Produtos</h1>\n<h2>Notebooks</h2>\n<p>Confira os modelos.</p>',['Evite usar dezenas de h1 apenas para aumentar texto.']],
['2. Links','a cria links para páginas, arquivos, seções ou outros destinos. href informa o destino.','<a href="contato.html">Contato</a>',['href vazio ou caminho incorreto pode gerar navegação inesperada.']],
['3. Imagens','img apresenta uma imagem por meio de src. alt descreve a imagem quando ela não é apenas decorativa.','<img src="logo.png" alt="Logo EvDev">',['Verifique extensão, caminho e nome exatos do arquivo.']],
['4. Listas e tabelas','ul/ol/li representam listas. table, tr, th e td representam dados tabulares quando realmente existe uma relação de linhas e colunas.','<table>\n<tr><th>Nome</th><th>Idade</th></tr>\n<tr><td>Ana</td><td>20</td></tr>\n</table>',['Não use tabela apenas para criar layout de página.']],
['5. Containers','div e span são containers genéricos. Use-os quando nenhum elemento semântico específico representar melhor o conteúdo.','<div class="card"><span>Iniciante</span></div>',['Excesso de divs pode tornar a estrutura difícil de entender.']]]},
'html-semantic':{title:'HTML — semântica',sections:[
['1. O que significa semântico','Um elemento semântico informa o papel do conteúdo. Isso melhora organização, acessibilidade e manutenção.','<header>Topo</header>\n<main>Conteúdo principal</main>\n<footer>Rodapé</footer>',['Semântica é sobre significado, não sobre aparência.']],
['2. header e nav','header representa uma área introdutória; nav agrupa links de navegação.','<header><h1>EvDev</h1></header>\n<nav><a href="/cursos">Cursos</a></nav>',['Nem todo conjunto de links precisa ser nav; use-o para blocos de navegação.']],
['3. main e section','main representa o conteúdo principal; section agrupa um tema ou seção do conteúdo.','<main>\n  <section><h2>HTML</h2><p>...</p></section>\n</main>',['Uma section normalmente se beneficia de um título que identifique seu assunto.']],
['4. article e aside','article representa conteúdo independente; aside representa conteúdo complementar ao principal.','<article><h2>Notícia</h2><p>Texto...</p></article>\n<aside>Links relacionados</aside>',['Não escolha article apenas porque é um card visual.']],
['5. footer','footer pode conter informações finais da página ou de uma seção, como autoria, links e direitos.','<footer><p>© EvDev</p></footer>',['Pode existir footer de uma seção e um footer da página.']]]},
'html-forms':{title:'HTML — formulários',sections:[
['1. Form e envio','form agrupa campos e pode definir como os dados serão enviados.','<form action="/cadastro" method="post">\n  ...\n</form>',['O método e o destino precisam corresponder ao backend esperado.']],
['2. label e input','label explica o campo e pode ser associado ao input pelo for/id.','<label for="nome">Nome</label>\n<input id="nome" name="nome" type="text">',['for e id precisam coincidir; name é importante para o envio do campo.']],
['3. Tipos de input','Tipos como email, password, number, date e checkbox ajudam o navegador a interpretar a entrada.','<input type="email" name="email">\n<input type="password" name="senha">',['Escolher type adequado melhora validação e experiência.']],
['4. required, placeholder e value','required exige preenchimento; placeholder dá uma dica; value representa um valor inicial/atual dependendo do controle.','<input name="email" type="email" required placeholder="voce@exemplo.com">',['Não use placeholder como substituto de label.']],
['5. Validação','Validação no navegador ajuda a experiência, mas o servidor também deve validar os dados recebidos.','<input type="number" min="1" max="10" required>',['Nunca confie somente na validação do frontend para segurança.']]]},
css:{title:'CSS — estilos e seletores',sections:[
['1. O que é CSS','CSS define a apresentação dos elementos HTML: cores, tamanhos, espaçamento, fontes, posicionamento e muito mais.','h1 {\n  color: #ff7a18;\n  font-size: 32px;\n}',['HTML e CSS têm responsabilidades diferentes.']],
['2. Seletores','Seletores dizem quais elementos recebem as regras. Podem usar elemento, classe, id, atributos e relações.','.card { padding: 20px; }\n#menu { display: flex; }\np { line-height: 1.6; }',['Classes são geralmente mais reutilizáveis que IDs para estilos.']],
['3. Propriedades e valores','Uma declaração CSS combina propriedade e valor. O navegador calcula o estilo final considerando várias regras.','button { background: #1266a8; color: white; }',['Propriedade inexistente é ignorada pelo navegador.']],
['4. Cascata e especificidade','Quando várias regras atingem o mesmo elemento, origem, importância, especificidade e ordem ajudam a determinar qual regra vence.','.card p { color: blue; }\np { color: red; }',['Evite usar !important para resolver todo conflito; descubra qual regra está vencendo.']],
['5. Erros específicos','Se o estilo não aparece, confira seletor, arquivo carregado, sintaxe, propriedade válida e regras mais específicas.','/* faltou } */\n.card { color: red;',['O DevTools mostra regras aplicadas e riscadas, ajudando a encontrar conflitos.']]]},
'css-box':{title:'CSS — Box Model',sections:[
['1. As quatro partes','Todo elemento pode ser entendido como content, padding, border e margin.','div {\n  width: 200px;\n  padding: 20px;\n  border: 2px solid;\n  margin: 10px;\n}',['O espaço interno e externo têm funções diferentes.']],
['2. content','content é a área onde fica o conteúdo do elemento. width e height normalmente se referem a ela no box-sizing padrão.','.card { width: 300px; height: 150px; }',['Conteúdo pode crescer e mudar o tamanho percebido do elemento.']],
['3. padding e border','padding cria espaço entre conteúdo e borda; border desenha a borda ao redor da caixa.','.card { padding: 16px; border: 1px solid #ccc; }',['Padding faz parte da caixa; margin fica fora da caixa.']],
['4. margin','margin cria espaço externo entre a caixa e outros elementos.','.card { margin: 24px auto; }',['Margens verticais podem colapsar em determinados contextos de layout.']],
['5. box-sizing','box-sizing: border-box faz width/height incluírem padding e border, tornando cálculos de tamanho mais previsíveis.','* { box-sizing: border-box; }',['Sem isso, adicionar padding pode aumentar a largura além do valor esperado.']]]},
'css-layout':{title:'CSS — Flexbox, Grid e posicionamento',sections:[
['1. Flexbox','Flexbox organiza itens em uma dimensão principal e facilita alinhamento e distribuição.','.menu { display: flex; gap: 16px; align-items: center; }',['Defina primeiro se o fluxo principal é linha ou coluna.']],
['2. justify-content e align-items','justify-content trabalha no eixo principal; align-items trabalha no eixo transversal, considerando a direção do flex container.','.menu { display: flex; justify-content: space-between; align-items: center; }',['Se flex-direction mudar, os eixos também mudam.']],
['3. Grid','CSS Grid trabalha muito bem com linhas e colunas e é útil para layouts bidimensionais.','.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }',['Em telas menores, reduza ou adapte as colunas.']],
['4. position','static é o fluxo normal; relative cria uma referência para offsets; absolute posiciona em relação a um ancestral posicionado; fixed acompanha a viewport; sticky combina comportamentos.','.badge { position: absolute; top: 8px; right: 8px; }',['absolute depende do contexto de posicionamento; não use para montar todo o layout.']],
['5. Erros específicos','Itens espremidos, overflow inesperado e posicionamento fora do lugar costumam vir de dimensões rígidas, eixos mal entendidos ou ancestral sem position: relative.','.card { position: relative; }\n.badge { position: absolute; top: 0; right: 0; }',['Use o DevTools para visualizar caixas e grid/flex overlays.']]]},
'css-responsive':{title:'CSS — responsividade',sections:[
['1. O que é responsividade','Um layout responsivo adapta conteúdo, tamanhos e organização para diferentes larguras e formas de tela.','@media (max-width: 760px) {\n  .cards { grid-template-columns: 1fr; }\n}',['Responsividade não é apenas “diminuir tudo”.']],
['2. Media queries','Media queries aplicam regras quando determinadas condições são atendidas, como largura da viewport.','@media (max-width: 900px) {\n  .menu { display: none; }\n}',['Escolha breakpoints conforme o conteúdo quebrar, não apenas conforme modelos de aparelhos.']],
['3. Unidades','px é uma unidade fixa; %, rem, em, vw e vh podem criar layouts mais flexíveis dependendo do caso.','h1 { font-size: 2rem; }\n.container { width: min(1100px, 92%); }',['Use unidades relativas onde elas melhoram adaptação e acessibilidade.']],
['4. Imagens e conteúdo','Imagens podem estourar o container se não tiverem dimensões responsivas.','img { max-width: 100%; height: auto; }',['Teste textos longos, botões e imagens reais.']],
['5. Erros específicos','Scroll horizontal, texto cortado e botões impossíveis de tocar indicam problemas de largura, overflow, fontes ou espaçamento.','body { overflow-x: hidden; }',['Não use overflow-x: hidden para esconder um problema que deveria ser corrigido no layout.']]]},
javascript:{title:'JavaScript — lógica no navegador',sections:[
['1. O que é JavaScript','JavaScript adiciona lógica e comportamento às páginas e também pode ser usado no backend e em outras plataformas.','const nome = "Ana";\nconsole.log(`Olá, ${nome}`);',['No navegador, o código pode interagir com DOM, eventos e APIs.']],
['2. Variáveis, funções e objetos','Esses recursos formam a base da linguagem: guardar dados, organizar lógica e representar estruturas.','const usuario = { nome: "Ana" };\nfunction saudacao(u) { return `Olá ${u.nome}`; }',['Separe dados de comportamentos quando isso deixar o código mais claro.']],
['3. DOM','DOM é a representação da página que JavaScript consegue consultar e modificar.','const titulo = document.querySelector("h1");\ntitulo.textContent = "Novo título";',['Se o seletor não encontrar elemento, o resultado pode ser null.']],
['4. Assincronicidade','Operações como fetch podem terminar depois do restante do código. Promises e async/await ajudam a organizar esse fluxo.','async function carregar() {\n  const resposta = await fetch("/api/usuarios");\n  const dados = await resposta.json();\n  console.log(dados);\n}',['Trate erros de rede e respostas HTTP inesperadas.']],
['5. Erros específicos','ReferenceError, TypeError, JSON inválido, seletor nulo e promessas rejeitadas são problemas comuns.','const botao = document.querySelector("#enviar");\nbotao.addEventListener("click", enviar);',['Leia o tipo do erro e a linha. Não corrija apenas “tentando coisas”.']]]},
dom:{title:'JavaScript — DOM',sections:[
['1. O que é DOM','DOM é a estrutura em memória que representa os elementos do documento. JavaScript pode encontrar, ler e alterar esses nós.','document.querySelector("h1");',['O DOM é criado a partir do HTML carregado.']],
['2. Selecionar elementos','querySelector retorna o primeiro elemento que corresponde ao seletor; querySelectorAll retorna uma coleção de correspondências.','const titulo = document.querySelector("h1");\nconst cards = document.querySelectorAll(".card");',['Se não houver correspondência, querySelector retorna null.']],
['3. Alterar conteúdo','textContent altera texto; innerHTML interpreta uma string como HTML e deve ser usado com cuidado quando a entrada vem do usuário.','titulo.textContent = "Olá EvDev";',['Evite inserir conteúdo não confiável com innerHTML.']],
['4. Classes e atributos','classList ajuda a adicionar, remover e alternar classes. getAttribute/setAttribute trabalham com atributos.','card.classList.add("ativo");\ninput.setAttribute("disabled", "");',['Use classes para estado visual e atributos semânticos quando apropriado.']],
['5. Erros específicos','Script executado antes do elemento existir, seletor errado e acesso a null são problemas frequentes.','const botao = document.querySelector("#enviar");\nbotao.addEventListener("click", enviar);',['Coloque o script adequadamente ou espere o DOM quando necessário.']]]},
events:{title:'JavaScript — eventos',sections:[
['1. O que é um evento','Evento é uma ocorrência que o navegador pode comunicar ao código, como clique, teclado, envio de formulário ou mudança de campo.','button.addEventListener("click", () => {\n  console.log("clicou");\n});',['O evento descreve o que aconteceu; o handler define o que fazer.']],
['2. addEventListener','addEventListener registra uma função para um tipo de evento sem substituir necessariamente outros listeners.','input.addEventListener("input", (event) => {\n  console.log(event.target.value);\n});',['Use o objeto event para acessar informações da ocorrência.']],
['3. Formulários e preventDefault','submit pode recarregar/navegar por padrão. preventDefault cancela esse comportamento quando isso faz sentido.','form.addEventListener("submit", (event) => {\n  event.preventDefault();\n  console.log("validar e enviar");\n});',['Cancelar o comportamento padrão não substitui o envio ao backend quando ele é necessário.']],
['4. Teclado e mouse','Eventos como keydown, keyup, click e mouseenter permitem criar interações.','document.addEventListener("keydown", e => {\n  if (e.key === "Enter") console.log("Enter");\n});',['Não crie interações que funcionem somente com mouse quando teclado também for necessário.']],
['5. Erros específicos','Listener no elemento errado, função chamada imediatamente em vez de ser passada e listeners duplicados são problemas comuns.','button.addEventListener("click", salvar);\n// não: button.addEventListener("click", salvar());',['Confira o momento em que a função está sendo registrada.']]]},
'web-http':{title:'Web — HTTP',sections:[
['1. O que é HTTP','HTTP é um protocolo usado para troca de mensagens entre clientes e servidores na Web. Uma requisição pede algo; uma resposta informa o resultado.','GET /produtos HTTP/1.1\nHost: exemplo.com',['HTTP define formato e semântica da comunicação, não a regra de negócio da aplicação.']],
['2. Métodos','GET costuma consultar; POST cria ou inicia processamento; PUT substitui/atualiza um recurso de acordo com a API; PATCH altera parcialmente; DELETE remove.','GET /usuarios/10\nPOST /usuarios\nDELETE /usuarios/10',['O significado exato depende do contrato da API, mas essas convenções são amplamente usadas.']],
['3. Cabeçalhos e corpo','Headers transportam metadados; body pode carregar dados da requisição ou resposta.','Content-Type: application/json\n\n{"nome":"Ana"}',['Content-Type errado pode fazer o servidor interpretar o corpo incorretamente.']],
['4. HTTPS','HTTPS é HTTP transportado por TLS, protegendo a comunicação contra leitura/alteração por terceiros no caminho.','https://exemplo.com\nTLS → HTTP protegido',['HTTPS não torna automaticamente a aplicação segura contra falhas de autenticação ou SQL injection.']],
['5. Erros específicos','400 indica problema na requisição; 401 falta de autenticação válida; 403 acesso recusado; 404 recurso não encontrado; 500 falha no servidor.','HTTP/1.1 404 Not Found',['Veja status, headers e corpo da resposta no DevTools antes de culpar o frontend.']]]},
client:{title:'Cliente',sections:[
['1. O que é cliente','Cliente é o componente que inicia uma comunicação ou consome um serviço. No acesso a um site, o navegador é um cliente HTTP.','Navegador → GET /index.html → servidor',['Cliente não significa necessariamente “computador pessoal”; um serviço também pode atuar como cliente.']],
['2. Navegador','O navegador interpreta HTML, CSS e JavaScript, gerencia armazenamento local e realiza requisições.','Browser → DNS → conexão → HTTP → renderização',['Cache pode fazer você ver uma versão antiga durante testes.']],
['3. Cliente e API','Uma aplicação cliente pode chamar uma API para obter ou enviar dados.','fetch("/api/produtos")\n  .then(r => r.json())',['A resposta pode ter erro mesmo que a requisição tenha chegado ao servidor.']],
['4. Frontend','Frontend é a parte da aplicação que roda no cliente e interage com o usuário.','HTML + CSS + JS → interface',['Não coloque segredos, como chaves privadas, no código enviado ao cliente.']],
['5. Erros específicos','CORS, URL errada, certificado, DNS, cache e status HTTP são fontes comuns de falha.','GET https://api.exemplo.com/produtos\n→ CORS bloqueado no navegador',['Use Network no DevTools para ver a URL, status, headers e tempo.']]]},
server:{title:'Servidor',sections:[
['1. O que é servidor','Servidor é um programa ou sistema que recebe requisições, executa processamento e responde a clientes.','Cliente → HTTP request → servidor → HTTP response',['Servidor pode ser software e pode rodar em uma máquina física, virtual ou container.']],
['2. Escutar uma porta','Um serviço de rede normalmente fica associado a uma porta e protocolo.','Servidor HTTP → 0.0.0.0:8080',['Porta ocupada impede outro processo de escutar a mesma combinação de endereço/protocolo.']],
['3. Rota e processamento','A aplicação recebe uma requisição, identifica rota/método, valida dados, executa regras e produz resposta.','POST /usuarios\n→ validar\n→ salvar no banco\n→ 201 Created',['Não misture validação, acesso ao banco e resposta sem organização conforme o projeto cresce.']],
['4. Estado e banco','Servidor pode ser stateless em relação a cada requisição e usar banco/cache/sessão para persistir dados.','POST /login\n→ valida credencial\n→ cria sessão/token',['Armazenar estado exige considerar concorrência, expiração e segurança.']],
['5. Erros específicos','Timeout, porta ocupada, variável de ambiente ausente, banco indisponível e exceção não tratada são problemas comuns.','Error: connect ECONNREFUSED 127.0.0.1:5432',['Confira logs do servidor e conectividade com dependências.']]]},
'server-api':{title:'APIs',sections:[
['1. O que é API','API é uma interface definida para que um software consiga pedir dados ou operações a outro software.','GET /api/usuarios/10\n→ {"id":10,"nome":"Ana"}',['API é um contrato; documentação deve dizer entradas, saídas e erros.']],
['2. Endpoint','Endpoint é um endereço/rota de uma API que representa uma operação ou recurso.','GET /api/produtos\nGET /api/produtos/10',['Rotas inconsistentes dificultam o consumo e manutenção.']],
['3. Request e response','A requisição pode carregar path params, query params, headers e body. A resposta pode trazer status, headers e body.','POST /api/produtos\nContent-Type: application/json\n\n{"nome":"Mouse"}',['Valide formato e campos obrigatórios no servidor.']],
['4. Autenticação e autorização','Autenticação identifica o consumidor; autorização verifica o que ele pode fazer.','Authorization: Bearer TOKEN\n→ servidor valida identidade e permissão',['Não confie em informações de permissão enviadas pelo frontend.']],
['5. Erros específicos','400, 401, 403, 404 e 500 precisam ter significado consistente na API.','GET /api/produtos/999\n→ 404 Not Found',['Documente o formato de erro para que o cliente consiga tratar corretamente.']]]},
rest:{title:'REST',sections:[
['1. O que é REST','REST é um estilo arquitetural para serviços que usa conceitos como recursos, representações e operações HTTP de forma consistente.','/usuarios\n/usuarios/10\n/produtos/5',['REST não é sinônimo de “qualquer API HTTP”.']],
['2. Recursos e URLs','A URL representa um recurso; o método HTTP ajuda a indicar a operação.','GET /usuarios\nPOST /usuarios\nPATCH /usuarios/10',['Evite URLs que misturam demais ações e recursos quando uma modelagem de recurso resolve.']],
['3. Stateless','Em uma arquitetura stateless, cada requisição contém as informações necessárias para ser processada, sem depender de estado de sessão do pedido anterior no servidor.','GET /perfil\nAuthorization: Bearer TOKEN',['Stateless não significa que nenhum dado pode existir no servidor; significa que a requisição não depende de contexto oculto de uma requisição anterior.']],
['4. Status e representação','A resposta usa status HTTP e uma representação, frequentemente JSON.','201 Created\n{"id":10,"nome":"Ana"}',['Use status coerentes e respostas previsíveis.']],
['5. Erros específicos','Problemas comuns incluem método incorreto, rota inconsistente, status inadequado e contrato diferente do que o cliente espera.','Cliente espera {nome}\nAPI devolve {name}',['Trate contrato da API como uma interface que precisa ser documentada.']]]},
json:{title:'JSON',sections:[
['1. O que é JSON','JSON é um formato textual para representar dados estruturados. É muito usado em APIs por ser simples de ler e gerar.','{"nome":"Ana","idade":20,"ativo":true}',['JSON possui objetos, arrays, strings, números, boolean, null.']],
['2. Objeto e array','Objeto usa pares chave/valor; array usa uma sequência ordenada de valores.','{"usuario":{"nome":"Ana"},"notas":[8,9,10]}',['Chaves de objetos JSON precisam estar entre aspas duplas.']],
['3. JSON e JavaScript','JSON parece com objetos JavaScript, mas JSON é texto e precisa ser analisado/serializado.','const obj = JSON.parse(\'{"nome":"Ana"}\');\nconst txt = JSON.stringify(obj);',['JSON.parse falha se o texto não for JSON válido.']],
['4. Envio em API','Ao enviar JSON, normalmente informe Content-Type: application/json.','fetch("/api/usuarios", {\n  method: "POST",\n  headers: {"Content-Type":"application/json"},\n  body: JSON.stringify({nome:"Ana"})\n});',['Servidor precisa interpretar o corpo como JSON.']],
['5. Erros específicos','Vírgula sobrando, aspas simples em JSON puro, chave sem aspas e tipos inesperados causam erros.','{"nome":"Ana",} // inválido em JSON estrito',['Use ferramentas de validação quando um payload estiver difícil de localizar.']]]},
status:{title:'Status HTTP',sections:[
['1. O que é status','O status HTTP informa ao cliente como a requisição foi tratada. Ele pertence à resposta.','HTTP/1.1 200 OK',['O código não explica tudo; o corpo e headers podem trazer detalhes.']],
['2. 2xx — sucesso','200 OK é sucesso geral; 201 Created indica criação; 204 No Content indica sucesso sem corpo de resposta.','POST /usuarios\n→ 201 Created',['Escolha status coerente com a operação.']],
['3. 4xx — problema do cliente','400 Bad Request, 401 Unauthorized, 403 Forbidden e 404 Not Found são exemplos comuns.','GET /usuarios/999\n→ 404 Not Found',['401 normalmente significa que autenticação válida é necessária; 403 indica que o acesso não foi permitido.']],
['4. 5xx — problema no servidor','500 Internal Server Error indica falha no processamento do servidor; 502/503/504 aparecem em cenários de infraestrutura/proxy/serviço indisponível.','GET /relatorio\n→ 500 Internal Server Error',['Investigue logs e dependências quando receber 5xx.']],
['5. Erros específicos','Um erro frequente é tratar qualquer status diferente de 200 como se fosse a mesma coisa.','if (!response.ok) {\n  console.error(response.status);\n}',['No frontend, trate status conforme o contrato da API.']]]},
backend:{title:'Backend',sections:[
['1. O que é backend','Backend reúne o processamento que não deve depender apenas da interface do usuário: regras de negócio, acesso a dados, autenticação e integrações.','Frontend → POST /pedido → Backend → Banco → resposta',['Backend pode ser feito em várias linguagens e frameworks.']],
['2. Rota e controller','Uma requisição entra por uma rota e normalmente chega a uma função/controller responsável por coordenar o processamento.','POST /pedidos\n→ criarPedido(req,res)',['Não concentre toda a aplicação em um único arquivo.']],
['3. Regra de negócio','Regra de negócio é a condição que representa como o sistema deve funcionar para o domínio.','if (estoque < quantidade)\n  rejeitarPedido();',['Regra não deve ser confiada somente ao frontend.']],
['4. Banco e serviços','Backend frequentemente consulta banco, cache, filas ou APIs externas.','Backend → PostgreSQL\nBackend → API de pagamento',['Dependências externas podem falhar; trate timeout e indisponibilidade.']],
['5. Erros específicos','Variável de ambiente ausente, conexão recusada, timeout, exceção e validação incompleta são problemas frequentes.','DATABASE_URL ausente\n→ servidor não consegue iniciar conexão',['Leia logs sem expor senhas, tokens ou dados sensíveis.']]]},
tables:{title:'Banco de Dados — tabelas',sections:[
['1. O que é uma tabela','Tabela organiza dados em linhas e colunas. Cada linha representa um registro e cada coluna descreve um atributo daquele tipo de registro.','CREATE TABLE usuarios (\n  id INT PRIMARY KEY,\n  nome VARCHAR(100),\n  email VARCHAR(150)\n);',['Escolha uma tabela para uma entidade/conceito que realmente precisa ser armazenado.']],
['2. Colunas e tipos','Cada coluna possui um nome e um tipo que define quais valores podem ser armazenados.','nome VARCHAR(100)\nidade INT\nativo BOOLEAN',['Tipo muito amplo ou inadequado pode permitir dados ruins ou desperdiçar espaço.']],
['3. Linhas e registros','INSERT adiciona uma nova linha. Cada registro deve respeitar as restrições definidas pela tabela.','INSERT INTO usuarios (id,nome,email)\nVALUES (1,\'Ana\',\'ana@exemplo.com\');',['Chaves e constraints podem impedir registros inválidos.']],
['4. Restrições','PRIMARY KEY, NOT NULL, UNIQUE, CHECK e FOREIGN KEY ajudam a manter a integridade dos dados.','email VARCHAR(150) UNIQUE NOT NULL',['Não coloque toda validação somente no código da aplicação; regras importantes também podem existir no banco.']],
['5. O que não fazer','Evite guardar tudo em uma única coluna sem necessidade, criar duplicidade sem estratégia e apagar/alterar dados sem filtros.','DELETE FROM usuarios;\n-- remove todos os registros',['Em produção, revise operações destrutivas e tenha estratégia de backup/recuperação.']]]},
select:{title:'SQL — SELECT',sections:[
['1. Consultar dados','SELECT recupera dados de uma ou mais tabelas.','SELECT nome, email FROM usuarios;',['Comece escolhendo apenas as colunas necessárias.']],
['2. WHERE','WHERE filtra linhas conforme uma condição.','SELECT * FROM usuarios WHERE idade >= 18;',['Sem WHERE, a consulta pode retornar todos os registros.']],
['3. ORDER BY e LIMIT','ORDER BY ordena; LIMIT restringe a quantidade de linhas retornadas em bancos que suportam essa sintaxe.','SELECT nome FROM usuarios\nORDER BY nome\nLIMIT 10;',['Ordenação pode aumentar custo em tabelas grandes; índices podem ajudar em alguns casos.']],
['4. Operadores e NULL','Use AND, OR, IN, LIKE e IS NULL conforme o filtro. NULL não é comparado com =.','SELECT * FROM usuarios WHERE email IS NULL;',['WHERE email = NULL está errado em SQL padrão; use IS NULL.']],
['5. Erros específicos','Coluna inexistente, nome de tabela errado, ambiguidade em JOIN e filtro incorreto são comuns.','SELECT u.nome FROM usuarios u\nJOIN pedidos p ON p.usuario_id = u.id;',['Use aliases para deixar consultas com várias tabelas claras.']]]},
insert:{title:'SQL — INSERT',sections:[
['1. Adicionar registros','INSERT cria novas linhas em uma tabela.','INSERT INTO usuarios (nome,email)\nVALUES (\'Ana\',\'ana@exemplo.com\');',['Informe explicitamente as colunas para evitar depender da ordem total da tabela.']],
['2. Vários registros','Você pode inserir vários registros em uma única instrução, conforme o banco.','INSERT INTO produtos (nome,preco)\nVALUES (\'Mouse\',50), (\'Teclado\',100);',['Confira constraints e tipos para todos os valores.']],
['3. Chaves geradas','Quando o banco gera ID automaticamente, normalmente você não envia esse campo.','INSERT INTO usuarios (nome)\nVALUES (\'Ana\');',['Entenda como sua coluna é gerada antes de tentar inserir um ID manual.']],
['4. Integridade','NOT NULL, UNIQUE, FK e CHECK podem impedir uma inserção.','INSERT INTO pedidos (usuario_id) VALUES (999);\n-- pode falhar se 999 não existir',['Leia a mensagem de constraint para descobrir qual regra foi violada.']],
['5. Segurança','Não monte SQL concatenando diretamente entrada do usuário. Use parâmetros/prepared statements.','INSERT INTO usuarios (email) VALUES (?);',['Isso reduz risco de SQL injection e problemas de escaping.']]]},
update:{title:'SQL — UPDATE',sections:[
['1. Alterar dados','UPDATE modifica colunas de registros existentes.','UPDATE usuarios\nSET nome = \'Ana Silva\'\nWHERE id = 10;',['Sempre confira qual conjunto de linhas será atingido.']],
['2. SET','SET define as colunas e os novos valores.','UPDATE produtos\nSET preco = 79.90, ativo = true\nWHERE id = 5;',['Você pode alterar várias colunas na mesma operação.']],
['3. WHERE é proteção','Sem WHERE, a instrução pode alterar todos os registros da tabela.','UPDATE usuarios SET ativo = false;\n-- altera todos os usuários',['Antes de executar, rode um SELECT com o mesmo WHERE.']],
['4. Transação e revisão','Em operações importantes, use transação quando o banco e a operação permitirem, revise o número de linhas afetadas e tenha recuperação.','BEGIN;\nUPDATE contas SET saldo = saldo - 10 WHERE id = 1;\n-- revisar\nROLLBACK;',['Não confirme uma alteração em produção sem entender o conjunto afetado.']],
['5. Erros específicos','Filtro errado, tipo incompatível, constraint e atualização de todos os registros são riscos comuns.','SELECT id,nome FROM usuarios WHERE id=10;\nUPDATE usuarios SET nome=\'Ana\' WHERE id=10;',['Acompanhe a mensagem do banco e a quantidade de linhas afetadas.']]]},
delete:{title:'SQL — DELETE',sections:[
['1. Remover registros','DELETE remove linhas. É uma operação destrutiva e deve ser usada com cuidado.','DELETE FROM usuarios WHERE id = 10;',['O banco pode não ter lixeira automática.']],
['2. WHERE','WHERE define quais registros serão removidos.','DELETE FROM pedidos WHERE status = \'cancelado\';',['Sem WHERE, todas as linhas podem ser removidas.']],
['3. Conferir antes','Uma prática segura é executar SELECT com o mesmo filtro antes do DELETE.','SELECT * FROM usuarios WHERE id = 10;\nDELETE FROM usuarios WHERE id = 10;',['Confira se a seleção corresponde exatamente ao que deseja apagar.']],
['4. DELETE x TRUNCATE','DELETE remove linhas e pode usar filtro; TRUNCATE normalmente remove o conteúdo inteiro da tabela de forma mais ampla e com comportamento específico do banco.','DELETE FROM logs WHERE data < CURRENT_DATE - INTERVAL \'30 days\';',['Sintaxe e efeitos de TRUNCATE variam entre bancos; consulte o SGBD.']],
['5. Erros específicos','Apagar dados sem filtro, confundir ambiente e ignorar chaves estrangeiras são riscos sérios.','DELETE FROM usuarios;\n-- todos os registros',['Em desenvolvimento, use banco de teste para aprender operações destrutivas.']]]},
joins:{title:'SQL — JOIN',sections:[
['1. Por que JOIN existe','JOIN combina dados relacionados de tabelas diferentes sem precisar duplicar tudo em uma única tabela.','SELECT u.nome, p.id\nFROM usuarios u\nJOIN pedidos p ON p.usuario_id = u.id;',['A condição ON define como os registros se relacionam.']],
['2. INNER JOIN','INNER JOIN retorna apenas combinações que possuem correspondência dos dois lados.','SELECT u.nome,p.id\nFROM usuarios u\nINNER JOIN pedidos p ON p.usuario_id=u.id;',['Usuário sem pedido não aparece nesse resultado.']],
['3. LEFT JOIN','LEFT JOIN mantém todas as linhas da tabela da esquerda, mesmo quando não há correspondência.','SELECT u.nome,p.id\nFROM usuarios u\nLEFT JOIN pedidos p ON p.usuario_id=u.id;',['Campos da direita podem ficar NULL.']],
['4. Chaves no relacionamento','É comum relacionar uma FK da tabela filha com a PK da tabela pai.','usuarios.id = pedidos.usuario_id',['JOIN incorreto pode multiplicar linhas e produzir resultados errados.']],
['5. Erros específicos','Condição ON ausente/incorreta, coluna ambígua e JOIN em campo sem relação lógica são problemas frequentes.','SELECT * FROM usuarios u\nJOIN pedidos p ON p.id = u.id;\n-- talvez seja a relação errada',['Teste a quantidade de linhas e confira exemplos manualmente.']]]},
keys:{title:'Banco de Dados — chaves',sections:[
['1. Primary Key','Primary Key identifica unicamente cada registro de uma tabela.','id INT PRIMARY KEY',['Uma tabela pode ter uma chave primária simples ou composta, dependendo do modelo.']],
['2. Foreign Key','Foreign Key cria uma relação com outra tabela e ajuda a impedir referências inexistentes quando a constraint está configurada.','usuario_id INT REFERENCES usuarios(id)',['A FK normalmente aponta para uma chave candidata/primária compatível.']],
['3. UNIQUE','UNIQUE impede duplicidade na combinação definida. É útil para dados que precisam ser únicos.','email VARCHAR(150) UNIQUE',['UNIQUE e PRIMARY KEY têm propósitos relacionados, mas não são a mesma coisa.']],
['4. Chave composta','Uma chave composta usa mais de uma coluna para identificar uma combinação única.','PRIMARY KEY (pedido_id, produto_id)',['Escolha a composição de acordo com a regra do domínio.']],
['5. Erros específicos','Tipos incompatíveis, FK apontando para coluna errada e tentativa de duplicar PK/UNIQUE causam erros de integridade.','INSERT INTO usuarios (id) VALUES (1);\nINSERT INTO usuarios (id) VALUES (1);',['Leia o nome da constraint ou a mensagem do SGBD para localizar o problema.']]]},
indexes:{title:'Banco de Dados — índices',sections:[
['1. O que é índice','Índice é uma estrutura auxiliar que pode acelerar determinadas consultas ao permitir localizar dados sem examinar todas as linhas.','CREATE INDEX idx_usuarios_email ON usuarios(email);',['Índice melhora algumas leituras, mas ocupa espaço e tem custo de manutenção.']],
['2. Quando ajuda','Filtros, joins e ordenações frequentes podem se beneficiar de índices apropriados.','SELECT * FROM usuarios WHERE email = \'ana@exemplo.com\';',['O benefício depende do tamanho dos dados e do plano de execução.']],
['3. Custo do índice','Inserções, alterações e exclusões também precisam manter os índices, então criar índices indiscriminadamente não é gratuito.','INSERT INTO usuarios (...) VALUES (...);\n-- índices precisam ser atualizados',['Não crie índice em toda coluna sem entender o padrão de consulta.']],
['4. Índices compostos','Um índice pode usar várias colunas e a ordem das colunas importa para quais consultas ele atende bem.','CREATE INDEX idx_pedidos_user_data ON pedidos(usuario_id, data);',['A ordem precisa refletir filtros/ordenações relevantes.']],
['5. Erros específicos','Índice ausente, índice redundante e expectativa de que qualquer índice acelere qualquer consulta são problemas comuns.','EXPLAIN SELECT ...;',['Use EXPLAIN/EXPLAIN ANALYZE conforme o SGBD para estudar o plano.']]]},
transactions:{title:'Banco de Dados — transações',sections:[
['1. O que é transação','Transação agrupa operações que devem ser tratadas como uma unidade lógica de trabalho.','BEGIN;\nUPDATE contas SET saldo=saldo-100 WHERE id=1;\nUPDATE contas SET saldo=saldo+100 WHERE id=2;\nCOMMIT;',['Se uma etapa falhar, o objetivo é evitar estado parcialmente aplicado.']],
['2. COMMIT','COMMIT confirma as alterações da transação.','BEGIN;\nUPDATE produtos SET preco=10 WHERE id=1;\nCOMMIT;',['Depois do commit, desfazer depende de mecanismos adicionais; rollback não “desfaz” um commit comum.']],
['3. ROLLBACK','ROLLBACK desfaz alterações ainda não confirmadas na transação.','BEGIN;\nDELETE FROM testes WHERE id=1;\nROLLBACK;',['Nem todo ambiente/configuração tem exatamente o mesmo comportamento para toda operação; conheça seu SGBD.']],
['4. ACID','ACID resume propriedades clássicas: atomicidade, consistência, isolamento e durabilidade.','Transferência: debitar + creditar como uma unidade',['Isolamento trata da interação entre transações concorrentes.']],
['5. Erros específicos','Deixar transações abertas, confirmar cedo demais ou não tratar deadlocks pode causar problemas de bloqueio e consistência.','BEGIN;\n-- operação longa sem COMMIT/ROLLBACK',['Monitore transações e trate erros de concorrência conforme o SGBD.']]]},
modeling:{title:'Banco de Dados — modelagem',sections:[
['1. Entidades e atributos','Modelagem começa identificando coisas importantes do domínio e as informações que precisamos guardar sobre elas.','Cliente(id,nome,email)\nPedido(id,data,cliente_id)',['Não crie tabela só porque existe uma palavra na descrição; pense na necessidade do sistema.']],
['2. Relacionamentos','Entidades podem ter relações 1:1, 1:N ou N:N.','Cliente 1 ─── N Pedido\nPedido N ─── N Produto',['N:N normalmente precisa de uma tabela associativa.']],
['3. Normalização','Normalização ajuda a reduzir redundância e anomalias de inserção, atualização e exclusão.','pedido(id, cliente_id)\ncliente(id,nome)',['Nem toda aplicação precisa maximizar normalização; decisões dependem do uso.']],
['4. Tipos e constraints','Defina tipos, PK, FK, NOT NULL, UNIQUE e outras regras coerentes com o domínio.','email VARCHAR(150) NOT NULL UNIQUE',['Constraints ajudam o banco a proteger a integridade.']],
['5. Erros específicos','Duplicar dados sem necessidade, criar relacionamentos errados e misturar várias entidades em uma tabela tornam manutenção difícil.','cliente_nome repetido em milhares de pedidos\n→ atualização inconsistente',['Teste cenários de inserir, alterar e excluir para revelar problemas do modelo.']]]},
ip:{title:'Redes — endereço IP',sections:[
['1. O que é IP','IP é um endereço lógico usado para identificar uma interface em uma rede IP. IPv4 usa endereços de 32 bits; IPv6 usa 128 bits.','IPv4: 192.168.1.10\nIPv6: 2001:db8::10',['Um IP identifica uma interface em determinado contexto; não é necessariamente uma identidade permanente de uma pessoa.']],
['2. IPv4','IPv4 é normalmente escrito em quatro octetos, cada um de 0 a 255.','192.168.1.10',['Endereço e máscara juntos definem a rede e o host.']],
['3. IPv6','IPv6 amplia o espaço de endereços e possui notação hexadecimal.','2001:db8:1234::10',['Não trate IPv6 como apenas “IPv4 maior”; ele possui recursos e configuração próprios.']],
['4. IP e gateway','Para alcançar destinos fora da rede local, o host normalmente encaminha o tráfego para o gateway padrão.','PC 192.168.1.10/24\nGateway 192.168.1.1',['Gateway errado pode impedir acesso externo mesmo com IP configurado.']],
['5. Erros específicos','IP duplicado, máscara errada, gateway incorreto e interface sem endereço são falhas comuns.','ping 192.168.1.1\nip addr',['Use ferramentas do sistema para confirmar configuração antes de alterar.']]]},
'private-public':{title:'IP privado x público',sections:[
['1. IP privado','Faixas privadas IPv4 são usadas dentro de redes internas e não são roteadas diretamente na Internet pública.','192.168.0.0/16\n10.0.0.0/8\n172.16.0.0/12',['172.16.0.0/12 é a faixa privada; nem todo 172.x é privado.']],
['2. IP público','IP público é um endereço usado no espaço de endereçamento público e pode ser anunciado/roteado conforme a infraestrutura e políticas.','Servidor → IP público → Internet',['Ter IP público não significa automaticamente que uma porta está aberta.']],
['3. NAT','NAT pode traduzir endereços privados para um endereço público, permitindo que vários dispositivos compartilhem conectividade externa.','PC 192.168.1.10 → NAT → 203.0.113.5',['NAT e firewall são conceitos diferentes, embora frequentemente apareçam juntos.']],
['4. Como descobrir','Comandos locais mostram o endereço da interface; serviços externos podem mostrar o endereço observado na Internet.','Linux: ip addr\nRoteador: WAN IP',['Compare o endereço da interface local com o endereço WAN quando estiver diagnosticando NAT.']],
['5. Erros específicos','Confundir IP local com público, assumir que todo IP privado é inacessível à Internet e testar serviço sem considerar NAT são erros comuns.','192.168.1.10:8080\n→ não é automaticamente acessível da Internet',['Verifique roteamento, NAT e firewall separadamente.']]]},
dns:{title:'DNS',sections:[
['1. O que é DNS','DNS traduz nomes de domínio em informações como endereços IP, permitindo usar nomes em vez de decorar endereços numéricos.','www.evdev.local\n→ consulta DNS\n→ 192.168.1.20',['DNS é um sistema distribuído de nomes, não apenas uma “lista no seu PC”.']],
['2. Resolução','O cliente pode consultar um resolvedor, que pode usar cache e consultar servidores autoritativos quando necessário.','Browser → resolvedor → servidores DNS → resposta',['Cache reduz consultas repetidas e possui TTL.']],
['3. Tipos de registro','A aponta nome para IPv4; AAAA para IPv6; CNAME cria alias; MX indica servidores de e-mail; TXT transporta texto usado em vários cenários.','A: site.exemplo.com → 203.0.113.10\nMX: exemplo.com → mail.exemplo.com',['Cada registro tem finalidade e formato próprios.']],
['4. TTL e cache','TTL informa por quanto tempo uma resposta pode ser mantida em cache antes de nova resolução.','A www → 300 segundos',['Alterar DNS não significa que todos os clientes verão a mudança imediatamente.']],
['5. Erros específicos','NXDOMAIN, SERVFAIL, registro errado, nameserver indisponível e cache antigo são causas comuns.','dig exemplo.com\nnslookup exemplo.com',['Teste diferentes resolvedores quando precisar separar problema local de problema autoritativo.']]]},
dhcp:{title:'DHCP',sections:[
['1. O que é DHCP','DHCP automatiza a configuração de rede de clientes, podendo fornecer IP, máscara, gateway, DNS e outros parâmetros.','Cliente → DHCP → 192.168.1.20/24\nGateway → 192.168.1.1',['Sem DHCP, uma máquina ainda pode usar configuração manual.']],
['2. DORA','Em IPv4, o fluxo clássico é Discover, Offer, Request e ACK.','Discover → Offer → Request → ACK',['O fluxo pode ser afetado por relay quando cliente e servidor estão em redes diferentes.']],
['3. Lease','O endereço costuma ser entregue por um período de concessão. O cliente pode renovar antes de expirar.','Lease: 8 horas',['Lease não é necessariamente o mesmo que “IP permanente”.']],
['4. Configurações adicionais','DHCP pode entregar gateway padrão, DNS, domínio e outras opções dependendo do servidor.','DHCP → IP + máscara + gateway + DNS',['Uma opção errada pode fazer a máquina ter IP, mas não conseguir acessar a Internet.']],
['5. Erros específicos','Pool esgotado, servidor inacessível, conflito com configuração manual e DHCP falso são problemas possíveis.','ip addr\nip route\ncat /etc/resolv.conf',['Verifique IP, rota e DNS separadamente para localizar a etapa que falhou.']]]},
tcpudp:{title:'TCP x UDP',sections:[
['1. TCP','TCP estabelece uma conexão e oferece mecanismos de entrega ordenada, controle de fluxo e retransmissão.','Cliente ⇄ TCP ⇄ Servidor\nHTTPS usa TCP em HTTP/1.1 e HTTP/2 tradicionalmente',['TCP não garante que a aplicação sempre funcionará; ele garante propriedades de transporte.']],
['2. UDP','UDP envia datagramas com pouca sobrecarga e não fornece as mesmas garantias de entrega e ordenação do TCP.','Cliente → UDP → Servidor\nDNS pode usar UDP em consultas comuns',['Aplicações podem implementar suas próprias estratégias sobre UDP.']],
['3. Handshake TCP','Uma conexão TCP tradicional começa com um handshake para sincronizar os lados.','SYN → SYN/ACK → ACK',['Firewall ou serviço ausente pode impedir a conexão mesmo que o IP responda a outros testes.']],
['4. Quando usar','A escolha depende do protocolo/aplicação. Confiabilidade e ordenação favorecem TCP; baixa sobrecarga/tempo real podem favorecer UDP quando a aplicação lida com perdas.','Voz/jogo → pode usar UDP\nTransferência tradicional → TCP',['Não escolha protocolo apenas por “ser mais rápido”.']],
['5. Erros específicos','Testar um serviço UDP com uma ferramenta TCP pode levar a conclusões erradas; firewall e porta também precisam ser considerados.','nc -u host 5353\n# exemplo de teste UDP',['Confirme qual transporte o serviço realmente utiliza.']]]},
ports:{title:'Portas de rede',sections:[
['1. O que é porta','Porta é um identificador lógico associado ao protocolo de transporte e a um endereço IP para direcionar tráfego a um serviço.','192.168.1.10:443 → HTTPS\n192.168.1.10:22 → SSH',['IP identifica o host/interface; porta ajuda a identificar o serviço/processo de destino.']],
['2. Portas conhecidas','Alguns serviços usam portas convencionais, como 22 para SSH, 53 para DNS e 443 para HTTPS, embora serviços possam ser configurados de outra forma.','ssh servidor → TCP 22\nhttps://site → TCP 443',['Não assuma que uma porta sempre prova qual serviço existe nela.']],
['3. Escuta','Um serviço precisa estar escutando na porta para aceitar conexões.','ss -lnt\n→ 0.0.0.0:8080',['Porta aberta no firewall não significa que existe um processo escutando.']],
['4. Firewall','Firewall pode permitir ou bloquear tráfego com base em regras.','Internet → 443 permitido\nInternet → 22 bloqueado',['Regras devem considerar origem, destino, protocolo e porta.']],
['5. Erros específicos','Porta ocupada, serviço parado, firewall bloqueando e protocolo errado são falhas frequentes.','curl http://localhost:8080\n→ Connection refused',['“Connection refused” e timeout são pistas diferentes e devem ser investigadas.']]]},
router:{title:'Roteador e gateway',sections:[
['1. O que é roteador','Roteador encaminha pacotes entre redes diferentes usando tabelas/regras de roteamento.','Rede A → roteador → Rede B',['Switch e roteador não são a mesma função, embora equipamentos possam combinar funções.']],
['2. Gateway padrão','Gateway padrão é o próximo salto usado pelo host para destinos que não estão diretamente conectados à rede local.','PC 192.168.1.10/24\nGateway 192.168.1.1',['Gateway precisa estar alcançável pela interface e rede local.']],
['3. Tabela de rotas','A tabela de rotas informa quais destinos são alcançados por qual interface/next hop.','ip route\ndefault via 192.168.1.1',['Uma rota mais específica pode vencer uma rota padrão.']],
['4. NAT e roteamento','Roteamento decide para onde encaminhar; NAT pode alterar endereços/portas durante a passagem.','LAN → router/NAT → Internet',['Não use “roteador faz NAT” como se NAT fosse sinônimo de roteamento.']],
['5. Erros específicos','Gateway errado, rota ausente, interface down e rota de retorno inexistente causam falhas.','ip route\nping 192.168.1.1\ntraceroute 8.8.8.8',['Teste primeiro o gateway local e depois destinos externos.']]]},
subnet:{title:'Máscara e sub-rede',sections:[
['1. O que é máscara','Máscara/CIDR informa qual parte do endereço pertence à rede e qual parte pode identificar hosts dentro dela.','192.168.1.10/24\nMáscara 255.255.255.0',['/24 é uma notação CIDR; não confunda com quantidade de hosts automaticamente.']],
['2. Rede e broadcast','Em IPv4, uma sub-rede tradicional possui endereço de rede e, em muitos contextos, endereço de broadcast, além dos endereços de host.','192.168.1.0/24\nrede: .0\nbroadcast: .255',['Regras variam para casos especiais e IPv6 não usa broadcast da mesma forma.']],
['3. CIDR','/24, /25, /26 etc. representam quantos bits pertencem ao prefixo da rede.','192.168.1.0/26\n→ blocos de 64 endereços IPv4',['Entenda o bloco antes de decorar números.']],
['4. Dividir redes','Sub-redes permitem separar segmentos por organização, segurança ou necessidade de endereçamento.','VLAN A → 192.168.10.0/24\nVLAN B → 192.168.20.0/24',['Separar sub-redes exige roteamento quando elas precisam se comunicar.']],
['5. Erros específicos','Máscara incompatível pode fazer dois hosts acreditarem que estão na mesma rede quando não estão, ou o contrário.','ip addr\nip route',['Compare IP + máscara dos dois lados, não apenas os IPs.']]]},
'network-http':{title:'Redes — o caminho até um site',sections:[
['1. Nome até IP','Ao acessar um domínio, a resolução DNS fornece informações necessárias para localizar o serviço.','www.exemplo.com → DNS → 203.0.113.10',['DNS é uma etapa, não a comunicação inteira.']],
['2. Transporte','Depois de descobrir o destino, a aplicação usa protocolos de transporte e segurança conforme o serviço.','DNS → IP → TCP → TLS → HTTP',['HTTP/3 usa QUIC sobre UDP, portanto o caminho pode ser diferente.']],
['3. HTTP','O cliente envia uma requisição e recebe uma resposta.','GET /index.html\n→ 200 OK',['Status, headers e body ajudam a diagnosticar o que ocorreu.']],
['4. Renderização','O navegador recebe recursos como HTML, CSS, JS e imagens e monta a página.','HTML → CSS/JS/imagens → renderização',['Recursos adicionais geram novas requisições.']],
['5. Erros específicos','Falha de DNS, timeout TCP, certificado TLS inválido, 404 ou 500 são problemas em etapas diferentes.','DevTools Network\n→ veja DNS/tempo/status/recursos',['Identifique a etapa antes de alterar configurações.']]]},
terminal:{title:'Linux — Terminal do zero',sections:[
['1. Terminal x shell','Terminal é a interface que permite interagir com o sistema; shell é o programa que interpreta comandos. Bash e Zsh são shells.','$ pwd\n$ ls -la',['O terminal não é o mesmo que o shell.']],
['2. pwd','pwd mostra o diretório de trabalho atual. Isso ajuda a saber em qual pasta os próximos comandos serão executados.','$ pwd\n/home/usuario/Projetos',['Se o caminho não for o esperado, pare antes de executar operações destrutivas.']],
['3. ls','ls lista conteúdo. -l mostra detalhes, -a inclui ocultos e -h deixa tamanhos mais legíveis.','$ ls\n$ ls -la\n$ ls -lah',['Arquivo começando com . pode não aparecer no ls simples.']],
['4. cd','cd muda de diretório. .. sobe um nível, ~ representa a home e caminhos podem ser absolutos ou relativos.','$ cd Projetos\n$ cd ..\n$ cd ~/Documentos\n$ cd "Meu Projeto"',['Linux diferencia maiúsculas e minúsculas; use Tab para completar nomes.']],
['5. mkdir e touch','mkdir cria diretórios; mkdir -p cria diretórios-pai quando necessário; touch cria um arquivo vazio ou atualiza seu timestamp.','$ mkdir -p estudos/html\n$ touch estudos/anotacoes.txt',['touch não serve para escrever conteúdo; use editor ou redirecionamento.']],
['6. cp e mv','cp copia; mv move ou renomeia. Sempre confira o destino antes de usar curingas.','$ cp aula.txt backup.txt\n$ mv backup.txt backups/\n$ mv antigo.txt novo.txt',['mv pode substituir destino dependendo das opções e ambiente; cuidado com nomes.']],
['7. cat, less, head e tail','cat mostra arquivos pequenos; less permite navegação; head mostra o início; tail mostra o fim. tail -f acompanha novas linhas.','$ cat aula.txt\n$ less app.log\n$ head -n 20 app.log\n$ tail -f app.log',['No less, pressione q para sair.']],
['8. echo e redirecionamento','echo imprime texto. > substitui o conteúdo do arquivo; >> acrescenta ao final.','$ echo "Olá" > aula.txt\n$ echo "Nova linha" >> aula.txt',['O erro clássico é usar > quando queria preservar o arquivo.']],
['9. rm','rm remove arquivos; rm -r pode remover diretórios e seu conteúdo. Não existe uma lixeira padrão equivalente à interface gráfica.','$ rm arquivo.txt\n$ rm -r pasta-teste',['Confira pwd, ls e o caminho antes. Evite rm -rf sem compreender exatamente o alvo.']],
['10. Permissões e sudo','ls -l mostra permissões. chmod altera permissões. sudo executa um comando com privilégios administrativos quando permitido.','$ ls -l script.sh\n$ chmod u+x script.sh\n$ ./script.sh\n$ sudo apt update',['Não use sudo para qualquer comando e não use chmod 777 como correção genérica.']],
['11. Erros de digitação e caminhos','No such file or directory geralmente aponta caminho/nome inexistente; command not found indica comando não encontrado; Permission denied indica falta de permissão.','$ cd projetoss\nbash: cd: projetoss: No such file or directory\n\n$ ./script.sh\nbash: ./script.sh: Permission denied',['Confira grafia, maiúsculas/minúsculas, espaços, PATH e permissões.']],
['12. Comandos de diagnóstico','Comandos como which, type, whoami, id, ip, ps e df ajudam a descobrir estado do sistema.','$ whoami\n$ which git\n$ df -h\n$ ps aux',['Diagnóstico é melhor que executar comandos aleatórios.']]]},
files:{title:'Linux — arquivos e pastas',sections:[
['1. Árvore de diretórios','Linux organiza arquivos em uma árvore que parte de /. Diretórios comuns incluem /home, /etc, /var, /tmp e /usr.','$ ls /\n$ ls /home',['Cada distribuição pode organizar detalhes de forma diferente, mas a estrutura base segue convenções.']],
['2. Caminho absoluto e relativo','Absoluto começa em /; relativo começa no diretório atual.','$ pwd\n/home/eve/Projetos\n$ cd aula\n$ cd /home/eve/Projetos/aula',['Um caminho relativo pode funcionar em uma pasta e falhar em outra.']],
['3. Arquivos ocultos','Nomes iniciados por . normalmente ficam ocultos no ls simples.','$ ls -la\n-rw-r--r-- .env',['Oculto não significa secreto; .env ainda pode conter credenciais sensíveis.']],
['4. Copiar, mover e remover','cp, mv e rm são operações fundamentais e devem ser usadas com atenção aos caminhos.','$ cp config.yml config.bak\n$ mv config.bak backup/',['Faça backup antes de alterações importantes.']],
['5. Erros específicos','Nome digitado errado, permissão insuficiente, espaço no caminho e uso incorreto de curingas são frequentes.','$ cd "Projeto EvDev"\n$ ls *.js',['Use Tab e aspas quando o caminho contém espaços.']]]},
permissions:{title:'Linux — permissões',sections:[
['1. r, w e x','read permite leitura; write permite alteração; execute permite executar arquivo ou, em diretórios, atravessá-los conforme as regras de permissão.','$ ls -l script.sh\n-rwxr-xr-- script.sh',['x em diretório tem significado diferente de x em arquivo.']],
['2. Dono, grupo e outros','As permissões são divididas em owner, group e others.','$ -rwxr-x---\nowner=rwx\ngroup=r-x\nothers=---',['Confira proprietário e grupo com ls -l.']],
['3. chmod','chmod altera permissões. Pode usar símbolos ou números octais.','$ chmod u+x script.sh\n$ chmod 640 arquivo.txt',['Não decore números sem entender r=4, w=2, x=1.']],
['4. chown e grupos','chown altera proprietário/grupo quando autorizado; grupos permitem compartilhar acesso entre usuários.','$ sudo chown eve:dev arquivo.txt\n$ groups',['Alterar proprietário pode impedir serviços de acessar arquivos se feito sem planejamento.']],
['5. Permission denied','Permission denied pode vir da permissão do arquivo, do diretório, do proprietário/grupo, de montagem ou de políticas adicionais.','$ ./script.sh\nbash: ./script.sh: Permission denied',['Confira ls -l, caminho e permissões de diretórios antes de usar sudo.']]]},
processes:{title:'Linux — processos',sections:[
['1. O que é processo','Processo é uma instância de programa em execução. Cada processo recebe um PID.','$ ps aux\n$ echo $$',['PID muda quando processos são reiniciados.']],
['2. ps','ps mostra processos. ps aux é uma forma comum de visualizar uma lista detalhada em Linux.','$ ps aux | grep nginx',['grep pode encontrar o próprio comando de busca; prefira ferramentas específicas quando possível.']],
['3. top e recursos','top mostra processos e consumo de CPU/memória em tempo real.','$ top',['CPU alta não significa automaticamente que o processo está com problema; investigue comportamento e contexto.']],
['4. kill','kill envia um sinal ao processo. SIGTERM é uma solicitação para terminar de forma organizada; SIGKILL força encerramento quando necessário.','$ kill 1234\n$ kill -9 1234',['Não use kill -9 como primeira opção; processos podem precisar limpar recursos.']],
['5. Serviços e logs','Serviços gerenciados pelo systemd podem ser consultados com systemctl e logs com journalctl.','$ systemctl status nginx\n$ journalctl -u nginx',['Leia logs antes de reiniciar repetidamente.']]]},
packages:{title:'Linux — pacotes',sections:[
['1. O que é gerenciador de pacotes','Gerenciador de pacotes instala, atualiza e remove software usando repositórios e resolve dependências.','$ sudo apt update\n$ sudo apt install git',['O comando depende da distribuição.']],
['2. apt','Em Debian/Ubuntu, apt é usado para consultar e gerenciar pacotes. update atualiza índices; install instala; upgrade atualiza pacotes conforme as regras.','$ sudo apt update\n$ sudo apt install curl\n$ sudo apt upgrade',['apt update não é o mesmo que instalar atualizações.']],
['3. dnf e pacman','Fedora usa dnf; Arch Linux usa pacman. A sintaxe e a filosofia de atualização diferem.','$ sudo dnf install git\n$ sudo pacman -S git',['Não copie comandos de outra distribuição sem saber qual sistema está usando.']],
['4. Repositórios','Repositórios são fontes de pacotes. A distribuição assina/organiza pacotes conforme sua infraestrutura.','$ apt policy git',['Adicionar repositórios de terceiros exige avaliar origem e compatibilidade.']],
['5. Erros específicos','Pacote inexistente, índice desatualizado, conflito de dependências e repositório indisponível são comuns.','$ sudo apt install pacote-inexistente\nE: Unable to locate package ...',['Leia a primeira mensagem que explica a causa e confirme a distribuição/versão.']]]},
shell:{title:'Linux — shell, Bash, Zsh e PATH',sections:[
['1. O que é shell','Shell interpreta comandos e também pode executar scripts. Bash e Zsh são exemplos populares.','$ echo $SHELL\n$ bash --version',['Terminal e shell são conceitos relacionados, mas diferentes.']],
['2. Variáveis de ambiente','Variáveis podem armazenar configurações usadas por processos. PATH é uma lista de diretórios onde o shell procura executáveis.','$ echo $PATH\n$ echo $HOME\n$ which git',['Alterar PATH incorretamente pode fazer comandos desaparecerem.']],
['3. export','export torna uma variável disponível para processos filhos do shell.','$ export API_URL="http://localhost:3000"\n$ echo $API_URL',['Variáveis exportadas podem ser usadas por programas iniciados naquele shell.']],
['4. Aliases e histórico','alias cria atalhos; histórico permite recuperar comandos anteriores.','$ alias ll="ls -lah"\n$ history',['Não transforme um alias importante em algo que esconda uma operação perigosa.']],
['5. Erros específicos','command not found, PATH mal configurado, variável vazia e script sem permissão são problemas comuns.','$ echo $PATH\n$ type git\n$ ./script.sh',['Use type/which e confira o shebang/permissão do script.']]]},
windows:{title:'Windows — PowerShell',sections:[
['1. O que é PowerShell','PowerShell é um shell e ambiente de automação do Windows. Ele trabalha com cmdlets e objetos.','Get-Location\nGet-ChildItem',['PowerShell não é simplesmente Bash com outros nomes.']],
['2. Navegação','Get-Location mostra onde você está; Get-ChildItem lista; Set-Location muda de pasta.','Get-Location\nGet-ChildItem\nSet-Location .\\Projetos',['Caminhos e aliases podem variar entre ambientes.']],
['3. Processos e serviços','Get-Process mostra processos; Get-Service mostra serviços.','Get-Process\nGet-Service | Where-Object Status -eq "Running"',['Não pare um serviço sem entender sua função.']],
['4. Variáveis e pipeline','PowerShell passa objetos pelo pipeline, permitindo filtrar e selecionar propriedades.','$p = Get-Process\n$p | Where-Object CPU -gt 100',['O pipeline trabalha com objetos, não apenas texto.']],
['5. Erros específicos','CommandNotFoundException, caminho inexistente, acesso negado e política de execução são problemas comuns.','Get-ChildItem .\\nao-existe\n# caminho não encontrado',['Leia o erro completo e confirme o comando e caminho.']]]},
compare:{title:'Linux x Windows — diferenças e instalação',sections:[
['1. O que muda','Windows e Linux são sistemas operacionais com diferentes componentes, ferramentas, modelos de distribuição e formas de administração.','Windows → PowerShell/Explorer\nLinux → shell/gerenciador de pacotes',['Não existe uma única “interface Linux”; há várias distribuições e ambientes.']],
['2. O que é uma distribuição Linux','Distribuição combina kernel Linux, ferramentas, gerenciador de pacotes, instalador e outros componentes.','Ubuntu → base Debian + apt\nFedora → rpm/dnf\nArch → pacman',['Distribuições podem compartilhar o kernel e ainda ter experiências diferentes.']],
['3. Ubuntu, Mint, Debian, Fedora e Arch','Ubuntu é amplamente usado para desktop/servidores; Mint prioriza uma experiência desktop familiar; Debian enfatiza estabilidade; Fedora acompanha tecnologias recentes; Arch oferece um sistema mais manual e simples em sua base.','Ubuntu: apt\nFedora: dnf\nArch: pacman',['As diferenças de ciclo, pacotes e configuração importam mais que o nome “Linux”.']],
['4. Como instalar Linux','O caminho comum é baixar a ISO oficial, gravar em pendrive bootável, iniciar pelo USB, testar em modo Live e então instalar. Faça backup antes e identifique corretamente o disco.','ISO → pendrive bootável → boot USB → Live → instalador',['Instalar no disco errado pode apagar dados. Confirme modelo/capacidade do disco e faça backup.']],
['5. Dual boot','Dual boot mantém Windows e Linux no mesmo computador com partições/entradas de inicialização separadas. É necessário planejar espaço, UEFI e recuperação.','Windows + espaço livre → instalador Linux → partições → bootloader',['Criptografia/BitLocker, Fast Startup e configurações UEFI podem afetar o processo.']],
['6. Live USB','Live USB permite iniciar uma distribuição sem instalar no disco, útil para testar hardware, Wi-Fi, vídeo e interface.','Boot USB → “Try Linux” → testar Wi-Fi/teclado/tela',['Nem todo hardware funcionará perfeitamente no modo Live.']],
['7. Erros específicos','ISO corrompida, USB mal gravado, Secure Boot/UEFI incompatível, partição errada e driver de Wi-Fi são problemas que podem aparecer.','SHA256 da ISO → conferir antes de gravar\nUEFI → selecionar USB',['Consulte documentação da distribuição e do fabricante quando o hardware não funcionar.']]]},
ui:{title:'Mobile — interface (UI)',sections:[
['1. O que é UI','UI é a interface visual e interativa do aplicativo: telas, textos, botões, campos, listas e estados.','Tela → AppBar → conteúdo → botão',['UI não é apenas estética; precisa comunicar estado e permitir interação.']],
['2. Componentes','Componentes são blocos reutilizáveis da interface. Um botão, campo ou card pode ter propriedades e estados.','Button(text: "Salvar")',['Componentes reutilizáveis reduzem duplicação.']],
['3. Layout','Layout define posição, tamanho, alinhamento e relação entre componentes.','Column([\n  Text("Nome"),\n  TextField(),\n])',['Conteúdo precisa se adaptar a telas menores e diferentes orientações.']],
['4. Estados visuais','Uma tela pode estar carregando, vazia, com erro ou com dados. Esses estados precisam ser representados.','loading → CircularProgressIndicator\nerror → mensagem + tentar novamente',['Não deixe o usuário olhando uma tela vazia sem explicação.']],
['5. Erros específicos','Overflow, teclado cobrindo campo, botão pequeno e texto cortado são problemas comuns em mobile.','Layout com conteúdo maior que a tela\n→ overflow',['Teste em tamanhos de tela diferentes.']]]},
state:{title:'Mobile — estado',sections:[
['1. O que é estado','Estado são dados que mudam durante o uso e influenciam o que a interface apresenta.','loading = true\n→ mostrar carregamento',['Estado deve ter uma fonte clara e ser atualizado de forma previsível.']],
['2. Estado local','Estado local pertence a uma tela/componente e pode controlar coisas como texto digitado ou seleção.','contador = 0\ncontador++',['Não eleve estado para toda a aplicação sem necessidade.']],
['3. Estado de servidor','Dados vindos de API também possuem estados como carregando, sucesso e erro.','loading → request → success/error',['Não trate “sem dados” e “erro” como a mesma coisa.']],
['4. Atualização da UI','Quando estado muda, o framework normalmente reconstrói/re-renderiza partes da interface.','setState(() { contador++; });',['Atualização fora do mecanismo esperado pode deixar a interface desatualizada.']],
['5. Erros específicos','Loading infinito, estado duplicado e atualização depois que a tela foi descartada são problemas comuns.','request termina → tela já saiu\n→ atualização inválida',['Cancele/ignore operações assíncronas quando o framework exigir.']]]},
navigation:{title:'Mobile — navegação',sections:[
['1. O que é navegação','Navegação controla a passagem entre telas e o histórico de retorno.','Login → Home → Detalhe → Voltar',['Pilha de navegação explica por que “voltar” retorna para uma tela anterior.']],
['2. Rotas','Rotas dão nomes ou destinos para telas.','/login\n/home\n/produto/10',['Mantenha parâmetros necessários claramente definidos.']],
['3. Parâmetros','Uma tela pode receber um ID ou outro dado para buscar/renderizar conteúdo.','/produto/10\n→ id = 10',['Valide parâmetros ausentes ou inválidos.']],
['4. Deep links','Deep link permite abrir uma tela específica a partir de um link externo, quando o aplicativo está configurado para isso.','https://app.exemplo.com/produto/10',['Segurança e autenticação continuam sendo verificadas ao abrir uma rota.']],
['5. Erros específicos','Rota inexistente, parâmetro nulo, pilha duplicada e perda de estado são falhas comuns.','navigate("/produto/999")\n→ produto não encontrado',['Trate rotas e dados inválidos explicitamente.']]]},
'mobile-api':{title:'Mobile — consumo de APIs',sections:[
['1. O que é consumir uma API','O app mobile envia requisições para obter ou alterar dados em um serviço.','GET /api/produtos\n→ JSON',['O aplicativo depende de rede e deve tratar falhas.']],
['2. Requisição','Uma requisição pode conter método, URL, headers, autenticação e corpo.','POST /api/login\nContent-Type: application/json',['Não coloque segredo permanente no app como se fosse uma senha do servidor.']],
['3. Parsing','A resposta JSON precisa ser convertida em objetos/modelos que o app consiga usar.','{"id":10,"nome":"Mouse"}\n→ Produto(id:10,nome:"Mouse")',['Campo ausente ou tipo inesperado pode quebrar o parsing.']],
['4. Loading e erro','Enquanto espera, mostre carregamento; se falhar, mostre erro útil e possibilidade de tentar novamente.','loading → request → success/error',['Timeout e ausência de Internet são cenários normais em mobile.']],
['5. Erros específicos','URL incorreta, certificado, timeout, status 401/403 e JSON incompatível são comuns.','401 → renovar login/reautenticar conforme o fluxo',['Não trate 500 como erro de senha. Diferencie causas.']]]},
build:{title:'Mobile — build',sections:[
['1. O que é build','Build é o processo de transformar código, dependências e configuração em um artefato que pode ser instalado/distribuído.','Código → dependências → compilação → APK/AAB',['O processo depende da plataforma e ferramenta.']],
['2. Debug x release','Debug é voltado para desenvolvimento; release é preparado para distribuição, com configurações, otimizações e assinatura apropriadas.','flutter build apk --release',['Não distribua credenciais de desenvolvimento dentro do app.']],
['3. Dependências','O build resolve versões e compila bibliotecas necessárias.','pubspec.yaml → dependências → build',['Versões incompatíveis podem causar falha de build.']],
['4. Assinatura','Plataformas móveis exigem mecanismos de assinatura para identificar e distribuir aplicativos de forma controlada.','Keystore → assinatura → app release',['Proteja chaves de assinatura e não as coloque publicamente no repositório.']],
['5. Erros específicos','SDK ausente, versão incompatível, dependência quebrada e configuração de assinatura são falhas comuns.','Gradle build failed\n→ conferir primeira causa no log',['Leia o primeiro erro relevante, não apenas a última linha.']]]},
repo:{title:'Git — repositório',sections:[
['1. O que é repositório','Repositório é um projeto acompanhado pelo Git, incluindo arquivos e histórico. A pasta .git guarda os dados do controle de versão.','git init\ngit status',['Não inicialize um repositório dentro de outro sem entender a consequência.']],
['2. git init','Cria um novo repositório Git na pasta atual.','git init',['Confira a pasta atual com pwd/dir antes de executar.']],
['3. git status','Mostra branch, alterações no working tree e o que está no staging.','git status',['Use status frequentemente para entender o estado antes de outros comandos.']],
['4. git log','Mostra histórico de commits.','git log --oneline --graph',['Histórico local e remoto podem estar em estados diferentes.']],
['5. Erros específicos','Repositório na pasta errada, .gitignore incorreto e arquivos grandes/secretos entrando no histórico são problemas comuns.','git status\n.gitignore → node_modules/ .env',['Se segredo entrou em commit, removê-lo do arquivo atual pode não ser suficiente; o histórico pode precisar de tratamento.']]]},
commit:{title:'Git — commit',sections:[
['1. O que é commit','Commit é um registro no histórico local do conjunto de alterações que foi colocado no staging.','git add index.html\ngit commit -m "Adiciona página inicial"',['Commit não é a mesma coisa que push.']],
['2. Working tree e staging','O arquivo pode estar modificado no working tree e ainda não estar no staging. git add seleciona o que entrará no próximo commit.','git status\ngit add index.html\ngit status',['Revise o staging antes do commit.']],
['3. Mensagem','Mensagem deve resumir a mudança registrada.','git commit -m "Corrige validação do formulário"',['Evite mensagens como “coisas”, “teste” ou “mudanças” quando o projeto exige histórico compreensível.']],
['4. Commit e GitHub','Commit fica no repositório local. git push envia commits para um remoto, como um repositório no GitHub.','git commit -m "Cria tela de login"\ngit push origin feature/login',['Se você não executou push, o commit pode existir somente localmente.']],
['5. Erros específicos','nothing to commit, esquecer git add, identidade não configurada e incluir .env são problemas frequentes.','git config user.name "Seu Nome"\ngit config user.email "email@exemplo.com"',['Antes de commitar, confira git status e arquivos sensíveis.']]]},
branch:{title:'Git — branches',sections:[
['1. O que é branch','Branch é uma referência a uma linha de desenvolvimento. Ela permite trabalhar em uma alteração sem misturá-la imediatamente com outra linha.','git switch -c feature/login',['Branch não cria uma cópia física independente de todos os arquivos.']],
['2. Criar e trocar','git switch -c cria e muda para uma nova branch; git switch troca para uma existente.','git switch -c feature/busca\ngit switch main',['Confira a branch atual com git branch --show-current.']],
['3. Branch base','Crie a branch a partir de uma base atualizada quando o fluxo do projeto exigir.','git switch main\ngit pull\ngit switch -c feature/busca',['Trabalhar a partir de uma base antiga aumenta conflitos.']],
['4. Nome e escopo','Nomes claros ajudam a entender a finalidade da branch.','feature/login\nfix/menu-mobile\nchore/update-deps',['Siga o padrão do projeto.']],
['5. Erros específicos','Commitar na branch errada, esquecer de atualizar base e apagar branch com trabalho não integrado são problemas comuns.','git branch --show-current\ngit status',['Antes de comandos destrutivos, confira branch e status.']]]},
merge:{title:'Git — merge',sections:[
['1. O que é merge','Merge integra o histórico de uma branch em outra.','git switch main\ngit merge feature/login',['A branch em que você está é o destino do merge.']],
['2. Fast-forward e merge commit','Quando o histórico permite, Git pode avançar a referência sem criar um commit de merge; em outros casos, pode criar um commit de integração.','main: A → B\nfeature: A → B → C\nmerge main → C',['O resultado depende do histórico e das opções usadas.']],
['3. Conflitos','Conflito acontece quando Git não consegue combinar alterações automaticamente.','<<<<<<< HEAD\nversão A\n=======\nversão B\n>>>>>>> feature/login',['Você precisa escolher/reconstruir o conteúdo correto, não simplesmente “aceitar tudo”.']],
['4. Finalizar','Depois de resolver arquivos, use git add e finalize o merge conforme o estado mostrado pelo Git.','git status\ngit add arquivo.js\ngit commit',['git status informa se o merge ainda está em andamento.']],
['5. Erros específicos','Fazer merge na branch errada, resolver conflito sem testar e esquecer arquivos conflitantes são problemas comuns.','git status\ngit diff',['Teste a aplicação depois de integrar alterações.']]]},
github:{title:'GitHub — publicar, baixar, compartilhar e colaborar',sections:[
['1. O que é o GitHub','GitHub é uma plataforma para hospedar repositórios Git e colaborar neles. Além dos arquivos e histórico, um repositório pode ter README, Issues, Pull Requests, releases, discussões e configurações de colaboração.',`Git local
   ↕ push / pull
GitHub
   ├─ arquivos
   ├─ histórico
   ├─ README
   ├─ Issues
   └─ Pull Requests`,['Git continua sendo a ferramenta de versionamento; GitHub é uma plataforma que adiciona serviços ao redor do Git.']],
['2. Criar um repositório','Um repositório pode ser criado no GitHub para um projeto novo ou pode receber um projeto que já existe no computador.',`git init
git add .
git commit -m "Primeiro commit"
git branch -M main
git remote add origin URL
git push -u origin main`,['Confira o endereço do remote antes do primeiro push.','Não publique senhas, tokens, arquivos .env ou outros segredos.']],
['3. README: explique seu projeto','O README costuma ser a primeira referência para quem abre um repositório. Ele pode explicar o que o projeto faz, como instalar, como executar, tecnologias usadas, exemplos, limitações, licença e como contribuir.',`# Meu Projeto

## Sobre
O que o projeto faz.

## Como executar
1. Instale...
2. Configure...
3. Execute...

## Tecnologias
- Python
- SQLite`,['Um README bom reduz a dúvida de quem baixa o projeto.','Atualize o README quando a forma de executar o projeto mudar.']],
['4. Como baixar os arquivos sem Git','Na página do repositório, você pode baixar um snapshot do código como arquivo compactado. Isso é diferente de clonar: o download é útil para apenas obter os arquivos, enquanto clone cria um repositório Git local conectado ao histórico/remoto.',`GitHub → Code → Download ZIP

Download ZIP ≠ git clone`,['Se você pretende versionar alterações e sincronizar com o projeto, clone normalmente é mais apropriado.']],
['5. Clone: baixar e começar a trabalhar','Com clone, você baixa o repositório e seu histórico para o computador. Depois pode editar, criar commits e trabalhar com branches.',`git clone https://github.com/usuario/projeto.git
cd projeto
git status`,['Clone traz um repositório Git local; não é apenas uma cópia de arquivos.']],
['6. Compartilhar um projeto','Para compartilhar, envie o link do repositório. Se o projeto for público, outras pessoas podem visualizar os arquivos e, conforme as permissões, colaborar. Também é possível usar releases ou enviar um ZIP quando a pessoa só precisa dos arquivos.',`https://github.com/usuario/meu-projeto

Link do repositório
      ↓
outros colaboradores`,['Antes de tornar um repositório público, revise arquivos, histórico e segredos.']],
['7. Fork: criar sua própria cópia no GitHub','Fork cria uma cópia de um repositório na sua conta ou organização para que você possa trabalhar sem modificar diretamente o original. É muito usado para contribuir com projetos nos quais você não tem permissão de escrita.',`Repositório original
        ↓ fork
Seu repositório
        ↓
branch + commits
        ↓
Pull Request → original`,['Fork não é simplesmente baixar ZIP: ele cria uma cópia de repositório no GitHub e permite propor alterações ao projeto original.']],
['8. Como fazer um fork','Abra o repositório que deseja usar, escolha Fork e defina onde a cópia será criada. Depois, clone o seu fork para trabalhar localmente.',`GitHub → repositório original
        ↓
       Fork
        ↓
seu-usuario/projeto
        ↓
git clone URL-DO-SEU-FORK`,['Depois de criar o fork, mantenha claro qual remoto representa seu fork e qual representa o repositório original (upstream), quando esse fluxo for necessário.']],
['9. Contribuir com Pull Request','Depois de fazer alterações no seu fork, envie a branch para o GitHub e abra um Pull Request para o repositório original. O responsável pelo projeto pode revisar, pedir mudanças e aceitar ou fechar a proposta.',`git switch -c feature/melhoria
git add .
git commit -m "Melhora documentação"
git push -u origin feature/melhoria

→ abrir Pull Request`,['Pull Request é uma proposta de integração, não uma garantia de que a alteração será aceita.']],
['10. Trabalhar com outras pessoas','Em uma equipe, cada pessoa pode trabalhar em uma branch e depois abrir Pull Requests. Issues ajudam a registrar tarefas, bugs e ideias; revisão de código ajuda a discutir mudanças antes do merge.',`Issue → tarefa
Branch → desenvolvimento
Commit → histórico
Pull Request → revisão
Merge → integração`,['O fluxo exato depende das regras do projeto.']],
['11. Baixar alterações de um projeto','Se outras pessoas fizeram mudanças no remoto, você pode buscar e integrar essas alterações. Pull não é simplesmente “baixar arquivo”: ele atualiza seu repositório local com as mudanças do remoto.',`git fetch origin
git status
git pull origin main`,['Entenda o estado da sua branch antes de fazer pull, especialmente se houver alterações locais.']],
['12. Fork desatualizado e upstream','Quando o projeto original continua recebendo mudanças, seu fork pode ficar atrás. Você pode adicionar o repositório original como upstream, buscar alterações e sincronizar sua branch conforme o fluxo do projeto.',`git remote -v
git remote add upstream URL-DO-ORIGINAL
git fetch upstream`,['Não confunda origin (normalmente seu fork) com upstream (repositório original).']],
['13. Segurança antes de compartilhar','O Git guarda histórico. Apagar uma senha do arquivo atual não significa que ela desapareceu automaticamente dos commits antigos. Antes de publicar, revise o histórico e use ferramentas adequadas de revogação/rotação se um segredo tiver sido exposto.',`NUNCA:
API_KEY=...
SENHA=...
TOKEN=...

Use variáveis de ambiente e mecanismos seguros.`,['Se um segredo real foi publicado, trate-o como comprometido: revogue ou rotacione conforme o serviço.']],
['14. GitHub no dia a dia','Um fluxo de estudo pode ser: criar projeto, README, commits pequenos, branch para cada mudança, push, Pull Request quando fizer sentido e histórico limpo o suficiente para entender o projeto depois.',`projeto
 ↓
README
 ↓
branch
 ↓
commits
 ↓
push
 ↓
Pull Request / revisão
 ↓
merge`,['Não existe um único fluxo obrigatório para todos os projetos; o objetivo é tornar o trabalho rastreável e colaborativo.']] ]},
conflicts:{title:'Git — conflitos',sections:[
['1. Por que conflitos acontecem','Conflito aparece quando alterações diferentes atingem a mesma região de um arquivo e o Git não consegue decidir qual deve prevalecer.','A: botão “Salvar”\nB: botão “Enviar”\n→ mesma linha alterada',['Conflito não significa que o Git perdeu o arquivo; ele pede decisão humana.']],
['2. Marcadores','Git insere marcadores para mostrar as versões conflitantes.','<<<<<<< HEAD\nA\n=======\nB\n>>>>>>> feature',['Remova todos os marcadores antes de finalizar.']],
['3. Resolver','Leia o contexto, escolha ou combine a solução correta, salve e depois marque o arquivo como resolvido.','git status\n# editar arquivo\ngit add arquivo.js',['Não escolha uma versão sem entender o comportamento desejado.']],
['4. Testar','Depois de resolver, execute testes e revise diff para garantir que a integração está correta.','git diff --cached\n# testes\ngit status',['Conflito resolvido sintaticamente pode continuar errado logicamente.']],
['5. Erros específicos','Esquecer marcadores, adicionar arquivo errado ou abandonar merge/rebase no meio são problemas comuns.','git status\ngit merge --abort',['Use abort quando realmente precisar cancelar o merge em andamento e o Git permitir.']]]},
workflow:{title:'Git — fluxo de trabalho',sections:[
['1. Atualizar base','Comece sincronizando a branch base conforme o fluxo da equipe.','git switch main\ngit pull',['Entenda se o projeto usa merge, rebase ou outra política.']],
['2. Criar branch','Crie uma branch específica para uma tarefa.','git switch -c feature/busca',['Uma branch por mudança ajuda revisão e rastreabilidade.']],
['3. Commits pequenos','Registre unidades de mudança compreensíveis.','git add .\ngit commit -m "Adiciona busca por código"',['Evite misturar refatoração, correção e funcionalidade sem necessidade.']],
['4. Pull Request','Envie a branch para o remoto e abra PR para revisão.','git push -u origin feature/busca',['Descrição deve explicar o que mudou e, conforme o projeto, como testar.']],
['5. Erros específicos','Branch errada, commits gigantes, segredo no repositório, conflito não testado e force push sem entender o histórico são riscos.','git status\ngit branch --show-current\ngit diff',['Revise antes de enviar e antes de integrar.']]]},
docker:{title:'Docker — containers',sections:[
['1. O que é Docker','Docker permite empacotar e executar aplicações em containers, usando imagens como base. Container compartilha o kernel do host e não é uma VM completa.','docker run --name web -p 8080:80 nginx',['Container é um processo isolado com filesystem e configurações próprias.']],
['2. Imagem x container','Imagem é o artefato/template; container é uma instância em execução criada a partir dela.','docker pull nginx\ndocker run nginx',['Alterar um container manualmente não substitui uma imagem versionada.']],
['3. Portas','-p publica uma porta do host para uma porta do container.','docker run -p 8080:80 nginx\nHost:8080 → Container:80',['A porta do host pode ser diferente da porta do serviço dentro do container.']],
['4. Volumes','Volumes persistem dados fora da camada efêmera do container.','docker volume create dados\ndocker run -v dados:/var/lib/app app',['Persistência depende de como a aplicação grava os dados.']],
['5. Erros específicos','Porta ocupada, container parado, imagem inexistente, volume incorreto e segredo dentro da imagem são problemas comuns.','docker ps -a\ndocker logs web',['Use docker ps, logs e inspect para diagnosticar antes de recriar tudo.']]]},
images:{title:'Docker — imagens',sections:[
['1. O que é uma imagem','Imagem é um pacote versionado em camadas que contém filesystem e metadados necessários para criar containers.','docker pull nginx:latest\ndocker images',['Tag não é garantia absoluta de imutabilidade; para reprodutibilidade, considere referências por digest.']],
['2. Dockerfile','Dockerfile descreve como construir uma imagem.','FROM node:22\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nCMD ["node","server.js"]',['A ordem influencia cache de build.']],
['3. Build e tag','docker build cria a imagem e -t define nome/tag.','docker build -t evdev-app:1.0 .',['O ponto final é o contexto de build.']],
['4. Camadas e .dockerignore','Comandos do Dockerfile geram camadas; .dockerignore evita enviar arquivos desnecessários para o contexto.','node_modules\n.git\n.env\n→ .dockerignore',['Não copie segredos para a imagem.']],
['5. Erros específicos','Contexto errado, Dockerfile incorreto, dependências pesadas e arquivos desnecessários são problemas comuns.','docker build -t app .\n→ COPY failed: file not found',['Confira o contexto e caminhos relativos ao diretório do build.']]]},
cicd:{title:'CI/CD',sections:[
['1. O que é CI','Continuous Integration automatiza integração e validações, como testes e build, a cada mudança.','push → checkout → install → test',['CI reduz tarefas manuais e fornece feedback mais cedo.']],
['2. CD','Continuous Delivery/Deployment automatiza a preparação ou publicação de versões, conforme o processo adotado.','testes → build → deploy staging → produção',['Entrega automática exige controles adequados.']],
['3. Pipeline','Pipeline é uma sequência de etapas executadas por um sistema de automação.','lint → test → build → package → deploy',['Falha em uma etapa deve impedir avanço quando a qualidade exigida não foi atingida.']],
['4. Secrets','Credenciais da pipeline devem ser armazenadas no mecanismo de secrets do provedor, não no código.','SECRET_TOKEN → variável protegida → job',['Não imprima secrets nos logs.']],
['5. Erros específicos','Dependência instável, ambiente diferente da produção, testes flaky e secret ausente são problemas comuns.','CI: Node 22\nProdução: Node 20\n→ comportamento diferente',['Fixe versões e aproxime ambientes quando possível.']]]},
deploy:{title:'Deploy',sections:[
['1. O que é deploy','Deploy é disponibilizar uma versão da aplicação em um ambiente onde ela possa ser executada por usuários ou outros sistemas.','build → servidor → aplicação online',['Deploy não é apenas copiar arquivos; envolve configuração e dependências.']],
['2. Ambientes','Desenvolvimento, homologação/staging e produção podem ter objetivos e configurações diferentes.','dev → staging → produção',['Diferenças excessivas entre ambientes dificultam diagnóstico.']],
['3. Configuração','Variáveis de ambiente, portas, DNS, certificados e acesso ao banco precisam estar corretos.','PORT=8080\nDATABASE_URL=...',['Segredos devem ser fornecidos por mecanismo seguro, não commitados.']],
['4. Rollback','Rollback é voltar para uma versão anterior quando a nova versão apresenta problema e o processo permite.','v1.4 → problema\nrollback → v1.3',['Tenha versões e migrações de banco planejadas.']],
['5. Erros específicos','Porta errada, serviço não iniciado, banco inacessível, DNS apontando errado e variável ausente são comuns.','curl http://localhost:8080/health\n→ testar serviço',['Use health checks e logs para confirmar cada etapa.']]]},
logs:{title:'Logs',sections:[
['1. O que é log','Log é um registro de evento produzido por um sistema para informar o que aconteceu.','INFO servidor iniciado\nERROR conexão recusada',['Logs precisam de contexto para serem úteis.']],
['2. Níveis','Sistemas podem usar níveis como DEBUG, INFO, WARN e ERROR para organizar severidade.','INFO request recebido\nWARN retry\nERROR banco indisponível',['Os níveis não são padronizados perfeitamente entre todas as ferramentas.']],
['3. Contexto','Data/hora, serviço, request ID e mensagem contextual ajudam a relacionar eventos.','2026-09-18T20:00Z\nrequestId=abc123\nERROR timeout',['Sem timestamp correto, correlação de eventos fica difícil.']],
['4. O que não registrar','Senhas, tokens, chaves privadas e dados pessoais desnecessários não devem aparecer em logs.','ERROR login falhou\n# não: senha=123456',['Redija mensagens para diagnóstico sem expor segredos.']],
['5. Erros específicos','Excesso de logs, falta de contexto, horário errado e ausência de retenção adequada dificultam investigação.','grep ERROR app.log\ntail -f app.log',['Use agregação/observabilidade conforme a escala do sistema.']]]},
cloud:{title:'Cloud',sections:[
['1. O que é cloud','Computação em nuvem fornece recursos de computação, armazenamento, rede e serviços por meio de infraestrutura acessível pela rede.','Usuário → Internet → serviço cloud',['Cloud não elimina a necessidade de arquitetura, segurança e controle de custos.']],
['2. IaaS, PaaS e SaaS','IaaS oferece infraestrutura; PaaS abstrai parte da plataforma; SaaS entrega uma aplicação pronta.','VM → IaaS\nplataforma gerenciada → PaaS\napp pronta → SaaS',['Os limites variam conforme o provedor/serviço.']],
['3. Regiões e zonas','Provedores dividem infraestrutura geograficamente em regiões e, em alguns casos, zonas de disponibilidade.','Região A\n├─ zona 1\n└─ zona 2',['Escolha localização considerando latência, disponibilidade e requisitos.']],
['4. IAM','Identity and Access Management controla identidades e permissões para recursos cloud.','role → pode ler bucket\nrole admin → pode administrar',['Princípio do menor privilégio reduz exposição.']],
['5. Erros específicos','Região errada, recurso inexistente, permissão negada, quota excedida e custo inesperado são comuns.','AccessDenied\n→ verificar IAM/policy',['Não conceda admin global apenas para “fazer funcionar”.']]]},
auth:{title:'Segurança — autenticação',sections:[
['1. O que é autenticação','Autenticação verifica a identidade de quem tenta acessar um sistema.','email + senha → servidor → identidade confirmada',['Autenticação responde “quem é você?”.']],
['2. Sessão e token','Após autenticar, o sistema pode usar sessão ou token para reconhecer requisições seguintes.','POST /login\n→ sessão/token\nGET /perfil + credencial',['Proteja armazenamento e transmissão da credencial.']],
['3. MFA','Autenticação multifator combina fatores diferentes, como senha e dispositivo/código.','senha + código de aplicativo',['MFA reduz impacto de senha vazada, mas não elimina todos os riscos.']],
['4. Logout e expiração','Credenciais de sessão devem ter ciclo de vida, expiração e revogação conforme o sistema.','login → token válido\nlogout → sessão invalidada',['Tokens longos sem estratégia de revogação aumentam risco.']],
['5. Erros específicos','Credencial exposta, sessão sem expiração, token em URL e mensagens que revelam se uma conta existe são problemas comuns.','Resposta: “usuário ou senha inválidos”\nvs “senha errada para joao@...”',['Evite vazar detalhes desnecessários sobre autenticação.']]]},
authorization:{title:'Segurança — autorização',sections:[
['1. O que é autorização','Autorização define quais ações uma identidade autenticada pode realizar.','user → ler\neditor → editar\nadmin → administrar',['Autenticação e autorização são etapas diferentes.']],
['2. Roles e permissões','Role agrupa permissões para facilitar administração.','role=editor\npermissions=[read,write]',['Use o mínimo de permissões necessárias.']],
['3. Verificação no servidor','A autorização deve ser verificada no backend, porque o frontend pode ser alterado pelo usuário.','POST /api/admin\n→ backend verifica role antes de executar',['Esconder botão no frontend não é controle de acesso.']],
['4. Acesso a objetos','Mesmo com uma role válida, o sistema deve verificar se o usuário pode acessar aquele recurso específico.','GET /pedidos/123\n→ verificar proprietário/permissão',['Isso evita falhas como acesso a objeto de outro usuário.']],
['5. Erros específicos','Permissão ampla demais, confiar em parâmetro enviado pelo cliente e não verificar propriedade são falhas comuns.','role=admin enviado pelo cliente\n→ nunca deve ser aceito como prova',['Faça testes de autorização com contas e recursos diferentes.']]]},
passwords:{title:'Segurança — senhas',sections:[
['1. Como armazenar','Senhas não devem ser armazenadas em texto puro. Sistemas usam algoritmos específicos de password hashing, com salt e parâmetros de custo.','senha → Argon2/bcrypt/scrypt → hash armazenado',['Hash de senha é diferente de criptografia reversível.']],
['2. Salt','Salt é um valor aleatório associado ao hash que dificulta pré-computação e garante hashes diferentes para senhas iguais.','senha + salt → hash',['O salt não precisa ser secreto, mas deve ser único conforme a estratégia do algoritmo.']],
['3. Algoritmos','Argon2, bcrypt e scrypt são exemplos de funções voltadas para armazenamento de senhas.','hash = argon2(password, salt, parameters)',['Não use MD5/SHA-1 simples como armazenamento de senha.']],
['4. Política e recuperação','Políticas devem evitar senhas óbvias e reutilização; recuperação deve usar fluxo seguro com tokens de uso controlado.','senha → reset token temporário → nova senha',['Nunca envie a senha antiga de volta ao usuário.']],
['5. Erros específicos','Senha em banco/log, hash rápido inadequado, token de reset sem expiração e segredo em código são problemas graves.','logger.info("senha=" + senha)\n// nunca faça isso',['Proteja credenciais em código, logs, banco e sistemas de backup.']]]},
https:{title:'HTTPS',sections:[
['1. HTTP sobre TLS','HTTPS usa TLS para proteger a comunicação HTTP contra leitura e alteração durante o transporte.','Browser ⇄ TLS ⇄ Server\nGET /login',['TLS protege o canal; a aplicação ainda precisa ser segura.']],
['2. Certificado','Certificado associa uma identidade de domínio a uma chave pública e é validado pela cadeia de confiança do cliente.','example.com\ncertificado → chave pública + identidade',['Certificado expirado ou para domínio errado causa alertas.']],
['3. Handshake','TLS negocia parâmetros e estabelece chaves de sessão antes da comunicação protegida da aplicação.','ClientHello → ... → sessão segura',['Detalhes variam conforme versão TLS e configuração.']],
['4. Mixed content','Página HTTPS que tenta carregar recurso HTTP pode criar risco e ser bloqueada pelo navegador em alguns casos.','https://site\n→ http://imagem.png',['Use HTTPS também nos recursos carregados.']],
['5. Erros específicos','Certificado expirado, hostname incompatível, cadeia inválida e protocolo incompatível são falhas comuns.','NET::ERR_CERT_DATE_INVALID',['Veja detalhes do certificado e do domínio antes de desativar verificações de segurança.']]]},
injection:{title:'Segurança — injeção',sections:[
['1. O que é injeção','Injeção ocorre quando entrada não confiável é interpretada como parte de uma linguagem/comando em vez de apenas como dado.','Entrada → aplicação → SQL\nrisco se SQL for montado por concatenação',['A defesa principal depende do contexto e da tecnologia.']],
['2. SQL injection','Concatenar entrada diretamente em SQL permite que dados alterem a estrutura da consulta.','// inseguro: concatenar entrada\nconst query = "SELECT * FROM users WHERE email = " + email;',['Use prepared statements/queries parametrizadas.']],
['3. Comandos e templates','O problema pode aparecer em comandos do sistema, templates e outras linguagens interpretadas.','Comando seguro → API que recebe argumentos separados',['Evite montar comandos com entrada do usuário.']],
['4. Validação x parametrização','Validação ajuda a garantir formato, mas não substitui a separação entre código e dados.','email → validar formato\nSQL → parâmetro',['Não dependa de bloquear palavras como “SELECT” para segurança.']],
['5. Erros específicos','Concatenar strings, confiar em blacklist e executar entrada diretamente são sinais de risco.','query = "..." + userInput\n→ evitar',['Teste somente em ambientes autorizados e use ferramentas defensivas.']]]},
backup:{title:'Backup',sections:[
['1. O que é backup','Backup é uma cópia planejada que permite recuperar dados após perda, corrupção ou incidente.','Dados → backup → armazenamento separado',['Backup só é útil se puder ser restaurado.']],
['2. Tipos','Backups podem ser completos, incrementais ou diferenciais, dependendo da estratégia.','Full → tudo\nIncremental → mudanças desde backup anterior',['Escolha conforme tempo, espaço e recuperação necessários.']],
['3. Regra 3-2-1','Uma estratégia conhecida recomenda múltiplas cópias, mídias diferentes e uma cópia fora do ambiente principal.','3 cópias\n2 tipos de mídia\n1 fora do local',['A estratégia precisa ser adaptada ao risco real.']],
['4. Teste de restauração','Teste de restore confirma que arquivos e procedimentos realmente funcionam.','backup → restore em ambiente de teste → validar',['Backup não testado é uma suposição, não uma garantia.']],
['5. Erros específicos','Único backup no mesmo disco, credencial compartilhada, backup corrompido e ausência de histórico são problemas comuns.','HD principal + backup no mesmo HD\n→ risco de perda conjunta',['Proteja backups contra exclusão acidental e incidentes que atingem o ambiente principal.']]]}
};
// Conteúdos que ainda não possuem um mapa específico recebem uma estrutura de aula
// baseada no assunto real, nunca um único parágrafo genérico.
const extraExpanded={
'html-head':{title:'HTML — head e metadados',sections:[
['1. O papel do head','O elemento head reúne informações que o navegador precisa para interpretar a página e recursos que devem ser carregados. Ele não é o lugar do conteúdo principal que o visitante lê.','<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>EvDev</title>\n</head>',[]],
['2. charset','charset informa a codificação do documento. UTF-8 é a escolha comum para páginas atuais e evita muitos problemas com acentos e caracteres especiais.','<meta charset="UTF-8">',['Se “ç”, “ã” ou outros caracteres aparecem quebrados, verifique a codificação do arquivo e a declaração.']],
['3. viewport','A meta viewport orienta navegadores móveis sobre largura e escala inicial, permitindo que o CSS responsivo seja interpretado como esperado.','<meta name="viewport" content="width=device-width, initial-scale=1.0">',['Sem viewport, uma página pode parecer “miniaturizada” ou ter escala inesperada no celular.']],
['4. title, favicon e CSS','title aparece na aba; favicon é o ícone; link pode carregar CSS e outros recursos.','<title>EvDev</title>\n<link rel="icon" href="favicon.png">\n<link rel="stylesheet" href="styles.css">',['Caminho incorreto faz o recurso não carregar. Confira Network e o caminho relativo ao HTML.']],
['5. Erros específicos','Um head pode estar incompleto, ter caminhos errados ou metas duplicadas. O problema pode aparecer como caracteres quebrados, CSS ausente ou título incorreto.','<link rel="stylesheet" href="css/style.css">\n<!-- confirme se css/style.css existe a partir da pasta do HTML -->',['Use DevTools → Network para verificar se arquivos retornaram 200, 404 ou outro status.']]]},
'html-tags':{title:'HTML — tags essenciais',sections:[
['1. Títulos e parágrafos','h1-h6 representam níveis de títulos e p representa parágrafos. A hierarquia deve descrever a organização do conteúdo.','<h1>Curso de HTML</h1>\n<h2>Tags</h2>\n<p>Aprenda as tags mais usadas.</p>',[]],
['2. Links','a cria links. href informa o destino, que pode ser outra página, arquivo, seção ou endereço externo.','<a href="contato.html">Contato</a>\n<a href="#sobre">Sobre</a>',['Caminho relativo errado é uma das causas mais comuns de link quebrado.']],
['3. Imagens','img usa src para localizar a imagem. alt fornece texto alternativo quando necessário.','<img src="img/logo.png" alt="Logo EvDev">',['Confirme pasta, nome, extensão e maiúsculas/minúsculas.']],
['4. Listas','ul cria lista não ordenada; ol cria lista ordenada; li representa cada item.','<ol>\n  <li>Instalar editor</li>\n  <li>Criar projeto</li>\n</ol>',[]],
['5. Tabelas e containers','table serve para dados tabulares. div e span são containers genéricos e devem ser usados quando não existe elemento mais específico.','<table>\n<tr><th>Produto</th><th>Preço</th></tr>\n<tr><td>Mouse</td><td>50</td></tr>\n</table>',[]],
['6. Erros específicos','Tags mal fechadas, elementos aninhados de forma incorreta, atributo com nome errado e caminhos quebrados podem causar resultados inesperados.','<a href="contato.html">Contato</a>\n<!-- confira se contato.html está no local esperado -->',['Use o inspetor para ver como o navegador montou o DOM.']]]},
'html-semantic':{title:'HTML — semântica',sections:[
['1. O que é semântica','Semântica significa escolher o elemento pelo significado do conteúdo. Isso ajuda pessoas, tecnologias assistivas, mecanismos de busca e outros desenvolvedores a entender a página.','<main>\n  <h1>Curso de HTML</h1>\n</main>',[]],
['2. header e nav','header representa uma área introdutória; nav agrupa links de navegação.','<header><h1>EvDev</h1></header>\n<nav><a href="/cursos">Cursos</a></nav>',[]],
['3. main e section','main representa o conteúdo principal. section agrupa uma parte temática do documento.','<main>\n  <section>\n    <h2>HTML</h2>\n    <p>...</p>\n  </section>\n</main>',['Uma section geralmente deve ter um título que explique seu assunto.']],
['4. article e aside','article representa conteúdo que pode fazer sentido de forma independente; aside representa conteúdo complementar.','<article><h2>Notícia</h2><p>...</p></article>\n<aside>Conteúdo relacionado</aside>',[]],
['5. footer e erro de usar div para tudo','footer representa informações finais de uma página ou seção. Div continua sendo útil, mas não deve substituir elementos semânticos quando eles existem.','<footer><p>© 2026 EvDev</p></footer>',['Não escolha elemento semântico pela aparência. CSS controla aparência; HTML comunica significado.']]]},
'html-forms':{title:'HTML — formulários',sections:[
['1. form, action e method','form agrupa campos. action define o destino e method define como a requisição será feita.','<form action="/cadastro" method="post">\n  ...\n</form>',[]],
['2. label, id e name','label explica o campo. for deve corresponder ao id. name identifica o campo nos dados enviados.','<label for="email">E-mail</label>\n<input id="email" name="email" type="email">',['for e id diferentes impedem a associação correta. Esquecer name pode fazer o valor não participar do envio tradicional.']],
['3. Tipos de input','text, email, password, number, date, checkbox e outros tipos ajudam navegador e usuário a trabalhar com o dado.','<input type="email" name="email">\n<input type="number" name="idade" min="1">',[]],
['4. required e validação','required exige preenchimento no navegador. min, max, minlength, maxlength e pattern podem adicionar regras, mas validação do cliente não substitui validação no servidor.','<input type="email" required>\n<input type="number" min="1" max="100">',['Não confie no HTML para segurança: um cliente pode enviar uma requisição sem passar pela validação visual.']],
['5. Erros específicos','Campo sem label, id/for incompatível, name ausente, type inadequado e validação somente no frontend são erros comuns.','<label for="nome">Nome</label>\n<input id="nome" name="nome" type="text">',['Teste preenchimento, campo vazio, valor inválido e envio real.']]]},
'css-box':{title:'CSS — Box Model',sections:[
['1. Content','Content é a área do conteúdo. No box-sizing padrão, width e height se referem principalmente à área de conteúdo.','.card { width: 300px; }',[]],
['2. Padding','Padding cria espaço entre o conteúdo e a borda.',' .card { padding: 20px; }',['Padding aumenta o espaço interno e pode aumentar o tamanho total quando box-sizing é content-box.']],
['3. Border','Border fica entre padding e margin e pode ter espessura, estilo e cor.','.card { border: 2px solid #1266a8; }',[]],
['4. Margin','Margin cria espaço externo entre a caixa e outros elementos.','.card { margin: 20px auto; }',['Margin não é a mesma coisa que padding: margin separa caixas; padding cria espaço dentro da caixa.']],
['5. box-sizing e erros','border-box faz width/height incluírem padding e border. Erros comuns são calcular largura sem considerar esses valores e criar overflow.','* { box-sizing: border-box; }',['Se uma caixa de 300px fica maior do que 300px, confira box-sizing, padding e border.']]]},
'css-layout':{title:'CSS — layout com Flexbox, Grid e position',sections:[
['1. Flexbox','Flexbox organiza itens principalmente em uma dimensão e é ótimo para menus, barras, grupos de botões e alinhamentos.','.menu { display: flex; gap: 16px; align-items: center; }',[]],
['2. Eixos do Flexbox','justify-content atua no eixo principal; align-items atua no eixo transversal. flex-direction muda qual eixo é principal.','.menu { display: flex; flex-direction: column; align-items: center; }',['Quando mudar row para column, revise sua interpretação de justify/align.']],
['3. Grid','Grid organiza elementos em linhas e colunas e é útil para páginas com cards e estruturas bidimensionais.','.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }',[]],
['4. position','relative mantém o elemento no fluxo e pode criar referência; absolute posiciona em relação a um ancestral posicionado; fixed usa a viewport; sticky depende da rolagem e limites do container.','.card { position: relative; }\n.badge { position: absolute; top: 8px; right: 8px; }',['absolute sem um ancestral de referência pode ir para um contexto diferente do esperado.']],
['5. Erros específicos','Overflow, itens espremidos, alinhamento errado e elementos que “somem” geralmente indicam dimensões rígidas, eixo incorreto ou posicionamento mal definido.','minmax(0, 1fr)\n→ pode ajudar a evitar overflow de conteúdo em grids',['Use DevTools para visualizar o tamanho das caixas e o overlay de Flex/Grid.']]]},
'css-responsive':{title:'CSS — responsividade',sections:[
['1. O que é responsividade','Responsividade é adaptar layout e conteúdo a diferentes larguras, orientações e condições de uso.','@media (max-width: 760px) { .cards { grid-template-columns: 1fr; } }',[]],
['2. Mobile-first','Uma estratégia comum é começar com o layout simples para telas menores e adicionar melhorias para telas maiores.','.cards { grid-template-columns: 1fr; }\n@media (min-width: 900px) { .cards { grid-template-columns: repeat(3,1fr); } }',[]],
['3. Media queries','Media queries aplicam regras quando uma condição, como largura, é atendida.','@media (max-width: 760px) {\n  .sidebar { display: none; }\n}',['Não escolha breakpoints apenas porque um aparelho específico existe; observe quando o conteúdo realmente quebra.']],
['4. Unidades e imagens','rem, %, min(), max(), clamp() e max-width podem ajudar a criar tamanhos flexíveis.','h1 { font-size: clamp(2rem, 5vw, 4rem); }\nimg { max-width: 100%; height: auto; }',[]],
['5. Erros específicos','Scroll horizontal, texto cortado, botões fora da tela e grids estreitos são sinais para investigar largura, overflow, flexibilidade e conteúdo real.','body { overflow-x: hidden; }',['Não use overflow hidden somente para esconder um erro de layout. Encontre primeiro o elemento que está ultrapassando a viewport.']]]},
errors:{title:'Programação — erros e depuração',sections:[
['1. Erro de sintaxe','Acontece quando o código não segue a sintaxe esperada pela linguagem. O programa pode nem iniciar a execução.','const nome = "Ana"\n// em algumas situações, um delimitador/estrutura incorreta causa erro',['Leia a mensagem e a linha indicada; não altere dezenas de linhas ao mesmo tempo.']],
['2. Erro de execução','O código pode ser válido, mas falhar durante a execução, por exemplo ao acessar algo que não existe.','const usuario = null;\nusuario.nome;',['Verifique valores reais e condições antes de acessar propriedades.']],
['3. Erro lógico','O programa roda sem travar, mas produz resultado errado.','function dobro(n) { return n + n + 1; }\n// deveria retornar n * 2',['Crie casos de teste com resultado conhecido.']],
['4. Debugging','Depurar é investigar o estado do programa para descobrir onde o comportamento se desviou do esperado.','console.log({idade, total});\n// breakpoint no DevTools/IDE',['Inspecione valores, fluxo e condições.']],
['5. Erros específicos','Variável com nome digitado errado, índice fora do esperado, tipo incompatível, caminho errado e valor null/undefined são causas frequentes.','console.log(totla);\n// ReferenceError/variável inexistente',['Leia tipo do erro, arquivo e linha; reproduza o problema com o menor exemplo possível.']]]},
privatepublic:{title:'Redes — IP privado x público',sections:[
['1. IP privado','IPv4 possui faixas reservadas para redes privadas: 10.0.0.0/8, 172.16.0.0/12 e 192.168.0.0/16.','192.168.1.10\n10.0.0.5\n172.16.5.20',[]],
['2. IP público','Endereços públicos pertencem ao espaço público de endereçamento e podem ser usados para comunicação roteável na Internet conforme configuração e políticas.','Internet → IP público do serviço',['IP público não significa que toda porta esteja aberta.']],
['3. NAT','NAT traduz endereços/portas entre contextos, sendo comum em redes domésticas para vários dispositivos compartilharem um endereço externo.','192.168.1.10:51500\n→ NAT\n→ 203.0.113.5:40000',['NAT não é sinônimo de firewall nem substitui controles de segurança.']],
['4. Diagnóstico','Compare endereço da interface, gateway e endereço WAN quando investigar conectividade.','Linux: ip addr\nRoteador: endereço WAN',['Um computador pode ter IP privado e acessar a Internet por meio do roteador/NAT.']],
['5. Erros específicos','Confundir 172.x com a faixa privada inteira, esperar acesso direto da Internet a um IP privado ou esquecer NAT/CGNAT são erros comuns.','172.20.1.10 → privado\n172.200.1.10 → não pertence à faixa privada RFC1918',['Verifique o caminho completo: host → gateway → NAT → Internet.']]]},
'server-http':{title:'Servidores — HTTP',sections:[
['1. Requisição e resposta','HTTP organiza uma conversa em mensagens de requisição e resposta entre cliente e servidor.','GET /index.html HTTP/1.1\nHost: exemplo.com',[]],
['2. Métodos','GET consulta; POST envia dados/cria ou inicia processamento; PUT substitui/atualiza conforme contrato; PATCH altera parcialmente; DELETE solicita remoção.','GET /produtos\nPOST /produtos\nPATCH /produtos/10\nDELETE /produtos/10',['Não assuma o significado sem conferir o contrato da API.']],
['3. Headers','Headers carregam metadados como Content-Type, Authorization, Cache-Control e informações do cliente/servidor.','Content-Type: application/json\nAuthorization: Bearer TOKEN',['Não exponha tokens em logs.']],
['4. Body e JSON','Body transporta conteúdo quando necessário, frequentemente JSON em APIs.','POST /usuarios\nContent-Type: application/json\n\n{"nome":"Ana"}',[]],
['5. Erros específicos','400, 401, 403, 404, 409 e 500 representam situações diferentes. Timeout e falha de conexão podem ocorrer antes de existir uma resposta HTTP.','GET /usuarios/999\n→ 404 Not Found',['Use DevTools/cliente HTTP para separar falha de rede de falha HTTP.']]]},
'network-http':{title:'Redes — como um site é acessado',sections:[
['1. DNS','O domínio precisa ser resolvido para informações de rede antes que o cliente encontre o serviço.','www.exemplo.com\n→ DNS → IP',[]],
['2. Roteamento','O host decide se o destino é local ou precisa passar pelo gateway e roteadores.','PC → gateway → roteadores → servidor',['Gateway incorreto pode interromper o caminho.']],
['3. Transporte','TCP ou UDP fornece transporte conforme o protocolo utilizado.','IP → TCP:443 → serviço HTTPS',['HTTP/3 utiliza QUIC sobre UDP, então nem toda Web moderna segue TCP.']],
['4. TLS e HTTP','Em HTTPS, TLS protege a comunicação antes/durante a troca HTTP.','Browser → TLS → HTTP → resposta',[]],
['5. Erros específicos','DNS falhando, timeout, certificado inválido, porta bloqueada, 404 e 500 são problemas de etapas diferentes.','DNS OK → conexão falha → investigar porta/firewall',['Descubra em qual etapa a falha ocorreu antes de mudar configurações.']]]},
'storage':{title:'Mobile — armazenamento local',sections:[
['1. Por que armazenar','Apps precisam guardar preferências, dados offline, cache ou informações estruturadas. O tipo de dado determina a tecnologia adequada.','tema = "dark"\nSQLite → produtos/pedidos',[]],
['2. Preferências simples','Configurações pequenas, como tema ou primeira execução, podem usar armazenamento de preferências.','theme = "dark"\nfirstRun = false',['Não use preferências simples como substituto de um banco quando os dados têm relações complexas.']],
['3. Banco local','SQLite e outras soluções locais servem para dados estruturados e consultas.','CREATE TABLE tarefas (id INTEGER PRIMARY KEY, titulo TEXT);',['Planeje schema e migrações quando o aplicativo evoluir.']],
['4. Segurança','Dados sensíveis exigem armazenamento protegido adequado à plataforma; senha em texto puro no armazenamento local é uma prática insegura.','token sensível → armazenamento seguro da plataforma',['Criptografia e armazenamento seguro não eliminam a necessidade de autenticação no servidor.']],
['5. Erros específicos','Schema desatualizado, chave inexistente, inicialização fora de ordem e leitura antes do banco estar pronto são problemas comuns.','v1 schema → app atualiza → migration → v2 schema',['Teste instalação nova e atualização de uma versão anterior.']]]},
'mobile-api':{title:'Mobile — APIs',sections:[
['1. Requisição','O app chama um endpoint usando método, URL, headers e, quando necessário, body.','GET /api/produtos',[]],
['2. Autenticação','A API pode exigir token/sessão para identificar o usuário.','Authorization: Bearer TOKEN',['Nunca trate um token como texto comum em logs ou repositórios.']],
['3. Parsing','O JSON recebido precisa ser convertido para o modelo que a aplicação usa.','{"id":10,"nome":"Mouse"}\n→ Produto(id:10,nome:"Mouse")',['Campo nulo ou tipo diferente do esperado pode quebrar o parsing.']],
['4. Loading, sucesso e erro','A UI deve representar os diferentes estados da requisição.','loading → request → success/error',[]],
['5. Erros específicos','Timeout, ausência de Internet, URL incorreta, 401/403, 404, 500 e JSON incompatível são cenários diferentes.','401 → autenticação\n404 → recurso\n500 → servidor',['Trate cada causa com uma mensagem adequada.']]]}
};
Object.entries(extraExpanded).forEach(([key,data])=>{expandedLessons[key]=data});
const categoryFallbacks={
programming:['Fundamentos de Programação','Defina o conceito, suas partes e como ele aparece no código.'],
web:['Desenvolvimento Web','Relacione estrutura, apresentação, comportamento e comunicação no navegador.'],
server:['Servidores e Backend','Relacione cliente, requisição, processamento, dependências e resposta.'],
database:['Banco de Dados','Relacione estrutura dos dados, operações SQL, integridade e recuperação.'],
networks:['Redes','Relacione endereço, protocolo, serviço, roteamento e diagnóstico.'],
linux:['Linux e Windows','Relacione sistema, ferramenta, comando/configuração e diagnóstico.'],
mobile:['Mobile','Relacione interface, estado, navegação, dados e ciclo de build.'],
git:['Git e GitHub','Relacione working tree, staging, histórico, remoto e colaboração.'],
cloud:['Cloud e DevOps','Relacione infraestrutura, automação, observabilidade, segurança e entrega.'],
security:['Cibersegurança','Relacione ameaça, controle, implementação e verificação defensiva.'],
computing:['Fundamentos de Computação','Relacione hardware, firmware, sistema operacional, kernel, memória, armazenamento e execução de programas.']
};
function makeExpandedLesson(key,title,category){
 const data=expandedLessons[key];
 if(data) return {title:data.title||title,level:'Iniciante',time:'30 min',lang:['html','web-http','css','javascript','dom','events'].includes(key)?'html':['select','insert','update','delete','joins','tables','keys','indexes','transactions','modeling'].includes(key)?'sql':['terminal','files','permissions','processes','packages','shell','windows','repo','commit','branch','merge','github','conflicts','workflow','docker','images','cicd','deploy'].includes(key)?'shell':'text',intro:`Nesta aula você vai estudar ${data.title||title} por partes, com um exemplo em cada etapa e erros específicos para reconhecer durante a prática.`,sections:data.sections};
 const [area,context]=categoryFallbacks[category]||['TI','Estude o conceito em partes.'];
 return {title,level:'Iniciante',time:'25 min',lang:'text',intro:`${title} faz parte de ${area}. A aula foi organizada para você entender o conceito, identificar seus elementos, ver um exemplo e reconhecer erros específicos.`,sections:[
 ['1. Conceito principal',`${title} é um conceito usado em ${area}. ${context} O objetivo desta primeira parte é definir o termo e situá-lo no conjunto maior.`,`Exemplo relacionado a ${title}:\n${title} → aplicação prática`,['Defina o termo com suas próprias palavras.','Identifique onde ele aparece em um projeto.']],
 ['2. Elementos e partes',`Separe ${title} em suas partes. Procure identificar entradas, saídas, componentes, regras e dependências.`,`Exemplo de partes:\nentrada → ${title} → processamento → saída`,['Não trate o conceito como uma palavra isolada.','Observe quais componentes precisam existir para o exemplo funcionar.']],
 ['3. Funcionamento na prática',`Agora veja a sequência de uso: primeiro a configuração/entrada, depois o processamento e por fim o resultado.`,`${title}\n1. preparar\n2. executar\n3. verificar resultado`,['Faça uma etapa por vez.','Compare o resultado esperado com o resultado real.']],
 ['4. Erros específicos',`Erros em ${title} podem surgir por nome incorreto, configuração ausente, tipo incompatível, permissão, caminho ou ordem de execução, dependendo do contexto.`,`Exemplo de diagnóstico:\ncomando/configuração → mensagem de erro → verificar causa`,['Leia a mensagem completa.','Confira a linha, comando, arquivo ou recurso citado.','Altere uma coisa por vez.']],
 ['5. Exemplo completo',`Este exemplo junta as partes principais de ${title}. Leia cada linha e identifique qual parte do conceito ela representa.`,`// Exemplo de estudo\n// ${title}\n// aplique o conceito em um pequeno projeto`,['Depois do exemplo, use o Laboratório quando a tecnologia for executável nele.']]]};
}

// ===== Aulas detalhadas adicionais: Web, Banco de Dados, GitHub e Legislação =====
expandedLessons.hosting={title:'Web — hospedagem: colocando seu site na internet',sections:[
['1. O que é hospedagem','Hospedagem é o serviço que disponibiliza espaço e recursos em um servidor para que os arquivos e serviços do seu site possam ser acessados pela internet. Em um site simples, isso pode significar publicar HTML, CSS, JavaScript e imagens; em uma aplicação, pode envolver também backend, banco de dados e outros serviços.',`Seu computador
   ↓ upload/deploy
Servidor de hospedagem
   ↓
Site acessível pela internet`,['Hospedagem não é a mesma coisa que domínio.','O tipo de hospedagem depende do que sua aplicação precisa executar.']],
['2. Hospedagem x servidor x site','Um servidor é um computador ou ambiente que fornece recursos; hospedagem é o serviço de disponibilizar esses recursos; o site é o conteúdo/aplicação que será servido. Um mesmo servidor pode hospedar vários sites.',`Servidor
├── site-a.com
├── site-b.com
└── api.site-c.com`,['Não confunda o endereço do site com a máquina que entrega o conteúdo.']],
['3. Hospedagem de site estático','Para HTML, CSS e JavaScript que rodam no navegador, você pode usar serviços de publicação estática. O processo normalmente envolve enviar os arquivos ou conectar um repositório e fazer o deploy.',`index.html
styles.css
app.js
   ↓
deploy
   ↓
site publicado`,['Sites estáticos não precisam necessariamente de um backend próprio.','GitHub Pages é um exemplo de publicação de sites estáticos.']],
['4. Quando existe backend','Se a aplicação precisa executar Python, Java, Node.js ou outra linguagem no servidor, a hospedagem precisa oferecer ambiente compatível. O navegador envia uma requisição, o backend processa e pode consultar o banco.',`Navegador → HTTPS → Backend → Banco
                     ↓
                  resposta`,['Não coloque senhas de banco ou chaves secretas no JavaScript enviado ao navegador.']],
['5. Como publicar um projeto','Um fluxo básico é preparar os arquivos, escolher a hospedagem, configurar o projeto, fazer o deploy e testar pelo endereço fornecido. Depois, configure domínio e HTTPS quando necessário.',`projeto → hospedagem → deploy → teste → domínio → HTTPS`,['O procedimento exato varia conforme o provedor.','Leia a documentação do serviço escolhido antes de configurar DNS ou credenciais.']] ]};
expandedLessons.domain={title:'Web — domínio, DNS e endereço do site',sections:[
['1. O que é um domínio','Domínio é um endereço legível usado para encontrar um serviço na internet, como exemplo.com. Em vez de decorar um endereço IP, o usuário usa um nome mais fácil de lembrar.',`https://www.exemplo.com
        ↑
      domínio`,['O domínio é um endereço; ele não é o conteúdo do site.']],
['2. O que é DNS','DNS é o sistema que relaciona nomes de domínio a informações usadas para localizar serviços na internet. Quando você acessa um domínio, o navegador precisa descobrir para onde enviar a requisição.',`exemplo.com
    ↓ DNS
203.0.113.10
    ↓
servidor web`,['O navegador pode usar cache DNS antes de consultar outros servidores DNS.','Alterações de DNS podem levar algum tempo para serem percebidas por diferentes resolvedores.']],
['3. Domínio, subdomínio e TLD','Um endereço como app.exemplo.com pode ser dividido em subdomínio (app), domínio (exemplo) e TLD (.com). O TLD é a parte final do nome.',`app.exemplo.com
 ↑      ↑      ↑
subdomínio domínio TLD`,['www é frequentemente usado como subdomínio, mas não é obrigatório.']],
['4. Como domínio chega ao servidor','Depois de registrar um domínio, você configura os registros DNS necessários para apontar o nome para a infraestrutura que hospeda o site. Um registro A pode apontar para um IPv4; outros tipos atendem necessidades diferentes.',`domínio
  ↓
DNS → registro → infraestrutura
                    ↓
                  site`,['O tipo de registro depende do serviço e da arquitetura.','Não altere DNS sem saber qual serviço está sendo apontado.']],
['5. Domínio não é hospedagem','Você pode registrar um domínio em um serviço e hospedar o site em outro. O domínio é o endereço; a hospedagem é onde o site/serviço é disponibilizado.',`domínio: exemplo.com
        ↓
   DNS
        ↓
hospedagem/servidor`,['É possível trocar a hospedagem mantendo o domínio, desde que o DNS seja ajustado corretamente.']] ]};
expandedLessons.connection={title:'Banco de Dados — conectando o código ao banco',sections:[
['1. O que significa conectar uma aplicação ao banco','A aplicação não “entra na tabela” diretamente. Ela usa uma biblioteca ou driver para abrir uma conexão com o SGBD, envia comandos SQL, recebe os resultados e fecha ou devolve a conexão ao sistema.',`Aplicação
   ↓ driver/biblioteca
Conexão
   ↓
Banco de dados
   ↓
Resultado`,['O driver depende da linguagem e do banco.','Em aplicações maiores, conexões podem ser reutilizadas por pools.']],
['2. Exemplo com Python e SQLite','Python possui o módulo sqlite3, que permite abrir uma conexão com um arquivo SQLite, criar um cursor, executar SQL e confirmar alterações. O SQLite é útil para aprender porque não exige um servidor separado.',`import sqlite3

conn = sqlite3.connect('app.db')
cur = conn.cursor()
cur.execute('CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY, nome TEXT)')
cur.execute('INSERT INTO usuarios (nome) VALUES (?)', ('Evelyn',))
conn.commit()
conn.close()`,['Use parâmetros (?) em vez de montar SQL com texto recebido do usuário.','Feche a conexão quando terminar ou use o gerenciamento de contexto apropriado.']],
['3. Exemplo com Java e SQLite','Em Java, JDBC fornece uma API para conectar a aplicações a bancos relacionais. Para SQLite, você usa um driver JDBC compatível, adiciona a dependência ao projeto e abre a conexão usando uma URL JDBC.',`import java.sql.Connection;
import java.sql.DriverManager;

String url = "jdbc:sqlite:app.db";
try (Connection conn = DriverManager.getConnection(url)) {
    System.out.println("Conectado!");
}`,['O driver JDBC do SQLite precisa estar disponível no projeto.','DriverManager é uma forma simples de aprender o fluxo; em aplicações maiores, DataSource e pool de conexões são comuns.']],
['4. Exemplo com C e SQLite','Em C, a biblioteca SQLite fornece uma API para abrir o banco e executar comandos. A função sqlite3_open() abre a conexão com o arquivo; depois você pode usar APIs de execução e fechar com sqlite3_close().',`#include <sqlite3.h>

sqlite3 *db = NULL;
int rc = sqlite3_open("app.db", &db);

if (rc != SQLITE_OK) {
    /* tratar erro */
}

sqlite3_close(db);`,['O programa precisa ser compilado e ligado com a biblioteca SQLite.','Sempre trate códigos de erro e libere os recursos utilizados.']],
['5. O fluxo é parecido nas três linguagens','Apesar das APIs diferentes, o raciocínio é o mesmo: configurar o acesso, abrir conexão, executar SQL, ler resultados, tratar erros, confirmar transações quando necessário e liberar recursos.',`Python → sqlite3.connect()
Java   → DriverManager.getConnection()
C      → sqlite3_open()

         ↓
      SQL / resultado
         ↓
      fechar/liberar`,['Aprender esse fluxo facilita a troca de linguagem porque o conceito permanece.']],
['6. Conexão com MySQL ou PostgreSQL','O exemplo com SQLite é local e simples. Em um banco servidor, como MySQL ou PostgreSQL, a aplicação normalmente precisa de host, porta, nome do banco, usuário, senha e um driver específico.',`host: localhost
porta: 3306
banco: loja
usuário: app_user
senha: ********`,['Nunca coloque credenciais reais diretamente no código versionado.','Prefira variáveis de ambiente ou um mecanismo seguro de configuração.']],
['7. Erros comuns','Falhas de conexão podem vir de banco desligado, porta incorreta, credenciais inválidas, driver ausente, caminho errado do arquivo ou falta de permissão.',`Connection refused
Authentication failed
Driver not found
Database locked
Permission denied`,['Leia a mensagem de erro e descubra em qual etapa o problema ocorreu: driver, rede, autenticação, banco ou SQL.']] ]};
expandedLessons.legislation={title:'Segurança — legislação e cuidados para desenvolvedores no Brasil',sections:[
['1. Por que um desenvolvedor precisa conhecer legislação','Código não existe isoladamente. Um sistema pode coletar dados pessoais, armazenar informações, usar conteúdo de terceiros, registrar acessos e disponibilizar serviços na internet. Por isso, decisões técnicas podem ter consequências jurídicas e contratuais.',`formulário → nome + email + telefone
              ↓
        banco de dados
              ↓
        aplicação/serviço`,['Esta aula é educacional e não substitui orientação jurídica.','A obrigação concreta depende do projeto, da organização, do tratamento realizado e das normas aplicáveis.']],
['2. LGPD e dados pessoais','A Lei nº 13.709/2018 (LGPD) regula o tratamento de dados pessoais, inclusive em meios digitais. Para o desenvolvedor, isso significa pensar desde o projeto em finalidade, necessidade, segurança, transparência, acesso e ciclo de vida dos dados.',`Antes de coletar:
→ Que dado é necessário?
→ Para qual finalidade?
→ Quem poderá acessar?
→ Por quanto tempo?
→ Como será protegido?`,['A LGPD prevê princípios como finalidade, adequação, necessidade, transparência, segurança, prevenção e responsabilização.']],
['3. Controlador e operador','A LGPD diferencia controlador e operador. O controlador toma as principais decisões sobre o tratamento; o operador trata dados em nome do controlador e deve seguir suas instruções.',`Controlador
   ↓ instruções/finalidade
Operador
   ↓
tratamento de dados`,['O papel jurídico não é definido simplesmente pelo cargo de “desenvolvedor”; depende das atividades e responsabilidades no tratamento.']],
['4. Cuidados práticos no código','Evite coletar dados sem necessidade, registrar informações sensíveis em logs sem motivo, deixar credenciais no código, compartilhar bancos de produção em ambientes de teste ou dar acesso maior que o necessário.',`NÃO:
senha em texto puro
.env no Git
log com dados sensíveis
acesso administrativo para todos

SIM:
segredos fora do código
menor privilégio
controle de acesso
logs cuidadosos`,['Segurança técnica e conformidade caminham juntas, mas uma não substitui a outra.']],
['5. Marco Civil da Internet','O Marco Civil da Internet (Lei nº 12.965/2014) estabelece princípios, direitos e deveres para o uso da internet no Brasil e trata, entre outros temas, de registros, privacidade e responsabilidade de provedores.',`usuário → aplicação → serviço online
             ↓
       registros e dados
             ↓
       regras aplicáveis`,['A aplicação concreta depende do tipo de serviço e das circunstâncias.','O texto e a regulamentação devem ser consultados na fonte oficial quando houver dúvida.']],
['6. Software, código e direitos autorais','No Brasil, a Lei nº 9.609/1998 trata da proteção da propriedade intelectual de programas de computador. Além disso, conteúdos usados em um projeto podem estar sujeitos a licenças e direitos autorais.',`código próprio → autoria/licença
biblioteca → licença do projeto
imagem → licença/fonte
fonte externa → verificar permissão`,['Não copie código, imagens, textos ou bibliotecas ignorando a licença aplicável.','Leia a licença de dependências antes de usá-las em projetos distribuídos ou comerciais.']],
['7. O que o desenvolvedor deve evitar','Não use dados reais de clientes em testes sem autorização e controles adequados; não exponha credenciais; não contorne mecanismos de segurança sem autorização; não publique informações privadas; e não trate uma biblioteca ou conteúdo de terceiros como se fosse automaticamente livre para qualquer uso.',`dados reais → ambiente de teste
credencial → código público
arquivo privado → repositório público
→ revisar antes de publicar`,['Além da legislação, contratos, políticas internas, termos de uso e licenças podem impor obrigações.']],
['8. Checklist antes de publicar','Antes de colocar um sistema no ar, revise dados coletados, permissões, segredos, logs, dependências, licenças, backups, exposição de endpoints e documentação das responsabilidades.',`☐ dados necessários
☐ acessos revisados
☐ segredos protegidos
☐ logs revisados
☐ dependências/licenças verificadas
☐ backup e recuperação
☐ documentação`,['Quando o projeto envolver dados pessoais ou risco relevante, envolva a pessoa ou área responsável por privacidade/jurídico da organização.']] ]};

// ===== Aulas detalhadas de Git e Sistemas Operacionais =====
expandedLessons.identity={title:'Git — identidade global e local',sections:[
['1. Git não cria uma conta','Antes de trabalhar com Git, é importante separar duas ideias: sua conta do GitHub é uma conta online; a configuração do Git identifica quem aparece como autor dos seus commits. O Git usa user.name e user.email para registrar essa identidade.',`git config --global user.name "Seu Nome"\ngit config --global user.email "seu-email@exemplo.com"`,['user.name é o nome associado aos commits.','user.email é o endereço associado aos commits.','Isso não cria uma conta no GitHub e não substitui a autenticação para fazer push.']],
['2. Configuração global','A configuração global vale como padrão para todos os repositórios do computador. É a opção mais prática quando você usa a mesma identidade na maioria dos projetos.',`git config --global user.name "Evelyn Oliveira"\ngit config --global user.email "seu-email@exemplo.com"\n\ngit config --global user.name\ngit config --global user.email`,['Use --global quando quiser definir um padrão para o computador.','Você pode consultar os valores antes de começar um projeto.']],
['3. Configuração local','A configuração local vale somente para o repositório atual e sobrescreve a configuração global nesse projeto. Isso é útil, por exemplo, quando um projeto de trabalho precisa usar outro email.',`cd meu-projeto\ngit config user.name "Seu Nome"\ngit config user.email "trabalho@empresa.com"\n\ngit config user.email`,['Sem --global, a configuração é local.','A configuração local tem prioridade sobre a global naquele repositório.']],
['4. Qual email usar com GitHub?','Para que os commits sejam associados à sua conta do GitHub, o email configurado no Git precisa estar associado à conta do GitHub. Você pode usar um email verificado ou o endereço noreply fornecido pelo GitHub, conforme sua preferência de privacidade.',`git config --global user.email "seu-email-do-github@exemplo.com"\n\ngit config user.email`,['Não é obrigatório expor seu email pessoal: o GitHub oferece endereços noreply.','Se o email do commit não estiver associado à conta, a atribuição ao seu perfil pode não acontecer como esperado.']],
['5. Conferindo tudo antes do primeiro commit','Antes de commitar, confira nome, email e o estado do repositório. Isso evita descobrir depois que os commits foram registrados com uma identidade diferente.',`git config --list --show-origin\ngit config user.name\ngit config user.email\ngit status`,['Leia a origem da configuração quando houver dúvida entre global e local.','Se o projeto tiver uma regra própria, siga a identidade definida para ele.']],
['6. Erros específicos','Um erro comum é configurar user.name achando que ele precisa ser o mesmo nome de usuário do GitHub. Outro é usar um email que não está associado à conta do GitHub.',`git config user.name\ngit config user.email\ngit remote -v`,['user.name do Git não é o mesmo que o username da conta do GitHub.','Remote define para onde o repositório envia/busca dados; ele não define a identidade do commit.']]]};
expandedLessons.log={title:'Git — histórico, diff e investigação',sections:[
['1. Ver o histórico','O histórico mostra os commits registrados e ajuda a entender como o projeto chegou ao estado atual.',`git log\ngit log --oneline\ngit log --oneline --graph --decorate`,['Comece com --oneline quando quiser uma visão compacta.']],
['2. Ver o que mudou','git diff mostra alterações ainda não registradas no staging; git diff --cached mostra o que está preparado para o próximo commit.',`git diff\ngit diff --cached`,['Use diff antes do commit para revisar exatamente o que será registrado.']],
['3. Investigar um commit','git show permite examinar um commit específico, incluindo arquivos e alterações associadas.',`git show <hash>`,['O hash identifica um commit. Você pode usar a forma curta quando ela for suficiente para identificar o commit.']],
['4. Comparar branches','Comparar branches ajuda a descobrir o que existe em uma linha de desenvolvimento e não em outra.',`git diff main..feature/login`,['Confira os nomes das branches antes de comparar.']],
['5. Erros específicos','Um erro frequente é olhar apenas o estado atual e ignorar o histórico. Outro é interpretar qualquer diferença como erro.',`git status\ngit diff\ngit log --oneline --graph`,['Use status para o presente, diff para alterações e log/show para o histórico.']]]};
expandedLessons.remote={title:'Git — repositório remoto e origin',sections:[
['1. Local x remoto','O repositório local fica no seu computador. O remoto é outro repositório acessível pela rede, como um repositório hospedado no GitHub.',`git status\ngit remote -v`,['Um commit pode existir apenas localmente até ser enviado ao remoto.']],
['2. Adicionar origin','origin é apenas um nome convencional para o remoto principal. Você pode escolher outro nome, mas origin é o padrão mais comum.',`git remote add origin https://github.com/usuario/projeto.git\ngit remote -v`,['Confira a URL antes de fazer push.']],
['3. Alterar o remoto','Se o endereço estiver errado, você pode alterá-lo sem recriar o histórico local.',`git remote set-url origin https://github.com/usuario/projeto.git\ngit remote -v`,['Verifique se a URL aponta para o projeto correto.']],
['4. Autenticação','Ter o remote configurado não significa estar autenticado. GitHub pode usar HTTPS com credenciais/gerenciador ou SSH, conforme a configuração.',`git remote -v\n# depois autentique conforme o método escolhido`,['Nunca coloque senha ou token diretamente em um arquivo do projeto.']],
['5. Erros específicos','Remote incorreto, acesso negado, branch protegida e histórico divergente são problemas diferentes.',`git remote -v\ngit fetch origin\ngit status`,['Leia a mensagem do Git antes de tentar comandos destrutivos.']]]};
expandedLessons.clone={title:'Git — clone: começando a partir de um projeto existente',sections:[
['1. O que git clone faz','git clone copia um repositório remoto para uma nova pasta e já configura a referência ao remoto.',`git clone https://github.com/usuario/projeto.git\ncd projeto`,['Clone é usado quando o projeto já existe em um remoto.']],
['2. Conferir o projeto clonado','Depois do clone, confira a branch, o status e o remote.',`git status\ngit branch --show-current\ngit remote -v`,['Faça essa conferência antes de começar a alterar arquivos.']],
['3. Primeiro trabalho','A partir do clone, crie uma branch para sua tarefa, faça alterações e registre commits.',`git switch -c feature/minha-tarefa\ngit add .\ngit commit -m "Adiciona minha tarefa"`,['Evite trabalhar diretamente na branch principal quando o fluxo do projeto usar branches.']],
['4. Enviar a branch','Depois do commit, envie a branch para o remoto quando precisar compartilhá-la ou abrir um Pull Request.',`git push -u origin feature/minha-tarefa`,['O -u cria o vínculo entre a branch local e a remota.']],
['5. Erros específicos','Clonar o projeto errado, não ter permissão ou começar a trabalhar em uma branch desatualizada são problemas comuns.',`git remote -v\ngit status\ngit branch -a`,['Confira o projeto e a branch antes de executar alterações importantes.']]]};
expandedLessons['push-pull']={title:'Git — push e pull sem confusão',sections:[
['1. Push','push envia commits locais para um repositório remoto. Ele não cria o commit: o commit já precisa existir localmente.',`git add .\ngit commit -m "Atualiza cadastro"\ngit push`,['Commit registra; push envia.']],
['2. Pull','pull busca alterações do remoto e integra essas alterações à sua branch local conforme a estratégia configurada.',`git pull`,['Pull pode gerar conflitos ou exigir que você resolva divergências.']],
['3. Fetch','fetch busca informações do remoto sem integrar automaticamente as mudanças na sua branch de trabalho.',`git fetch origin\ngit log --oneline --all`,['Fetch é útil quando você quer inspecionar primeiro o que mudou.']],
['4. Um fluxo simples','Antes de começar, atualize sua base; depois faça sua tarefa, commit e push.',`git switch main\ngit pull\ngit switch -c feature/busca\n# editar arquivos\ngit add .\ngit commit -m "Adiciona busca"\ngit push -u origin feature/busca`,['O fluxo exato depende das regras do projeto.']],
['5. Erros específicos','Push rejeitado pode indicar que o remoto tem commits que você ainda não integrou, branch protegida ou falta de permissão.',`git fetch origin\ngit status\ngit log --oneline --decorate --graph --all`,['Não use force push automaticamente para “resolver” um push rejeitado.']]]};
expandedLessons.gitignore={title:'Git — .gitignore e arquivos que não devem entrar no repositório',sections:[
['1. O que é .gitignore','.gitignore informa ao Git quais arquivos e pastas devem ser ignorados. É muito usado para dependências, builds, arquivos temporários e segredos locais.',`.env\nnode_modules/\ndist/\n*.log`,['As regras dependem da estrutura e da tecnologia do projeto.']],
['2. Por que não colocar .env?','Arquivos de ambiente podem conter senhas, tokens e chaves. Ignorá-los ajuda a evitar que sejam adicionados por acidente.',`# .gitignore\n.env\n.env.*`,['Ignorar não substitui cuidado: um segredo já commitado pode continuar no histórico.']],
['3. Conferir antes do commit','Use git status e, quando necessário, git check-ignore para descobrir por que um arquivo está sendo ignorado.',`git status\ngit check-ignore -v .env`,['Entenda a regra que está ignorando o arquivo antes de alterar o .gitignore.']],
['4. Erros específicos','Um arquivo já rastreado pelo Git não deixa de ser rastreado simplesmente porque você adicionou seu nome ao .gitignore.',`git rm --cached .env\ngit commit -m "Remove arquivo de ambiente do rastreamento"`,['Se um segredo já foi exposto, trate a credencial como comprometida e faça a rotação apropriada.']]]};
expandedLessons.undo={title:'Git — como desfazer alterações com segurança',sections:[
['1. restore','git restore pode descartar alterações no working tree ou retirar arquivos do staging, dependendo da opção usada.',`git restore arquivo.js\ngit restore --staged arquivo.js`,['Cuidado: restaurar o arquivo pode apagar alterações locais não commitadas.']],
['2. revert','git revert cria um novo commit que desfaz o efeito de outro commit. É uma opção útil quando o histórico já foi compartilhado.',`git revert <hash>`,['Revert preserva o histórico e registra a reversão.']],
['3. reset','git reset move a referência de branch e pode alterar o staging/working tree conforme o modo. É uma ferramenta poderosa e exige cuidado.',`git reset --soft HEAD~1`,['Evite usar reset sem entender o efeito no histórico local.']],
['4. Como escolher','Se a mudança ainda não foi commitada, pense primeiro em restore. Se já foi compartilhada, revert costuma ser mais seguro. Reset é mais apropriado em situações controladas no histórico local.',`working tree → restore\ncommit compartilhado → revert\nhistórico local → reset`,['O contexto do projeto importa; nunca use um comando destrutivo apenas porque “funciona”.']]]};
expandedLessons['install-linux']={title:'Sistemas Operacionais — como instalar Linux com segurança',sections:[
['1. Antes de começar','Instalar um sistema operacional pode alterar ou apagar dados do disco. Faça backup dos arquivos importantes e confirme qual disco será usado.',`Backup → conferir disco → baixar ISO oficial → criar USB → Live → instalar`,['Nunca escolha “apagar disco” sem confirmar o disco e o backup.','Se houver criptografia, BitLocker ou dual boot, leia a documentação da distribuição antes de alterar o sistema.']],
['2. Baixar a ISO oficial','Baixe a imagem somente do site oficial da distribuição escolhida. A ISO é o arquivo usado para criar a mídia de instalação.',`Zorin OS → ISO oficial\nPop!_OS → ISO oficial`,['Não baixe ISO modificada de sites aleatórios.','Quando a distribuição oferecer checksum/assinatura, use a verificação.']],
['3. Criar o pendrive bootável','Você não deve apenas copiar a ISO para o pendrive. É necessário gravar a imagem como mídia inicializável usando uma ferramenta apropriada.',`Windows → Rufus ou balenaEtcher\nLinux → balenaEtcher, Popsicle ou ferramenta equivalente`,['A gravação normalmente apaga o conteúdo do pendrive escolhido.','Confirme a unidade selecionada antes de iniciar a gravação.']],
['4. Iniciar pelo USB','Reinicie o computador e abra o Boot Menu/UEFI para selecionar o pendrive. A tecla varia conforme fabricante e modelo.',`PC ligado → tecla do Boot Menu → selecionar USB → Enter`,['Não existe uma única tecla universal: consulte o manual do equipamento.']],
['5. Testar no modo Live','Quando a distribuição oferecer Live USB, teste Wi-Fi, áudio, teclado, vídeo e armazenamento antes de instalar. Isso reduz surpresas de compatibilidade.',`USB → Live → testar hardware → instalar ou reiniciar`,['O sistema rodando pelo USB pode ser mais lento que o sistema instalado.']],
['6. Instalação e particionamento','O instalador normalmente oferece uma opção de instalação automática e, em alguns casos, particionamento manual. Para iniciantes, a instalação automática é mais simples, mas precisa ser conferida antes de confirmar.',`Windows + Linux → verificar espaço/dual boot\nLinux sozinho → confirmar disco de destino`,['Particionamento manual exige entender EFI, partições e pontos de montagem.','Se você não sabe qual partição é qual, pare e confirme antes de continuar.']],
['7. Pós-instalação','Depois de instalar, reinicie sem o pendrive, conclua o primeiro acesso, atualize o sistema e confira drivers, rede, áudio e vídeo.',`sudo apt update\nsudo apt upgrade`,['O gerenciador de pacotes muda conforme a distribuição.','Não copie comandos de outra distribuição sem conferir qual sistema está instalado.']]]};
expandedLessons.distros={title:'Sistemas Operacionais — distros Linux para quem está começando',sections:[
['1. O que é uma distribuição','Linux é o kernel. Uma distribuição combina o kernel com ferramentas, bibliotecas, gerenciador de pacotes, instalador, atualizações e outros componentes.',`Distribuição = kernel + ferramentas + pacotes + configurações + ambiente`,['Duas distribuições podem usar o mesmo kernel e ainda ter interfaces e ferramentas diferentes.']],
['2. Zorin OS','Zorin OS é uma distribuição voltada a uma experiência familiar para quem vem do Windows. É uma opção interessante para estudar Linux com uma interface gráfica amigável.',`Zorin OS\n→ interface familiar\n→ aplicativos gráficos\n→ terminal disponível`,['Confira os requisitos e a edição escolhida na documentação oficial antes de instalar.']],
['3. Pop!_OS','Pop!_OS é uma distribuição baseada em Ubuntu e mantida pela System76. A documentação oficial atual descreve a instalação por ISO e USB e oferece imagens específicas para diferentes cenários de hardware.',`Pop!_OS\n→ ISO\n→ USB bootável\n→ Live\n→ instalação`,['A documentação atual do Pop!_OS informa requisitos de 4 GB de RAM e 20 GB de armazenamento como referência mínima.','Em computadores com NVIDIA, escolha a imagem apropriada conforme a documentação.']],
['4. Como escolher','Não existe uma única distribuição “melhor” para todo iniciante. Considere familiaridade com a interface, hardware, documentação, suporte da comunidade e objetivo de estudo.',`Quero algo familiar → Zorin OS\nQuero experimentar um desktop moderno → Pop!_OS\nQuero aprender administração mais profundamente → estudar outras famílias depois`,['Começar por uma distribuição amigável não impede aprender terminal e administração.']],
['5. O que estudar depois','Depois de instalar uma distribuição, avance para terminal, arquivos, permissões, pacotes, processos, serviços, rede e segurança.',`terminal → arquivos → permissões → pacotes → processos → serviços`,['A distribuição é o ambiente; os conceitos de sistema operacional são mais amplos que uma única distro.']]]};
expandedLessons['usb-safety']={title:'Sistemas Operacionais — pendrive bootável, ferramentas e cuidados',sections:[
['1. Ferramentas para criar o USB','Ferramentas populares incluem Rufus e balenaEtcher no Windows; no Linux, Popsicle e outras ferramentas de gravação de imagem também podem ser usadas.',`ISO + ferramenta → selecionar USB → gravar imagem → verificar`,['Zorin recomenda balenaEtcher e também lista USBImager, Rufus, Popsicle e EtchDroid como alternativas.']],
['2. Não confunda copiar com gravar','Arrastar o arquivo .iso para dentro do pendrive não é a mesma coisa que gravar a imagem. A ferramenta escreve a estrutura necessária para inicialização.',`ERRADO: copiar Linux.iso para o USB\nCERTO: usar uma ferramenta de gravação de imagem`,['A unidade escolhida será normalmente sobrescrita.']],
['3. Cuidado com pendrive falso','Um pendrive falsificado pode informar uma capacidade maior do que a memória física real. Quando muitos dados são gravados, arquivos podem ser corrompidos ou sobrescritos.',`USB anunciado: 128 GB\ncapacidade real: muito menor\n→ dados podem ser perdidos`,['Compre de vendedores confiáveis.','Teste a capacidade real de uma unidade suspeita antes de guardar arquivos importantes.','Ferramentas como H2testw (Windows) e F3 (Linux/macOS) podem testar a capacidade anunciada.']],
['4. Verifique a ISO','Uma ISO corrompida pode causar erros na instalação. Quando o projeto fornece checksum, compare o hash do arquivo baixado com o valor oficial.',`Windows: certutil -hashfile arquivo.iso SHA256\nLinux: sha256sum arquivo.iso`,['A comparação deve ser feita com o valor publicado pela fonte oficial.']],
['5. Verifique o pendrive e o alvo','Antes de clicar em Flash/Gravar, confirme o nome, capacidade e letra/unidade do pendrive. Não selecione seu SSD/HD interno por engano.',`ISO: Zorin.iso\nDestino: E:\ (USB)\n→ conferir novamente antes de gravar`,['Esse é um dos passos mais importantes para evitar apagar outro dispositivo.']],
['6. Depois da gravação','Use o Boot Menu para testar a mídia. Se a distribuição oferecer uma verificação do USB, não pule a primeira verificação sem motivo.',`USB → Boot Menu → Live → testar hardware`,['Falha no USB pode vir da ISO corrompida ou do próprio pendrive.']]]};
expandedLessons.windows={title:'Sistemas Operacionais — Windows e PowerShell',sections:[
['1. O que é o Windows','Windows é um sistema operacional com interface gráfica, serviços, drivers, sistema de arquivos e ferramentas administrativas. Para quem estuda TI, vale aprender tanto a interface quanto o terminal.',`Windows\n→ Explorer\n→ Configurações\n→ PowerShell\n→ Gerenciamento do sistema`,['Aprender PowerShell ajuda a automatizar tarefas que seriam repetitivas na interface gráfica.']],
['2. PowerShell','PowerShell é o shell e ambiente de automação moderno do Windows. Ele possui cmdlets para trabalhar com arquivos, processos, serviços e outros recursos.',`Get-Location\nGet-ChildItem\nSet-Location .\\Projetos`,['PowerShell e Prompt de Comando são ferramentas diferentes.']],
['3. Processos e serviços','Você pode consultar processos e serviços pelo PowerShell para entender o que está rodando.',`Get-Process\nGet-Service`,['Não finalize ou desabilite um serviço sem entender sua função.']],
['4. Caminhos e arquivos','Windows usa caminhos como C:\\Users\\Nome\\Projetos. PowerShell permite navegar e manipular esses caminhos.',`Get-ChildItem C:\\Users\\Nome\\Projetos\nNew-Item arquivo.txt -ItemType File`,['Cuidado com caminhos administrativos e arquivos do sistema.']],
['5. Erros específicos','Permissão negada, caminho inexistente, política de execução e comando incorreto são problemas comuns.',`Get-Location\nGet-Command git\nGet-Help Get-Process`,['Leia a mensagem do PowerShell e use Get-Help quando não souber um comando.']]]};
expandedLessons.compare={title:'Sistemas Operacionais — Linux x Windows',sections:[
['1. Estrutura de arquivos','Linux usa uma árvore que começa em /; Windows normalmente organiza volumes com letras como C:.',`Linux: /home/evelyn/projeto\nWindows: C:\\Users\\Evelyn\\projeto`,['Não presuma que um caminho válido no Linux também existe no Windows.']],
['2. Terminal','Linux costuma usar Bash ou Zsh; Windows oferece PowerShell e também o Prompt de Comando.',`Linux → pwd / ls / cd\nWindows PowerShell → Get-Location / Get-ChildItem / Set-Location`,['Os comandos e a sintaxe são diferentes, mas o objetivo de navegar e administrar pode ser semelhante.']],
['3. Software e pacotes','Linux normalmente usa gerenciadores de pacotes da distribuição; Windows combina instaladores, Microsoft Store, winget e outras formas.',`Linux → sudo apt install git\nWindows → winget install Git.Git`,['Sempre confirme a fonte do software e o comando para sua versão/sistema.']],
['4. Permissões e administração','Os dois sistemas têm mecanismos de permissão e elevação, mas os modelos e ferramentas são diferentes.',`Linux → sudo / chmod / chown\nWindows → Executar como administrador / ACLs`,['Não trate “administrador” e “root” como conceitos idênticos; aprenda como cada sistema controla acesso.']],
['5. Qual aprender?','Para desenvolvimento e administração de servidores, é útil conhecer os dois ambientes. A escolha de uso diário depende do software, hardware e objetivo da pessoa.',`Windows + PowerShell\nLinux + Bash/Zsh\n→ ambos fazem parte do repertório de TI`,['Aprender um sistema não impede estudar o outro.']]]};

/* ==========================================================
   TRILHA: FUNDAMENTOS DE COMPUTAÇÃO
   Conteúdo para quem quer entender o computador antes de
   aprofundar programação, sistemas operacionais e redes.
   ========================================================== */
const computerFundamentalsLessons = {
  'computer-basics': {
    title:'Fundamentos — hardware e software',
    sections:[
      ['1. Hardware','Hardware é a parte física do computador: peças e dispositivos que você consegue tocar, como CPU, RAM, SSD, placa-mãe, teclado e monitor.','Computador\n├── CPU\n├── RAM\n├── armazenamento\n└── periféricos', ['Hardware é físico.','Software é formado por programas e instruções.']],
      ['2. Software','Software é o conjunto de programas que orienta o hardware. Sistema operacional, navegador, editor de código e jogos são exemplos de software.','Hardware → executa instruções → Software',['Um programa precisa de recursos do hardware para executar.']],
      ['3. Como as camadas se relacionam','Uma aplicação normalmente não conversa diretamente com cada componente físico. Ela passa por camadas do sistema operacional, drivers e kernel.','Aplicação\n↓\nSistema operacional\n↓\nDrivers / Kernel\n↓\nHardware',['Essa divisão facilita o uso do hardware por diferentes programas.']],
      ['4. Exemplo prático','Ao abrir um editor, o sistema usa CPU para processar instruções, RAM para manter dados em uso e armazenamento para guardar arquivos.','Editor de código\n→ CPU + RAM\n→ arquivo salvo no SSD',['Quando o programa fecha, o que estava somente na RAM pode ser perdido se não tiver sido salvo.']]
    ]
  },
  cpu: {
    title:'CPU — processador, núcleos e threads',
    sections:[
      ['1. O que a CPU faz','A CPU executa instruções dos programas. Ela realiza operações, compara valores, movimenta dados e coordena várias etapas da execução.','Programa → instruções → CPU → resultado',['CPU não é sinônimo de computador inteiro. É um dos principais componentes.']],
      ['2. Núcleos','Um núcleo é uma unidade capaz de executar trabalho. Uma CPU pode ter vários núcleos, permitindo executar diferentes tarefas de forma concorrente.','CPU\n├── Núcleo 1\n├── Núcleo 2\n├── Núcleo 3\n└── Núcleo 4',['Mais núcleos não significam automaticamente que qualquer programa ficará quatro vezes mais rápido.']],
      ['3. Threads','Threads representam fluxos de execução que o sistema pode agendar. Dependendo do processador, um núcleo pode lidar com mais de uma thread lógica.','Processo\n├── thread A\n└── thread B',['Threads ajudam na concorrência, mas continuam compartilhando recursos do processador.']],
      ['4. Frequência','GHz indica uma frequência de operação, mas não deve ser usada sozinha para comparar processadores. Arquitetura, cache, núcleos e tipo de carga também importam.','2.5 GHz ≠ automaticamente melhor ou pior que 3.0 GHz',['Compare processadores dentro do contexto da tarefa.']]
    ]
  },
  ram: {
    title:'Memória RAM — onde os programas trabalham',
    sections:[
      ['1. O que é RAM','RAM é uma memória de trabalho usada para manter dados e instruções que estão sendo utilizados pelo sistema e pelos programas.','SSD → carrega dados → RAM → CPU',['RAM é volátil: seu conteúdo normalmente não permanece após desligar o computador.']],
      ['2. RAM x armazenamento','SSD e HDD guardam dados de forma persistente; RAM é usada durante a execução. Um arquivo pode estar no SSD e ser carregado para a RAM quando um programa precisa dele.','Arquivo no SSD\n↓\nprograma abre\n↓\ndados na RAM',['Ter muito armazenamento não substitui ter RAM suficiente.']],
      ['3. Quando falta RAM','Quando a memória disponível fica baixa, o sistema pode usar armazenamento como memória virtual, o que é muito mais lento que RAM física.','RAM cheia\n↓\nmemória virtual\n↓\nmais acesso ao armazenamento',['Fechar programas pesados pode liberar memória.']],
      ['4. Exemplo','Um navegador com várias abas pode consumir bastante RAM porque mantém processos e dados ativos para responder rapidamente.','Navegador\n├── aba 1\n├── aba 2\n└── extensões',['O consumo depende do aplicativo e do que está sendo executado.']]
    ]
  },
  storage: {
    title:'SSD, HDD e armazenamento',
    sections:[
      ['1. O que é armazenamento','Armazenamento persistente guarda arquivos mesmo depois de desligar o computador. SSD e HDD são exemplos comuns.','SSD/HDD → arquivos, programas, sistema operacional',['Armazenamento é diferente de RAM.']],
      ['2. HDD','HDD usa discos magnéticos e partes mecânicas. É comum em capacidades maiores e pode oferecer bom custo por capacidade, mas tende a ter maior latência que SSD.','HDD\n→ pratos magnéticos\n→ leitura/escrita mecânica',['Movimentos físicos tornam o acesso mais lento que em SSDs.']],
      ['3. SSD','SSD usa memória flash e não possui pratos girando como um HDD. Em geral oferece menor latência e respostas mais rápidas para o sistema.','SSD\n→ memória flash\n→ controlador',['SSD também tem vida útil e características próprias; não é “memória infinita”.']],
      ['4. Espaço x velocidade','Capacidade informa quanto cabe; desempenho envolve latência, taxa de transferência e outras características.','500 GB = capacidade\nleitura/escrita = desempenho',['Não confunda capacidade com velocidade.']]
    ]
  },
  motherboard: {
    title:'Placa-mãe e barramentos',
    sections:[
      ['1. O que é a placa-mãe','A placa-mãe conecta componentes e fornece caminhos elétricos e interfaces para que eles se comuniquem.','CPU ↔ RAM ↔ armazenamento\n      ↕\n    chipset / interfaces',['Ela não é apenas uma “placa que segura as peças”; participa da comunicação entre componentes.']],
      ['2. Soquete e memória','A CPU precisa ser compatível com o soquete da placa-mãe. A memória também depende do padrão suportado, como DDR4 ou DDR5.','CPU → soquete compatível\nRAM → padrão compatível',['Sempre confira compatibilidade antes de comprar componentes.']],
      ['3. Barramentos e interfaces','Interfaces definem como componentes e periféricos trocam dados, como PCIe, SATA, USB e outras conexões.','GPU → PCIe\nSSD SATA → SATA\nperiférico → USB',['Cada interface possui limites e características diferentes.']],
      ['4. Formatos','Placas-mãe possuem formatos físicos, como ATX e microATX, que influenciam gabinete e expansão.','ATX → gabinete compatível\nmicroATX → gabinete compatível',['O formato deve ser compatível com o gabinete e com a montagem planejada.']]
    ]
  },
  gpu: {
    title:'GPU — processamento gráfico',
    sections:[
      ['1. O que é GPU','GPU é um processador especializado em operações altamente paralelizáveis, sendo muito usado para gráficos e também em cargas de computação específicas.','Aplicação 3D → comandos → GPU → imagem',['GPU não serve apenas para jogos.']],
      ['2. GPU integrada x dedicada','GPU integrada compartilha recursos com a plataforma; uma GPU dedicada possui seu próprio hardware e normalmente sua própria memória de vídeo.','CPU + GPU integrada\nversus\nCPU + GPU dedicada',['A escolha depende do tipo de trabalho e do orçamento.']],
      ['3. VRAM','VRAM é a memória usada pela GPU para dados gráficos e outras informações relacionadas ao processamento.','Texturas + buffers → VRAM',['Mais VRAM não garante sozinho maior desempenho.']],
      ['4. Desenvolvimento','GPU pode ser relevante para jogos, edição, modelagem 3D, computação paralela e algumas cargas de IA.','Uso leve → integrada pode bastar\n3D pesado → GPU dedicada pode ajudar',[]]
    ]
  },
  psu: {
    title:'Fonte de alimentação — energia do computador',
    sections:[
      ['1. Função da fonte','A fonte de alimentação converte a energia da tomada para tensões adequadas aos componentes do computador.','Tomada → fonte → tensões → componentes',['A fonte é parte importante da estabilidade do sistema.']],
      ['2. Potência','A potência em watts indica quanto a fonte consegue fornecer dentro de suas especificações. O sistema deve ser dimensionado considerando o consumo dos componentes.','CPU + GPU + discos + fans\n→ consumo total',['Não escolha uma fonte apenas pelo número de watts; qualidade e especificações também importam.']],
      ['3. Conectores','CPU, placa-mãe, GPU e discos podem usar conectores diferentes. A montagem deve respeitar os conectores e limites corretos.','24-pin → placa-mãe\nEPS → CPU\nPCIe → GPU',['Nunca force um conector em uma entrada incompatível.']],
      ['4. Cuidados','Energia elétrica exige cuidado. Não abra a fonte nem faça alterações internas sem conhecimento técnico adequado.','Instalação → computador desligado → conexões corretas',['Em caso de dúvida, procure assistência qualificada.']]
    ]
  },
  firmware: {
    title:'Firmware, BIOS e UEFI',
    sections:[
      ['1. O que é firmware','Firmware é software gravado para controlar ou inicializar um dispositivo em um nível próximo ao hardware.','Firmware\n↓\nhardware',['Ele não é igual a um aplicativo comum instalado pelo usuário.']],
      ['2. BIOS e UEFI','BIOS é o firmware tradicional de inicialização de PCs. UEFI é o padrão moderno que substituiu a BIOS tradicional em muitos computadores e oferece recursos mais avançados.','Ligar → firmware → localizar boot → iniciar sistema',['No uso cotidiano, é comum chamar a interface de configuração de “BIOS” mesmo quando o computador usa UEFI.']],
      ['3. Configurações','O firmware pode permitir configurar ordem de boot, relógio, dispositivos e recursos de hardware.','Boot Menu → escolher SSD/USB',['Alterações incorretas podem impedir a inicialização.']],
      ['4. Atualização','Atualizações de firmware podem corrigir problemas ou adicionar suporte, mas devem seguir exatamente as instruções do fabricante.','Arquivo correto → método oficial → atualização → reinicialização',['Não interrompa uma atualização de firmware sem orientação do fabricante.']]
    ]
  },
  boot: {
    title:'Boot — do botão de ligar ao sistema operacional',
    sections:[
      ['1. O início','Ao ligar o computador, o firmware inicializa e verifica recursos básicos antes de procurar um dispositivo de inicialização.','Botão → firmware → hardware básico',['Essa etapa acontece antes de o sistema operacional assumir o controle.']],
      ['2. Encontrando o sistema','O firmware segue a configuração de boot para encontrar um dispositivo ou carregador de inicialização.','UEFI → SSD/USB → bootloader',['A ordem de boot explica por que um pendrive pode iniciar antes do SSD.']],
      ['3. Bootloader','O bootloader participa do carregamento do sistema operacional. Em muitos sistemas Linux, o GRUB é um exemplo conhecido.','Firmware → bootloader → kernel → sistema operacional',['Bootloader e kernel são componentes diferentes.']],
      ['4. Depois do kernel','O kernel assume o controle do hardware e inicia componentes necessários para disponibilizar o sistema ao usuário.','bootloader → kernel → serviços → login',['A sequência exata varia entre sistemas operacionais.']]
    ]
  },
  kernel: {
    title:'Kernel — o núcleo do sistema operacional',
    sections:[
      ['1. O que é kernel','Kernel é a parte central do sistema operacional responsável por intermediar o acesso a recursos do hardware e oferecer serviços fundamentais para os programas.','Aplicação\n↓\nsistema operacional / kernel\n↓\nhardware',['O kernel não é o sistema operacional inteiro. É um componente central dele.']],
      ['2. Processos e memória','O kernel ajuda a gerenciar processos, memória, dispositivos e outras tarefas fundamentais.','Programa → processo\nKernel → agenda + memória + recursos',['Um processo não recebe acesso irrestrito ao hardware.']],
      ['3. Drivers','Drivers permitem que o sistema operacional saiba como trabalhar com determinados dispositivos. Em muitos sistemas, o kernel participa diretamente dessa comunicação.','Aplicação → SO → driver → dispositivo',['Um problema de driver pode afetar rede, áudio, vídeo ou outros dispositivos.']],
      ['4. System calls','Programas normalmente usam interfaces do sistema operacional para pedir serviços, como abrir arquivos ou criar processos.','Aplicação → system call → kernel → recurso',['Isso cria uma fronteira entre aplicação e operações privilegiadas.']]
    ]
  },
  'system-image': {
    title:'Imagem do sistema — o que significa?',
    sections:[
      ['1. O conceito','Uma imagem de sistema é uma cópia estruturada de um sistema, disco ou conjunto de dados preparada para restauração, clonagem ou instalação, dependendo da ferramenta.','Sistema instalado\n↓\nimagem\n↓\nrestauração / implantação',['“Imagem” pode ter significados diferentes conforme a ferramenta e o contexto.']],
      ['2. ISO x imagem de disco','Uma ISO é uma imagem de um sistema de arquivos de mídia óptica e é muito usada para distribuir instaladores. Uma imagem de disco pode representar um disco ou partições para clonagem/restauração.','ISO → mídia de instalação\nImagem de disco → cópia para restauração/clonagem',['Não trate toda ISO como se fosse automaticamente um backup completo do seu SSD.']],
      ['3. Exemplo prático','Uma distribuição Linux pode ser distribuída como ISO. Você grava essa ISO em um pendrive e inicializa o computador por ela para testar ou instalar o sistema.','ISO → pendrive bootável → Live USB → instalação',['Baixe imagens de fontes oficiais e, quando disponível, confira o checksum.']],
      ['4. Backup e restauração','Imagens também podem fazer parte de estratégias de recuperação. O conteúdo restaurado depende do tipo de imagem e da ferramenta usada.','Backup → imagem → armazenamento seguro → restauração',['Backup não deve ficar somente no mesmo disco que pode falhar.']]
    ]
  },
  drivers: {
    title:'Drivers — fazendo o sistema conversar com o hardware',
    sections:[
      ['1. O que é driver','Driver é software que permite ao sistema operacional trabalhar com um dispositivo específico, traduzindo operações do sistema para o funcionamento daquele hardware.','Sistema operacional → driver → dispositivo',['Um driver não é o hardware; é a camada de software que ajuda a controlá-lo.']],
      ['2. Exemplos','Placa de vídeo, Wi-Fi, áudio, impressora e chipset podem depender de drivers apropriados.','Windows/Linux → driver → Wi-Fi\nWindows/Linux → driver → GPU',['Alguns drivers são genéricos; outros são fornecidos pelo fabricante.']],
      ['3. Problemas comuns','Driver ausente, incompatível ou desatualizado pode causar dispositivo não reconhecido, baixo desempenho ou comportamento incorreto.','Dispositivo não funciona\n→ verificar identificação\n→ driver\n→ logs',['Não baixe drivers de sites desconhecidos.']],
      ['4. Atualizar com segurança','Prefira Windows Update, gerenciadores da distribuição Linux ou páginas oficiais do fabricante quando for necessário instalar manualmente.','Fonte oficial → versão correta → instalação → teste',['Crie um ponto de restauração ou mantenha um plano de recuperação quando a alteração for relevante.']]
    ]
  },
  filesystem: {
    title:'Sistema de arquivos — como o computador organiza dados',
    sections:[
      ['1. O que é','Sistema de arquivos define como dados são organizados, nomeados, localizados e controlados em uma unidade de armazenamento.','Disco → sistema de arquivos → diretórios → arquivos',['NTFS, ext4 e APFS são exemplos de sistemas de arquivos.']],
      ['2. Arquivos e diretórios','Diretórios agrupam arquivos e outros diretórios, formando uma estrutura navegável.','/home/evelyn/projeto\n├── index.html\n└── app.js',['Caminhos podem ser absolutos ou relativos.']],
      ['3. Metadados e permissões','Além do conteúdo, o sistema pode guardar metadados como tamanho, datas, proprietário e permissões.','arquivo.txt\n→ conteúdo\n→ tamanho\n→ datas\n→ permissões',['No Linux, permissões são parte importante da administração.']],
      ['4. Formatação','Formatar uma unidade cria ou recria uma estrutura de sistema de arquivos e normalmente pode destruir os dados existentes.','Backup → confirmar unidade → formatar → usar',['Confira sempre qual unidade está selecionada antes de formatar.']]
    ]
  },
  'processes-computer': {
    title:'Programa, processo e serviço',
    sections:[
      ['1. Programa','Programa é o conjunto de instruções armazenado em arquivos que pode ser executado.','app.exe / programa\n→ instruções armazenadas',['Ter um programa instalado não significa que ele esteja executando.']],
      ['2. Processo','Quando um programa é iniciado, o sistema cria um processo para representar aquela execução e fornecer recursos como memória e tempo de CPU.','programa → execução → processo',['O mesmo programa pode originar mais de um processo.']],
      ['3. Serviço','Serviço é um processo ou conjunto de processos preparado para oferecer uma função contínua ou em segundo plano, como servidor Web, impressão ou rede.','serviço → executa em segundo plano → atende solicitações',['Nem todo processo é um serviço.']],
      ['4. Diagnóstico','Ferramentas do sistema permitem visualizar processos e descobrir consumo de CPU, memória ou outros recursos.','Processo → CPU/RAM → monitoramento → diagnóstico',['Primeiro observe; depois finalize um processo quando souber o que ele faz.']]
    ]
  },
  architecture: {
    title:'Arquitetura 32 bits e 64 bits',
    sections:[
      ['1. O que significa','32 bits e 64 bits descrevem características da arquitetura e do tamanho de determinadas operações e endereços.','x86 → 32 bits\nx86-64 → 64 bits',['Não é simplesmente uma medida de “velocidade”.']],
      ['2. Memória endereçável','Uma arquitetura de 64 bits pode trabalhar com espaços de endereçamento muito maiores que arquiteturas de 32 bits, embora limites práticos dependam do sistema e do hardware.','32 bits → espaço de endereçamento menor\n64 bits → espaço muito maior',['A quantidade de RAM suportada também depende do sistema operacional e da plataforma.']],
      ['3. Compatibilidade','Sistemas 64 bits normalmente conseguem executar muitos programas 32 bits, dependendo do sistema. O contrário não funciona para binários que exigem arquitetura 64 bits.','SO 64 bits → programa 32 bits (quando suportado)\nSO 32 bits → programa 64 bits (não)',['Verifique os requisitos do software antes da instalação.']],
      ['4. Por que isso importa','Você encontrará arquitetura ao baixar sistemas operacionais, compiladores, drivers e bibliotecas.','Linux x86_64\nWindows x64\nARM64',['Baixe a versão compatível com sua arquitetura.']]
    ]
  },
  'compiler-interpreter': {
    title:'Compilador, interpretador e executável',
    sections:[
      ['1. Código-fonte','Código-fonte é o texto escrito pelo desenvolvedor em uma linguagem de programação.','main.c\nMain.java\napp.py',['O código-fonte é legível para humanos, mas o computador precisa de etapas para executá-lo.']],
      ['2. Compilador','Compilador transforma código-fonte em outra forma executável ou intermediária antes da execução, dependendo da linguagem e da ferramenta.','main.c → compilador → main.exe / main',['Erros de compilação impedem a geração correta do resultado.']],
      ['3. Interpretador','Em um modelo interpretado, um programa ou ambiente de execução lê e executa instruções de acordo com o funcionamento da linguagem e de sua implementação.','app.py → Python → execução',['Na prática moderna, linguagens podem combinar compilação, bytecode, JIT e outras técnicas.']],
      ['4. Executável','Executável é um arquivo ou formato que o sistema consegue carregar e executar dentro das regras da plataforma.','código → build → executável → processo',['Um executável precisa ser compatível com a arquitetura e o sistema esperado.']]
    ]
  },
  virtualization: {
    title:'Virtualização e máquinas virtuais',
    sections:[
      ['1. O que é virtualização','Virtualização permite representar recursos computacionais por software para executar ambientes isolados sobre um mesmo hardware físico.','Hardware físico\n↓\nhypervisor\n↓\nVM 1 + VM 2',['Uma máquina virtual não é necessariamente um computador físico separado.']],
      ['2. Máquina virtual','Uma VM simula ou virtualiza recursos como CPU, memória, disco e rede para que um sistema operacional convidado possa funcionar.','Host → VM → sistema convidado',['Host é o sistema que fornece os recursos; guest é o sistema dentro da VM.']],
      ['3. Hypervisor','Hypervisor é a camada responsável por criar e administrar máquinas virtuais. Há diferentes arquiteturas e produtos de virtualização.','Hypervisor\n├── VM Linux\n└── VM Windows',['Recursos físicos são compartilhados entre as VMs.']],
      ['4. Para que serve','VMs são usadas para estudos, testes, servidores, laboratórios e isolamento de ambientes.','Testar Linux no Windows\n→ VM\n→ instalar\n→ experimentar\n→ apagar sem alterar o sistema principal',['Uma VM ainda consome CPU, RAM e armazenamento do computador hospedeiro.']]
    ]
  },
  peripherals: {
    title:'Periféricos e interfaces',
    sections:[
      ['1. Entrada e saída','Periféricos são dispositivos usados para entrada, saída ou comunicação de dados com o computador.','Entrada: teclado, mouse, microfone\nSaída: monitor, alto-falante, impressora',['Alguns dispositivos exercem mais de uma função.']],
      ['2. USB','USB é uma família de interfaces usada para conectar diversos dispositivos. Versões e conectores possuem características diferentes.','PC ↔ USB ↔ teclado / pendrive / celular',['USB-C descreve o conector físico, não sozinho a velocidade ou todos os recursos disponíveis.']],
      ['3. Vídeo','HDMI, DisplayPort e outras interfaces podem transportar vídeo e, em alguns casos, áudio.','GPU → HDMI/DisplayPort → monitor',['A resolução e a taxa de atualização dependem do conjunto de hardware, cabo e padrões suportados.']],
      ['4. Rede sem fio','Wi-Fi conecta o dispositivo a uma rede sem fio. O sistema operacional usa hardware e drivers para controlar o adaptador.','Aplicação → SO → driver → Wi-Fi → roteador',['Sinal, interferência, banda e configuração influenciam a conexão.']]
    ]
  }
};

Object.assign(expandedLessons, computerFundamentalsLessons);

// Substitui todas as aulas catalogadas pela versão em seções detalhadas.
Object.entries(subtopics).forEach(([category,items])=>items.forEach(([key,title])=>{detailContent[key]=makeExpandedLesson(key,title,category)}));
// ===== Fim currículo expandido =====

function updateProgress(){let lessonTotal=Object.keys(detailContent).length,lessonDone=Object.values(state.practice||{}).filter(Boolean).length;let pct=Math.round(lessonDone/Math.max(1,lessonTotal)*100);document.getElementById('xp-text').textContent=pct+'%';document.getElementById('xp-bar').style.width=pct+'%'}
function toast(t){const x=document.getElementById('toast');x.textContent=t;x.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>x.classList.remove('show'),2200)}
function escapeHtml(v=''){return String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;')}
function home(){return `<section class="page"><div class="hero"><div><p class="eyebrow">Plataforma de aprendizado</p><h1>Aprenda TI <span>fazendo.</span></h1><p>O EvDev foi pensado para quem está começando e quer entender de verdade. Escolha um assunto, aprenda o conceito com exemplos simples, abra o laboratório e teste o que acabou de estudar.</p><div class="hero-actions"><button class="btn btn-primary" onclick="go('web')"><i class="fa-solid fa-code"></i> Começar por Web</button><button class="btn btn-light" onclick="go('lab')"><i class="fa-solid fa-flask"></i> Abrir laboratório</button></div></div><div class="hero-terminal"><div class="term-head"><i></i><i></i><i></i><span class="term-title">evdev@study:~</span></div><div class="terminal"><span class="dim">$</span> <span class="o">cat aprender.txt</span><br><span class="g">✓</span> entender o conceito<br><span class="g">✓</span> ver um exemplo<br><span class="b">→</span> testar no laboratório<br><span class="b">→</span> construir um projeto<br><br><span class="dim">$</span> <span class="o">_</span></div></div></div><div id="trilhas"><div class="section-title"><div><h2>Trilhas</h2><p>Cada assunto tem aulas e explicações detalhadas.</p></div></div><div class="topic-grid">${Object.entries(topics).map(([k,t])=>`<article class="topic-card" onclick="go('${k}')"><div class="topic-icon"><i class="fa-solid ${t.icon}"></i></div><h3>${t.title}</h3><p>${t.desc}</p><span class="tag">${t.tag}</span></article>`).join('')}</div></div><div class="learning-flow"><div><span>01</span><b>Aprenda</b><small>Conceito explicado de forma simples.</small></div><div><span>02</span><b>Veja</b><small>Exemplos prontos para entender a ideia.</small></div><div><span>03</span><b>Teste</b><small>Escreva código no laboratório.</small></div><div><span>04</span><b>Construa</b><small>Aplique o que aprendeu em pequenos projetos.</small></div></div></section>`}
function lesson(key){const t=topics[key],list=subtopics[key]||[];return `<section class="page"><div class="lesson-head"><div><p class="eyebrow">Trilha EvDev</p><h1><i class="fa-solid ${t.icon}" style="color:var(--orange);font-size:.75em"></i> ${t.title}</h1><p>${t.desc}</p></div><button class="btn btn-light" onclick="go('home')"><i class="fa-solid fa-arrow-left"></i> Trilhas</button></div><div class="explain-card"><div class="course-intro"><div><p class="eyebrow">Aprenda primeiro</p><h2>Escolha um assunto para estudar</h2><p>Escolha uma aula e avance por conceitos, exemplos, cuidados e erros específicos. Os desafios ficam pausados por enquanto.</p></div><div class="course-tip"><i class="fa-solid fa-lightbulb"></i><span>Use o <b>Laboratório</b> do menu quando quiser testar código executável.</span></div></div><div class="lesson-topics">${list.map(x=>`<button class="subtopic-card" onclick="openDetail('${key}','${x[0]}')"><span class="mini-icon"><i class="fa-solid ${t.icon}"></i></span><h3>${x[1]}</h3><p>${x[2]}</p><span class="study-link">Estudar aula <i class="fa-solid fa-arrow-right"></i></span></button>`).join('')}</div></div></section>`}
function openDetail(topic,key){const d=detailContent[key]||detailFallback(key,(subtopics[topic]||[]).find(x=>x[0]===key)?.[1]||key);location.hash=`lesson/${topic}/${key}`;renderDetail(topic,key,d)}
function renderDetail(topic,key,d){const t=topics[topic]||topics.web;app.innerHTML=`<section class="page"><button class="btn btn-light topic-back" onclick="go('${topic}')"><i class="fa-solid fa-arrow-left"></i> Voltar para ${t.title}</button><div class="lesson-detail-head"><div><p class="eyebrow">Aula EvDev • ${t.title}</p><h1>${d.title}</h1><p>${d.intro}</p></div><div class="lesson-meta"><span><i class="fa-regular fa-clock"></i> ${d.time||'15 min'}</span><span>${d.level||'Iniciante'}</span></div></div><article class="explain-card lesson-content lesson-full">${d.sections.map(s=>`<section class="lesson-section"><h2>${s[0]}</h2><p>${s[1]}</p>${s[2]?`<pre class="code-block">${escapeHtml(s[2])}</pre>`:''}<ul>${(s[3]||[]).map(x=>`<li>${x}</li>`).join('')}</ul></section>`).join('')}<div class="lesson-actions"><button class="btn btn-primary" onclick="completeLesson('${key}')"><i class="fa-solid fa-check"></i> ${state.practice?.[key]?'Aula praticada':'Marcar aula como praticada'}</button><button class="btn btn-light" onclick="go('${topic}')"><i class="fa-solid fa-arrow-left"></i> Voltar aos assuntos</button></div></article></section>`;window.scrollTo(0,0)}
function detailFallback(key,title){return {title,level:'Iniciante',time:'10 min',lang:'text',intro:`Nesta aula você vai entender ${title.toLowerCase()} com uma explicação curta e um exemplo para praticar.`,sections:[['O conceito','Comece entendendo para que isso existe e qual problema resolve.','',[ 'Leia o conceito antes do código.','Altere o exemplo e observe o resultado.','Depois tente o desafio.']]]}}
function defaultCode(lang){const codes={
  web:'<!doctype html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <style>\n    body { font-family: Arial, sans-serif; padding: 24px; }\n    h1 { color: #ff7a18; }\n    .card { padding: 16px; border: 2px solid #1266a8; border-radius: 12px; }\n  </style>\n</head>\n<body>\n  <div class="card">\n    <h1>Olá, EvDev!</h1>\n    <p>HTML e CSS são testados juntos aqui.</p>\n  </div>\n</body>\n</html>',
  javascript:'const nome = "Evelyn";\nconsole.log("Oi, " + nome);',
  python:'nome = "Evelyn"\nprint("Oi, " + nome)',
  java:'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Oi");\n  }\n}',
  c:'#include <stdio.h>\n\nint main(void) {\n    printf("Oi\\n");\n    return 0;\n  }'
};return codes[lang]||'// escreva seu código aqui'}
function labelLang(x){return ({web:'HTML + CSS',html:'HTML',css:'CSS',javascript:'JavaScript',python:'Python',java:'Java',c:'C'})[x]||x.toUpperCase()}
function playground(lang='web',initial='',key='lab'){
  const browserLang=['web','javascript'].includes(lang);
  const programming=['python','java','c'].includes(lang);
  return `<div class="playground">
    <div class="play-head"><strong><i class="fa-solid fa-flask"></i> Teste seu código</strong><span class="lab-current-language">${labelLang(lang)}</span><button onclick="runPlayground()"><i class="fa-solid fa-play"></i> Executar</button></div>
    <div class="editor-grid">
      <div class="editor-pane"><div class="editor-label">Código</div><textarea id="code-editor" class="code-editor" spellcheck="false">${escapeHtml(initial)}</textarea></div>
      <div class="preview-pane"><div class="editor-label result-label">Resultado</div>${browserLang?'<iframe id="preview-frame" class="preview-frame" sandbox="allow-scripts"></iframe>':programming?'<pre id="code-output" class="output-box">Clique em Executar para enviar o código ao executor.</pre>':'<div id="code-output" class="output-box">Selecione uma linguagem para começar.</div>'}</div>
    </div>
    <div class="run-note">${lang==='web'?'HTML e CSS executam juntos diretamente no navegador.':lang==='javascript'?'JavaScript executa diretamente no navegador.':'Java e C usam o executor online. Python roda no próprio navegador usando Pyodide, sem depender do Wandbox.'}</div>
  </div>`
}

// Python roda no navegador por meio do Pyodide (CPython compilado para WebAssembly).
// Isso remove a dependência do endpoint que estava retornando HTTP 401 no laboratório.
let pyodidePromise=null;
async function loadPyodideOnce(){
  if(pyodidePromise) return pyodidePromise;
  if(window.loadPyodide) {
    pyodidePromise=window.loadPyodide({indexURL:'https://cdn.jsdelivr.net/pyodide/v314.0.7/full/'});
    return pyodidePromise;
  }
  pyodidePromise=new Promise((resolve,reject)=>{
    const script=document.createElement('script');
    script.src='https://cdn.jsdelivr.net/pyodide/v314.0.7/full/pyodide.js';
    script.onload=()=>resolve(window.loadPyodide({indexURL:'https://cdn.jsdelivr.net/pyodide/v314.0.7/full/'}));
    script.onerror=()=>reject(new Error('Não foi possível carregar o Python no navegador. Verifique sua conexão com a internet.'));
    document.head.appendChild(script);
  });
  return pyodidePromise;
}
async function runPythonBrowser(code,out){
  out.textContent='Carregando Python no navegador...\nNa primeira execução o download pode demorar um pouco.';
  const pyodide=await loadPyodideOnce();
  let output='';
  pyodide.setStdout({batched:(msg)=>{output+=msg+'\n'}});
  pyodide.setStderr({batched:(msg)=>{output+=msg+'\n'}});
  await pyodide.runPythonAsync(code);
  out.textContent=output.trim()||'O programa terminou sem saída.';
  toast('Python executado!');
}

async function runPlayground(){
  const code=document.getElementById('code-editor')?.value||'';
  const langLabel=document.querySelector('.lab-current-language')?.textContent?.trim()||'';
  const lang=langLabel.toLowerCase();
  const frame=document.getElementById('preview-frame');
  const out=document.getElementById('code-output');
  if(!code.trim()){toast('Digite algum código antes de executar.');return}
  if(lang==='html + css'){
    frame.srcdoc=code;
    toast('HTML + CSS executados!');
    return
  }
  if(lang==='javascript'){
    frame.srcdoc=`<!doctype html><html><body><pre id="out"></pre><script>const out=document.getElementById('out');console.log=(...a)=>out.textContent+=a.map(v=>typeof v==='object'?JSON.stringify(v):String(v)).join(' ')+'\\n';window.onerror=(m)=>out.textContent+='Erro: '+m+'\\n';try{${code}}catch(e){out.textContent='Erro: '+e.name+': '+e.message}</script></body></html>`;
    toast('JavaScript executado!');
    return
  }
  if(lang==='python'){
    if(!out)return;
    try{await runPythonBrowser(code,out)}catch(e){out.textContent='Não foi possível executar o Python.\n\n'+(e?.message||e);toast('Falha ao executar Python.')}return
  }
  const target={java:'Java',c:'C'}[lang];
  if(!target||!out)return;
  out.textContent='Preparando o compilador...';
  try{
    const listResponse=await fetch('https://wandbox.org/api/list.json',{headers:{'Accept':'application/json'}});
    if(!listResponse.ok)throw new Error('Não foi possível consultar os compiladores do laboratório (HTTP '+listResponse.status+').');
    const compilers=await listResponse.json();
    const candidates=compilers.filter(c=>String(c.language||'').toLowerCase()===target.toLowerCase());
    if(!candidates.length)throw new Error('O executor não encontrou um compilador disponível para '+target+'.');
    const compiler=candidates.find(c=>String(c.name||'').toLowerCase().includes('head'))||candidates[0];
    const compilerName=compiler.name;
    out.textContent='Executando com '+compilerName+'...';
    const codeToRun=lang==='java' ? code.replace(/\bpublic\s+class\s+Main\b/, 'class Main') : code;
    const response=await fetch('https://wandbox.org/api/compile.json',{
      method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify({code:codeToRun,compiler:compilerName,stdin:'',save:false})
    });
    if(!response.ok)throw new Error('O executor respondeu com HTTP '+response.status+'.');
    const data=await response.json();
    const parts=[];
    if(data.program_output)parts.push(data.program_output);
    if(data.program_message && data.program_message!==data.program_output)parts.push(data.program_message);
    if(data.compiler_error)parts.push('[erro de compilação]\n'+data.compiler_error);
    else if(data.compiler_message)parts.push('[compilador]\n'+data.compiler_message);
    if(data.signal)parts.push('[sinal] '+data.signal);
    out.textContent=parts.join('\n')||'O programa terminou sem saída.';
    toast(data.status==='0'?'Código executado!':'Código processado; confira o resultado.');
  }catch(e){
    out.textContent='Não foi possível executar agora.\n\n'+e.message+'\n\nJava e C usam o executor online e precisam de conexão com a internet.';
    toast('Falha ao executar.');
  }
}

function lab(){return `<section class="page"><div class="lesson-head"><div><p class="eyebrow">Ambiente de prática</p><h1><i class="fa-solid fa-flask" style="color:var(--orange)"></i> Laboratório</h1><p>Teste tecnologias no próprio navegador. HTML e CSS ficam juntos em um único editor; JavaScript, Python, Java e C têm ambientes separados.</p></div></div><div class="lab-selector"><button class="lab-select-card active" data-lab-lang="web" onclick="selectLabLanguage('web')"><span><i class="fa-solid fa-code"></i></span><b>HTML + CSS</b><small>Estrutura e estilo juntos</small></button><button class="lab-select-card" data-lab-lang="javascript" onclick="selectLabLanguage('javascript')"><span><i class="fa-brands fa-js"></i></span><b>JavaScript</b><small>Lógica no navegador</small></button><button class="lab-select-card programming" data-lab-lang="python" onclick="selectLabLanguage('python')"><span>🐍</span><b>Python</b><small>Python no navegador</small></button><button class="lab-select-card programming" data-lab-lang="java" onclick="selectLabLanguage('java')"><span><i class="fa-brands fa-java"></i></span><b>Java</b><small>Executar código</small></button><button class="lab-select-card programming" data-lab-lang="c" onclick="selectLabLanguage('c')"><span><i class="fa-solid fa-c"></i></span><b>C</b><small>Executar código</small></button></div><div id="lab-workspace">${playground('web',defaultCode('web'),'global')}</div><div class="lab-guide"><h2>Como usar</h2><div class="lab-steps"><div><b>1</b><span>Escolha um ambiente.</span></div><div><b>2</b><span>Digite ou altere o código.</span></div><div><b>3</b><span>Clique em Executar.</span></div><div><b>4</b><span>Leia o resultado ou o erro e tente novamente.</span></div></div></div><div class="callout"><b>Execução:</b> HTML + CSS e JavaScript rodam diretamente no navegador. Python roda localmente no navegador via Pyodide. Java e C usam um executor online isolado. Não envie senhas, tokens ou dados pessoais.</div></section>`}
function selectLabLanguage(lang){document.querySelectorAll('.lab-select-card').forEach(b=>b.classList.toggle('active',b.dataset.labLang===lang));const workspace=document.getElementById('lab-workspace');if(workspace)workspace.innerHTML=playground(lang,defaultCode(lang),'global')}

function go(key){location.hash=key;render()}
// Eventos globais da aplicação.
window.addEventListener('hashchange',render);document.getElementById('mobile-menu').onclick=()=>{const sb=document.getElementById('sidebar');sb.classList.remove('collapsed');localStorage.setItem('evdevSidebarCollapsed','0');sb.classList.toggle('open');};document.getElementById('search-btn').onclick=()=>{document.getElementById('search-modal').classList.remove('hidden');document.getElementById('search-input').focus();search('')};document.getElementById('close-search').onclick=()=>document.getElementById('search-modal').classList.add('hidden');document.getElementById('search-input').oninput=e=>search(e.target.value);

/* ==========================================================
   EvDev — integração da trilha completa de Programação
   Mantém todas as trilhas do site e adiciona Python, JavaScript,
   Java e C com trilhas extensas, instalação/documentação somente
   na visão inicial da linguagem e aulas individuais.
   ========================================================== */

const EVDEV_PROGRAMMING = window.EVDEV_PROGRAMMING || {};
state.programmingLanguage = state.programmingLanguage || 'python';

const programmingMeta = {
  python: { icon:'fa-brands fa-python', color:'blue' },
  javascript: { icon:'fa-brands fa-js', color:'orange' },
  java: { icon:'fa-brands fa-java', color:'blue' },
  c: { icon:'fa-solid fa-c', color:'orange' }
};

function programmingLangKeys(){ return Object.keys(EVDEV_PROGRAMMING); }
function programmingData(){ return EVDEV_PROGRAMMING[state.programmingLanguage] || EVDEV_PROGRAMMING.python; }
function programmingTopicSlug(lang,index){ return `programming/${lang}/${index}`; }

function programmingTerminal(title, lines){
  return `<div class="install-terminal">
    <div class="install-terminal-head"><span></span><span></span><span></span><b>${escapeHtml(title)}</b></div>
    <pre>${lines.map(x=>escapeHtml(x)).join('\n')}</pre>
  </div>`;
}

function programmingHome(){
  return `<section class="page">
    <div class="lesson-head">
      <div>
        <p class="eyebrow">Trilha de Programação</p>
        <h1><i class="fa-solid fa-terminal" style="color:var(--orange)"></i> Programação & Linguagens</h1>
        <p>Escolha uma linguagem para estudar sua sintaxe, estruturas, coleções, funções, erros, orientação a objetos e outros recursos. A ideia é aprender como realmente escrever programas, não apenas decorar conceitos.</p>
      </div>
      <button class="btn btn-light" onclick="go('home')"><i class="fa-solid fa-arrow-left"></i> Trilhas</button>
    </div>
    <div class="programming-callout"><i class="fa-solid fa-graduation-cap"></i><div><b>Uma trilha para aprender a linguagem</b><span>Escolha Python, JavaScript, Java ou C. Dentro de cada linguagem, os assuntos são separados em aulas individuais. Instalação e documentação ficam somente na tela inicial da linguagem.</span></div></div>
    <div class="programming-language-grid">
      ${programmingLangKeys().map(k=>{
        const l=EVDEV_PROGRAMMING[k], m=programmingMeta[k]||{};
        return `<button class="programming-language-card ${m.color||''}" onclick="selectProgrammingLanguage('${k}')">
          <div class="programming-language-icon"><i class="${m.icon||'fa-solid fa-code'}"></i></div>
          <div><h3>${escapeHtml(l.name)}</h3><p>${escapeHtml(l.tag)} · ${l.topics.length} assuntos</p></div>
          <span>Começar <i class="fa-solid fa-arrow-right"></i></span>
        </button>`;
      }).join('')}
    </div>
    <div class="programming-roadmap">
      <div><b>01</b><strong>Fundamentos</strong><span>Variáveis, tipos, operadores e estruturas básicas.</span></div>
      <div><b>02</b><strong>Controle</strong><span>Condições, loops, funções e coleções.</span></div>
      <div><b>03</b><strong>Organização</strong><span>Módulos, classes, objetos e tratamento de erros.</span></div>
      <div><b>04</b><strong>Prática</strong><span>Exemplos, erros específicos e exercícios.</span></div>
    </div>
  </section>`;
}

function selectProgrammingLanguage(lang){
  state.programmingLanguage=lang;
  state.programmingTopic=null;
  save();
  go(`programming/${lang}`);
}

function programmingOverview(lang){
  state.programmingLanguage=lang;
  state.programmingTopic=null;
  const l=EVDEV_PROGRAMMING[lang];
  const m=programmingMeta[lang]||{};
  const win = l.install_win || [];
  const linux = l.install_linux || [];
  const groups={};
  l.topics.forEach((t,i)=>{ (groups[t.category] ||= []).push({t,i}); });
  return `<section class="page">
    <button class="btn btn-light topic-back" onclick="go('programming')"><i class="fa-solid fa-arrow-left"></i> Linguagens</button>
    <div class="programming-lang-head">
      <div class="programming-lang-title">
        <div class="programming-language-icon ${m.color||''}"><i class="${m.icon||'fa-solid fa-code'}"></i></div>
        <div><p class="eyebrow">Linguagem de programação</p><h1>${escapeHtml(l.name)}</h1><p>${escapeHtml(l.tag)} · ${l.topics.length} aulas</p></div>
      </div>
      <a class="btn btn-primary" href="${escapeHtml(l.doc)}" target="_blank" rel="noopener"><i class="fa-solid fa-book"></i> Documentação oficial</a>
    </div>

    <div class="install-note"><i class="fa-solid fa-circle-info"></i><div><b>Antes de começar</b><span>Instale a linguagem e confirme que o comando funciona no terminal. Esta é a única tela da trilha que mostra instalação e documentação. Ao abrir uma aula, você verá somente o conteúdo daquele assunto.</span></div></div>

    <div class="install-grid install-terminal-grid">
      <section><h2><i class="fa-brands fa-windows"></i> Instalar no Windows</h2>${programmingTerminal('PowerShell',win)}</section>
      <section><h2><i class="fa-brands fa-linux"></i> Instalar no Linux</h2>${programmingTerminal('Terminal',linux)}</section>
    </div>

    <section class="programming-lessons-wrap">
      <div class="section-title"><div><h2>Conteúdo de ${escapeHtml(l.name)}</h2><p>Cada item abre uma aula completa, com explicação, exemplos e erros específicos.</p></div><span class="lesson-count">${l.topics.length} assuntos</span></div>
      <div class="programming-overview-search">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input id="programming-overview-search" type="search" autocomplete="off" placeholder="Pesquisar nesta linguagem..." aria-label="Pesquisar nesta linguagem">
      </div>
      <div id="programming-overview-results" class="programming-overview-results"></div>
      ${Object.entries(groups).map(([group,items])=>`<section class="programming-category" data-overview-group="${escapeHtml(group)}"><div class="programming-category-title"><span></span><h3>${escapeHtml(group)}</h3><small>${items.length} aulas</small></div><div class="programming-topic-grid">${items.map(({t,i})=>`<button class="programming-topic-card" data-overview-topic data-search-text="${escapeHtml(`${t.title} ${t.desc} ${t.category}`)}" onclick="openProgrammingLesson('${lang}',${i})"><span class="topic-number">${String(i+1).padStart(2,'0')}</span><div><strong>${escapeHtml(t.title)}</strong><p>${escapeHtml(t.desc)}</p></div><i class="fa-solid fa-arrow-right"></i></button>`).join('')}</div></section>`).join('')}
    </section>
  </section>`;
}

function normalizeSearchText(value=''){
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g,'')
    .toLowerCase()
    .trim();
}

function programmingSidebar(lang){
  const l=EVDEV_PROGRAMMING[lang];
  if(!l) return '';

  const groups={};
  l.topics.forEach((t,i)=>(groups[t.category] ||= []).push({t,i}));

  return `<div class="programming-side-language">
      <div class="side-lang-icon"><i class="${(programmingMeta[lang]||{}).icon||'fa-solid fa-code'}"></i></div>
      <div><b>${escapeHtml(l.name)}</b><small>${l.topics.length} aulas</small></div>
    </div>
    <button class="side-programming-home" onclick="go('programming/${lang}')">
      <i class="fa-solid fa-house"></i> Visão geral da linguagem
    </button>
    <div class="side-programming-search">
      <i class="fa-solid fa-magnifying-glass"></i>
      <input id="programming-side-search" type="search" autocomplete="off" placeholder="Pesquisar aula ou tópico..." aria-label="Pesquisar aula ou tópico">
      <button class="side-programming-search-clear" id="programming-side-search-clear" type="button" title="Limpar pesquisa" aria-label="Limpar pesquisa">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <div id="programming-side-no-results" class="programming-side-no-results" hidden>Nenhuma aula encontrada.</div>
    ${Object.entries(groups).map(([g,items])=>`<div class="side-programming-group" data-programming-group>
      <b>${escapeHtml(g)}</b>
      ${items.map(({t,i})=>`<button class="side-programming-topic" data-prog-topic="${i}" data-search-text="${escapeHtml(`${t.title} ${t.desc} ${t.category}`)}">${escapeHtml(t.title)}</button>`).join('')}
    </div>`).join('')}`;
}

function filterProgrammingSidebar(query=''){
  const needle=normalizeSearchText(query);
  const groups=[...side.querySelectorAll('[data-programming-group]')];
  let matches=0;

  groups.forEach(group=>{
    let groupMatches=0;
    group.querySelectorAll('.side-programming-topic').forEach(button=>{
      const text=normalizeSearchText(button.dataset.searchText || button.textContent);
      const visible=!needle || text.includes(needle);
      button.hidden=!visible;
      if(visible) groupMatches++;
    });
    group.hidden=groupMatches===0;
    matches+=groupMatches;
  });

  const empty=side.querySelector('#programming-side-no-results');
  if(empty) empty.hidden=matches!==0;
}


function openProgrammingLesson(lang,index){
  state.programmingLanguage=lang;
  state.programmingTopic=index;
  save();
  location.hash=programmingTopicSlug(lang,index);
  render();
}

function renderProgrammingLesson(lang,index){
  const l=EVDEV_PROGRAMMING[lang];
  const t=l?.topics?.[index];
  if(!l||!t){ go(`programming/${lang||'python'}`); return; }
  const meta=programmingMeta[lang]||{};
  const completed=!!state.practice?.[`programming-${lang}-${index}`];
  app.innerHTML=`<section class="page">
    <button class="btn btn-light topic-back" onclick="go('programming/${lang}')"><i class="fa-solid fa-arrow-left"></i> Voltar para ${escapeHtml(l.name)}</button>
    <div class="lesson-detail-head">
      <div><p class="eyebrow">${escapeHtml(l.name)} • Aula ${index+1} de ${l.topics.length}</p><h1>${escapeHtml(t.title)}</h1><p>${escapeHtml(t.desc)}</p></div>
      <div class="lesson-meta"><span><i class="fa-solid ${meta.icon||'fa-code'}"></i> ${escapeHtml(l.name)}</span><span><i class="fa-regular fa-clock"></i> Estudo guiado</span></div>
    </div>
    <article class="explain-card lesson-content lesson-full programming-lesson">
      <section class="lesson-section"><h2>1. O que é ${escapeHtml(t.title)}?</h2><p>${escapeHtml(t.sections?.[0]?.[1] || t.desc)}</p></section>
      <section class="lesson-section"><h2>2. Como funciona</h2><p>${escapeHtml(t.sections?.[1]?.[1] || 'Observe a sintaxe e altere o exemplo aos poucos para entender cada parte.')}</p></section>
      <section class="lesson-section"><h2>3. Exemplo prático</h2><p>${escapeHtml(t.sections?.[2]?.[1] || 'Comece lendo o exemplo de cima para baixo e identifique o papel de cada linha.')}</p><pre class="code-block">${escapeHtml(t.code||t.examples?.[0]?.[1]||'')}</pre><div class="learn-note"><i class="fa-solid fa-lightbulb"></i><div><b>Como estudar este exemplo</b><span>Não apenas copie. Leia uma linha por vez, faça uma pequena alteração e execute novamente no seu ambiente. Tente prever o resultado antes de rodar.</span></div></div></section>
      <section class="lesson-section"><h2>4. Outro exemplo / variação</h2><p>${escapeHtml(t.examples?.[1]?.[2] || t.examples?.[0]?.[2] || 'Faça uma pequena mudança no exemplo original e compare os resultados.')}</p><pre class="code-block">${escapeHtml(t.examples?.[1]?.[1] || t.code || '')}</pre></section>
      <section class="lesson-section"><h2>5. Erros específicos e cuidados</h2><div class="programming-error-box"><i class="fa-solid fa-triangle-exclamation"></i><div><b>Fique atento</b><p>${escapeHtml(t.error || t.errors || 'Verifique a sintaxe, os tipos e os nomes utilizados no código.')}</p></div></div></section>
      <section class="lesson-section"><h2>6. Pratique</h2><p>Agora tente reproduzir o exemplo sem olhar. Depois mude os valores, crie uma nova variação e confira se o resultado continua fazendo sentido.</p></section>
      <div class="lesson-actions"><button class="btn btn-primary" onclick="completeProgrammingLesson('${lang}',${index})"><i class="fa-solid fa-check"></i> ${completed?'Aula praticada':'Marcar aula como praticada'}</button><button class="btn btn-light" onclick="go('programming/${lang}')"><i class="fa-solid fa-list"></i> Ver assuntos</button><button class="btn btn-light" onclick="go('lab')"><i class="fa-solid fa-flask"></i> Laboratório</button></div>
    </article>
  </section>`;
  window.scrollTo(0,0);
}

function completeProgrammingLesson(lang,index){
  state.practice=state.practice||{};
  state.practice[`programming-${lang}-${index}`]=true;
  save();
  renderProgrammingLesson(lang,index);
  toast('Aula marcada como praticada!');
}

function renderProgrammingSidebar(){
  if(state.programmingLanguage && EVDEV_PROGRAMMING[state.programmingLanguage]){
    side.innerHTML=programmingSidebar(state.programmingLanguage);

    // Os botões usam data-prog-topic para evitar depender da posição visual.
    side.querySelectorAll('[data-prog-topic]').forEach(btn=>{
      btn.onclick=()=>openProgrammingLesson(state.programmingLanguage,+btn.dataset.progTopic);
    });

    const search=side.querySelector('#programming-side-search');
    const clear=side.querySelector('#programming-side-search-clear');

    // A pesquisa considera título, descrição e categoria e ignora acentos.
    if(search){
      search.oninput=()=>filterProgrammingSidebar(search.value);
      search.onkeydown=e=>{
        if(e.key==='Escape'){
          search.value='';
          filterProgrammingSidebar('');
          search.focus();
        }
      };
    }

    if(clear){
      clear.onclick=()=>{
        search.value='';
        filterProgrammingSidebar('');
        search.focus();
      };
    }
  }
}

function search(q){
  const needle=normalizeSearchText(q);
  const arr=[];

  Object.entries(topics).forEach(([key,topic])=>{
    const topicText=normalizeSearchText(`${topic.title} ${topic.desc}`);
    if(topicText.includes(needle)) arr.push([key,topic.title,topic.desc]);

    (subtopics[key]||[]).forEach(([subKey,title,desc])=>{
      if(normalizeSearchText(`${title} ${desc}`).includes(needle)){
        arr.push([`lesson/${key}/${subKey}`,title,desc]);
      }
    });
  });

  Object.entries(EVDEV_PROGRAMMING).forEach(([lang,data])=>{
    data.topics.forEach((topic,index)=>{
      const text=normalizeSearchText(`${data.name} ${topic.title} ${topic.desc} ${topic.category}`);
      if(text.includes(needle)){
        arr.push([`programming/${lang}/${index}`,`${data.name} — ${topic.title}`,topic.desc]);
      }
    });
  });

  document.getElementById('search-results').innerHTML=arr.length
    ? arr.slice(0,40).map(item=>`<div class="result" onclick="document.getElementById('search-modal').classList.add('hidden');go('${item[0]}')"><b>${escapeHtml(item[1])}</b><span>${escapeHtml(item[2])}</span></div>`).join('')
    : '<div class="result"><span>Nenhum resultado encontrado.</span></div>';
}

function setupProgrammingOverviewSearch(){
  const input=document.getElementById('programming-overview-search');
  if(!input) return;

  const filter=()=>{
    const needle=normalizeSearchText(input.value);
    const groups=[...app.querySelectorAll('[data-overview-group]')];
    let matches=0;

    groups.forEach(group=>{
      let groupMatches=0;
      group.querySelectorAll('[data-overview-topic]').forEach(card=>{
        const text=normalizeSearchText(card.dataset.searchText || card.textContent);
        const visible=!needle || text.includes(needle);
        card.hidden=!visible;
        if(visible) groupMatches++;
      });
      group.hidden=groupMatches===0;
      matches+=groupMatches;
    });

    const result=document.getElementById('programming-overview-results');
    if(result) result.textContent=needle ? `${matches} ${matches===1?'aula encontrada':'aulas encontradas'}.` : '';
  };

  input.oninput=filter;
  input.onkeydown=e=>{
    if(e.key==='Escape'){input.value='';filter();input.focus();}
  };
}

function render(){
  const raw=location.hash.slice(1)||'home';
  const parts=raw.split('/');
  const key=parts[0];
  renderTopNav(key);
  if(key==='programming'){
    if(parts[1] && EVDEV_PROGRAMMING[parts[1]]){
      state.programmingLanguage=parts[1];
      if(parts[2]!==undefined && !Number.isNaN(+parts[2])){
        state.programmingTopic=+parts[2];
        renderProgrammingSidebar();
        renderProgrammingLesson(parts[1],+parts[2]);
      }else{
        state.programmingTopic=null;
        renderProgrammingSidebar();
        app.innerHTML=programmingOverview(parts[1]);
        setupProgrammingOverviewSearch();
        window.scrollTo(0,0);
      }
    }else{
      state.programmingTopic=null;
      app.innerHTML=programmingHome();
      side.innerHTML=nav.filter(n=>n[0]!=='home').map(n=>`<button class="side-link ${key===n[0]?'active':''}" onclick="go('${n[0]}');document.getElementById('sidebar').classList.remove('open')"><i class="fa-solid ${n[1]}"></i>${n[2]}</button>`).join('');
    }
    updateProgress();
    return;
  }
  side.innerHTML=nav.filter(n=>n[0]!=='home').map(n=>`<button class="side-link ${key===n[0]?'active':''}" onclick="go('${n[0]}');document.getElementById('sidebar').classList.remove('open')"><i class="fa-solid ${n[1]}"></i>${n[2]}</button>`).join('');
  if(key==='lab'){app.innerHTML=lab();updateProgress();return}
  if(parts[0]==='lesson'&&parts[1]&&parts[2]){const d=detailContent[parts[2]]||detailFallback(parts[2],parts[2]);renderDetail(parts[1],parts[2],d);updateProgress();return}
  app.innerHTML=key==='home'?home():(topics[key]?lesson(key):home());
  updateProgress();
  window.scrollTo(0,0);
}



// Controle da barra de trilhas: fecha e reabre pelo botão lateral.
const sidebarEl=document.getElementById('sidebar');
const sidebarToggle=document.getElementById('sidebar-toggle');
if(sidebarEl&&sidebarToggle){
  if(localStorage.getItem('evdevSidebarCollapsed')==='1') sidebarEl.classList.add('collapsed');
  function updateSidebarToggle(){const collapsed=sidebarEl.classList.contains('collapsed');sidebarToggle.innerHTML=`<i class="fa-solid ${collapsed?'fa-chevron-right':'fa-chevron-left'}"></i>`;sidebarToggle.title=collapsed?'Abrir trilhas':'Fechar trilhas';sidebarToggle.setAttribute('aria-label',sidebarToggle.title)}
  sidebarToggle.onclick=()=>{sidebarEl.classList.toggle('collapsed');localStorage.setItem('evdevSidebarCollapsed',sidebarEl.classList.contains('collapsed')?'1':'0');updateSidebarToggle()};
  updateSidebarToggle();
}

// Inicializa o aplicativo somente depois de carregar a trilha completa de Programação.
render();
