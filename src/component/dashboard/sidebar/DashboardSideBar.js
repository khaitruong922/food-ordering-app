import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import dashboardItems from "./dashboardItems";


function StyledListItem({ path, item }) {
    const { path: itemPath, icon, name } = item
    return (
        <Link to={`${path}/${itemPath}`}>
            <Button
                py={7}
                colorScheme='blackAlpha'
                variant='ghost'
                w='100%'
                justifyContent='flex-start'
                leftIcon={icon}
                color='white'
                _focus={{ boxShadow: 'none' }}
            >{name}</Button>
        </Link>
    )
}

export default function DashboardSideBar({ path }) {
    const items = dashboardItems
    return (
        <Flex direction='column' h='100%' p={5} bgColor='gray.900' >
            {items.main.map(item => <StyledListItem key={item.name} path={path} item={item} />)}
            <Text color='white' fontWeight={600} fontSize='xl'>Manage</Text>
            {items.manage.map(item => <StyledListItem key={item.name} path={path} item={item} />)}
        </Flex>
    )

}