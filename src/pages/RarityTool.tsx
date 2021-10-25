import { Icon, IconSize, Position, Toaster } from "@blueprintjs/core";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import Header from "../components/Header";
import { BotDataType, getBotsFromHash } from "../utils/getBotsFromHash";
import ratchetRick from "../images/ratchet-rick.png";
import lightning from "../images/lightning.png";
import "./RarityTool.scss";
import BotCard from "../components/BotCard";
import { botRankings } from "../utils/bot-rankings";
import { rarityRankings } from "../utils/rarity-rankings";

export const AppToaster = Toaster.create({
  className: "ricky-toaster",
  position: Position.BOTTOM,
});

const RarityTool = () => {
  const [query, setQuery] = useState("");
  const [rank, setRank] = useState("");
  const [botsArray, setBots] = useState<BotDataType[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceLoadData = useCallback(debounce(getBotUrls, 1000), []);

  useEffect(() => {
    if (!!query) {
      debounceLoadData({ type: "QUERY", value: query });
    } else if (!!rank) {
      debounceLoadData({ type: "RANK", value: rank });
    }
  }, [query, rank, debounceLoadData]);

  function getBotUrls(search: { type: string; value: string }) {
    if (search.type === "RANK" && rarityRankings[search.value]) {
      // find the ranking bot
      setBots(getBotsFromHash(rarityRankings[search.value].toString(), true));
      return;
    }
    const totalBots: BotDataType[] = getBotsFromHash(search.value);
    if ((!search.value || totalBots.length === 0) && search.value !== "") {
      showToast(1);
      return;
    } else {
      setBots(totalBots);
      if (totalBots.length > 1) {
        setTimeout(() => showToast(2), 3000);
      }
    }
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
            "WHAT?!?! The FK?! a pair? probably nothing
            <br />. . . "
          </div>
        </div>
      );
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
          <div className="rarity-tool__header p-4 bg-white uppercase flex items-center mb-4 justify-center">
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
          <div className="is-flex">
            <div className="w-full mr-5">
              <div className="mb-1 tracking-widest">UNIT #</div>
              <div className="relative">
                <Icon
                  className="absolute rarity-tool__search-icon"
                  icon="search"
                  size={IconSize.STANDARD}
                />
                <input
                  className="rarity-tool__search bg-gray-100 w-full mb-4"
                  type="number"
                  onChange={(e) => {
                    setRank("");
                    setQuery(e.currentTarget.value);
                  }}
                />
              </div>
            </div>
            <div className="w-full">
              <div className="mb-1 tracking-widest">RANK #</div>
              <div className="relative">
                <Icon
                  className="absolute rarity-tool__search-icon"
                  icon="search"
                  size={IconSize.STANDARD}
                />
                <input
                  className="rarity-tool__search bg-gray-100 w-full mb-4"
                  type="number"
                  onChange={(e) => {
                    setQuery("");
                    setRank(e.currentTarget.value);
                  }}
                />
              </div>
            </div>
          </div>
          {botsArray.map((bot: BotDataType, index: number) => (
            <BotCard key={index} bot={bot} />
          ))}
          {botsArray.length === 0 && <BotCard bot={null} />}
        </div>
      </div>
    </>
  );
};

export default RarityTool;
