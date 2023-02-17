const {sequelize} = require('./db');
const {Band, Musician} = require('./index')

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
        const testBand = await Band.create({name: "ACDC", genre: "Rock", showCount: 1})
        expect(testBand.name).toBe("ACDC");
        expect(testBand.genre).toBe("Rock");
        expect(testBand.showCount).toBe(1);
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

    test('can create a Musician', async function () {
        // TODO - test creating a musician
        const testMusician = await Musician.create({name: "Steve", instrument: "Drums"})
        expect(testMusician.name).toBe("Steve");
        expect(testMusician.instrument).toBe("Drums");
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