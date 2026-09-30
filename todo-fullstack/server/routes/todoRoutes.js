import express from 'express';
import {
    getTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo,
    clearCompletedTodos
} from '../controllers/todoController.js';

const router = express.Router();

// Specific routes MUST come before parameterized (/:id) routes,
// otherwise Express will treat the word "completed" as an ID parameter!
router.delete('/completed', clearCompletedTodos);

router.route('/')
    .get(getTodos)
    .post(createTodo);

router.route('/:id')
    .get(getTodoById)
    .put(updateTodo)
    .delete(deleteTodo);

export default router;