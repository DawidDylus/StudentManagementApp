import './App.css';
import { getAllStudents, deleteStudent } from "./client";
import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Table, Spin, Empty, Button, Badge, Tag, Avatar, Popconfirm, message } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  LoadingOutlined,
  PlusOutlined
} from '@ant-design/icons';

import StudentDrawerForm from './StudentDrawerForm';

function App() {

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const TheAvatar = ({ name }) => {
    let trim = name.trim();
    if (trim.length === 0) {
      return <Avatar icon={<UserOutlined />} />;
    }
    const split = trim.split(" ");
    if (split.length === 1) {
      return <Avatar>{name.charAt(0)}</Avatar>;
    }
    return <Avatar>
      {`${name.charAt(0)}${name.charAt(name.length - 1)}`}
    </Avatar>;
  };

  function confirm(e, student) {
    deleteStudent(student.id)
      .then(() => fetchStudents())
      .finally(() => message.success(`Succesfully deleted student: ${student.name}`));
  }

  function cancel(e) {
  }

  function handleEdit(student) {   
    setEditedStudent(student);    
    setShowDrawer(true);
  }

  const ActionButtons = ({ student }) => {
    return <>
      <Button type='primary' style={{ marginLeft: '5px', marginRight: '5px' }} onClick={() => handleEdit(student)}>Edit</Button>
      <Popconfirm
        title="Are you sure to delete this task?"
        onConfirm={(e) => confirm(e, student)}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <Button type='primary' danger style={{ marginLeft: '5px', marginRight: '5px' }}>Delete</Button>
      </Popconfirm>

    </>
  }

  const columns = [
    {
      title: '',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text, student) => <TheAvatar name={student.name} />
    },
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, student) => <ActionButtons student={student} />
    }

  ];

  const [editedStudent, setEditedStudent] = useState({});

  const [showDrawer, setShowDrawer] = useState(false);
  const [students, setStudents] = useState([]);

  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;
  const [collapsed, setCollapsed] = useState(false);

  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchStudents();
  },
    []
  )

  const fetchStudents = () => {
    getAllStudents()
      .then(res => res.json())
      .then(data => {
        setStudents(data);
        setFetching(false);
      });
  }

  const RenderStudents = () => {
    if (fetching) {
      return <Spin indicator={antIcon} />
    }

    if (students.length <= 0) {
      return <Empty />;
    }
    return <>     
      <StudentDrawerForm setShowDrawer={setShowDrawer} showDrawer={showDrawer} fetchStudents={fetchStudents} student={editedStudent} setStudent={setEditedStudent}/>
      <Table
        dataSource={students}
        columns={columns}
        bordered
        title={() => <>
          <Tag>Number of students</Tag>
          <Badge count={students.length} className="site-badge-count-4" />
          <br /><br />
          <Button size='small' type='primary' shape="round" icon={<PlusOutlined />} onClick={() => setShowDrawer(!showDrawer)} > Add New Student</Button>
        </>}
        pagination={{ pageSize: 50 }}
        scroll={{ y: 550 }}
        rowKey={(student) => student.id} />
    </>
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            Files
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {RenderStudents()}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Made by Dawid Dylus</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
