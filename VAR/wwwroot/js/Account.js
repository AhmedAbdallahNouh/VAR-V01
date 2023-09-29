
const loginBtn = document.getElementById('login');
const Email = document.getElementById('Email');
const loginFrom = document.getElementById('login-form');
const Password = document.getElementById('Password');
loginBtn.disabled = true;
function checkValid() {
    if (loginFrom.checkValidity() !== false && Password.value !== "" && Email.value !== "") {
        loginBtn.disabled = false;
        console.log("Valid");
    }
    else {
        loginBtn.disabled = true;
        console.log("Not Valid");
    }
}
$("button").click(function () {
    $.ajax({
        url: "/Account/Spinner",
        success: function (result) {

            $("#spinner").html(result);
        }
    });
});