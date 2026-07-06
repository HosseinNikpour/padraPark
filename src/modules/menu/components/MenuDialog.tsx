"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import {  Dialog,  DialogContent,  DialogHeader,  DialogTitle,  DialogTrigger} from "@/shared/ui/dialog";

import MenuForm from "./MenuForm";

export default function MenuDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger>

        <Button className="bg-blue-600 text-white px-4 py-2 rounded">
          افزودن آیتم
        </Button>

      </DialogTrigger>

      <DialogContent className="max-w-lg">

        <DialogHeader>

          <DialogTitle>

            افزودن آیتم جدید

          </DialogTitle>

        </DialogHeader>

        <MenuForm />

      </DialogContent>

    </Dialog>
  );
}