import styled from "styled-components";
import { useSelector } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";

const Wrapper = styled.article`
  display: flex;
  gap: 1em;
  max-width: 700px;
  & > div {
    border-radius: 10px;
    height: 80px;
    width: 80px;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    z-index: 1;

    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 2;
      @media screen and (min-width: 600px) {
         {
          background: rgba(0, 0, 0, 0.27);
        }
      }
    }

    & > img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    & > div {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      padding: 1em 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      z-index: 3;

      & > h2 {
        display: none;
        font-weight: 900;
        font-size: 1.2rem;
        color: white;

        @media screen and (min-width: 600px) {
          display: block;
        }
      }
      & > button {
        display: inline-block;
        background: #348bff;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        padding: 0.5em;
        cursor: pointer;
        & > svg {
          font-size: 2rem;
          color: white;
          @media screen and (max-width: 600px) {
            font-size: 1.5rem;
          }
        }
        @media screen and (max-width: 600px) {
          width: 35px;
          height: 35px;
        }
      }
    }
    @media screen and (min-width: 600px) {
      height: 180px;
      width: 120px;
      border-radius: 5px;
    }
  }
`;

const Stories = () => {
  const { profilePic } = useSelector((state) => state.posts.userDetails);
  return (
    <Wrapper>
      <div>
        <img src={profilePic || "/images/fb.png"} alt="facebook logo" />
        <div>
          <button>
            <AiOutlinePlus />
          </button>
        </div>
      </div>
      <div>
        <img src="/images/fb.png" alt="facebook logo" />
        <div>
          <h2>User</h2>
          <h2>User</h2>
        </div>
      </div>
      <div>
        <img src="/images/fb.png" alt="facebook logo" />
        <div>
          <h2>User</h2>
          <h2>User</h2>
        </div>
      </div>
    </Wrapper>
  );
};

export default Stories;
