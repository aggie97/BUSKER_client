import styled from "@emotion/styled";
import { breakPoints } from "./globalStyles";

export const ImageBoxes = styled.div`
  width: 400px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  overflow: hidden;

  @media ${breakPoints.mobile} {
    width: 300px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export const Title = styled.span`
  font-size: 4rem;
  font-weight: 600;
  color: #9900ffcc;
  @media ${breakPoints.mobile} {
    font-size: 3rem;
  }
`;

export const Intro = styled.p`
  font-size: 2rem;
  font-weight: 500;
  word-break: keep-all;
`;

export const Content = styled.div`
  width: 100%;
  height: 45%;
  margin: 4rem 0;
  display: flex;
  justify-content: space-around;
  align-items: center;

  :nth-of-type(2) {
    text-align: right;
  }

  @media (max-width: 920px) {
    flex-direction: column;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  padding-top: 100vh;
`;

export const VideoBox = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: 0;
  overflow: hidden;
`;

export const MainIntro = styled.p`
  position: absolute;
  top: 55%;
  right: 10vw;
  color: white;
  font-size: 4.5rem;
  font-weight: 600;
  line-height: 130%;
  letter-spacing: 5px;
  margin: 0;

  @media ${breakPoints.tablet} {
    top: 60%;
    font-size: 3.5rem;
    right: 20px;
  }

  @media ${breakPoints.mobile} {
    top: 65%;
    font-size: 2.5rem;
    right: 10px;
  }
`;

export const Video = styled.video`
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  filter: brightness(50%);
  z-index: -1;
`;

export const ContentBox = styled.div`
  max-width: 1200px;

  width: 100%;
  margin: 0 auto;
  min-height: 100vh;

  @media ${breakPoints.desktop} {
    padding: 0 3rem;
  }

  @media ${breakPoints.tablet} {
    padding: 0 2rem;
  }

  @media ${breakPoints.mobile} {
    padding: 0 1rem;
  }
`;

export const LinkPage = styled.div``;
