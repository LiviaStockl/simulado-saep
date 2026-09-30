import { Router, Request, Response } from "express";
import prisma from "../prismaClient";
const router = Router();
router.post("/", async (req: Request, res: Response) => {
    const { nome, email } = req.body;
    if (!nome || !email) {
        return res.status(400).json({
            error: "Todos os campos são obrigatórios para o cadastro"
        });
    }
    const palestrante = await prisma.palestrante.create({
        data: {
            nome,
            email
        }
    });
    return res.status(201).json(palestrante);
});
router.get("/", async (req: Request, res: Response) => {
    try {
        const palestrantes = await prisma.palestrante.findMany();
        res.json(palestrantes);
    } catch (error) {
        res.status(500).json({
            error: "Erro interno no servidor"
        });
    }
});
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const palestrante = await prisma.palestrante.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });
        if (!palestrante) {
            return res.status(404).json({
                error: "Palestrante não encontrado"
            });
        }
        res.json(palestrante);
    } catch (error) {
        res.status(500).json({
            error: "Erro interno no servidor"
        });
    }
});
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const { nome, email } = req.body;
        const palestrante = await prisma.palestrante.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                nome,
                email
            }
        });
        res.json(palestrante);
    } catch (error) {
        res.status(500).json({
            error: "Erro interno no servidor"
        });
    }
});
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        await prisma.palestrante.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        return res.status(204).send();
    } catch (error) {
        res.status(500).json({
            error: "Erro interno do servidor"
        });
    }
});
export default router;