/////////////////////////////////for sheets table////////////////////////////

document.getElementById("addSheet").addEventListener("click", addSheet);

var sheets = [
    { width: 4, height: 3, color: "#ed1c24", details: [{width: 2, height: 2, count: 5}] },
    { width: 10, height: 12, color: "#22b14c", details: [{width: 10, height: 10, count: 5}] },
    { width: 50, height: 40, color: "#000bfc", details: [{width: 10, height: 20, count: 5}] }
];

renderSheets();

function addSheet(){
    let w = $("#sWidth").val();
    let h = $("#sHeight").val();
    let c = $("#sColor").val();    

    sheets.unshift({
        width: parseFloat(w),
        height: parseFloat(h),
        color: c,
        details: []
    });
    
    renderSheets();
}

function renderSheets(){
    var tb = document.querySelector("#s-table");
    
    while (tb.rows.length > 2)
        tb.deleteRow(2);
        
    for (var l in sheets){
        var s = sheets[l];
           
        var r = tb.insertRow();// sheets row
            r.innerHTML = "<td class='bg-color brd s-edit-form sWidth'>" + s.width
            + "</td><td class='bg-color brd s-edit-form sHeight'>" + s.height + "</td><td bgcolor='" + s.color + "'></td><td><input type='button' value='remove' onclick='' data-sheet-index='" + l + "' class='remove-btn btn-dlt brd sDelete'><button type='button' onclick='' data-sheet-index='" + l + "' class='chng-w-h btn-chng brd sChange' >width <i class='fas fa-exchange-alt'></i> height</button></td>";
        
        var tbl = tb.insertRow();//add new table for sheet, header
            tbl.innerHTML = "<td colspan='4'><table id='sheet-" + l + "' width='100%' class='sheet-table'><tr><td width='120' class='t-header'><font color='" + s.color + "'>Width</font></td><td width='120' class='t-header'><font color='" + s.color + "'>Height</font></td><td width='150' class='t-header'><font color='" + s.color + "'>Counts</font></td><td width='180' class='t-header'><font color='" + s.color + "'>Actions</font></td></tr></table></td>";
        
        var shtb = document.querySelector("#sheet-" + l);
        
        var t = shtb.insertRow();//forms for detail
            t.innerHTML = "<td><input type='text' name='text' class='inp-forms brd dWidth'></td><td><input type='text' name='text' class='inp-forms brd dHeight'></td><td><input type='text' name='text' class='inp-forms brd dCount'></td><td><button type='button' data-detail-index='" + l + "' class='main-st-btn btn-add add-detail brd dAdd' >add detail <i class='far fa-arrow-alt-circle-down'></i></td>";
            
        for(var ind in sheets[l].details){
            var d = sheets[l].details[ind];

            var dr = shtb.insertRow();//details row
                dr.innerHTML = "<td class='d-edit-form' data-detail-index='" + ind + "' data-sheet-index='" + l + " dWidth'>" + d.width + "</td><td class='d-edit-form' data-detail-index='" + ind + "' data-sheet-index='" + l + " dHeight'>" + d.height + "</td><td class='d-edit-form' data-detail-index='" + ind + "' data-sheet-index='" + l + " dCount'>" + d.count + "</td><td><input type='button' value='remove'  data-sheet-index='" + l + "' data-detail-index='" + ind + "' class='d-remove-btn btn-dlt brd dDelete'><button type='button' data-sheet-index='" + l + "' data-detail-index='" + ind + "' class='d-chng-w-h btn-chng brd dChange'>width <i class='fas fa-exchange-alt'></i> height</table></td>";
            }  
        }
//    //edit param. in td

    $(".d-edit-form").on("click", function(e){ 
        var iSheet = $(e.target).data("sheet-index");
        var iDet = $(e.target).data("detail-index");
        var row = $(e.target).closest("tr").val();
        
		var t = e.target || e.srcElement;
		var elm_name = t.tagName.toLowerCase();
		if(elm_name == 'input'){
            return false;
        }
        
		var code = "<input type='text' name='text' id='edit' class='inp-forms brd d-edit-forms' value='" + row + "'>";

		$(this).empty().append(code);
		$('#edit').focus();
        $('#edit').blur(function(){	//устанавливаем обработчик
        var val = $(this).val();	//получаем то, что в поле находится
            sheets[iSheet].details[iDet].push({
               width: parseFloat(val) 
            });
			//находим ячейку, опустошаем, вставляем значение из поля
			$(this).parent().empty().html(val);
		});
	});
    
    //adddetail button and index == l in sheets
    $(".dAdd").on("click", function(e){  
        var index = $(e.target).data("detail-index");
        var row = $(e.target).closest("tr");
        
        var dw = row.find("input.dWidth").val();
        var dh = row.find("input.dHeight").val();
        var dc = row.find("input.dCount").val();
        
        sheets[index].details.unshift({
            width: parseFloat(dw),
            height: parseFloat(dh),
            count: parseFloat(dc)
        });
    
        renderSheets();
    
    }); 
    
    //delete sheet button
    $(".sDelete").on("click", function(e){  
        var sheetIndex = $(e.target).data("sheet-index"); 
        sheets.splice(sheetIndex,1); 
        renderSheets();
     }); 

    //change width-height button in sheet
    $(".sChange").on("click", function(e){  
        var chngSheet = e.target.getAttribute("data-sheet-index"); 
        var sheet = sheets[chngSheet];
        
        var sWidth = sheet.width;
            sheet.width = sheet.height;
            sheet.height = sWidth;
        
        renderSheets();
     });
    
    //delete detail button
    $(".dDelete").on("click", function(e){  
        var sheetIndex = e.target.getAttribute("data-sheet-index");     
        var delDetail = e.target.getAttribute("data-detail-index"); 
            sheets[sheetIndex].details.splice(delDetail,1); 
            
        renderSheets();
     }); 
    
    //change width-height button in detail
    $(".dChange").on("click", function(e){  
        var chngSheet = e.target.getAttribute("data-sheet-index"); 
        var chngDetail = e.target.getAttribute("data-detail-index");
        var detail =  sheets[chngSheet].details[chngDetail];

        var detWidth = detail.width;
        detail.width = detail.height;
        detail.height = detWidth;
            
        renderSheets();
     });
    
    $(".sCalculate").on("click", function(e){      
        calculate();
    });
}  /////renderSheets() end
    


$(window).keydown(function(event){
	if(event.keyCode == 13){
		$('#edit').blur();
	}
});

var calc = [];

function calculate(){
    calc = [];
    for(var z in sheets){
        
        var sheet = sheets[z];  
        var fill = [];
        var width = sheet.width;
        var height = sheet.height;

        for(var a=0; a < sheet.details.length; a++){
            var details = sheet.details;

            for(var p=0; p < details[a].count; p++) {
                fill.push({
                    x: 0,
                    y: 0,
                    width: details[a].width,
                    height: details[a].height,
                    sheet: -1
                });
            }
        }

        var xpos = 0;///width 
        var ypos = 0;///height 
        var hrow = 0;
        var tsheets = 1;

        for(var i = 0; i < fill.length; i++) {        
            var d = fill[i];

            if(width < d.width || height < d.height) {
                console.log("detail is to big for thees sheet!(width or height to big)");
                continue;
            }

            if(xpos + d.width > width) {
                if(ypos + hrow + d.height > height){
                    tsheets++;
                    ypos = 0;
                    
                }
                else {
                    ypos += hrow;
                }

                xpos = 0;
                hrow = 0;
            }

            hrow = Math.max(hrow, d.height);

            d.y = ypos;
            d.x = xpos;
            d.sheet = tsheets - 1;

            xpos += d.width;
            
        }
        
        calc.push({
            sheetSize: {width: sheet.width, height: sheet.height},
            tsheets: tsheets,
            fill: fill
        });
        
        $("#sheetsContainer").html("");
        renderSheetsToCanvas($("#sheetsContainer")); 
    }
}

function renderSheetsToCanvas(container) {
    var $c = $(container);
    
    for(var z in calc){
        var cl = calc[z]
        for(var i = 0; i < cl.tsheets; i ++) {
            var c = $("<canvas>").attr({ width: 150, height: 150}).appendTo($c).get(0);
                        
            renderSheet(c, cl.sheetSize, cl.fill.filter(function(x){
                return x.sheet == i;
            }));
        }
    }
}

function renderSheet(canvas, sheetSize, details){
    var ctx = canvas.getContext("2d");
    var scale = Math.min(canvas.width / sheetSize.width, canvas.height / sheetSize.height);
                         
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();             
    ctx.scale(scale, scale); 
    
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, sheetSize.width, sheetSize.height);

    for(var i = 0; i < details.length; i++){
        var d = details[i];
        ctx.lineWidth = (1/scale);
        
        ctx.fillStyle = "#88334488";
        ctx.fillRect(d.x, d.y, d.width, d.height);

        ctx.stroke = "black";
        ctx.strokeRect(d.x, d.y, d.width, d.height);   
    }     
    ctx.restore();
}










