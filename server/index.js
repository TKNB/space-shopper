const app = require('./app');
const { sync } = require('./models');
const PORT = process.env.PORT || 8888;

app.listen(PORT, () => { console.log(`---> http://localhost:${PORT} <---`) })

sync();
