
export function getPathVal(data, dataKey){
    var path = dataKey;
    if(path==null){
        return;
    }
    path = path.split('.');
    var ret = data;
    for(var i in path){
        ret = ret[path[i]];
        if(ret==null){
            return;
        }
    }
    return ret;
}

export function getPathValOrDefault(data, dataKey,defaultVal){
    var ret = getPathVal(data,dataKey);
    return ret == null ? defaultVal:ret;
}

export function getPathValNotEmpty(data, dataKey,defaultVal){
    var ret = getPathVal(data,dataKey);
    return ret == null || ret == '' ? defaultVal:ret;
}

export function getPathValSep(data, dataKey){
    return getPathValNotEmpty(data,dataKey,'— —');
}