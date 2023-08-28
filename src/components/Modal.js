import "./Modal.css";
import "bootstrap-icons/font/bootstrap-icons.css";

/**
 * Modal Component for notifying user on renting a movie
 */
export default function Modal({ title, closeModal }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <i class="close bi bi-x" onClick={closeModal} title="Close" />
        <div>Rented <q>{title}</q> Sucessfully!</div>
      </div>
    </div>
  );
}
