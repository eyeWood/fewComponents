import React from 'react';

const Text = (props:any) => {
  const [text, setText] = React.useState<any>(props.text);

  const handleSave = (text:any) => {
    props.selected.texts[props.i] = text;
    window.localStorage.setItem(props.selected.title, JSON.stringify(props.selected));
  }

  return(
    <>
      <div className="column">
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Lorem ipsum..." onBlur={(e) => handleSave(text)} />
      </div>
      <div className="separate"></div>    
    </>
  )
}

export const ModifyTexts = (props:any) => {
  return(
    <div className="modify texts">
      <div className="title">
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-file-earmark-text" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 1h5v1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6h1v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2z"/>
          <path d="M9 4.5V1l5 5h-3.5A1.5 1.5 0 0 1 9 4.5z"/>
          <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
        </svg>
        <h3>Texts</h3>
      </div>
      <div className="option-wrap">
        {props.selected.texts && props.selected.texts.map((text:any, i:number) => <Text key={i} i={i} text={text} selected={props.selected} />)}
      </div>
    </div>
  )
}