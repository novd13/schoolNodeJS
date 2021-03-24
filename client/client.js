const ws= new WebSocket('ws://localhost:8085');
ws.addEventListener("open", ()=>{
  ws.addEventListener("message", m=>{
    let p= document.createElement('p');
    p.appendChild(document.createTextNode(m.data));
    document.getElementsByTagName('body')[0].appendChild(p);
    setTimeout(()=> ws.send('Sending: '+ new Date), 3000);
  })
})