const sqldb = require("./sqldb");
const status = require("./status");

this.pool = sqldb.pool;

checkExists = async (type, query) => {
    if (!(type == "email" || type == "username"))
        throw "Invalid type";

    //Need await
    const [row] = await this.pool.execute(`SELECT userID FROM Users WHERE ${type} = ?`, [query]);

    return row.length > 0;
}

/**
 * Validates user information.
 * Takes user object and returns status object.
 */
signUp = async (user) => {
    /*
    Assume 'user' object looks like this:
    {
        email: "string",
        username: "string",
        password: "string",
        firstName: "string",
        lastName: "string",
        photoUrl: "string"
    }

    Throw error if any information is missing
    */

    //TODO: Check that user object has expected attributes throw error if it doesn't

    //Check for duplicate e-mail or nickname in database. Want both to be false
    existsEmail = await checkExists("email", user.email);
    existsUsername = await checkExists("username", user.username);

    //Return error status if duplicate found
    if (existsEmail) {
        return status.err("E-mail already registered in system.")
    } else if (existsUsername) {
        return status.err("Username already exists.")
    }

    //If no problem, store information from user in database along with 'verified' = false, 'confirmed' = false
    //TODO: Figure out how to make it return boolean on fail/success entry
    await this.pool.execute(`INSERT INTO Users (email, username, password, firstName, lastName, balance, verifyStatus)
    VALUES (?, ?, ?, ?, ?, 1000, false);`, [user.email, user.username, user.password, user.firstName, user.lastName]);

    //TODO: LOW PRIORITY: Send e-mail to user to confirm e-mail
    return status.ok();
}

//Send id AND status on success
//TODO: change id to login token; system is very vulnerable at the moment
login = async (credentials) => {
    /**
     * Assume credentials object looks like this:
     * {
     *      username: "string",
     *      password: "string"
     * }
     * 
     * username or email can be used, but at least 1 must be present
     */

    const [row] = await this.pool.execute(`SELECT * FROM Users WHERE (username = ? OR email = ?) AND password = ?;`, [credentials.username, credentials.username, credentials.password]);

    console.log(row[0]);
    if (row.length === 1) {
        return status.okAppend({
            token: row[0].userID
        });
    } else {
        return status.err("Incorrect credentials");
    }
}


verify = async (user) => {
     /**
     * Assume user object looks like this:
     * {
     *      userID: int
     * }
     */
    let currentStatus = await getVerifyStatusAdmin(user.userID);

    if (!currentStatus) {
        await this.pool.execute(`UPDATE Users SET verifyStatus = 1 WHERE userID = ?;`, [user.userID]);
        return status.ok();
    } else {
        return status.err("User is aleady verified");
    }
}

//User version
getVerifyStatus = async (token) => {
    /**
     * Assume token object looks like this:
     * {
     *      userID: int,
     *      token: "string"
     * }
     * 
     * username or email can be used, but at least 1 must be present
     */

    //TODO: Add token to this for increased security
    const [row] = await this.pool.execute(`SELECT verifyStatus FROM Users WHERE userID = ?;`, [token.userID]);
    if (row.length > 0) {
        if (row[0].verifyStatus) {
            return status.okAppend({
                "status": "verified"
            })
        } else {
            return status.okAppend({
                status: "unverified"
            })
        }
    } else {
        return status.err("Invalid ID")
    }
}


//Admin version, never exposed
getVerifyStatusAdmin = async (userID) => {
    const [row] = await this.pool.execute(`SELECT verifyStatus FROM Users WHERE userID = ?;`, [userID]);
    if (row.length > 0) {
        if (row[0].verifyStatus) {
            return true;
        } else {
            return false;
        }
    } else {
        throw "Invalid ID";
    }
}

test = () => {
    console.log(this.pool);
}

module.exports = {
    checkExists: checkExists,
    signUp: signUp,
    login: login,
    getVerifyStatus: getVerifyStatus,
    verify: verify
}
