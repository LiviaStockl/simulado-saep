import { Router, Request, Response } from 'express';
import prisma from "../prismaClient"


const router = Router();

router.post("/", async (req: Request, res: Response) => {
    const { nome, descricao, local, palestranteId } = req.body;
    if (!nome || !descricao || !local || !palestranteId) {
        return res.status(400).json({
            error: "Todos os campos são obrigatórios para o cadastro"
        });
    }
    const evento = await prisma.eventos.create({
        data: {
            nome,
            descricao,
            local,
            palestranteId: Number(palestranteId)
        },
        include: {
            palestrantes: true
        }
    });
    return res.status(201).json(evento);
})


router.get("/", async (req: Request, res: Response) => {
    try{
        const eventos = await (await prisma.eventos.findMany({
            include: {
                palestrantes: true
            }
        }))
        res.json(eventos)
    } catch (error) {
        res.status(500).json({error: "Erro interno no servidor"})
    }
})

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const eventos = await prisma.eventos.findUnique({
            where: { id: Number(req.params.id) }
        })

        if (!eventos) {
            return res.status(404).json({ error: "evento nao encontrado" })
        }
        res.json(eventos)
    } catch (error) {
        res.status(500).json({ error: "Erro interno do servidor" })

    }
})

router.put("/:id", async (req: Request, res: Response) => {
    try {
        const { nome, descricao, local, palestranteId, palestrantes } = req.body

        const evento = await prisma.eventos.update({
            where: { id: Number(req.params.id) },
            data: { nome, descricao, local, palestranteId, palestrantes }
        })
        res.json(evento)
    } catch (error) {
        res.status(500).json({ error: "Erro interno do servidor" })
    }
})

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        await prisma.eventos.delete({
            where: { id: Number(req.params.id) }
        })
        return res.status(204).send()
    } catch (error) {
        res.status(500).json({ error: "Erro interno do servidor" })
    }
})




export default router;