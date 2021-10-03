const userService = require("../../src/services/users.service")
const faker = require("faker")
const getDataValues = require("../../src/utils/sequelize")

describe("Probando los servicios de usuarios", () => {

    let userId = 0
    let userCreated = {}
    let newUser = {
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(8),
        phone: faker.phone.phoneNumber("+52(###)######")
    }
    
    beforeAll(async () => {
        //userCreated = await userService.create(newUser)
        try{
            userCreated = await userService.create(newUser)
            console.log("=============userCreated==============")
            console.log(userCreated)
            console.log("======================================")
        }catch(err){
            throw err
        }
    })

    afterAll(async () => {
        try{
            await userService.delete(userId)
        }catch(err){
            throw err
        }
    })

    it("Debería obtener un arreglo al llamar el método getAll", async () => {
        //AAA
        //Arrange


        //Act
            const result = await userService.getAll()
        //Assert
            expect(result).toEqual(expect.any(Array))
    })

    it("Debería obtener un objeto al llamar el método getById", async () => {
        //AAA
        //Arrange
        const id = 8

        //Act
        const result = await userService.getById(id)

        //Assert

        expect(result).toEqual(expect.any(Object))
    })

    it("Debería obtener un objeto con los datos del usuario que acabamos de insertar en la DB", async () => {
        //AAA
        //Arrange
            const user = {
                firstname: faker.name.firstName(),
                lastname: faker.name.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(8),
                phone: faker.phone.phoneNumber("+52(###)######")
            }
        //Act
            const result = await userService.create(user)
            userId = result.id

            /* console.log("...............result test...............")
            console.log(result)
            console.log(".........................................") */
        //Assert
            expect(result).toEqual(expect.any(Object))
            expect(result).toHaveProperty("id")
            expect(result).toHaveProperty("firstname", user.firstname)
    })

    it("Debería de regresar true al actualizar el registro de forma satisfactoria", async () => {
        //AAA
        //Arrange
        console.log("*************update test****************")
        console.log(userCreated)
        userCreated.firstname = faker.name.firstName()
        userCreated = getDataValues(userCreated)
        console.log(userCreated)
        console.log(userCreated.dataValues)
        console.log(userCreated.id)
        console.log(userCreated.lastname)
        console.log(JSON.stringify(userCreated))
        console.log(JSON.parse(JSON.stringify(userCreated)))
        console.log("*******************************")

        //Act
        let result = await userService.update(userCreated, userCreated.id)
        /* console.log("************updated*************")
        console.log(result)
        console.log("*******************************") */

        //Assert
        expect(result).toBeTruthy()
    })

    it("Debería de regresar true al eliminar el registro de forma satisfactoria", async () => {
        //AAA
        let result = await userService.delete(userCreated.id)
        expect(result).toBeTruthy()
    })
})