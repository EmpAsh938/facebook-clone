import styled from "styled-components";

const Container = styled.div`
  width: 70%;
  padding-top: 0;
  & > img {
    display: block;
    width: 200px;
    margin: 0 auto;
    @media screen and (min-width: 900px) {
      margin: 0;
    }
  }
  & > p {
    display: none;
    font-size: 2rem;
    margin-top: -1em;
    @media screen and (min-width: 900px) {
      display: block;
    }
  }
  @media screen and (min-width: 900px) {
    padding-top: 5em;
  }
`;

const LoginImage = () => {
  return (
    <Container>
      <img src="/images/logo.png" alt="facebook logo" />
      <p>Connect with friends and the world around on Facebook.</p>
    </Container>
  );
};

export default LoginImage;
