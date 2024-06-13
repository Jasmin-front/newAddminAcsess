import { useEffect, useRef, useState } from 'react';
import { useRequest } from '../../api/requester';
import Button from '../../components/reusable/Button/Button';
import './Contract.css';
import { useParams } from 'react-router-dom';
import DownloadIcon from '../../assets/download.svg?react';
import '../userPages/UsersDocument/UserDocument.css';
import TrashIcon from '../../assets/trash.svg?react';
import ContractDelete from './ContractDelete';

const ContractCreate = () => {
	const inpFileRef = useRef();
	const [file, setFile] = useState(null);
	const [copySuccess, setCopySuccess] = useState('');
	const [signatureId, setSignatureId] = useState(null);
	const { request: createRequest, loading: createLoading } = useRequest('post');
	const { request: deleteRequest, loading: deleteLoading } = useRequest('delete');
	const { request, loading, data, error } = useRequest();
	const { request: editRequest, loading: loadingEdit } = useRequest('put');
	const { request: getSignRequest, data: dataSign, error: signError, loading: loadingSign } = useRequest();
	const { usersId } = useParams();

	const getContract = async () => {
		const response = await request(`/workers/client/${usersId}/documents/signature/`);
		if (response?.signature_id) setSignatureId(response?.signature_id);
	};
	useEffect(() => {
		getContract();
	}, []);

	useEffect(() => {
		if (data?.file) setFile(data.file);
		if (data?.signature_id) getSignRequest(`/workers/client/${usersId}/documents/signature/${data.signature_id}/`);
	}, [data]);

	const textToCopy = signatureId ? `${location.origin}/client_cn/${signatureId}` : 'Для начала добавьте договор';

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(textToCopy);
			setCopySuccess('Ссылка скопирована!');
		} catch (err) {
			setCopySuccess('Не получилось скопировать');
		}
	};

	const handleSubmit = async () => {
		const formData = new FormData();
		if (file && typeof file !== 'string') formData.append('file', file);
		if (!data?.created_at) {
			const response = await createRequest(`/workers/client/${usersId}/documents/signature/`, formData);
			if (response?.signature_id) setSignatureId(response?.signature_id);
			await getContract();
		} else {
			const response = await editRequest(
				`/workers/client/${usersId}/documents/signature/${data.signature_id}/`,
				formData
			);
			if (response?.signature_id) setSignatureId(response?.signature_id);
		}
	};

	const handleFilesChange = e => {
		setFile(e.target.files[0]);
	};

	const handleClickToDownload = async () => {
		const downloadLink = document.createElement('a');
		downloadLink.href = typeof file === 'string' ? file : URL.createObjectURL(file);
		downloadLink.download = 'Договор';
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	};

	const handleAddFile = () => {
		inpFileRef.current.click();
	};

	const handleDrop = e => {
		e.preventDefault();
		const droppedFiles = e.dataTransfer.files;
		if (droppedFiles.length > 0) {
			setFile(droppedFiles[0]);
		}
	};

	const handleDragOver = e => {
		e.preventDefault();
	};

	const handleDelete = async () => {
		if (!data?.created_at) return setFile(null);
		await deleteRequest(`/workers/client/${usersId}/documents/signature/${data.signature_id}/`);
		setFile(null);
		await getContract();
		return;
	};

	if (loading || loadingSign) return <div style={{ display: 'flex', justifyContent: 'center' }} aria-busy={true}></div>;
	return (
		<div className='contract'>
			<h1 style={{ color: 'var(--color)' }}>Договор</h1>

			<p className='contract_link' style={{ cursor: 'pointer' }} onClick={copyToClipboard}>
				<span style={{ color: 'green' }}>{copySuccess}</span>
				<br />
				Ссылка для клиента: {textToCopy}
			</p>

			<div style={{ marginTop: 0 }} className='contract_client_form'>
				<h3>{dataSign?.image_url ? 'Подпись клиента' : 'Пока нет подписи клиента'} </h3>
				{dataSign?.image_url && <img className='contract_client_sign_img' src={dataSign.image_url} alt='Подпись' />}
			</div>

			{file && (
				<div className='user_document_holder' style={{ alignSelf: 'flex-start', minWidth: '400px' }}>
					<div className='user_document_holder_input'>
						<div>{typeof file === 'string' ? 'Договор' : file.name}</div>
						<Button
							style={{ '--loading-color': '#FFF' }}
							onClick={() => handleClickToDownload(item)}
							className='user_document_btn'
						>
							<DownloadIcon />
						</Button>
					</div>
					<ContractDelete isLoading={deleteLoading} handleDelete={handleDelete} />
				</div>
			)}
			<div className='contract_client_form_action_btns' style={{ width: '100%' }}>
				<label onDragOver={handleDragOver} onDrop={handleDrop}>
					<button onClick={handleAddFile} className='btn'>
						Добавить файл
					</button>
					<input type='file' onChange={handleFilesChange} multiple hidden ref={inpFileRef} />
				</label>

				<Button className='btn btn_contract' onClick={handleSubmit} isLoading={createLoading || loadingEdit}>
					Сохранить
				</Button>
			</div>
		</div>
	);
};

export default ContractCreate;
