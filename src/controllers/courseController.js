const { validationResult } = require('express-validator');
const cache = require('../redis');

module.exports = (app) => {
  const { Course } = app.models;

  const index = async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
      }

      const courses = await Course.find({}, [], { sort: { name: 1 } }).exec();
      return res.json(courses);
    } catch (err) {
      return res.status(500).json({ error: "Couldn't list all courses" });
    }
  };

  const getOne = async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
      }

      const { id } = req.params;

      const isTheCourseInCache = Boolean(await cache.get(`course:${id}`));
      if (isTheCourseInCache) {
        let courseInCache = await cache.get(`course:${id}`);
        courseInCache = JSON.parse(courseInCache);
        return res.json(courseInCache);
      }

      const course = await Course.findById(id);

      if (!course) {
        return res.status(404).json({ error: "This course doesn't exist" });
      }

      await cache.set(`course:${id}`, JSON.stringify(course));

      return res.json(course);
    } catch (err) {
      return res.status(500).json({ error: "Couldn't list this course" });
    }
  };

  const create = async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
      }

      const { name } = req.body;

      if (await Course.findOne({ name })) {
        return res.status(409).json({ error: 'There is already a course with that name' });
      }

      const course = await Course.create(req.body);
      return res.status(201).json(course);
    } catch (err) {
      return res.status(403).json({ error: "Couldn't create this course" });
    }
  };

  const update = async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
      }

      const { name } = req.body;
      const { id } = req.params;

      if (!await Course.findById(id)) {
        return res.status(404).json({ error: "This course doesn't exist" });
      }

      if (await Course.findOne({ name })) {
        return res.status(409).json({ error: 'There is already a course with that name' });
      }

      const course = await Course.findByIdAndUpdate(id, req.body, { new: true });

      return res.json(course);
    } catch (err) {
      return res.status(403).json({ error: "Couldn't update this course" });
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
        return res.status(404).json({ error: "This course doesn't exist" });
      }

      course.remove();

      return res.sendStatus(204);
    } catch (err) {
      return res.status(403).json({ error: "Couldn't delete this course" });
    }
  };

  return {
    index,
    getOne,
    create,
    update,
    destroy,
  };
};
