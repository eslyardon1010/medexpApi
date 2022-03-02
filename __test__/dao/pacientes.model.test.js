const Pacientes = require('../../dao/pacientes/pacientes.model');
describe('Testing Pacientes Model', () => {
    let pacientesModel = undefined;
    let lastId = 0;
    beforeAll((done) => {
        pacientesModel = new Pacientes();
        setTimeout(() => {
            done();
        }, 3000);
    });

    it('pacientesModel Esta Definido', () => {
        return expect(pacientesModel).toBeDefined();
    });


    it('getAll Devuelve un array', async() => {
        const arrPacientes = await pacientesModel.getAll();
        return expect(arrPacientes.length).toBeGreaterThanOrEqual(0);
    });
})