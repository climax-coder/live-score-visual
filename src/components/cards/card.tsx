import { memo } from "react";
import styled from "styled-components";
import { GameData } from "@/types/types.js";
import Progress from "./progress";
import getStatusLabel from "@/utils/getStatusLabel";
import { StatusType } from "@/types/types";

interface CardContainerProps {
  statustype: StatusType;
}

const CardContainer = styled.div<CardContainerProps>`
  background: #1f2937;
  flex: 1 0 auto;
  max-width: none;
  border-radius: 0.375rem;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease-in-out;

  small {
    color: #9ca3af;
    font-size: 0.875rem;
  }

  h3 {
    font-weight: bold;
    font-size: 1.25rem;
    margin: 0.75rem 0;
  }

  p {
    font-size: 2.25rem;
    margin: 1rem 0;
  }

  span {
    font-weight: 600;
  }

  .status {
    color: ${({ statustype }) => getStatusColor(statustype)};
    font-size: 0.875rem;
  }
`;

const ProgressDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  justify-items: center;
  align-items: center;
`;

const getStatusColor = (statusType: StatusType) => {
  switch (statusType) {
    case StatusType.Finished:
      return "#41A853";
    case StatusType.Inprogress:
      return "#E6D320";
    case StatusType.NotStarted:
      return "#9ca3af";
    case StatusType.Canceled:
      return "#AF6069";
    default:
      return "#9ca3af";
  }
};

function Card({ game }: { game: GameData }) {
  const {
    id,
    competition,
    country,
    timestamp,
    status,
    homeTeam,
    awayTeam,
    liveStatus,
  } = game;
  const statusLabel = getStatusLabel(status, timestamp);
  return (
    <CardContainer statustype={status.type}>
      <small>{country.toUpperCase()}</small>
      <h3>{competition}</h3>
      <small data-testid={`status-${id}`} className="status">
        {statusLabel}
      </small>
      <p>
        {homeTeam.score} - {awayTeam.score}
      </p>
      <ProgressDiv>
        <span>{homeTeam.name}</span>
        <Progress liveStatus={liveStatus} color="#44C75B" />
        <span>{awayTeam.name}</span>
      </ProgressDiv>
    </CardContainer>
  );
}

const MemoizedCard = memo(Card);
export default MemoizedCard;
