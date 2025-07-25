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

.bubble.twitch-border {
  border: 2px solid transparent !important;
  border-radius: 16px !important;
  background: linear-gradient(135deg, rgba(187, 87, 245, 0.5), rgba(30, 40, 41, 0.6)) !important;
  animation: rainbowGlow 3s ease-in-out infinite;
  padding: 8px !important;
  margin: 8px 0 !important;
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

      // Construir el nuevo estilo de perfil del suscriptor
      const customProf = buildGlobalCustomProfile();
      lastProfile.appendChild(customProf);

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
});

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
        modIcon.alt = 'badge';
        modIcon.style.width = '30px';
        modIcon.style.height = '30px';
        modIcon.style.marginRight = '4px';
        modIcon.style.verticalAlign = 'middle';
        wrapper.appendChild(modIcon);

      });
    } else {
      badges.forEach(function (item) {
        if (item.includes("moderater")) {
          // Si el badge es de moderador, añade el ícono correspondiente
          const modIcon = document.createElement('img');
          modIcon.src = 'https://cesartd.github.io/streamtools/src/img/misc/mod_badge.png'; // Cambia esto por el ícono que prefieras
          modIcon.alt = 'Mod';
          modIcon.style.width = '30px';
          modIcon.style.height = '30px';
          modIcon.style.marginRight = '4px';
          modIcon.style.verticalAlign = 'middle';
          wrapper.appendChild(modIcon);

        } else if (isSubscriber == true && item.includes("fans")) {
          // Si el badge es de moderador, añade el ícono correspondiente
          const modIcon = document.createElement('img');
          modIcon.src = 'https://cesartd.github.io/streamtools/src/img/misc/heart_icon.png'; // Cambia esto por el ícono que prefieras
          modIcon.alt = 'Mod';
          modIcon.style.width = '30px';
          modIcon.style.height = '30px';
          modIcon.style.marginRight = '4px';
          modIcon.style.verticalAlign = 'middle';
          wrapper.appendChild(modIcon);
        }

      });
    }
  }

  if (isSubscriber == false) {
    const profilePics = document.querySelectorAll('.hl-leftside');
    const lastProfile = profilePics[profilePics.length - 1];
    if (!lastProfile) return;

    let customProf = "";

    customProf = buildGlobalCustomProfile()

    lastProfile.appendChild(customProf);
  }


  nameSpan.textContent = `${username}`;
  wrapper.appendChild(nameSpan);


  return wrapper;
}

function buildCustomProfilePicTopGifter() {



  const modIcon = document.createElement('img');
  modIcon.src = 'https://cesartd.github.io/streamtools/src/img/misc/top_gifter_border2.png'; // Cambia esto por el ícono que prefieras
  modIcon.alt = 'TopGifter';
  modIcon.className = 'mod'
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

function buildCustomProfilePicFans(tier) {

  const fanIcon = document.createElement('img');

  if (tier == 1) {
    fanIcon.src = 'https://cesartd.github.io/streamtools/src/img/frames/set3-member-tier-1.png'; // Cambia esto por el ícono que prefieras
  } else if (tier == 2) {
    fanIcon.src = 'https://cesartd.github.io/streamtools/src/img/frames/set3-member-tier-2.png'; // Cambia esto por el ícono que prefieras
  } else if (tier == 3) {
    fanIcon.src = 'https://cesartd.github.io/streamtools/src/img/frames/set3-member-tier-3.png'; // Cambia esto por el ícono que prefieras
  }

  fanIcon.alt = 'member';
  fanIcon.className = 'mod'
  fanIcon.style.marginRight = '4px';
  fanIcon.style.verticalAlign = 'middle';
  fanIcon.style.width = '150%';
  fanIcon.style.height = '114px';
  fanIcon.style.position = 'relative';
  fanIcon.style.float = 'left';
  fanIcon.style.bottom = '118px';
  fanIcon.style.right = '19px';

  return fanIcon;
}

function buildCustomProfilePicSubscriber() {

  const modIcon = document.createElement('img');
  modIcon.src = 'https://cesartd.github.io/streamtools/src/img/misc/border_sub.png'; // Cambia esto por el ícono que prefieras
  modIcon.alt = 'Sub';
  modIcon.className = 'mod'
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

function buildGlobalCustomProfile() {

  const randomFrame = avatarFrames[Math.floor(Math.random() * avatarFrames.length)];

  const modIcon = document.createElement('img');
  modIcon.src = randomFrame; // Cambia esto por el ícono que prefieras
  modIcon.alt = 'generalUser';
  modIcon.className = 'mod'
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


