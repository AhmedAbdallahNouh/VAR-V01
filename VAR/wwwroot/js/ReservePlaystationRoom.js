var playstationRoomId = window.location.pathname.split('/')[3];
console.log(`URL : ${window.location.pathname.split('/')[3]}`);
var playstationRoomTableBody = document.getElementById("playstation-room-tbody");
var playstationRoomName = playstationRoomTableBody.rows[0].cells[0].innerText;
const TitleName = document.querySelector("Title");
const favIcon = document.querySelector("Link");

switch (playstationRoomName) {
    case "Liverpool":
        favIcon.setAttribute("href", "/assets/img/Yassin/liverpool-fav.png");
        break;
    case "Paris Saint-Germain":
        favIcon.setAttribute("href", "/assets/img/Yassin/paris-saint-germain-fav.png");
        break;
    case "Manchester United":
        favIcon.setAttribute("href", "/assets/img/Yassin/Manchester_United-fav.png");
        break;
    case "Barcelona":
        favIcon.setAttribute("href", "/assets/img/Yassin/barcelonaFavIcon.png");
        break;
    case "Bayern Munich":
        favIcon.setAttribute("href", "/assets/img/Yassin/bayern-munchen-fav.png");
        break;
    case "Dortmund":
        favIcon.setAttribute("href", "/assets/img/Yassin/bvb-fav.png");
        break;
    case "Real Madrid":
        favIcon.setAttribute("href", "/assets/img/Yassin/realmadridFavIcon.png");
        break;
    case "Juventus":
        favIcon.setAttribute("href", "/assets/img/Yassin/juventus-logo-fav.png");
        break;
    
}
//var x = url("/assets/img/Yassin/icons8-real-madrid-70.png") 
TitleName.innerText = playstationRoomName;
var roomStatusVariable = localStorage.getItem(`start time for room (${playstationRoomId})`);
var openTimeRadio = document.getElementById("open-time-radio");
var specificTimeRadio = document.getElementById("specific-time-radio");
var specificTimeDiv = document.getElementById("specific-time-div");
var specificTimeHourInput = document.getElementById("specific-time-hour");
var specificTimeMinuteInput = document.getElementById("specific-time-minutes");
var startAndStopBtnsDiv = document.getElementById("start-and-stop-div");
var singlePlayerRadio = document.getElementById("singleRadio");
var MultiPlayerRadio = document.getElementById("MultiRadio");
var stopBtn = document.getElementById("stopBtn");
//get the single and multi price per hour of playstation room
var singlePriceForHour = parseInt(playstationRoomTableBody.rows[0].cells[2].innerText);
var multiPriceForHour = parseInt(playstationRoomTableBody.rows[0].cells[3].innerText);
var toastPlaystationRooms = localStorage.getItem('toastPlaystationRooms') == null
    ? [] : JSON.parse(localStorage.getItem('toastPlaystationRooms')) ;
var toastAudio = document.querySelector("audio");
function showToast() {
    toastAudio.play();
    toastr.success( playstationRoomName +" " + 'Room', 'Time Is Over', { timeOut: 900000 });
    toastr.options.closeButton = true;
    toastr.options.closeMethod = 'fadeOut';
    toastr.options.closeDuration = 300;
    toastr.options.closeEasing = 'swing';
    toastr.options.extendedTimeOut = 60; // How long the toast will display after a user hovers over it
    console.log("toast from reverse");
}

function addToPlaystationRooms(RoomName) {
    // Check if an element with the same name already exists
    var isDuplicate = toastPlaystationRooms.some(function (room) {
        return room.name === RoomName;
    });

    if (!isDuplicate) {
        // Create a new object and push it to the array
        var newRoom = {
            name: RoomName
        };
        toastPlaystationRooms.push(newRoom);
        localStorage.setItem(`toastPlaystationRooms`, JSON.stringify(toastPlaystationRooms));
    }
}

function updateToastPlaystationRooms() {
    let toastPlaystationRoomsDeletedObjectIndex = toastPlaystationRooms.findIndex(item => item.name === playstationRoomName);

    if (toastPlaystationRoomsDeletedObjectIndex !== -1) {
        toastPlaystationRooms.splice(toastPlaystationRoomsDeletedObjectIndex, 1);
        localStorage.setItem(`toastPlaystationRooms`, JSON.stringify(toastPlaystationRooms));
    }
}

function handleStopBtnClick() {
    clearInterval(timerIntervalId);
    startBtn.disabled = true;
    stopBtn.disabled = true;
    document.getElementsByClassName("fa-stop")[0].style = "color = #dc3545;";
    stopBtn.style = "background-color: #fff; border-color: #dc3545 !important; border: solid 0.5px;color: #dc3545;";
        if (localStorage.getItem(`start time for room (${playstationRoomId})`) !== null) {
            startTime = new Date(localStorage.getItem(`start time for room (${playstationRoomId})`));
        }    
        stopTime = localStorage.getItem(`stop time for room (${playstationRoomId})`) ? new Date(localStorage.getItem(`stop time for room (${playstationRoomId})`)) : new Date();
        localStorage.setItem(`stop time for room (${playstationRoomId})`, stopTime);
        var timeDiff = Math.abs(stopTime - startTime);
        localStorage.setItem(`stop time for room (${playstationRoomId})`, stopTime);
        // Convert milliseconds to hours and minutes
        timeDiffInHours = Math.floor(timeDiff / (1000 * 60 * 60));
        timeDiffInMinutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    //if (timeDiffInMinutes >= 1 && timeDiffInMinutes <= 15) timeDiffInMinutes = 15;
    //if (timeDiffInMinutes >= 16 && timeDiffInMinutes <= 29) timeDiffInMinutes = 30;
    //if (timeDiffInMinutes >= 31 && timeDiffInMinutes <= 45) timeDiffInMinutes = 45;
    //if (timeDiffInMinutes >= 46 && timeDiffInMinutes <= 59) timeDiffInMinutes = 59;
    playstationRoomTotalPrice = singlePlayerRadio.checked ? Math.round(((timeDiffInMinutes / 60) + timeDiffInHours) * singlePriceForHour)
        : Math.round(((timeDiffInMinutes / 60) + timeDiffInHours) * multiPriceForHour);

}
function deleteLocalStorageForThisRoomAfetrOrderConfirming() {
    localStorage.removeItem(`Timer State For Room (${playstationRoomId})`);
    localStorage.removeItem(`Timer State Hour For Room (${playstationRoomId})`);
    localStorage.removeItem(`Timer State Minute For Room (${playstationRoomId})`);
    localStorage.removeItem(`Timer State Second For Room (${playstationRoomId})`);
    localStorage.removeItem(`Time Radio For Room (${playstationRoomId})`);
    localStorage.removeItem(`Specific Time For Room (${playstationRoomId})`);
    localStorage.removeItem(`start time for room (${playstationRoomId})`);
    localStorage.removeItem(`arrayOfItemsIDsForRoom(${playstationRoomId})`);
    localStorage.removeItem(`oredrItemsForRoom(${playstationRoomId})`);
    localStorage.removeItem(`arrayOfItemsNameAndItemsIdForRoom(${playstationRoomId})`);
    localStorage.removeItem(`stop time for room (${playstationRoomId})`);   
}

var second = 0;
var minute = 0;
var hour = 0;
var addItemBttn = document.getElementById("add-item");
var specificEndTime;
var specificStartTime;
function timer() {
    if (localStorage.getItem(`Time Radio For Room (${playstationRoomId})`) == "specific" ) {
        specificStartTime = new Date(localStorage.getItem(`start time for room (${playstationRoomId})`));
        specificEndTime = specificStartTime;
        specificEndTime.setHours(specificStartTime.getHours() + parseInt(specificTimeHourInput.value));
        specificEndTime.setMinutes(specificStartTime.getMinutes() + parseInt(specificTimeMinuteInput.value));
        console.log("end", specificEndTime);
        var nowDate = new Date();
        console.log("New Date", new Date());
        if (nowDate > specificEndTime) {
            console.log("from if");
            timerSecond.innerHTML = `00`;
            timerMinute.innerHTML = `${specificTimeMinuteInput.value}`;
            //timerMinute.innerHTML = `20`;
            timerHour.innerHTML = `${specificTimeHourInput.value}`;
            handleStopBtnClick();
            showToast();
            addToPlaystationRooms(playstationRoomName);         
        }
        else  {

            if (second != 59) {
                timerSecond.innerHTML = `${++second}`;
            }
            else {
                second = 0;
                timerSecond.innerHTML = `${second}`;

                if (minute != 59) {
                    timerMinute.innerHTML = `${++minute}`;
                }
                else {
                    minute = 0
                    timerMinute.innerHTML = `${minute}`;
                    timerHour.innerHTML = `${++hour}`;
                }
            }
        }

    } else {

        if (second != 59) {
            timerSecond.innerHTML = `${++second}`;
        }
        else {
            second = 0;
            timerSecond.innerHTML = `${second}`;

            if (minute != 59) {
                timerMinute.innerHTML = `${++minute}`;
            }
            else {
                minute = 0
                timerMinute.innerHTML = `${minute}`;
                timerHour.innerHTML = `${++hour}`;
            }
        }
    }

    localStorage.setItem(`Timer State For Room (${playstationRoomId})`, new Date().toString());
    localStorage.setItem(`Timer State Hour For Room (${playstationRoomId})`, hour);
    localStorage.setItem(`Timer State Minute For Room (${playstationRoomId})`, minute);
    localStorage.setItem(`Timer State Second For Room (${playstationRoomId})`, second);

}

function updateTimerInnerHtml() {
    const timerState = new Date(localStorage.getItem(`Timer State For Room (${playstationRoomId})`)).getTime();
    console.log(`timer state : ${timerState}`);
    console.log(`current time : ${new Date().getTime()}`);

    diffrenceTimeInMinutes = Math.round(((new Date().getTime() - timerState) / 60000));
    console.log(`difrrence time : ${diffrenceTimeInMinutes}`);

    if ((minute + diffrenceTimeInMinutes) < 59) {

        minute += diffrenceTimeInMinutes;
        timerSecond.innerHTML = `${second}`;
        timerMinute.innerHTML = `${minute}`;
        timerHour.innerHTML = `${hour}`;

        timerIntervalId = setInterval(timer, 1000);
    }
    else {
        console.log(`difrrence time : ${diffrenceTimeInMinutes}`);
        hour += Math.round((minute + diffrenceTimeInMinutes) / 60);
        console.log(`minute : ${minute}`);
        minute = (minute + diffrenceTimeInMinutes) % 60;

        timerSecond.innerHTML = `${second}`;
        timerMinute.innerHTML = `${minute}`;
        timerHour.innerHTML = `${hour}`;

        timerIntervalId = setInterval(timer, 1000);
    }
}

var startBtn = document.getElementById("startBtn");
var stopBtn = document.getElementById("stopBtn");
var roomStatus = document.getElementById("room-status");
var timerDiv = document.getElementById("timer");

var timerHour = document.getElementById("hour");
var timerMinute = document.getElementById("minute");
var timerSecond = document.getElementById("second");

var playstationRoomId = window.location.pathname.split('/')[3];
console.log(`URL : ${window.location.pathname.split('/')[3]}`);



var timerIntervalId;
if (roomStatusVariable !== null) {
    hour = localStorage.getItem(`Timer State Hour For Room (${playstationRoomId})`);
    minute = parseInt(localStorage.getItem(`Timer State Minute For Room (${playstationRoomId})`));
    second = localStorage.getItem(`Timer State Second For Room (${playstationRoomId})`);

    if (localStorage.getItem(`gaming mode for room (${playstationRoomId})`) == "single") {
        MultiPlayerRadio.disabled = true
    }
    else {
        singlePlayerRadio.disabled = true;
        MultiPlayerRadio.checked = true;
    }
    if (localStorage.getItem(`stop time for room (${playstationRoomId})`) != null && localStorage.getItem(`Time Radio For Room (${playstationRoomId})`) != "specific") {
        timerSecond.innerHTML = second;
        timerMinute.innerHTML = minute;
        timerHour.innerHTML = hour;
        openTimeRadio.checked = true;
        specificTimeRadio.disabled = true;
        handleStopBtnClick();
    }
    else {
        if (localStorage.getItem(`Time Radio For Room (${playstationRoomId})`) == "specific") {
            console.log(specificTimeRadio);
            specificTimeRadio.checked = true;
            openTimeRadio.disabled = true;
            handleSpecificTimeRadioClick();
            // get the object of specific time inputs hours and minutes
            var specificTimeHoursAndMinutes = JSON.parse(localStorage.getItem(`Specific Time For Room (${playstationRoomId})`));
            //check if specific time is already completed
            if (hour > specificTimeHoursAndMinutes.hour || (hour == specificTimeHoursAndMinutes.hour && (minute == specificTimeHoursAndMinutes.minute || minute > specificTimeHoursAndMinutes.minute))) {
                hour = specificTimeHoursAndMinutes.hour;
                console.log(hour);
                minute = specificTimeHoursAndMinutes.minute;
                console.log(minute);
                timerSecond.innerHTML = `00`;
                timerMinute.innerHTML = `${minute}`;
                timerHour.innerHTML = `${hour}`;
                //click the stop button to calculate invoice price
                timerIntervalId = setInterval(timer, 1000);
            } else if (localStorage.getItem(`stop time for room (${playstationRoomId})`) != null) {
                timerSecond.innerHTML = second;
                timerMinute.innerHTML = minute;
                timerHour.innerHTML = hour;
                handleSpecificTimeRadioClick();
                handleStopBtnClick();
            } else {
                updateTimerInnerHtml();
            }
            specificTimeHourInput.value = specificTimeHoursAndMinutes.hour;
            specificTimeMinuteInput.value = specificTimeHoursAndMinutes.minute;
        }
        else {
            updateTimerInnerHtml();
            openTimeRadio.checked = true;
            specificTimeRadio.disabled = true;
        }
        roomStatus.innerHTML = "Busy";
    }   
    addStyleToStartBtnOnClick();
}
else if (!playstationRoomId) {
    console.log("Just Items");
} else {
    roomStatus.innerHTML = "Free";
}

// Function to execute when the radio button is clicked
function handleSpecificTimeRadioClick() {
    //set value into ls to use it to stope timer counter at specific time
    specificTimeDiv.classList.remove("d-none");
    specificTimeDiv.classList.add("d-flex");
    localStorage.setItem(`Time Radio For Room (${playstationRoomId})`, "specific");
}
specificTimeRadio.addEventListener("click", handleSpecificTimeRadioClick);
openTimeRadio.addEventListener("click", function () {
    specificTimeDiv.classList.remove("d-flex");
    specificTimeDiv.classList.add("d-none");  
    localStorage.setItem(`Time Radio For Room (${playstationRoomId})`, "open");
});
var startTime;
function addStyleToStartBtnOnClick() {
    startBtn.disabled = true;
    document.getElementsByClassName("fa-play")[0].style = "color = #198754;";
    startBtn.style = "background-color: #fff; border-color: #198754!important; border: solid 0.5px;color: #198754;";
}
startBtn.addEventListener("click", () => {
    //specific time configuration
    // save the object of specific time hours and minutes to use it to determine timer counter break time 
    if (localStorage.getItem(`Time Radio For Room (${playstationRoomId})`) == "specific") {
        var specifciTimeObj = {
            hour: specificTimeHourInput.value,
            minute: specificTimeMinuteInput.value
        }
        localStorage.setItem(`Specific Time For Room (${playstationRoomId})`, JSON.stringify(specifciTimeObj));
        openTimeRadio.disabled = true;
    }
    else {
        specificTimeRadio.disabled = true;
        localStorage.setItem(`Time Radio For Room (${playstationRoomId})`, "open");
    }          
    if (singlePlayerRadio.checked) {
        localStorage.setItem(`gaming mode for room (${playstationRoomId})`, "single");
        MultiPlayerRadio.disabled = true;
    } else {
        localStorage.setItem(`gaming mode for room (${playstationRoomId})`, "multi");
        singlePlayerRadio.disabled = true;
    }

    //import arrayOfItemsIDs from "./Item";
    startTime = new Date();
    timerIntervalId = window.setInterval(timer, 1000);
    addStyleToStartBtnOnClick();
    localStorage.setItem(`start time for room (${playstationRoomId})`, startTime.toString());
});
var diffrence;
var timeDiff;
var timeDiffInHours;
var timeDiffInMinutes;
var stopTime
var playstationRoomTotalPrice;
stopBtn.addEventListener("click", handleStopBtnClick);
//Display Items In Stock
addItemBttn.addEventListener("click", () => {
    $.ajax({
        url: "/Item/getAllItemsInStock",
        success: function (result) {
            $("#display-items").html(result);
            addBttn.style.display = "block";
        }
    });
});

$("#order-btn").click(function () {
    $.ajax({
        url: "/Order/OrderModal",
        success: function (result) {

            $("#order-modal").html(result);
        }
    });
});

var orderTable = document.getElementById("order-table");
var modalBody = document.getElementById("modal-body");
var modalFooter = document.querySelector(".modal-footer");
var orderTotalPriceValue;

function showOrder() {
    console.log("asdsad");
    discount.value = 0;
    var AllItemsTotalPrice = 0;
    var existingPsRoomTable ;
    var existingOrderTable ;
    var plastationRoomTable = document.getElementById("ps-room-table");
    //check if that is playstation gaming order or just items order
    //if its playstation gaming ->
    if (plastationRoomTable) {
        var plastationRoomTableCopy = plastationRoomTable.cloneNode(true);
        if (singlePlayerRadio.checked) {
            plastationRoomTableCopy.rows[0].cells[3].remove();
            plastationRoomTableCopy.rows[1].cells[3].remove();

        } else {
            plastationRoomTableCopy.rows[0].cells[2].remove()
            plastationRoomTableCopy.rows[1].cells[2].remove()
        }

        var row = document.querySelectorAll("tr");
        //check if the table head (time and totalPrice) is not exist already
        if (row[0].cells[4] == null) {
            var timeCellHeader = document.createElement("th");
            timeCellHeader.textContent = "Time";
            //row[0].appendChild(timeCellHeader);
            plastationRoomTableCopy.rows[0].appendChild(timeCellHeader);
            var timeCellValue = row[1].insertCell();
            timeCellValue.textContent = `${timeDiffInHours} : ${timeDiffInMinutes}`
            plastationRoomTableCopy.rows[1].appendChild(timeCellValue);
            var totalPriceCellHeader = document.createElement("th");
            totalPriceCellHeader.textContent = "Total Price";
            plastationRoomTableCopy.rows[0].appendChild(totalPriceCellHeader);

            var totalPriceCellValue = row[1].insertCell();
            totalPriceCellValue.textContent = playstationRoomTotalPrice.toString();
            plastationRoomTableCopy.rows[1].appendChild(totalPriceCellValue);
        }
        // Check if PlaystationRoomTable Is Already Exist In ModalBody
        existingPsRoomTable = (modalBody.querySelectorAll("table"))[0];
        existingOrderTable = (modalBody.querySelectorAll("table"))[1];
    } else {
        // It Is Just Items Odere
         existingOrderTable = (modalBody.querySelectorAll("table"))[0];
    } 
    
    orderTable = document.getElementById("order-table");
    if (orderTable != null) {
        var orderTableCopy = orderTable.cloneNode(true);
        //update orderTableCopy and orderTableCopy boody id
        orderTableCopy.id = "order-table-copy";
        orderTableCopy.children[1].id = "table-copy-body";
        //iterate the table delete button cell to remove it from invoice
        for (let i = 1; i < orderTableCopy.rows.length; i++) {
            orderTableCopy.rows[i].cells[5].remove();
            //Calculate The Order All Items Total Price
            AllItemsTotalPrice += parseInt(orderTableCopy.rows[i].cells[4].textContent);
        }
        //Create a new orderTableCopy row
        var orderTableCopyNewRow = document.createElement("tr");
        orderTableCopyNewRow.style.borderWidth = "3px 0 3px 0";
        //Create a new orderTableCopy AllTotalPrice cell with colspan 5
        var orderTableCopyAllTotalPriceCellHeader = document.createElement("td");
        //Create a new orderTableCopy AllTotalPrice cell with colspan 5
        var orderTableCopyAllTotalPriceCellValue = document.createElement("td");
        orderTableCopyAllTotalPriceCellHeader.colSpan = 4;
        orderTableCopyAllTotalPriceCellHeader.textContent = "All Items Total Price";
        orderTableCopyAllTotalPriceCellHeader.style.fontWeight = "bolder";
        orderTableCopyAllTotalPriceCellHeader.style.padding = "5px 5px 5px 35px";
        orderTableCopyAllTotalPriceCellHeader.style.textAlign = "start";
        //Append the new orderTableCopy AllTotalPriceHeader cell to the new orderTableCopy row
        orderTableCopyNewRow.appendChild(orderTableCopyAllTotalPriceCellHeader);
        //Append the new orderTableCopy AllTotalPriceValue cell to the new orderTableCopy row
        orderTableCopyNewRow.appendChild(orderTableCopyAllTotalPriceCellValue);
        orderTableCopyAllTotalPriceCellValue.textContent = AllItemsTotalPrice.toString();
        orderTableCopyAllTotalPriceCellValue.style.cssText = "font-weight: bolder; padding: 5px;";
        // Step 5: Append the new row to the table
        orderTableCopy.appendChild(orderTableCopyNewRow);     
    }
    else
    {
        var orderTableCopy = null;
    }
    // Create Order Total Price (Items Total Price + Playstation Gaming Total Price)
    var orderTotalPriceDiv = document.createElement("div");
    orderTotalPriceDiv.classList.add("me-auto", "p-2");
    orderTotalPriceDiv.style.cssText = " font-size: larger;  font-weight: bolder; ";
    orderTotalPriceValue =  playstationRoomTotalPrice + AllItemsTotalPrice;
    orderTotalPriceValueAfterDiscount = orderTotalPriceValue;
    //orderTotalPriceValue = playstationRoomTotalPrice + AllItemsTotalPrice;
    orderTotalPriceDiv.innerText = `Order Total Price : ${orderTotalPriceValue.toString()} L.E`;
    // Check if the div already contains a table element
    if (existingPsRoomTable == null && plastationRoomTable) modalBody.appendChild(plastationRoomTableCopy);

    console.log("order table from befor if", orderTable);
    if (orderTable != null) {
        if (existingOrderTable != null) {
            modalBody.removeChild(existingOrderTable);
        }
        modalBody.appendChild(orderTableCopy);
    }
    else {
        modalBody.removeChild(existingOrderTable);
    }
   
    //check if already orderTotalPriceDiv is not exist
    if (modalFooter.firstChild.tagName != "DIV") { 
        // insert orderTotalPriceDiv as modalFooter first child
        modalFooter.prepend(orderTotalPriceDiv);
    } 
    else {
        //delete it and update it with new value
        modalFooter.firstChild.remove();
        //delete it and update it with new value
        modalFooter.prepend(orderTotalPriceDiv);
    }
    //set discount max value = order Total Price Value
    discount.setAttribute("max", orderTotalPriceValue.toString());
}
//discount input in invoice modal
var discount = document.getElementById("discount");
var orderTotalPriceValueAfterDiscount ;
discount.addEventListener("change", () => {
    orderTotalPriceValueAfterDiscount = orderTotalPriceValue - parseFloat(discount.value)
    modalFooter.firstChild.innerText = `Order Total Price : ${orderTotalPriceValueAfterDiscount} L.E`;

})
//Add Order To DataBase


function getCookie(cookieNam) {
    // Get the value of the myCookie cookie
    const cookieValue = document.cookie.split('; ').find(cookie => cookie.startsWith(cookieNam)).split('=')[1];
    // Parse the value as JSON
    const parsedValue = JSON.parse(decodeURIComponent(cookieValue));
    return parsedValue;
};
var adminId = getCookie("AdminId");
var tableBody;

async function confirmOrder()
{
    console.log(adminId);
    if (playstationRoomId === undefined) {
        playstationRoomId = null;
        var TotalPriceOfAllOrderedItems = playstationRoomTotalPrice;
    } else {
        var TotalPriceOfAllOrderedItems = 0;
    } 
    //check if there items order to get the total price of all items to add it to total price of playstation gamin order 
    if (orderTable !== null) {
        tableBody = document.getElementById("table-body");
        for (i = 0; i < tableBody.rows.length; i++) {
            TotalPriceOfAllOrderedItems += parseFloat(tableBody.rows[i].cells[4].innerText);
        }   
        if (discount.value != "") TotalPriceOfAllOrderedItems -= parseFloat(discount.value) 
    }
    var orderToAdd = {
        StartTime: startTime ? `${startTime.toLocaleDateString('en-US')} ${startTime.toLocaleTimeString('en-US').substring(0, 11)}` : null,
        EndTime: stopTime ? `${stopTime.toLocaleDateString('en-US')} ${stopTime.toLocaleTimeString('en-US').substring(0, 11)}` : null,
        TotalPrice: orderTotalPriceValueAfterDiscount,
        Discount : parseFloat(discount.value),
        adminID: adminId,
        // check if this is just items order by checking the startTime Value
        playstationID: startTime ? parseInt(playstationRoomId) : null 
    };
    var result;
    try
    {
        const response = await fetch("/Order/AddOrderDB", {

            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },

            body: JSON.stringify(orderToAdd)
        });

        if (response.ok) {
            result = await response.json();
            //window.location.href = "http://localhost:32719/PlaystationRoom/getallrooms";
        } else {
            throw new Error(`HTTP Error: ${response.status}`);
        }
    }
    catch (error)
    {     
        console.error(error);
    }

    if (orderTable !== null)
    {
        //if (localStorage.getItem(`arrayOfItemsNameAndItemsIdForRoom(${playstationRoomId})`)) arrayOfItemsNameAndItemsId = JSON.parse(localStorage.getItem("arrayOfItemsIDsForRoom(1)"));
        for (let i = 0; i < arrayOfItemsNameAndItemsId.length; i++) 
        {
            var ItemQuantityCell = tableBody.rows[i].cells[3].textContent;
            var ItemTotalPriceCell = tableBody.rows[i].cells[4].textContent;
            TotalPriceOfAllOrderedItems += parseInt(ItemTotalPriceCell);
            /* get the item id from arrayOfItemsNameAndItemsId by getting the value of each key 
            of each object  in iarrayOfItemsNameAndItemsId */
            var itemId = arrayOfItemsNameAndItemsId[i][tableBody.rows[i].cells[0].textContent];
            var orderItemDetailsToAdd = {
                orderId: result.id,
                itemId: itemId,
                Quantity: parseInt(ItemQuantityCell),
                TotalPrice: parseInt(ItemTotalPriceCell)
            };
            try
            {
                const response1 = await fetch("/OrderItemDetails/Add", {

                    method: "POST",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },

                    body: JSON.stringify(orderItemDetailsToAdd)
                });

                if (response1.ok)
                {
                    const result1 = await response1.json();    
                } else {
                    throw new Error(`HTTP Error: ${response1.status}`);
                }
            }
            catch (error) {
                console.error(error);
            }

            //update item in stock in data base
            try {
                const response = await fetch(`/Item/UpdateItemStock/${itemId}?newInStock=${parseInt(ItemQuantityCell)}`);               
                if (response.ok) {
                    const result = await response.json();
                } else {
                    throw new Error(`HTTP Error: ${response.status}`);
                }
            }
            catch (error) {
                console.error(error);
            }
        }
    }
    deleteLocalStorageForThisRoomAfetrOrderConfirming();
    updateToastPlaystationRooms();
    //window.location.href = "http://localhost:5208/PlaystationRoom/getallrooms";
    //window.location.href = "http://localhost:5208/PlaystationRoom/getallrooms";
    window.location.href = "http://localhost:5000/PlaystationRoom/getallrooms";
}
