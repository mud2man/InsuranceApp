var KEY = 'ca17898b676ff6157b452fbbe3d4235b07356f3d';

function getInsuranceData(years, ageCategories, incomeCategories, sexCategories, stateCode){
 $.ajax({
    url: "https://api.census.gov/data/timeseries/healthins/sahie",
    data: {
       get: "NAME,NIC_PT,NIC_MOE,NUI_PT,NUI_MOE,YEAR,AGECAT,IPRCAT,SEXCAT",
       for: "state:" + stateCode,
       key: KEY
    },
    success: function(response){
     console.log(response);
     console.log("stateCode @ getInsuranceData:" + stateCode);
     var queryRows = "";
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
                  var queryRow = "";
                  queryRow += "state:" + response[r][0] ;
                  queryRow += ", year:" + year;
                  queryRow += ", age category:" + age;
                  queryRow += ", income category:" + income;
                  queryRow += ", sex category:" + sex;
                  var insuredPeopleNum = parseInt(response[r][1]);
                  var insuredPeopleMe = parseInt(response[r][2]);
                  var uninsuredPeopleNum = parseInt(response[r][3]);
                  var uninsuredPeopleMe = parseInt(response[r][4]);
                  var peopleNum = insuredPeopleNum + uninsuredPeopleNum;
                  queryRow += ", peopel number:" + peopleNum.toString();
                  var insuredPercent = Math.round((insuredPeopleNum / peopleNum) * 100);
                  queryRow += ", insured percentage:" + insuredPercent.toString() + "%";
                  queryRow += ", insured margin of error:" + insuredPeopleMe.toString();
                  var uninsuredPercent = Math.round((uninsuredPeopleNum / peopleNum) * 100);
                  queryRow += ", uninsured percentage:" + uninsuredPercent.toString() + "%";
                  queryRow += ", uninsured margin of error:" + uninsuredPeopleMe.toString();
                  queryRows += queryRow + "<br>";
                  console.log(response[r]);
                  break;
               }
             } 
           }
         }
       }
     }
     if(queryRows.length == 0){
       document.getElementById("PeopleCount").innerHTML = "Sorry we have no data that year !!!";
     }
     else{
       document.getElementById("PeopleCount").innerHTML = queryRows;
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

function getStateCode(streetName, cityName, stateName){
  var xmlHttp = new XMLHttpRequest();
  var url = "https://geocoding.geo.census.gov/geocoder/geographies/address";
  url = url + "?street=" + streetName;
  url = url + "&city=" + cityName;
  url = url + "&state=" + stateName;
  url = url + "&benchmark=Public_AR_Census2010&vintage=Census2010_Census2010&layers=14&format=jsonp";
  xmlHttp.open("GET", url, false ); // false for synchronous request
  xmlHttp.send(null);
  var response = JSON.parse(xmlHttp.responseText);
  
  var stateCode = "?";
  try {
    stateCode = response["result"]["addressMatches"][0]["geographies"]["Census Blocks"][0]["STATE"]
    console.log(stateCode);
  }
  catch(err) {
    alert("Address not found, please check again !!");
    console.log("err:" + err.message);
  }

  return stateCode;
}
function httpGet(url){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", url, false ); // false for synchronous request
  xmlHttp.send(null);
  var response = JSON.parse(xmlHttp.responseText);
  console.log(response);
}

function test(){
  $.ajax({
     url: "https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?format=jsonp",
     dataType: "jsonp",
     data: {
        address: "4600 Silver Hill Rd, Suitland, MD, 20746",
        benchmark: 9
     },
     success: function(response){
      console.log("test~~~~~~~~~~~~");
       console.log(response);
    }
 });
}

$(document).ready(function() {
  document.getElementById('Address').addEventListener('submit', function (e) {
    e.preventDefault(); //prevent a submit button from submitting a form.
    var years = yearCheckbox(searchFormYear);
    console.log("years:" + years);
    var ageCategories = ageCheckbox(searchFormAge);
    console.log("ageCategories:" + ageCategories);
    var incomeCategories = ageCheckbox(searchFormIncome);
    console.log("incomeCategories:" + incomeCategories);
    var sexCategories = sexCheckbox(searchFormSex);
    console.log("sexCategories:" + sexCategories);
    
    var street = document.getElementById('street').value;
    var city = document.getElementById('city').value;
    var state = document.getElementById('state').value;
    //console.log("before test");
    //test();
    //console.log("after test");
    var stateCode = getStateCode(street, city, state);
    if(stateCode != "?"){
      getInsuranceData(years, ageCategories, incomeCategories, sexCategories, stateCode);
    }

    //httpGet("https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?format=jasonp")

}, false);
});