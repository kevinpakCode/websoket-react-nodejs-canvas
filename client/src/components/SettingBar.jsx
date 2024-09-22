import React from 'react'
import toolState from '../store/toolState'

export const SettingBar = () => {
  return (
    <div className="setting-bar">
      <label htmlFor="line-width">Толщина линии</label>
      <input 
        type="number" 
        id="line-width"
        defaultValue={1} 
        min={1} 
        max={50} 
        style={{margin:'0 10px'}}
        onChange={e => toolState.setLineWidth(e.target.value)}
      />
      <label htmlFor="stroke-color">Цвет обводки</label>
      <input 
        type="color" 
        id="stroke-color"
        style={{margin:'0 10px'}}
        onChange={e => toolState.setStrokeColor(e.target.value)}
      />
    </div>
  )
}
