import express from 'express'
import cors from "cors"
import { db, firestore } from '../banco-de-dados/firebase'


const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
}))

app.get('/', (req, res) => {
    res.send('bem vinda ao meu app')
})

app.post("/formulario", async (req, res) => {
    const nome  = req.body.nome;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const descricao = req.body.descricao;


    try {
        const docRef = await firestore.addDoc(firestore.collection(db, "formulario"), {
            nome: nome,
            email: email,
            telefone: telefone,
            descricao: descricao,
        })

        res.send("Resposta enviada com sucesso: " + docRef.id)
    } catch (e) {
        console.log("Erro ao adicionar resposta: ", e)

        res.status(500).send(e);
    }
});

app.get("/listarformulario", async (req, res) => {
    try {
      const formulario = await firestore.getDocs(firestore.collection(db, 'formulario'))
  
      const formularioLista = formulario.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      res.send(formularioLista)
    } catch (e) {
      console.log("Erro ao listar formulário: " + e)
      
      res.status(500).send("Erro ao listar formulario: " + e)
    }
  })
  
  app.put('/atualizarFormulario/:id', async (req, res) =>{
    const id = req.params.id
    const nome = req.body.nome
  
    try {
      await firestore.updateDoc(firestore.doc(db, 'formulario', id), {
        nome: nome,
      })
      res.send('formulario atualizado com sucesso!!')
    } catch (e) {
      console.log('Erro ao atualizar formulario: ' + e)
  
      res.status(500).send('Erro ao atualizar o formulario: ' + e )
    }
  
  })

  app.delete('/deletarFomulario/:id' , async (req , res) =>{
    const id =req.params.id
    try {
        await firestore.deleteDoc(firestore.doc(db, 'formulario', id))
        res.send ('Formulario deletado com sucesso')
        


    } catch (e) {
        console.log('Erro ao deletar formulario:' + e)

        res.status(500).send('Erro ao deletar: ')

    }
  })

app.listen(3000, function () {
    console.log('serviço rodando em http://localhost:3000')
})