let ok = () => {
    return {
        success: true,
        status: "OK"
    }
}

let okAppend = (obj) => {
    let initial = {
        success: true,
        status: "OK"
    }

    for (let [key, value] of Object.entries(obj)) {
        initial[key] = value;
    }
    return initial;
}

let err = (errMsg) => {
    return {
        success: false,
        status: errMsg
    }
}

module.exports = {
    ok: ok,
    okAppend,
    err: err
}
