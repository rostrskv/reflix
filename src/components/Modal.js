import "./Modal.css";
import "bootstrap-icons/font/bootstrap-icons.css";

/**
 * Modal Component for notifying user on renting a movie
 */
export default function Modal({ message, gifQuery, closeModal }) {
  return (
    <div className="modal" onClick={closeModal}>
      <div
        className="modal-content"
        onClick={(event) => event.stopPropagation()}
      >
        <i class="close bi bi-x" onClick={closeModal} title="Close" />
        <div>{message}</div>
      </div>
    </div>
  );
}
