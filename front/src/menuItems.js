import Divider from '@material-ui/core/Divider';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export const menuItems = [
    {
        type: 'link',
        title: 'Dashboard',
        path: '/',
        icon: DashboardIcon,
    },
    {
        type: 'link',
        title: 'User Profile',
        path: '/user',
        icon: AccountCircleIcon,
    },
    {
        type: 'divider',
        divider: Divider,
    },
    {
        type: 'link',
        title: 'Logout',
        path: '/logout',
        icon: ExitToAppIcon,
    },
]
