init = (pool) => {
    this.pool = pool;
}

checkExists = (type, query) => {
    let result = [];

    if (!(type == "email" || type == "username"))
        throw "Invalid type";

    this.pool.execute("SELECT * FROM Users WHERE `" + type + "` = ?",
        [query],
        (err, results, fields) => {
            results.forEach((element) => {
                result.push(element)
            })
        }
    )
    return result.length > 0;
}

/**
 * Validates user information.
 * Takes user object and returns status object.
 */
signUp = (user) => {
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

    //Check that user object has expected attributes

    //Throw error if it doesn't

    //Check for duplicate e-mail or nickname in database
    checkExists("email")

    //Return error status if duplicate found

    //If no problem, store information from user in database along with 'verified' = false, 'confirmed' = false

    //LOW PRIORITY: Send e-mail to user to confirm e-mail

    //Return OK status if duplicate found

}


verify = () => {

}

//TODO: user.getVerifyStatus should throw a string error
getVerifyStatus = (id) => {

}

test = () => {
    console.log(this.pool);
}

module.exports = {
    init: init,
    checkExists: checkExists
}
