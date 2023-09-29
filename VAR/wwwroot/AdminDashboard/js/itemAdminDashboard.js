
var id;
// Attach a click event listener to all delete buttons
const deleteButtons = document.querySelectorAll('.btn-danger[data-bs-toggle="modal"]');
deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Get the ID of the item to be deleted from the data-rowid attribute
        const itemId = button.getAttribute('data-rowid');
        id = itemId;
    });
});
const deleteBtn = document.getElementById("confirm-delete-item");
deleteBtn.addEventListener("click", function () {
    $.ajax({
        url: `/Item/Delete/${id}`,
        type:'POST',
        success: function (result) {
            // To close modal after confirm delete
            const canceltBtn = document.getElementById("cancel");
            canceltBtn.click();
            //window.location.href = "http://localhost:5208/Item/getAllItems";
            window.location.href = "http://localhost:5000/Item/getAllItems";
            //window.location.href = "http://localhost:32719/Item/getAllItems";

        }
    });
});
