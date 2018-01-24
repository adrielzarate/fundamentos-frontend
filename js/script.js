(function() {
    const $body = document.body;
    const $siteNav = document.querySelector('.site-nav');
    const $siteNavLinks = $siteNav.querySelectorAll('.link');

/*
    const $contacto = document.querySelector('.contacto');
    const $contacto__name = $contacto.querySelector('.contacto__name');
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

    const quienSoy    = ElementData('quienSoy');
    const estudios    = ElementData('estudios');
    const experiencia = ElementData('experiencia');
    const sobreMi     = ElementData('sobreMi');
    const contacto    = ElementData('contacto');

    let scrollPosition = window.scrollY;

    // let quienSoyTop    = $quienSoy.getBoundingClientRect().top;
    // let quienSoyEnd    = quienSoyTop + $quienSoy.getBoundingClientRect().height;

    // let estudiosTop    = $estudios.getBoundingClientRect().top;
    // let estudiosEnd    = estudiosTop + $estudios.getBoundingClientRect().height;

    // let experienciaTop = $experiencia.getBoundingClientRect().top;
    // let experienciaEnd = experienciaTop + $experiencia.getBoundingClientRect().height;

    // let sobreMiTop     = $sobreMi.getBoundingClientRect().top;
    // let sobreMiEnd     = sobreMiTop + $sobreMi.getBoundingClientRect().height;

    // let contactoTop    = $contacto.getBoundingClientRect().top;
    // let contactoEnd    = contactoTop + $contacto.getBoundingClientRect().height;

    function scrollViewer(actualScroll) {

        $siteNav.querySelector('.site-nav__link--active').classList.remove('site-nav__link--active');

        if (actualScroll > quienSoy.init && actualScroll < quienSoy.end) {
            $siteNav.querySelector('.site-nav__link-quien-soy').classList.add('site-nav__link--active');
        } else if (actualScroll > estudios.init && actualScroll < estudios.end) {
            $siteNav.querySelector('.site-nav__link-estudios').classList.add('site-nav__link--active');
        } else if (actualScroll > experiencia.init && actualScroll < experiencia.end) {
            $siteNav.querySelector('.site-nav__link-experiencia').classList.add('site-nav__link--active');
        } else if (actualScroll > sobreMi.init && actualScroll < sobreMi.end) {
            $siteNav.querySelector('.site-nav__link-sobre-mi').classList.add('site-nav__link--active');
        } else if (actualScroll > contacto.init) {
            $siteNav.querySelector('.site-nav__link-contacto').classList.add('site-nav__link--active');
        } else {
            $siteNav.querySelector('.site-nav__link-home').classList.add('site-nav__link--active');
        }
    }

    window.addEventListener('scroll', function(){
        scrollPosition = window.scrollY;
        scrollViewer(scrollPosition);
    });

    scrollViewer(scrollPosition);

    $siteNavLinks.forEach( $siteNavLink => {
            $siteNavLink.addEventListener('click', function(e) {
                e.preventDefault();
                let toSection = this.href.split('#')[1] + 'Top';

                // $siteNav.querySelector('.site-nav__link--active').classList.remove('site-nav__link--active');
                // this.classList.add('site-nav__link--active');
            });
        }
    );

    function goToSection(sectionName) {
        if( scrollPosition < sectionName) {
            document.documentElement.scrollTop += 10;
        }
    }


})();