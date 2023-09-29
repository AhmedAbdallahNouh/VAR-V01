var itemsOrderTable = document.getElementById("items-order-table");
var allOrderTotalPriceInput = document.getElementById("all-order-total-price-input");
var allOrderTotalPriceDiv = document.getElementById("all-order-total-price-div");
var gamingTotalPriceCell = document.getElementById("gaming-total-price-cell");
var allItemsTotalPrice = 0;
for (let i = 0; i < itemsOrderTable.rows.length; i++) {
    allItemsTotalPrice += parseFloat(itemsOrderTable.rows[i].cells[4].textContent);
}
let discountInput = document.getElementById("discount-input");
let discountDiv = document.getElementById("discount-div");
let discountValue = parseFloat(discountInput.value);
let gamingTotalPrice = (parseFloat(allOrderTotalPriceInput.value) + discountValue ) - allItemsTotalPrice ;
gamingTotalPriceCell.innerHTML = gamingTotalPrice;
//Create a new orderTableCopy row
var itemsOrderTableCopyNewRow = document.createElement("tr");
itemsOrderTableCopyNewRow.style.borderWidth = "3px 0 3px 0";
//Create a new orderTableCopy AllTotalPrice cell with colspan 5
var itemsOrderTableCopyAllTotalPriceCellHeader = document.createElement("td");
//Create a new orderTableCopy AllTotalPrice cell with colspan 5
var itemsOrderTableCopyAllTotalPriceCellValue = document.createElement("td");
itemsOrderTableCopyAllTotalPriceCellHeader.colSpan = 4;
itemsOrderTableCopyAllTotalPriceCellHeader.textContent = "All Items Total Price";
itemsOrderTableCopyAllTotalPriceCellHeader.style.fontWeight = "bolder";
itemsOrderTableCopyAllTotalPriceCellHeader.style.padding = "5px 5px 5px 35px";
itemsOrderTableCopyAllTotalPriceCellHeader.style.textAlign = "start";
//Append the new orderTableCopy AllTotalPriceHeader cell to the new orderTableCopy row
itemsOrderTableCopyNewRow.appendChild(itemsOrderTableCopyAllTotalPriceCellHeader);
//Append the new orderTableCopy AllTotalPriceValue cell to the new orderTableCopy row
itemsOrderTableCopyNewRow.appendChild(itemsOrderTableCopyAllTotalPriceCellValue);
itemsOrderTableCopyAllTotalPriceCellValue.textContent = allItemsTotalPrice.toString();
itemsOrderTableCopyAllTotalPriceCellValue.style.cssText = "font-weight: bolder; padding: 5px;";
// Step 5: Append the new row to the table
itemsOrderTable.appendChild(itemsOrderTableCopyNewRow);