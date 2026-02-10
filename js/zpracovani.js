//
//  zpracovani.js
//  
//
//  Created by Miroslav Němec on 10.02.2026.
//



let zData = this;




function zpracujText() {

    let pom = this.value;

console.log(pom);
    
    zData =  pom;
 
    document.getElementById("fotobox").style.display = "block";   //zobrazime si file input
    
    document.getElementById("fotka").addEventListener('change', doFile);   //zde budeme poslouchat  az dodame file


}
    
    
    
function doFile() {
    
    const file = this.files[0];
    
    const reader = new FileReader();
    reader.onload = () => {
  
        par1 = zData;
        par2 = btoa(reader.result);
        
      json = '{"jmeno":"'+par1+'", "data":"'+par2+'", "create":"'+new Date()+'"}';
        
      saveRecord(json);
        
                };
    
    reader.readAsBinaryString(file);
}
    
