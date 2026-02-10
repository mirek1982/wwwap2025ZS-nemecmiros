//
//  backup.js
//  
//
//  Created by Miroslav Němec on 06.02.2026.
//

//funkce zalohuj

 function backup() {
    let dat =  this.value;
       
    let blob = new Blob([dat], { type: 'text/plain' });
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'zaloha.txt';
    link.click();
}
//konec funkce zalohuj
