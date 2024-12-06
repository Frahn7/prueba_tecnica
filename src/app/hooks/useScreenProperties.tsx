import { useState, useEffect } from "react";

type ScreenProperties = {
  width: number | undefined;
  height: number | undefined;
};

const useScreenProperties = (): ScreenProperties => {
  const [screenProperties, setScreenProperties] = useState<ScreenProperties>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenProperties({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenProperties;
};

export default useScreenProperties;
