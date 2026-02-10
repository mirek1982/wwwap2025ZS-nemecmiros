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
    
    zaznamenej.onerror = (event) => {
        console.log('chyba při zpracování dat');
       
    }
    zaznamenej.onsuccess = (event) => {
        console.log('data vložena');
        
    }

}


