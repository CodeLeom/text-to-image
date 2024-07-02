import ImageGenerator from './components/ImageGenerator';

const App = () => {
  return (
    <div className='App'>
      <h1>Image Generator</h1>
      <p>This AI image generator, is built using <a href="https://autogon.ai/playground/text-to-image" target='_blank'>Autogon AI</a> text to image api</p>
      <ImageGenerator />
    </div>
  );
};

export default App;
