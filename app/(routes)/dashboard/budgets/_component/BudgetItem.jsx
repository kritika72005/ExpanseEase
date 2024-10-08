import Link from "next/link";
import React from "react";

function BudgetItem({ budget }) {
  const calculateProgressPrec = () => {
    // (spend/total)
    const perc = (budget.totalSpend / budget.amount) * 100;
    return perc.toFixed(2);
  };
  return (
    <Link
      href={"/dashboard/expanses/" + budget?.id}
      className="p-5 border rounded-lg hover:shadow-md cursor-pointer mt-5 h-[170px]"
    >
      <div className="flex gap-2 items-center justify-between">
        <div className="text-2xl p-2 items-center">
          <h2 className="text-3xl p-3 px-4 bg-slate-100 rounded-full">
            {budget?.icon}
          </h2>
          <div>
            <h2 className="font-bold">{budget.name}</h2>
            <h2 className="text-sm text-black">{budget.totalItem} Items </h2>
          </div>
        </div>
        <h2 className="font-bold text-primary text-lg">${budget.amount}</h2>
      </div>
      <div>
        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs text-black">
              ${budget.totalSpend ? budget.totalSpend : 0} Spend
            </h2>
            <h2 className="text-xs text-black">
              ${budget.amount - budget.totalSpend} Remaining
            </h2>
          </div>
          <div className="mt-5">
            <div className="w-full bg-slate-300 h-2 rounded-full"></div>
            <div
              className="
           bg-primary h-2 rounded-full mt-5 flex"
              style={{
                width: `${calculateProgressPrec()}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;
