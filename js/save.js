//
//  save.js
//  
//
//  Created by Miroslav Němec on 06.02.2026.
//

//zde si zpracujem to co jsme si poslali  input textem a predame do promenne
export default function doText(par) {
    
    
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
