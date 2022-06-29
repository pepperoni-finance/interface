import { useState } from "react";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { Icon } from "../../constants/icons";
import { TokenRow } from "./TokenRow";
import { useTokenList } from "../../hooks/useTokenList";
import { useTokenListModal } from "../../hooks/useModal";

export function TokenList() {
  const [keyword, setKeyword] = useState("");
  const tokens = useTokenList(keyword);
  const { close } = useTokenListModal();

  return (
    <div className="h-full flex flex-col rounded-3xl bg-white w-full">
      <div className="border-b border-gray-100">
        <div className="m-5 mb-4 flex">
          <div className="ml-8 grow text-lg text-center">Select a token</div>
          <button
            className="hover:bg-red-700 hover:text-white rounded-2xl px-1 w-8 h-8"
            onClick={close}
          >
            {Icon.Delete}
          </button>
        </div>
        <div className="mx-5 mb-6 h-8">
          <input
            className="w-full border border-gray-100 outline-red-700 rounded-full px-4 py-2 bg-gray-50"
            placeholder="Search by symbol or address"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          ></input>
        </div>
      </div>

      {tokens.length === 0 && (
        <div className="flex flex-col text-sm items-center justify-center opacity-40">
          <div>{Icon.Search}</div>
          <div>No search results</div>
        </div>
      )}

      <div className="grow overflow-auto">
        <AutoSizer>
          {({ height, width }) => (
            <FixedSizeList
              height={height}
              width={width}
              itemCount={tokens.length}
              itemSize={64}
              itemData={tokens}
            >
              {TokenRow}
            </FixedSizeList>
          )}
        </AutoSizer>
      </div>

      <div className="border-t border-gray-100">
        <div className="m-3 w-flex text-center">
          <button
            className="hover:border-red-700 hover:text-red-700 border rounded-2xl px-1 w-full p-3"
            onClick={close}
          >
            Manage Token Sets
          </button>
        </div>
      </div>
    </div>
  );
}
