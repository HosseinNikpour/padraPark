import { getMenuItems } from "../queries";
import DeleteButton from "./DeleteButton";

export default async function MenuTable() {
  const items = await getMenuItems();

  return (
    <table className="w-full border rounded-lg overflow-hidden">

      <thead className="bg-slate-200">

        <tr>

          <th className="p-3">نام</th>

          <th>کد</th>

          <th>نوع</th>

          <th>قیمت</th>

          <th className="w-100">عملیات</th>

        </tr>

      </thead>

      <tbody>

        {items.map((item) => {

          const price = item.prices[0]?.price ?? 0;

          return (

            <tr key={item.id} className="border-t"  >
              <td className="p-3">{item.title}</td>
              <td>{item.code}</td>
              <td>{item.type === "GAME" ? "بازی" : "کافه"}  </td>
              <td> {price.toLocaleString()}  </td>
              <td> <DeleteButton id={item.id} />  <a href={`/menu/${item.id}`} className="text-blue-600 mr-10" >  ویرایش </a> </td>
            </tr>

          );

        })}

      </tbody>

    </table>
  );
}