import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import multer from 'multer'

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

const memoryStorage = multer.memoryStorage()
const upload = multer({ storage: memoryStorage })

app.post('/api/fileanalyse', upload.single('upfile') ,(req,res) => {
    
    const { originalname, mimetype, size } = req.file

    res.json({
        name: originalname,
        type: mimetype,
        size: size
    })

})






export default app;