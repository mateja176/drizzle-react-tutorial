import React from 'react';

export const Loading: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    ref.current!.animate(
      [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
      { duration: 1000, iterations: Infinity },
    );
  }, []);

  return (
    <div
      ref={ref}
      style={{
        borderRadius: '50%',
        borderWidth: 2,
        borderStyle: 'solid',
        borderLeftColor: '#ccc',
        borderTopColor: '#ccc',
        height: 20,
        width: 20,
      }}
    />
  );
};
