var express = require('express');
var router = express.Router();
const util = require('util');
const senecaService = require('seneca')({ legacy: { meta: true } })
  .use('seneca-amqp-transport')
  .client({
    type: 'amqp',
    pin: 'service:api,action:*',
    url: 'amqp://guest:guest@rabbitmq:5672',
  })
const senecaAct = util.promisify(senecaService.act.bind(senecaService));


/* GET home page. */
router.get('/', async (req, res) => {
  try {
    const result = await senecaAct({ service: 'api', action: 'test', body: { id: '123456' } });
    res.json({
      status: true,
      data: result,
    });
  } catch (error) {
    res.json({
      status: false,
      error,
    });
  }
});

module.exports = router;
