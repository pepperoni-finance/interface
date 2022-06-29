import { useTokenListModal } from "../../hooks/useModal";
import { Modal } from "../Modal";
import { TokenList } from "./TokenList";

export function TokenSetModal() {
  const { isOpen, close } = useTokenListModal();

  return (
    <Modal open={isOpen} onClose={close}>
      <TokenList></TokenList>
    </Modal>
  );
}
