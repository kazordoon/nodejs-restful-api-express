const { validationResult } = require('express-validator');
const { JsonSpec, getNotNullProperties } = require('../../utils');
const cache = require('../../redis');

module.exports = () => {
  class CoursesController {
    constructor(courseModel) {
      this.courseModel = courseModel;
      this.resourceType = 'courses';
    }

    async index(req, res) {
      try {
        const { page = 1, limit = 10 } = req.query;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(422).json(errors.array());
        }

        const numericPage = Number(page);
        const numericLimit = Number(limit);

        const courses = await this.courseModel
          .find({}, [], { sort: { year: -1 } })
          .limit(numericLimit * 1)
          .skip((numericPage - 1) * numericLimit)
          .exec();

        const courseCount = await this.courseModel.countDocuments();
        const totalPages = Math.ceil(courseCount / numericLimit);

        const pageInfo = {
          path: '/courses',
          current: numericPage,
          total: totalPages,
        };
        const mappedCourses = courses.map((course) => course._doc);
        const response = JsonSpec.convertMany(
          this.resourceType,
          mappedCourses,
          pageInfo,
        );

        return res.json(response);
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Couldn't list all courses" });
      }
    }

    async show(req, res) {
      try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(422).json(errors.array());
        }

        const { id } = req.params;

        const pagePath = `/courses/${id}`;

        const isTheCourseInCache = Boolean(await cache.get(`course:${id}`));
        if (isTheCourseInCache) {
          const courseInCache = JSON.parse(await cache.get(`course:${id}`));

          const response = JsonSpec.convertOne(
            this.resourceType,
            courseInCache,
            pagePath,
          );
          return res.json(response);
        }

        const course = await this.courseModel.findById(id);

        if (!course) {
          return res.status(404).json({ error: "This course doesn't exist" });
        }

        await cache.set(`course:${id}`, JSON.stringify(course));

        const response = JsonSpec.convertOne(
          this.resourceType,
          course._doc,
          pagePath,
        );
        return res.json(response);
      } catch (err) {
        return res.status(500).json({ error: "Couldn't list this course" });
      }
    }

    async create(req, res) {
      try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(422).json(errors.array());
        }

        const { name } = req.body;

        const courseAlreadyExists = await this.courseModel.findOne({ name });
        if (courseAlreadyExists) {
          return res
            .status(409)
            .json({ error: 'There is already a course with that name' });
        }

        const course = await this.courseModel.create(req.body);

        const pagePath = `/courses/${course.id}`;
        const response = JsonSpec.convertOne(
          this.resourceType,
          course._doc,
          pagePath,
        );
        return res.status(201).json(response);
      } catch (err) {
        return res.status(403).json({ error: "Couldn't create this course" });
      }
    }

    async update(req, res) {
      try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(422).json(errors.array());
        }

        const {
          name,
          description,
          workload,
          total_classes: totalClasses,
          year,
        } = req.body;
        const { id } = req.params;

        const courseNotFound = !(await this.courseModel.findById(id));
        if (courseNotFound) {
          return res.status(404).json({ error: "This course doesn't exist" });
        }

        const invalidNameForTheCourse = await this.courseModel.findOne({
          name,
        });
        if (invalidNameForTheCourse) {
          return res
            .status(409)
            .json({ error: 'There is already a course with that name' });
        }

        await this.courseModel.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        await cache.del(`course:${id}`);

        const payload = {
          name,
          description,
          workload,
          total_classes: totalClasses,
          year,
        };
        const notNullCourseFields = getNotNullProperties(payload);
        const pagePath = `/courses/${id}`;
        const response = JsonSpec.convertOne(
          this.resourceType,
          notNullCourseFields,
          pagePath,
        );
        return res.json(response);
      } catch (err) {
        return res.status(403).json({ error: "Couldn't update this course" });
      }
    }

    async destroy(req, res) {
      try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(422).json(errors.array());
        }

        const { id } = req.params;

        const course = await this.courseModel.findById(id);

        if (!course) {
          return res.status(404).json({ error: "This course doesn't exist" });
        }

        await course.remove();
        await cache.del(`course:${id}`);

        return res.sendStatus(204);
      } catch (err) {
        return res.status(403).json({ error: "Couldn't delete this course" });
      }
    }
  }

  return CoursesController;
};
