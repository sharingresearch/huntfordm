import { ReactNode, useCallback, useEffect, useState } from "react";

export type ImagePreloaderProps = {
  images: string[];
  children?: ReactNode;
};

export const ImagePreloader = ({ images, children }: ImagePreloaderProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const cacheImages = useCallback(async (imgSrcs: string[]) => {
    const promises = imgSrcs.map((imgSrc) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = imgSrc;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    await Promise.all(promises);

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    cacheImages(images);
  }, [cacheImages, images]);

  if (isLoaded) {
    return <>{children}</>;
  } else {
    return null;
  }
};
