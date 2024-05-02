import { Fragment, PropsWithChildren, useState } from "react";
import { Form, FormProps, Input, Modal, Button } from "antd";

interface Props extends PropsWithChildren {
    loading: boolean
    isEditing?: boolean;
    initialValue?: { name: string, description: string };
    onFinish: (values: { name: string, description: string }) => void;
}

export default function ProjectModal({
    onFinish,
    children,
    initialValue,
    isEditing = false,
    loading
}: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleFinish: FormProps<{ name: string; description: string }>["onFinish"] = async (
        values
    ) => {
        onFinish(values);
        setIsModalOpen(false);
    };

    return (
        <Fragment>
            <span onClick={() => setIsModalOpen(true)}>{children}</span>
            <Modal
                centered
                footer={false}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                title={isEditing ? "Edit Project" : "Create Project"}
            >
                <Form
                    colon={false}
                    layout="vertical"
                    requiredMark={false}
                    className="space-y-8"
                    onFinish={handleFinish}
                    style={{ marginTop: "2rem" }}
                    initialValues={initialValue}
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: "Please input project name!" }, { min: 3 }]}
                    >
                        <Input size="large" placeholder="Enter project name" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: "Please input project description!" }, { min: 3 }]}
                    >
                        <Input size="large" placeholder="Enter project description" />
                    </Form.Item>

                    <div className="flex items-center justify-end gap-2">
                        <Button htmlType="button" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>

                        <Button loading={loading} type="primary" htmlType="submit">
                            {isEditing ? "Edit" : "Create"}
                        </Button>
                    </div>
                </Form>
            </Modal>
        </Fragment>
    );
}