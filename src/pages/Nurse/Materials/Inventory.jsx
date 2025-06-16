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
        // classify: item?.classify?.name,
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

    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space>
          <Tooltip
            placement="bottom"
            title="View"
            overlayInnerStyle={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "12px",
            }}
          >
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
                ></path>
              </svg>
            </div>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className=" mt-5 flex gap-5">
        <Input
          style={{ borderRadius: "7px", width: "300px" }}
          placeholder="Search drugs, materials..."
        />
        <Button className="!bg-[#90A8B0] !hover:bg-gray-600" type="secondary">
          <p className="text-white font-kameron"> Search</p>
        </Button>
      </div>

      <Table className="mt-5" columns={columns} dataSource={combinedStore} />
    </div>
  );
}

export default Inventory;
