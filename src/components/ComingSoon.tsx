import React from 'react';

const ComingSoonPage: React.FC = () => {
  return (
    <div style={{ backgroundColor: 'white', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <iframe
        width="1280"
        height="600"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" // Thêm ?autoplay=1 vào đường dẫn
        title="YouTube Video"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        autoPlay
      ></iframe>
    </div>
  );
};

export default ComingSoonPage;