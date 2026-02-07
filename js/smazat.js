//
//  smazat.js
//  
//
//  Created by Miroslav Němec on 07.02.2026.
//



// funkce smazat
export default function smazZaznam(parametr)  {
    
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
