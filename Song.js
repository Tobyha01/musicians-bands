const {DataTypes, sequelize} = require("./db")

const Song = sequelize.define ("song", {
    title: DataTypes.STRING,
    year: DataTypes.NUMBER
})

module.exports = {Song}