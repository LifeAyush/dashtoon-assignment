import React, { useState, useEffect } from "react";
import { useDashtoonContext } from "../../Hooks/useDashtoonContext";
import Navbar from "../../Components/Navbar/Navbar";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  FacebookShareButton,
  TwitterShareButton,
  RedditShareButton,
  TelegramShareButton,
} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import RedditIcon from "@mui/icons-material/Reddit";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useLocation } from "react-router-dom";

import "./home.css";

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const Home = () => {
  const { images, loading, query, setInputValues } = useDashtoonContext();
  const [inputValues, setInputValuesLocal] = useState(Array(10).fill(""));
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openFailureSnackbar, setOpenFailureSnackbar] = useState(false);
  const location = useLocation();
  const currentUrl = window.location.href + "?inputs=" + inputValues.join("&");

  const handleInputChange = (index, e) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = e.target.value;
    setInputValuesLocal(newInputValues);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (inputValues.some((value) => !value.trim())) {
      setOpenFailureSnackbar(true);
      return;
    }

    for (let i = 0; i < inputValues.length; i++) {
      await query({ inputs: inputValues[i], index: i });
    }

    setInputValues(inputValues);
  };

  const handleCopyUrl = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const generateImagesFromURL = async () => {
    for (let i = 0; i < inputValues.length; i++) {
      await query({ inputs: inputValues[i], index: i });
    }
  };

  useEffect(() => {
    const urlParam = location.search;
    if (urlParam != "") {
      const urlInputValues = urlParam.split("=")[1].split("&");
      if (urlInputValues.length === 10) {
        setInputValuesLocal(urlInputValues);
        generateImagesFromURL();
      }
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenSnackbar(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, [openSnackbar]);

  return (
    <div className="home">
      <Navbar />
      <div className="home-flex">
        <div className="home-title">Create Comics With Just A Prompt</div>
      </div>
      <form onSubmit={handleFormSubmit} className="home-input-flex">
        {inputValues.map((value, index) => (
          <div key={index}>
            <input
              type="text"
              value={value}
              onChange={(e) => handleInputChange(index, e)}
              placeholder={`Enter outline for chapter ${index + 1}...`}
              className="home-input"
            />
          </div>
        ))}
        <button type="submit" className="primary-cta">
          {!loading && "Generate Images"}
          {loading && <CircularProgress />}
        </button>
      </form>
      <div className="output-flex">
        {!loading && images[9] !== null && (
          <div className="generated-image-flex">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Result ${index + 1}`}
                className="generated-image"
              />
            ))}
          </div>
        )}

        {!loading && images[9] !== null && (
          <div className="share-options-flex">
            <div className="home-title">Share you creations</div>
            <CopyToClipboard text={currentUrl} onCopy={handleCopyUrl}>
              <button type="button" className="primary-cta">
                Copy URL
              </button>
            </CopyToClipboard>
            <div className="socials-flex">
              <FacebookShareButton url={currentUrl}>
                <button type="button" className="socials-btn">
                  <FacebookIcon />
                </button>
              </FacebookShareButton>

              <TwitterShareButton url={currentUrl}>
                <button type="button" className="socials-btn">
                  <TwitterIcon />
                </button>
              </TwitterShareButton>

              <RedditShareButton url={currentUrl}>
                <button type="button" className="socials-btn">
                  <RedditIcon />
                </button>
              </RedditShareButton>

              <TelegramShareButton url={currentUrl}>
                <button type="button" className="socials-btn">
                  <TelegramIcon />
                </button>
              </TelegramShareButton>
            </div>
          </div>
        )}
      </div>

      <Snackbar
        open={openFailureSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          Please fill all the inputs!
        </Alert>
      </Snackbar>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          URL copied!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Home;
