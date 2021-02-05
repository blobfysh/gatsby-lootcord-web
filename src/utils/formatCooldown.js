export default function formatCooldown(ms) {
	let remaining = ms
	const finalStr = []

	const rawDays = remaining / (1000 * 60 * 60 * 24)
	const days = Math.floor(rawDays)
	remaining %= 1000 * 60 * 60 * 24

	const rawHours = remaining / (1000 * 60 * 60)
	const hours = Math.floor(rawHours)
	remaining %= 1000 * 60 * 60

	const rawMinutes = remaining / (1000 * 60)
	const minutes = Math.floor(rawMinutes)
	remaining %= 1000 * 60

	const seconds = Math.floor(remaining / 1000)

	if (days > 0) {
		finalStr.push(days === 1 ? `${days} day` : `${days} days`)
	}
	if (hours > 0) {
		if (days > 0) {
			finalStr.push(`${rawHours.toFixed(1)} hours`)
			return finalStr.join(' ')
		}
		finalStr.push(hours === 1 ? `${hours} hour` : `${hours} hours`)
	}
	if (minutes > 0) {
		if (hours > 0 || days > 0) {
			finalStr.push(`${rawMinutes.toFixed(1)} minutes`)
			return finalStr.join(' ')
		}
		finalStr.push(minutes === 1 ? `${minutes} minute` : `${minutes} minutes`)
	}

	if (seconds !== 0) finalStr.push(seconds === 1 ? `${seconds} second` : `${seconds} seconds`)
	return finalStr.join(' ')
}
