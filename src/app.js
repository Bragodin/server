import express from 'express'
import path from 'path'
import morgan from 'morgan'
import cors from 'cors'
import requireHTTPS from './https'
import fs from 'fs'
import http from 'http'
import router from './routers/export-router'
import https from 'https'
import mongoose from 'mongoose'
import { secret } from './dotenv'

const app = express()
const portHTTP = 3000
const portHTTPS = 8443
const certFile = '../certs/public.crt'
const keyFile = '../certs/private.key'
const publicFolder = '../public'

mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// Парсер тела запроса
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Вывод логов
app.use(morgan('dev'))

// Кроссдоменные запросы
app.use(cors())

// Редирект на https
app.use(requireHTTPS)

// Маршруты

app.use('/users', router.userRouter)

app.get(
    '/',
    (req, res) => {
        const message = 'Hello, world!'
        res.json({ message })
    }
)

// Публичная папка
app.use('/public', express.static(path.join(__dirname, publicFolder)))

// Сертификаты
const credentials = {
    cert: fs.readFileSync(path.join(__dirname, certFile), 'utf8'),
    key: fs.readFileSync(path.join(__dirname, keyFile), 'utf8')
}

https.createServer(credentials, app).listen(portHTTPS)
http.createServer(app).listen(portHTTP, () => {
    console.log(`Сервер запущен на порту ${portHTTP}`)
})