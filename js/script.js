(function() {
    const $contacto = document.querySelector('.contacto');
    const $contacto__name = $contacto.querySelector('.contacto__name');
    const $contacto__email = $contacto.querySelector('.contacto__email');
    const $contacto__phone = $contacto.querySelector('.contacto__phone');

    // function customInvalidMsg(el, msg) {
    //     console.log(this);
    //     el.addEventListener("invalid", function() { this.setCustomValidity(msg) });
    // }

    // customInvalidMsg($contacto__name, 'Tu nombre es obligatorio');
    // customInvalidMsg($contacto__email, 'Tu correo es obligatorio');
    // customInvalidMsg($contacto__phone, 'Tu numero de telefono es obligatorio');

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

    // $contacto__name.addEventListener("invalid", customInvalidMsg, false);
    // $contacto__email.addEventListener("invalid", customInvalidMsg, false);
    // $contacto__phone.addEventListener("invalid", customInvalidMsg, false);

})();