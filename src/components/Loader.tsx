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
	color?: string;
	size?: number;
	speed?: number;
	stroke?: number;
	strokeLength?: number;
	bgOpacity?: number;
};

const Loader: React.FC<LoaderProps> = ({
	loader,
	color = 'white',
	size = 30,
	speed = 2,
	stroke = 3,
	strokeLength = 0.1,
	bgOpacity = 0.1
}) => {
	useEffect(() => {
		import('ldrs')
			.then((ldrsModule) => {
				if (ldrsModule[loader]) {
					ldrsModule[loader].register('ldrs-icon');
				} else {
					console.warn(`Loader "${loader}" not found in ldrs module.`);
				}
			})
			.catch((error) => console.error('Failed to load ldrs module:', error));
	}, [loader]);

	return (
		<div>
			{/* <ldrs-icon
				loader={loader}
				size={size}
				stroke={stroke}
				speed={speed}
				color={color}
				stroke-length={strokeLength}
				bg-opacity={bgOpacity}
			/> */}
		</div>
	);
};

export default Loader;
