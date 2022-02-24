export default function ToggleSwitch({ active, color, size, onChange }){
  const containerStyle = {
    backgroundColor: active ? color : 'rgb(167, 165, 165)',
    height: size/2,
    width: size*0.8,
    borderRadius: 50,
    transition: '0.3s',
  }
  const switchStyle = {
    width: size/3,
    height: size/3,
    backgroundColor: 'white',
    borderRadius: '50%',
    margin: size/12,
    marginLeft: active ? (size*0.8 - (size/12)) - size/3 : size/12,
    transition: '0.3s'
  }
  return(
    <div style={containerStyle} onClick={onChange}>
      <div style={switchStyle}></div>
    </div>
  )
}