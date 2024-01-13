const ScriptModule = (function () {
    document.addEventListener('DOMContentLoaded', function () {
        var dynamicButtons = document.querySelectorAll('.dynamic-button');

        dynamicButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                var destination = button.getAttribute('data-location');
                window.location.href = destination;

            });
        });
    });

    function showSuccess() {
        var confirmDialog = document.getElementById('confirmDialog');
        confirmDialog.style.display = 'block';

        var overlay = document.getElementById('overlay');
        overlay.style.display = 'block';
    }

    function removeSuccess() {
        var confirmDialog = document.getElementById('confirmDialog');
        confirmDialog.style.display = 'none';

        var overlay = document.getElementById('overlay');
        overlay.style.display = 'none';
    }

    document.addEventListener('DOMContentLoaded', function () {
        const passwordInput = document.querySelector('.input[type="password"]'),
            hidePass = document.querySelector('.hide-pass'),
            showPass = document.querySelector('.show-pass');

        showPass.addEventListener('click', function () {
            passwordInput.type = 'password';
            hidePass.style.display = 'block';
            showPass.style.display = 'none';
        });

        hidePass.addEventListener('click', function () {
            passwordInput.type = 'text';
            hidePass.style.display = 'none';
            showPass.style.display = 'block';
        });

    });

    document.addEventListener('DOMContentLoaded', function () {
        const accLink = document.querySelector(".account"),
            accLinkCard = document.querySelector(".account-link-container");

        accLink.addEventListener('click', function () {
            event.stopPropagation();

            if (accLinkCard.style.display === "block") {
                accLinkCard.style.display = "none";
            }
            else {
                accLinkCard.style.display = "block";
            }
        });

        document.addEventListener('click', function (event) {
            if (!event.target.closest('.account') && !event.target.closest('.account-link-container')) {
                accLinkCard.style.display = "none";
            }
        });
    });

    document.addEventListener('DOMContentLoaded', function () {
        const noAccLink = document.querySelector(".no-account"),
            accLinkCard = document.querySelector(".account-link-container");

        noAccLink.addEventListener('click', function () {
            event.stopPropagation();

            if (accLinkCard.style.display === "block") {
                accLinkCard.style.display = "none";
            }
            else {
                accLinkCard.style.display = "block";
            }
        });

        document.addEventListener('click', function (event) {
            if (!event.target.closest('.no-account') && !event.target.closest('.account-link-container')) {
                accLinkCard.style.display = "none";
            }
        });
    });
})();

const passChecker = (function () {
    const input = document.querySelector("#input-password");
    const confirm = document.querySelector("#input-confirm-password");
    const indicatorText1 = document.querySelector(".error-text.indicator1");
    const indicator = document.querySelector(".input-indicator-icon");
    const newPassText = document.querySelector("#label-newPassword");

    const indicatorText2 = document.querySelector(".error-text.indicator2");

    var commonPasswords = {
        "password": true,
        "password1": true,
        "password12": true,
        "password123": true,
        "password0": true,
        "password09": true,
        "password08": true,
        "password98": true,
        "password89": true,
        "password890": true,
        "password098": true,
        "password2024": true,
        "654321": true,
        "1234": true,
        "12345": true,
        "123456": true,
        "1234567": true,
        "12345678": true,
        "123456789": true,
        "1234567890": true,
        "0987654321": true,
        "7777777": true,
        "313131": true,
        "131313": true,
        "321123": true,
        "123321": true,
        "verystrongpassword": true,
        "strongpassword": true,
        "iloveyou": true,
        "adminpassword": true,
        "userpassword": true,
        "letmein": true,
        "adobe123": true,
        "google": true,
        "helloworld": true,
        "starwars": true,
        "football": true,
        "batman": true,
        "hello": true,
        "hello1": true,
        "hello2": true,
        "hello3": true,
        "hello4": true,
        "hello5": true,
        "hello6": true,
        "hello7": true,
        "hello8": true,
        "hello9": true,
        "hello10": true,
        "diamond": true,
        "superman": true,
        "secret123": true,
        "yolo123": true,
        "zxcvbnm": true,
        "qwerty": true,
        "qwerty123": true,
        "1q2w3e4r": true,
        "zxcvzxcv": true,
        "asdasdasd": true,
        "asdfgh": true,
        "asdfghjkl": true,
        "qazwsxedc": true
    };

    const messages = {
        lengthShort: "Password is too short (minimum of 8 characters)",
        lengthLong: "Password is too long, the advisable length is 20",
        missingNum: "Password must contain at least 1 number",
        missingUpper: "Password must contain at least 1 uppercase letter",
        missingLower: "Password must contain at least 1 lowercase letter",
        missingSpecial: "Password must contain at least 1 special character"
    };

    function checkCommonPasswords(password) {
        return commonPasswords.hasOwnProperty(password);
    }

    function showError(message, color, background, iconType) {
        indicatorText1.textContent = message;
        indicatorText1.style.color = color;
        indicatorText1.style.background = background;
        indicator.textContent = iconType;
        indicator.style.color = color;
        newPassText.style.color = color;
        input.style.border = `3px solid ${color}84`;
    }

    function resetToNormal() {
        indicatorText1.textContent = "";
        indicatorText2.textContent = "";
        indicator.textContent = "";
        indicator.style.color = "";
        newPassText.style.color = "";
        input.style.border = "";
    }

    function validatePassword() {
        const val = input.value;
        const length = val.length;
        const uppercase = /[A-Z]/.test(val);
        const lowercase = /[a-z]/.test(val);
        const numbers = /[\d]/.test(val);
        const specialChars = /[!@#$%^&*?_()-+=`~]/.test(val);
        const invalidChars = /['";`]/.test(val);

        console.log("uppercase: " + uppercase);
        console.log("lowercase: " + lowercase);
        console.log("numbers: " + numbers);
        console.log("specialChars: " + specialChars);
        console.log("invalidChars: " + invalidChars);
        console.log("INPUT: " + val + " => length:" + length);

        if (val === "") {
            resetToNormal();
        }
        if (lowercase || uppercase || numbers) {
            showError(
                "Your password is weak. Please choose a stronger combination",
                "#ff0000",
                "#ffd2d2",
                "error"
            );
        }
        if (lowercase && uppercase && numbers && length >= 8) {
            showError(
                "Password meets basic requirements, but it could improve adding more special characters",
                "#ffa500",
                "#fff3db",
                "warning"
            );
        }
        if (lowercase && uppercase && specialChars && numbers && length >= 12) {
            showError(
                "Password is strong and secure",
                "#00e600",
                "#e1ffe1",
                "check"
            );
        }
        if (length > 4 && length < 8) {
            showError(
                messages.lengthShort,
                "#ffa500",
                "#fff3db",
                "warning"
            );
        }
        if (length > 8 && !numbers) {
            showError(
                messages.missingNum,
                "#ffa500",
                "#fff3db",
                "warning"
            );
        }
        if (length > 8 && !uppercase) {
            showError(
                messages.missingUpper,
                "#ffa500",
                "#fff3db",
                "warning"
            );
        }
        if (length > 8 && !lowercase) {
            showError(
                messages.missingLower,
                "#ffa500",
                "#fff3db",
                "warning"
            );
        }
        if (length > 8 && !specialChars) {
            showError(
                messages.missingSpecial,
                "#ffa500",
                "#fff3db",
                "warning"
            );
        }
        if (length > 20) {
            showError(
                messages.lengthLong,
                "#ffa500",
                "#fff3db",
                "warning"
            );
        }
        if (checkCommonPasswords(val.toLowerCase())) {
            showError(
                "Password is in the list of commonly used in other websites",
                "#ffa500",
                "#fff3db",
                "warning"
            );
        }
        if (invalidChars) {
            showError(
                "Password can't contain these characters: ' \" ; ` ",
                "#ffa500",
                "#fff3db",
                "warning"
            );
        }
    }

    function validateConfirmPassword() {
        const val = input.value;
        const confirmVal = confirm.value;

        if (val === "") {
            resetToNormal();
        }

        if (val !== confirmVal) {
            indicatorText2.textContent = "Passwords do not match!";
            indicatorText2.style.color = "#ff0000";
            indicatorText2.style.background = "#ffd2d2";
        } else {
            indicatorText2.textContent = "";
        }
    }

    input.addEventListener("input", () => {
        input.style.transition = newPassText.style.transition = indicatorText1.style.transition = "all .2s";
        validatePassword();
    });

    confirm.addEventListener("input", () => {
        validateConfirmPassword();
    });
})();