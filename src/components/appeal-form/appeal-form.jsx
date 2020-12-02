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
	const infoRef = useRef(null)
	const reasonRef = useRef(null)
	const [infoIsFailed, setInfoFailed] = useState(false)
	const [reasonIsFailed, setReasonFailed] = useState(false)
	const [submitLoading, setLoading] = useState(false)
	const [submitted, setSubmitted] = useState(false)
	const [error, setError] = useState(false)

	const isValidated = () => {
		let validated = true

		if (!infoRef.current.value) {
			setInfoFailed(true)
			validated = false
		}
		else {
			setInfoFailed(false)
		}

		if (!reasonRef.current.value) {
			setReasonFailed(true)
			validated = false
		}
		else {
			setReasonFailed(false)
		}

		return validated
	}

	const handleSubmit = async () => {
		setError('')

		if (isValidated()) {
			setLoading(true)

			try {
				const res = await fetch('/api/appeal', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						info: infoRef.current.value,
						reason: reasonRef.current.value
					})
				})

				switch (res.status) {
					case 401: setError('You need to be logged in to send appeals. Log in using the button at the top of the page.'); break
					case 429: setError('You sent an appeal recently, please wait a bit before sending another.'); break
					case 200: setSubmitted(true); break
					default: setError('An unexpected error occured, try again later???')
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
					<label className='label'>What were you banned for?</label>
					<FormInput
						isFailed={reasonIsFailed}
						refVal={reasonRef}
					/>
					{
						reasonIsFailed &&
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
							className={`button ${error.length ? 'is-danger' : 'is-primary'} ${submitLoading ? 'is-loading' : ''}`}
							onClick={handleSubmit}
						>
							Send
						</button>
					</div>
					{
						!!error.length &&
						<p className='help is-danger'>{error}</p>
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
