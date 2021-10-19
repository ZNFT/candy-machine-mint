import { rarityHashMap, RarityTypes } from "../utils/attribute-hash";
import cx from "classnames";
import { find, get } from "lodash";
import { BotDataType } from "../utils/getBotsFromHash";
import { cleanTraitName } from "../utils/cleanTraitName";

type Props = {
  bot: BotDataType;
};

const BotCard = ({ bot }: Props) => {
  const getRarityString = (
    rarity: string,
    category: string,
    traitName: string | undefined
  ) => {
    if (
      (category === "Equipment" && traitName === "NONE") ||
      rarity === RarityTypes.COMMON
    ) {
      return "COMMON";
    } else if (
      (traitName === "NONE" && category === "Damage") ||
      rarity === RarityTypes.EPIC
    ) {
      return "PRETTY EPIC";
    } else if (rarity === RarityTypes.RARE) {
      return "LOOKS RARE";
    } else if (rarity === RarityTypes.UNKNOWN) {
      return "HOLY S**T!! WTF IS THAT?!";
    } else if (rarity === RarityTypes.LEGENDARY) {
      return "D$%#MN THATS LEGENDARY";
    } else if (rarity === "N/A") {
      return "UNKNOWN TRAIT, REPORT TO DEVS";
    }
  };

  const renderIcon = (
    rarity: string,
    category: string,
    traitName: string | undefined
  ) => {
    const isNoneEquipment = category === "Equipment" && traitName === "NONE";
    const isNoneDamage = category === "Damage" && traitName === "NONE";
    const classname = cx("rarity-tool__icon", {
      "rarity-tool__icon--common":
        rarity === RarityTypes.COMMON || isNoneEquipment,
      "rarity-tool__icon--rare": rarity === RarityTypes.RARE,
      "rarity-tool__icon--epic": rarity === RarityTypes.EPIC || isNoneDamage,
      "rarity-tool__icon--legendary": rarity === RarityTypes.LEGENDARY,
      "rarity-tool__icon--unknown": rarity === RarityTypes.UNKNOWN,
    });
    return <div className={classname} />;
  };

  const renderTraits = () => {
    const categories = [
      "Backgrounds",
      "Body",
      "Equipment",
      "Damage",
      "Expression",
      "Accolades",
    ];
    return (
      <div>
        {categories.map((category, index) => {
          const matchingCategory = find(
            bot?.attributes,
            (trait) => trait.trait_type === category
          );
          const traitName =
            cleanTraitName(matchingCategory?.value, category) || "";
          if (category === "Accolades" && !matchingCategory) {
            return null;
          }

          let rarity = get(rarityHashMap, [`${traitName}`], "N/A");
          return (
            <div key={index} className="tracking-widest flex uppercase">
              <div className="text-white text-center rarity-tool__trait rarity-tool__trait--background rarity-tool__trait--bordered">
                {category === "Backgrounds" ? "Background" : category}
              </div>
              <div className="rarity-tool__trait bg-gray-300 text-black text-center rarity-tool__trait--borderless">
                {traitName}
              </div>
              <div className="bg-white text-black text-center rarity-tool__trait rarity-tool__trait--bordered">
                {getRarityString(rarity, category, traitName)}
                {renderIcon(rarity, category, traitName)}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bot-card flex my-4">
      <div className="mr-4">
        <img className="rarity-tool__bot-image" alt="bot-pfp" src={bot?.img} />
        <div className="rarity-tool__bot-name mt-3 uppercase text-center border-black border-4 border-solid bg-white flex items-center justify-center">
          <div>
            <div>{bot?.gen}</div>
            <div>{bot?.name}</div>
          </div>
        </div>
      </div>
      {renderTraits()}
    </div>
  );
};

export default BotCard;
