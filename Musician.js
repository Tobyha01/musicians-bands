const {DataTypes, sequelize} = require('./db');

// TODO - define the Musician model
let Musician = sequelize.define("musician", {
    name: DataTypes.STRING,
    instrument: DataTypes.STRING,
/*     createdAt: DataTypes.BOOLEAN */
})

module.exports = {
    Musician
};