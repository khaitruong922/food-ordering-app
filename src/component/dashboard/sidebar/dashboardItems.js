import { RiDashboardFill } from "react-icons/ri";
import { HiUsers } from 'react-icons/hi'
import { FaStore, FaSitemap } from 'react-icons/fa'
import { Icon } from "@chakra-ui/react";
import { IoCartSharp } from 'react-icons/io5'

const dashboardItems = {
    main: [{
        name: 'Dashboard',
        icon: <Icon as={RiDashboardFill} color='orange.400' />,
        path: '',
    }],
    manage: [{
        name: 'Users',
        icon: <Icon as={HiUsers} color='orange.400' />,
        path: 'users'
    },
    {
        name: 'Stores',
        icon: <Icon as={FaStore} color='orange.400' />,
        path: 'stores'
    },
    {
        name: 'Orders',
        icon: <Icon as={IoCartSharp} color='orange.400' />,
        path: 'orders'
    },
    {
        name: 'Categories',
        icon: <Icon as={FaSitemap} color='orange.400' />,
        path: 'categories'
    },
    ]
}

export default dashboardItems