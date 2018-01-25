(function() {
    const $body = document.body;
    const $siteNav = document.querySelector('.site-nav');
    const $siteNavLinks = $siteNav.querySelectorAll('.link');
    const bodyPosition = document.querySelector('[data-position]');

/*
    const $contacto = document.querySelector('.contacto');
    const $contacto__name = $siteSections.contacto.querySelector('.contacto__name');
    const $contacto__email = $contacto.querySelector('.contacto__email');
    const $contacto__phone = $contacto.querySelector('.contacto__phone');
*/

    // function customInvalidMsg(el, msg) {
    //     console.log(this);
    //     el.addEventListener("invalid", function() { this.setCustomValidity(msg) });
    // }

    // customInvalidMsg($contacto__name, 'Tu nombre es obligatorio');
    // customInvalidMsg($contacto__email, 'Tu correo es obligatorio');
    // customInvalidMsg($contacto__phone, 'Tu numero de telefono es obligatorio');

/*
    $contacto__name.addEventListener('invalid', function() {
        if(this.validity.valueMissing) {
            this.setCustomValidity('msg1');
        } else {
            this.setCustomValidity('');
        }
    }, false);
    $contacto__email.addEventListener('invalid', function() {

        console.log('this.willValidate: ', this.willValidate);
        console.log('Validates: ', this.validity.valid);
        console.log('Value missing: ', this.validity.valueMissing);
        console.log('------------------');

        if(this.validity.valueMissing) {
            this.setCustomValidity('msg2');
        } else {
            this.setCustomValidity('');
        }
    }, false);
    $contacto__phone.addEventListener('invalid', function() {
        // this.setCustomValidity('msg3');
        if(this.validity.valueMissing) {
            this.setCustomValidity('msg3');
        } else {
            this.setCustomValidity('');
        }
    }, false);
*/

    // $contacto__name.addEventListener("invalid", customInvalidMsg, false);
    // $contacto__email.addEventListener("invalid", customInvalidMsg, false);
    // $contacto__phone.addEventListener("invalid", customInvalidMsg, false);


    function ElementData(element) {
        const obj = {};
        obj.el = document.querySelector('#'+element);
        obj.init = obj.el.offsetTop;
        obj.end = obj.init + obj.el.getBoundingClientRect().height;
        return obj;
    }

    let siteSections = {
        portada     : ElementData('portada'),
        quienSoy    : ElementData('quienSoy'),
        estudios    : ElementData('estudios'),
        experiencia : ElementData('experiencia'),
        sobreMi     : ElementData('sobreMi'),
        contacto    : ElementData('contacto')
    }

    let scrollPosition = window.scrollY;

    function scrollViewer(actualScroll) {

        if (actualScroll < siteSections.quienSoy.init) {

            $body.setAttribute('data-position', 'portada');

        } else if (actualScroll > siteSections.quienSoy.init && actualScroll < siteSections.quienSoy.end) {

            $body.setAttribute('data-position', 'quienSoy');

        } else if (actualScroll > siteSections.estudios.init && actualScroll < siteSections.estudios.end) {

            $body.setAttribute('data-position', 'estudios');

        } else if (actualScroll > siteSections.experiencia.init && actualScroll < siteSections.experiencia.end) {

            $body.setAttribute('data-position', 'experiencia');

        } else if (actualScroll > siteSections.sobreMi.init && actualScroll < siteSections.sobreMi.end) {

            $body.setAttribute('data-position', 'sobreMi');

        } else if (actualScroll > siteSections.contacto.init) {

            $body.setAttribute('data-position', 'contacto');
        }

    }

    window.addEventListener('scroll', function(){
        scrollPosition = window.scrollY;
        scrollViewer(scrollPosition);
    });

    window.addEventListener('resize', function(event){
        scrollPosition = window.scrollY;
        siteSections = {
            portada     : ElementData('portada'),
            quienSoy    : ElementData('quienSoy'),
            estudios    : ElementData('estudios'),
            experiencia : ElementData('experiencia'),
            sobreMi     : ElementData('sobreMi'),
            contacto    : ElementData('contacto')
        }
    });

    scrollViewer(scrollPosition);

    $siteNavLinks.forEach( $siteNavLink => {
            $siteNavLink.addEventListener('click', function(e) {
                e.preventDefault();
                let toSection = this.href.split('#')[1];

                for ( el in siteSections ) {
                    if ( el == toSection ) {
                        goToSection(siteSections[el]);
                    }
                }

            });
        }
    );

    function goToSection(goToEl) {

        // var jump = parseInt(goToEl.init * 0.3);
        var jump = parseInt(goToEl.el.getBoundingClientRect().top * 0.5);

        document.documentElement.scrollTop += jump;

        if ( !goToEl.lastJump || goToEl.lastJump > Math.abs(jump) ) {
            goToEl.lastJump = Math.abs(jump);
            setTimeout(function() {
                goToSection(goToEl);
            }, 25);
        } else {
            goToEl.lastJump = null;
        }
    }

})();