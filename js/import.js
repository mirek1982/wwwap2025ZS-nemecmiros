//
//  import.js
//  
//
//  Created by Miroslav Němec on 06.02.2026.
//

//funkce import

 function importuj() {
    
    let file = this.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
     
    reader.onload = function(e) {
        
        let ob = JSON.parse(e.target.result);
  
        let trans = db.transaction('cachedForms', 'readwrite');
        let zaznamenej = trans.objectStore('cachedForms').add(ob);
 
        zaznamenej.onerror = (event) => {
            console.log('chyba při zpracování dat');

        }
        zaznamenej.onsuccess =  (event) => {
            console.log('data vložena');
        
        }
 
    }
}
        
