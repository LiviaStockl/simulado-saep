import express from "express";
import eventosRoutes from "./routes/eventosRoutes";
import palestrantesRoutes from "./routes/palestrantesRoutes";


const app = express()

app.use(express.json())

app.use("/api/eventos", eventosRoutes)
app.use("/api/palestrantes", palestrantesRoutes)

export default app

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})