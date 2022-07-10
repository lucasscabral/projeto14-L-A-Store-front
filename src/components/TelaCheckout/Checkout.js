import styled from 'styled-components'
import { useEffect, useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import UserContext from '../../contexts/UserContext'

export default function Checkout() {
  const { sacola } = useContext(UserContext)
  const [todosProdutos, setTodosProdutos] = useState()

  console.log(todosProdutos)
  useEffect(() => {
    async function pegarProdutos() {
      try {
        const produtos = await axios.get('http://127.0.0.1:5000/checkout')
        setTodosProdutos(produtos.data)
      } catch (error) {}
    }
    pegarProdutos()
  }, [])
  return todosProdutos?.map(() => <div>{todosProdutos.nome}</div>)
}
