var KEY = 'ca17898b676ff6157b452fbbe3d4235b07356f3d';

function getInsuranceData(years, ageCategories, incomeCategories, sexCategories, stateCode){
 $.ajax({
    async: false,
    url: "https://api.census.gov/data/timeseries/healthins/sahie",
    data: {
       get: "NAME,NIC_PT,NIC_MOE,NUI_PT,NUI_MOE,YEAR,AGECAT,IPRCAT,SEXCAT",
       for: "state:" + stateCode,
       key: KEY
    },
    success: function(response){
     console.log(response);
     var colors = ["success", "active", "info", "warning"];
     var queryRows = "";
     var rowCount = 0;
     for(y = 0; y < years.length; ++y){
       var year = years[y];
       for(a = 0; a < ageCategories.length; ++a){
         var age = ageCategories[a];
         for(i = 0; i < incomeCategories.length; ++i){
           var income = incomeCategories[i];
           for(s = 0; s < sexCategories.length; ++s){
             var sex = sexCategories[s];
             for (r = 0; r < response.length; r++) {
               if(response[r][5] === year && response[r][6] === age && response[r][7] === income && response[r][8] === sex){
                  rowCount++;
                  var queryRow = '<tr class="' + colors[rowCount % colors.length] + '"> ';
                  queryRow += '<td>' + response[r][0] + '</td> ';
                  queryRow += '<td>' + year + '</td> ';
                  queryRow += '<td>' + age + '</td> ';
                  queryRow += '<td>' + income + '</td> ';
                  queryRow += '<td>' + sex + '</td> ';
                  var insuredPeopleNum = parseInt(response[r][1]);
                  var insuredPeopleMe = parseInt(response[r][2]);
                  var uninsuredPeopleNum = parseInt(response[r][3]);
                  var uninsuredPeopleMe = parseInt(response[r][4]);
                  var peopleNum = insuredPeopleNum + uninsuredPeopleNum;
                  queryRow += '<td>' + peopleNum.toString() + '</td> ';
                  var insuredPercent = Math.round((insuredPeopleNum / peopleNum) * 100);
                  queryRow += '<td>' + insuredPercent.toString() + '%' + '</td> ';
                  queryRow += '<td>' + insuredPeopleMe.toString() + '</td> ';
                  var uninsuredPercent = Math.round((uninsuredPeopleNum / peopleNum) * 100);
                  queryRow += '<td>' + uninsuredPercent.toString() + '%' + '</td> ';
                  queryRow += '<td>' + uninsuredPeopleMe.toString() + '</td> ';
                  queryRow += '</tr>'
                  queryRows +=  queryRow;
                  //queryRows += queryRow + "<br>";
                  console.log(response[r]);
                  break;
               }
             } 
           }
         }
       }
     }
     if(queryRows.length == 0){
       document.getElementById("bootstrapTableBody").innerHTML = "Sorry we have no data that year !!!";
     }
     else{
       document.getElementById("bootstrapTableBody").innerHTML = queryRows;
     }
    }
 });
}

function yearCheckbox(searchFormYear){
    var years = [];
    var elements = searchFormYear.elements;
    for(var index = 0; index < elements.length; ++index){
      var checkBox = elements[index].checked;
      if(checkBox == true){
        years.push(elements[index].value);
      }
    }
    return years;
}

function ageCheckbox(searchFormAge){
  var ageCategories = [];
  var elements = searchFormAge.elements;
  for(var index = 0; index < elements.length; ++index){
    var checkBox = elements[index].checked;
    if(checkBox == true){
      ageCategories.push(elements[index].value);
    }
  }
  return ageCategories;
}

function incomeCheckbox(searchFormIncome){
  var incomeCategories = [];
  var elements = searchFormIncome.elements;
  for(var index = 0; index < elements.length; ++index){
    var checkBox = elements[index].checked;
    if(checkBox == true){
      incomeCategories.push(elements[index].value);
    }
  }
  return incomeCategories;
}

function sexCheckbox(searchFormSex){
  var sexCategories = [];
  var elements = searchFormSex.elements;
  for(var index = 0; index < elements.length; ++index){
    var checkBox = elements[index].checked;
    if(checkBox == true){
      sexCategories.push(elements[index].value);
    }
  }
  return sexCategories;
}

function getStateCode(state){
  var dict = {};
  dict["AL"] = "01";
  dict["AK"] = "02";
  dict["AZ"] = "04";
  dict["AR"] = "05";
  dict["CA"] = "06";
  dict["CO"] = "08";
  dict["CT"] = "09";
  dict["DE"] = "10";
  dict["DC"] = "11";
  dict["FL"] = "12";
  dict["GA"] = "13";
  dict["HI"] = "15";
  dict["ID"] = "16";
  dict["IL"] = "17";
  dict["IN"] = "18";
  dict["IA"] = "19";
  dict["KS"] = "20";
  dict["KY"] = "21";
  dict["LA"] = "22";
  dict["ME"] = "23";
  dict["MD"] = "24";
  dict["MA"] = "25";
  dict["MI"] = "26";
  dict["MN"] = "27";
  dict["MS"] = "28";
  dict["MO"] = "29";
  dict["MT"] = "30";
  dict["NE"] = "31";
  dict["NV"] = "32";
  dict["NH"] = "33";
  dict["NJ"] = "34";
  dict["NM"] = "35";
  dict["NY"] = "36";
  dict["NC"] = "37";
  dict["ND"] = "38";
  dict["OH"] = "39";
  dict["OK"] = "40";
  dict["OR"] = "41";
  dict["PA"] = "42";
  dict["RI"] = "44";
  dict["SC"] = "45";
  dict["SD"] = "46";
  dict["TN"] = "47";
  dict["TX"] = "48";
  dict["UT"] = "49";
  dict["VT"] = "50";
  dict["VA"] = "51";
  dict["WA"] = "53";
  dict["WV"] = "54";
  dict["WI"] = "55";
  dict["WY"] = "56";
  return dict[state];
}

function getInsuranceDataWithAddress(address){
  $.ajax({
     async: false,
     url: "https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?format=jsonp",
     dataType: "jsonp",
     data: {
        address: address,
        benchmark: 9
     },
     success: function(response){
       var state = "?";
       try {
         state = response.result.addressMatches[0].addressComponents.state;
         console.log(state);
       }
       catch(err) {
         alert("Address not found, please check again !!");
         console.log("err:" + err.message);
         return;
       }

       var stateCode = getStateCode(state);
       console.log("stateCode:" + stateCode);
       var years = yearCheckbox(searchFormYear);
       console.log("years:" + years);
       var ageCategories = ageCheckbox(searchFormAge);
       console.log("ageCategories:" + ageCategories);
       var incomeCategories = ageCheckbox(searchFormIncome);
       console.log("incomeCategories:" + incomeCategories);
       var sexCategories = sexCheckbox(searchFormSex);
       console.log("sexCategories:" + sexCategories);

       if(stateCode != "?"){
         getInsuranceData(years, ageCategories, incomeCategories, sexCategories, stateCode);
       }
    }
 });
}

$(document).ready(function() {
  document.getElementById('Address').addEventListener('submit', function (e) {
    e.preventDefault(); //prevent a submit button from submitting a form.
    getInsuranceDataWithAddress(document.getElementById('address').value);
}, false);
});
