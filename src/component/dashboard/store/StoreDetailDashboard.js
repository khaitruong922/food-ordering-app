import { Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom"
import api from "../../../api/api"
import useApiGet from "../../../hook/useApiGet"
import useInput from "../../../hook/useInput"



export default function StoreDetailDashboard() {
    const { id } = useParams()
    const { data, error, loading, setData, refresh, setLoading } = useApiGet({ endpoint: `/stores/${id}`, defaultValue: null })
    const { name, address, description, image, subMenus = [] } = data || {}
    const { url: imageUrl } = image || {}
    const { value: addedMenuName, onInput: onAddedMenuNameInput, reset: resetAddedMenuNameInput } = useInput('')
    const history = useHistory()

    useEffect(() => {
        setLoading(true)
    }, [id, setLoading])

    async function deleteStore() {
        try {
            await api.delete(`/stores/${id}`)
            history.push('/dashboard/stores')
        }
        catch (e) {

        } finally {

        }
    }

    async function addMenu(e) {
        e.preventDefault()
        if (!addedMenuName) return
        try {
            resetAddedMenuNameInput()
            const { data: addedMenu } = await api.post(`/stores/${id}/sub-menus`, { name: addedMenuName })
            refresh()

        } catch (e) {
            console.log(e)
        }
    }


    return (
        <Flex direction='column' p={5}>

        </Flex >
    )
}