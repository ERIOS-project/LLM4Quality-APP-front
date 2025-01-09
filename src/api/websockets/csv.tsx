import { eventEmitter } from './simpleEventEmitter';

export const uploadCsv = (
  fileContent: string,
  onSuccess: () => void,
  onError: () => void
) => {
  const socket = new WebSocket(`${import.meta.env.VITE_API_URL.replace(/^http/, 'ws')}/ws`);

  socket.onopen = () => {
    console.log('WebSocket connection opened');
    const message = {
      action: "CSV",
      file: fileContent,
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
