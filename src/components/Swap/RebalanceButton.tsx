import classNames from "classnames";
import { useMemo } from "react";
import { useValidation } from "../../hooks/useValidation";

export function RebalanceButton() {
  const { isValid, message } = useValidation();

  const title = useMemo(() => {
    if (message) {
      return message;
    }

    return `Rebalance`;
  }, [message]);

  return (
    <button
      className={classNames("w-full text-lg rounded-2xl p-3 border bg-white", {
        "text-gray-400 border-gray-100": !isValid,
        "text-red-700 border-red-700 hover:bg-red-700 hover:text-white":
          isValid,
      })}
    >
      {title}
    </button>
  );
}
