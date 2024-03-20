function GetId(cb) {
    // accept a useLocation API as a callback to get the id
    return Number(cb?.().pathname.replace(/\/[A-Za-z]{1,}\//g, ""));
}

export default GetId;