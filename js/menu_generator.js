

/*
This JS is used to generate the menu, analise especifyc folder and create and array, mixing with html code
to convert and can be included to the page
*/


    export function getFilesInFolder(url, folderPath , filter = ".html") {

        const result = fetch(url+folderPath)
            .then((response) =>{ 
                return response.text()
            })
            .then(data => {                
                let el = document.createElement('html');
                el.innerHTML = data;

                //let list = el.children[1].childNodes[3].childNodes[1].childNodes[3].childNodes[2].childNodes[0].href;
                let list = el.querySelector("#files")
                let arr = [];
                for (let i = 1; i < list.children.length; i++) {
                    const res = list.children[i].querySelectorAll(".name")[0].innerHTML;
                    if( res.endsWith(filter)){
                        arr.push( folderPath+res ) ;
                    } 
                }
                return arr;
            })
        return result
    }

    export function generateMenu(elementList, stringTag) {
        let menu = '';
        for (let i = 0; i < elementList.length; i++) {
            const element = elementList[i];
            menu += `<${stringTag}><a href="${element}">${stringTag}</a></${stringTag}>`;
        }
        return menu;
    }
