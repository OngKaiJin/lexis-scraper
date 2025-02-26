nodes = [];
toc = [];
years = [];
crid = '';
let loadpatch = (node) =>
    fetch("https://advance.lexis.com/r/tocprovider/4c2fk/toc/4c2fk", {
        "headers": {
            "content-type": "application/json",
            "x-ln-currentrequestid": crid,
        },
        "body": "{\"id\":\"4c2fk\",\"props\":{\"action\":\"collapse\",\"items\":[{\"fieldName\":\"nodeId\",\"value\":\"" + node + "\"}]}}",
        "method": "PATCH",
    }).then((resp) => {
        if (resp.status == 200) {
            return resp.json();
        } else {
            console.log("retry");
            return loadpatch(node);
        }
    });
let loop = (i) => {
    let year = [];
    let yearobj = new Object();
    loadpatch(toc[i])
    .then((content) => {
        let loop2 = (i) => {
            let volume = [];
            let volumeobj = new Object();
            loadpatch(content.collections.toccontainer.collections.tocnodes[i].id)
            .then((content) => {
                for (let i of content.collections.toccontainer.collections.tocnodes) {
                    let obj = new Object();
                    obj.title = i.props.linktemplatetitle;
                    obj.id = i.props.linkhref;
                    volume.push(obj);
                }
            }).then(() => {
                volumeobj[content.collections.toccontainer.collections.tocnodes[i].props.linktemplatetitle] = volume;
                year.push(volumeobj);
            }).then(() => {
                if (i < content.collections.toccontainer.collections.tocnodes.length - 1) {
                    loop2(i + 1)
                }
            });
        }
        loop2(0);
    })
    .then(() => {
        yearobj[years[i]] = year;
        nodes.push(yearobj);
        if (i < toc.length - 1) {
            loop(i + 1);
        } else {
            console.log(nodes);
        }
    });
}
fetch("https://advance.lexis.com/toc/?pdtocfullpath=%2fshared%2ftableofcontents%2furn%3acontentItem%3a5RC3-WK81-FG5X-F000-00000-00", {
    "headers": {
        "accept": "application/json, text/javascript, */*; q=0.01",
    }
}).then((resp) => {
    crid = new URLSearchParams(resp.url).get("crid");
    return resp.json();
}).then((content) => {
    for (i of content.collections.componentmodels.collections.featureproviders[0].collections.toccontainer.collections.tocnodes[0].collections.nodehierarchy) {
        toc.push(i.id);
        years.push(i.props.linktemplatetitle);
    }
}).then (() => {
    loop(0);
});
