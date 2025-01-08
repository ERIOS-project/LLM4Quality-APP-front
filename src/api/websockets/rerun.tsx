import Verbatim from '../../models/Verbatim';

export const rerunClassification = (verbatims: Verbatim[]) => {
  const socket = new WebSocket(`${import.meta.env.VITE_API_URL.replace(/^http/, 'ws')}/ws`);

  socket.onopen = () => {
    const message = {
      action: "RERUN",
      verbatims: verbatims.map(verbatim => ({
        _id: verbatim._id,
        content: verbatim.content,
        status: verbatim.status,
        result: verbatim.result,
        year: verbatim.year,
        created_at: verbatim.created_at,
      })),
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