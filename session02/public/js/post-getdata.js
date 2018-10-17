let xhr = new XMLHttpRequest();

xhr.onreadystatechange = () => {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);

    document.getElementById('header').innerHTML = data.header;
    document.getElementById('subheader').innerHTML = data.subheader;
    document.getElementById('meta').innerHTML = data.meta;
    document.getElementById('body').innerHTML = data.body;
  }
};
xhr.open('GET', 'api/v1/post', true);
xhr.send();
