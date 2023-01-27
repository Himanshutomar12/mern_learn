
function replaceSpecialChar(getString) {
    if (typeof getString != "number" && getString != null) {
      getString = getString.replace(/\#/g, "^^hash^^");
      getString = getString.replace(/\+/g, "^^plus^^");
      getString = getString.replace(/\%/g, "^^mod^^");
      getString = getString.replace(/\&amp;/g, "^^and^^");
      getString = getString.replace(/\&/g, "^^and^^");
      getString = getString.replace(/\=/g, "^^equal^^");
    }
    return getString;
  }
  
export const apiBasePath = "http://localhost:5000";
export const apiAddEmployee = apiBasePath + "/add";
export const apiShowEmployee = apiBasePath + "/";
export const apiDeleteEmployee = apiBasePath + "/delete";
export const apiUpdateEmployee = apiBasePath + "/update";
export const apiFindById = apiBasePath + "/find-by-id";

function ajaxRequest() {
  if (window.XMLHttpRequest) {
    return new XMLHttpRequest();
  }
}

export const callApi = (url, prm, Success) => {
  var prms = "";
  if (typeof prm != "undefined") {
    for (let i = 0; i < prm.length; i++) {
      if (prms.length > 0) prms = prms + "&";
      prms = prms + (i + 1) + "=" + replaceSpecialChar(prm[i]);
    }
  }
  var xhr = new ajaxRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      var SessXML = xhr.responseText
        .replace(/[\r\n\s]*</g, "<")
        .replace(/[\r\n\s]*$/g, "");
      Success(SessXML);
    }
  };
  if(prm[0] === "getapi"){
    xhr.open("GET", url, true);
  }else {
    xhr.open("POST", url, true);
  }
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(prms);
};