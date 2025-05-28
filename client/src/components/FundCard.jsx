import React from "react";

import { tagType, thirdweb } from "../assets";
import { daysLeft } from ".././utils";

const FundCard = ({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
  salary,
  family,
  priority, // keep for backward compatibility
}) => {
  const remainingDays = daysLeft(deadline);
  // Calculate priority if salary and family are present
  let computedPriority = priority;
  if (!computedPriority && salary && family) {
    const fam = parseFloat(family);
    const sal = parseFloat(salary);
    computedPriority = fam && sal ? (sal / fam).toFixed(2) : 'N/A';
  }
  if (!computedPriority) computedPriority = 'N/A';
  return (
    <div
      className="sm:w-[288px], w-[300px] rounded-[15px] bg-[#f1f5e9] cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={image}
        alt="fund"
        className="w-full h-[158px] object-cover rounded-[15px]"
      />

      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[18px]">
          <img
            src={tagType}
            alt="tag"
            className="w-[17px] h-[17px] object-contain"
          />
          <p
            className="ml-[12px] mt-[4px] font-epilogue font-medium
            text-[12px] text-[#6a6b77] "
          >
            Social
          </p>

          <p
            className="ml-[12px] mt-[4px] font-epilogue font-medium
            text-[12px] text-[#6a6b77] flex items-center gap-1 "
          >
            priority : {computedPriority}
            {computedPriority !== 'N/A' && computedPriority < 10000 && (
              <span className="w-[8px] h-[8px] bg-red-500 rounded-full inline-block"></span>
            )}
          </p>
        </div>
        <div className="block">
          <h3
            className="font-epilogue font-semibold text[16px]
                text-black text-left leading-[26px] truncate"
          >
            {title}
          </h3>

        </div>
        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px]
                text-[#272727da] leading-[22px]">
              {amountCollected} ETH </h4>
            <p className="mt-[3px] font-epilogue font-normal
                    text-[12px] leading-[16px] text-[#575761]
                    sm:max-w-[120px] truncate">
              Raised of {target} ETH
            </p>

          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[16px]
                text-[#272727da] leading-[22px]">
              {remainingDays}</h4>
            <p className="mt-[3px] font-epilogue font-normal
                    text-[12px] leading-[16px] text-[#575761]
                    sm:max-w-[120px] truncate">
              Days Left
            </p>

          </div>

        </div>
        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex 
            justify-center items-center bg-[#202020dc]">
            <img
              src={thirdweb}
              alt="user"
              className="w-1/2 h-1/2 object-contain"
            />
          </div>
          <p className="flex-1 font-epilogue font-normal
                text-[12px] leading-[16px] text-[#575761] truncate">
            by <span className="text-[#575761]">{owner}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
