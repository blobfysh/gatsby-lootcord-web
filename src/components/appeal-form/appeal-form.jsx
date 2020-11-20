import React, { useRef, useState } from 'react'

import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import Input from '../input/input'
import styles from './appeal-form.module.scss'

function FormInput({ refVal, isFailed, placeHolder }) {
	if (isFailed) {
		return (
			<Input
				icon={faExclamationTriangle}
				iconIsRight={true}
				placeHolder={placeHolder}
				className='is-danger'
				refVal={refVal}
			/>
		)
	}

	return (
		<Input
			refVal={refVal}
			placeHolder={placeHolder}
		/>
	)
}

function AppealForm({ onSubmit }) {
	const tagRef = useRef(null)
	const idRef = useRef(null)
	const infoRef = useRef(null)
	const [tagIsFailed, setTagFailed] = useState(false)
	const [idIsFailed, setIdFailed] = useState(false)
	const [infoIsFailed, setInfoFailed] = useState(false)
	const [submitLoading, setLoading] = useState(false)
	const [submitted, setSubmitted] = useState(false)
	const [isErrored, setErrored] = useState(false)

	const isValidated = () => {
		let validated = true

		if (!tagRef.current.value) {
			setTagFailed(true)
			validated = false
		}
		else {
			setTagFailed(false)
		}

		if (!idRef.current.value) {
			setIdFailed(true)
			validated = false
		}
		else {
			setIdFailed(false)
		}

		if (!infoRef.current.value) {
			setInfoFailed(true)
			validated = false
		}
		else {
			setInfoFailed(false)
		}

		return validated
	}

	const handleSubmit = async () => {
		setErrored(false)

		if (isValidated()) {
			setLoading(true)

			try {
				const res = await fetch('/api/appeal', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						tag: tagRef.current.value,
						id: idRef.current.value,
						info: infoRef.current.value
					})
				})

				if (res.status !== 200) {
					setErrored(true)
				}
				else {
					setSubmitted(true)
				}

				setLoading(false)
			}
			catch (err) {
				// continue
			}
		}
	}

	return (
		<div>
			<fieldset disabled={submitted}>
				<div className='field'>
					<label className='label'>Discord Tag (ex. blobfysh#4679)</label>
					<FormInput
						isFailed={tagIsFailed}
						refVal={tagRef}
					/>
					{
						tagIsFailed &&
						<p className='help is-danger'>This is required.</p>
					}
				</div>
				<div className='field'>
					<label className='label'>
						Discord User ID <a
							href='https://support.discordapp.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-'
							target='_blank'
							rel='noopener noreferrer'
						>
							What's this?
						</a>
					</label>
					<FormInput
						isFailed={idIsFailed}
						refVal={idRef}
					/>
					{
						idIsFailed &&
						<p className='help is-danger'>This is required.</p>
					}
				</div>
				<div className='field'>
					<label className='label'>Why should you be unbanned?</label>
					<div className='control'>
						<textarea
							className={`textarea ${styles.textarea} ${infoIsFailed ? 'is-danger' : ''}`}
							ref={infoRef}
						/>
					</div>
					{
						infoIsFailed &&
						<p className='help is-danger'>Please explain why you should be unbanned.</p>
					}
				</div>
				<div className={`field ${styles.button}`}>
					<div className='control'>
						<button
							className={`button ${isErrored ? 'is-danger' : 'is-primary'} ${submitLoading ? 'is-loading' : ''}`}
							onClick={handleSubmit}
						>
							Send
						</button>
					</div>
					{
						isErrored &&
						<p className='help is-danger'>There was an error sending your appeal, you might be sending appeals too quickly.</p>
					}
					{
						submitted &&
						<p className='help is-success'>Your appeal was successfully sent!</p>
					}
				</div>
			</fieldset>
		</div>
	)
}

export default AppealForm
