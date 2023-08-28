import "./Modal.css";
import "bootstrap-icons/font/bootstrap-icons.css";

/**
 * Modal Component for notifying user on renting a movie
 */
export default function Modal({ message, gifQuery, closeModal }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <i class="close bi bi-x" onClick={closeModal} title="Close" />
        <div>{message}</div>
      </div>
    </div>
  );
}
