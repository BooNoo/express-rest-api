var models = require("../models");
var ObjectImage = models.objectImage;

var exports = module.exports = {};

exports.getById = function (req, res) {
    ObjectImage.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (location) {
        if (!location) {
            res.json({error: true, message: "Object image not found"})
        } else {
            res.json(location)
        }
    })
};

exports.getByObjectId = function (req, res) {
    ObjectImage.findAll({
        where: {
            fk_objectid: req.params.id
        }
    }).then(function (locations) {
        if (!locations) {
            res.json({error: true, message: "Object images in object not found"})
        } else {
            res.json(locations)
        }
    })
};

exports.deleteById = function (req, res) {
    ObjectImage.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (value) {
        if (!value) {
            res.json({error: true, message: "Error while delete object image"})
        } else {
            res.json({error: false, message: "Success delete object image"})
        }
    })
};