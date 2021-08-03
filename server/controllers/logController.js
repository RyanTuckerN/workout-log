const router = require("express").Router()
const validateSesh = require("../Middleware/validateSesh")
const Log = require("../db").import("../models/log.js")

router.post("/", validateSesh, (req, res) => {
  Log.create({
    description: req.body.log.description,
    definition: req.body.log.definition,
    result: req.body.log.result,
    owner_id: req.user.id,
  })
    .then((log) => {
      res.status(200).json({ message: "Log Created! 💪", log })
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong! 🤷", err })
    })
})

router.get("/", validateSesh, (req, res) => {
  Log.findAll({ where: { owner_id: req.user.id } })
    .then((logs) => {
      res.status(200).json(logs)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
})

router.get("/:id", validateSesh, (req, res) => {
  Log.findOne({ where: { id: req.params.id } })
    .then((log) => {
      res.status(200).json(log)
    })
    .catch((err) => {
      res.status(500).json(err)
    })
})

router.put("/:id", validateSesh, (req, res) => {
  const updatedLog = {
    description: req.body.log.description,
    definition: req.body.log.definition,
    result: req.body.log.result,
  }
  const query = { where: { id: req.params.id } }
  Log.update(updatedLog, query)
    .then((log) => {
      res
        .status(200)
        .json({
          message: `Log ${req.params.id} has been updated!`,
          updateCount: log,
        })
    })
    .catch((err) => {
      res.status(500).json(err)
    })
})

router.delete("/:id", validateSesh, (req, res) => {
  Log.destroy({ where: { id: req.params.id } })
    .then((log) => {
      res
        .status(200)
        .json({
          message: `Log ${req.params.id} has been deleted! ♻`,
          deleteCount: log,
        })
    })
    .catch((err) => {
      res.status(500).json(err)
    })
})

module.exports = router
