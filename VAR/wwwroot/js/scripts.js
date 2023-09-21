/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
//

function checkToastPlaystationRooms() {
    if (localStorage.getItem('toastPlaystationRooms') != null) {
        var toastPlaystaionRooms = JSON.parse(localStorage.getItem('toastPlaystationRooms'));
        for (let i = 0; i < toastPlaystaionRooms.length; i++) {
            showToastr(toastPlaystaionRooms[i].name);
        }
    }
}

function showToastr(roomName) {
    toastr.success(roomName + " " + 'Room', 'Time Is Over', { timeOut: 58000 });
    toastr.options.closeButton = true;
    toastr.options.closeMethod = 'fadeOut';
    toastr.options.closeDuration = 300;
    toastr.options.closeEasing = 'swing';
    toastr.options.extendedTimeOut = 60; // How long the toast will display after a user hovers over it
    console.log("toast from script");

}
function showToastInterval() {
    checkToastPlaystationRooms();
}
checkToastPlaystationRooms();

var roomsAvailabiltySpan = document.getElementsByClassName("top-left-text");
var roomsIds = document.getElementsByClassName("room-id");
var roomAvailabiltyIntervalId;


function roomAvailabilty() {
    for (let i = 0; i < roomsAvailabiltySpan.length; i++) {
        if (localStorage.getItem(`start time for room (${roomsIds[i].value})`) !== null) {
            roomsAvailabiltySpan[i].innerHTML = '<i id="room-availability-icon" class="fa-solid fa-pause" style="color: #cca000;"></i>';

        }
        else
            roomsAvailabiltySpan[i].innerHTML = '<i id="room-availability-icon" class="fa-solid fa-play" style="color: #cca000;"></i>';
        console.log("fom roomAvailabilty ");
    }

}
roomAvailabiltyIntervalId = setInterval(roomAvailabilty, 3000);
toastPlaystationRoomslId = setInterval(showToastInterval, 60000);

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
