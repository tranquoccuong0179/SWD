import React from 'react';
import { Modal, Form, Input, InputNumber, Button, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const CRUDDialog = ({
    isOpen,
    onClose,
    title,
    fields = [], // Default to an empty array
    onSubmit,
    initialValues,
    isLoading = false,
}) => {
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            onSubmit(values);
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    // Reset form when modal closes
    React.useEffect(() => {
        if (!isOpen) {
            form.resetFields();
        }
    }, [isOpen, form]);

    // Set initial values when they change
    React.useEffect(() => {
        if (initialValues && isOpen) {
            form.setFieldsValue(initialValues);
        }
    }, [initialValues, isOpen, form]);

    const renderField = (field) => {
        const commonProps = {
            placeholder: field.placeholder || `Please enter ${field.label}`,
            required: field.required,
        };

        switch (field.type) {
            case 'textarea':
                return <TextArea {...commonProps} rows={4} />;
            case 'number':
                return (
                    <InputNumber
                        {...commonProps}
                        min={field.min}
                        max={field.max}
                        style={{ width: '100%' }}
                    />
                );
            default:
                return <Input {...commonProps} type={field.type || 'text'} />;
        }
    };

    return (
        <Modal
            open={isOpen}
            title={title}
            onCancel={onClose}
            footer={[
                <Space key="footer">
                    <Button onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        loading={isLoading}
                        onClick={handleSubmit}
                    >
                        {isLoading ? 'Processing...' : 'Submit'}
                    </Button>
                </Space>
            ]}
        >
            <Form form={form} layout="vertical" initialValues={initialValues}>
                {Array.isArray(fields) && fields.map((field) => (
                    <Form.Item
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        rules={[
                            {
                                required: field.required,
                                message: `Please enter ${field.label}`,
                            },
                        ]}
                        extra={field.description}
                    >
                        {renderField(field)}
                    </Form.Item>
                ))}
            </Form>
        </Modal>
    );
};

export default CRUDDialog;