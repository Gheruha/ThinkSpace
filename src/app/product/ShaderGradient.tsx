'use client';
import React from 'react';
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient';
import * as reactSpring from '@react-spring/three';
import * as drei from '@react-three/drei';
import * as fiber from '@react-three/fiber';

export default function Gradient() {
	return (
		<div className="gradient-bg -z-10 w-[100vw] h-[100vh]">
			<ShaderGradientCanvas
				importedFiber={{ ...fiber, ...drei, ...reactSpring }}
				style={{
					position: 'absolute',
					top: 0
				}}
			>
				<ShaderGradient
					control="query"
					urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.2&cAzimuthAngle=180&cDistance=4.4&cPolarAngle=90&cameraZoom=1&color1=%2300238b&color2=%230f00db&color3=%23110d4f&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=1&positionX=-1.4&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=10&rotationZ=50&shader=defaults&type=plane&uAmplitude=0&uDensity=1.4&uFrequency=5.5&uSpeed=0.4&uStrength=10&uTime=0&wireframe=false&zoomOut=false"
				/>
			</ShaderGradientCanvas>
		</div>
	);
}
