import { Button, Form, Select, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import React, { useRef } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import TableComponent from '../TableComponent/TableComponent'
import { useState } from 'react'
import InputComponent from '../InputComponent/InputComponent'
import { getBase64, renderOptions } from '../../utils'
import * as ConfigService from '../../services/ConfigService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import { useEffect } from 'react'
import * as message from '../../components/Message/Message'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import ModalComponent from '../ModalComponent/ModalComponent'

const AdminConfig = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const user = useSelector((state) => state?.user)
  const searchInput = useRef(null);
  const inittial = () => ({
    author: '',
    email: '',
    phone: '',
    zalo: '',
    facebook: '',
    type: '',
    address: '',
    newType: '',
    metadesc: '',
    metakey: '',

  })
  const [stateConfig, setStateConfig] = useState(inittial())
  const [stateConfigDetails, setStateConfigDetails] = useState(inittial())

  const [form] = Form.useForm();

  const mutation = useMutationHooks(
    (data) => {
      const { author,
        email,
        phone,
        zalo,
        facebook,
        address,
        metadesc,metakey } = data
      const res = ConfigService.createConfig({
        author,
        email,
        phone,
        zalo,
        facebook,
        address,
        metadesc,
        metakey
      })
      return res
    }
  )
  const mutationUpdate = useMutationHooks(
    (data) => {
      const { id,
        token,
        ...rests } = data
      const res = ConfigService.updateConfig(
        id,
        token,
        { ...rests })
      return res
    },
  )

  const mutationDeleted = useMutationHooks(
    (data) => {
      const { id,
        token,
      } = data
      const res = ConfigService.deleteConfig(
        id,
        token)
      return res
    },
  )

  const mutationDeletedMany = useMutationHooks(
    (data) => {
      const { token, ...ids
      } = data
      const res = ConfigService.deleteManyConfig(
        ids,
        token)
      return res
    },
  )

  const getAllConfigs = async () => {
    const res = await ConfigService.getAllConfig()
    return res
  }

  const fetchGetDetailsConfig = async (rowSelected) => {
    const res = await ConfigService.getDetailsConfig(rowSelected)
    if (res?.data) {
      setStateConfigDetails({
        author: res?.data?.author,
        email: res?.data?.email,
        phone: res?.data?.phone,
        zalo: res?.data?.zalo,
        facebook: res?.data?.facebook,
        type: res?.data?.type,
        address: res?.data?.address,
        metadesc: res?.data?.metadesc,
        metakey: res?.data?.metakey

      })
    }
    setIsLoadingUpdate(false)
  }

  useEffect(() => {
    if(!isModalOpen) {
      form.setFieldsValue(stateConfigDetails)
    }else {
      form.setFieldsValue(inittial())
    }
  }, [form, stateConfigDetails, isModalOpen])

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true)
      fetchGetDetailsConfig(rowSelected)
    }
  }, [rowSelected, isOpenDrawer])

  const handleDetailsConfig = () => {
    setIsOpenDrawer(true)
  }

  const handleDelteManyConfigs = (ids) => {
    mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
      onSettled: () => {
        queryConfig.refetch()
      }
    })
  }

  const fetchAllTypeConfig = async () => {
    const res = await ConfigService.getAllTypeConfig()
    return res
  }

  const { data, isLoading, isSuccess, isError } = mutation
  const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
  const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany


  const queryConfig = useQuery({ queryKey: ['configs'], queryFn: getAllConfigs })
  const typeConfig = useQuery({ queryKey: ['type-config'], queryFn: fetchAllTypeConfig })
  const { isLoading: isLoadingConfigs, data: configs } = queryConfig
  const renderAction = () => {
    return (
      <div>
        <Button style={{ color:'orange'}} onClick={handleDetailsConfig}>Edit</Button>
        <Button style={{ color:'red'}} onClick={() => setIsModalOpenDelete(true)}>Delete</Button>
      </div>
    )
  }


  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    // setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Tìm kiếm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Xóa
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     // <Highlighter
    //     //   highlightStyle={{
    //     //     backgroundColor: '#ffc069',
    //     //     padding: 0,
    //     //   }}
    //     //   searchWords={[searchText]}
    //     //   autoEscape
    //     //   textToHighlight={text ? text.toString() : ''}
    //     // />
    //   ) : (
    //     text
    //   ),
  });


  const columns = [
    {
      title: 'Tên',
      dataIndex: 'author',
      sorter: (a, b) => a.author.length - b.author.length,
      ...getColumnSearchProps('author')
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Zalo',
      dataIndex: 'zalo',
    },
    {
        title: 'Facebook',
        dataIndex: 'facebook',
      },

      {
        title: 'Address',
        dataIndex: 'address',
      },
  
    {
      title: 'Chọn',
      dataIndex: 'action',
      render: renderAction
    },
  ];
  const dataTable = configs?.data?.length && configs?.data?.map((config) => {
    return { ...config, key: config._id }
  })

  useEffect(() => {
    if (isSuccess && data?.status === 'OK') {
      message.success()
      handleCancel()
    } else if (isError) {
      message.error()
    }
  }, [isSuccess])

  useEffect(() => {
    if (isSuccessDelectedMany && dataDeletedMany?.status === 'OK') {
      message.success()
    } else if (isErrorDeletedMany) {
      message.error()
    }
  }, [isSuccessDelectedMany])

  useEffect(() => {
    if (isSuccessDelected && dataDeleted?.status === 'OK') {
      message.success()
      handleCancelDelete()
    } else if (isErrorDeleted) {
      message.error()
    }
  }, [isSuccessDelected])

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateConfigDetails({
      author: '',
      email: '',
      phone: '',
      zalo: '',
      facebook: '',
      type: '',
      address: '',
      metadesc: '',
      metakey: '',
    })
    form.resetFields()
  };

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === 'OK') {
      message.success()
      handleCloseDrawer()
    } else if (isErrorUpdated) {
      message.error()
    }
  }, [isSuccessUpdated])

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false)
  }


  const handleDeleteConfig = () => {
    mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
      onSettled: () => {
        queryConfig.refetch()
      }
    })
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateConfig({
        author: '',
        email: '',
        phone: '',
        zalo: '',
        facebook: '',
        type: '',
        address: '',
        metadesc: '',
        metakey: '',
      })
    form.resetFields()
  };

  const onFinish = () => {
    const params = {
      author: stateConfig.author,
      email: stateConfig.email,
      phone: stateConfig.phone,
      zalo: stateConfig.zalo,
      facebook: stateConfig.facebook,
      type: stateConfig.type === 'add_type' ? stateConfig.newType : stateConfig.type,
      address: stateConfig.address,
      metadesc: stateConfig.metadesc,
      metakey: stateConfig.metakey,
    }
    mutation.mutate(params, {
      onSettled: () => {
        queryConfig.refetch()
      }
    })
  }

  const handleOnchange = (e) => {
    setStateConfig({
      ...stateConfig,
      [e.target.author]: e.target.value
    })
  }

  const handleOnchangeDetails = (e) => {
    setStateConfigDetails({
      ...stateConfigDetails,
      [e.target.author]: e.target.value
    })
  }

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateConfig({
      ...stateConfig,
      image: file.preview
    })
  }

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateConfigDetails({
      ...stateConfigDetails,
      image: file.preview
    })
  }
  const onUpdateConfig = () => {
    mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateConfigDetails }, {
      onSettled: () => {
        queryConfig.refetch()
      }
    })
  }

  const handleChangeSelect = (value) => {
      setStateConfig({
        ...stateConfig,
        type: value
      })
  }

  return (
    <div>
      <WrapperHeader>Quản lý config</WrapperHeader>
      <div style={{ marginTop: '10px' }}>
        <Button style={{ color:'#008000', borderRadius: '6px', borderStyle: 'dashed' }} onClick={() => setIsModalOpen(true)}>Create </Button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <TableComponent handleDelteMany={handleDelteManyConfigs} columns={columns} isLoading={isLoadingConfigs} data={dataTable} onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              setRowSelected(record._id)
            }
          };
        }} />
      </div>
      <ModalComponent forceRender title="Tạo config" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Loading isLoading={isLoading}>

          <Form
            author="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={onFinish}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Tên config"
              author="author"
              rules={[{ required: true, message: 'Please input your author!' }]}
            >
              <InputComponent value={stateConfig['author']} onChange={handleOnchange} author="author" />
            </Form.Item>

            <Form.Item
              label="Loại config "
              author="type"
              rules={[{ required: true, message: 'Please input your type!' }]}
            >
              <Select
                author="type"
                // defaultValue="lucy"
                // style={{ width: 120 }}
                value={stateConfig.type}
                onChange={handleChangeSelect}
                options={renderOptions(typeConfig?.data?.data)}
                />
            </Form.Item>
            {stateConfig.type === 'add_type' && (
              <Form.Item
                label='Loại config mới'
                author="newType"
                rules={[{ required: true, message: 'Please input your type!' }]}
              >
                <InputComponent value={stateConfig.newType} onChange={handleOnchange} author="newType" />
              </Form.Item>
            )}
            <Form.Item
              label="Email"
              author="email"
              rules={[{ required: true, message: 'Please input your count email!' }]}
            >
              <InputComponent value={stateConfig.email} onChange={handleOnchange} author="email" />
            </Form.Item>
            <Form.Item
              label="Zalo"
              author="zalo"
              rules={[{ required: true, message: 'Please input your count zalo!' }]}
            >
              <InputComponent value={stateConfig.zalo} onChange={handleOnchange} author="zalo" />
            </Form.Item>
            <Form.Item
              label="SDT"
              author="phone"
              rules={[{ required: true, message: 'Please input your count phone!' }]}
            >
              <InputComponent value={stateConfig.phone} onChange={handleOnchange} author="phone" />
            </Form.Item>
            <Form.Item
              label="Facebook"
              author="facebook"
              rules={[{ required: true, message: 'Please input your count facebook!' }]}
            >
              <InputComponent value={stateConfig.facebook} onChange={handleOnchange} author="facebook" />
            </Form.Item>
            <Form.Item
              label="Metadesc"
              author="metadesc"
              rules={[{ required: true, message: 'Please input your metadesc of config!' }]}
            >
              <InputComponent value={stateConfig.metadesc} onChange={handleOnchange} author="metadesc" />
            </Form.Item>
            <Form.Item
              label="Metakey"
              author="metakey"
              rules={[{ required: true, message: 'Please input your metakey of config!' }]}
            >
              <InputComponent value={stateConfig.metakey} onChange={handleOnchange} author="metakey" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
      <DrawerComponent title='Chi tiết config' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>

          <Form
            author="basic"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            onFinish={onUpdateConfig}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Tên config "
              author="author"
              rules={[{ required: true, message: 'Please input your author!' }]}
            >
              <InputComponent value={stateConfigDetails['author']} onChange={handleOnchangeDetails} author="author" />
            </Form.Item>

            <Form.Item
              label="Loại config"
              author="type"
              rules={[{ required: true, message: 'Please input your type!' }]}
            >
              <InputComponent value={stateConfigDetails['type']} onChange={handleOnchangeDetails} author="type" />
            </Form.Item>
            <Form.Item
              label="Email"
              author="email"
              rules={[{ required: true, message: 'Please input your count email!' }]}
            >
              <InputComponent value={stateConfig.email} onChange={handleOnchange} author="email" />
            </Form.Item>
            <Form.Item
              label="Zalo"
              author="zalo"
              rules={[{ required: true, message: 'Please input your count zalo!' }]}
            >
              <InputComponent value={stateConfig.zalo} onChange={handleOnchange} author="zalo" />
            </Form.Item>
            <Form.Item
              label="SDT"
              author="phone"
              rules={[{ required: true, message: 'Please input your count phone!' }]}
            >
              <InputComponent value={stateConfig.phone} onChange={handleOnchange} author="phone" />
            </Form.Item>
            <Form.Item
              label="Facebook"
              author="facebook"
              rules={[{ required: true, message: 'Please input your count facebook!' }]}
            >
              <InputComponent value={stateConfig.facebook} onChange={handleOnchange} author="facebook" />
            </Form.Item>
            <Form.Item
              label="Metadesc"
              author="metadesc"
              rules={[{ required: true, message: 'Please input your metadesc of config!' }]}
            >
              <InputComponent value={stateConfig.metadesc} onChange={handleOnchange} author="metadesc" />
            </Form.Item>
            <Form.Item
              label="Metakey"
              author="metakey"
              rules={[{ required: true, message: 'Please input your metakey of config!' }]}
            >
              <InputComponent value={stateConfig.metakey} onChange={handleOnchange} author="metakey" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>
      <ModalComponent title="Xóa config" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteConfig}>
        <Loading isLoading={isLoadingDeleted}>
          <div>Bạn có chắc xóa config này không?</div>
        </Loading>
      </ModalComponent>
    </div>
  )
}

export default AdminConfig