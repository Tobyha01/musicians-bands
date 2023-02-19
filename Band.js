const {DataTypes, sequelize} = require('./db');

// TODO - define the Band model
let Band = sequelize.define("band", {
    name: DataTypes.STRING,
    genre: DataTypes.STRING,
    showCount: DataTypes.NUMBER
})

module.exports = {
    Band
};