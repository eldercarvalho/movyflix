import { ImgHTMLAttributes, useEffect, useRef, useState } from 'react';
import { ImageSkeleton } from '../../../styles/ImageSkeleton';

import { Container } from './styles';

type ImageProps = ImgHTMLAttributes<HTMLImageElement>;

export const Image: React.FC<ImageProps> = ({ alt, ...rest }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // console.log(imgRef.current);
  }, [isImageLoaded]);

  return (
    <Container>
      {!isImageLoaded && !hasError && <ImageSkeleton />}
      {!hasError && (
        <img
          ref={imgRef}
          style={{ display: isImageLoaded ? 'block' : 'none' }}
          alt={alt}
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setHasError(true)}
          {...rest}
        />
      )}
    </Container>
  );
};
