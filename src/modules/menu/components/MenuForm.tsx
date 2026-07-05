"use client";

import { createMenu } from "../actions";

export default function MenuForm() {

  return (

    <form
      action={createMenu}
      className="pace-y-4"
    >

      <input
        name="title"
        placeholder="نام آیتم"
        className="border rounded p-2"
        required
      />

      <input
        name="code"
        placeholder="کد"
        className="border rounded p-2"
      />

      <select
        name="type"
        className="border rounded p-2"
      >

        <option value="GAME">
          بازی
        </option>

        <option value="CAFE">
          کافه
        </option>

      </select>

      <input
        name="price"
        type="number"
        placeholder="قیمت"
        className="border rounded p-2"
        required
      />

      <button type="submit" className="w-full">
        ثبت آیتم
      </button>

    </form>

  );

}