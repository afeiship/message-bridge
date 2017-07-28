var btn1 = document.querySelector('#btn1');

function invoke(inData) {
  window.location = `dacang://${JSON.stringify(inData)}`;
  return false;
}

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
