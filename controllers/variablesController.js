const Variables = require("../models/variablesModel");

const getVariables = (req, res) => {
  try {
    const variables = Variables.getAll();
    res.status(200).json(variables);
  } catch (err) {
    res.status(500).send({ message: "Error retrieving variables" });
  }
};

const getVariableById = (req, res) => {
  const { id } = req.params;
  try {
    const variable = Variables.getById(id);
    if (!variable) {
      res.status(404).send({ message: "Variable not found" });
    } else {
      res.status(200).json(variable);
    }
  } catch (err) {
    res.status(500).send({ message: "Error retrieving variable" });
  }
};

const getVariableByWeatherStationId = (req, res) => {
  const { id } = req.params;
  try {
    const variable = Variables.getByWeatherStationId(id);
    if (!variable) {
      res.status(404).send({ message: "Variable not found" });
    } else {
      res.status(200).json(variable);
    }
  } catch (err) {
    res.status(500).send({ message: "Error retrieving variable" });
  }
};

module.exports = { getVariables, getVariableById, getVariableByWeatherStationId };
