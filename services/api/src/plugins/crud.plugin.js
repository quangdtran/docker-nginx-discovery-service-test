// const util = require('util');
const testData = {
  id: '123456',
  value: 'Hello Seneca',
};

module.exports =  function app() {
  const seneca = this;
  // seneca.add = util.promisify(seneca.add);
  seneca.add({ service: 'api', action: 'test' }, (req, done) => {
    if (!req.body) return done(`body wasn't found`);
    const { id } = req.body;
    if (id !== testData.id) return done(`id wasn't found`, null);
    return done(null, { value: testData.value });
  });
};