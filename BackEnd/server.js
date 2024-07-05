const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());

// Configuración de PostgreSQL
const pool = new Pool({
    user: 'postgres', 
    host: 'localhost',
    database: 'karsevid_bd',
    password: '1234', 
    port: 5432,
});

app.get('/api/databag/obtener', async (req, res) => {
    try {
        const result = await pool.query('SELECT data FROM boards_collection WHERE id = 1');
        if (result.rows.length > 0) {
            res.json({ codigo: 200, mensaje: JSON.stringify(result.rows[0].data) });
        } else {
            res.status(404).json({ codigo: 404, mensaje: 'No se encontraron datos' });
        }
    } catch (err) {
        res.status(500).json({ codigo: 500, mensaje: 'Error al obtener los datos' });
    }
});

app.post('/api/databag/guardar', async (req, res) => {
    const { databag_storage } = req.body;
    try {
        await pool.query(
            'INSERT INTO boards_collection (id, data) VALUES (1, $1) ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data',
            [databag_storage]
        );
        res.json({ codigo: 200, mensaje: 'Estado guardado correctamente' });
    } catch (err) {
        res.status(500).json({ codigo: 500, mensaje: 'Error al guardar los datos' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
