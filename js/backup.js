//
//  backup.js
//  
//
//  Created by Miroslav Němec on 06.02.2026.
//

//funkce zalohuj

export default function downloadTextFile(data) {
    let dat =  data.target.value;
    
    
    
    
    
    
    let blob = new Blob([dat], { type: 'text/plain' });
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'zaloha.txt';
    link.click();
}


//konec funkce zalohuj
