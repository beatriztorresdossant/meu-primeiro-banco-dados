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
        console.log(e)
    }
})

app.listen(3000, function () {
    console.log('serviço rodando em http://localhost:3000')
})