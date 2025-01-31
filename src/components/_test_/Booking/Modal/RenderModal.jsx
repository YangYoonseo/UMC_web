import React from "react";
import "../../../../styles/Jisu/LocateModal.css";
import LocateModal from "./LocateModal";
import DateModal from "./DateModal";
import TypeModal from "./TypeModal";

const RenderModal = ({ isOpen, onClose, index, onDateSelect, onTypeSelect, onLocationSelect }) => { // onLocationSelect 프롭 추가
    if (!isOpen) return null;

    let ModalContent;

    switch (index) {
        case 1:
            ModalContent = <LocateModal isOpen={isOpen} onClose={onClose} onLocationSelect={onLocationSelect} />;
            break;
        case 2:
            ModalContent = <DateModal isOpen={isOpen} onClose={onClose} onDateSelect={onDateSelect} />;
            break;
        case 3:
            ModalContent = <TypeModal isOpen={isOpen} onClose={onClose} onTypeSelect={onTypeSelect} />;
            break;
        default:
            ModalContent = null;
    }

    return (
        <div className="ModalOverlay">
            <div className="ModalContent">
                {ModalContent}
            </div>
        </div>
    );
};

export default RenderModal;
