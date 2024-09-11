import { db } from "@/utils/dbConfig";
import React, { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Budgets, Expanses } from "@/utils/schema";
import { Button } from "@/components/ui/button";

function AddExpense({ budgetId, user, refreshData }) {
  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  const addNewExpanse = async () => {
    const result = await db
      .insert(Expanses)
      .values({
        name: name,
        amount: amount,
        budgetId: budgetId,
        createdAt: user?.primaryEmailAddress?.emailAddress,
      })
      .returning({ insertId: Budgets.id });

    console.log(result);
    if (result) {
      refreshData();
      toast("New Expenses added");
    }
  };
  return (
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg">Add Expanses</h2>
      <div className="mt-2">
        <h2 className="text-white font-medium my-1">Expense Name</h2>
        <Input
          className="text-white"
          placeholder="e.g as home decor"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-white font-medium my-1">Expense Amount</h2>
        <Input
          className="text-white"
          placeholder="e.g 1000"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button disabled={!(name && amount)} className="mt-3 w-full">
        Add new Expenses
      </Button>
    </div>
  );
}

export default AddExpense;
