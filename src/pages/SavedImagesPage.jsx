import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import supabase from '../config/supabase';
import StyledButton from '../components/Button';
import { Download, TrashCan } from '@carbon/icons-react';
import { downloadAll } from '../utils';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: var(--color-grey-50);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: var(--black-two);
  font-size: 1.75rem;
  margin-bottom: 2rem;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const ImageCard = styled.div`
  position: relative;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  background-color: var(--white-two);
  border: 1px solid var(--warm-grey);
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const ImageActions = styled.div`
  padding: 1rem;
  background-color: var(--white-two);
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  border-top: 1px solid var(--warm-grey);
`;

const ActionButton = styled(StyledButton)`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: var(--border-radius-md);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-1px);
  }

  svg {
    width: 16px;
    height: 16px;
  }

  &[data-variant="primary"] {
    background-color: var(--black-two);
    color: var(--off-white);
    border: none;

    &:hover {
      background-color: var(--black);
    }

    svg {
      fill: var(--off-white);
    }
  }

  &[data-variant="secondary"] {
    background-color: var(--off-white);
    color: var(--greyish-brown);
    border: 1px solid var(--warm-grey);

    &:hover {
      background-color: var(--white-two);
    }

    svg {
      fill: black;
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  color: var(--greyish-brown);
  padding: 4rem 2rem;
  background: var(--off-white);
  border-radius: var(--border-radius-lg);
  border: 1px dashed var(--warm-grey);
`;

const SavedImagesPage = () => {
  const { user } = useAuth();
  const [savedImages, setSavedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    fetchSavedImages();
  }, [user, navigate]);

  const fetchSavedImages = async () => {
    try {
      const { data, error } = await supabase
        .from('saved_images')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedImages(data || []);
    } catch (error) {
      console.error('Error fetching saved images:', error);
      toast.error('Failed to load saved images');
    }
  };

  const handleDelete = async (e, imageId, fileName) => {
    e.stopPropagation(); // Prevent image selection when clicking delete
    try {
      setIsLoading(true);
      
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('user-images')
        .remove([fileName]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('saved_images')
        .delete()
        .eq('id', imageId);

      if (dbError) throw dbError;
      
      setSavedImages(prev => prev.filter(img => img.id !== imageId));
      toast.success('Image deleted successfully');
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Failed to delete image');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (e, imageUrl) => {
    e.stopPropagation(); // Prevent image selection when clicking download
    try {
      setIsLoading(true);
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      await downloadAll(URL.createObjectURL(blob), setIsLoading);
    } catch (error) {
      console.error('Error downloading image:', error);
      toast.error('Failed to download image');
      setIsLoading(false);
    }
  };

  const handleImageSelect = async (imageUrl) => {
    try {
      // Fetch the image and convert to base64
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      // Convert blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      
      reader.onloadend = () => {
        const base64data = reader.result;
        // Navigate to dashboard with the base64 image data
        navigate('/dashboard', { state: { selectedImage: base64data } });
      };
    } catch (error) {
      console.error('Error processing image:', error);
      toast.error('Failed to load image');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <PageContainer>
      <Header />
      <Main>
        <Container>
          <Title>Your Saved Images</Title>
          {savedImages.length === 0 ? (
            <EmptyState>
              <h2>No saved images yet</h2>
              <p>Save some images to see them here</p>
            </EmptyState>
          ) : (
            <ImageGrid>
              {savedImages.map((image) => (
                <ImageCard 
                  key={image.id}
                  onClick={() => handleImageSelect(image.image_url)}
                >
                  <Image src={image.image_url} alt="Saved image" />
                  <ImageActions>
                    <ActionButton
                      StartIcon={Download}
                      size="small"
                      data-variant="primary"
                      onClick={(e) => handleDownload(e, image.image_url)}
                      isLoading={isLoading}
                    >
                      Download
                    </ActionButton>
                    <ActionButton
                      StartIcon={TrashCan}
                      size="small"
                      data-variant="secondary"
                      variant='secondary'
                      onClick={(e) => handleDelete(e, image.id, image.file_name)}
                      disabled={isLoading}
                    >
                      Delete
                    </ActionButton>
                  </ImageActions>
                </ImageCard>
              ))}
            </ImageGrid>
          )}
        </Container>
      </Main>
    </PageContainer>
  );
};

export default SavedImagesPage; 