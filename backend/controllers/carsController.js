const connectionMySQL = require("../connectionMySQL");

exports.getCars = async (req, res) => {
  const { CarID } = req.query
  let sql = 'SELECT * FROM Cars WHERE CarID = ?'
  let params = [CarID]
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

exports.addCar = async (req, res) => {
  const { Brand, Model, Year } = req.body
  let sql = 'INSERT INTO Cars (Brand, Model, Year) VALUES (?, ?, ?)'
  let params = [Brand, Model, Year]

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

exports.removeCar = async (req, res) => {

  const { CarID } = req.params
  let sql = "DELETE FROM Cars WHERE CarID = ?"


  try {
    await connectionMySQL.query(sql, [CarID], (error, results, fields) => {
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

exports.updateCar = async (req, res) => {
  const { category, value, CarID } = req.params
  let sql = "UPDATE Cars SET ? = ? WHERE CarID = ? "
  let params = [category, value, CarID]


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
