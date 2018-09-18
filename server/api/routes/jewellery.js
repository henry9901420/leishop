const Jewellery = require('../../models/jewellery')
const mongoose = require('mongoose')

module.exports = function (router) {
  // Get transactions for given year and month, by pearlId...
  router.get('/jewellwey/:year/:month', function (req, res) {
    const pearlId = req.get('pearlId')
    const month = req.params.month - 1 // JS months are zero-based
    const year = req.params.year
    const startDt = new Date(Date.UTC(year, month, 1, 0, 0, 0))
    const endDt = new Date(Date.UTC(year, month + 1, 1, 0, 0, 0))

    const qry = {
      pearlId: pearlId,
      transactionDate: {
        $gte: startDt,
        $lt: endDt
      }
    }

    Jewellery.find(qry)
      .sort({ 'transactionDate': 1 })
      .exec()
      .then(docs => res.status(200)
        .json(docs))
      .catch(err => res.status(500)
        .json({
          message: 'Error finding transactions for user',
          error: err
        }))
  })

  // Get jewellery by name or id ...
  router.get('/jewellery/:name', function (req, res) {
    const jewelleryId = req.get('jewelleryId')
    const name = req.params.name  // 
    const pipeline = [
      {
        $match: {
          jewelleryId: mongoose.Types.ObjectId(jewelleryId),
        }
      },
      {
        $match: {
          name: { $eq: name }
        }
      }
    ]

    Jewellery.aggregate(pipeline).exec()
      .then(docs => res.status(200)
        .json(docs))
      .catch(err => res.status(500)
        .json({
          message: 'Error finding pearl ',
          error: err
        }))
  })

  // Create new transaction document...
  router.post('/jewellwery', function (req, res) {
    let pearl = new Jewellery(req.body)
    pearl.save(function (err, pearl) {
      if (err) return console.log(err)
      res.status(200).json(pearl)
    })
  })
}
