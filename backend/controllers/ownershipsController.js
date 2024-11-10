const connectionMySQL = require("../connectionMySQL");

exports.getOwnerships = async (req, res) => {

  let sql = 'SELECT * FROM Ownerships'

  try {
    await connectionMySQL.query(sql, (error, results, fields) => {
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

exports.addOwnership = async (req, res) => {
  const { UserID, CarID, StartDate, EndDate } = req.body
  let sql = 'INSERT INTO Ownerships (UserID, CarID, StartDate, EndDate) VALUES (?, ?, ?, ?)'
  let params = [UserID, CarID, StartDate, EndDate]

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

exports.removeOwnership = async (req, res) => {
  const { OwnershipID } = req.params
  let sql = "DELETE FROM Ownerships WHERE OwnershipID = ?"


  try {
    await connectionMySQL.query(sql, [OwnershipID], (error, results, fields) => {
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
exports.updateOwnership = async (req, res) => {

  const { category, value, OwnershipID } = req.params
  let sql = "UPDATE Ownerships SET ? = ? WHERE OwnershipID = ? "
  let params = [category, value, OwnershipID]


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
