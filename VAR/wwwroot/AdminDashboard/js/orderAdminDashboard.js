﻿
var id;
// Attach a click event listener to all delete buttons
const deleteButtons = document.querySelectorAll('.btn-danger[data-bs-toggle="modal"]');
deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Get the ID of the item to be deleted from the data-rowid attribute
        const orderId = button.getAttribute('data-rowid');
        console.log(orderId);
        id = orderId;
        console.log(id);

    });
});
const deleteBtn = document.getElementById("confirm-delete-order");
deleteBtn.addEventListener("click", function () {
    $.ajax({
        url: `/Order/Delete/${id}`,
        type: 'POST',
        success: function (result) {
            // To close modal after confirm delete
            const canceltBtn = document.getElementById("cancel");
            canceltBtn.click();
            console.log(result);
            ////window.location.href = "http://localhost:32719/playstationroom/getAllRoomsforadmin";
            ////window.location.href = "http://localhost:5208/playstationroom/getAllRoomsforadmin";
            //window.location.href = "http://localhost:5000/playstationroom/getAllRoomsforadmin";


        }
    });
});

function deleteLocalStorageAfetrApplyFilter() {
    localStorage.setItem("active List","1");
}
function deleteLocalStorageAfetrClearFilter() {
    localStorage.removeItem("PageNumberForFilteredOrderes");
    localStorage.removeItem("active List");
    localStorage.removeItem("ApplyOrdersFilter");
    localStorage.removeItem("adminNameForFilteredOrderes");
    localStorage.removeItem("playstationRoomNameForFilteredOrderes");
    localStorage.removeItem("dateFromForFilteredOrderes");
    localStorage.removeItem("dateToForFilteredOrderes");
}
const noneExistingOrdersFilterAlert = document.getElementById("alert-div");
//noneExistingOrdersFilterAlert[0].setAttribute("style", "display: none!important;");
class TableRow {
    constructor(startTime, endTime, adminName, playstationRoom, description, totalPrice) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.adminName = adminName;
        this.playstationRoom = playstationRoom;
        this.description = description;
        this.totalPrice = totalPrice;
    }
};
// get the orders table data to aplly ordering (by : Month, year, adminID ,....) in it
var table = document.getElementById("orders-table");
console.log("table", table);
var tbody = table.getElementsByTagName("tbody")[0];
console.log("tbody", tbody);
var rows = tbody.getElementsByTagName("tr");
console.log("rows", rows);
const data = [];
for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName("td");
    const startTime = cells[0].innerText;
    const endTime = parseInt(cells[1].innerText);
    const adminName = cells[2].innerText;
    const playstationRoom = cells[3].innerText;
    const description = cells[4].innerText;
    const totalPrice = cells[5].innerText;
    const rowData = new TableRow(startTime, endTime, adminName, playstationRoom, description, totalPrice);
    data.push(rowData);
}
var allOrdersBtn = document.getElementById("all-orders");
const ApplyFilterBtn = document.getElementById("filter-by-date");
const claerFilterBtn = document.getElementById("clear-filter");
function filterBy(filterdArray) {
    // Clear the table body
    tbody.innerHTML = "";
    // Loop through the filtered data and create new rows and cells
    filterdArray.forEach(row => {
        const newRow = tbody.insertRow();
        const startTimeCell = newRow.insertCell();
        startTimeCell.innerText = row.startTime;
        const endTimeCell = newRow.insertCell();
        endTimeCell.innerText = row.endTime;
        const adminNameCell = newRow.insertCell();
        adminNameCell.innerText = row.adminName;
        const playstationRoomCell = newRow.insertCell();
        playstationRoomCell.innerText = row.playstationRoom;
        const descriptionCell = newRow.insertCell();
        descriptionCell.innerText = row.description;
        const totalPriceCell = newRow.insertCell();
        totalPriceCell.innerText = row.totalPrice;
    });
}
const dateFromInput = document.getElementById("date-from");
const dateToInput = document.getElementById("date-to");
const AdminNameSelect = document.getElementById("select-admin");
const RoomNameSelect = document.getElementById("select-room");
// split the dateInput value in array of year , month , day ex : '18-04-2023' => ['18','04','2023']
var dateInputValueAsArrayOfDate ;
console.log(dateInputValueAsArrayOfDate);
var pageNumberForFilteredOrdersPagination = localStorage.getItem("PageNumberForFilteredOrderes") != null ? localStorage.getItem("PageNumberForFilteredOrderes") : 1;
var pageNumber;
if (localStorage.getItem("ApplyOrdersFilter") == "true") {
    AdminNameSelect.value = localStorage.getItem("adminNameForFilteredOrderes");
    RoomNameSelect.value = localStorage.getItem("playstationRoomNameForFilteredOrderes");
    dateFromInput.value = localStorage.getItem("dateFromForFilteredOrderes");
    dateToInput.value = localStorage.getItem("dateToForFilteredOrderes");
}
//if (localStorage.getItem("adminNameForFilteredOrderes") != null) AdminNameSelect.value = localStorage.getItem("adminNameForFilteredOrderes");
var filteredDataByDay;
var paginationVM;
async function handleApplyFilterBtnClick() {

    deleteLocalStorageAfetrApplyFilter();
    var FilteredOrdersPaginationVM = {
        AdminName: AdminNameSelect.value,
        playstationRoomName: RoomNameSelect.value,
        StartTime: dateFromInput.value,
        EndTime: dateToInput.value,
        page: pageNumberForFilteredOrdersPagination
    }

    // Make AJAX request
    $.ajax({
        url: '/Order/getFilteredOrdersPaginationRedirectUrl', // Replace `ControllerName` with your actual controller name
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(FilteredOrdersPaginationVM),
        success: function (response) {
            localStorage.setItem("PageNumberForFilteredOrderes", pageNumberForFilteredOrdersPagination);
            localStorage.setItem("active List", pageNumberForFilteredOrdersPagination);
            localStorage.setItem("ApplyOrdersFilter", "true");
            localStorage.setItem("adminNameForFilteredOrderes", AdminNameSelect.value);
            localStorage.setItem("playstationRoomNameForFilteredOrderes", RoomNameSelect.value);
            localStorage.setItem("dateFromForFilteredOrderes", dateFromInput.value);
            localStorage.setItem("dateToForFilteredOrderes", dateToInput.value);

            console.log(response);
            // Redirect to the return view with PaginationVM
            window.location.href = response.redirectUrl;
        },
        error: function (xhr, status, error) {
            // Handle error
            console.log('Error:', error);
        }
    });  
}
ApplyFilterBtn.addEventListener("click", handleApplyFilterBtnClick );
//resert the filters
claerFilterBtn.addEventListener("click", function () {

    dateFromInput.value = '';
    dateToInput.value = '';    
    RoomNameSelect.value = "";   
    AdminNameSelect.value = "";
    deleteLocalStorageAfetrClearFilter();
    //window.location.href = `http://localhost:5208/Order/getOrdersPagination/?page=${1}&size=10`;
    window.location.href = `http://localhost:5000/Order/getOrdersPagination/?page=${1}&size=10`;

});


// getting the pervious li
var previousLi = document.getElementById('pervious-li');
var nextLi = document.getElementById('next-li');
// getting the  whole pagination-ul 
var paginationUl = document.getElementById('pagination-ul');

var beforeLastLi = paginationUl.lastElementChild.previousElementSibling;
var pageLinks = document.querySelectorAll('.page-item a');

var currentActiveLiFromLocalStorage = localStorage.getItem("active List");
// get the first li with page number 1 
if (currentActiveLiFromLocalStorage == null || currentActiveLiFromLocalStorage == 1) {

    if (pageLinks.length == 3) nextLi.classList.add('disabled');

    var currentActiveLi = pageLinks[1];
    currentActiveLi.parentElement.classList.add('active');
    console.log(currentActiveLi);

} else {
    // check if the currentActiveLiFromLocalStorage = the last number in page links and the li after it , its next li
    if (currentActiveLiFromLocalStorage == beforeLastLi.innerText) nextLi.classList.add('disabled');
    var currentActiveLi = pageLinks[parseInt(currentActiveLiFromLocalStorage)];
        previousLi.classList.remove('disabled');

    currentActiveLi.parentElement.classList.add('active');
    console.log(currentActiveLi);

}

pageLinks.forEach(function (pageLink) {
    pageLink.addEventListener('click',  function (event) {
        event.preventDefault();
        // to perven 
        var fromNextOrPervious;
        pageNumber = pageLink.innerHTML;
        pageNumberForFilteredOrdersPagination = pageLink.innerHTML;
        var parentLi = this.parentNode;
        var activeLi = document.querySelector('.page-item.active');  
        if (parentLi === nextLi) {
            console.log(activeLi.nextElementSibling.firstElementChild);
            var nextElement = activeLi.nextElementSibling.firstElementChild;
            fromNextOrPervious = 1;
            nextElement.click();
           
        }
        else if (parentLi === previousLi) {
            activeLi.previousElementSibling.firstElementChild.click();
            fromNextOrPervious = 1;
        }
        if (activeLi)
        {               
            activeLi.classList.remove('active');
            if (parentLi.childNodes[0].innerHTML != 1)
            {
                if (parentLi === beforeLastLi)
                {
                    nextLi.classList.add('disabled');
                    console.log("beforelast", parentLi);
                }
                else if (fromNextOrPervious != 1)
                {
                    nextLi.classList.remove('disabled');
                    console.log("NOT beforelast", parentLi);
                }
                previousLi.classList.remove('disabled');
            }
            else
            {
                previousLi.classList.add('disabled');
                nextLi.classList.remove('disabled');
            }
        }
        if (parentLi != nextLi && parentLi != previousLi) {
            parentLi.classList.add('active');
            // save the current active li to retrive the active page link when the page is reloaded
            localStorage.setItem("active List", `${pageLink.innerText}`);
        }
        if (localStorage.getItem("ApplyOrdersFilter") == "true")
        {
            ApplyFilterBtn.click();
        } else {
            window.location.href = `http://localhost:5000/Order/getOrdersPagination/?page=${pageNumber}&size=10`;
            //window.location.href = `http://localhost:5208/Order/getOrdersPagination/?page=${pageNumber}&size=10`;
        }      
    });
});
