const express = require("express") //importation de express
const db= require("./db_blog.js"); //importation de la base de donnee
const app = express()  //on cree une application express

//middelware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const port = 3000

// app.get('/', (req, res) => { res.send('l'api marche bien') })
app.get("/", function(req, res){ res.json({message: "l'API marche bien"}) } )

//*************creer un article***************** */
app.post("/api/articles",(req,res)=>{

    const {titre, resume, contenu, auteur, date_creation, date_maj } = req.body;
    // const titre= req.body.titre
    // const resume= req.body.titre
    // const contenu= req.body.titre
    // const auteur= req.body.titre
    // const date_creation= req.body.titre
    // const date_maj= req.body.titre

    if(!titre || !resume || !contenu || !auteur || !date_creation || !date_maj){
        res.status(400).json({message:"merci de remplir tous les champs"});
        return;
    }
    
    const article={titre, resume, contenu, auteur, date_creation, date_maj};
    const sql= "insert into article (titre, resume, contenu, auteur, date_creation, date_maj) values (?,?,?,?,?,?)"
    const params= [article.titre, article.resume, article.contenu, article.auteur, article.date_creation, article.date_maj]
    
    db.run(sql, params, function(err, result){
    if(err){
        res.status(400).json({error:err.message});
        return;
    }
        res
        .status(201)
        .json({message:"article créé avec succé ", data : article});
    })
    
})

//********************recuperer les articles ***********************/
app.get("/api/articles",(req,res)=>{
    const sql= "Select * from article";
    db.all(sql,(err, rows)=>{
        if(err){
            res.status(400).json({error:err.message});
            return;
        }
        res.json({message:"liste des articles", data:rows})
    })
})
//********************recuperer un seul article**************************** */
app.get("/api/articles/:id",(req,res)=>{
    const sql= "select * from article where id=?";
    const {id: idArticle}=req.params;
    const params= [idArticle];
    db.get(sql,params,(err, row)=>{
        if(err){
            res.status(400).json({error:err.message});
            return;
        }
        res.json({message:`l'article numero ${idArticle}`, data:row})
    })
})
//********************************modifier un article***************************** */
app.put("/api/articles/:id",(req,res) =>{
    
    const {id: idArticle}=req.params;

    const {titre, resume, contenu, auteur, date_creation, date_maj } = req.body;
    const article={titre, resume, contenu, auteur, date_creation, date_maj};
    const sql= "update article set titre=?, resume=?, contenu=?, auteur=?, date_creation=?, date_maj=? where id=? "
    const params= [article.titre, article.resume, article.contenu, article.auteur, article.date_creation, article.date_maj, idArticle]
    
    if(!titre || !resume || !contenu || !auteur || !date_creation || !date_maj){
        res.status(400).json({message:"merci de remplir tous les champs"});
        return;
    }

    db.run(sql, params, function(err, result){
    if(err){
        res.status(400).json({error:err.message});
        return;
    }

        res
        .status(201)
        .json({message:`article ${idArticle} modifié avec succé `, data : article});

    })
    
})

//*************************supprimer un article******************************* */
app.delete("/api/articles/:id",(req,res)=>{
    const {id: idArticle}=req.params;
    const sql= "delete from article where id=?";
    db.run(sql, idArticle, function(err, result){
        if(err){
            res.status(400).json({error:err.message});
            return;
        }
    
            res
            .status(201)
            .json({message:`article ${idArticle} supprimé avec succé `,data :this.changes});
    
        })
})

//***************Demarrage de le serveur***************** */
//***************on peut aussi enlever les crochets de la fonction arrow******************** */

// app.listen(port, () => console.log(`Example app listening on port ${port}`))
// app.listen(port, () => {console.log(`Example app listening on port ${port}`)} )

app.listen(port, function(){ console.log( "l'appplication est demarre sur le port :" +port);});