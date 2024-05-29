import './UserDocument.css'
import {useRef, useState} from "react";
const AddUserDocumentForm = () => {
    const inpFileRef = useRef()
    const [files,setFiles] = useState([])
    const handleAddFile  = () => {
        inpFileRef.current.click()
    }
    console.log(files)
    return (
        <div>
            <input type="text" className="form-control" placeholder="Название" />
            <button onClick={handleAddFile} className="btn_grandient form-control-btn">
                +add
            </button>
            <input type="file" onChange={(e)=> {
                if(files.length < 3){
                    setFiles(prev=>[...prev,e.target.files[0]])
                }
            }} hidden ref={inpFileRef}/>
            <div className='form-control-btns'>
                <button className='btns-document btn' >Submite</button>
                <button className='btns-document btn'>Cancel</button>
            </div>
        </div>
    );
};

export default AddUserDocumentForm;