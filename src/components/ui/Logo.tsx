import { useLocationSettings } from '@/context/locationSettings'
import { StyleProps } from '@/util/styleProps'

type Props = StyleProps

function Logo(props: Props) {
	const theme = useLocationSettings()

	return <img src={theme.assets.logo} alt="Logo" {...props} />
}

export default Logo
