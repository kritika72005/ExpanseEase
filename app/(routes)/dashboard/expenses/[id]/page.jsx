"use client";
import React, { useEffect, useState } from "react"; // Make sure useState is imported
import { db } from "@/utils/dbConfig";
import { Budgets, Expanses } from "@/utils/schema"; // Ensure you are importing Expanses as well
import { useUser } from "@clerk/nextjs";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import BudgetItem from "../../budgets/_component/BudgetItem";
import AddExpense from "../_component/AddExpense";

function ExpansesScreen({ params }) {
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState(null); // Correct capitalization
  const [expensesList, setExpansesList] = useState([]);

  useEffect(() => {
    console.log(params);
    user && getBudgetInfo();
  }, [user]);

  //   get budgetInfo
  const getBudgetInfo = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expanses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expanses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expanses, eq(Budgets.id, Expanses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Budgets.id, params.id))
      .groupBy(Budgets.id);

    setBudgetInfo(result[0]);

    getExpansesList(); // Correct capitalization
  };

  const getExpansesList = async () => {
    const result = await db
      .select()
      .from(Expanses)
      .where(eq(Expanses.budgetId, params.id))
      .orderBy(desc(Expanses.id));
    setExpansesList(result);
    console.log(result);
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">My Expenses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} /> // Correct capitalization
        ) : (
          <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        )}
      </div>
      <AddExpense
        budgetId={params.id}
        user={user}
        refreshData={() => getBudgetInfo()}
      />
    </div>
  );
}

export default ExpansesScreen;
