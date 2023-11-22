import { NetworkController } from 'network/controller';
import { useState } from 'react';

export function useSymbolImages() {
  const [symbolImages, setSymbolImages] = useState<Record<string, string>>({});
  NetworkController.getSymbolImage().then(result => {
    setSymbolImages(result.result?.symbolImages || {});
  });
  return symbolImages;
}
