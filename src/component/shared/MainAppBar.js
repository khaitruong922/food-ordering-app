import { Flex, Icon, IconButton, Text } from '@chakra-ui/react';
import { Fragment } from "react";
import { RiDashboardFill, RiLogoutCircleRLine } from "react-icons/ri";
import { Link, useHistory } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

function AppBarItems() {
  const user = useAuthStore(state => state.user)
  const isAdmin = user?.role === 'admin'
  const history = useHistory()
  const logout = useAuthStore(state => state.logout)
  if (user) return (
    <Fragment>
      {
        isAdmin &&
        <Link to='/dashboard'>
          <IconButton
            icon={<Icon boxSize={25} as={RiDashboardFill} color='orange.400' />}
            variant='ghost'
            isRound
            colorScheme='blackAlpha'
            _focus={{ boxShadow: 'none' }}
          />
        </Link>
      }
      <IconButton
        onClick={() => {
          logout()
          history.push('/')
        }}
        isRound
        variant='ghost'
        colorScheme='blackAlpha'
        _focus={{ boxShadow: 'none' }}
        icon={<Icon boxSize={25} as={RiLogoutCircleRLine} color='orange.400' />}
      />
    </Fragment >
  )
  return (
    <Fragment>
      <Link to='/login'><Text color='white' fontWeight={500} fontSize='md'>Login</Text></Link>
    </Fragment>
  )
}

export default function MainAppBar() {
  return (
    <Flex py={4} px={6} bgColor='gray.800' position='sticky' justify='space-between' align='center'>
      <Link to="/"><Text color='white' fontSize='xl' fontWeight={600}>DeliV</Text></Link>
      <Flex justify='center' ml='auto'>
        <AppBarItems />
      </Flex>
    </Flex >
  )
}