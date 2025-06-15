import { Button, Input, Modal, Select, Space, Table, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequestMedicine } from "../../../redux/materialsNurse/getSendRequestMedicine/getRequestMedicineSlice";
import { fetchAllMedicine } from "../../../redux/materialsNurse/getAllMedicine/getAllMedicineSlice";
import { fetchMedicineSupply } from "../../../redux/materialsNurse/getMedicineSupplies/getMedicineSuppliesSlice";
import { postRequestMedicine } from "../../../redux/materialsNurse/sendRequestMedicineNurse/sendRequestMedicineSLice";

function Import() {
  const [open, setOpen] = useState(false);
  const request = useSelector((state) => state.requestMedicine.requestMedicine);
  const [medicineRequest, setMedicine] = useState([]);
  const { medicine = [] } = useSelector((state) => state.medicineNurse);
  const { medicineSupply = [] } = useSelector(
    (state) => state.getMedicineSupplyNurse
  );

  const [note, setNote] = useState("");

  const [medicineStore, setMedicineStore] = useState([]);
  const [medicineSupplyStore, setMedicineSupplyStore] = useState([]);
  const [combinedStore, setCombinedStore] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRequestMedicine());
    dispatch(fetchAllMedicine());
    dispatch(fetchMedicineSupply());
  }, []);

  useEffect(() => {
    if (request?.data && Array.isArray(request?.data)) {
      const format = request.data.map((item) => ({
        id: item.id,
        createdAt: item.createdAt,
        createdBy: item.createdBy,
        note: item.note,
        status: item.status,
      }));
      setMedicine(format);
    }
  }, [request]);

  useEffect(() => {
    if (medicine?.data?.medicines && Array.isArray(medicine.data.medicines)) {
      const format = medicine.data.medicines.map((item) => ({
        id: `medicine-${item.id}`,
        name: item.name,
        image: item.image,
      }));
      setMedicineStore(format);
    }
  }, [medicine]);

  useEffect(() => {
    if (medicineSupply?.data && Array.isArray(medicineSupply.data)) {
      const format = medicineSupply.data.map((item) => ({
        id: `supply-${item.id}`,
        name: item.name,
        image: item.image,
      }));
      setMedicineSupplyStore(format);
    }
  }, [medicineSupply]);

  useEffect(() => {
    const combined = [...medicineStore, ...medicineSupplyStore];
    setCombinedStore(combined);
  }, [medicineStore, medicineSupplyStore]);

  const handleAddItem = (value) => {
    const found = combinedStore.find((item) => item.id === value);
    if (found && !selectedItems.some((item) => item.id === found.id)) {
      setSelectedItems([
        ...selectedItems,
        { ...found, quantity: 1, urgency: "NORMAL", note: "" },
      ]);
    }
  };

  const handleSave = () => {
    const payload = {
      note,
      items: selectedItems.map((item) => {
        const [prefix, id] = item.id.split("-");
        const numericId = parseInt(id, 10);
        return {
          ...(prefix === "medicine"
            ? { medicineID: numericId }
            : { medicineSupplyID: numericId }),
          quantity: item.quantity,
          urgency: item.urgency,
          note: item.note,
        };
      }),
    };

    console.log("Payload gửi API:", payload);
    dispatch(postRequestMedicine(payload));
    setOpen(false);
    setSelectedItems([]);
    setNote("");
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
    },
    {
      title: "createdBy",
      dataIndex: "createdBy",
      key: "createdBy",
      align: "center",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space>
          <Tooltip title="View">
            <div style={{ cursor: "pointer" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
                />
              </svg>
            </div>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const selectedItemColumns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) =>
        image ? (
          <img
            src={image}
            alt="img"
            style={{ width: 50, height: 50, objectFit: "cover" }}
          />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <Input
          type="number"
          min={1}
          value={record.quantity}
          onChange={(e) => {
            const updated = selectedItems.map((item) =>
              item.id === record.id
                ? { ...item, quantity: Number(e.target.value) }
                : item
            );
            setSelectedItems(updated);
          }}
        />
      ),
    },
    {
      title: "Urgency",
      dataIndex: "urgency",
      key: "urgency",
      render: (text, record) => (
        <Select
          value={record.urgency}
          onChange={(value) => {
            const updated = selectedItems.map((item) =>
              item.id === record.id ? { ...item, urgency: value } : item
            );
            setSelectedItems(updated);
          }}
        >
          <Select.Option value="NORMAL">Normal</Select.Option>
          <Select.Option value="URGENT">Urgent</Select.Option>
        </Select>
      ),
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      render: (text, record) => (
        <TextArea
          value={record.note}
          onChange={(e) => {
            const updated = selectedItems.map((item) =>
              item.id === record.id ? { ...item, note: e.target.value } : item
            );
            setSelectedItems(updated);
          }}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{ cursor: "pointer" }}
          onClick={() =>
            setSelectedItems(
              selectedItems.filter((item) => item.id !== record.id)
            )
          }
        >
          <path
            fill="#555656"
            d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between">
        <div></div>
        <Button
          type="secondary"
          className="!bg-black hover:!bg-gray-600"
          onClick={() => setOpen(true)}
        >
          <p className="text-white font-serif p-1">+ Import Medicine</p>
        </Button>
      </div>

      <Table className="mt-5" columns={columns} dataSource={medicineRequest} />

      <Modal open={open} onCancel={() => setOpen(false)} footer={false}>
        <h1 className="font-serif text-2xl flex justify-center">
          Import medicine/medical supplies
        </h1>
        <div className="font-serif mt-3">
          <h1 className="text-[17px] font-medium font-kameron mb-2">
            Choose medicine/medical
          </h1>
          <Select
            placeholder="--Choose medicine/medical--"
            className="w-full"
            onChange={handleAddItem}
          >
            {combinedStore.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </div>{" "}
        <div className="font-serif mt-4">
          <h1 className="text-[17px] font-medium font-kameron mb-2">
            Request Note
          </h1>
          <TextArea
            value={note}
            placeholder="Enter general note for this request"
            onChange={(e) => setNote(e.target.value)}
            rows={3}
          />
        </div>
        <Table
          dataSource={selectedItems}
          columns={selectedItemColumns}
          rowKey="id"
          className="mt-4"
          pagination={false}
        />
        <div className="mt-5 flex justify-between font-serif">
          <div></div>
          <div className="flex gap-3">
            <Button
              type="secondary"
              className="!bg-[#E26666] hover:!bg-[#E53838] w-[100px]"
              onClick={() => setOpen(false)}
            >
              <p className="text-white text-xl font-serif p-1">Cancel</p>
            </Button>
            <Button
              type="secondary"
              className="!bg-[#6CC76F] hover:!bg-[#29CD2F] w-[100px]"
              onClick={handleSave}
            >
              <p className="text-white text-xl font-serif p-1">Save</p>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Import;
