const request = require("supertest")
const faker = require("faker")
const userService = require("../../src/services/users.service")
const app = require("../../src/app")
const getDataValues = require("../../src/utils/sequelize")

const BASE_URL = `/api/v1`
const RESOURCE = "/users"

describe("Pruebas sobre rutas de usuarios", () => {

    let userCreated = {}

    beforeAll(async () => {
        let newUser = {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(8),
            phone: faker.phone.phoneNumber("+52(###)######")
        }

        userCreated = await userService.create(newUser)
        userCreated = getDataValues(userCreated)
    })

    it("Debería de obtener un status 200 y un arreglo -> GET /users ", async () => {
        const response = await request(app).get(`${BASE_URL}${RESOURCE}`)

        expect(response.status).toBe(200)
        expect(response.body).toEqual(expect.any(Array))
        expect(response.body).toContainEqual(expect.objectContaining({...userCreated}))
    })
})