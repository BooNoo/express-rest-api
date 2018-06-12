"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var port = process.env.PORT || 3003;
var env =   (port === 3003) ? "development" : "production";
var config = require('../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db = {};

fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function (file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.object.hasMany(db.objectImage, {foreignKey: 'fk_objectid', sourceKey: 'id', onDelete: 'cascade'});
db.objectImage.belongsTo(db.object, {foreignKey: 'fk_objectid', targetKey: 'id'});
// MapObject.hasMany(MapObjectImage);

module.exports = db;