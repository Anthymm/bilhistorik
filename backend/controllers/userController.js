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
    let sql = "SELECT * FROM Users WHERE Username = ?"

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

exports.changeUser = async (req, res) => {
    const { newName, oldName } = req.query
    let sql = "UPDATE Users SET Username = ? WHERE Username = ?"
    let params = [newName, oldName]

    try {
        await connectionMySQL.query(sql, params, (error, results, fields) => {
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

exports.removeUser = async (req, res) => {
    let { userID } = req.query
    let sql = "DELETE FROM Users WHERE UserID = ?"

    try {
        await connectionMySQL.query(sql, [userID], (error, results, fields) => {
            if (error) {
                if (error) throw error
            }
            return res.send(results)
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        })
    }
};
