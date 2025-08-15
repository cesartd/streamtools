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
  'mtexto': 'https://cesartd.github.io/streamtools/src/img/random/mucho_texto.png',
  'nimodo': 'https://cesartd.github.io/streamtools/src/img/random/nimodo.png',
  'yiyi': 'https://cesartd.github.io/streamtools/src/img/random/pngul.jpg',
  'ff': 'https://cesartd.github.io/streamtools/src/img/random/ff.png',
  'saluditos': 'https://cesartd.github.io/streamtools/src/img/random/hello.gif',
  'jajaja': 'https://cesartd.github.io/streamtools/src/img/random/jaja.png',
  'gg': 'https://cesartd.github.io/streamtools/src/img/random/gg.webp',
  'bye': 'https://cesartd.github.io/streamtools/src/img/random/ebye.gif',
  'hola': 'https://cesartd.github.io/streamtools/src/img/random/saria-hello.gif',
  'jajsja': 'https://cesartd.github.io/streamtools/src/img/random/asasasas.gif'
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
  '#EC407A', // Pink 500
  '#D81B60', // Pink 600
  '#AB47BC', // Purple 500
  '#8E24AA', // Purple 600
  '#7E57C2', // Deep Purple 500
  '#5E35B1', // Deep Purple 600
  '#5C6BC0', // Indigo 500
  '#3949AB', // Indigo 600
  '#42A5F5', // Blue 500
  '#1E88E5', // Blue 600
  '#29B6F6', // Light Blue 400
  '#039BE5', // Light Blue 600
  '#26C6DA', // Cyan 400
  '#00ACC1', // Cyan 600
  '#26A69A', // Teal 400
  '#00897B', // Teal 600
  '#66BB6A', // Green 400
  '#43A047', // Green 600
  '#9CCC65', // Light Green 400
  '#7CB342', // Light Green 600
  '#D4E157', // Lime 400
  '#C0CA33', // Lime 600
  '#FFEE58', // Yellow 400
  '#FDD835', // Yellow 600
  '#FFA726', // Orange 400
  '#FB8C00', // Orange 600
  '#FF7043', // Deep Orange 400
  '#F4511E', // Deep Orange 600
  '#EF5350', // Red 400
  '#E53935'  // Red 600
];

// WebSocket con Streamer.bot (servidor activo en puerto 8123)
const sbSocket = new WebSocket("ws://localhost:8123");
const cooldowns = new Map(); // Guarda el último uso de !batalla por usuario
const cooldownsMemide = new Map(); // Guarda el último uso de !memide por usuario

const cooldownsBailesito = new Map(); // Guarda el último uso de !bailesito por usuario
const cooldownsTinta = new Map(); // Guarda el último uso de !kumsito por usuario
const cooldownsRip = new Map(); // Guarda el último uso de !rip por usuario
const cooldownsCrunchy = new Map(); // Guarda el último uso de !crunchy por usuario
const cooldownsHappyBirthday = new Map(); // Guarda el último uso de !felizcumple por usuario
const cooldownsEnderman = new Map(); // Guarda el último uso de !enderman por usuario
const cooldownsCreeper = new Map(); // Guarda el último uso de !creeper por usuario

const COOLDOWN_1_MIN = 60000; // 1 minuto de cooldown
const GLOBAL_COOLDOWN_MS = 5 * 60 * 1000; // 5 minutos de cooldown global

sbSocket.addEventListener("open", () => {
  console.log("[SSN Overlay] WebSocket conectado con Streamer.bot");
});

sbSocket.addEventListener("error", () => {
  console.warn("[SSN Overlay] No se pudo conectar a Streamer.bot WebSocket");
});


// Escuchar nuevos mensajes
window.addEventListener('message', (event) => {
  const data = event.data;
  if (!data || !data.dataReceived) return; // Ignorar si no es un mensaje válido

  const messageText = data.dataReceived.overlayNinja.chatmessage.toLowerCase(); // Convertir mensaje a minúsculas
  const rawUsername = data.dataReceived.overlayNinja.chatname; // Obtener el nombre de usuario del mensaje
  let username = limpiaNombreDeUsuario(rawUsername); // Limpiar el nombre de usuario
  if(username.length === 0){
    username = "botsito";
  }; // Si el nombre queda vacío, setear uno generico
  const badges = data.dataReceived.overlayNinja.chatbadges; // Obtener los badges del mensaje
  const isSub = data.dataReceived.overlayNinja.membership; // Obtener el estado de suscripción
  const type = data.dataReceived.overlayNinja.type; // Obtener el tipo de plataforma



  // Detectar comandos y reenviarlos
  if (messageText.startsWith("!creeper")) {

    const now = Date.now();
    const lastGlobalTriggerTimeCreper = cooldownsCreeper.get(username) || 0;

    if (now - lastGlobalTriggerTimeCreper < GLOBAL_COOLDOWN_MS) {
      console.log(`¡${username} debes esperar un poco la sorpresa esta en camino!`);
    } else {
      cooldownsCreeper.set(username, now);

      if (sbSocket.readyState === WebSocket.OPEN) {
        sbSocket.send(messageText); // Enviar el comando puro a Streamer.bot
      }
    }
  }

  // Detectar comando !enderman y reenviarlo
  if (messageText.startsWith("!enderman")) {

    const now = Date.now();
    const lastGlobalTriggerTimeEnderman = cooldownsEnderman.get(username) || 0;

    if (now - lastGlobalTriggerTimeEnderman < GLOBAL_COOLDOWN_MS) {
      console.log(`¡${username} debes esperar un poco la sorpresa esta en camino!`);
    } else {
      cooldownsEnderman.set(username, now);

      if (sbSocket.readyState === WebSocket.OPEN) {
        sbSocket.send(messageText); // Enviar el comando puro a Streamer.bot
      }
    }
  }

  // Detectar comando !felizcumple y reenviarlo
  if (messageText.startsWith("!felizcumple")) {

    const now = Date.now();
    const lastGlobalTriggerTimeHappyBirthday = cooldownsHappyBirthday.get(username) || 0;

    if (now - lastGlobalTriggerTimeHappyBirthday < GLOBAL_COOLDOWN_MS) {
      console.log(`¡${username} debes esperar un poco la sorpresa esta en camino!`);
    } else {

      cooldownsHappyBirthday.set(username, now);

      if (sbSocket.readyState === WebSocket.OPEN) {
        sbSocket.send(messageText); // Enviar el comando puro a Streamer.bot
      }
    }
  }

  // Detectar comando !raton y reenviarlo
  if (messageText.startsWith("!bailesito")) {

    const now = Date.now();
    const lastGlobalTriggerBailesito = cooldownsBailesito.get(username) || 0;

    if (now - lastGlobalTriggerBailesito < GLOBAL_COOLDOWN_MS) {
      console.log(`¡${username} debes esperar un poco la sorpresa esta en camino!`);
    } else {
      cooldownsBailesito.set(username, now);

      if (sbSocket.readyState === WebSocket.OPEN) {
        sbSocket.send(messageText); // Enviar el comando puro a Streamer.bot
      }
    }
  }

  // Detectar comando !raton y reenviarlo
  if (messageText.startsWith("!kumsito")) {

    const now = Date.now();
    const lastGlobalTriggerTimeTinta = cooldownsTinta.get(username) || 0;

    if (now - lastGlobalTriggerTimeTinta < GLOBAL_COOLDOWN_MS) {
      console.log(`¡${username} debes esperar un poco la sorpresa esta en camino!`);
    } else {
      cooldownsTinta.set(username, now);

      if (sbSocket.readyState === WebSocket.OPEN) {
        sbSocket.send(messageText); // Enviar el comando puro a Streamer.bot
      }
    }
  }

  
  // Detectar comando !raton y reenviarlo
  if (messageText.startsWith("!rip")) {

    const now = Date.now();
    const lastGlobalTriggerTimeRip = cooldownsRip.get(username) || 0;

    if (now - lastGlobalTriggerTimeRip < GLOBAL_COOLDOWN_MS) {
      console.log(`¡${username} debes esperar un poco la sorpresa esta en camino!`);
    } else {
      cooldownsRip.set(username, now);

      if (sbSocket.readyState === WebSocket.OPEN) {
        sbSocket.send(messageText); // Enviar el comando puro a Streamer.bot
      }
    }
  }

    // Detectar comando !raton y reenviarlo
  if (messageText.startsWith("!crunchy")) {

    const now = Date.now();
    const lastGlobalTriggerTimeCrunchy = cooldownsCrunchy.get(username) || 0;

    if (now - lastGlobalTriggerTimeCrunchy < GLOBAL_COOLDOWN_MS) {
      console.log(`¡${username} debes esperar un poco la sorpresa esta en camino!`);
    } else {
      cooldownsCrunchy.set(username, now);

      if (sbSocket.readyState === WebSocket.OPEN) {
        sbSocket.send(messageText); // Enviar el comando puro a Streamer.bot
      }
    }
  }

  // === COMANDO !MIDE ===
  if (messageText === "!memide" || messageText.startsWith("!memide")) {

    const now = Date.now();
    const lastMedirTriggerTime = cooldownsMemide.get(username) || 0;

    if (now - lastMedirTriggerTime < COOLDOWN_1_MIN) {
      console.log(` ${username} debes esperar un poco antes de volver a usar !memide`);
    } else {
      // Registrar nuevo tiempo de uso
      cooldownsMemide.set(username, now);

      // Número aleatorio entre 0 y 40
      const medida = Math.floor(Math.random() * 41);

      // Mostrar el mensaje
      showMedirMessage(`¡Wow! a ${rawUsername} le mide ${medida} cm. 🍆`);

    }

  }

  if (messageText.startsWith("!batalla")) {

    const now = Date.now();
    const lastUsed = cooldowns.get(username) || 0;

    if (now - lastUsed < COOLDOWN_1_MIN) {
      console.log(`${username} debes esperar un poco para tu proximo enfrentamiento.`);
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

        //const randomColor = randomMaterialColors[Math.floor(Math.random() * randomMaterialColors.length)];
        const randomColor = '#8E24AA'; // Morado material 600
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
    const customName = buildCustomName(badges, rawUsername, isSubscriber, type);
    lastName.innerHTML = '';
    lastName.appendChild(customName);

  }, 50);

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


  nameSpan.textContent = `${username}`;
  wrapper.appendChild(nameSpan);


  return wrapper;
}

function limpiaNombreDeUsuario(nombre) {
  return nombre.replace(/[^\w\s]/gi, '').trim(); // Conserva letras, números y espacios
}
