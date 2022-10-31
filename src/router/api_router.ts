import { privateEncrypt } from "crypto";
import express, { Router } from "express";
import * as TaskController from "../controller/task.controller";

const router = Router();

router.get('/', (req, res) => {
    res.send('welcome to our classy api!');
});

router.route('/tasks')
    .get(async (req, res) => {
        try {
            const result = await TaskController.getTasks();
            console.log(result);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .post(async (req, res) => {
        try {
            console.log(req.body);
            const result = await TaskController.createTask(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .put(async (req, res) => {
        try {
            console.log(req.body);
            const result = await TaskController.updateTask(req.body.id, req.body.task);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })
    .delete(async (req, res) => {
        try {
            console.log(req.body);
            const result = await TaskController.deleteTask(req.body.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error });
        }
    })


export default router;
