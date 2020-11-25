import { useTheme } from '@/context/theme'
import { StyleProps } from '@/util/styleProps'

type Props = StyleProps

function Logo(props: Props) {
	const theme = useTheme()

	return <img src={theme.assets.logo} alt="Logo" {...props} />
}

export default Logo
