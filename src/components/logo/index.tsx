import styled from "styled-components";
import Image from "next/image";

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`;

const LogoWrapper = styled.div`
  width: auto;
  margin-right: 0.25rem;
  display: flex;
`;

export default function Logo() {
  return (
    <LogoLink href="https://www.spinbet.com/" target="_blank">
      <LogoWrapper>
        <Image src="/spinbet_logo.svg" alt="logo" width={174} height={43} />
      </LogoWrapper>
    </LogoLink>
  );
}
