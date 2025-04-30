// Configura tus comandos y sus respectivas URLs de emotes aquí
const emoteCommands = {
    '!sangry': 'https://cesartd.github.io/streamtools/src/img/emotes/emote_angry.png',
    '!shaha': 'https://cesartd.github.io/streamtools/src/img/emotes/emote_laugh.png',
    '!ssad': 'https://cesartd.github.io/streamtools/src/img/emotes/emote_sad.png'
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

    setTimeout(() => {
        const bubbles = document.querySelectorAll('.hl-content');
        const lastBubble = bubbles[bubbles.length - 1];
        if (!lastBubble) return;

        // Construir el nuevo contenido
        const customContent = buildCustomMessage(messageText);
        lastBubble.innerHTML = '';
        lastBubble.appendChild(customContent);
    }, 50);
});

function buildCustomMessage(rawMessage) {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'inline-flex';
    wrapper.style.flexWrap = 'wrap';
    wrapper.style.alignItems = 'center';
    wrapper.style.gap = '4px';
    wrapper.style.fontSize = '20px';
    wrapper.style.fontFamily = 'Arial, sans-serif';
    wrapper.style.color = 'white';

    // Convertir el mensaje HTML a nodos DOM
    const nodes = decodeHTML(rawMessage);
    let emoteCount = 0;

    nodes.forEach(node => {
        if (node.nodeType === 3) {
            // Es texto plano, revisar comandos personalizados
            const words = node.textContent.split(/\s+/);
            words.forEach(word => {
                const lower = word.toLowerCase();
                if (emoteCommands[lower] && emoteCount < 3) {
                    const img = document.createElement('img');
                    img.src = emoteCommands[lower];
                    img.style.width = '28px';
                    img.style.height = '28px';
                    wrapper.appendChild(img);
                    emoteCount++;
                } else {
                    const textSpan = document.createElement('span');
                    textSpan.textContent = word + ' ';
                    wrapper.appendChild(textSpan);
                }
            });
        } else if (node.nodeType === 1 && node.tagName === 'IMG') {
            // Es un emote de Twitch (etiqueta <img>)
            const img = document.createElement('img');
            img.src = node.src;
            img.alt = node.alt || '';
            img.style.width = '28px';
            img.style.height = '28px';
            wrapper.appendChild(img);
        }
    });

    return wrapper;
}