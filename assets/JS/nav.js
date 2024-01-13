const Navmodule = (function () {
    const navToggle = document.querySelector(".toggle-nav-menu"),
        overlay = document.querySelector(".overlay"),
        navMenu = document.querySelector(".nav-menu-container"),
        body = document.querySelector("body");
    //  navLinks = document.querySelectorAll(".nav-links");

    navToggle.addEventListener("click", function (e) {
        e.preventDefault();
        navToggle.classList.toggle("rotate");
        navMenu.classList.toggle("active");
        overlay.classList.toggle("active");
        body.classList.toggle("overflow");
    });

    document.addEventListener('click', function (event) {
        if (!event.target.closest('.toggle-nav-menu')) {
            navToggle.classList.remove("rotate");
            navMenu.classList.remove("active");
            overlay.classList.remove("active");
            body.classList.remove("overflow");
        }
    });

    // SIDE BAR USER ACCOUNT
    document.addEventListener('DOMContentLoaded', function () {
        const lastClickedLink = localStorage.getItem('lastClickedLink');
        const defaultLink = lastClickedLink || 'manage-profile';
        const sidebarLinks = document.querySelectorAll(".sidebar-menu-links");

        document.querySelector(`.user-account-container .${defaultLink}`).style.display = 'flex';
        document.querySelector(`[menu-for="${defaultLink}"]`).classList.add('active');

        sidebarLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                const menuFor = link.getAttribute('menu-for'),
                    forms = document.querySelectorAll(".user-account-container form");
                // const sidebarLinkIndicator = document.querySelectorAll(".active-link");

                forms.forEach(function (form) {
                    form.style.display = form.classList.contains(menuFor) ? 'flex' : 'none';
                });

                sidebarLinks.forEach(function (el) {
                    el.classList.remove('active');
                });

                link.classList.add('active');

                localStorage.setItem('lastClickedLink', menuFor);
            });
        });
    });

    $(document).ready(function () {
        $("#updateBtn").click(function () {

            var formData = new FormData($("#updateForm")[0]);

            $.ajax({
                url: '../products/prod.edit.php',
                type: 'post',
                data: formData,
                processData: false,
                contentType: false,
                complete: function () {
                    $(".loader").show();
                    // $("#popOverlay").hide();
                },
                success: function () {
                    $(".loader").hide();
                    // $("#popOverlay").show();
                }
            });
        });

        $("#doneSuccess").click(function () {
            $("#popOverlay").hide();
        });
    });
})();