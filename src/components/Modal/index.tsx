import { Dialog } from "@headlessui/react";
import { ReactNode } from "react";

export function Modal({
  children,
  open,
  onClose,
}: {
  children: ReactNode;
  open?: boolean | undefined;
  onClose(value: boolean): void;
}) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50 font-serif">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="flex min-h-full w-96 items-center justify-center">
          <Dialog.Panel className="mx-auto w-full">
            <div className="grid grid-rows-8 h-screen">
              <div></div>
              <div className="row-span-6 w-full">{children}</div>
              <div></div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
