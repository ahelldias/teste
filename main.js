const express = require('express');
const fs = require('fs');
const cors = require('cors'); // Permite acesso pelo frontend
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let statusAtual = {
  status: 'Indefinido',
  data: new Date().toISOString()
};

// Rota para receber o status do ESP32
app.post('/status', (req, res) => {
  const { status } = req.body;
  if (status) {
    statusAtual = {
      status,
      data: new Date().toISOString()
    };

    // Opcional: salvar em um arquivo
    fs.writeFileSync('status_chuva.json', JSON.stringify(statusAtual, null, 2));

    res.send('Status atualizado');
  } else {
    res.status(400).send('Parâmetro "status" ausente');
  }
});

// Rota para o frontend consultar o status atual
app.get('/status', (req, res) => {
  res.json(statusAtual);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
