count = 0;
imperfect = [];
list2 = Object.entries(list);
for (const i of nodes.toReversed()) {
    for (const [yearobj, year] of Object.entries(i)) {
        for (const i of year.toReversed()) {
            for (const [volumeobj, volume] of Object.entries(i)) {
                for (const i of volume) {
                    if (list2[count][1] == undefined) {
                        i.pdf = undefined;
                        i.doctitle = undefined;
                    } else if (list2[count][1].hasOwnProperty("pdf")) {
                        i.pdf = list2[count][1].pdf;
                        i.doctitle = list2[count][1].doctitle;
                    }
                    count += 1;
                }
            }
        }
    }
}
output = 'identifier,file,REMOTE_NAME,title,date,mediatype,collection\n';
for (const i of nodes.toReversed()) {
    count = 0;
    for (const [yearobj, year] of Object.entries(i)) {
        for (const j of year.toReversed()) {
            count = 0;
            for (const [volumeobj, volume] of Object.entries(j)) {
                for (const k of volume) {
                    if (k.pdf == undefined && k.hasOwnProperty("pdf")) {
                        count = -1;
                    }
                    if (k.pdf != undefined && k.pdf != "--" && k.hasOwnProperty("pdf")) {
                        volumenum = volumeobj.replace('Volume ','').replace('Supplementary','supp');
                        if (count == 0) {
                            output += 'mlj_' + yearobj + '_' + volumenum;
                        } 
                        output += ',"' + k.pdf.slice(16) + '"';
                        output += ',"' + ('MLJ ' + yearobj + ' ' + volumenum + ' ' + k.title.split('[' + yearobj + '] ' + volumenum)[1].split('-')[0].replace('MLJ','').trim()).trim() + '.pdf"';
                        if (count == 0) {
                            output += ',"' + 'Malayan Law Journal, ' + yearobj + ', ' + volumeobj + '"';
                            output += ',[' + yearobj + ']';
                            output += ',texts';
                            output += ',malayan-law-journal';
                        } 
                        if (!k.title.includes('[' + yearobj + '] ' + volumenum + ' MLJ')) {
                            imperfect.push(k.title);
                        } else if (!/^\d{1,3}$|^\d{1,3}[a-z]$/.test(k.title.split('[' + yearobj + '] ' + volumenum)[1].split('-')[0].replace('MLJ','').trim())) {
                            imperfect.push(k.title);
                        }
                    }
                    output += '\n';
                    count += 1;
                }
            }
        }
    }
}
console.log(output.slice(0,-1));
