const auth = require("../../src/middlewares/auth.middleware");

const {authenticate} = require("../../src/controllers/auth.controller");
const expectExport = require("expect");

//LOS MOCKS SIRVEN PARA HACER PRUEBAS INTERMEDIAS DE LAS FUNCIONES
//Y NO NECESARIAMENTE DE SU RESULTADO FINAL (EJEM. A CONTROLADORES O MIDDLEWARES)

describe("Validando la autenticación de usuarios", () => {
    beforeAll(() => {
        //1. Crear un objeto de usuario con datos falsos y elegir una contraseña fija
        //2. Insertar el usuario en la base de datos
        //3. Iniciar sesión con el servicio login
        //4. Guardar el token
    });

    afterAll(() => {
        //5. Eliminar el usuario de la DB creado en el hook beforeAll
    });

    it("Probando el controlador authenticate", async() => {
        const req = {
            body: {
                email: "aj56aw2w2e@gmail.com",
                password: "man2123"
            }
        }

        const res = {
            json: jest.fn()
        }

        const next = jest.fn()

        await authenticate(req, res, next)

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith({
            message: "Has iniciado sesión",
            token: expect.any(String)
        })

    }); 

    it("Debería de obtener un token pasando como argumento un objeto de usuario", () => {
        //6. Crear la prueba para comprobar si el token se ha creado correctamente
    });

    it("Debería de obtener un token pasando como argumento un objeto de usuario", () => {
        //6. Crear la prueba para comprobar si el token se ha creado correctamente
    });

    it("Debería de llamar a la funcion next sin argumentos con un token valido", () => {
        //7. Crear la prueba para comprobar si el token es valido
        const req = {
            headers: {
                authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQzLCJmaXJzdG5hbWUiOiJ3dzJ3IiwibGFzdG5hbWUiOiJsZTJ3Mndld3dlIiwiZW1haWwiOiJhajU2YXcydzJlQGdtYWlsLmNvbSIsImlhdCI6MTYzMzQxNDIwNywiZXhwIjoxNjMzNDIxNDA3fQ.g_J3yEzqu7abto9iGLsoseytm4Bt05cjXt5-Q_rVIXg"
            }
        }

        const res = {}

        //next va a ser un mock porque queremos evaluar sus argumentos
        const next = jest.fn()
        //Token valido -> tiene un formato incorrecto o ya ha expirado

        auth.validateToken(req, res, next)

        expect(next).toHaveBeenCalledTimes(1)
        expect(next.mock.calls[0][0]).toBeUndefined()

    });

    it("Debería de llamar a la funcion next con argumentos cuando es un token invalido", () => {
        //8. Crear la prueba para comprobar si el token es invalido
        //Token valido -> tiene un formato incorrecto o ya ha expirado
        const req = {
            headers: {
            authorization: "Bearer faketoken_adawwqdwd"
            }
        };
        const res = {};
        const next = jest.fn();
        //Token valido -> tiene el formato correcto y no ha expirado
        auth.validateToken(req, res, next);
        /* const error = new Error("invalid signature");
        error.name = "JsonWebTokenError"; */
        expect(next).toHaveBeenCalledTimes(1);
        expect(next.mock.calls[0][0]).toEqual(expect.any(Object));
    });
});
