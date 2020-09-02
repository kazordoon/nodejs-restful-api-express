const { validationResult } = require('express-validator');
const cache = require('../redis');

module.exports = (app) => {
  const { Course } = app.models;

  const index = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
      }

      const courses = await Course
        .find({}, [], { sort: { year: -1 } })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      const courseCount = await Course.countDocuments();
      const totalPages = Math.ceil(courseCount / limit);

      return res.json({
        courses,
        total_pages: totalPages,
        current_page: page,
      });
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

      const courseAlreadyExists = await Course.findOne({ name });
      if (courseAlreadyExists) {
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

      const courseNotFound = !(await Course.findById(id));
      if (courseNotFound) {
        return res.status(404).json({ error: "This course doesn't exist" });
      }

      const invalidNameForTheCourse = await Course.findOne({ name });
      if (invalidNameForTheCourse) {
        return res.status(409).json({ error: 'There is already a course with that name' });
      }

      const course = await Course.findByIdAndUpdate(id, req.body, { new: true });
      await cache.del(`course:${id}`);

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

      await course.remove();
      await cache.del(`course:${id}`);

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
