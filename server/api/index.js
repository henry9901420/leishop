const express = require('express')
const router = express.Router()


require('./routes/transaction')(router)
require('./routes/user')(router)
require('./routes/pearl')(router)
require('./routes/jewellery')(router)
module.exports = router
