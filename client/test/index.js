const btn = document.getElementById('btn')
const socket = new WebSocket('ws://localhost:5200')


socket.onopen = () => {
  console.log('Подключение установлено')
  socket.send(JSON.stringify({
    method: 'connection',
    id:555,
    username: 'Ulbi tv'
  }))
}

socket.onmessage = (event) => {
  console.log('С севера пришло сообщение:', event.data)
}

btn.onclick = () => {
  //socket.send('Привет сервер')
  socket.send(JSON.stringify({
    message: 'Привет',
    method: 'message',
    id:555,
    username: 'Ulbi tv'
  }))
}