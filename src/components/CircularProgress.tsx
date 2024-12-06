"use client";

import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface CircularProgressProps {
	percentage: number;
	size?: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
	percentage,
	size = 100,
}) => {
	const getColor = (percentage: number): string => {
		if (percentage >= 75) return "#4caf50";
		if (percentage >= 50) return "#ffa500";
		return "#ff4c4c";
	};

	const color = getColor(percentage);

	return (
		<div style={{ width: size, height: size }}>
			<CircularProgressbar
				value={percentage}
				text={`${percentage}%`}
				styles={buildStyles({
					pathColor: color,
					trailColor: "#d6d6d6",
					textColor: "#FFFFFF",
					textSize: "35px",
				})}
			/>
		</div>
	);
};

export default CircularProgress;
