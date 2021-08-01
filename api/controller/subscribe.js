const clients = {};

module.exports = {
  clientSubscribe: async (req, res) => {
    const { id: gameId } = req.game;
    console.log(req.game);
    res.status(200).set({
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-control': 'no-cache',
    });

    const data = `data: ${JSON.stringify(req.game)}\n\n`;

    res.write(data);
    const clientId = Date.now();

    const newClient = {
      id: clientId,
      res,
    };

    if (!clients[gameId]) clients[gameId] = [];
    clients[gameId] = [...clients[gameId], newClient];

    req.on('close', () => {
      console.log(`${clientId} connection closed`);
      clients[gameId] = clients[gameId].filter((client) => client.id !== clientId);
    });
  },
  sendClientUpdates: async ({ game }, res, next) => {
    const { id: gameId } = game;
    const subscribers = clients[gameId] || [];

    subscribers.forEach((client) => {
      client.res.write(`data: ${JSON.stringify(game)}\n\n`);
    });
    next();
  },
};
