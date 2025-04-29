// Escuchar nuevos mensajes en el overlay
window.addEventListener('message', (event) => {

    if (!event.data || !event.data.dataReceived) return; // Ignorar si no es un mensaje válido

    const messageText = event.data.dataReceived.overlayNinja.chatmessage.toLowerCase(); // Convertir mensaje a minúsculas


    // Definir los comandos y sus emotes
       // Definir comandos y su respectivo emote (URL de imagen)
       const emoteCommands = {
        '!sangry': 'https://cesartd.github.io/streamtools/src/img/emotes/emote_angry.png',
        '!shaha': 'https://cesartd.github.io/streamtools/src/img/emotes/emote_laugh.png',
        '!ssad': 'https://cesartd.github.io/streamtools/src/img/emotes/emote_sad.png'
    };

    // Crear un contenedor para el nuevo mensaje
    const messageContainer = document.createElement('div');
    messageContainer.style.display = 'flex';
    messageContainer.style.flexWrap = 'wrap';
    messageContainer.style.alignItems = 'center';
    messageContainer.style.margin = '8px';
    messageContainer.style.fontSize = '20px';
    messageContainer.style.fontFamily = 'Arial, sans-serif';
    messageContainer.style.color = 'white';

    // Procesar el mensaje palabra por palabra
    const words = messageText.split(/\s+/);
    let emoteCount = 0;

    words.forEach(word => {
        const lowerWord = word.toLowerCase();
        if (emoteCommands[lowerWord] && emoteCount < 3) {
            const emoteImg = document.createElement('img');
            emoteImg.src = emoteCommands[lowerWord];
            emoteImg.style.width = '30px';
            emoteImg.style.height = '30px';
            emoteImg.style.margin = '0 3px';
            messageContainer.appendChild(emoteImg);
            emoteCount++;
        } else {
            const textSpan = document.createElement('span');
            textSpan.textContent = word + ' ';
            messageContainer.appendChild(textSpan);
        }
    });

    // Agregar el mensaje completo al cuerpo del documento
    document.body.appendChild(messageContainer);
});