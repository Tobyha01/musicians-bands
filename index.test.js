const {sequelize} = require('./db');
const {Band, Musician, Song} = require('./index')

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async function () {
        // TODO - test creating a band
        const band1 = await Band.create({name: "ACDC", genre: "Rock", showCount: 1})
        const band2 = await Band.create({name: "ABBA", genre: "Pop", showCount: 2})
        expect(band1.name).toBe("ACDC");
        expect(band2.name).toBe("ABBA");
        expect(band1.genre).toBe("Rock");
        expect(band2.genre).toBe("Pop");
        expect(band1.showCount).toBe(1);
        expect(band2.showCount).toBe(2);
    })

    test('can create a Musician', async function () {
        // TODO - test creating a musician
        const musician1 = await Musician.create({name: "Steve", instrument: "Drums", /* createdAt: false */})
        const musician2 = await Musician.create({name: "Bob", instrument: "Piano"})
        expect(musician1.name).toBe("Steve");
        expect(musician2.name).toBe("Bob");
        expect(musician1.instrument).toBe("Drums");
        expect(musician2.instrument).toBe("Piano");
    })

    test("can create a song", async function() {
        const song = await Song.create({title: "song1", year: 2023})
        console.log("song")
        expect(song.title).toBe("song1")
        expect(song.year).toBe(2023)
        // expect(song).toHaveProperty({title: "song1", year: 2023})
    })

    test("can add many musicians to one band", async function() {
        const band = await Band.findByPk(1)
        await band.addMusicians([1,2])
        const musicians = await band.getMusicians([1,2])
        // expect(musicians[0]).toEqual({id: 1, name: "Steve", instrument: "Drums", bandId: 1})
        expect(musicians[0].name).toBe("Steve")
        expect(musicians[1].name).toBe("Bob")
        expect(musicians[0].instrument).toBe("Drums")
        expect(musicians[1].instrument).toBe("Piano")
        expect(musicians[0].bandId).toBe(1)
        expect(musicians[1].bandId).toBe(1)
    })

    test("can update a Band", async function () {
        await Band.update({name: "U2", genre: "Pop", showCount: 2}, {where: {name: "ACDC", genre: "Rock", showCount: 1}})
        const updateBand = await Band.findAll({where: {name: "U2", genre:"Pop", showCount: 2}})
        expect(updateBand[0].name).toBe("U2")
        expect(updateBand[0].genre).toBe("Pop")
        expect(updateBand[0].showCount).toBe(2)
    })
    
    test("can delete a Band", async function () {
        await Band.destroy({where: {name: "U2", genre: "Pop", showCount: 2}})
        const deleteBand = await Band.findAll({where: {name: "U2", genre: "Pop", showCount: 2}})
        expect(deleteBand).not.toBe({name: "U2", genre: "Pop", showCount: 2})
    })

    
    test("can update a Musician", async function () {
        await Musician.update({name: "Garry", instrument: "Guitar"}, {where: {name: "Steve", instrument: "Drums"}})
        const updateMusician = await Musician.findAll({where: {name: "Garry", instrument: "Guitar"}})
        expect(updateMusician[0].name).toBe("Garry")
        expect(updateMusician[0].instrument).toBe("Guitar")
    })
    
    test("can delete a Musician", async function () {
        await Musician.destroy({where: {name: "Garry", instrument: "Guitar"}})
        const deleteMusician = await Musician.findAll({where: {name: "Garry", instrument: "Guitar"}})
        expect(deleteMusician).not.toBe({name: "Garry", instrument: "Guitar"})
    })
})