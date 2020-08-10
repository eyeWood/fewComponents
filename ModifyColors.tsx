import React from 'react';
import {BlockPicker} from 'react-color';

const colors = ['#D9E3F0', '#F47373', '#697689', '#37D67A', '#2CCCE4', '#555555', '#dce775', '#ff8a65', '#eee'];

const Color = (props:any) => {
  const showPicker = (e:any) => {
    props.showPicker({show: true, index: props.i})
    props.handlePosition(e.nativeEvent.screenX);
  }

  return(
    <>
      <div className="column">
        <div onClick={(e) => showPicker(e)} style={{backgroundColor: props.color}} className="ball"></div>
        <svg onClick={(e) => showPicker(e)} className="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
          <path fillRule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
        </svg>
      </div>
      <div className="separate"></div> 
    </>
  )
}

export const ModifyColors = (props:any) => {
  const [selectedColor, setselectedColor] = React.useState<any>('#fff');
  const [picker, setPicker] = React.useState<any>({show: false, index: 0});
  const [position, setPosition] = React.useState<any>(0);

  // const [statedColors, setStatedcolors] = React.useState<any>([]);

  // React.useEffect(() => {
  //   if(props.selected.colors) setStatedcolors(props.selected.colors)
  // }, [selectedColor])

  const handleColor = (color: any) => {
    setselectedColor(color);
    props.selected.colors[picker.index] = color.hex;
    window.localStorage.setItem(props.selected.title, JSON.stringify(props.selected));
  }

  const handlePicker = (value:any) => {
    setselectedColor(props.selected.colors[value.index]);
    setPicker(value);
  }

  const handlePosition = (value:any) => {
    setPosition(value);
  }

  const styles = {
    height: picker.show ? 250.5 : 0,
    left: position ? position - 180 : 0
  }

  return(
    <>
      <div className="modify colors">
        <div className="title">
          <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-back" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z"/>
          </svg>
          <h3>Colors</h3>
        </div>
        <div className="option-wrap">
          {props.selected.colors && props.selected.colors.map((color:any, i:number) => <Color key={i} i={i} color={color} selectedColor={selectedColor} showPicker={handlePicker} picker={picker} handlePosition={handlePosition} />)}
        </div>
      </div>
      <div className="picker-container" style={styles}>
        <BlockPicker colors={colors} color={selectedColor} onChangeComplete={handleColor} />
        <div className="exit" onClick={() => setPicker({show: false, index: 0})}>
          <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" className="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
            <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
          </svg>
        </div>
      </div>
    </>
  )
}