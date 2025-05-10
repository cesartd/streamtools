const styleTag = document.createElement('style');
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

.bubble.top-gifter-border {
  border: 2px solid gold !important;
  border-radius: 16px !important;
  animation: goldPulse 2s ease-in-out infinite;
  background-color: #161c25d6 !important;
  padding: 8px !important;
  margin: 8px !important;
}

.bubble.subscriber-border {
  border: 2px solid transparent !important;
  border-radius: 16px !important;
  background: linear-gradient(135deg, rgba(255,77,219,0.2), rgba(73,224,255,0.2)) !important;
  animation: rainbowGlow 3s ease-in-out infinite;
  padding: 8px !important;
  margin: 8px 0 !important;
}

`;
document.head.appendChild(styleTag);

// Configura tus comandos y sus respectivas URLs de emotes aquí
const emoteCommands = {
    'sangry': 'https://cesartd.github.io/streamtools/src/img/emotes/emote_angry.png',
    'shaha': 'https://cesartd.github.io/streamtools/src/img/emotes/emote_laugh.png',
    'ssad': 'https://cesartd.github.io/streamtools/src/img/emotes/emote_sad.png',
    'sbonk': 'https://cesartd.github.io/streamtools/src/img/emotes/emote_bonk.png',
    'syumi': 'https://cesartd.github.io/streamtools/src/img/emotes/emote_eat.png',
    'sflor': 'https://cesartd.github.io/streamtools/src/img/emotes/emote_flower.png',
    'sgun': 'https://cesartd.github.io/streamtools/src/img/emotes/emote_gun.png',
    'ssusto': 'https://cesartd.github.io/streamtools/src/img/emotes/emote_scary.png',
    'ssueno': 'https://cesartd.github.io/streamtools/src/img/emotes/emote_sleepy.png',
    'spiensa': 'https://cesartd.github.io/streamtools/src/img/emotes/emote_think.png',
    'sfeli': 'https://cesartd.github.io/streamtools/src/img/emotes/emote_happy.png',
    'chuerk': 'https://cesartd.github.io/streamtools/src/img/emotes/anim_shrek.gif'
};

// Decodifica HTML como "<img src=...>" en nodos DOM
function decodeHTML(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.childNodes;
}

// Escuchar nuevos mensajes
window.addEventListener('message', (event) => {
    const data = event.data;
    if (!data || !data.dataReceived) return; // Ignorar si no es un mensaje válido

    const messageText = data.dataReceived.overlayNinja.chatmessage.toLowerCase(); // Convertir mensaje a minúsculas
    const username = data.dataReceived.overlayNinja.chatname;
    const badges = data.dataReceived.overlayNinja.chatbadges; // Obtener los badges del mensaje
    const isSub = data.dataReceived.overlayNinja.membership;

    setTimeout(() => {
        const bubbles = document.querySelectorAll('.hl-content');
        const lastBubble = bubbles[bubbles.length - 1];
        if (!lastBubble) return;

        const bubblesBorder = document.querySelectorAll('.bubble');
        const lastBorder = bubblesBorder[bubblesBorder.length - 1];
        if (!lastBorder) return;

        let isSubscriber = false;

        if(isSub.localeCompare("SUBSCRIBER") == 0){
            isSubscriber = true;
        }

        if(badges && isSubscriber==false){
        
            badges.forEach(function(item) {
                if (item.includes("top_gifter")) {

                    lastBorder.classList.add('top-gifter-border');
                    
                    const profilePics = document.querySelectorAll('.hl-leftside');
                    const lastProfile = profilePics[profilePics.length - 1];
                    if (!lastProfile) return;

                    

                     // Construir el nuevo contenido
                    const customProf = buildCustomProfilePicTopGifter();
                    lastProfile.appendChild(customProf);

                    const userNameContainer = document.querySelectorAll('.hl-righttopline');
                    const lastUserNameContainer = userNameContainer[profilePics.length - 1];
                    if (!lastUserNameContainer) return;

                    lastUserNameContainer.style.backgroundColor = 'goldenrod';

                }
            })
        }else if(isSubscriber==true){
            lastBorder.classList.add('subscriber-border');
            const profilePics = document.querySelectorAll('.hl-leftside');
            const lastProfile = profilePics[profilePics.length - 1];
            if (!lastProfile) return;

              // Construir el nuevo contenido
              const customProf = buildCustomProfilePicSubscriber();
              lastProfile.appendChild(customProf);
        }


        // Construir el nuevo contenido
        const customContent = buildCustomMessage(messageText);
        lastBubble.innerHTML = '';
        lastBubble.appendChild(customContent);

        const names = document.querySelectorAll('.hl-name');
        const lastName = names[names.length - 1];
        if (!lastName) return;

        const customName = buildCustomName(badges, username);
        lastName.innerHTML = '';
        lastName.appendChild(customName);

    }, 50);
});

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

            if(words.length==1 && emoteCommands[words[0].toLowerCase()]){
                const img = document.createElement('img');
                img.src = emoteCommands[words[0].toLowerCase()];
                img.style.width = '200px';
                img.style.height = '200px';
                wrapper.appendChild(img);
                return;

            }else{
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
        }else{
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

function buildCustomName(badges, username) {

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
     
     if(badges){
        
        badges.forEach(function(item) {
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

        } else if (item.includes("fans")) {
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


