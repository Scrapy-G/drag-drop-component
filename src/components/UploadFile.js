import './fileupload.css'
import { useUpload } from './upload-hook';
import { BiFile } from 'react-icons/bi'
import { MdDone } from 'react-icons/md'
import { VscError } from 'react-icons/vsc'

export default function UploadFile ( {uri, file} ) {

    const {progress, error} = useUpload(uri, file);

    if(!file) return "No files";

    const fArr = file.name.split('.');
    const fileName = fArr[0];
    const type = fArr[fArr.length-1];

    const renderProgress = () => {
        if(error) return (
            <span>
                <VscError /> 
                <span className='complete'>Error occured</span>
            </span>
        )
        if(progress < 100) return (
                <div className='progress-bar mt-1'>
                    <div className='progress-bar-fill' style={{width: progress +'%'}}></div>
                </div>
            )
        else return (
            <div>
                <span>
                    <MdDone /> 
                    <span className='complete'>{Math.floor(file.size / 1024)} KB</span>
                </span>
            </div>
        )
    }

    return (
        <div className='file-upload d-flex m-2'>
            <div className='thumbnail d-flex align-items-center justify-content-center'>
                <BiFile size={40}/>
            </div>
            <div className='info-container w-100 p-2'>
                <div className='file-info d-flex'>
                    <div className='file-name'>{fileName}</div>
                    <div className='file-type'>{type}</div>               
                </div>
                {renderProgress()}
            </div>
        </div>
    )
}