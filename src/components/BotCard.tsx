import { Icon, IconSize, Spinner, SpinnerSize } from "@blueprintjs/core";

const BotCard = () => {
  return (
    <div className="flex">
      {/* <div className="mt-5">
        {loading && (
          <div className="rarity-tool__placeholder-img">
            <div className="flex content-center h-full justify-center">
              {loading && <Spinner size={SpinnerSize.LARGE} />}
            </div>
          </div>
        )}
        {!loading && (
          <>
            {bot ? (
              <img
                className="rarity-tool__bot-image"
                alt="bot-pfp"
                src={bot.image}
              />
            ) : (
              <div className="rarity-tool__placeholder-img bg-gray-300"></div>
            )}
          </>
        )}
        {bot && (
          <div className="rarity- tool__bot-name mt-3 uppercase text-center border-black border-4 border-solid bg-white flex items-center justify-center">
            {bot?.name}
          </div>
        )}
      </div>
      {renderTraits(bot)} */}
    </div>
  );
};

export default BotCard;
