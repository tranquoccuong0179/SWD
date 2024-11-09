import {useEffect, useState} from "react";
import {Card, Table} from "antd";
import {CardHeader, CardTitle} from "react-bootstrap";
import {CardContent} from "@/components/ui/card.tsx";
import CRUDDialog from "@/components/CRUDDialog/CRUDDialog.tsx";

interface EntityManagerProps {
    title: string;
    endpoint: string;
    fields: any[];
    columns: any[];
    apiRequest: (method: string, url: string, data?: any) => Promise<any>;
}

export const EntityManager: React.FC<EntityManagerProps> = ({
                                                                title,
                                                                endpoint,
                                                                fields,
                                                                columns,
                                                                apiRequest
                                                            }) => {
    const [items, setItems] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchItems();
    }, [endpoint]);

    const fetchItems = async () => {
        const data = await apiRequest('get', endpoint);
        if (data) {
            setItems(data.items);
        }
    };

    const handleAdd = async () => {
        const response = await apiRequest('post', endpoint, formData);
        if (response) {
            await fetchItems();
            setIsDialogOpen(false);
            setFormData({});
        }
    };

    const handleUpdate = async () => {
        const response = await apiRequest('put', endpoint, formData);
        if (response) {
            await fetchItems();
            setIsDialogOpen(false);
            setSelectedItem(null);
            setFormData({});
        }
    };

    const handleDelete = async (id: number) => {
        const response = await apiRequest('delete', `${endpoint}/${id}`);
        if (response) {
            await fetchItems();
        }
    };

    const actionColumn = {
        title: 'Quản Lý',
        key: 'actions',
        render: (_, record) => (
            <div className="flex space-x-2">
                <button
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                    onClick={() => {
                        setSelectedItem(record);
                        setFormData(record);
                        setIsDialogOpen(true);
                    }}
                >
                    Sửa
                </button>
                <button
                    className="px-3 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleDelete(record.id)}
                >
                    Xóa
                </button>
            </div>
        ),
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Quản Lý {title}</CardTitle>
            </CardHeader>
            <CardContent>
                <button
                    className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
                    onClick={() => {
                        setSelectedItem(null);
                        setFormData({});
                        setIsDialogOpen(true);
                    }}
                >
                    Thêm {title}
                </button>

                <Table
                    dataSource={items}
                    columns={[...columns, actionColumn]}
                    rowKey="id"
                    pagination={false}
                />

                <CRUDDialog
                    isOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    title={selectedItem ? `Sửa ${title}` : `Thêm ${title}`}
                    fields={fields}
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={selectedItem ? handleUpdate : handleAdd}
                    isLoading={loading}
                />
            </CardContent>
        </Card>
    );
};