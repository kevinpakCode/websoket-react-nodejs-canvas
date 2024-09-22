import './../styles/canvas.scss'
import { useEffect, useRef } from 'react'
import canvasState from '../store/canvasState'
import toolState from '../store/toolState'
import Brush from '../tools/Brush'
import { observer } from 'mobx-react-lite'

import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import { useParams } from 'react-router-dom'
import Rect from '../tools/Rect'

import axios from 'axios'


const Canvas = observer(() => {
  const canvasRef = useRef()
  const usernameRef = useRef ()
  const [show, setShow] = useState(true)
  const params = useParams()
  


  useEffect(() => {
    console.log(canvasRef.current, this)
    canvasState.setCanvas(canvasRef.current)
    let ctx = canvasRef.current.getContext('2d')
    axios.get(`http://localhost:5200/images?id=${params.id}`).then( response => {
      console.log('response', response.data, this)
      const img = new Image()
      img.src = response.data
      img.onload = () => {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
      }
    })
  }, [])

  useEffect(() => {
    if(canvasState.username) {
      const socket = new WebSocket(`ws://localhost:5200`)
      canvasState.setSocket(socket)
      canvasState.setSessionId(params.id)
      toolState.setTool(new Brush(canvasRef.current, socket, params.id))
      socket.onopen = () => {
        console.log('Client - Подключение установлено')
        socket.send(JSON.stringify({
          id:params.id,
          username: canvasState.username,
          method: 'connection'
        }))
      }
      socket.onmessage = (event) => {
        let msg = JSON.parse(event.data)
        console.log(msg)
        switch (msg.method) {
          case 'connection':
            console.log(`Client - Пользователь ${msg.username} присоединился`)
            break
        
            case 'draw':
              drawHandler(msg)
            break
        }
      }
    }
   
  }, [canvasState.username])

  const drawHandler = (msg) => {
    const figure = msg.figure
    const ctx = canvasRef.current.getContext('2d')
    switch (figure.type) {
      case 'brush':
          Brush.draw(ctx, figure.x, figure.y)
        break
      case 'rect':
          Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color)
        break
      case 'finish':
        ctx.beginPath()
      break
    
    }
  }

  
  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL())
    axios.post(`http://localhost:5200/images?id=${params.id}`, {
      img: canvasRef.current.toDataURL()
    }).then( response => {
      console.log('response', response.data)
    })
  }
  const handleClose = () => setShow(false)
  const connectionHandler = () => {
    canvasState.setUsername(usernameRef.current.value)
    handleClose()
  }

  return (
    <div className="canvas">
      <canvas onMouseDown={()=>mouseDownHandler()} ref={canvasRef} width={600} height={400}></canvas>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            ref={usernameRef}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={connectionHandler}>
            Войти
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
})
export default Canvas