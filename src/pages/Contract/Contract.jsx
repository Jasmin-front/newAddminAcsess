import './Contract.css';
import together from '../../assets/header/Together.png';
import { useEffect, useRef, useState } from 'react';
import Signature from '@uiw/react-signature';
import { useRequest } from '../../api/requester';
import { useParams } from 'react-router-dom';
import DownloadIcon from '../../assets/download.svg?react';
import '../userPages/UsersDocument/UserDocument.css';
import Button from '../../components/reusable/Button/Button';
import { toast } from 'react-toastify';

const svgToFile = async svgText => {
	return new Promise((resolve, reject) => {
		try {
			const domUrl = window.URL || window.webkitURL || window;
			if (!domUrl) {
				throw new Error('(browser doesnt support this)');
			}

			const matchHeight = svgText.match(/height="(\d+)"/m);
			const matchWidth = svgText.match(/width="(\d+)"/m);
			const height = matchHeight ? parseInt(matchHeight[1], 10) : 200;
			const width = matchWidth ? parseInt(matchWidth[1], 10) : 200;

			if (!svgText.match(/xmlns="/im)) {
				svgText = svgText.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
			}

			const canvas = document.createElement('canvas');
			canvas.width = width;
			canvas.height = height;
			const ctx = canvas.getContext('2d');

			const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
			const url = domUrl.createObjectURL(svgBlob);
			const img = new Image();

			img.onload = () => {
				ctx.drawImage(img, 0, 0, width, height);
				domUrl.revokeObjectURL(url);

				canvas.toBlob(blob => {
					const file = new File([blob], 'signature.png', { type: 'image/png' });
					resolve(file);
				}, 'image/png');
			};

			img.onerror = () => {
				reject('Failed to convert SVG to PNG');
			};

			img.src = url;
		} catch (err) {
			reject('Failed to convert SVG to PNG: ' + err);
		}
	});
};

const svgToPng = function (svgText, margin, fill) {
	// convert an svg text to png using the browser
	return new Promise(function (resolve, reject) {
		try {
			// can use the domUrl function from the browser
			var domUrl = window.URL || window.webkitURL || window;
			if (!domUrl) {
				throw new Error('(browser doesnt support this)');
			}

			// figure out the height and width from svg text
			const matchHeight = svgText.match(/height=\"(\d+)/m);
			var height = matchHeight && matchHeight[1] ? parseInt(matchHeight[1], 10) : 200;
			const matchWidth = svgText.match(/width=\"(\d+)/m);
			var width = matchWidth && matchWidth[1] ? parseInt(matchWidth[1], 10) : 200;
			margin = margin || 0;

			// it needs a namespace
			if (!svgText.match(/xmlns=\"/im)) {
				svgText = svgText.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
			}

			// create a canvas element to pass through
			var canvas = document.createElement('canvas');
			canvas.width = width + margin * 2;
			canvas.height = height + margin * 2;
			var ctx = canvas.getContext('2d');

			// make a blob from the svg
			var svg = new Blob([svgText], {
				type: 'image/svg+xml;charset=utf-8',
			});

			// create a dom object for that image
			var url = domUrl.createObjectURL(svg);

			// create a new image to hold it the converted type
			var img = new Image();

			// when the image is loaded we can get it as base64 url
			img.onload = function () {
				// draw it to the canvas
				ctx.drawImage(this, margin, margin);

				// if it needs some styling, we need a new canvas
				if (fill) {
					var styled = document.createElement('canvas');
					styled.width = canvas.width;
					styled.height = canvas.height;
					var styledCtx = styled.getContext('2d');
					styledCtx.save();
					styledCtx.fillStyle = fill;
					styledCtx.fillRect(0, 0, canvas.width, canvas.height);
					styledCtx.strokeRect(0, 0, canvas.width, canvas.height);
					styledCtx.restore();
					styledCtx.drawImage(canvas, 0, 0);
					canvas = styled;
				}
				// we don't need the original any more
				domUrl.revokeObjectURL(url);
				// now we can resolve the promise, passing the base64 url
				resolve(canvas.toDataURL());
			};

			// load the image
			img.src = url;
		} catch (err) {
			reject('failed to convert svg to png ' + err);
		}
	});
};

const Contract = () => {
	const [signed, setSigned] = useState(false);
	const svgContainerRef = useRef(null);
	const [width, setWidth] = useState();
	const { request, loading, error, data } = useRequest();
	const { request: signRequest, loading: signLoading } = useRequest('post');
	const { id } = useParams();
	const handleSubmit = async () => {
		try {
			if (!signed) {
				return toast.warn('Поставьте галочку для соглашения.');
			}
			const file = await svgToFile(svgContainerRef.current.svg.outerHTML);
			const formData = new FormData();
			formData.append('sign_image', file);
			await signRequest(`/contract_for_services/view/sign/document/${id}/`, formData);
		} catch (e) {
			toast.error(e);
			console.error(e);
		}
	};

	useEffect(() => {
		request(`/contract_for_services/view/sign/document/${id}/`);
	}, []);

	useEffect(() => {
		if (data?.image_url) setSigned(true);
	}, [data]);

	useEffect(() => {
		setWidth(Math.ceil(svgContainerRef.current?.svg.getBoundingClientRect().width));
	}, []);

	const saveSignature = async () => {
		const response = await svgToPng(svgContainerRef.current.svg.outerHTML);
		const downloadLink = document.createElement('a');
		downloadLink.href = response;
		downloadLink.download = 'signature';
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	};

	const handleClickToDownload = () => {
		const downloadLink = document.createElement('a');
		downloadLink.href = data?.file;
		downloadLink.download = 'contract';
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	};

	const docs = [
		{ uri: data?.file }, // Remote file
	];

	if (error)
		return (
			<div style={{ display: 'flex', justifyContent: 'center', color: 'red' }}>
				{typeof error === 'string' ? error : JSON.stringify(error)}
			</div>
		);
	if (loading) return <div style={{ display: 'flex', justifyContent: 'center' }} aria-busy={true}></div>;
	return (
		<div className='contract_client'>
			<img className='contract_client_logo' src={together} alt='logo together' />
			{data?.file && data?.file.toLowerCase().endsWith('.pdf') && (
				<iframe src={data?.file} style={{ width: '100%', height: '700px', border: 'none' }} />
			)}
			<div className='user_document_holder' style={{ alignSelf: 'flex-start', marginTop: 20 }}>
				<div className='user_document_holder_input'>
					<div>Документ для ознакомления</div>
					<Button
						style={{ '--loading-color': '#FFF' }}
						onClick={() => handleClickToDownload()}
						className='user_document_btn'
					>
						<DownloadIcon />
					</Button>
				</div>
			</div>
			<div className='contract_client_form'>
				<label className='contract_client_form_checkbox_wrapper'>
					<input
						type='checkbox'
						disabled={!!data?.image_url}
						value={signed}
						checked={signed}
						onChange={e => {
							setSigned(prev => !prev);
						}}
					/>
					<p>Я соглашаюсь, что моя электронная подпись имеет такую же юридическую силу как моя настоящая подпись</p>
				</label>
				<h3>Ваша подпись...</h3>
				{data?.image_url ? (
					<img className='contract_client_sign_img' src={data?.image_url} />
				) : (
					<Signature
						className='sigCanvas'
						ref={svgContainerRef}
						options={{
							size: 5,
							smoothing: 0.46,
							simulatePressure: false,
							last: true,
						}}
						width={width}
						height={400}
					/>
				)}

				<div className='contract_client_form_action_btns'>
					{!data?.image_url && (
						<button className='btn' onClick={() => svgContainerRef.current.clear()}>
							Очистить
						</button>
					)}
					<div className='contract_client_form_action_btns'>
						<button className='btn' onClick={saveSignature}>
							Скачать
						</button>
						{!data?.image_url && (
							<Button className='btn' isLoading={signLoading} onClick={handleSubmit}>
								Сохранить
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contract;
