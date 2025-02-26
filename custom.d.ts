declare namespace JSX {
	interface IntrinsicElements {
		'ldrs-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
			color?: string | number;
			size?: string | number;
			speed?: string | number;
			stroke?: string | number;
			stroke_length?: string | number;
			bg_opacity?: string | number;
		};
	}
}
