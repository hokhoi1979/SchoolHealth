import React, { useEffect } from "react";

import { Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { fetchMedicineSupplyManager } from "../../../redux/manager/GetMedicineAndSupplyManager/getMedicineAndSupplyManagerSlice";

const CheckupItemsTable = ({
  items,
  setItems,
  medicineSupply,
  formattedData,
}) => {
  const handleChangeItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        medicineID: null,
        medicineSupplyID: null,
        quantityPlanned: 1,
        notes: "",
      },
    ]);
  };

  const handleRemoveItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  return (
    <div className="mt-6 border rounded p-4 bg-gray-50">
      <div className="flex items-center gap-2 mb-2">
        <input
          type="checkbox"
          checked={Array.isArray(items) && items.length > 0}
          onChange={(e) => {
            if (!e.target.checked) setItems([]);
          }}
        />
        <span className="font-semibold">
          Checkup Items (Medicine / Supplies):
        </span>
      </div>

      <Button size="small" onClick={handleAddItem} className="mb-3">
        [+] Add Checkup Item"
      </Button>

      {Array.isArray(items) && items.length > 0 && (
        <table className="w-full text-left border border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2">ID</th>
              <th className="border px-2">Medicine / Supply Name</th>
              <th className="border px-2">Quantity</th>
              <th className="border px-2">Image</th>
              <th className="border px-2">Note</th>
              <th className="border px-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              const selectedId =
                item.medicineID ?? item.medicineSupplyID ?? null;
              const found =
                formattedData?.medicine.find((m) => m.id === selectedId) ||
                formattedData?.supply.find((s) => s.id === selectedId);

              return (
                <tr key={index}>
                  <td className="border px-2">{index + 1}</td>
                  <td className="border px-2">
                    <select
                      value={
                        item.medicineID != null
                          ? `med-${item.medicineID}`
                          : item.medicineSupplyID != null
                          ? `sup-${item.medicineSupplyID}`
                          : ""
                      }
                      onChange={(e) => {
                        const [type, id] = e.target.value.split("-");
                        const updated = [...items];
                        updated[index].medicineID = null;
                        updated[index].medicineSupplyID = null;
                        if (type === "med") {
                          updated[index].medicineID = parseInt(id);
                        } else {
                          updated[index].medicineSupplyID = parseInt(id);
                        }
                        setItems(updated);
                      }}
                    >
                      <option value="">Chọn</option>
                      <optgroup label="Medicine">
                        {formattedData.medicine.map((m) => (
                          <option key={`med-${m.id}`} value={`med-${m.id}`}>
                            {m.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Supply">
                        {formattedData.supply.map((s) => (
                          <option key={`sup-${s.id}`} value={`sup-${s.id}`}>
                            {s.name}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </td>
                  <td className="border px-2">
                    <Input
                      type="number"
                      min={1}
                      value={item.quantityPlanned}
                      onChange={(e) =>
                        handleChangeItem(
                          index,
                          "quantityPlanned",
                          parseInt(e.target.value) || 1
                        )
                      }
                    />
                  </td>
                  <td className="border px-2 text-center">
                    {found?.image ? (
                      <img src={found.image} alt="preview" width={60} />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="border px-2">
                    <Input
                      placeholder="Ghi chú"
                      value={item.notes || ""}
                      onChange={(e) =>
                        handleChangeItem(index, "notes", e.target.value)
                      }
                    />
                  </td>
                  <td className="border px-2 text-center">
                    <Button
                      danger
                      size="small"
                      onClick={() => handleRemoveItem(index)}
                    >
                      🗑️
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CheckupItemsTable;
