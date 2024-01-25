import React from 'react'
import { useNavigate } from 'react-router-dom'
import { WrapperType } from './styled'

const TypeMenu = ({ name }) => {
  const navigate = useNavigate()
  const handleNavigatetype = (link) => {
    navigate(`${link.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, {state: link})
  }
  return (
    <WrapperType onClick={() => handleNavigatetype(name)}>{name}</WrapperType>
  )
}

export default TypeMenu