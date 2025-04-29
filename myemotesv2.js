// Configura tus comandos y sus respectivas URLs de emotes aquí
 const emoteCommands = {
    '!sangry': 'https://cesartd.github.io/streamtools/src/img/emotes/emote_angry.png',
    '!shaha': 'https://cesartd.github.io/streamtools/src/img/emotes/emote_laugh.png',
    '!ssad': 'https://cesartd.github.io/streamtools/src/img/emotes/emote_sad.png'
};

// Interceptar los mensajes cuando llegan al overlay
window.addEventListener('message', (event) => {
    const data = event.data;
    if (!event.data || !event.data.dataReceived) return; // Ignorar si no es un mensaje válido

    const messageText = event.data.dataReceived.overlayNinja.chatmessage.toLowerCase(); // Convertir mensaje a minúsculas

    // Esperar un breve momento para que el div de Social Stream Ninja se cree
    setTimeout(() => {
        // Buscar el último burbuja de mensaje que apareció
        const bubbles = document.querySelectorAll('.hl-content');
        const lastBubble = bubbles[bubbles.length - 1];

        if (!lastBubble) return;

        // Reemplazar su contenido
        const customContent = buildCustomMessage(messageText);
        lastBubble.innerHTML = ''; // Vaciar contenido original
        lastBubble.appendChild(customContent);
    }, 50); // Esperar 50 ms para asegurar que el mensaje original ya fue renderizado
});

// Construye el nuevo contenido con texto y emotes
function buildCustomMessage(message) {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'inline-flex';
    wrapper.style.flexWrap = 'wrap';
    wrapper.style.alignItems = 'center';
    wrapper.style.gap = '4px';
    wrapper.style.fontSize = '20px';
    wrapper.style.fontFamily = 'Arial, sans-serif';
    wrapper.style.color = 'white';

    // Procesar mensaje palabra por palabra
    const words = message.split(/\s+/);
    let emoteCount = 0;

    words.forEach(word => {
        const lower = word.toLowerCase();
        if (emoteCommands[lower] && emoteCount < 3) {
            const img = document.createElement('img');
            img.src = emoteCommands[lower];
            img.style.verticalAlign = 'middle';
            wrapper.appendChild(img);
            emoteCount++;
        } else {
            const textSpan = document.createElement('span');
            textSpan.textContent = word + ' ';
            wrapper.appendChild(textSpan);
        }
    });

    return wrapper;
}