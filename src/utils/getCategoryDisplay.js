export default function getCategoryDisplay(category) {
	switch (category) {
		case 'Ammo': return 'Ammunition'
		case 'Banner': return 'Banners'
		case 'Resource': return 'Resources'
		case 'Melee': return 'Melee Weapons'
		case 'Ranged': return 'Ranged Weapons'
		case 'Item': return 'Usable Items'
		case 'Storage': return 'Storage Containers'
		default: return ''
	}
}
