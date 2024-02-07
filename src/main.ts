import express from 'express'
import { db, firestore } from '../banco-de-dados/firebase'


const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('bem vinda ao meu app')
})

app.post('/usuario', async (req, res) => {
    const nome  = req.body.nome;
    const email = req.body.email
    const telefone = req.body.telefone

    try {
        const docRef = await firestore.addDoc(firestore.collection(db, 'usuario'), {
            nome: nome,
            email: email,
            telefone: telefone
        })

        res.send("usuario adicionado com sucesso:" + docRef.id)
    } catch (e) {
        console.log("Erro ao adicionar usuario: ", e)

        res.status(500).send(e);
    }
});

app.get('/listarUsuarios', async (req, res) => {
    try {
      const usuarios = await firestore.getDocs(firestore.collection(db, 'usuario'))
  
      const usuariosLista = usuarios.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      res.send(usuariosLista)
    } catch (e) {
      console.log("Erro ao listar usuários: " + e)
      
      res.status(500).send("Erro ao listar usuários: " + e)
    }
  })
  
  app.put('/atualizarUsuario/:id', async (req, res) =>{
    const id = req.params.id
    const nome = req.body.nome
  
    try {
      await firestore.updateDoc(firestore.doc(db, 'usuario', id), {
        nome: nome,
      })
      res.send('usuario atualizado com sucesso!!')
    } catch (e) {
      console.log('Erro ao atualizar usuário: ' + e)
  
      res.status(500).send('Erro ao atualizar o usuário: ' + e )
    }
  
  })

  app.delete('/deletarUsuario/:id' , async (req , res) =>{
    const id =req.params.id
    try {
        await firestore.deleteDoc(firestore.doc(db, 'usuarios', id))
        res.send ('Usuario deletado com sucesso')
        


    } catch (e) {
        console.log('Erro ao deletar usuario:' + e)

        res.status(500).send('Erro ao deletar: ')

    }
  })

app.listen(3000, function () {
    console.log('serviço rodando em http://localhost:3000')
})