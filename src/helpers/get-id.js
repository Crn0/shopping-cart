function GetId(cb) {
    return Number(cb?.().pathname.replace(/\/[A-Za-z]{1,10}\//g, ""));
}

export default GetId;