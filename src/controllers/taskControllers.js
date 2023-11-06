import TaskModel from '../models/taskSchema.js';

// GET
export const getTasks = async (_, response) => {
    try {
      const data = await TaskModel.find();

      response.json({ data, message: 'Tareas encontradas' });
    } catch (e) {
      response.status(500).json({
        data: null,
        message: 'Ocurrio un error al conectarse a la DB',
      });
    }
  };

  // POST
  export const postTask = async (req, res) => {
    const { body } = req;

    const newTask = new TaskModel({
      name: body.name,
      duedate: body.duedate,
    });

    try {
        await newTask.save();

        res.status(201).json({
          data: null,
          message: 'Tarea creada exitosamente',
        });
      } catch (e) {
        if (e.message.includes('duplicate')) {
          res.status(400).json({
            data: null,
            message: 'La tarea ya fue creada',
          });
          return;
        }

        res.status(500).json({
          data: null,
          message: 'Ocurrio un error al guardar la tarea',
        });
      }
    };

// PUT
export const putTask = async (req, res) => {
    const {
      body,
      params: { id },
    } = req;

    try {
      const action = await TaskModel.updateOne({ _id: id }, body);

      if (action.matchedCount === 0) {
        res.status(400).json({
          data: null,
          message: 'No se encontro una tarea con ese id',
        });
        return;
      }

      res.json({
        data: null,
        message: 'La tarea ha sido actualizada exitosamente',
      });
    } catch (e) {
      res.status(500).json({
        data: null,
        message: 'Ocurrio un error al actualizar la tarea',
      });
    }
  };

  // DELETE
export const deleteTask = async (req, res) => {
    const {
      params: { id },
    } = req;

    try {
      const action = await TaskModel.deleteOne({ _id: id });

      if (action.matchedCount === 0) {
        res.status(400).json({
          data: null,
          message: 'No se encontro una tarea con ese id',
        });
        return;
      }

      res.json({
        data: null,
        message: 'La tarea ha sido eliminada exitosamente',
      });
    } catch (e) {
      res.status(500).json({
        data: null,
        message: 'Ocurrio un error al eliminar la tarea',
      });
    }
  };
