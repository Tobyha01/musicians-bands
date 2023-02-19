const {Band} = require('./Band')
const {Musician} = require('./Musician')
const {Song} = require('./Song')

Musician.belongsTo(Band)
Band.hasMany(Musician)
Band.hasMany(Song, {through: bandSongs})
Song.hasMany(Band, {through: bandSongs})

module.exports = {
    Band,
    Musician,
    Song
};
