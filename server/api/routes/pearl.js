const Pearl = require('../../models/pearl')
const mongoose = require('mongoose')

module.exports = function (router) {
  // Get pearl for given year and month, by pearlId...
  router.get('/pearl/:year/:month', function (req, res) {
    const pearlId = req.get('pearlId')
    const month = req.params.month - 1 // JS months are zero-based
    const year = req.params.year
    const startDt = new Date(Date.UTC(year, month, 1, 0, 0, 0))
    const endDt = new Date(Date.UTC(year, month + 1, 1, 0, 0, 0))

    const qry = {
      pearlId: pearlId,
      createdOn: {
        $gte: startDt,
        $lt: endDt
      }
    }

    Pearl.find(qry)
      .sort({ 'createdOn': 1 })
      .exec()
      .then(docs => res.status(200)
        .json(docs))
      .catch(err => res.status(500)
        .json({
          message: 'Error finding transactions for user',
          error: err
        }))
  })

  // Get pearl by name or id ...
  router.get('/pearl/:name', function (req, res) {
    const pearlId = req.get('pearlId')
    const name = req.params.name  // 
    const pipeline = [
      {
        $match: {
          pearlId: mongoose.Types.ObjectId(pearlId),
        }
      },
      {
        $match: {
          name: { $eq: name }
        }
      }
    ]

    Pearl.aggregate(pipeline).exec()
      .then(docs => res.status(200)
        .json(docs))
      .catch(err => res.status(500)
        .json({
          message: 'Error finding pearl ',
          error: err
        }))
  })

  // Create new pearl...
  router.post('/pearl', function (req, res) {
    let pearl = new Pearl(req.body)
    pearl.save(function (err, pearl) {
      if (err) return console.log(err)
      res.status(200).json(pearl)
    })
  })
}
