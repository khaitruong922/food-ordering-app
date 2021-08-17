import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import StoreIcon from '@material-ui/icons/Store';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import CategoryIcon from '@material-ui/icons/Category';

const dashboardItems = {
    main: [{
        name: 'Dashboard',
        icon: <DashboardIcon color="secondary" />,
        path: '',
    }],
    manage: [{
        name: 'Users',
        icon: <PeopleIcon color="secondary" />,
        path: 'users'
    },
    {
        name: 'Stores',
        icon: <StoreIcon color="secondary" />,
        path: 'stores'
    },
    {
        name: 'Orders',
        icon: <LocalShippingIcon color="secondary" />,
        path: 'orders'
    },
    {
        name: 'Categories',
        icon: <CategoryIcon color="secondary" />,
        path: 'categories'
    },
    ]
}

export default dashboardItems