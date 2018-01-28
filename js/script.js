window.addEventListener('load', function() {

    const $body                 = document.body;
    const $siteNav              = document.querySelector('.site-nav');
    const $siteNavLinks         = $siteNav.querySelectorAll('.link');

    const $contactForm          = document.querySelector('.contacto__form');
    const $contactFormName      = $contactForm.querySelector('#name');
    const $contactFormEmail     = $contactForm.querySelector('#email');

    const $networkingOpts       = $contactForm.querySelector('.networking-opts');
    const $networking           = {
                                    fb : document.querySelector('.networking-opts__fb'),
                                    tw : document.querySelector('.networking-opts__tw'),
                                    gh : document.querySelector('.networking-opts__gh'),
                                    ev : document.querySelector('.networking-opts__ev'),
                                    ot : document.querySelector('.networking-opts__ot')
                                  };
    const $networkingOptOther   = document.querySelector('.networking-opts__other');

    const $contactFormPhone     = $contactForm.querySelector('#phone');
    const $contactFormMessage   = $contactForm.querySelector('#message');
    const arrayInputs = [$contactFormName, $contactFormEmail, $contactFormPhone, $contactFormMessage];

    // remove "empty filed" message in multiple inputs at keyup event

    arrayInputs.forEach( inputItem => {
        inputItem.addEventListener('keyup', function(e) {
            if (this.value != ' ' && this.value != '\n') {
                this.parentNode.classList.remove('contact-item--empty');
                this.parentNode.classList.remove('contact-item-other--empty');
            }
        });
    });

    // remove "empty filed" message in option "otro" at keyup event

    $networkingOptOther.addEventListener('keyup', function(e) {
        if (this.value != ' ' && this.value != '\n') {
            $networkingOpts.classList.remove('contact-item-other--empty');
        }
    });

    // toggle "required" attr in networking input text "otro"

    for ( let opt in $networking ) {
        $networking[opt].addEventListener('change', function(e) {
            if( opt == 'ot' && this.checked == true ) {
                $networkingOptOther.required = true;
            } else {
                $networkingOptOther.required = false;
                $networkingOptOther.value = '';
            }
            $networkingOpts.classList.remove('contact-item--empty');
            $networkingOpts.classList.remove('contact-item-other--empty');
        });
    }

    // words counter function

    function wordsCount() {
        var words = 0;
        var onWord = false;
        for (var i = 0; i < $contactFormMessage.value.length; i++) {
            if ($contactFormMessage.value[i] != ' ' && $contactFormMessage.value[i] != '\n') {
                if (onWord == false) {
                    words++;
                    onWord = true;
                }
            } else {
                onWord = false;
            }
        }
        return words;
    }

    // textarea "keyup" event for words count

    $contactFormMessage.addEventListener('keyup', function(e) {
        var totalWords = wordsCount();
        if(totalWords >= 150) {
            this.parentNode.classList.add('contact-item--limit');
            this.value = this.value.trim();
        } else {
            this.parentNode.classList.remove('contact-item--limit');
        }
    });

    // form submit validation

    $contactForm.addEventListener('submit', function(e) {

        // field name

        if( $contactFormName.checkValidity() === false ) {
            $contactFormName.focus();
            $contactFormName.parentNode.classList.add('contact-item--empty');
            e.preventDefault();
            return false;
        } else {
            $contactFormName.parentNode.classList.remove('contact-item--empty');
        }

        // field email

        if( $contactFormEmail.checkValidity() === false ) {
            $contactFormEmail.focus();
            $contactFormEmail.parentNode.classList.add('contact-item--empty');
            e.preventDefault();
            return false;
        } else {
            $contactFormEmail.parentNode.classList.remove('contact-item--empty');
        }

        // radio options networking

        if( $networking.fb.checkValidity() === false ) {
            $networkingOpts.classList.add('contact-item--empty');
            e.preventDefault();
            return false;
        } else {
            $networkingOpts.classList.remove('contact-item--empty');
            $networkingOpts.classList.remove('contact-item-other--empty');
        }

        // field networking "otro"

        if( $networkingOptOther.checkValidity() === false ) {
            $networkingOptOther.focus();
            $networkingOpts.classList.add('contact-item-other--empty');
            e.preventDefault();
            return false;
        } else {
            $networkingOpts.classList.remove('contact-item-other--empty');
        }

        // field phone

        const phoneRegex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{6})$/;
        let phoneValidation = phoneRegex.test($contactFormPhone.value);

        if( phoneValidation === false ) {
            $contactFormPhone.focus();
            $contactFormPhone.parentNode.classList.add('contact-item--empty');
            e.preventDefault();
            return false;
        } else {
            $contactFormPhone.parentNode.classList.remove('contact-item--empty');
        }

        // field message

        if( $contactFormMessage.checkValidity() === false ) {
            $contactFormMessage.focus();
            $contactFormMessage.parentNode.classList.add('contact-item--empty');
            e.preventDefault();
            return false;
        } else {
            $contactFormMessage.parentNode.classList.remove('contact-item--empty');
        }

    });

    /* SCROLL */

    function ElementData(element) {
        const obj = {};
        obj.el = document.querySelector('#'+element);
        obj.init = obj.el.offsetTop;
        obj.end = obj.init + obj.el.offsetHeight;

        obj.h = obj.el.offsetHeight;

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

        } else if (actualScroll >= siteSections.quienSoy.init && actualScroll < siteSections.quienSoy.end) {

            $body.setAttribute('data-position', 'quienSoy');

        } else if (actualScroll >= siteSections.estudios.init && actualScroll < siteSections.estudios.end) {

            $body.setAttribute('data-position', 'estudios');

        } else if (actualScroll >= siteSections.experiencia.init && actualScroll < siteSections.experiencia.end) {

            $body.setAttribute('data-position', 'experiencia');

        } else if (actualScroll >= siteSections.sobreMi.init && actualScroll < siteSections.sobreMi.end) {

            $body.setAttribute('data-position', 'sobreMi');

        } else if (actualScroll >= siteSections.contacto.init) {

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

        var jump = parseInt(goToEl.el.getBoundingClientRect().top * .3);
        document.body.scrollTop += jump; // MS Edge
        document.documentElement.scrollTop += jump;

        if ( goToEl.el.getBoundingClientRect().top != 0 ) {

            goToEl.lastJump = Math.abs(jump);

            setTimeout(function() {
                if ( goToEl.lastJump < 5 ) {
                    document.documentElement.scrollTop += goToEl.el.getBoundingClientRect().top;
                    goToEl.lastJump = 0;
                }
                goToSection(goToEl);
            }, 25);
        }
    }

    /* AJAX */

    const $experienciaGithub = document.querySelector('.experiencia__github');

    const $githubLoading     = $experienciaGithub.querySelector('.github__loading');
    const $githubFile        = $experienciaGithub.querySelector('.github-file');

    const $githubUserName    = $experienciaGithub.querySelector('.github-file__username');
    const $githubBio         = $experienciaGithub.querySelector('.github-file__bio');
    const $githubPic         = $experienciaGithub.querySelector('.github-file__pic');
    const $githubLocation    = $experienciaGithub.querySelector('.github-file__location');
    const $githubCreatedAt   = $experienciaGithub.querySelector('.github-file__created-at');
    const $githubPublicRepos = $experienciaGithub.querySelector('.github-file__public-repos');
    const $githubFollowers   = $experienciaGithub.querySelector('.github-file__followers');

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.github.com/users/adrielzarate', true);

    // xhr.onload = function () {};
    xhr.onreadystatechange = function() {
        if( xhr.readyState == 4 && xhr.status == 200 ) {
            const response = JSON.parse(xhr.responseText);

            console.table(response)

            $githubLoading.classList.add('d-none');
            $githubFile.classList.remove('d-none');

            $githubFile.href             = response.html_url;
            $githubUserName.innerHTML    = response.login;
            $githubBio.innerHTML         = response.bio;
            $githubPic.src               = response.avatar_url;
            $githubLocation.innerHTML    = response.location;
            $githubCreatedAt.innerHTML   = response.created_at.slice(0,4);
            $githubCreatedAt.datetime    = response.created_at;
            $githubPublicRepos.innerHTML = response.public_repos;
            $githubFollowers.innerHTML   = response.followers;
        } else {
            console.log('error!');
        }
        console.log('readyState ' + xhr.readyState);
        console.log('status ' + xhr.status);
    }

    xhr.send(null);

});