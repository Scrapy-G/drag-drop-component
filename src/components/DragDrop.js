import { useRef, useReducer } from "react";
import UploadFile from "./UploadFile";
import { BiCloudUpload } from 'react-icons/bi';
import './dragdrop.css'


export default function DragDrop () {

    const uri = 'http://localhost/portfoly/upload.php';

    const dropzone = useRef();
    const inpFile = useRef();
    const [files, setFiles ] = useReducer((oldFiles, newFile) =>[...oldFiles, ...newFile], []);
    
    const handleChange = (e) => {        
        setFiles([...e.target.files])
    }

    const onDragOver = (e) => {
        e.stopPropagation();
        dropzone.current.classList.add("drop-zone__drag");
    }

    const onDragLeave = (e) => {
        e.stopPropagation();
        dropzone.current.classList.remove("drop-zone__drag");
    }

    const onDrop = (e) => {
        e.preventDefault();
        dropzone.current.classList.remove("drop-zone__drag");

        setFiles([...e.dataTransfer.files]);
    }

    const handleClick = (e) => {
        inpFile.current.click();
    }


    return (
        <div className="container-fluid pt-4">
        <div className='dragdrop'>
            <div 
                ref={dropzone} 
                className='drop-zone' 
                onClick={handleClick}
                onDragEnter={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                <div className='content' style={{pointerEvents: 'none'}} >
                    <div className='d-flex justify-content-center'><BiCloudUpload size={100}/></div>
                    <p className='drop-zone-text'>Drop files here or click to upload</p>
                    <input ref={inpFile} id='select-file' type='file' multiple style={{display: 'none'}} onChange={handleChange}></input>
                </div>                    
            </div>
        </div>
        
          <div className='uploaded-files'>
              <ul>
                  {files.map((file, i) => {
                      return <li key={i}><UploadFile uri={uri} file={file} /></li>
                  })}
              </ul>
          </div>
        </div>
    );
}