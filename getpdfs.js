let loop3 = (i) => {
    if (list[i].hasOwnProperty("pdf") || list[i].id == "--") {
        console.log((i + 1) + "/" + list.length);
        if (i < list.length - 1) {
            loop3(i + 1);
        } else {
            console.log(list);
        }
    } else {
        fetch("https://advance.lexis.com/document/?pddocfullpath=" + list[i].id).then((resp) => resp.text())
        .then((content) => {
            parser = new DOMParser();
            doc = parser.parseFromString(content, "text/html");
            strings = doc.querySelector("body > main > script:nth-child(5)").innerHTML;
            if (strings.includes("attachmentid")) {
                list[i].pdf = strings.substring(strings.indexOf("attachmentid")+15,strings.indexOf("attachmentid")+59);
                list[i].pdftitile = strings.substring(strings.indexOf("documenttitle")+16,strings.indexOf("tocid")-3);
            } else {
                list[i].pdf = "--"
                list[i].pdftitile = "--"
            }
        }).then(() => {
            console.log((i + 1) + "/" + list.length);
            if (i < list.length - 1) {
                loop3(i + 1);
            } else {
                console.log(list);
            }
        });
    }
}
loop3(0);
