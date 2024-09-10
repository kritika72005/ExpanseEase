"use client";

import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import { db } from "@/utils/dbConfig";
import { eq, getTableColumns, sql, desc } from "drizzle-orm";
import { Budgets, Expanses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "./BudgetItem";
import { index } from "drizzle-orm/mysql-core";

function BudgetList() {
  const [budgetList, setBudgetList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getBugetList();
    }
  }, [user]);

  // Function to refresh the budget list
  const getBugetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expanses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expanses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expanses, eq(Budgets.id, Expanses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    setBudgetList(result);
  };

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateBudget refreshData={getBugetList} />
        {budgetList?.length > 0
          ? budgetList.map((budget, index) => (
              <BudgetItem key={index} budget={budget} />
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default BudgetList;
