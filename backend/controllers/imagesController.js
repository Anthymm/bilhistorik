const connectionMySQL = require("../connectionMySQL");

exports.getImages = async (req, res) => {
  let sql = 'SELECT * FROM Images'

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

exports.addImage = async (req, res) => {

  const { ImageURL, CarID } = req.body
  let sql = 'INSERT INTO Images (ImageURL, CarID) VALUES (?, ?)'
  let params = [ImageURL, CarID]

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

exports.removeImage = async (req, res) => {
  const { ImageID } = req.params
  let sql = "DELETE FROM Images WHERE ImageID = ?"


  try {
    await connectionMySQL.query(sql, [ImageID], (error, results, fields) => {
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

exports.updateImage = async (req, res) => {

  const { ImageURL, ImageID } = req.params
  let sql = "UPDATE Images SET ImageURL = ? WHERE ImageID = ? "
  let params = [ImageURL, ImageID]


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
