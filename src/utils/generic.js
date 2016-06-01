// returns first matching list member
export function findWhere(list, props) {
    var len = list.length;
    var match = false;
    var item, prop_k;

    for (var idx = 0; idx<len; idx++) {
        item = list[idx];
        for (prop_k in props) {
            // If props doesn't own the property, skip it.
            if (!props.hasOwnProperty(prop_k)) continue;
            // If item doesn't have the property, no match;
            if (!item.hasOwnProperty(prop_k)) {
                match = false;
                break;
            }
            if (props[prop_k] === item[prop_k]) {
                // We have a match…so far.
                match = true;
            } else {
                // No match.
                match = false;
                // Don't compare more properties.
                break;
            }
        }
        // We've iterated all of props' properties, and we still match!
        // Return that item!
        if (match) return item;
    }
    // No matches
    return null;
}