import { Flex, IconButton, Text } from '@chakra-ui/react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Fragment } from "react";
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
            icon={<DashboardIcon color='secondary' />}
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
        icon={<ExitToAppIcon style={{ color: 'white' }} />}
      />
    </Fragment >
  )
  return (
    <Fragment>
      <Link to='/login'><Text color='white' fontSize='lg' fontWeight={600}>Login</Text></Link>
    </Fragment>
  )
}

export default function MainAppBar() {
  return (
    <Flex py={4} px={6} bgColor='black' position='sticky' justify='space-between' align='center'>
      <Link to="/"><Text color='white' fontSize='2xl' fontWeight={600}>DeliV</Text></Link>
      <Flex justify='center' ml='auto'>
        <AppBarItems />
      </Flex>
    </Flex >
  )
}