import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  & > svg {
    font-size: 1.8rem;
    cursor: pointer;
  }

  & > img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  &:nth-child(2n + 2) {
    color: #348aed;
  }
  &:nth-child(2n + 1) {
    color: #e85b2c;
  }
  & > h3 {
    text-transform: capitalize;
    color: black;
    font-size: 1rem;
    cursor: pointer;
  }
`;

const Sidebar = ({ Icon, image, title }) => {
  return (
    <Wrapper>
      {Icon ? <Icon /> : <img src={image} alt={title} />}
      {title && <h3>{title}</h3>}
    </Wrapper>
  );
};

export default Sidebar;
