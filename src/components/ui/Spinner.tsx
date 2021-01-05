import { cx } from '@/utilities/classes'
import { StyleProps } from '@/utilities/styleProps'
import React from 'react'

type Props = StyleProps & {
	/** The size of the spinner */
	size?: number
}

function Spinner({ className, size = 30 }: Props) {
	return (
		<div className={cx('lds-ring text-gray-200')}>
			<div className={className} />
			<div className={className} />
			<div className={className} />
			<div className={className} />

			<style jsx>{`
				.lds-ring {
					display: inline-block;
					position: relative;
					width: ${size}px;
					height: ${size}px;
				}
				.lds-ring div {
					box-sizing: border-box;
					display: block;
					position: absolute;
					width: ${size}px;
					height: ${size}px;
					/* margin: 6px; */
					border: 2px solid white;
					border-radius: 50%;
					animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
					border-color: currentcolor transparent transparent transparent;
				}
				.lds-ring div:nth-child(1) {
					animation-delay: -0.45s;
				}
				.lds-ring div:nth-child(2) {
					animation-delay: -0.3s;
				}
				.lds-ring div:nth-child(3) {
					animation-delay: -0.15s;
				}
				@keyframes lds-ring {
					0% {
						transform: rotate(0deg);
					}
					100% {
						transform: rotate(360deg);
					}
				}
			`}</style>
		</div>
	)
}

export default Spinner
