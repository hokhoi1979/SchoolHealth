import { Button, Input, Modal, Select, Space, Table, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMedicine } from "../../../redux/materialsNurse/getAllMedicine/getAllMedicineSlice";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { fetchMedicineSupply } from "../../../redux/materialsNurse/getMedicineSupplies/getMedicineSuppliesSlice";
function Inventory() {
  const { medicine = [] } = useSelector((state) => state.medicineNurse);
  const { medicineSupply = [] } = useSelector(
    (state) => state.getMedicineSupplyNurse
  );
  const [medicineStore, setMedicineStore] = useState([]);
  const [medicineSupplyStore, setMedicineSupplyStore] = useState([]);
  const [combinedStore, setCombinedStore] = useState([]);

  const dispatch = useDispatch();

  const fetchMedicineSupplyData = () => {
    dispatch(fetchMedicineSupply());
  };

  useEffect(() => {
    fetchMedicineSupplyData();
  }, []);

  const formatMedicineSupplyData = () => {
    if (medicineSupply?.data && Array.isArray(medicineSupply?.data)) {
      const format = medicineSupply?.data.map((item) => {
        return {
          id: item?.id,
          nameMedicine: item?.name,
          image: item?.image,
          stock: item?.stock,
          usage: item?.usage,
          description: item?.description,
          type: item?.category,
        };
      });
      setMedicineSupplyStore(format);
    }
  };

  useEffect(() => {
    formatMedicineSupplyData();
  }, []);

  console.log("KHOI", medicineSupplyStore);

  const fetchMedicineData = () => {
    dispatch(fetchAllMedicine());
  };

  useEffect(() => {
    fetchMedicineData();
  }, []);

  const formatMedicineData = () => {
    if (Array.isArray(medicine?.data?.medicines)) {
      const format = medicine.data.medicines.map((item, index) => ({
        id: item?.id,
        nameMedicine: item?.name,
        stock: item?.stock,
        type: item?.type,
        usage: item?.usage,
        image: item?.image,
        description: item?.description,
      }));
      setMedicineStore(format);
    }
  };

  useEffect(() => {
    formatMedicineData();
  }, [medicine]);

  useEffect(() => {
    if (medicineStore.length || medicineSupplyStore.length) {
      const combined = [...medicineStore, ...medicineSupplyStore];
      setCombinedStore(combined);
    }
  }, [medicineStore, medicineSupplyStore]);
  console.log("ALLL:L", combinedStore);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Name of medicine/supplies",
      dataIndex: "nameMedicine",
      key: "nameMedicine",
      align: "center",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (_, record) => {
        console.log("Image URL:", record.image);
        return <img src={record.image} alt="" width={60} />;
      },
    },
    {
      title: "Amount",
      dataIndex: "stock",
      key: "stock",
      align: "center",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      align: "center",
    },
    {
      title: "Usage",
      dataIndex: "usage",
      key: "usage",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
  ];

  return (
    <div>
      <Table className="mt-5" columns={columns} dataSource={combinedStore} />
    </div>
  );
}

export default Inventory;
