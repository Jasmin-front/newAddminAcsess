import './UserDocument.css';
import { useRef, useState } from 'react';
import DownloadIcon from '../../../assets/download.svg?react';
import TrashIcon from '../../../assets/trash.svg?react';
import { useRequest } from '../../../api/requester';
const AddUserDocumentForm = ({ onClose, id }) => {
	const inpFileRef = useRef();
	const [name, setName] = useState('');
	const [files, setFiles] = useState([]);
	const handleAddFile = () => {
		inpFileRef.current.click();
	};
	const { request, data: documents } = useRequest('post');

	const handleClickToDownload = file => {
		const downloadLink = document.createElement('a');
		downloadLink.href = URL.createObjectURL(file);
		downloadLink.download = file.name;
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	};

	const handleSubmit = async () => {
		const formData = new FormData();
		if (files.length === 0) alert('Пожалуйста добавьте файлы');
		for (let i = 0; i < files.length; i++) {
			if (i === 0) formData.append(`file`, files[i]);
			else formData.append(`file${i}`, files[i]);
		}
		await request(`/workers/client/${id}/documents/`, formData);
	};

	return (
		<div>
			<div className='user_documents'>
				<input
					value={name}
					onChange={e => setName(e.target.value)}
					type='text'
					className='user_document_input'
					placeholder='Название'
				/>
				{files.map((item, index) => (
					<div key={index} className='user_document_holder'>
						<div className='user_document_holder_input'>
							<div>{item.name}</div>
							<button onClick={() => handleClickToDownload(item)} className='user_document_btn'>
								<DownloadIcon />
							</button>
						</div>
						<button
							onClick={() => {
								setFiles(prev => {
									return prev.filter((_, prevIndex) => prevIndex !== index);
								});
							}}
							className='btn_icon'
						>
							<TrashIcon />
						</button>
					</div>
				))}
				<button onClick={handleAddFile} className='btn_grandient user_form_control_btn'>
					+add
				</button>
				<input
					type='file'
					onChange={e => {
						if (files.length < 3) {
							setFiles(prev => [...prev, e.target.files[0]]);
						}
					}}
					hidden
					ref={inpFileRef}
				/>
			</div>
			<div className='form-control-btns'>
				<button className='btns-document btn' onClick={handleSubmit}>
					Submite
				</button>
				<button onClick={onClose} className='btns-document btn'>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default AddUserDocumentForm;
