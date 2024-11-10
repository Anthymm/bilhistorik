const connectionMySQL = require("../connectionMySQL");

exports.addUser = async (req, res) => {
    const username = req.body.username
    let sql = "INSERT INTO Users (Username) VALUES (?)"

    try {
        await connectionMySQL.query(sql, username, (error, results, fields) => {
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
};

exports.getUser = async (req, res) => {
    const username = req.query.username
    let sql = "SELECT UserID FROM Users WHERE Username = ?"

    try {
        await connectionMySQL.query(sql, username, (error, results, fields) => {
            if (error) {
                if (error) throw error
            }
            res.send(results)
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        })
    }
};
