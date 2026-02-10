//
//  save.js
//  
//
//  Created by Miroslav Němec on 06.02.2026.
//

//let predanejmeno = this;



function   saveRecord(vstup)   {


 const   ob = JSON.parse(vstup);
    
    let trans = db.transaction('cachedForms', 'readwrite');
    let zaznamenej = trans.objectStore('cachedForms').add(ob);
    
    zaznamenej.onerror = function(e) {
        console.log('chyba při zpracování dat');
        console.error(e);
    }
    zaznamenej.oncomplete = function(e) {
        console.log('data vložena');
        
    }

}


