const styleTag = document.createElement('style');

//Estilos para animaciones de bordes
styleTag.textContent = `
@keyframes goldPulse {
  0% {
    box-shadow: 0 0 6px gold;
  }
  50% {
    box-shadow: 0 0 18px gold;
  }
  100% {
    box-shadow: 0 0 6px gold;
  }
}

@keyframes rainbowGlow {
  0% {
    border-color: #ff4ddb;
    box-shadow: 0 0 10px #ff4ddb, inset 0 0 5px #ff4ddb;
  }
  25% {
    border-color: #ffa94d;
    box-shadow: 0 0 10px #ffa94d, inset 0 0 5px #ffa94d;
  }
  50% {
    border-color: #49e0ff;
    box-shadow: 0 0 10px #49e0ff, inset 0 0 5px #49e0ff;
  }
  75% {
    border-color: #9d4dff;
    box-shadow: 0 0 10px #9d4dff, inset 0 0 5px #9d4dff;
  }
  100% {
    border-color: #ff4ddb;
    box-shadow: 0 0 10px #ff4ddb, inset 0 0 5px #ff4ddb;
  }
}

.bubble.sub-border {
  border: 2px solid gold !important;
  border-radius: 16px !important;
  animation: goldPulse 2s ease-in-out infinite;
  background-color: #161c25d6 !important;
  padding: 8px !important;
  margin: 8px !important;
}

`;
document.head.appendChild(styleTag);

// Configura tus comandos y sus respectivas URLs de emotes aquí
const emoteCommands = {
  'ora': 'https://cesartd.github.io/streamtools/src/img/emotes/anim_shrek.gif',
  'alv': 'https://cesartd.github.io/streamtools/src/img/random/aywe.png',
  'eh': 'https://cesartd.github.io/streamtools/src/img/random/dogoh.png',
  'gok': 'https://cesartd.github.io/streamtools/src/img/random/gak.png',
  'gy': 'https://cesartd.github.io/streamtools/src/img/random/lgtv.png',
  'muchotexto': 'https://cesartd.github.io/streamtools/src/img/random/mucho_texto.png',
  'nimodo': 'https://cesartd.github.io/streamtools/src/img/random/nimodo.png',
  'yiyi': 'https://cesartd.github.io/streamtools/src/img/random/pngul.jpg',
  'ff': 'https://cesartd.github.io/streamtools/src/img/random/ff.png',
  'hola': 'https://cesartd.github.io/streamtools/src/img/random/hello.gif',
  'jajaja': 'https://cesartd.github.io/streamtools/src/img/random/jaja.png',
  'gg': 'https://cesartd.github.io/streamtools/src/img/random/gg.webp',
  'bye': 'https://cesartd.github.io/streamtools/src/img/random/ebye.gif',
};

const avatarFrames = [
  "https://cesartd.github.io/streamtools/src/img/frames/minecraft/alex.png",
  "https://cesartd.github.io/streamtools/src/img/frames/minecraft/axolotl.png",
  "https://cesartd.github.io/streamtools/src/img/frames/minecraft/cat.png",
  "https://cesartd.github.io/streamtools/src/img/frames/minecraft/chicken.png",
  "https://cesartd.github.io/streamtools/src/img/frames/minecraft/cow.png",
  "https://cesartd.github.io/streamtools/src/img/frames/minecraft/creeper.png",
  "https://cesartd.github.io/streamtools/src/img/frames/minecraft/dragon.png",
  "https://cesartd.github.io/streamtools/src/img/frames/minecraft/enderman.png",
  "https://cesartd.github.io/streamtools/src/img/frames/minecraft/fox.png",
  "https://cesartd.github.io/streamtools/src/img/frames/minecraft/golem.png",
  "https://cesartd.github.io/streamtools/src/img/frames/minecraft/parrot.png",
  "https://cesartd.github.io/streamtools/src/img/frames/minecraft/pig.png",
  "https://cesartd.github.io/streamtools/src/img/frames/minecraft/piglin.png",
  "https://cesartd.github.io/streamtools/src/img/frames/minecraft/skeeleton.png",
  "https://cesartd.github.io/streamtools/src/img/frames/minecraft/spider.png",
  "https://cesartd.github.io/streamtools/src/img/frames/minecraft/steve.png",
  "https://cesartd.github.io/streamtools/src/img/frames/minecraft/villager.png",
  "https://cesartd.github.io/streamtools/src/img/frames/minecraft/villager2.png",
  "https://cesartd.github.io/streamtools/src/img/frames/minecraft/witch.png",
  "https://cesartd.github.io/streamtools/src/img/frames/minecraft/wolf.png",
  "https://cesartd.github.io/streamtools/src/img/frames/minecraft/zombie.png"
];

const randomMaterialColors = [
  '#2E7D32', // Green 800
  '#0277BD', // Light blue 800
  '#00838F', // Cyan50 800
  '#00695C', // Teal50 800 
  '#4527A0', // DeepPurple50 800
  '#283593', // Indigo 800
  '#1565C0', // Blue50 800
  '#FF5252', // Red50 A200
  '#E040FB', // Purple50 A200
  '#EF6C00', // Orange50 800
  '#FF4081', // Pink50 A200
  '#D32F2F', // Red50 700
  '#8E24AA',  // purple50 600
  '#689F38'  // light green 700
];

// WebSocket con Streamer.bot (servidor activo en puerto 8123)
const sbSocket = new WebSocket("ws://localhost:8123");

sbSocket.addEventListener("open", () => {
  console.log("[SSN Overlay] WebSocket conectado con Streamer.bot");
});

sbSocket.addEventListener("error", () => {
  console.warn("[SSN Overlay] No se pudo conectar a Streamer.bot WebSocket");
});

const cooldowns = new Map(); // Guarda el último uso de !batalla por usuario
const cooldownsMemide = new Map(); // Guarda el último uso de !batalla por usuario
const COOLDOWN_MS = 180000; // 3 segundos de cooldown

// Global cooldown
let lastGlobalTriggerTimeCreper = 0;
let lastGlobalTriggerTimeEnderman = 0;
let lastGlobalTriggerTimeHappyBirthday = 0;
let lastGlobalTriggerRaton = 0;
let lastGlobalTriggerTimeTinta = 0;
let lastGlobalTriggerTimeRip = 0;

const GLOBAL_COOLDOWN_MS = 5 * 60 * 1000; // 10 minutos en milisegundos

// Escuchar nuevos mensajes
window.addEventListener('message', (event) => {
  const data = event.data;
  if (!data || !data.dataReceived) return; // Ignorar si no es un mensaje válido

  const messageText = data.dataReceived.overlayNinja.chatmessage.toLowerCase(); // Convertir mensaje a minúsculas
  const username = data.dataReceived.overlayNinja.chatname; // Obtener el nombre de usuario del mensaje
  const badges = data.dataReceived.overlayNinja.chatbadges; // Obtener los badges del mensaje
  const isSub = data.dataReceived.overlayNinja.membership; // Obtener el estado de suscripción
  const type = data.dataReceived.overlayNinja.type; // Obtener el tipo de plataforma

  setTimeout(() => {
    const bubbles = document.querySelectorAll('.hl-content');
    const lastBubble = bubbles[bubbles.length - 1];
    if (!lastBubble) return;

    const bubblesBorder = document.querySelectorAll('.bubble');
    const lastBorder = bubblesBorder[bubblesBorder.length - 1];
    if (!lastBorder) return;

    let isSubscriber = false;

    if (isSub.localeCompare("SUBSCRIBER") == 0) {
      isSubscriber = true;
    }

    if (isSubscriber == true) { // si es suscriptor
      lastBorder.classList.add('sub-border');
      const profilePics = document.querySelectorAll('.hl-leftside');
      const lastProfile = profilePics[profilePics.length - 1];
      if (!lastProfile) return;

      // Verificar si ya existe una imagen con la clase "mod" dentro de lastProfile
      const alreadyHasFrame = lastProfile.querySelector('.custom-frame');

      if (!alreadyHasFrame) {
        // Si no existe, se agrega la nueva imagen
        const customProf = buildGlobalCustomProfile();
        lastProfile.appendChild(customProf);
      }

      // Resaltar el nombre del último usuario
      const userNameContainer = document.querySelectorAll('.hl-righttopline');
      const lastUserNameContainer = userNameContainer[profilePics.length - 1];
      if (!lastUserNameContainer) return;

      // Cambiar el color de fondo del último nombre de usuario
      lastUserNameContainer.style.backgroundColor = 'goldenrod';
    } else {

      if (type.localeCompare("twitch") == 0) {// si es mensaje de Twitch
        lastBorder.classList.add('twitch-border');
      } else {
        const profilePics = document.querySelectorAll('.hl-leftside');
        const lastProfile = profilePics[profilePics.length - 1];
        if (!lastProfile) return;

        // Resaltar el nombre del último usuario
        const userNameContainer = document.querySelectorAll('.hl-righttopline');
        const lastUserNameContainer = userNameContainer[profilePics.length - 1];
        if (!lastUserNameContainer) return;

        const randomColor = randomMaterialColors[Math.floor(Math.random() * randomMaterialColors.length)];

        // Cambiar el color de fondo del último nombre de usuario
        lastUserNameContainer.style.backgroundColor = randomColor;
      }

    }




    let limpio = messageText.replace(/<\/?i>/g, "");

    // Construir el nuevo contenido
    const customContent = buildCustomMessage(limpio);
    lastBubble.innerHTML = '';
    lastBubble.appendChild(customContent);

    const names = document.querySelectorAll('.hl-name');
    const lastName = names[names.length - 1];
    if (!lastName) return;

    // Poner medallas de fans y moderadores
    const customName = buildCustomName(badges, username, isSubscriber, type);
    lastName.innerHTML = '';
    lastName.appendChild(customName);

  }, 50);


  // Detectar comandos y reenviarlos
  if (messageText.startsWith("!creeper")) {

    const now = Date.now();

    if (now - lastGlobalTriggerTimeCreper < GLOBAL_COOLDOWN_MS) {
      showWarningChatMessage(`¡${username} debes esperar un poco la sorpresa esta en camino!`);
    } else {
      lastGlobalTriggerTimeCreper = now;

      if (sbSocket.readyState === WebSocket.OPEN) {
        sbSocket.send(messageText); // Enviar el comando puro a Streamer.bot
      }
    }
  }

  // Detectar comando !enderman y reenviarlo
  if (messageText.startsWith("!enderman")) {

    const now = Date.now();

    if (now - lastGlobalTriggerTimeEnderman < GLOBAL_COOLDOWN_MS) {
      showWarningChatMessage(`¡${username} debes esperar un poco la sorpresa esta en camino!`);
    } else {
      lastGlobalTriggerTimeEnderman = now;

      if (sbSocket.readyState === WebSocket.OPEN) {
        sbSocket.send(messageText); // Enviar el comando puro a Streamer.bot
      }
    }
  }

  // Detectar comando !felizcumple y reenviarlo
  if (messageText.startsWith("!felizcumple")) {

    const now = Date.now();

    if (now - lastGlobalTriggerTimeHappyBirthday < GLOBAL_COOLDOWN_MS) {
      showWarningChatMessage(`¡${username} debes esperar un poco la sorpresa esta en camino!`);
    } else {
      lastGlobalTriggerTimeHappyBirthday = now;

      if (sbSocket.readyState === WebSocket.OPEN) {
        sbSocket.send(messageText); // Enviar el comando puro a Streamer.bot
      }
    }
  }

  // Detectar comando !raton y reenviarlo
  if (messageText.startsWith("!raton")) {

    const now = Date.now();

    if (now - lastGlobalTriggerRaton < GLOBAL_COOLDOWN_MS) {
      showWarningChatMessage(`¡${username} debes esperar un poco la sorpresa esta en camino!`);
    } else {
      lastGlobalTriggerRaton = now;

      if (sbSocket.readyState === WebSocket.OPEN) {
        sbSocket.send(messageText); // Enviar el comando puro a Streamer.bot
      }
    }
  }

  // Detectar comando !raton y reenviarlo
  if (messageText.startsWith("!kumsito")) {

    const now = Date.now();

    if (now - lastGlobalTriggerTimeTinta < GLOBAL_COOLDOWN_MS) {
      showWarningChatMessage(`¡${username} debes esperar un poco la sorpresa esta en camino!`);
    } else {
      lastGlobalTriggerTimeTinta = now;

      if (sbSocket.readyState === WebSocket.OPEN) {
        sbSocket.send(messageText); // Enviar el comando puro a Streamer.bot
      }
    }
  }

  // === COMANDO !MIDE ===
  if (messageText === "!memide" || messageText.startsWith("!memide")) {

    const now = Date.now();
    const lastMedirTriggerTime = cooldownsMemide.get(username) || 0;

    if (now - lastMedirTriggerTime < COOLDOWN_MS) {
      showWarningChatMessage(`⏳ ${username} Debes esperar un poco antes de volver a usar !memide`);

    } else {

      // Registrar nuevo tiempo de uso
      cooldownsMemide.set(username, now);

      // Número aleatorio entre 0 y 40
      const medida = Math.floor(Math.random() * 41);

      // Mostrar el mensaje
      showMedirMessage(`¡Wow! a ${username} le mide ${medida} cm. 🍆`);

    }

  }

  // Detectar comando !raton y reenviarlo
  if (messageText.startsWith("!rip")) {

    const now = Date.now();

    if (now - lastGlobalTriggerTimeRip < GLOBAL_COOLDOWN_MS) {
      showWarningChatMessage(`¡${username} debes esperar un poco la sorpresa esta en camino!`);
    } else {
      lastGlobalTriggerTimeRip = now;

      if (sbSocket.readyState === WebSocket.OPEN) {
        sbSocket.send(messageText); // Enviar el comando puro a Streamer.bot
      }
    }
  }


  if (messageText.startsWith("!batalla")) {

    const now = Date.now();
    const lastUsed = cooldowns.get(username) || 0;

    if (now - lastUsed < COOLDOWN_MS) {
      showWarningChatMessage(`${username} debes esperar un poco para tu proximo enfrentamiento.`);
    } else {

      const msg = messageText.trim();
      const parts = msg.split(" ");

      if (parts[0].toLowerCase() === "!batalla" && parts.length >= 2) {

        // Registrar nuevo tiempo de uso
        cooldowns.set(username, now);

        if (sbSocket.readyState === WebSocket.OPEN) {
          sbSocket.send(messageText); // Enviar el comando puro a Streamer.bot
        }

        const user = username; // Nombre del usuario que envió el mensaje
        const opponent = parts.slice(1).join(" ");

        const players = [user, opponent];
        const winner = players[Math.floor(Math.random() * 2)];

        setTimeout(() => {

          // Mostrar resultado en el overlay como mensaje automático
          showFakeChatMessage(`El ganador es ${winner}`);

        }, 3000);
      }
    }
  }

});


function showFakeChatMessage(text) {
  const container = document.querySelector("#output");

  const msgBox = document.createElement("div");
  msgBox.textContent = text;
  msgBox.className = "highlight-comment";

  container.appendChild(msgBox);

}

function showMedirMessage(text) {
  const container = document.querySelector("#output");

  const msgBox = document.createElement("div");
  msgBox.textContent = text;
  msgBox.className = "highlight-horny-comment";

  container.appendChild(msgBox);

}

function showWarningChatMessage(text) {
  const container = document.querySelector("#output");

  const msgBox = document.createElement("div");
  msgBox.textContent = text;
  msgBox.className = "warning-comment";

  container.appendChild(msgBox);

}

// Decodifica HTML como "<img src=...>" en nodos DOM
function decodeHTML(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.childNodes;
}

function buildCustomMessage(rawMessage) {
  const wrapper = document.createElement('div');
  wrapper.style.display = 'inline-flex';
  wrapper.style.flexWrap = 'wrap';
  wrapper.style.alignItems = 'center';
  wrapper.style.gap = '4px';
  wrapper.style.color = 'white';

  // Convertir el mensaje HTML a nodos DOM
  const nodes = decodeHTML(rawMessage);
  let emoteCount = 0;

  nodes.forEach(node => {
    if (node.nodeType === 3) {
      // Es texto plano, revisar comandos personalizados
      const words = node.textContent.split(/\s+/);

      if (words.length == 1 && emoteCommands[words[0].toLowerCase()]) {
        const img = document.createElement('img');
        img.src = emoteCommands[words[0].toLowerCase()];
        img.style.width = '200px';
        img.style.height = '200px';
        wrapper.appendChild(img);
      } else {
        words.forEach(word => {
          const lower = word.toLowerCase();
          if (emoteCommands[lower] && emoteCount < 5) {
            const img = document.createElement('img');
            img.src = emoteCommands[lower];
            wrapper.appendChild(img);
            emoteCount++;
          } else {
            const textSpan = document.createElement('span');
            textSpan.textContent = word + ' ';
            wrapper.appendChild(textSpan);
          }
        });
      }


    } else if (node.nodeType === 1 && node.tagName === 'IMG') {
      // Es un emote de Twitch (etiqueta <img>)
      const img = document.createElement('img');
      img.src = node.src;
      img.alt = node.alt || '';
      wrapper.appendChild(img);
    } else {
      const words2 = node.textContent.split(/(\s+)/); // Conserva los espacios también

      words2.forEach(word => {
        const lower = word.trim().toLowerCase();

        const span = document.createElement('span');
        span.textContent = word;
        wrapper.appendChild(span);

      });
    }
  });

  return wrapper;
}

function buildCustomName(badges, username, isSubscriber, type) {

  const wrapper = document.createElement('div');
  wrapper.style.display = 'inline-flex';
  wrapper.style.flexWrap = 'wrap';
  wrapper.style.alignItems = 'center';
  wrapper.style.gap = '4px';
  wrapper.style.color = 'white';

  // Nombre de usuario con ícono si es moderador
  const nameSpan = document.createElement('span');
  nameSpan.style.fontWeight = 'bold';
  nameSpan.style.marginRight = '5px';

  if (badges) {
    if (type.localeCompare("twitch") == 0) {
      badges.forEach(function (item) {
        // Si el badge es de moderador, añade el ícono correspondiente
        const modIcon = document.createElement('img');
        modIcon.src = item; // Cambia esto por el ícono que prefieras
        modIcon.style.width = '30px';
        modIcon.style.height = '30px';
        modIcon.style.marginRight = '4px';
        modIcon.style.verticalAlign = 'middle';
        wrapper.appendChild(modIcon);

      });
    } else {
      badges.forEach(function (item) {
        if (typeof item.includes === 'function') {
          if (item.includes("moderater")) {
            // Si el badge es de moderador, añade el ícono correspondiente
            const modIcon = document.createElement('img');
            modIcon.src = 'https://cesartd.github.io/streamtools/src/img/misc/mod_badge.png'; // Cambia esto por el ícono que prefieras
            modIcon.style.width = '30px';
            modIcon.style.height = '30px';
            modIcon.style.marginRight = '4px';
            modIcon.style.verticalAlign = 'middle';
            wrapper.appendChild(modIcon);

          } else if (isSubscriber == true && item.includes("fans")) {
            // Si el badge es de moderador, añade el ícono correspondiente
            const modIcon = document.createElement('img');
            modIcon.src = 'https://cesartd.github.io/streamtools/src/img/misc/heart_icon.png'; // Cambia esto por el ícono que prefieras
            modIcon.style.width = '30px';
            modIcon.style.height = '30px';
            modIcon.style.marginRight = '4px';
            modIcon.style.verticalAlign = 'middle';
            wrapper.appendChild(modIcon);
          }

        }
      });
    }
  }

  if (isSubscriber == false) {
    const profilePics = document.querySelectorAll('.hl-leftside');
    const lastProfile = profilePics[profilePics.length - 1];
    if (!lastProfile) return;

    // Verificar si ya existe una imagen con la clase "mod" dentro de lastProfile
    const alreadyHasFrame = lastProfile.querySelector('.custom-frame');

    if (!alreadyHasFrame) {
      let customProf = "";

      // Si no existe, se agrega la nueva imagen
      customProf = buildGlobalCustomProfile();
      lastProfile.appendChild(customProf);
    }

  }


  nameSpan.textContent = `${username}`;
  wrapper.appendChild(nameSpan);


  return wrapper;
}


function buildGlobalCustomProfile() {

  const randomFrame = avatarFrames[Math.floor(Math.random() * avatarFrames.length)];

  const modIcon = document.createElement('img');
  modIcon.src = randomFrame;
  modIcon.className = 'custom-frame'
  modIcon.style.marginRight = '4px';
  modIcon.style.verticalAlign = 'middle';
  modIcon.style.width = '150%';
  modIcon.style.height = '114px';
  modIcon.style.position = 'relative';
  modIcon.style.float = 'left';
  modIcon.style.bottom = '118px';
  modIcon.style.right = '19px';

  return modIcon;
}


