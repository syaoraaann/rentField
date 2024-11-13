import React, { useState } from 'react';
import { Layout, Typography, Input, Radio, Button, Upload, message, Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import "@fontsource/poppins";
import { useNavigate } from "react-router-dom";
import SideNav from './sidenav'; // Tambahkan impor SideNav

const { Title, Text } = Typography;
const { Header, Content } = Layout;

const Profile = () => {
    const [form] = Form.useForm();
    const [gender, setGender] = useState('Laki-laki');

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

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* Side Navigation */}
            <SideNav />

            {/* Main Content Area */}
            <Layout style={{ marginLeft: 256 }}> {/* Sesuaikan marginLeft dengan lebar SideNav */}
                <Header style={{ backgroundColor: '#f0f2f5', textAlign: 'center' }}>
                    <Title level={2}>Profil Saya</Title>
                    <Text>Kelola informasi profil disini</Text>
                </Header>
                <Content style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={{
                            username: '-',
                            email: '-',
                            phone: '-',
                            shopName: '-',
                            birthDate: '-',
                        }}
                    >
                        {/* Form Fields */}
                        <Form.Item label="Username" name="username">
                            <Text>syarifabdllh</Text>
                        </Form.Item>

                        <Form.Item label="Nama" name="name">
                            <Input placeholder="Masukkan nama Anda" />
                        </Form.Item>

                        <Form.Item label="Email" name="email">
                            <Text>sy************@gmail.com <Button type="link">Ubah</Button></Text>
                        </Form.Item>

                        <Form.Item label="Nomor Telepon" name="phone">
                            <Text>**********29 <Button type="link">Ubah</Button></Text>
                        </Form.Item>

                        <Form.Item label="Nama Toko" name="shopName">
                            <Input placeholder="Masukkan nama toko Anda" />
                        </Form.Item>

                        <Form.Item label="Jenis Kelamin" name="gender">
                            <Radio.Group onChange={handleGenderChange} value={gender}>
                                <Radio value="Laki-laki">Laki-laki</Radio>
                                <Radio value="Perempuan">Perempuan</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item label="Tanggal Lahir" name="birthDate">
                            <Text>**/02/20**</Text>
                        </Form.Item>

                        <Form.Item label="Foto Profil">
                            <Upload
                                name="profilePicture"
                                listType="picture"
                                maxCount={1}
                                beforeUpload={() => false}
                                onChange={handleImageUpload}
                            >
                                <Button icon={<UploadOutlined />}>Pilih Gambar</Button>
                            </Upload>
                            <Text type="secondary" style={{ display: 'block' }}>Ukuran gambar: maks. 1 MB</Text>
                            <Text type="secondary" style={{ display: 'block' }}>Format gambar: .JPEG, .PNG</Text>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                Simpan
                            </Button>
                        </Form.Item>
                    </Form>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Profile;
