import { Flex, Icon, IconButton, Text } from '@chakra-ui/react';
import { Fragment } from "react";
import { RiDashboardFill, RiLogoutCircleRLine } from "react-icons/ri";
import { HiUserCircle } from 'react-icons/hi'
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
            icon={<Icon boxSize='20px' as={RiDashboardFill} color='yellow.400' />}
            variant='ghost'
            isRound
            size='sm'
            colorScheme='blackAlpha'
            _focus={{ boxShadow: 'none' }}
          />
        </Link>
      }
      <Link to='/profile'>
        <IconButton
          icon={<Icon boxSize='20px' as={HiUserCircle} color='yellow.400' />}
          variant='ghost'
          isRound
          size='sm'

          colorScheme='blackAlpha'
          _focus={{ boxShadow: 'none' }}
        />
      </Link>
      <IconButton
        onClick={() => {
          logout()
          history.push('/')
        }}
        isRound
        variant='ghost'
        colorScheme='blackAlpha'
        _focus={{ boxShadow: 'none' }}
        size='sm'
        icon={<Icon boxSize='20px' as={RiLogoutCircleRLine} color='white' />}
      />
    </Fragment >
  )
  return (
    <Fragment>
      <Link to='/login'><Text color='white' fontWeight={500} fontSize='lg'>Login</Text></Link>
    </Fragment>
  )
}

export default function MainAppBar() {
  return (
    <Flex py={4} px={8} bgColor='gray.900' position='sticky' align='center'>
      <Link to="/"><Text ml={2} color='white' fontSize='xl' fontWeight={600}>DeliV</Text></Link>
      <Flex justify='center' ml='auto'>
        <AppBarItems />
      </Flex>
    </Flex >
  )
}