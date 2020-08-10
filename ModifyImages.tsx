import React from 'react';
import firebase from '../../firebase';

const Image = (props:any) => {
  const allImputs = {};
  const [imageAsFile, setImageAsFile] = React.useState<any>('');
  const [imageAsUrl, setImageAsUrl] = React.useState<any>(allImputs);
  const [visible, setVisible] = React.useState<any>(false);
  const [uploader, setUploader] = React.useState<any>(false);

  React.useEffect(() => {
    setVisible(props.selected.images[props.i].display);
    setImageAsUrl(props.selected.images[props.i].url);
  }, [props.selected])

  const handleImageAsFile = (e:any) => {
    const image = e.target.files[0];
    setImageAsFile(image);
  }

  const handleImageUpload = (e:any) => {
    e.preventDefault()
    console.log('start of upload')
    // async magic goes here...
    let file;
    if(imageAsFile) {
      // console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
      file = imageAsFile.type.substring(0, imageAsFile.type.indexOf('/'));
    }
    
    if(file === 'image' && imageAsFile.size < 1200000) {
      const uploadTask = firebase.storage().ref(`/images/${imageAsFile.name}`).put(imageAsFile)
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
        firebase.storage().ref('images').child(imageAsFile.name).getDownloadURL()
         .then(fireBaseUrl => {
           setImageAsUrl(fireBaseUrl)
  
           props.selected.images[props.i].url = fireBaseUrl;
           window.localStorage.setItem(props.selected.title, JSON.stringify(props.selected));
         })
      })
      setUploader(false);
    } else {
      alert('You are trying to upload not an image file or the file exceeds allowed 1.2MB size.')
    }
  }

  const handleDisplay = () => {
    setVisible(!props.selected.images[props.i].display);
    
    props.selected.images[props.i].display = !props.selected.images[props.i].display;
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
        <img src={imageAsUrl} alt="Vibe sender" />
        <svg onClick={() => handleDisplay()} style={uploader ? {marginRight: 10} : {marginRight: 0}} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-eye" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          {handleEye()}
        </svg>
        <form onSubmit={handleImageUpload} style={uploader ? {width: 190} : {width: 0}}>
          <input 
            type="file"
            onChange={handleImageAsFile}
          />
          <button>
            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-right-short" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.793 8 8.146 5.354a.5.5 0 0 1 0-.708z"/>
              <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5H11a.5.5 0 0 1 0 1H4.5A.5.5 0 0 1 4 8z"/>
            </svg>
          </button>
        </form>
        <svg onClick={() => setUploader(!uploader)} className="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
          <path fillRule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
        </svg>
      </div>
      <div className="separate"></div>
    </>
  )
}

export const ModifyImages = (props:any) => {
  return(
    <div className="modify images">
      <div className="title">
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-images" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M12.002 4h-10a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zm-10-1a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-10z"/>
          <path d="M10.648 8.646a.5.5 0 0 1 .577-.093l1.777 1.947V14h-12v-1l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71z"/>
          <path fillRule="evenodd" d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM4 2h10a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1v1a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2h1a1 1 0 0 1 1-1z"/>
        </svg>
        <h3>Images</h3>
        {/* <div className="title-btn">
          <span>+</span>
          <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-image-alt" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.648 6.646a.5.5 0 0 1 .577-.093l4.777 3.947V15a1 1 0 0 1-1 1h-14a1 1 0 0 1-1-1v-2l3.646-4.354a.5.5 0 0 1 .63-.062l2.66 2.773 3.71-4.71z"/>
            <path fillRule="evenodd" d="M4.5 5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
          </svg>
        </div> */}
      </div>
      <div className="option-wrap">
        {props.selected.images && props.selected.images.map((image:any, i:number) => <Image key={i} i={i} image={image} selected={props.selected} />)}
      </div>
    </div>
  )
}