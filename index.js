var _ = require("lodash");

/**
 * Cleans up an object
 * @param  {[type]} object [description]
 * @return {[type]}        [description]
 */
var clean = function( object ){
    object = _.cloneDeep( object );

    for ( var key in object ){
        switch ( typeof object[key] ){
            case "object":
                if (  Buffer.isBuffer(object[key]) ){
                    object[key] = "Buffer";
                } else {
                    if ( !object.length ){
                        object[key] = clean(object[key]);
                    }
                }
                break;
            case "string":
                object[key] = object[key].replace(/<.+>/gi, "");
                break;
            case "function":
                object[key] = "Function";
                break;
        }
    }

    return object;
}

module.exports = function( level, content, meta ){
    return new clean( meta );
}
