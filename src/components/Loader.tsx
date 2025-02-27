'use-client';
import React, { useEffect } from 'react';

export enum LoaderEnum {
	BOUNCY = 'bouncy',
	BOUNCY_ARC = 'bouncyArc',
	CARDIO = 'cardio',
	CHAOTIC_ORBIT = 'chaoticOrbit',
	DOT_PULSE = 'dotPulse',
	DOT_SPINNER = 'dotSpinner',
	DOT_STREAM = 'dotStream',
	DOT_WAVE = 'dotWave',
	GRID = 'grid',
	HATCH = 'hatch',
	HELIX = 'helix',
	HOURGLASS = 'hourglass',
	INFINITY = 'infinity',
	JELLY = 'jelly',
	JELLY_TRIANGLE = 'jellyTriangle',
	LEAPFROG = 'leapfrog',
	LINE_SPINNER = 'lineSpinner',
	LINE_WOBBLE = 'lineWobble',
	METRONOME = 'metronome',
	MIRAGE = 'mirage',
	MIYAGI = 'miyagi',
	MOMENTUM = 'momentum',
	NEWTONS_CRADLE = 'newtonsCradle',
	ORBIT = 'orbit',
	PING = 'ping',
	PINWHEEL = 'pinwheel',
	PULSAR = 'pulsar',
	QUANTUM = 'quantum',
	REULEAUX = 'reuleaux',
	RING = 'ring',
	RING2 = 'ring2',
	RIPPLES = 'ripples',
	SPIRAL = 'spiral',
	SQUARE = 'square',
	SQUIRCLE = 'squircle',
	SUPERBALLS = 'superballs',
	TAIL_CHASE = 'tailChase',
	TAILSPIN = 'tailspin',
	TREADMILL = 'treadmill',
	TREFOIL = 'trefoil',
	TRIO = 'trio',
	WAVEFORM = 'waveform',
	WOBBLE = 'wobble',
	ZOOMIES = 'zoomies'
}

export type LoaderProps = {
	loader: LoaderEnum;
	color?: string | number;
	size?: string | number;
	speed?: string | number;
	stroke?: string | number;
	stroke_length?: string | number;
	bg_opacity?: string | number;
};

const Loader: React.FC<LoaderProps> = ({
	loader,
	color = 'white',
	size = 30,
	speed = 2,
	stroke = 3,
	stroke_length = 0.1,
	bg_opacity = 0.1
}) => {
	useEffect(() => {
		const load = async () => {
			const ldrsModule = await import('ldrs');
			ldrsModule[loader].register('ldrs-icon');
		};
		load();
	}, [loader]);

	return (
		<div>
			{/* <ldrs-icon
				loader={loader}
				size={size}
				stroke={stroke}
				speed={speed}
				color={color}
				stroke-length={stroke_length}
				bg-opacity={bg_opacity}
			/> */}
		</div>
	);
};

export default Loader;
