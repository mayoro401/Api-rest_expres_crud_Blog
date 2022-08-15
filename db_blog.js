const sqlite3 = require("sqlite3").verbose()  //importation de sqlite3

const dbBlog= "db.sqlite"

//se connecter a la base de donnees
let db =new sqlite3.Database(dbBlog, (err)=>{
    if (err){
        console.error(err.message)
        throw err
    }
    else{
        console.log("Connexion a la  base de donnee");
            const sql = `create table article (
                id integer primary key autoincrement,
                titre text,
                resume text,
                contenu text,
                auteur text,
                date_creation date,
                date_maj date
             )`;
            //run() pour interagir avec la base de donnee         
        db.run(sql, (err) =>{
            if (err){
                console.log("table deja créée")
            }
        });
    }
})

module.exports = db;