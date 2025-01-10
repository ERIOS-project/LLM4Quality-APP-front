import { eventEmitter } from './simpleEventEmitter';

function encodeToBase64(input : string) : string{
  // Convert the input string to a Uint8Array
  const utf8Encoder = new TextEncoder();
  const byteArray = utf8Encoder.encode(input);

  // Convert the Uint8Array to a Base64 string
  let binaryString = "";
  byteArray.forEach((byte) => {
    binaryString += String.fromCharCode(byte);
  });
  return btoa(binaryString);
}

export const uploadCsv = (
  fileContent: string,
  onSuccess: () => void,
  onError: () => void
) => {
  const socket = new WebSocket(`${import.meta.env.VITE_API_URL.replace(/^http/, 'ws')}/ws`);

  socket.onopen = () => {
    console.log('WebSocket connection opened');
    // Encode the file content to base64 utf-8
    const fileBase64 = encodeToBase64(fileContent);
    console.log("File base64:", fileBase64);
    const message = {
      action: "CSV",
      file: fileBase64, // Send the base64 encoded string
    };
    socket.send(JSON.stringify(message));
    onSuccess(); // Appeler onSuccess lorsque la connexion WebSocket est ouverte avec succès
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
  
    // Vérifiez si le message contient un Verbatim valide
    if (data.status !== 'CSV processed') {
      // Émettre un événement "newVerbatim" uniquement pour les messages valides
      eventEmitter.emit('newVerbatim', data);
    } else {
      console.log('Message non valide reçu, ignoré :', data);
    }
  };
  

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
    onError();
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed');
  };
};
