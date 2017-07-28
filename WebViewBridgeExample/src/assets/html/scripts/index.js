var btn1 = document.querySelector('#btn1');
var btn2 = document.querySelector('#btn2');
var initailDiv = document.querySelector('#initail');

function invoke(inData) {
  window.location = `dacang://${JSON.stringify(inData)}`;
  return false;
}

function callNative(inData){
  window.postMessage( JSON.stringify(inData) )
}

function h5Method(){
  btn1.innerHTML = "Changed by native method:" + Math.random();
}

function initialParams(inData){
  initailDiv.innerHTML = JSON.stringify(inData, null, 2);
}

btn2.addEventListener('click', (e) => {
  callNative({
    invoke:'do',
    name:'msg',
    data:{
      content:'message from h5 by postMessage method btn2.'
    }
  });
  e.preventDefault();
});


btn1.addEventListener('click', (e) => {
  invoke({
    invoke: 'do',
    name: 'showAlert',
    data: {
      msg: 'Alert Message from html'
    }
  });
  e.preventDefault();
});


window.h5Method = h5Method;
window.initialParams = initialParams;
