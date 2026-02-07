//
//  import.js
//  
//
//  Created by Miroslav Němec on 06.02.2026.
//

//funkce import

export default function nalejTotu(e) {
    
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
        
        
    }
}
        
