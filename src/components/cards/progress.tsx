"use client";
import styled from "styled-components";
import getProgressLabel from "@/utils/getProgressLabel";
import getOffset from "@/utils/getOffset";
import { STROKE_DASH_ARRAY } from "@/utils/constants";

const ProgressContainer = styled.div`
  width: 95px;
  height: 95px;
  position: relative;
  font-size: 36px;
  color: #fff;
  text-align: center;
`;

const ProgressLabel = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 30px;
`;

const ProgressSVG = styled.svg`
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
  overflow: initial;
`;

const CircleBackground = styled.circle`
  stroke: #fff;
  stroke-width: 3px;
  fill: none;
  cx: 50;
  cy: 50;
  r: 40;
`;

const CircleProgress = styled.circle<{ offset: string; color: string }>`
  stroke: ${({ color }) => color};
  stroke-width: 3px;
  stroke-linecap: round;
  cx: 50;
  cy: 50;
  r: 40;
  fill: none;
  stroke-dasharray: ${STROKE_DASH_ARRAY};
  stroke-dashoffset: ${({ offset }) => offset};
  transform: rotate(-90deg) translate(-100, 0);
`;

export default function Progress({
  liveStatus,
  color,
}: {
  liveStatus: string;
  color: string;
}) {
  const progressLabel = getProgressLabel(liveStatus);
  const offset = getOffset(liveStatus);

  return (
    <ProgressContainer data-testid="progressIndicator">
      <ProgressSVG viewBox="0 0 100 100">
        <CircleBackground />
        <CircleProgress color={color} offset={offset} />
      </ProgressSVG>
      <ProgressLabel>{progressLabel}</ProgressLabel>
    </ProgressContainer>
  );
}
