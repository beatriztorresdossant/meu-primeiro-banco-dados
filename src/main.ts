import express from 'express'
import { db, firestore } from '../banco-de-dados/firebase'


const app = express()

app.get('/', (req, res) => {
    res.send('bem vinda ao meu app')
})

app.post('/usuario', async (req, res) => {
    const usuario = req.body.nome

    try {
        const docRef = await firestore.addDoc(firestore.collection(db, 'usuario'), {
            nome: nome,
        })

        res.send(docRef.id)
    } catch (e) {

    }
})

app.listen(3000, function () {
    console.log('serviço rodando em http://localhost:3000')
})