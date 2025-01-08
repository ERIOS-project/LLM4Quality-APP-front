export const uploadCsv = (fileContent: string) => {
    const socket = new WebSocket(`${import.meta.env.VITE_API_URL.replace(/^http/, 'ws')}/ws`);
  
    socket.onopen = () => {
      console.log('WebSocket connection opened');
      const message = {
        action: "CSV",
        file: fileContent,
      };
      socket.send(JSON.stringify(message));
    };
  
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Message reçu:', data); // Imprimer les messages reçus
    };
  
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  
    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };
  };