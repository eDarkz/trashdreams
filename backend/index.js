const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port =  process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Configuración de la conexión a la base de datos
const dbConfig = {
    host: "localhost",
    port: 3306,   
    user: "root",
    password: "",
    database: "trashdreams"
};

// Endpoint para guardar datos
app.post('/saveData', (req, res) => {
    const db = mysql.createConnection(dbConfig);

 //  const { tipo, cantidad, procedencia, fecha } = req.body;
   // const { fecha, cantidad, tipo, procedencia } = req.body;
   const fecha=  req.body.date
   const cantidad=  req.body.quantity
   const tipo= req.body.residueType
   const procedencia= req.body.site
    const query = 'INSERT INTO basura (fecha, cantidad, tipo, procedencia) VALUES (?, ?, ?, ?)';

    db.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            res.status(500).send('Error connecting to the database');
            return;
        }

        db.query(query, [fecha, cantidad, tipo, procedencia], (err, result) => {
            if (err) {
                console.error('Error inserting data:', err);
                res.status(500).send('Error saving data');
            } else {
                res.status(200).send('Data saved successfully');
            }

            db.end((err) => {
                if (err) {
                    console.error('Error disconnecting from the database:', err);
                }
            });
        });
    });
});

// Endpoint para consultar datos en un rango de fechas
app.get('/getDataByDate', (req, res) => {
    const db = mysql.createConnection(dbConfig);
    const { startDate, endDate } = req.query;

    const query = 'SELECT * FROM basura WHERE fecha BETWEEN ? AND ?';

    db.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            res.status(500).send('Error connecting to the database');
            return;
        }

        db.query(query, [startDate, endDate], (err, results) => {
            if (err) {
                console.error('Error querying data:', err);
                res.status(500).send('Error retrieving data');
            } else {
                res.status(200).json(results);
            }

            db.end((err) => {
                if (err) {
                    console.error('Error disconnecting from the database:', err);
                }
            });
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
