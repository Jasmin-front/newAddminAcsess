import './UserDocument.css';
import { useEffect, useRef, useState } from 'react';
import DownloadIcon from '../../../assets/download.svg?react';
import TrashIcon from '../../../assets/trash.svg?react';
import { BASE_URL, useRequest } from '../../../api/requester';
import { useDispatch } from 'react-redux';
import { fetchDocuments } from '../../../entity/documentsReducer/documentsReducer';
import Button from '../../../components/reusable/Button/Button';
import SearchIcon from '../../../assets/search-normal.svg?react';

import { toast } from 'react-toastify';
const AddUserDocumentForm = ({ onClose, id, isEditData }) => {
	const inpFileRef = useRef();
	const [title, setTitle] = useState('');

	const [files, setFiles] = useState([]);
	const [deletedList, setDeletedFiles] = useState([]);
	const { request: downloadRequest, loading: loadingDownload } = useRequest();

	useEffect(() => {
		if (isEditData) {
			setTitle(isEditData.title);
			setFiles(isEditData.files);
		}
	}, [isEditData]);

	const dispatch = useDispatch();
	const handleAddFile = () => {
		inpFileRef.current.click();
	};
	const { request, loading } = useRequest('post');
	const { request: requestEdit, loading: loadingEdit } = useRequest('post');

	const handleClickToDownload = async file => {
		// const response =
		// 	isEditData &&
		// 	(await downloadRequest(file.file, {
		// 		requestType: 'blob',
		// 	}));
		// const blobFile = new Blob([response]);
		const downloadLink = document.createElement('a');
		downloadLink.href = isEditData
			? `/workers/client/${id}/documents/${isEditData.id}/files/${file.id}/download_two/`
			: URL.createObjectURL(file);
		downloadLink.download = isEditData ? file.file_name : file.name;
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	};

	const handleSubmit = async () => {
		const formData = new FormData();
		formData.append('title', title);
		if (files.length === 0) toast.warn('Пожалуйста добавьте файлы');
		for (let i = 0; i < files.length; i++) {
			if (isEditData && !files[i].id) formData.append(`uploaded_files`, files[i]);
			else if (!isEditData) formData.append(`uploaded_files[${i}]`, files[i]);
		}
		if (isEditData) {
			for (let i = 0; i < deletedList.length; i++) {
				formData.append(`delete_list`, deletedList[i]);
			}
		}
		if (isEditData) await requestEdit(`/workers/client/${id}/documents/${isEditData.id}/update/`, formData);
		else await request(`/workers/client/${id}/documents/upload/`, formData);
		await dispatch(fetchDocuments(id));
		onClose();
	};

	const handleFilesChange = e => {
		const selectedFiles = Array.from(e.target.files);
		if (files.length + selectedFiles.length <= 3) {
			setFiles(prev => [...prev, ...selectedFiles]);
		} else {
			const remainingSlots = 3 - files.length;
			const filesToAdd = selectedFiles.slice(0, remainingSlots);
			setFiles(prev => [...prev, ...filesToAdd]);
		}
	};

	return (
		<div>
			<div className='user_documents'>
				<input
					value={title}
					onChange={e => setTitle(e.target.value)}
					type='text'
					className='user_document_input'
					placeholder='Название'
				/>
				{files.map((item, index) => (
					<div key={index} className='user_document_holder'>
						<div className='user_document_holder_input'>
							<div>{isEditData && item.id ? item.file_name : item.name}</div>
							<Button
								isLoading={loadingDownload}
								style={{ '--loading-color': '#FFF' }}
								onClick={() => handleClickToDownload(item)}
								className='user_document_btn'
							>
								<DownloadIcon />
							</Button>
						</div>
						<a target='_blank' href={isEditData && item.id ? `${BASE_URL}${item.file}` : URL.createObjectURL(item)}>
							<button className='btn_icon'>
								<SearchIcon width={26} height={24} />
							</button>
						</a>
						<button
							onClick={() => {
								setFiles(prev => {
									return prev.filter((_, prevIndex) => prevIndex !== index);
								});
								if (isEditData)
									setDeletedFiles(prev => {
										if (item.id) return [...prev, item.id];
										return prev;
									});
							}}
							className='btn_icon'
						>
							<TrashIcon />
						</button>
					</div>
				))}

				<button style={{ '--card-bg': 'transparent', '--color': '#000' }} onClick={handleAddFile} className='btn'>
					Добавить файл
				</button>
				<input type='file' onChange={handleFilesChange} maxLength={3} multiple hidden ref={inpFileRef} />
			</div>
			<div className='form-control-btns'>
				<button
					style={{ '--card-bg': 'transparent', '--color': '#000' }}
					onClick={onClose}
					className='btns-document btn'
				>
					Отменить
				</button>
				<Button
					isLoading={loading || loadingEdit}
					style={{ '--card-bg': 'transparent', '--color': '#000' }}
					className='btns-document btn'
					onClick={handleSubmit}
				>
					Сохранить
				</Button>
			</div>
		</div>
	);
};

export default AddUserDocumentForm;
