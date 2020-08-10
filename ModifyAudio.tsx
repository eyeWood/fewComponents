import React from 'react';
import {ReactMic} from 'react-mic';
import firebase from '../../firebase';
import {v4 as uuid} from 'uuid';

const useAudio = (url:string) => {
  const [audio] = React.useState<any>(new Audio(url));
  const [playing, setPlaying] = React.useState<any>(false);

  const toggle = () => setPlaying(!playing);

  React.useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  React.useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const ModifyAudioElement = (props:any) => {
  const [start, setStart] = React.useState<any>(props.audio.start);
  const [end, setEnd] = React.useState<any>(props.audio.end);
  const [play, setPlay] = React.useState<boolean>(false);

  const handleSave = (value:any) => {
    if(value === 'start') {
      props.selected.audio[props.i].start = parseInt(start, 10);
      window.localStorage.setItem(props.selected.title, JSON.stringify(props.selected));
    } else if(value === 'end') {
      props.selected.audio[props.i].end = parseInt(end, 10);
      window.localStorage.setItem(props.selected.title, JSON.stringify(props.selected));
    }
  }

  const handleType = (value:any) => {
    if(value === 'mic') {
      return (
        <>
          <path fillRule="evenodd" d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
          <path fillRule="evenodd" d="M10 8V3a2 2 0 1 0-4 0v5a2 2 0 1 0 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z"/>
        </>
      )
    } else {
      return (
        <>
          <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z"/>
          <path fillRule="evenodd" d="M14 11V2h1v9h-1zM6 3v10H5V3h1z"/>
          <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4V2.905z"/>
        </>
      )
    }
  }

  const handlePlayDisplay = () => {
    if(playing) {
      return <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
    }
    else {
      return <path fillRule="evenodd" d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
    }
  }

  const [playing, toggle] = useAudio(props.audio.url);

  return(
    <>
      <div className="column">
        <div>
          <div className="ball">
            <svg className="bi bi-mic" width="0.8em" height="0.8em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              {handleType(props.audio.type)}
            </svg>
          </div>
          <input value={start} onChange={(e) => setStart(parseInt(e.target.value, 10))} onBlur={() => handleSave('start')} type="number" min="0" max="99" placeholder="Start" />
          <span>-</span>
          <input value={end} onChange={(e) => setEnd(parseInt(e.target.value, 10))} onBlur={() => handleSave('end')} type="number" min="0" max="99" placeholder="End" />
          <span>sec.</span>
          <svg onClick={() => toggle()} width="1.2em" height="1.2em" viewBox="0 0 16 16" className="bi bi-play" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            {handlePlayDisplay()}
          </svg>
          <svg onClick={() => props.handleDelete(props.audio.title)} width="1.2em" height="1.2em" viewBox="0 0 16 16" className="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
            <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
          </svg>
        </div>
        <span>{props.audio.title}</span>
      </div>
      <div className="separate"></div>
    </>
  )
}

// const HandleRecord = (props:any) => {
//   const [record, setRecord] = React.useState<boolean>(false);

//   const onStop = (value:any) => {
//     console.log(value)
//     let file;
//     if(value) {
//       file = value.blob.type.substring(0, value.blob.type.indexOf('/'));
//     }
    
//     if(file === 'audio' && value.blob.size < 7000000) {
//       const uploadTask = firebase.storage().ref(`/audio/record`).put(value.blob)
//       //initiates the firebase side uploading 
//       uploadTask.on('state_changed', 
//       (snapShot) => {
//         //takes a snap shot of the process as it is happening
//         console.log(snapShot)
//       }, (err) => {
//         //catches the errors
//         console.log(err)
//       }, () => {
//         firebase.storage().ref('audio').child('record').getDownloadURL()
//          .then(fireBaseUrl => {
//            let obj = {
//              type: 'music',
//              start: 0,
//              end: 0,
//              title: 'record',
//              url: fireBaseUrl
//            }
  
//            props.selected.audio.push(obj);
//            window.localStorage.setItem(props.selected.title, JSON.stringify(props.selected));
//          })
//       })
//     } else {
//       alert('You are trying to upload not an audio file or the file exceeds allowed 3MB size.')
//     }
//   }

//   return (
//     <>
//       <div onClick={() => setRecord(!record)}>{record ? 'Pause' : 'Play'}</div>
//       <ReactMic
//         record={record}         // defaults -> false.  Set to true to begin recording
//         visualSetting="sinewave" // defaults -> "sinewave".  Other option is "frequencyBars"
//         className={'sound-recorder'}       // provide css class name
//         onStop={onStop}        // required - called when audio stops recording
//         mimeType="audio/webm"     // defaults -> "audio/webm".  Set to "audio/wav" for WAV or "audio/mp3" for MP3 audio format (available in React-Mic-Gold)
//       />
//     </>
//   )
// }

export const ModifyAudio = (props:any) => {
  const [selected, setSelected] = React.useState<any>(props.selected);
  const [audioAsFile, setAudioAsFile] = React.useState<any>('');
  const [showMusic, setShowMusic] = React.useState<boolean>(false);
  const [start, setStart] = React.useState<any>(0);
  const [end, setEnd] = React.useState<any>(0);
  const [title, setTitle] = React.useState<string>('');
  const [y, setY] = React.useState<number>(0);
  const titleInput = React.createRef<any>();
  const [audioRecord, setAudioRecord] = React.useState<boolean>(false);
  const [audioRecordUrl, setAudioRecordUrl] = React.useState<string>('');

  const handleMusicAsFile = (e:any) => {
    const image = e.target.files[0];
    setAudioAsFile(image);
  }

  const handleMusicUpload = (e:any) => {
    e.preventDefault()
    console.log('start of upload')
    // async magic goes here...
    let file;
    const id = uuid();
    if(audioAsFile) {
      file = audioAsFile.type.substring(0, audioAsFile.type.indexOf('/'));
    }

    if(audioAsFile && file === 'audio' && audioAsFile.size < 7000000) {
      const uploadTask = firebase.storage().ref(`/audio/${id}-${audioAsFile.name}`).put(audioAsFile)
      //initiates the firebase side uploading 
      uploadTask.on('state_changed', 
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot)
      }, (err) => {
        //catches the errors
        console.log(err)
      }, () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        firebase.storage().ref('audio').child(`${id}-${audioAsFile.name}`).getDownloadURL()
         .then(fireBaseUrl => {
           let obj = {
             type: 'music',
             start,
             end,
             title,
             url: fireBaseUrl
           }
  
           props.selected.audio.push(obj);
           window.localStorage.setItem(props.selected.title, JSON.stringify(props.selected));
           setTitle('');
           setStart(0);
           setEnd(0);
         })
      })
      setShowMusic(false);
    } else {
      alert('You are trying to upload not an audio file or the file exceeds allowed 3MB size.')
    }
  }

  const handleShow = (e:any, type:string) => {
    if(type === 'mic') {
      setAudioRecord(true);
    } else {
      setAudioRecord(false);
      setAudioRecordUrl('');
    }
    setShowMusic(true);
    titleInput.current.focus();
    setY(e.nativeEvent.pageY + 30);
  }

  const handleDelete = (value:string) => {
    props.selected.audio = props.selected.audio.filter((audio:any) => audio.title !== value);
    window.localStorage.setItem(props.selected.title, JSON.stringify(props.selected));
    setSelected({...props.selected});
  }

  const HandleRecord = (props:any) => {
    const [record, setRecord] = React.useState<boolean>(false);
  
    const onStop = (value:any) => {
      let file;
      const id = uuid();
      if(value) {
        file = value.blob.type.substring(0, value.blob.type.indexOf('/'));
      }
      
      if(file === 'audio' && value.blob.size < 7000000) {
        const uploadTask = firebase.storage().ref(`/audio/${id}`).put(value.blob)
        //initiates the firebase side uploading 
        uploadTask.on('state_changed', 
        (snapShot) => {
          //takes a snap shot of the process as it is happening
          console.log(snapShot)
        }, (err) => {
          //catches the errors
          console.log(err)
        }, () => {
          firebase.storage().ref('audio').child(id).getDownloadURL()
           .then(fireBaseUrl => {
            //  let obj = {
            //    type: 'mic',
            //    start,
            //    end,
            //    title: 'record',
            //    url: fireBaseUrl
            //  }
              setAudioRecordUrl(fireBaseUrl);
            //  props.selected.audio.push(obj);
            //  window.localStorage.setItem(props.selected.title, JSON.stringify(props.selected));
           })
        })
      } else {
        alert('You are trying to upload not an audio file or the file exceeds allowed 3MB size.')
      }
    }

    const handleIcon = () => {
      if(record) {
        return <svg width="1.1em" height="1.1em" viewBox="0 0 16 16" className="bi bi-play" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
        </svg>
      } else {
        return <svg width="1.1em" height="1.1em" viewBox="0 0 16 16" className="bi bi-play" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
        </svg>
      }
    }
  
    return (
      <>
        <div onClick={() => setRecord(!record)}>{handleIcon()}{!record ? 'Rec' : 'Stop'}</div>
        <ReactMic
          record={record}         // defaults -> false.  Set to true to begin recording
          visualSetting="sinewave" // defaults -> "sinewave".  Other option is "frequencyBars"
          className={'sound-recorder'}       // provide css class name
          onStop={onStop}        // required - called when audio stops recording
          mimeType="audio/webm"     // defaults -> "audio/webm".  Set to "audio/wav" for WAV or "audio/mp3" for MP3 audio format (available in React-Mic-Gold)
        />
      </>
    )
  }

  const ListenRecord = () => {
    const handlePlayDisplay = () => {
      if(playing) {
        return <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
      }
      else {
        return <path fillRule="evenodd" d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
      }
    }

    const handleAudioUpload = () => {
      if(audioRecordUrl) {
        let obj = {
          type: 'mic',
          start,
          end,
          title,
          url: audioRecordUrl
        }
        props.selected.audio.push(obj);
        window.localStorage.setItem(props.selected.title, JSON.stringify(props.selected));
        setTitle('');
        setStart(0);
        setEnd(0);
        setShowMusic(false);
      } else {
        alert('No audio record was detected or title was not created.')
      }
    }

    const [playing, toggle] = useAudio(audioRecordUrl);
    return (
      <div className="listen-wrapper">
        <div>
          <svg onClick={() => toggle()} width="1.2em" height="1.2em" viewBox="0 0 16 16" className="bi bi-play" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            {handlePlayDisplay()}
          </svg>
          {playing ? <p>Stop</p> : <p>Listen</p>}
        </div>
        <div onClick={() => handleAudioUpload()} className="ball">
          <p>Upload</p>
          <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-right-short" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M8.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.793 8 8.146 5.354a.5.5 0 0 1 0-.708z"/>
            <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5H11a.5.5 0 0 1 0 1H4.5A.5.5 0 0 1 4 8z"/>
          </svg>
        </div>
      </div>
    )
  }

  return(
    <div className="modify audio">
      <div className="title">
        <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" className="bi bi-soundwave" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M8.5 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5zm-2 2a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zm-6 1.5A.5.5 0 0 1 5 6v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm8 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm-10 1A.5.5 0 0 1 3 7v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5zm12 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5z"/>
        </svg>
        <h3>Audio</h3>
        <div onClick={(e) => handleShow(e, 'mic')} className="title-btn">
          <span>+</span>
          <svg width="0.9em" height="0.9em" viewBox="0 0 16 16" className="bi bi-mic" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
            <path fillRule="evenodd" d="M10 8V3a2 2 0 1 0-4 0v5a2 2 0 1 0 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z"/>
          </svg>
        </div>
        <div onClick={(e) => handleShow(e, 'music')} className="title-btn">
          <span>+</span>
          <svg width="0.9em" height="0.9em" viewBox="0 0 16 16" className="bi bi-music-note-beamed" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z"/>
            <path fillRule="evenodd" d="M14 11V2h1v9h-1zM6 3v10H5V3h1z"/>
            <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4V2.905z"/>
          </svg>
        </div>
      </div>
      <div className="music-uploader" style={showMusic ? audioRecordUrl ? {height: 180, top: y} : {height: 160, top: y} : {height: 0}}>
        <form onSubmit={handleMusicUpload}>
          <h4>Adding {audioRecord ? 'voice record' : 'music'}</h4>
          <div className="exit" onClick={() => setShowMusic(false)}>
            <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" className="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
              <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
            </svg>
          </div>
          <input className="title" value={title} ref={titleInput} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
          <p>Start - End interval (sec.)</p>
          <div className="interval-wrapper">
            <input value={start} onChange={(e) => setStart(parseInt(e.target.value, 10))} type="number" min="0" max="99" placeholder="Start" />
            <span>-</span>
            <input value={end} onChange={(e) => setEnd(parseInt(e.target.value, 10))} type="number" min="0" max="99" placeholder="End" />
          </div>
          <div className="upload-wrapper">
            {audioRecord ? <HandleRecord selected={props.selected} /> : 
            <>
              <input 
                type="file"
                onChange={handleMusicAsFile}
              />
              <button>
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-right-short" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M8.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.793 8 8.146 5.354a.5.5 0 0 1 0-.708z"/>
                  <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5H11a.5.5 0 0 1 0 1H4.5A.5.5 0 0 1 4 8z"/>
                </svg>
              </button>
            </>}
          </div>
          {audioRecordUrl && <ListenRecord />}
        </form>
      </div>
      <div className="option-wrap">
        {selected.audio && selected.audio.map((audio:any, i:number) => <ModifyAudioElement key={i} i={i} audio={audio} handleDelete={handleDelete} selected={props.selected} />)}
      </div>
    </div>
  )
}