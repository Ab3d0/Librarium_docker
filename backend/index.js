import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


app.get('/livres', (req, res) => {
    db.query('SELECT * FROM livres ', (err, results) => {
        if(err) return res.status(500).send(err);
        res.json(results);
    });
});

app.post('/livres', (req, res) => {
    const { titre, auteur, date, resume, couverture } = req.body;
    db.query(
        'INSERT INTO livres (titre , auteur, date , resumé , couverture ) VALUES (? , ? , ? ,? ,? )',
        [titre, auteur, date, resume, couverture],
        (err, result) => {
            if(err) return res.status(500).send(err);
            res.json({id : result.insertId , message: 'Livre ajouté ' });
        }
    );
});

app.put('/livres/:id' , (req, res) => {
    const { id } = req.params;
    const { titre, auteur, date, resume, couverture } = req.body;
    db.query(
        'UPDATE livres SET titre=?, auteur=?, date=?, resume=?, couverture=?, WHERE id=?',
        [titre, auteur, date, resume, couverture, id],
        (err) => {
            if (err) return res.status(500).send(err);
            res.json({ message: 'Livre modifié '});

        }
    );
});


app.delete('/livres/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM livres WHERE id=?', [id], (err)=> {
        if(err) return res.status(500).send(err);
        res.json({ message: 'Livre supprimé' });

    });

});

app.listen(PORT, () => {
    console.log(`Serveur backend en écoute sur http://localhost:${PORT}`);
})

