import { useState } from "react";

const useDisclosure = (initial: boolean = false) => {
	const [isOpen, setIsOpen] = useState(initial);

	const onOpen = () => {
		setIsOpen(true);
	};

	const onClose = () => {
		setIsOpen(false);
	};

	const onToggle = () => {
		setIsOpen((prev) => !prev);
	};

	return { isOpen, setIsOpen, onOpen, onClose, onToggle };
};

export default useDisclosure;
