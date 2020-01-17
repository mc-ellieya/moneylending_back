let ok = () => {
    return {
        success: true,
        status: "OK"
    }
}

let err = (errMsg) => {
    return {
        success: false,
        status: errMsg
    }
}

module.exports = {
    ok: ok,
    err: err
}
