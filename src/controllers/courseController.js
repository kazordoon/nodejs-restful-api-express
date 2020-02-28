const { validationResult } = require('express-validator');

module.exports = (app) => {
  const { Course } = app.models;

  const index = async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
      }

      const courses = await Course.find({}, [], { sort: { nome: 1 } }).exec();
      return res.json(courses);
    } catch (err) {
      return res.status(500).json({ error: 'Não foi possível listar os cursos' });
    }
  };

  const create = async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
      }

      const { nome } = req.body;

      if (await Course.findOne({ nome })) {
        return res.status(409).json({ error: 'Já existe um curso com este nome' });
      }

      const course = await Course.create(req.body);
      return res.status(201).json(course);
    } catch (err) {
      return res.status(403).json({ error: 'Não foi possível criar um novo curso' });
    }
  };

  const update = async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
      }

      const { nome } = req.body;
      const { id } = req.params;

      if (!await Course.findById(id)) {
        return res.status(404).json({ error: 'Este curso não existe' });
      }

      if (await Course.findOne({ nome })) {
        return res.status(409).json({ error: 'Já existe um curso com este nome' });
      }

      const course = await Course.findByIdAndUpdate(id, req.body, { new: true });

      return res.json(course);
    } catch (err) {
      return res.status(403).json({ error: 'Não foi possível atualizar este curso' });
    }
  };

  const destroy = async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
      }

      const { id } = req.params;

      const course = await Course.findById(id);

      if (!course) {
        return res.status(404).json({ error: 'Este curso não existe' });
      }

      course.remove();

      return res.sendStatus(204);
    } catch (err) {
      return res.status(403).json({ error: 'Não foi possível deletar este curso' });
    }
  };

  return {
    index,
    create,
    update,
    destroy,
  };
};
