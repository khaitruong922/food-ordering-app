import { Avatar, Box, Center, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React from 'react'
import Order from './Order'
import Profile from './Profile'

export default function UserProfile() {
    return (
        <Flex boxShadow='lg' mt={10} py={5} px={10} width='50%' minWidth={500} display='flex' mx='auto' flexDirection='column' alignItems='center' py={5}>
            <Text fontSize="xl" fontWeight="bold" textAlign="center">
                User Profile
            </Text>
            <Box height="10px" />
            <Avatar size="xl" />
            <Box height="20px" />
            <Tabs colorScheme="teal" size="md" sx={{ width: 600 }}>
                <Center>
                <TabList>
                    <Tab width="250px">User Profile</Tab>
                    <Tab width="250px">Orders</Tab>
                </TabList>
                </Center>
        
                <TabPanels>
                    <TabPanel>
                        <Profile />
                    </TabPanel>
                    <TabPanel>
                        <Order />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    )
}
