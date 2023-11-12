import React, { createContext, useContext, useState } from "react";

const DashtoonContext = createContext();

const useDashtoonContext = () => useContext(DashtoonContext);

const DashtoonProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(Array(10).fill(null));
  const [inputValues, setInputValues] = useState(Array(10).fill(""));
  async function query(data) {
    try {
      const { inputs, index } = data;

      setLoading(true);

      const response = await fetch(
        "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
        {
          headers: {
            Accept: "image/png",
            Authorization:
              "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ inputs }),
        }
      );

      const resultBlob = await response.blob();
      const resultURL = URL.createObjectURL(resultBlob);

      setImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index] = resultURL;
        return newImages;
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  const contextValue = {
    images,
    loading,
    inputValues,
    setInputValues,
    query,
  };

  return (
    <DashtoonContext.Provider value={contextValue}>
      {children}
    </DashtoonContext.Provider>
  );
};

export { DashtoonProvider, useDashtoonContext };
