"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ButtonIcon } from "@radix-ui/react-icons";
import { useUser } from "@clerk/nextjs";
import { Budgets } from "@/utils/schema";
import { db } from "@/utils/dbConfig";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "sonner";

function CreateBudget({ refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState("Pick emoji");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(true);

  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  //used to create new budget

  const { user } = useUser();
  const onCreateBudget = async () => {
    const result = await db
      .insert(Budgets)
      .values({
        name: name,
        amount: amount,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        icon: emojiIcon,
      })
      .returning({ insertedId: Budgets.id });

    if (result) {
      refreshData();
      toast.success("New Budget Created!");
    }
  };

  return (
    <div>
      <Dialog>
        <ToastContainer />
        <DialogTrigger asChild>
          <div className="bg-slate-100 p-10 mt-5 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md ml-5">
            <h2 className="text-3xl">+</h2>
            <h2>Create new Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  varient="outline"
                  className="text-lg"
                  onclick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                <div className="absolute z-20">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-white font-medium my-1">Budget Name</h2>
                  <Input
                    className="text-white"
                    placeholder="e.g as home decor"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-white font-medium my-1">Budget Amount</h2>
                  <Input
                    className="text-white"
                    type="number"
                    placeholder="500$"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                onClick={() => onCreateBudget()}
                className="mt-5 w-full"
              >
                Creat Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;
