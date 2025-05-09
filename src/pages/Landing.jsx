import styled from 'styled-components';
import { Link } from 'react-router-dom';
import StyledButton from '../components/Button';
import { Image } from '@carbon/icons-react';
import { useAuth } from '../context/AuthContext';

const StyledLink = styled(Link)`
  text-decoration: none;
  display: inline-block;
`;

const Landing = () => {
  const { user } = useAuth();

  return (
    <Container>
      <Hero>
        <HeroContent>
          {user ? (
            <>
              <WelcomeSection>
                <WelcomeTitle>Welcome back!</WelcomeTitle>
                <WelcomeText>
                  Ready to continue making your designs more accessible?
                </WelcomeText>
                <StyledLink to="/dashboard">
                  <StyledButton
                    variant="primary"
                    size="large"
                    StartIcon={Image}
                  >
                    Go to Dashboard
                  </StyledButton>
                </StyledLink>
              </WelcomeSection>
            </>
          ) : (
            <>
              <Title>Make Your Design Accessible to Everyone</Title>
              <Description>
                Kroma helps you understand how your designs look to people with different types of color vision deficiencies. 
                Create more inclusive and accessible designs for everyone.
              </Description>
              <ButtonGroup>
                <StyledLink to="/app">
                  <StyledButton
                    variant="primary"
                    size="large"
                    StartIcon={Image}
                  >
                    Try Kroma Now
                  </StyledButton>
                </StyledLink>
                <StyledLink to="/signin">
                  <StyledButton
                    variant="secondary"
                    size="large"
                  >
                    Sign In
                  </StyledButton>
                </StyledLink>
              </ButtonGroup>
            </>
          )}
        </HeroContent>
        <Features>
          <FeatureCard>
            <FeatureTitle>8 Types of Color Blindness</FeatureTitle>
            <FeatureDescription>
              Simulate different types of color vision deficiencies including Protanopia, Deuteranopia, and more.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureTitle>Instant Preview</FeatureTitle>
            <FeatureDescription>
              See how your images look in different color vision modes instantly.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureTitle>Free to Use</FeatureTitle>
            <FeatureDescription>
              Start using Kroma right away. No registration required for basic features.
            </FeatureDescription>
          </FeatureCard>
        </Features>
      </Hero>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background-color: var(--off-white-two);
`;

const Hero = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: var(--black-two);
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  color: var(--greyish-brown);
  font-size: 1.25rem;
  margin-bottom: 2rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
`;

const FeatureCard = styled.div`
  background-color: var(--off-white);
  padding: 2rem;
  border-radius: var(--border-radius-lg);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FeatureTitle = styled.h3`
  color: var(--black-two);
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: var(--greyish-brown);
  font-size: 1rem;
  line-height: 1.5;
`;

const WelcomeSection = styled.div`
  text-align: center;
  animation: fadeIn 0.5s ease-in;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const WelcomeTitle = styled.h1`
  color: var(--black-two);
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const WelcomeText = styled.p`
  color: var(--greyish-brown);
  font-size: 1.5rem;
  margin-bottom: 2rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export default Landing; 