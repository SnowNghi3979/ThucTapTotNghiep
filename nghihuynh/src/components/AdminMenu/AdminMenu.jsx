import { Button, Form, Select, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import React, { useRef } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import TableComponent from '../TableComponent/TableComponent'
import { useState } from 'react'
import InputComponent from '../InputComponent/InputComponent'
import { getBase64, renderOptions } from '../../utils'
import * as MenuService from '../../services/MenuService.js'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import { useEffect } from 'react'
import * as message from '../../components/Message/Message'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import ModalComponent from '../ModalComponent/ModalComponent'

const AdminMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const user = useSelector((state) => state?.user)
  const searchInput = useRef(null);
  const inittial = () => ({
    name: '',
    link: '',
    description: '',
    type: '',
    newType: '',
  })
  const [stateMenu, setStateMenu] = useState(inittial())
  const [stateMenuDetails, setStateMenuDetails] = useState(inittial())

  const [form] = Form.useForm();

  const mutation = useMutationHooks(
    (data) => {
      const { name,
        description,
        link,
        type} = data
      const res = MenuService.createMenu({
        name,
        link,
        description,
        type,
      })
      return res
    }
  )
  const mutationUpdate = useMutationHooks(
    (data) => {
      const { id,
        token,
        ...rests } = data
      const res = MenuService.updateMenu(
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
      const res = MenuService.deleteMenu(
        id,
        token)
      return res
    },
  )

  const mutationDeletedMany = useMutationHooks(
    (data) => {
      const { token, ...ids
      } = data
      const res = MenuService.deleteManyMenu(
        ids,
        token)
      return res
    },
  )

  const getAllMenus = async () => {
    const res = await MenuService.getAllMenu()
    return res
  }

  const fetchGetDetailsMenu = async (rowSelected) => {
    const res = await MenuService.getDetailsMenu(rowSelected)
    if (res?.data) {
      setStateMenuDetails({
        name: res?.data?.name,
        link: res?.data?.link,
        description: res?.data?.description,
        type: res?.data?.type,
      })
    }
    setIsLoadingUpdate(false)
  }

  useEffect(() => {
    if(!isModalOpen) {
      form.setFieldsValue(stateMenuDetails)
    }else {
      form.setFieldsValue(inittial())
    }
  }, [form, stateMenuDetails, isModalOpen])

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true)
      fetchGetDetailsMenu(rowSelected)
    }
  }, [rowSelected, isOpenDrawer])

  const handleDetailsMenu = () => {
    setIsOpenDrawer(true)
  }

  const handleDelteManyMenus = (ids) => {
    mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
      onSettled: () => {
        queryMenu.refetch()
      }
    })
  }

  const fetchAllTypeMenu = async () => {
    const res = await MenuService.getAllTypeMenu()
    return res
  }

  const { data, isLoading, isSuccess, isError } = mutation
  const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
  const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany


  const queryMenu = useQuery({ queryKey: ['menus'], queryFn: getAllMenus })
  const typeMenu = useQuery({ queryKey: ['type-menu'], queryFn: fetchAllTypeMenu })
  const { isLoading: isLoadingMenus, data: menus } = queryMenu
  const renderAction = () => {
    return (
      <div>
        <Button style={{ color:'orange'}} onClick={handleDetailsMenu}>Edit</Button>
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
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name')
    },
    {
      title: 'Link',
      dataIndex: 'link',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
    },
    
    {
      title: 'Chọn',
      dataIndex: 'action',
      render: renderAction
    },
  ];
  const dataTable = menus?.data?.length && menus?.data?.map((menu) => {
    return { ...menu, key: menu._id }
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
    setStateMenuDetails({
      name: '',
      link: '',
      description: '',
      type: '',
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


  const handleDeleteMenu = () => {
    mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
      onSettled: () => {
        queryMenu.refetch()
      }
    })
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateMenu({
      name: '',
      link: '',
      description: '',
      type: '',
    })
    form.resetFields()
  };

  const onFinish = () => {
    const params = {
      name: stateMenu.name,
      link: stateMenu.link,
      description: stateMenu.description,
      type: stateMenu.type === 'add_type' ? stateMenu.newType : stateMenu.type,
    }
    mutation.mutate(params, {
      onSettled: () => {
        queryMenu.refetch()
      }
    })
  }

  const handleOnchange = (e) => {
    setStateMenu({
      ...stateMenu,
      [e.target.name]: e.target.value
    })
  }

  const handleOnchangeDetails = (e) => {
    setStateMenuDetails({
      ...stateMenuDetails,
      [e.target.name]: e.target.value
    })
  }

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateMenu({
      ...stateMenu,
      image: file.preview
    })
  }

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateMenuDetails({
      ...stateMenuDetails,
      image: file.preview
    })
  }
  const onUpdateMenu = () => {
    mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateMenuDetails }, {
      onSettled: () => {
        queryMenu.refetch()
      }
    })
  }

  const handleChangeSelect = (value) => {
      setStateMenu({
        ...stateMenu,
        type: value
      })
  }

  return (
    <div>
      <WrapperHeader>Quản lý menu</WrapperHeader>
      <div style={{ marginTop: '10px' }}>
        <Button style={{ color:'#008000', borderRadius: '6px', borderStyle: 'dashed' }} onClick={() => setIsModalOpen(true)}>Create </Button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <TableComponent handleDelteMany={handleDelteManyMenus} columns={columns} isLoading={isLoadingMenus} data={dataTable} onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              setRowSelected(record._id)
            }
          };
        }} />
      </div>
      <ModalComponent forceRender title="Tạo menu" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Loading isLoading={isLoading}>

          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={onFinish}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Tên menu"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <InputComponent value={stateMenu['name']} onChange={handleOnchange} name="name" />
            </Form.Item>

            <Form.Item
              label="Loại menu "
              name="type"
              rules={[{ required: true, message: 'Please input your type!' }]}
            >
              <Select
                name="type"
                // defaultValue="lucy"
                // style={{ width: 120 }}
                value={stateMenu.type}
                onChange={handleChangeSelect}
                options={renderOptions(typeMenu?.data?.data)}
                />
            </Form.Item>
            {stateMenu.type === 'add_type' && (
              <Form.Item
                label='Loại menu mới'
                name="newType"
                rules={[{ required: true, message: 'Please input your type!' }]}
              >
                <InputComponent value={stateMenu.newType} onChange={handleOnchange} name="newType" />
              </Form.Item>
            )}
            <Form.Item
              label="Link"
              name="link"
              rules={[{ required: true, message: 'Please input your count link!' }]}
            >
              <InputComponent value={stateMenu.link} onChange={handleOnchange} name="link" />
            </Form.Item>
            <Form.Item
              label="Chi tiết"
              name="description"
              rules={[{ required: true, message: 'Please input your count description!' }]}
            >
              <InputComponent value={stateMenu.description} onChange={handleOnchange} name="description" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
      <DrawerComponent title='Chi tiết menu' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>

          <Form
            name="basic"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            onFinish={onUpdateMenu}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Tên menu "
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <InputComponent value={stateMenuDetails['name']} onChange={handleOnchangeDetails} name="name" />
            </Form.Item>

            <Form.Item
              label="Loại menu"
              name="type"
              rules={[{ required: true, message: 'Please input your type!' }]}
            >
              <InputComponent value={stateMenuDetails['type']} onChange={handleOnchangeDetails} name="type" />
            </Form.Item>
            <Form.Item
              label="Link"
              name="link"
              rules={[{ required: true, message: 'Please input your count link!' }]}
            >
              <InputComponent value={stateMenuDetails.link} onChange={handleOnchangeDetails} name="link" />
            </Form.Item>
            <Form.Item
              label="Chi tiết menu"
              name="description"
              rules={[{ required: true, message: 'Please input your count description!' }]}
            >
              <InputComponent value={stateMenuDetails.description} onChange={handleOnchangeDetails} name="description" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>
      <ModalComponent title="Xóa menu" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteMenu}>
        <Loading isLoading={isLoadingDeleted}>
          <div>Bạn có chắc xóa menu này không?</div>
        </Loading>
      </ModalComponent>
    </div>
  )
}

export default AdminMenu