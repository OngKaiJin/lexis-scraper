list = [];
for (const i of nodes) {
    for (const [yearobj, year] of Object.entries(i)) {
        for (const i of year) {
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
console.log(list);
