import React from 'react';

const Animation = (props:any) => {
  const [visible, setVisible] = React.useState<any>(false);
  const [value, setValue] = React.useState<any>(props.animation.time);

  const handleSave = () => {
    props.selected.animationLengths[props.i].time = parseInt(value, 10);
    window.localStorage.setItem(props.selected.title, JSON.stringify(props.selected));
  }

  React.useEffect(() => {
    setVisible(props.selected.animationLengths[props.i].display);
  }, [props.selected])

  const handleDisplay = () => {
    setVisible(!props.selected.animationLengths[props.i].display);
    
    props.selected.animationLengths[props.i].display = !props.selected.animationLengths[props.i].display;
    window.localStorage.setItem(props.selected.title, JSON.stringify(props.selected));
  }

  const handleEye = () => {
    if(visible) {
      return (
        <>
          <path fillRule="evenodd" d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 0 0 1.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0 0 14.828 8a13.133 13.133 0 0 0-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 0 0 1.172 8z"/>
          <path fillRule="evenodd" d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
        </>
      )
    } else {
      return (
        <>
          <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
          <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
          <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709z"/>
          <path fillRule="evenodd" d="M13.646 14.354l-12-12 .708-.708 12 12-.708.708z"/>
        </>
      )
    }
  }

  return(
    <>
      <div className="column">
        <span>{props.animation.title}</span>
        <div>
          <svg onClick={() => handleDisplay()} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-eye" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            {handleEye()}
          </svg>
          <input value={value} type="number" min="0" max="99" placeholder="Type seconds" onChange={(e) => setValue(parseInt(e.target.value, 10))} onBlur={() => handleSave()} />
          <span>sec.</span>
        </div>
      </div>
    </>
  )
}

export const ModifyAnimationLength = (props:any) => {
  return(
    <div className="modify">
      <div className="title">
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-collection-play" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M14.5 13.5h-13A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5zm-13 1A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5h-13zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1z"/>
          <path fillRule="evenodd" d="M6.258 6.563a.5.5 0 0 1 .507.013l4 2.5a.5.5 0 0 1 0 .848l-4 2.5A.5.5 0 0 1 6 12V7a.5.5 0 0 1 .258-.437z"/>
        </svg>
        <h3>Animation length</h3>
      </div>
      <div className="option-wrap animation-length">
        {props.selected.animationLengths && props.selected.animationLengths.map((animation:any, i:number) => <Animation key={i} i={i} animation={animation} selected={props.selected} />)}
      </div>
    </div>
  )
}