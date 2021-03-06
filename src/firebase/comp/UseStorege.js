import { useState, useEffect } from 'react';
import {hiji,h} from './Firebase';

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references
    const storageRef = hiji.ref(file.name);
    const collectionRef = h.collection('images');
    
    storageRef.put(file).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage);
    }, (err) => {
      setError(err);
    }, async () => {
      const url = await storageRef.getDownloadURL();
      await collectionRef.add({ url });
      setUrl(url);
    });
  }, [file]);

  return { progress, url, error };
}

export default useStorage;