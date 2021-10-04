import { Icon, IconSize, Position, Toaster } from "@blueprintjs/core";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import Header from "../components/Header";
import { botsJson } from "../utils/bots";
import { getBotsFromHash } from "../utils/getBotsFromHash";
import ratchetRick from "../images/ratchet-rick.png";
import lightning from "../images/lightning.png";
import "./RarityTool.scss";
import BotCard from "../components/BotCard";

export type BotType = {
  link: string;
  name: string;
};

export type BotsKeyType = {
  [key: string]: BotType;
};

export const AppToaster = Toaster.create({
  className: "ricky-toaster",
  position: Position.BOTTOM,
});

const RarityTool = () => {
  const bots: BotsKeyType = botsJson;
  const [query, setQuery] = useState("");
  const [botsArray, setBots] = useState<BotType[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceLoadData = useCallback(debounce(getBotUrls, 1000), []);

  useEffect(() => {
    debounceLoadData(query);
  }, [query, debounceLoadData]);

  function getBotUrls(id: string) {
    if (!id || !bots[id]) {
      if (id !== "") {
        showToast(1);
      }
      return;
    }
    setBots(getBotsFromHash(id));
  }

  const showToast = (num: number) => {
    let message;
    if (num === 1) {
      message = (
        <div className="text-3xl uppercase flex items-center rarity-tool__error-toast">
          <div>
            <img
              className="rarity-tool__rick--angry"
              src={ratchetRick}
              alt="ratchet-rick"
            />
          </div>
          <div className="rarity-tool__error-toast--slide-in ml-5 text-red-800">
            "I can't find that bot!! <br />
            Quit wasting my time!!"
          </div>
        </div>
      );
    } else if (num === 2) {
      message = <div>sdf</div>;
    }
    AppToaster.show({
      message,
    });
  };

  return (
    <>
      <Header />
      <div className="rarity-tool__container flex justify-center">
        <div className="rarity-tool px-28 py-14">
          <div className="uppercase flex items-center mb-4">
            <div className="mr-3">
              <img
                className="rarity-tool__rick"
                src={ratchetRick}
                alt="ratchet-rick"
              />
            </div>
            <div className="text-xl rarity-tool__rick--text mx-4">
              RATCHET RICKY'S RARITY APPRAISAL
            </div>
            <div>
              <img
                className="rarity-tool__lightning"
                src={lightning}
                alt="ricky-lightning"
              />
            </div>
          </div>
          <div className="ml-6">
            <div className="mb-1 tracking-widest">UNIT #</div>
            <div className="relative">
              <Icon
                className="absolute rarity-tool__search-icon"
                icon="search"
                size={IconSize.STANDARD}
              />
              <input
                className="rarity-tool__search w-full mb-4 pl-5"
                type="text"
                onChange={(e) => setQuery(e.currentTarget.value)}
              />
            </div>
          </div>
          {botsArray.map((bot: BotType, index: number) => (
            <BotCard key={index} bot={bot} />
          ))}
        </div>
      </div>
    </>
  );
};

export default RarityTool;
