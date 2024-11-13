import React, { useState } from 'react';
import { Layout, Typography, Input, Radio, Button, Upload, message, Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import "@fontsource/poppins";
import { useNavigate } from "react-router-dom";
import SideNav from '../../pages/sidenav';// Make sure this path matches your project structure

const { Title, Text } = Typography;
const { Header, Content } = Layout;

const Profile = () => {
    const [form] = Form.useForm();
    const [gender, setGender] = useState('Laki-laki');
    const navigate = useNavigate();

    const handleGenderChange = e => {
        setGender(e.target.value);
    };

    const handleImageUpload = info => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} berhasil diunggah.`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} gagal diunggah.`);
        }
    };

    const handleSubmit = (values) => {
        console.log('Form values:', values);
        message.success('Profile updated successfully!');
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
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    <Title level={2} style={{ margin: '0 0 8px 0' }}>My Profile</Title>
                    <Text style={{ fontSize: '16px' }}>
                        Manage your profile information to control, protect, and secure your account
                    </Text>
                </Header>
                
                <Content style={{ 
                    padding: '24px',
                    background: '#f5f5f5',
                    minHeight: 'calc(100vh - 64px)'
                }}>
                    <div style={{ 
                        maxWidth: '600px',
                        margin: '0 auto',
                        background: '#fff',
                        padding: '24px',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleSubmit}
                            initialValues={{
                                username: 'syarifabdllh',
                                email: 'sy************@gmail.com',
                                phone: '**********29',
                                birthDate: '**/02/20**',
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
                                label={<span style={{ fontWeight: 600 }}>Nama</span>} 
                                name="name"
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <Input placeholder="Masukkan nama Anda" />
                            </Form.Item>

                            <Form.Item 
                                label={<span style={{ fontWeight: 600 }}>Email</span>} 
                                name="email"
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Text>sy************@gmail.com</Text>
                                    <Button type="link" style={{ marginLeft: '8px' }}>Ubah</Button>
                                </div>
                            </Form.Item>

                            <Form.Item 
                                label={<span style={{ fontWeight: 600 }}>Nomor Telepon</span>} 
                                name="phone"
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Text>**********29</Text>
                                    <Button type="link" style={{ marginLeft: '8px' }}>Ubah</Button>
                                </div>
                            </Form.Item>

                            <Form.Item 
                                label={<span style={{ fontWeight: 600 }}>Nama Toko</span>} 
                                name="shopName"
                            >
                                <Input placeholder="Masukkan nama toko Anda" />
                            </Form.Item>

                            <Form.Item 
                                label={<span style={{ fontWeight: 600 }}>Jenis Kelamin</span>} 
                                name="gender"
                            >
                                <Radio.Group onChange={handleGenderChange} value={gender}>
                                    <Radio value="Laki-laki">Laki-laki</Radio>
                                    <Radio value="Perempuan">Perempuan</Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item 
                                label={<span style={{ fontWeight: 600 }}>Tanggal Lahir</span>} 
                                name="birthDate"
                            >
                                <Text>**/02/20**</Text>
                            </Form.Item>

                            <Form.Item 
                                label={<span style={{ fontWeight: 600 }}>Foto Profil</span>}
                            >
                                <Upload
                                    name="profilePicture"
                                    listType="picture"
                                    maxCount={1}
                                    beforeUpload={() => false}
                                    onChange={handleImageUpload}
                                >
                                    <Button icon={<UploadOutlined />} style={{ borderRadius: '4px' }}>
                                        Pilih Gambar
                                    </Button>
                                </Upload>
                                <Text type="secondary" style={{ display: 'block', marginTop: '8px' }}>
                                    Ukuran gambar: maks. 1 MB
                                </Text>
                                <Text type="secondary" style={{ display: 'block' }}>
                                    Format gambar: .JPEG, .PNG
                                </Text>
                            </Form.Item>

                            <Form.Item>
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    style={{ 
                                        width: '100%',
                                        height: '40px',
                                        borderRadius: '4px',
                                        fontWeight: 600,
                                        backgroundColor: '#4CAF50'
                                    }}
                                >
                                    Simpan
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