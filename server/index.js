const app = require('./app');
const { syncAndSeed } = require('./models');
const PORT = process.env.PORT || 8888;

app.listen(PORT, () => { console.log(`---> http://localhost:${PORT} <---`) })

syncAndSeed();
