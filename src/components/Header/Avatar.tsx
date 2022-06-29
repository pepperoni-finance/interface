import { useEffect, useRef } from "react";
const jazzicon = require("@metamask/jazzicon");

export function Avatar({
  account,
  size,
}: {
  account: string | null | undefined;
  size: number;
}) {
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = avatarRef.current;
    if (element && account) {
      const addr = account.slice(2, 10);
      const seed = parseInt(addr, 16);
      const icon = jazzicon(size, seed);

      if (element.firstChild) {
        element.removeChild(element.firstChild);
      }

      element.appendChild(icon);
    }
  }, [account, size, avatarRef]);

  return (
    <div ref={avatarRef} className="flex justify-center items-center"></div>
  );
}
