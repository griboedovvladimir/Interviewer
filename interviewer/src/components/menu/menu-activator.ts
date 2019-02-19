export class MenuActivator {
    constructor() {

    }
    public activate() {
        if (!document.getElementById('burger-conteiner')) {
            let leftButton = document.createElement('div');
            leftButton.classList.add('mdl-layout__tab-bar-button');
            leftButton.classList.add('mdl-layout__tab-bar-left-button');
            leftButton.id = "burger-conteiner";
            let leftButtonIcon = document.createElement('i');
            leftButtonIcon.classList.add('material-icons');
            leftButtonIcon.id = 'burger';
            leftButtonIcon.textContent = 'dehaze';
            leftButton.appendChild(leftButtonIcon);
            document.body.appendChild(leftButton);
            leftButton.addEventListener('click', () => {
                let menu = document.getElementsByClassName('mdl-layout__drawer')[0];
                menu.classList.add('is-visible');
                let overlay = document.getElementsByClassName('mdl-layout__obfuscator')[0];
                overlay.classList.add('is-visible');
                overlay.addEventListener('click', ()=>{
                    overlay.classList.remove('is-visible');
                    menu.classList.remove('is-visible');
                })
            });
            window.addEventListener('resize', (event)=>{
                if(window.innerWidth>1025 && !document.getElementById('is-visible')){
                    if(document.getElementsByClassName('mdl-layout__drawer')[0]) {
                        let menu = document.getElementsByClassName('mdl-layout__drawer')[0];
                        menu.classList.remove('is-visible');
                        let overlay = document.getElementsByClassName('mdl-layout__obfuscator')[0];
                        overlay.classList.remove('is-visible');
                    }
                }
            })
        }
    }

    public deactivate() {
        if(document.getElementById('burger-conteiner')) {
            document.getElementById('burger-conteiner')!.remove();
        }
    }
}