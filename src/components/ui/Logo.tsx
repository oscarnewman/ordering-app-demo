import { useLocationSettings } from '@/contexts/locationSettings'
import { StyleProps } from '@/utilities/styleProps'

type Props = StyleProps

function Logo(props: Props) {
	const theme = useLocationSettings()

	return <img src={theme.assets.logo} alt="Logo" {...props} />
}

export default Logo
