const connectionMySQL = require("../connectionMySQL");

exports.getServiceHistory = async (req, res) => {

  let sql = 'SELECT * FROM ServiceHistory'

  try {
    await connectionMySQL.query(sql, (error, results, fields) => {
      if (error) {
        if (error) throw error
      }
      return res.json(results)
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

exports.addServiceHistory = async (req, res) => {

  const { CarID, ServiceDate, TypeOfService, Comment, Workshop } = req.body
  let sql = 'INSERT INTO ServiceHistory (CarID, ServiceDate, TypeOfService, Comment, Workshop) VALUES (?, ?, ?, ?, ?)'
  let params = [CarID, ServiceDate, TypeOfService, Comment, Workshop]

  try {
    await connectionMySQL.query(sql, params, (error, results, fields) => {
      if (error) {
        if (error) throw error
      }
      return res.json(results)
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }

}

exports.removeServiceHistory = async (req, res) => {
  const { ServiceID } = req.params
  let sql = "DELETE FROM ServiceHistory WHERE ServiceID = ?"


  try {
    await connectionMySQL.query(sql, [ServiceID], (error, results, fields) => {
      if (error) {
        if (error) throw error
      }
      return res.status(201)
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }

}

exports.updateServiceHistory = async (req, res) => {

  const { category, value, ServiceID } = req.params
  let sql = "UPDATE ServiceHistory SET ? = ? WHERE ServiceID = ? "
  let params = [category, value, ServiceID]


  try {
    await connectionMySQL.query(sql, params, (error, results, fields) => {
      if (error) {
        if (error) throw error
      }
      return res.status(201)
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }

}
