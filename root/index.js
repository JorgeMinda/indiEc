const app = require("./app");

const PORT = app.get('port') || 9000;

app.listen(PORT, () => {
  console.log(`🚀 API escuchando en http://localhost:${PORT}`);
});
