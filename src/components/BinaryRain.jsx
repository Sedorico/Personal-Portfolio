import { useEffect, useRef } from 'react';

function BinaryRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    
    canvas.width = width;
    canvas.height = height;
    
    const binaryChars = ['0', '1'];
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }
    
    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = `${fontSize}px 'Courier New', monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const char = binaryChars[Math.floor(Math.random() * binaryChars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        ctx.fillText(char, x, y);
        
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        drops[i]++;
      }
    }
    
    const interval = setInterval(draw, 50);
    
    const handleResize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        right: 0,
        top: 0,
        width: '25%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}

export default BinaryRain;