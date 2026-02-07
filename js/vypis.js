export default function  vypis() {
    
  
 
    
    
    let objectStore = db.transaction("cachedForms").objectStore("cachedForms");
    objectStore.openCursor().onsuccess = event => {
        let cursor = event.target.result;
        
        if(cursor)  {
            
            const ckey = cursor.key;
            
            let osoba = cursor.value;
            
            //export dat z databaze
            let textovadata = "{";
            let keys = Object.keys(osoba);
            let pocethodnot = keys.length;
            
            
            for (let i = 0; i < pocethodnot; i++)  {
                
                
                
                if (Object.keys(osoba)[i] == "data"){
                    
                    textovadata += '"' + Object.keys(osoba)[i]  + '":"' + Object.values(osoba)[i] + '"';
                }  else  {   textovadata += '"' + Object.keys(osoba)[i]  + '":"' + Object.values(osoba)[i] + '"';}
                
                
                
                
                
                
                
                if (i <= pocethodnot-2) { textovadata += ',' ;}
            }
            
            textovadata += '}\n';
            // konec exportu
            
            
            
            
            let para = document.createElement("p");
            
            let br = document.createElement("BR");
            let hr = document.createElement("HR");
            para.setAttribute("id", "odstavec"+ckey);
            para.style.zIndex = "1";
            
            
            
            
            if(!osoba.jmeno)  {
                
                para.innerHTML="noname";
                
            } else {
                para.innerHTML=osoba.jmeno;
                
            }
            
            document.body.appendChild(para);
            let fot = document.createElement("IMG");
            let odata =  'data:image/jpeg;base64,' + osoba.data;
            
            fot.setAttribute("src", odata);
            fot.setAttribute("width", "300");
            fot.setAttribute("height", "200");
            fot.setAttribute("alt", osoba.jmeno);
            para.appendChild(fot);
            
            let smaz =  document.createElement("button");
            let popis1 = document.createTextNode("smaž");
            smaz.setAttribute('type','button');
            smaz.setAttribute('id','smaz'+ckey);
            smaz.setAttribute('value',ckey);
            
            
            
            let zalohuj = document.createElement('BUTTON');
            
            zalohuj.setAttribute('value',textovadata );
            zalohuj.setAttribute('type','button');
            zalohuj.setAttribute('id','button');
            
            let zalohujpopis = document.createTextNode('zálohuj');
            
            
            zalohuj.appendChild(zalohujpopis);
            
            zalohuj.addEventListener("click", downloadTextFile);
            
            smaz.appendChild(popis1);
            
            para.appendChild(smaz);
            para.appendChild(zalohuj);
            para.appendChild(br);
            
            document.getElementById('odstavec'+ckey).appendChild(hr);
            
            document.getElementById("smaz"+ckey).addEventListener('click', smazZaznam);
            
            cursor.continue();
            
            
            
        }
        
    }
    
}

    
    
