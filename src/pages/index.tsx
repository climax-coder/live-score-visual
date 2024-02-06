"use client";
import Cards from "@/components/cards";
import DesktopFilter from "@/components/desktopFilter";
import MobileFilter from "@/components/mobileFilter";
import Logo from "@/components/logo";
import Pagination from "@/components/pagination";
import styled from "styled-components";

const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const SectionGlobal = styled.section`
  background-color: #150d25;
  padding: 1rem;
`;

const SectionContent = styled.section`
  background-color: #e5e7eb;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
`;

const MainContent = styled.main`
  flex-direction: column;
  height: 88vh;
`;

export default function Home() {
  return (
    <>
      <MainContainer>
        <SectionGlobal>
          <Logo />
        </SectionGlobal>
        <MainContent>
          <SectionContent>
            <DesktopFilter />
            <MobileFilter />
            <Pagination />
          </SectionContent>
          <Cards />
        </MainContent>
      </MainContainer>
    </>
  );
}
