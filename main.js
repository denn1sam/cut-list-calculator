const ADD_SHEET = document.getElementById('addSheet'),
    TABLE = document.getElementById('s-table'),
    SHEETS_CONTAINER = document.getElementById('sheets-container');

var sheets = [{ width: 4, height: 3, color: "#ed1c24", details: [{width: 2, height: 2, count: 5}] },
{ width: 10, height: 12, color: "#22b14c", details: [{width: 10, height: 10, count: 5}] },
{ width: 50, height: 40, color: "#000bfc", details: [{width: 10, height: 20, count: 5}] }];

for (let i = 0; i < sheets.length; i++) {
    createNewTable(i);
}

ADD_SHEET.addEventListener('click', addSheet);

function addSheet() {
    let width = document.getElementById('sWidth').value,
    height = document.getElementById('sHeight').value,
    color = document.getElementById('sColor').value;

    sheets.push({
        width: parseFloat(width),
        height: parseFloat(height),
        color: color
    });

    let index = sheets.length - 1;
    createNewTable(index);

    // renderSheets();
}

function createNewTable(i) {
    newTable = document.createElement('table');
    SHEETS_CONTAINER.appendChild(newTable);
    newTable.style.width = '600px';
    newTable.setAttribute('class', 'sheet-table');
    newTable.setAttribute('id', 'sheet-table-' + i);

    renderSheetTable(i);
}

function renderSheetTable(i) {
    let s = sheets[i];
    let sheetTable = document.getElementById('sheet-table-' + i);
    

    let sheetValueRow = sheetTable.insertRow(0);

    const td0 = sheetValueRow.insertCell(0),
        td1 = sheetValueRow.insertCell(1),
        td2 = sheetValueRow.insertCell(2),
        td3 = sheetValueRow.insertCell(3);

    td0.innerHTML = s.width;
    td1.innerHTML = s.height;
    td2.style.background = s.color;
    td3.innerHTML = 'test'; 
    
    let detailsValueForms = document.getElementById('sheet-table-' + i).insertRow(1);
    const ntd0 = detailsValueForms.insertCell(0),
        ntd1 = detailsValueForms.insertCell(1),
        ntd2 = detailsValueForms.insertCell(2),
        ntd3 = detailsValueForms.insertCell(3);

    ntd0.innerHTML = 'Width';
    ntd1.innerHTML = 'Height';
    ntd2.innerHTML = 'Counts';
    ntd3.innerHTML = 'test';
}

// function renderSheets() {
//     for (let i = 0; i < sheets.length; i++) {
//     //row of sheet value
//     createNewSheetTable(i);
//     }
// }

// function createNewSheetTable(index) {
//     let s = sheets[index];

//     let newTable = document.createElement('table');
//     SHEETS_CONTAINER.appendChild(newTable);
    
//     newTable.style.width = '600px';
//     newTable.setAttribute('class', 'sheet-table');
//     newTable.setAttribute('id', 'sheet-table-' + index);

//     let sheetTable = document.getElementById('sheet-table-' + index);
//     let sheetValueRow = sheetTable.insertRow(0);

//     const td0 = sheetValueRow.insertCell(0),
//         td1 = sheetValueRow.insertCell(1),
//         td2 = sheetValueRow.insertCell(2),
//         td3 = sheetValueRow.insertCell(3);

//     td0.innerHTML = s.width;
//     td1.innerHTML = s.height;
//     td2.style.background = s.color;
//     td3.innerHTML = 'test';

//     let detailsValueForms = document.getElementById('sheet-table-' + index).insertRow(1);
//     const ntd0 = detailsValueForms.insertCell(0),
//         ntd1 = detailsValueForms.insertCell(1),
//         ntd2 = detailsValueForms.insertCell(2),
//         ntd3 = detailsValueForms.insertCell(3);

//     ntd0.innerHTML = 'Width';
//     ntd1.innerHTML = 'Height';
//     ntd2.innerHTML = 'Counts';
//     ntd3.innerHTML = 'test';

// }



    // let sheetValueRow = TABLE.insertRow(index + 2);
    // sheetValueRow.setAttribute('id', 'sheet-row-' + index);
    // // sheetValueRow.setAttribute('class', 'sheet-row');

    // const td0 = sheetValueRow.insertCell(0),
    //     td1 = sheetValueRow.insertCell(1),
    //     td2 = sheetValueRow.insertCell(2),
    //     td3 = sheetValueRow.insertCell(3);

    // let widthValue = s.width,
    // heightValue = s.height,
    // colorValue = s.color;

    // td0.innerHTML = widthValue;
    // td1.innerHTML = heightValue;
    // td2.style.background = colorValue;
    // td3.innerHTML = 'test';

    // createNewDetailsTable(index);


// function createNewDetailsTable(index) {
//     // let sheetRows = getElementsByClassName('sheet-row');
//     // for (let i = 0; i < sheetRows.length; i++) {
//         // let sheetIndex = document.getElementById('sheet-row-' + index).value;
//         let valuesNameRow = TABLE.insertRow(sheetIndex + 1);
//         let newTable = document.createElement('table');
//         let td0 = valuesNameRow.insertCell(0);

//         td0.setAttribute('colspan', '4');
//         td0.appendChild(newTable);
        
//         newTable.style.width = '100%';
//         newTable.setAttribute('class', 'details-table');
//         newTable.setAttribute('id', 'details-table-' + index);

//         let detailsTable = document.getElementById('details-table-' + index).insertRow(0);
//         const ntd0 = detailsTable.insertCell(0),
//             ntd1 = detailsTable.insertCell(1),
//             ntd2 = detailsTable.insertCell(2),
//             ntd3 = detailsTable.insertCell(3);

//         ntd0.innerHTML = 'Width';
//         ntd1.innerHTML = 'Height';
//         ntd2.innerHTML = 'Counts';
//         ntd3.innerHTML = 'test';
//     // }
// }