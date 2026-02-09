newlist = [];
oldlist = [];
list = [];
function flatten (list, nodes) {
    for (const i of nodes.toReversed()) {
        for (const [yearobj, year] of Object.entries(i)) {
            for (const i of year.toReversed()) {
                for (const [volumeobj, volume] of Object.entries(i)) {
                    for (const i of volume) {
                        let obj = new Object;
                        if (i.id == undefined) {
                            obj.id = "--";
                        } else {
                            obj.id = i.id;
                        }
                        list.push(obj);
                    }
                }
            }
        }
    }
}
flatten(newlist, nodes);
flatten(oldlist, oldnodes);
increment = newlist.map(i => {
    matched = false;
    for (let j of oldlist) {
        if (i.id == j.id) {
            matched = true;
        }
    };
    if (!matched) {
        list.push({id: i.id});
    } else {
        list.push(undefined);
    }
});
