const express = require('express')
const path = require('path')
const bodyParser = require('body-parser').json();
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

express()
  //.get('/user', bodyParser, async (req, res) => {
  //  try {
  //    const client = await pool.connect()
  //    const result = await client.query('SELECT * FROM test_table');
  //    const results = { 'results': (result) ? result.rows : null};
  //    res.render('route/user/get', results );
  //    client.release();
  //  } catch (err) {
  //    console.error(err);
  //    res.send("Error " + err);
  //  }
  //})

  //Utilisateur
  .get('/utilisateur', bodyParser, async (req, res) => {
    try{
      //Retour : Toutes les données utilisateurs.
      const client = await pool.connect()
      let id = req.query.id;
      console.log(id);
      const result = await client.query('SELECT * FROM utilisateur WHERE id = '+id+';');
      //const results = { 'results': (result) ? result.rows : null};

      res.json({success: 'true', result:result.rows})
    } catch(err) {
      res.json({success: 'false', error:err})
    }
  })
  .post('/utilisateur', bodyParser, async (req, res) => {
    try{
      //Retour : créer un utilisateur.
      const client = await pool.connect()

      console.log(typeof(req.body.nom));

      let mail = "'"+req.body.mail+"'";
      let nom = "'"+req.body.nom+"'";
      let prenom = "'"+req.body.prenom+"'";
      let photo = "'"+req.body.photo+"'";
      let pwd = "'"+req.body.pwd+"'";

      const result = await client.query("INSERT INTO utilisateur (mail, nom, prenom, photo, pwd) VALUES ("+mail+", "+nom+", "+prenom+", "+photo+", "+pwd+");");
      res.json({success: 'true'})
    } catch(err) {
      res.json({success: 'false', error:err})
    }
  })
  .put('/utilisateur', bodyParser, async (req, res) => {
    try{
      //Retour : Modifier le profil utilisateur.
      const client = await pool.connect()

      let id = req.query.id;
      let mail = "'"+req.body.mail+"'";
      let nom = "'"+req.body.nom+"'";
      let prenom = "'"+req.body.prenom+"'";
      let photo = "'"+req.body.photo+"'";
      let pwd = "'"+req.body.pwd+"'";

      console.log({id, mail, nom, prenom, photo, pwd})
      const result = await client.query("UPDATE utilisateur SET mail = "+mail+", nom =  "+nom+", prenom = "+prenom+", photo = "+photo+", pwd = "+pwd+" WHERE id = "+id+";");
      res.json({success: 'true'})
    } catch(err) {
      res.json({success: 'false', error:err})
    }
  })

  //gamelle
  .get('/gamelle', bodyParser, async (req, res) => {
    try{
      //Retour : les paramètres de la gamelle (fréquence etc...).
      const client = await pool.connect()
      let id = req.query.id_utilisateur;
      //console.log(id); 
      const results = await client.query('SELECT * FROM gamelle g JOIN regime r ON g.id = r.id_gamelle WHERE g.id_utilisateur = '+id+';');
      //const results = { 'results': (result) ? result.rows : null};
      console.log(results);
      res.json({success: 'true', result: results.rows})
    } catch(err) {
      res.json({success: 'false', error:err})
    }
  })
  .post('/gamelle', bodyParser, async (req, res) => {
    try{
      //Retour : attribue la gamelle au compte utilisateur.
      const client = await pool.connect()

      let id_utilisateur = req.query.id_utilisateur;
      let reserve = req.body.reserve;
      let rfid = "'"+req.body.rfid+"'";
      let actif = req.body.actif;

      const result = await client.query("INSERT INTO gamelle (reserve, rfid, actif, id_utilisateur) VALUES ("+reserve+", "+rfid+", "+actif+", "+id_utilisateur+");");
      res.json({success: 'true'})
    } catch(err) {
      res.json({success: 'false', error:err})
      //something else...
    }
  })
  .put('/gamelle', bodyParser, async (req, res) => {
    try{
      //Retour : modifier la gamelle (RFID).
      const client = await pool.connect()

      let id = req.query.id_gamelle;
      let rfid = "'"+req.body.rfid+"'";
      let actif = "'"+req.body.actif+"'";

      const result = await client.query("UPDATE gamelle SET rfid = "+rfid+", actif = "+actif+" WHERE id = "+id+");");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
      res.json({success: 'true'})
    } catch(err) {
      res.json({success: 'false', error:err})
      //something else...
    }
  })
  .delete('/gamelle', bodyParser, async (req, res) => {
    try{
      //Retour : Supprimer une gamelle et son animal.
      const client = await pool.connect()

      let id = req.query.id_gamelle;
      
      const result = await client.query("DELETE FROM gamelle WHERE id = "+id+" CASCADE);");
      res.json({success: 'true'})
    } catch(err) {
      res.json({success: 'false', error:err})
      //something else...
    }
  })

  //animal
  .get('/animal', bodyParser, async (req, res) => {
    try{
      //Retour : Toutes les données animalière.
      const client = await pool.connect()
      let id = req.query.id_gamelle;
      
      const result = await client.query('SELECT * FROM animal WHERE id_gamelle = '+id+';');
      //const results = { 'results': (result) ? result.rows : null};

      res.json({success: 'true', result:result.rows})
    } catch(err) {
      res.json({success: 'false', error:err})
      //something else...
    }
  })
  .post('/animal', bodyParser, async (req, res) => {
    try{
      //Retour : créer un animal.
      const client = await pool.connect()

      let nom = "'"+req.body.nom+"'"; 
      let race = "'"+req.body.race+"'";
      let age = req.body.age;
      let photo = "'"+req.body.photo+"'";
      let objPoid = req.body.objPoids;
      let typeRegime = "'"+req.body.typeRegime+"'";
      let id_gamelle = req.query.id_gamelle;

      const result = await client.query("INSERT INTO animal (nom, race, age, photo, objPoid, typeRegime, id_gamelle) VALUES ("+nom+", "+race+", "+age+", "+photo+", "+objPoid+", "+typeRegime+", "+id_gamelle+");");
      res.json({success: 'true'})
    } catch(err) {
      res.json({success: 'false', error:err})
      //something else...
    }
  })
  .put('/animal', bodyParser, async (req, res) => {
    try{
      //Retour : Modifier le profil de l'animal.
      const client = await pool.connect()

      let nom = "'"+req.body.nom+"'";
      let race = "'"+req.body.race+"'";
      let age = req.body.age;
      let photo = "'"+req.body.photo+"'";
      let objPoid = req.body.objpoid;
      let typeRegime = "'"+req.body.typeregime+"'";
      let id = req.query.id_animal;
 
      console.log({nom, race, age, photo, objPoid, typeRegime, id});
      const result = await client.query("UPDATE animal SET nom = "+nom+", race = "+race+", age = "+age+", photo = "+photo+", objPoid = "+objPoid+", typeRegime = "+typeRegime+" WHERE id = "+id+";")
      res.json({success: 'true'})
    } catch(err) {
      res.json({success: 'false', error:err}) 
      //something else...
    }
  })
  .delete('/animal', bodyParser, async (req, res) => {
    try{
      //Retour : Supprimer un animal mais pas la gamelle.
      const client = await pool.connect()

      let id = req.query.id_animal;
      
      const result = await client.query("DELETE FROM animal WHERE id = "+id+" CASCADE);"); 
      res.json({success: 'true'})
    } catch(err) {
      res.json({success: 'false', error:err})
      //something else...
    }
  })

  //poids
  .get('/poids', bodyParser, async (req, res) => {
    try{
      //Retour : Liste tous les poids de l'animal choisit.
      const client = await pool.connect()
      let id = req.query.id_animal;
      
      // const result = await client.query('SELECT * FROM poids WHERE id_animal = '+id+' ORDER BY date DESC LIMIT 5 ORDER BY date ASC;');
      const result = await client.query('SELECT * FROM poids WHERE id_animal = '+id+' ORDER BY date DESC LIMIT 5;');
      //const results = { 'results': (result) ? result.rows : null};

      res.json({success: 'true', result:result.rows})
    } catch(err) {
      res.json({success: 'false', error:err}) 
      //something else...
    }
  })
  .post('/poids', bodyParser, async (req, res) => {
    try{
      //Retour : ajouter un poids pour l'animal.
      const client = await pool.connect()

      let kg = req.body.kg;
      let date = "'"+req.body.date+"'";
      let id_animal = req.query.id_animal;
      console.log({kg, date});
      const result = await client.query("INSERT INTO poids (kg, date, id_animal) VALUES ("+kg+", "+date+", "+id_animal+");");
      res.json({success: 'true'})
    } catch(err) {
      res.json({success: 'false', error:err}) 
      //something else...
    }
  })

  //stats
  .get('/stats', bodyParser, async (req, res) => {
    try{
      //Retour : Toutes les données utilisateurs.
      const client = await pool.connect()
      let id_gamelle = req.query.id_gamelle;
      
      const result = await client.query('SELECT * FROM stats WHERE id_gamelle = '+id_gamelle+';');
      //const results = { 'results': (result) ? result.rows : null};

      res.json({success: 'true', result:result.rows})
    } catch(err) {
      res.json({success: 'false', error:err})
      //something else...
    }
  })
  .post('/stats', bodyParser, async (req, res) => {
    try{
      //Retour : de la gamelle : créé une ligne de stats.
      const client = await pool.connect()

      let date = req.body.date;
      let poidsAvant = req.body.poidsAvant;
      let poidsApres = req.body.poidsApres;
      let poidsConsomme = req.body.poidsConsomme;
      let heureDebut = req.body.heureDebut;
      let heureFin = req.body.heureFin;
      let id_gamelle = req.query.id_gamelle;

      const result = await client.query("INSERT INTO poids (date, poidsAvant, poidsApres,poidsConsomme, heureDebut, heureFin, id_gamelle) VALUES ("+date+", "+poidsAvant+", "+poidsApres+", "+poidsConsomme+", "+heureDebut+", "+heureFin+", "+id_gamelle+");");
      res.json({success: 'true'})
    } catch(err) {
      res.json({success: 'false', error:err})
      //something else...
    }
  })

  //regime
  .get('/regime', bodyParser, async (req, res) => {
    try{
      //Retour : affiche le régime de la gamelle.
      const client = await pool.connect()
      let id_gamelle = req.query.id_gamelle;
      
      const result = await client.query('SELECT * FROM regime WHERE id_gamelle = '+id_gamelle+';');
      //const results = { 'results': (result) ? result.rows : null};

      res.json({success: 'true', result:result.rows})
    } catch(err) {
      res.json({success: 'false', error:err})
      //something else...
    }
  })
  .post('/regime', bodyParser, async (req, res) => {
    try{
      //Retour : créer un régime.
      const client = await pool.connect()

      // id INT(32) - PRIMARY
      // dose INT(11)
      // frequence INT(11)
      // id_gamelle INT(32) - FOREIGN_KEY(gamelle)

      let dose = req.body.dose;
      let frequence = req.body.frequence;
      let id_gamelle = req.body.id_gamelle;

      const result = await client.query("INSERT INTO poids (dose, frequence, id_gamelle) VALUES ("+dose+", "+frequence+", "+id_gamelle+");");
      res.json({success: 'true'})
    } catch(err) {
      res.json({success: 'false', error:err})
      //something else...
    }
  })
  .put('/regime', bodyParser, async (req, res) => {
    try{
      //Retour : modifie un régime.
      const client = await pool.connect()

      // id INT(32) - PRIMARY
      // dose INT(11)
      // frequence INT(11)
      // id_gamelle INT(32) - FOREIGN_KEY(gamelle)

      let dose = req.body.dose;
      let frequence = req.body.frequence;
      let id_gamelle = req.query.id_gamelle;

      const result = await client.query("UPDATE regime SET dose = "+dose+", frequence = "+frequence+" WHERE id_gamelle = "+id_gamelle+";");
      res.json({success: 'true'})
    } catch(err) {
      res.json({success: 'false', error:err})
      //something else...
    }
  })
  // .delete('/gamelle', bodyParser, async (req, res) => {
  //   try{
  //     //Retour : Réstaurer le régime initial.
  //   } catch(err) {
  //     res.json({success: 'false', error:err})
  //     //something else...
  //   }
  // })

  //connection/deconnection

  .post('/connection', bodyParser, async (req, res) => {
    try{
      //Retour : connection de l'user.
      const client = await pool.connect()

      let mail = "'"+req.body.mail+"'";
      let pwd = "'"+req.body.pwd+"'";
      
      const result = await client.query('SELECT id FROM utilisateur WHERE mail = '+mail+' AND pwd = '+pwd+';');
      const results = { 'results': (result) ? result.rows : null};

      res.json({success: 'true', result:results})
    } catch(err) {
      res.json({success: 'false', error:err})
      //something else...
    }
  })
  .delete('/connection', bodyParser, async (req, res) => {
    try{
      //Retour : déco de l'user.
      //en vrais, j'ai rien à faire.. Peut être des logs un jour :)
    } catch(err) {
      res.json({success: 'false', error:err})
      //something else...
    }
  })
  .get('/home', bodyParser, async (req, res) => {
    try{
      
      const client = await pool.connect()
      let id_user = req.query.id;
      let resultUser = await client.query('SELECT * FROM utilisateur WHERE id = '+id_user+';');
      resultUser = resultUser.rows;
      console.log(resultUser);
      try{ 
        let id_gamelle = resultUser[0].id;
        
        let resultGamelle = await client.query('SELECT * FROM gamelle g JOIN regime r ON g.id = r.id_gamelle WHERE g.id_utilisateur = '+id_gamelle+';');
        resultGamelle = resultGamelle.rows;
        console.log(resultGamelle);
        try{
          let id_animal = resultGamelle[0].id_gamelle;
          
          let resultAnimal = await client.query('SELECT * FROM animal WHERE id_gamelle = '+id_animal+';');
          resultAnimal = resultAnimal.rows;
          console.log(resultAnimal);
          try{
            let id_poids = resultAnimal[0].id;
            
            let resultPoids = await client.query('SELECT * FROM poids WHERE id_animal = '+id_poids+' ORDER BY date DESC LIMIT 5;');
            resultPoids = resultPoids.rows; 
            console.log(resultPoids); 

            const result = {resultUser, resultGamelle, resultAnimal, resultPoids} 
            res.json({success: 'true', result:result})
          } catch(err) {res.json({success: 'false', error:"error : Poids"})}
        } catch(err) {res.json({success: 'false', error:"error : Animal"})}
      } catch(err) {res.json({success: 'false', error:"error : Gamelle"})}
    } catch(err) {res.json({success: 'false', error:"error : User"})}
  })
  .get('/historique', bodyParser, async (req, res) => {
    try{
      const client = await pool.connect()

      let id_gamelle = req.query.id_gamelle;
      let resultManger = await client.query('SELECT * FROM historique WHERE id_gamelle = '+id_gamelle+' AND isdose = false ORDER BY date DESC LIMIT 5;');
      resultManger = resultManger.rows;
      try {

        let resultDose = await client.query('SELECT * FROM historique WHERE id_gamelle = '+id_gamelle+' AND isdose = true ORDER BY date DESC LIMIT 5;');
        resultDose = resultDose.rows;

        res.json({resultManger, resultDose});
      } catch(err) {res.json({success:'false', error:'error : nbDose'})}
    } catch(err) {res.json({success:'false', error:'error : nbManger'})} 
  })

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
