import { Button, Form, Select, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import React, { useRef } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import TableComponent from '../TableComponent/TableComponent'
import { useState } from 'react'
import InputComponent from '../InputComponent/InputComponent'
import { getBase64, renderOptions } from '../../utils'
import * as BrandService from '../../services/BrandService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import { useEffect } from 'react'
import * as message from '../../components/Message/Message'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import ModalComponent from '../ModalComponent/ModalComponent'

const AdminBrand = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const user = useSelector((state) => state?.user)
  const searchInput = useRef(null);
  const inittial = () => ({
    name: '',
    
    description: '',
    
    image: '',
    type: '',
    
    newType: '',
    slug: '',
  })
  const [stateBrand, setStateBrand] = useState(inittial())
  const [stateBrandDetails, setStateBrandDetails] = useState(inittial())

  const [form] = Form.useForm();

  const mutation = useMutationHooks(
    (data) => {
      const { name,
        
        description,
        
        image,
        type,
        slug } = data
      const res = BrandService.createBrand({
        name,
        
        description,
        
        image,
        type,
        
        slug
      })
      return res
    }
  )
  const mutationUpdate = useMutationHooks(
    (data) => {
      const { id,
        token,
        ...rests } = data
      const res = BrandService.updateBrand(
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
      const res = BrandService.deleteBrand(
        id,
        token)
      return res
    },
  )

  const mutationDeletedMany = useMutationHooks(
    (data) => {
      const { token, ...ids
      } = data
      const res = BrandService.deleteManyBrand(
        ids,
        token)
      return res
    },
  )

  const getAllBrands = async () => {
    const res = await BrandService.getAllBrand()
    return res
  }

  const fetchGetDetailsBrand = async (rowSelected) => {
    const res = await BrandService.getDetailsBrand(rowSelected)
    if (res?.data) {
      setStateBrandDetails({
        name: res?.data?.name,
        description: res?.data?.description,
        image: res?.data?.image,
        type: res?.data?.type,
        slug: res?.data?.slug
      })
    }
    setIsLoadingUpdate(false)
  }

  useEffect(() => {
    if(!isModalOpen) {
      form.setFieldsValue(stateBrandDetails)
    }else {
      form.setFieldsValue(inittial())
    }
  }, [form, stateBrandDetails, isModalOpen])

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true)
      fetchGetDetailsBrand(rowSelected)
    }
  }, [rowSelected, isOpenDrawer])

  const handleDetailsBrand = () => {
    setIsOpenDrawer(true)
  }

  const handleDelteManyBrands = (ids) => {
    mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
      onSettled: () => {
        queryBrand.refetch()
      }
    })
  }

  const fetchAllTypeBrand = async () => {
    const res = await BrandService.getAllTypeBrand()
    return res
  }

  const { data, isLoading, isSuccess, isError } = mutation
  const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
  const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany


  const queryBrand = useQuery({ queryKey: ['brands'], queryFn: getAllBrands })
  const typeBrand = useQuery({ queryKey: ['type-brand'], queryFn: fetchAllTypeBrand })
  const { isLoading: isLoadingBrands, data: brands } = queryBrand
  const renderAction = () => {
    return (
      <div>
        <Button style={{ color:'orange'}} onClick={handleDetailsBrand}>Edit</Button>
        <Button style={{ color:'red'}} onClick={() => setIsModalOpenDelete(true)}>Delete</Button>
      </div>
    )
  }


  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };
  const handleReset = (clearFilters) => {
    clearFilters();
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
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
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
    
  });


  const columns = [
    {
      title: 'Tên thương hiệu',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name')
    },
    {
      title: 'Từ tìm',
      dataIndex: 'slug',
    },
    {
      title: 'Hình ảnh',
    dataIndex: 'image',
    render: (image) => (
      <img
        src={image}
        style={{
          height: '60px',
          width: '60px',
          borderRadius: '50%',
          objectFit: 'cover',
        }}
        alt="Hình ảnh"
      />
    ),

    },    

    {
      title: 'Mô tả thương hiệu',
      dataIndex: 'description',
    },
    {
      title: 'Chọn',
      dataIndex: 'action',
      render: renderAction
    },
  ];
  const dataTable = brands?.data?.length && brands?.data?.map((brand) => {
    return { ...brand, key: brand._id }
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
    setStateBrandDetails({
      name: '',
      description: '',
      image: '',
      type: '',
      slug: ''
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


  const handleDeleteBrand = () => {
    mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
      onSettled: () => {
        queryBrand.refetch()
      }
    })
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateBrand({
      name: '',
      description: '',
      image: '',
      type: '',
      slug: ''
    })
    form.resetFields()
  };

  const onFinish = () => {
    const params = {
      name: stateBrand.name,
      description: stateBrand.description,
      image: stateBrand.image,
      type: stateBrand.type === 'add_type' ? stateBrand.newType : stateBrand.type,
      slug: stateBrand.slug
    }
    mutation.mutate(params, {
      onSettled: () => {
        queryBrand.refetch()
      }
    })
  }

  const handleOnchange = (e) => {
    setStateBrand({
      ...stateBrand,
      [e.target.name]: e.target.value
    })
  }

  const handleOnchangeDetails = (e) => {
    setStateBrandDetails({
      ...stateBrandDetails,
      [e.target.name]: e.target.value
    })
  }

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateBrand({
      ...stateBrand,
      image: file.preview
    })
  }

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateBrandDetails({
      ...stateBrandDetails,
      image: file.preview
    })
  }
  const onUpdateBrand = () => {
    mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateBrandDetails }, {
      onSettled: () => {
        queryBrand.refetch()
      }
    })
  }

  const handleChangeSelect = (value) => {
      setStateBrand({
        ...stateBrand,
        type: value
      })
  }

  return (
    <div>
      <WrapperHeader>Quản lý thương hiệu</WrapperHeader>
      <div style={{ marginTop: '10px' }}>
        <Button style={{ color:'#008000', borderRadius: '6px', borderStyle: 'dashed' }} onClick={() => setIsModalOpen(true)}>Create </Button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <TableComponent handleDelteMany={handleDelteManyBrands} columns={columns} isLoading={isLoadingBrands} data={dataTable} onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              setRowSelected(record._id)
            }
          };
        }} />
      </div>
      <ModalComponent forceRender title="Tạo thương hiệu" open={isModalOpen} onCancel={handleCancel} footer={null}>
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
              label="Tên thương hiệu"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <InputComponent value={stateBrand['name']} onChange={handleOnchange} name="name" />
            </Form.Item>

            <Form.Item
              label="Loại thương hiệu "
              name="type"
              rules={[{ required: true, message: 'Please input your type!' }]}
            >
              <Select
                name="type"
                
                value={stateBrand.type}
                onChange={handleChangeSelect}
                options={renderOptions(typeBrand?.data?.data)}
                />
            </Form.Item>
            {stateBrand.type === 'add_type' && (
              <Form.Item
                label='Loại thương hiệu mới'
                name="newType"
                rules={[{ required: true, message: 'Please input your type!' }]}
              >
                <InputComponent value={stateBrand.newType} onChange={handleOnchange} name="newType" />
              </Form.Item>
            )}
            <Form.Item
              label="Chi tiết"
              name="description"
              rules={[{ required: true, message: 'Please input your count description!' }]}
            >
              <InputComponent value={stateBrand.description} onChange={handleOnchange} name="description" />
            </Form.Item>
            <Form.Item
              label="Từ tìm "
              name="slug"
              rules={[{ required: true, message: 'Please input your slug of brand!' }]}
            >
              <InputComponent value={stateBrand.slug} onChange={handleOnchange} name="slug" />
            </Form.Item>
            <Form.Item
              label="Hình ảnh"
              name="image"
              rules={[{ required: true, message: 'Please input your count image!' }]}
            >
              <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                <Button >Chọn ảnh</Button>
                {stateBrand?.image && (
                  <img src={stateBrand?.image} style={{
                    height: '60px',
                    width: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginLeft: '10px'
                  }} alt="avatar" />
                )}
              </WrapperUploadFile>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
      <DrawerComponent title='Chi tiết thương hiệu' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>

          <Form
            name="basic"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            onFinish={onUpdateBrand}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Tên thương hiệu "
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <InputComponent value={stateBrandDetails['name']} onChange={handleOnchangeDetails} name="name" />
            </Form.Item>

            <Form.Item
              label="Loại thương hiệu"
              name="type"
              rules={[{ required: true, message: 'Please input your type!' }]}
            >
              <InputComponent value={stateBrandDetails['type']} onChange={handleOnchangeDetails} name="type" />
            </Form.Item>
            <Form.Item
              label="Chi tiết sản phẩm"
              name="description"
              rules={[{ required: true, message: 'Please input your count description!' }]}
            >
              <InputComponent value={stateBrandDetails.description} onChange={handleOnchangeDetails} name="description" />
            </Form.Item>
            <Form.Item
              label="Từ tìm"
              name="slug"
              rules={[{ required: true, message: 'Please input your slug of brand!' }]}
            >
              <InputComponent value={stateBrandDetails.slug} onChange={handleOnchangeDetails} name="slug" />
            </Form.Item>
            <Form.Item
              label="Hình ảnh"
              name="image"
              rules={[{ required: true, message: 'Please input your count image!' }]}
            >
              <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                <Button >Chọn ảnh</Button>
                {stateBrandDetails?.image && (
                  <img src={stateBrandDetails?.image} style={{
                    height: '60px',
                    width: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginLeft: '10px'
                  }} alt="avatar" />
                )}
              </WrapperUploadFile>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>
      <ModalComponent title="Xóa thương hiệu" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteBrand}>
        <Loading isLoading={isLoadingDeleted}>
          <div>Bạn có chắc xóa thương hiệu này không?</div>
        </Loading>
      </ModalComponent>
    </div>
  )
}

export default AdminBrand