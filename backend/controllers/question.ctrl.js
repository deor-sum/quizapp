const question = require("./../models/question.model");

const all = (req, res) => {
  question
    .find()
    .then((questions) => res.json(questions))
    .catch((err) =>
      res.status(404).json({ noquestionsfound: "No questions found" })
    );
};

const getById = (req, res) => {
  question
    .findById(req.params.id)
    .then((question) => res.json(question))
    .catch((err) =>
      res.status(404).json({ noquestionfound: "No question found" })
    );
};

const create = (req, res) => {
  question
    .create(req.body)
    .then((question) =>
      res.json({ question, msg: "question added successfully" })
    )
    .catch((err) =>
      res.status(400).json({ error: "Unable to add this question" })
    );
};

const update = (req, res) => {
  question
    .findByIdAndUpdate(req.params.id, req.body)
    .then((question) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
};

const destroy = (req, res) => {
  question
    .findByIdAndRemove(req.params.id, req.body)
    .then((question) =>
      res.json({ mgs: "question entry deleted successfully" })
    )
    .catch((err) => res.status(404).json({ error: "No such a question" }));
};

module.exports = { all, getById, create, update, destroy };
