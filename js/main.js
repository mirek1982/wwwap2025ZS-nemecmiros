//
//  main.js
//  
//
//  Created by Miroslav Němec on 06.02.2026.
//
    
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
    


let modul2= document.createElement("SCRIPT");
modul2.setAttribute('type','module');
let h2=document.createTextNode("import downloadTextFile from './js/backup.js';downloadTextFile;");
modul2.appendChild(h1);
document.body.appendChild(modul2);
    
    
 
let modul3= document.createElement("SCRIPT");
modul3.setAttribute('type','module');
let h3=document.createTextNode("import nalejTotu from './js/import.js';nalejTou();");
modul3.appendChild(h1);
document.body.appendChild(modul3);


let modul4= document.createElement("SCRIPT");
modul4.setAttribute('type','module');
let h4=document.createTextNode("import doText from './js/import.js';doText();");
modul4.appendChild(h1);
document.body.appendChild(modul4);
    
   
let modul5= document.createElement("SCRIPT");
modul5.setAttribute('type','module');
let h5=document.createTextNode("import smazZaznam from './js/smazat.js';smazZaznam();");
modul5.appendChild(h1);
document.body.appendChild(modul5);
 
        
        
        
        
   
    
    
    


