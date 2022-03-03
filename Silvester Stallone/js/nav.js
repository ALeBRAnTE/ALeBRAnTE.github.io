function menu(){
    var CheckboxMenu = document.querySelector('#cb-menu');
    const menu = document.querySelector('.ul-menu');

    if (CheckboxMenu.checked == true){
        menu.style.display = 'flex';
    } else {
        menu.style.display = 'none';
    }
}
