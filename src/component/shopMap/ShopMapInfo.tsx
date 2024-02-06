import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import StraightenIcon from '@mui/icons-material/Straighten';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useShopInfoStore from '../../store/useGetShopInfoStore';
import ShopPhoto from '../../utils/ShopPhoto';
import { StyledTooltip } from '../shopList/styles/ShopList.styles';
import {
  StyledDescription,
  StyledPopup,
  StyledShopName,
} from './styles/ShopMap.styles';

type Props = {
  type: 'selectedShop' | 'hoveredShop';
};

const ShopMapInfo = ({ type }: Props) => {
  const shopData = useShopInfoStore.use[type]();

  if (!shopData) {
    return null;
  }

  const {
    id,
    displayName,
    address,
    distance,
    rating,
    userRatingCount,
    longitude,
    latitude,
    photoNames,
  } = shopData;

  return (
    <StyledPopup
      key={Math.random()}
      closeButton={false}
      longitude={longitude}
      latitude={latitude}
      offset={12}
    >
      <Box display='flex'>
        <ShopPhoto id={id} photoNames={photoNames} isSmallSize />

        <Box>
          <StyledShopName>{displayName}</StyledShopName>

          <Box display='flex' gap={1}>
            <StarIcon fontSize='small' />
            <Typography variant='body2'>{`${rating} (${userRatingCount})`}</Typography>

            <StyledTooltip title='離捷運站直線距離(公尺)' placement='top' arrow>
              <Box display='flex' alignItems='center' gap={0.5}>
                <StraightenIcon fontSize='small' />
                <Typography variant='body2'>{`${distance}公尺`}</Typography>
              </Box>
            </StyledTooltip>
          </Box>

          <Box display='flex' mt={1}>
            <LocationOnIcon fontSize='small' />
            <StyledDescription>{address}</StyledDescription>
          </Box>
        </Box>
      </Box>
    </StyledPopup>
  );
};

export default ShopMapInfo;
