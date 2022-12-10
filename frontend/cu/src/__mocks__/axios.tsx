
const axios = jest.createMockFromModule('axios');

axios.create.mockReturnThis();
// axios.create.mockReturnThis();

export default axios;
