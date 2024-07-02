import { useState } from "react";
import Loading from "./Loading";

const ImageGenerator = () => {
    const [imageSrc, setImageSrc] = useState('');
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');

  const generateImage = async () => {
    const formData = new FormData();
    formData.append('prompt', prompt);
    formData.append('output_size', '1792x1024');
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const API_KEY = import.meta.env.VITE_API_KEY;

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/services/image-generation/`, {
        method: 'POST',
        headers: {
          'X-AUG-KEY': API_KEY,
        },
        body: formData,
      });

      const data = await response.json();
      setImageSrc(`data:image/png;base64,${data.image}`);
      setPrompt('')
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <input
        type="text"
        placeholder="Enter prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={generateImage} disabled={loading}>
        {loading ? <Loading /> : 'Generate Image'}
      </button>
      {imageSrc && (
        <div>
          <h3>Generated Image</h3>
          <img src={imageSrc} alt="Generated Image" width={512} height={512} style={{width: '254', height: '254'}} />
        </div>
      )}
    </>
  );
};

export default ImageGenerator;
