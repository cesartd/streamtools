// Este script se carga en el overlay de Social Stream Ninja

// Escuchar nuevos mensajes en el overlay
window.addEventListener('message', (event) => {
    if (!event.data || !event.data.message) return; // Ignorar si no es un mensaje válido

    const messageText = event.data.message.toLowerCase(); // Convertir mensaje a minúsculas

    // Definir comandos y su respectivo emote (URL de imagen)
    const emoteCommands = {
        '!sangry': 'https://cesartd.github.io/streamtools/emotes/emote_angry.png',
        '!shaha': 'https://cesartd.github.io/streamtools/emotes/emote_laugh.png',
        '!ssad': 'https://cesartd.github.io/streamtools/emotes/emote_sad.png'
    };

    // Detectar todos los comandos en el mensaje
    const foundEmotes = [];
    for (const [command, emoteUrl] of Object.entries(emoteCommands)) {
        if (messageText.includes(command)) {
            foundEmotes.push(emoteUrl);
            if (foundEmotes.length >= 3) break; // Solo mostrar hasta 3 emotes por mensaje
        }
    }

    // Mostrar cada emote encontrado
    foundEmotes.forEach(emoteUrl => {
        showEmote(emoteUrl);
    });
});

// Función para mostrar el emote en pantalla
function showEmote(emoteUrl) {
    const emote = document.createElement('img');
    emote.src = emoteUrl;
    emote.style.position = 'absolute';
    emote.style.left = `${Math.random() * 80 + 10}%`; // Aparece en posición aleatoria horizontal
    emote.style.top = `${Math.random() * 60 + 20}%`;  // Aparece en posición aleatoria vertical
    emote.style.width = '100px'; // Tamaño del emote
    emote.style.zIndex = 1000;
    emote.style.opacity = 1;

    document.body.appendChild(emote);

    // ❌ No desaparecen automáticamente (se quedan hasta que recargues la página)
}
