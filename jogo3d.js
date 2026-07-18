// cartomante/js/jogo3d.js

const CARD_FILES = [
  "1-cavaleiro.png", "2-trevo.png", "3-navio.png", "4-casa.png", "5-arvore.png",
  "6-nuvens.png", "7-cobra.png", "8-caixao.png", "9-buque.png", "10-foice.png",
  "11-chicote.png", "12-passaros.png", "13-criança.png", "14-raposa.png", "15-urso.png",
  "16-estrelas.png", "17-cegonha.png", "18-cachorro.png", "19-torre.png", "20-jardim.png",
  "21-montanha.png", "22-caminho.png", "23-ratos.png", "24-coração.png", "25-anel.png",
  "26-livro.png", "27-carta.png", "28-homem.png", "29-mulher.png", "30-lirios.png",
  "31-sol.png", "32-lua.png", "33-chave.png", "34-peixes.png", "35-ancora.png", "36-cruz.png"
];

const MEANINGS = {
  "1-cavaleiro.png": "Notícias, movimento, algo que chega rápido.",
  "2-trevo.png": "Pequenos obstáculos, sorte passageira.",
  "3-navio.png": "Viagens, mudanças, novos horizontes.",
  "4-casa.png": "Família, estabilidade, estrutura íntima.",
  "5-arvore.png": "Saúde, raízes profundas, crescimento lento.",
  "6-nuvens.png": "Confusão, instabilidade, turbulência mental.",
  "7-cobra.png": "Traição, inteligência, situações sinuosas.",
  "8-caixao.png": "Fim de um ciclo, transformações radicais.",
  "9-buque.png": "Alegria, presentes, beleza e felicidade.",
  "10-foice.png": "Corte brusco, colheita, decisões rápidas.",
  "11-chicote.png": "Conflitos, discussões, repetição de padrões.",
  "12-passaros.png": "Conversas, preocupações, vozes alheias.",
  "13-criança.png": "Inícios, renovação, inocência, novos projetos.",
  "14-raposa.png": "Astúcia, alerta, situações enganosas.",
  "15-urso.png": "Poder, proteção, força interior, rivalidade.",
  "16-estrelas.png": "Esperança, inspiração, sonhos, clareza espiritual.",
  "17-cegonha.png": "Mudanças positivas, novidades, renascimento.",
  "18-cachorro.png": "Amizade, lealdade, apoio verdadeiro.",
  "19-torre.png": "Instituições, autoridade, isolamento, estruturas rígidas.",
  "20-jardim.png": "Socialização, eventos, ambiente agradável.",
  "21-montanha.png": "Obstáculos grandes, desafios, superação.",
  "22-caminho.png": "Decisões, direções, escolhas a fazer.",
  "23-ratos.png": "Preocupações, perdas pequenas, limpeza necessária.",
  "24-coração.png": "Amor, emoções, sentimentos sinceros.",
  "25-anel.png": "Compromissos, contratos, relacionamentos duradouros.",
  "26-livro.png": "Conhecimento, segredos, educação, estudo.",
  "27-carta.png": "Documentos, comunicações, notícias oficiais.",
  "28-homem.png": "Figura masculina, consultante ou pessoa importante.",
  "29-mulher.png": "Figura feminina, consultante ou pessoa importante.",
  "30-lirios.png": "Pureza, harmonia, paz, relacionamentos maduros.",
  "31-sol.png": "Sucesso, energia vital, clareza e brilho.",
  "32-lua.png": "Intuição, emoções, mistérios, ciclo feminino.",
  "33-chave.png": "Soluções, respostas, oportunidades únicas.",
  "34-peixes.png": "Prosperidade, negócios, fluidez financeira.",
  "35-ancora.png": "Estabilidade, segurança, trabalho, permanência.",
  "36-cruz.png": "Destino, espiritualidade, desafios cármicos, fé."
};

const SPREADS = {
  single: {
    name: "Carta Única",
    cards: 1,
    description: "Conselho do dia",
    positions: [{x: 0, y: 0, z: -2, label: "Conselho"}]
  },
  pastPresentFuture: {
    name: "3 Cartas",
    cards: 3,
    description: "Passado, Presente, Futuro",
    positions: [
      {x: -3.5, y: 0, z: -2, label: "Passado"},
      {x: 0, y: 0, z: -2, label: "Presente"},
      {x: 3.5, y: 0, z: -2, label: "Futuro"}
    ]
  },
  cross: {
    name: "Cruz Simples",
    cards: 4,
    description: "Situação, Resultado, Conselho, Obstáculo",
    positions: [
      {x: -2.5, y: 0, z: -1, label: "Situação"},
      {x: 2.5, y: 0, z: -1, label: "Resultado"},
      {x: 0, y: 0, z: -3, label: "Conselho"},
      {x: 0, y: 0, z: 1, label: "Obstáculo"}
    ]
  },
  gypsy: {
    name: "Método do Cigano",
    cards: 5,
    description: "Leitura tradicional cigana",
    positions: [
      {x: -6, y: 0, z: -2, label: "Consulente"},
      {x: -3, y: 0, z: -2, label: "A Favor"},
      {x: 0, y: 0, z: -2, label: "Contra"},
      {x: 3, y: 0, z: -2, label: "Desfecho"},
      {x: 6, y: 0, z: -2, label: "Conselho"}
    ]
  },
  horseshoe: {
    name: "Ferradura",
    cards: 7,
    description: "Passado ao Futuro",
    positions: [
      {x: -5, y: 0, z: -2, label: "Passado Recente"},
      {x: -3, y: 0, z: 0, label: "Presente"},
      {x: -1, y: 0, z: 1, label: "Obstáculos"},
      {x: 1, y: 0, z: 1, label: "Influências"},
      {x: 3, y: 0, z: 0, label: "Conselho"},
      {x: 5, y: 0, z: -2, label: "Futuro Próximo"},
      {x: 0, y: 0, z: -1, label: "Resultado Final"}
    ]
  },
  tableau: {
    name: "Grande Tableau",
    cards: 36,
    description: "Leitura completa",
    positions: [] // Será gerado dinamicamente
  }
};

let scene, camera, renderer, raycaster, mouse, deckMesh;
let drawnCards = [], drawnMeshes = [];
let isDrawing = false, drawCount = 0;
let currentSpread = 'pastPresentFuture';
const CARD_W = 3, CARD_H = 4.5;
const DECK_POS = { x: 0, y: -1, z: -3 };
const TABLE_Y = -0.5;
const IMG_PATH = './baralho/';

init();
animate();

function init() {
  console.log('=== INICIANDO JOGO 3D ===');
  const container = document.getElementById('canvas-container');
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050510);
  scene.fog = new THREE.FogExp2(0x050510, 0.05);

  camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 100);
  camera.position.set(0, 5, 3);
  camera.lookAt(0, 0, -1);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0x404050, 0.6));
  const spot = new THREE.SpotLight(0x9b59b6, 3);
  spot.position.set(0, 10, 5);
  spot.angle = Math.PI/4;
  spot.penumbra = 0.5;
  spot.castShadow = true;
  scene.add(spot);
  
  const pointLight = new THREE.PointLight(0xffffff, 1.5, 15);
  pointLight.position.set(0, 3, 2);
  scene.add(pointLight);

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  document.getElementById('loading-spinner').classList.add('hidden');
  
  window.addEventListener('resize', onResize);
  
  // Menu de seleção de tiragem
  document.querySelectorAll('.spread-option').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const spreadType = e.currentTarget.dataset.spread;
      selectSpread(spreadType);
    });
  });
  
  document.getElementById('btn-restart').addEventListener('click', restartGame);
  window.addEventListener('click', onClick);
  container.addEventListener('mousemove', onMouseMove);
}

function selectSpread(spreadType) {
  currentSpread = spreadType;
  const spread = SPREADS[spreadType];
  
  // Atualiza título
  document.querySelector('.game-header h1').textContent = `TIRAGEM ${spread.name.toUpperCase()}`;
  
  // Esconde menu
  document.getElementById('spread-menu').classList.remove('visible');
  
  // Mostra botão restart
  document.getElementById('btn-restart').style.display = 'block';
  
  console.log(`Tiragem selecionada: ${spread.name}`);
  
  // Inicia o jogo após breve delay
  setTimeout(() => startGame(), 500);
}

function startGame() {
  console.log('>>> START GAME');
  cleanup();
  
  const spread = SPREADS[currentSpread];
  const numCards = spread.cards;
  
  // Sorteia cartas únicas
  drawnCards = [];
  while (drawnCards.length < numCards) {
    const c = CARD_FILES[Math.floor(Math.random() * 36)];
    if (!drawnCards.includes(c)) drawnCards.push(c);
  }
  console.log(`Cartas sorteadas (${numCards}):`, drawnCards);
  
  drawCount = 0;
  isDrawing = false;
  createDeck();
}

function cleanup() {
  drawnMeshes.forEach(m => scene.remove(m));
  drawnMeshes = [];
  if (deckMesh) { scene.remove(deckMesh); deckMesh = null; }
  document.getElementById('reading-panel').innerHTML = '';
  document.getElementById('reading-panel').classList.remove('visible');
}

function createDeck() {
  console.log('Criando deck...');
  const loader = new THREE.TextureLoader();
  const backTex = loader.load(IMG_PATH + 'verso.png');
  
  deckMesh = new THREE.Mesh(
    new THREE.BoxGeometry(CARD_W, 0.2, CARD_H),
    new THREE.MeshStandardMaterial({map:backTex, color:0xdddddd})
  );
  deckMesh.position.set(DECK_POS.x, 0, DECK_POS.z);
  scene.add(deckMesh);
  console.log('Deck criado');

  gsap.to(deckMesh.position, {y: DECK_POS.y, duration:1.5, ease:"elastic.out(1,0.6)"});
}

function onMouseMove(e) {
  if (!deckMesh || drawCount >= SPREADS[currentSpread].cards) return;
  mouse.x = (e.clientX/window.innerWidth)*2-1;
  mouse.y = -(e.clientY/window.innerHeight)*2+1;
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObject(deckMesh);
  if (hits.length > 0) {
    document.getElementById('canvas-container').style.cursor = 'pointer';
  } else {
    document.getElementById('canvas-container').style.cursor = 'default';
  }
}

function onClick(e) {
  if (e.target.tagName === 'BUTTON') return;
  
  if (!deckMesh) return;
  if (isDrawing) return;
  if (drawCount >= SPREADS[currentSpread].cards) return;
  
  mouse.x = (e.clientX/window.innerWidth)*2-1;
  mouse.y = -(e.clientY/window.innerHeight)*2+1;
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObject(deckMesh);
  
  if (hits.length > 0) {
    drawCard();
  }
}

function drawCard() {
  console.log(`=== DRAWCARD ${drawCount + 1} ===`);
  isDrawing = true;
  
  const spread = SPREADS[currentSpread];
  const positions = spread.positions;
  const cardFile = drawnCards[drawCount];
  const pos = positions[drawCount];
  
  console.log(`Criando carta ${drawCount + 1}: ${cardFile}`);

  const loader = new THREE.TextureLoader();
  const backTex = loader.load(IMG_PATH + 'verso.png');
  const frontTex = loader.load(IMG_PATH + cardFile);

  const card = new THREE.Mesh(
    new THREE.BoxGeometry(CARD_W, 0.02, CARD_H),
    [
      new THREE.MeshStandardMaterial({color:0x222222}),
      new THREE.MeshStandardMaterial({color:0x222222}),
      new THREE.MeshStandardMaterial({map:backTex}),
      new THREE.MeshStandardMaterial({map:frontTex}),
      new THREE.MeshStandardMaterial({color:0x222222}),
      new THREE.MeshStandardMaterial({color:0x222222})
    ]
  );
  card.position.copy(deckMesh.position);
  scene.add(card);
  drawnMeshes.push(card);

  gsap.to(card.position, {y:0, x:pos.x, y:pos.y, z:pos.z, duration:1.5, ease:"power2.inOut"});
  gsap.to(card.rotation, {x:Math.PI, duration:1.5, ease:"power2.inOut", onComplete:()=>{
    showCardUI(cardFile, drawCount, pos.label);
    drawCount++;
    isDrawing = false;
    
    if (drawCount === spread.cards) {
      console.log('TODAS AS CARTAS REVELADAS!');
      setTimeout(() => {
        if (deckMesh) {
          scene.remove(deckMesh);
          deckMesh = null;
        }
      }, 2000);
    }
  }});
}

function showCardUI(fileName, index, label) {
  document.getElementById('reading-panel').classList.add('visible');
  
  const title = fileName.split('-')[1].split('.')[0];
  const meaning = MEANINGS[fileName] || "Significado em análise pelos oráculos ciganos. Mantenha a intuição aberta.";
  
  // Cria elemento dinamicamente para suportar qualquer número de cartas
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card-reading active';
  cardDiv.innerHTML = `
    <img class="card-thumb" src="${IMG_PATH + fileName}" alt="${title}">
    <div class="reading-label">${label}</div>
    <div class="card-title">${title}</div>
    <div class="card-desc">${meaning}</div>
  `;
  document.getElementById('reading-panel').appendChild(cardDiv);
}

function restartGame() {
  console.log('RESTART');
  cleanup();
  document.getElementById('spread-menu').classList.add('visible');
  document.getElementById('btn-restart').style.display = 'none';
  document.querySelector('.game-header h1').textContent = 'TIRAGEM DE 3 CARTAS';
}

function onResize() {
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}