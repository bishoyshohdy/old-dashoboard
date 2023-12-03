import React, { useContext, useEffect, useState } from 'react';
import {
    Flex,
    Box
} from '@chakra-ui/react';
import MenuItem from './components/menu-item/menu-item';
import { useLocation } from 'react-router';
import { sideBarData } from '../../../data/side-bar';
import Logo from './components/logo/logo';
import LightLogo from '../../../assets/images/logo/logo-light.png';
import DarkLogo from '../../../assets/images/logo/logo-dark.png';
import LightLogoSm from '../../../assets/images/logo/logo-sm-light.png';
import DarkLogoSm from '../../../assets/images/logo/logo-sm-dark.png';
import { ThemeContext } from '../../../context/theme';
import useScreenSize from '../../../hooks/screen-size';
import { SCREEN_SIZE } from '../../../types/screen';
import AlexPortImg from '../../../assets/images/logo/alex-port-en.png';
import AlexPortDarkImg from '../../../assets/images/logo/alex-port-dark-en.png';
import BoschImg from '../../../assets/images/logo/bosch.svg';
import { getUserInfo } from '../../../api/user';

export default function SideBar () {
    const [navSize, changeNavSize] = useState('small');
    const location = useLocation();
    const size = useScreenSize();
    const { darkMode } = useContext(ThemeContext);
    const handleHoverSideBar = (size) => {
        changeNavSize(size);
    };
    const [lightImage, setLightImage] = useState('');
    const [darkImage, setDarkImage] = useState('');

    useEffect(() => {
        if (getUserInfo()) {
            if (getUserInfo().customer === 'customer1') {
                setLightImage(AlexPortImg);
                setDarkImage(AlexPortDarkImg);
            }
            if (getUserInfo().customer === 'bosch') {
                setLightImage(BoschImg);
                setDarkImage(BoschImg);
            }
        }
    }, []);
    return (
        <>
            {size === SCREEN_SIZE.LG && <Box
                position={'fixed'}
                h="100%"
                zIndex={2}
                bg={'primary.80'}
                boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
                w={navSize === 'small' ? '75px' : '250px'}
                onMouseEnter={() => handleHoverSideBar('large')}
                onMouseLeave={() => handleHoverSideBar('small')}
            >
                <Flex
                    p="5%"
                    flexDir="column"
                    w="100%"
                    alignItems={'center'}
                    as="nav"
                    gap={2}
                >
                    {navSize === 'small'
                        ? (<Logo mt={-4} h={'15%'} _hover={{ background: 'none' }} logo={darkMode ? LightLogoSm : DarkLogoSm} />)
                        : <>
                            <Logo w={'80%'} h={'15%'} mt={-4} _hover={{ background: 'none' }} logo={darkMode ? LightLogo : DarkLogo} />
                            <Logo w={'80%'} h={'15%'} mt={-4} _hover={{ background: 'none' }} logo={ darkMode ? darkImage : lightImage} />
                        </>
                    }

                    {sideBarData.data.map((ele) => {
                        return (
                            <MenuItem
                                key={ele.id}
                                navSize={navSize}
                                icon={ele.icon}
                                title={ele.name}
                                path={ele.path}
                                active={location.pathname === ele.path}
                                choices={ele.choices}
                            />
                        );
                    })}
                </Flex>
            </Box>
            }
        </>
    );
}
