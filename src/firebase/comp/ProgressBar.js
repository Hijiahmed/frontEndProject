import React, { useEffect } from 'react';
import useStorage from '../hooks/UseStorege';

const ProgressBar = ({ file, setFile }) => {
  const { progress, url } = useStorage(file);

  useEffect(() => {
    if (url) {
      console.log(url);
      setFile(null);
    }
  }, [url, setFile]);

  return (
    <div>
      {progress} %
    </div>
  );
} 

export default ProgressBar;