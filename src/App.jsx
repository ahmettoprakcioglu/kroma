import AppLayout from './components/AppLayout';
import GlobalStyles from './styles/GlobalStyles';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <GlobalStyles />
      <AppLayout />
      <Toaster
        position='top-center'
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000
          },
          error: {
            duration: 4000
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            // backgroundColor: 'var(--color-grey-0)',
            // color: 'var(--color-grey-700)'
          }
        }}
      />
    </>
  );
}

export default App;
