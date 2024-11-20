import React, { useState } from "react";
import { Layout, Typography, Input, Radio, Button, Upload, message, Form, DatePicker } from "antd";
import { UploadOutlined, UserOutlined, CameraOutlined } from "@ant-design/icons";
import "@fontsource/poppins";
import { useNavigate } from "react-router-dom";
import SideNav from '../../pages/sidenav';
import moment from 'moment';

const { Title, Text } = Typography;
const { Header, Content } = Layout;

const Profile = () => {
    const [form] = Form.useForm();
    const [gender, setGender] = useState('Laki-laki');
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleGenderChange = e => {
        setGender(e.target.value);
    };

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Anda hanya dapat mengunggah file JPG/PNG!');
            return false;
        }
        const isLt1M = file.size / 1024 / 1024 < 1;
        if (!isLt1M) {
            message.error('Gambar harus lebih kecil dari 1MB!');
            return false;
        }
        return true;
    };

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        
        if (info.file.originFileObj) {
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
                message.success('Foto profil berhasil diperbarui!');
            });
        }
    };

    const handleSubmit = (values) => {
        const formData = new FormData();
        // Format phone number to include +62
        const fullPhoneNumber = values.phone ? `+62${values.phone}` : '';
        // Format date to desired format
        const formattedDate = values.birthDate ? values.birthDate.format('DD/MM/YYYY') : '';
        
        const processedValues = {
            ...values,
            phone: fullPhoneNumber,
            birthDate: formattedDate
        };

        Object.keys(processedValues).forEach(key => {
            if (processedValues[key]) {
                formData.append(key, processedValues[key]);
            }
        });
        if (imageUrl) {
            formData.append('profilePicture', imageUrl);
        }
        
        console.log('Form values:', Object.fromEntries(formData));
        message.success('Profil berhasil diperbarui!');
    };

    // Function to validate phone number
    const validatePhoneNumber = (_, value) => {
        if (!value) {
            return Promise.reject('Silakan masukkan nomor telepon Anda!');
        }
        // Remove any non-digit characters
        const cleanNumber = value.replace(/\D/g, '');
        if (cleanNumber.length < 9 || cleanNumber.length > 12) {
            return Promise.reject('Nomor telepon harus antara 9-12 digit!');
        }
        return Promise.resolve();
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <SideNav />
            <Layout style={{ marginLeft: 256 }}>
                <Header style={{ 
                    background: '#fff', 
                    padding: '20px',
                    textAlign: 'center',
                    height: 'auto',
                    lineHeight: '1.5',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    marginBottom: '48px'
                }}>
                    <Title level={2} style={{ margin: '0' }}>Profil Saya</Title>
                </Header>
                
                <Content style={{ 
                    padding: '24px', 
                    background: '#f5f5f5', 
                    minHeight: 'calc(100vh - 64px)',
                    marginTop: '24px'
                }}>
                    <div style={{ 
                        maxWidth: '600px',
                        margin: '48px auto 0',
                        background: '#fff',
                        padding: '32px',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                        {/* Profile Picture Section */}
                        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                            <Upload
                                name="avatar"
                                listType="picture-circle"
                                showUploadList={false}
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                                className="avatar-uploader"
                            >
                                <div style={{
                                    width: '120px',
                                    height: '120px',
                                    borderRadius: '60px',
                                    margin: '0 auto',
                                    position: 'relative',
                                    cursor: 'pointer',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                    border: '3px solid #ffffff',
                                    transition: 'all 0.3s ease'
                                }}>
                                    {imageUrl ? (
                                        <>
                                            <img
                                                src={imageUrl}
                                                alt="Profile"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                            <div style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                background: 'rgba(0,0,0,0.5)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                opacity: 0,
                                                transition: 'opacity 0.3s ease',
                                                ':hover': { opacity: 1 }
                                            }}>
                                                <CameraOutlined style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </>
                                    ) : (
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '100%',
                                            background: '#f5f5f5'
                                        }}>
                                            <CameraOutlined style={{ fontSize: '32px', color: '#999' }} />
                                            <span style={{ 
                                                fontSize: '12px',
                                                color: '#666',
                                                marginTop: '4px'
                                            }}>
                                                Upload Photo
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </Upload>
                            <Text type="secondary" style={{ 
                                display: 'block',
                                marginTop: '12px',
                                fontSize: '14px'
                            }}>
                                Click to {imageUrl ? 'change' : 'upload'} profile picture
                            </Text>
                        </div>

                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleSubmit}
                            initialValues={{
                                username: 'syarifabdllh',
                                email: 'sy************@gmail.com',
                                phone: '**********29',
                                gender: 'Laki-laki'
                            }}
                        >
                            <Form.Item 
                                label={<span style={{ fontWeight: 600 }}>Username</span>} 
                                name="username"
                            >
                                <Text>syarifabdllh</Text>
                            </Form.Item>

                            <Form.Item 
                                label={<span style={{ fontWeight: 600 }}>Name</span>} 
                                name="name"
                                rules={[{ required: true, message: 'Silakan masukkan nama Anda!' }]}
                            >
                                <Input placeholder="Masukkan nama Anda" />
                            </Form.Item>

                            <Form.Item 
                                label={<span style={{ fontWeight: 600 }}>Email</span>} 
                                name="email"
                                rules={[{ required: true, message: 'Silakan masukkan email Anda!', type: 'email' }]}
                            >
                                <Input placeholder="Masukkan email Anda" />
                            </Form.Item>

                            <Form.Item 
                                label={<span style={{ fontWeight: 600 }}>Telephone Number</span>} 
                                name="phone"
                                rules={[{ validator: validatePhoneNumber }]}
                            >
                                <Input 
                                    addonBefore="+62"
                                    placeholder="8xxxxxxxxxx"
                                    style={{ width: '100%' }}
                                    maxLength={12}
                                />
                            </Form.Item>

                            <Form.Item 
                                label={<span style={{ fontWeight: 600 }}>Gender</span>} 
                                name="gender"
                            >
                                <Radio.Group onChange={handleGenderChange} value={gender}>
                                    <Radio value="Laki-laki">Man</Radio>
                                    <Radio value="Perempuan">Women</Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item 
                                label={<span style={{ fontWeight: 600 }}>Birthday Date</span>} 
                                name="birthDate"
                                rules={[{ required: true, message: 'Silakan pilih tanggal lahir Anda!' }]}
                            >
                                <DatePicker 
                                    style={{ width: '100%' }}
                                    format="DD/MM/YYYY"
                                    placeholder="Pilih tanggal lahir"
                                    disabledDate={(current) => {
                                        // Disable future dates and dates more than 100 years ago
                                        return current && (current > moment().endOf('day') || 
                                               current < moment().subtract(100, 'years'));
                                    }}
                                />
                            </Form.Item>

                            <Form.Item style={{ marginTop: '24px' }}>
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    style={{ 
                                        width: '100%',
                                        height: '40px',
                                        borderRadius: '8px',
                                        fontWeight: 600,
                                        backgroundColor: '#4CAF50',
                                        border: 'none',
                                        boxShadow: '0 2px 4px rgba(76,175,80,0.2)'
                                    }}
                                >
                                    Simpan Perubahan
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Profile;