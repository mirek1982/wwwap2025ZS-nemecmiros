//
//  smazat.js
//  
//
//  Created by Miroslav Němec on 07.02.2026.
//



// funkce smazat
function smazat()  {
    
  
    let transakce = db.transaction(["cachedForms"], 'readwrite');
    let zaznam = transakce.objectStore('cachedForms');
    
    
    
    zaznam.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        
        
        if (cursor) {
            if (cursor.key < this.value) {
                cursor.continue();
            }
            
            if(cursor.key == this.value)  {
                const request = cursor.delete();
                request.onsuccess = () => {
                    alert("smazan zaznam   " + this.value);
                    location.reload();
                };
                
                
            }
        }
        
    }
    
    
    //
    
}
//konec smazani
