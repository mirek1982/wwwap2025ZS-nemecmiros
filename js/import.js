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
        
        let json = JSON.parse(e.target.result);
    
        let ob = {
            
            jmeno:json.jmeno,
            data: json.data,
            created:json.created
        };
        
        let trans = db.transaction('cachedForms', 'readwrite');
        let zaznamenej = trans.objectStore('cachedForms').add(ob);
 
        zaznamenej.onerror = function() {
            console.log('chyba při zpracování dat');

        }
        zaznamenej.oncomplete = function() {
            console.log('data vložena');
        
        }
 
    }
}
        
