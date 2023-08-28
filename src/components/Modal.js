import { useState } from "react";
import "./Modal.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect } from "react";
import { getGif } from "../services/giphy";

/**
 * Modal Component for notifying user on renting a movie
 * @param {Object} props
 * @param {string} props.message Message to show
 * @param {string|null} props.gifQuery Query to search for gif
 * @param {fucntion} props.closeModal Callback to function that removes Modal from the parent component
 */
export default function Modal({ message, gifQuery, closeModal }) {
  const [gifUrl, setGifUrl] = useState(null);

  useEffect(() => {
    async function fetchGif() {
      const newGifUrl = getGif(gifQuery);
      setGifUrl(newGifUrl);
    }
    if (gifQuery) {
      fetchGif();
    }
  }, [gifQuery]);

  return (
    <div className="modal" onClick={closeModal}>
      <div
        className="modal-content"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="close bi bi-x" onClick={closeModal} title="Close" />
        {gifUrl && <img src={gifUrl} alt={gifQuery} />}
        <div>{message}</div>
      </div>
    </div>
  );
}
