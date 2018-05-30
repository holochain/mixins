
// JSON.parse is necessary until a change is made to Holochain
function __anchors_api_postCallProcess(rtn)
{
    return rtn;
}

function __anchors_api_isObject(item)
{
    return item === Object(item);
}

function setAnchor(anchor, value, entryType, preserveOldValueEntry, anchorHash, valueHash) 
{ 
    // is the first parameter an object?
    if (__anchors_api_isObject(anchor))
        return __anchors_api_postCallProcess(call("anchors", "set", anchors)); // if so, pass it straight through

    // otherwise build our parameter object
    var parms = { anchor: anchor, value: value };

    if (entryType !== undefined) parms.entryType = entryType;
    if (preserveOldValueEntry !== undefined) parms.preserveOldValueEntry = preserveOldValueEntry;
    if (anchorHash !== undefined) parms.anchorHash = anchorHash;
    if (valueHash !== undefined) parms.valueHash = valueHash;
    
    return __anchors_api_postCallProcess(call("anchors", "set", parms));
};

function getAnchor(anchor, anchorHash) 
{ 
    // is the first parameter an object?
    if (__anchors_api_isObject(anchor))
        return __anchors_api_postCallProcess(call("anchors", "get", anchors)); // if so, pass it straight through

    // otherwise build our parameter object
    var parms = { anchor: anchor };

    if (anchorHash !== undefined) parms.anchorHash = anchorHash;
    
    return __anchors_api_postCallProcess(call("anchors", "get", parms));
};

function addToListAnchor(anchor, value, entryType, preserveOldValueEntry, anchorHash, valueHash) 
{ 
    // is the first parameter an object?
    if (__anchors_api_isObject(anchor))
        return __anchors_api_postCallProcess(call("anchors", "addToList", anchors)); // if so, pass it straight through

    // otherwise build our parameter object
    var parms = { anchor: anchor, value: value };

    if (entryType !== undefined) parms.entryType = entryType;
    if (preserveOldValueEntry !== undefined) parms.preserveOldValueEntry = preserveOldValueEntry;
    if (anchorHash !== undefined) parms.anchorHash = anchorHash;
    if (valueHash !== undefined) parms.valueHash = valueHash;
    
    return __anchors_api_postCallProcess(call("anchors", "addToList", parms));
};

function getFromListAnchor(anchor, anchorHash) 
{ 
    // is the first parameter an object?
    if (__anchors_api_isObject(anchor))
        return __anchors_api_postCallProcess(call("anchors", "getFromList", anchors)); // if so, pass it straight through

    // otherwise build our parameter object
    var parms = { anchor: anchor };

    if (anchorHash !== undefined) parms.anchorHash = anchorHash;
    
    return __anchors_api_postCallProcess(call("anchors", "getFromList", parms));
};

function removeFromListAnchor(anchor, value, entryType, preserveOldValueEntry, anchorHash, valueHash) 
{ 
    // is the first parameter an object?
    if (__anchors_api_isObject(anchor))
        return __anchors_api_postCallProcess(call("anchors", "removeFromList", anchors)); // if so, pass it straight through

    // otherwise build our parameter object
    var parms = { anchor: anchor };

    if (value !== undefined) parms.value = value;
    if (entryType !== undefined) parms.entryType = entryType;
    if (preserveOldValueEntry !== undefined) parms.preserveOldValueEntry = preserveOldValueEntry;
    if (anchorHash !== undefined) parms.anchorHash = anchorHash;
    if (valueHash !== undefined) parms.valueHash = valueHash;
    
    return __anchors_api_postCallProcess(call("anchors", "removeFromList", parms));
};

function makeAnchorValueHash(value, entryType)
{
    var parms = { value: value };
    if (entryType !== undefined) parms.entryType = entryType;
    
    return __anchors_api_postCallProcess(call("anchors", "makeAnchorValueHash", parms));
}