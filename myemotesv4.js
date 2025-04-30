// Configura tus comandos y sus respectivas URLs de emotes aquí
const emoteCommands = {
    '!sangry': 'https://cesartd.github.io/streamtools/src/img/emotes/emote_angry.png',
    '!shaha': 'https://cesartd.github.io/streamtools/src/img/emotes/emote_laugh.png',
    '!ssad': 'https://cesartd.github.io/streamtools/src/img/emotes/emote_sad.png'
};

// Decodifica HTML como <img src=...> o texto con emojis
function decodeHTML(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.childNodes;
}

window.addEventListener('message', (event) => {
    const data = event.data;
    if (!data || !data.dataReceived) return; // Ignorar si no es un mensaje válido

    const messageText = data.dataReceived.overlayNinja.chatmessage.toLowerCase(); // Convertir mensaje a minúsculas


    setTimeout(() => {
        const bubbles = document.querySelectorAll('.hl-content');
        const lastBubble = bubbles[bubbles.length - 1];
        if (!lastBubble) return;

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
    wrapper.style.fontFamily = '"Segoe UI Emoji", "Apple Color Emoji", Arial, sans-serif';
    wrapper.style.color = 'white';


    const nodes = decodeHTML(rawMessage);
    let emoteCount = 0;

    nodes.forEach(node => {
        if (node.nodeType === 3) {
            // Texto plano (posiblemente con emojis)
            const words = node.textContent.split(/(\s+)/); // Conserva los espacios también

            words.forEach(word => {
                const lower = word.trim().toLowerCase();
                if (emoteCommands[lower] && emoteCount < 3) {
                    const img = document.createElement('img');
                    img.src = emoteCommands[lower];
                    img.style.width = '28px';
                    img.style.height = '28px';
                    wrapper.appendChild(img);
                    emoteCount++;
                } else {
                    const span = document.createElement('span');
                    span.textContent = word;
                    wrapper.appendChild(span);
                }
            });
        } else if (node.nodeType === 1 && node.tagName === 'IMG') {
            // Emote HTML (como los de Twitch)
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