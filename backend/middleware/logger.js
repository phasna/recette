// Middleware de logging des requêtes
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const ip = req.ip || req.connection.remoteAddress;

  console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);

  // Log de la réponse
  const originalSend = res.send;
  res.send = function (data) {
    console.log(`[${timestamp}] Response: ${res.statusCode}`);
    originalSend.call(this, data);
  };

  next();
};

// Middleware de logging des erreurs
const errorLogger = (err, req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const ip = req.ip || req.connection.remoteAddress;

  console.error(`[${timestamp}] ERROR ${method} ${url} - IP: ${ip}`);
  console.error(`[${timestamp}] Error details:`, err);

  next(err);
};

export { logger, errorLogger };
