//
//  main.js
//  
//
//  Created by Miroslav Němec on 06.02.2026.
//

//<script>
    //vykreslíme si nějaký interface

    
    
    function zaklad()  {
 
        
        let text1 = document.createTextNode("Aplikace kartotéka je aplikace pro ukládání dat do indexované databáze v prohlížeči. Do formuláře níže zadejte jméno a poté se zobrazí možnost vložit obrazový soubor. Tyto data se uloží  v json formátu do indexované databáze.  Všechna data jsou automaticky vypsána pokud nějaké existují.");
        
        
   
        
        
        document.body.style.backgroundColor = "white";
        
        
        let br = document.createElement("BR");
        let hr = document.createElement("HR");
        
        
        let h1 = document.createElement("h1");
        
        document.body.appendChild(h1);
        
        
        document.body.appendChild(text1);
        
        
        
        let div1 = document.createElement("div");
        
        let div4 = document.createElement("div");
        
        let div2 = document.createElement("div");
        div2.setAttribute('id','fotobox');
        
        
        let div3 = document.createElement("div");
        div3.setAttribute('id','top');
        
        
        
        const node3 = document.createTextNode("importuj zálohovanou položku a nebo pokračuj níže na vložení nové:  ");
        
        let policko3 =  document.createElement("input");
        policko3.setAttribute('type', 'file');
        policko3.setAttribute('name','import');
        policko3.setAttribute('id','importace');
        
        
        
        
        div4.appendChild(node3);
        div4.appendChild(policko3);
        div4.after(br);
        
        const node1 = document.createTextNode("započni zadání nové položký udáním jména  :  ");
        
        let policko1 =  document.createElement("input");
        policko1.setAttribute('type', 'text');
        policko1.setAttribute('name','jmeno');
        policko1.setAttribute('id','jmeno');
        policko1.setAttribute('placeholder','jmeno');
        
        
        div1.appendChild(node1);
        div1.appendChild(policko1);
        
        
        
        
        
        
        
        div1.after(br);
        
        
        
        
        const node2 = document.createTextNode("nahraj  fotografii :  ");
        
        let policko2 =  document.createElement("input");
        policko2.setAttribute('type', 'file');
        policko2.setAttribute('name','fotka');
        policko2.setAttribute('id','fotka');
        
        div2.appendChild(node2);
        div2.appendChild(policko2);
        
        
        
        document.body.appendChild(div4);
        
        document.body.appendChild(div1);
        document.body.appendChild(div2);
        document.body.appendChild(div3);
        div3.after(hr);
        
        
        document.getElementById("fotobox").style.display="none";
        
        document.getElementById("jmeno").addEventListener('change', doText, false);
        document.getElementById("importace").addEventListener('change', nalejTotu, false);
        
        initDb();
    }
    
    
  let db;
    let dbVersion = 1;
    let dbReady = false;
    
function initDb() {
    let request = indexedDB.open('kartoteka', dbVersion);
    
    request.onerror = function(e) {
        console.error('Unable to open database.');
    }
    
    request.onsuccess = function(e) {
    db = e.target.result;
    console.log('db opened' + db);
        
  
        
        
        let modul1= document.createElement("SCRIPT");

        modul1.setAttribute('type','module');

        let h1=document.createTextNode("import vypis from './js/vypis.js';vypis();");

        modul1.appendChild(h1);

        document.body.appendChild(modul1);
    
  
        
    }
    
    
    request.onupgradeneeded = function(e) {
        let db = e.target.result;
        let  item = db.createObjectStore('cachedForms', {keyPath:'id', autoIncrement: true});
        
        
        
        dbReady = true;
    }
}
    

    
    
    // funkce smazat
    function smazZaznam(parametr)  {
        
        let ident = parametr.target.value;
        
        
        let transakce = db.transaction(["cachedForms"], 'readwrite');
        let zaznam = transakce.objectStore('cachedForms');
        
        
        
        zaznam.openCursor().onsuccess = (event) => {
            const cursor = event.target.result;
            
            
            if (cursor) {
                if (cursor.key < ident) {
                    cursor.continue();
                }
                
                if(cursor.key == ident)  {
                    const request = cursor.delete();
                    request.onsuccess = () => {
                        alert("smazan zaznam   " + ident);
                        location.reload();
                    };
                    
                    
                }
            }
            
        }
        
        
        //
        
    }
    //konec smazani
    
    //funkce zalohuj
    
    function downloadTextFile(data) {
        let dat =  data.target.value;
        
        
        
        
        
        
        let blob = new Blob([dat], { type: 'text/plain' });
        let link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'zaloha.txt';
        link.click();
    }
    
    
    //konec funkce zalohuj
    
    
    //funkce import
    
    function nalejTotu(e) {
        
        let file = e.target.files[0];
        
        
        let reader = new FileReader();
        
        reader.readAsText(file);
        
        
        // zacatek funkce na vlozeni dat
        
        
        reader.onload = function(e) {
            
            let json = JSON.parse(e.target.result);
            
            
            
            let ob = {
                
                jmeno:json.jmeno,
                data: json.data,
                created:json.created
            };
            
            let trans = db.transaction('cachedForms', 'readwrite');
            let zaznamenej = trans.objectStore('cachedForms').add(ob);
            
            
            
            zaznamenej.onerror = function(e) {
                console.log('chyba při zpracování dat');
                
                
                console.error(e);
            }
            
            zaznamenej.oncomplete = function(e) {
                console.log('data vložena');
                
                
            }
            
            
            
            
            //konec importu
            
            
        }
    }
    
    
    
    //konec funkce import
    
    
    
    //zde si zpracujem to co jsme si poslali  input textem a predame do promenne
    function doText(par) {
        
        
        let   predanejmeno =  par.target.value;
        
        
        document.getElementById("fotobox").style.display = "block";   //zobrazime si file input
        
        document.getElementById("fotka").addEventListener('change', doFile);   //zde budeme poslouchat  az dodame file
        
        //  zde si zpracuju  file a pridam   jmeno a  vlozim do db
        
        
        function doFile(e) {
            
            let file = e.target.files[0];
            
            
            let reader = new FileReader();
            
            reader.readAsBinaryString(file);
            
            
            // zacatek funkce na vlozeni dat
            
            
            reader.onload = function(e) {
                
                let bits = e.target.result;
                
                
                
                let ob = {
                    
                    jmeno:predanejmeno,
                    data: btoa(bits),
                    created:new Date()
                };
                
                let trans = db.transaction('cachedForms', 'readwrite');
                let zaznamenej = trans.objectStore('cachedForms').add(ob);
                
                
                
                zaznamenej.onerror = function(e) {
                    console.log('chyba při zpracování dat');
                    
                    
                    console.error(e);
                }
                
                zaznamenej.oncomplete = function(e) {
                    console.log('data vložena');
                    
                    
                }
                
                
                
                
                //konec funkce  na vlozeni dat
                
                
            }  // konec funkce do file
        }  //konec funkce doText
        
        
        
        
    }
    
    
    


