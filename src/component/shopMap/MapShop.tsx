import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import StraightenIcon from '@mui/icons-material/Straighten';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useShopInfoStore from '../../store/useGetShopInfoStore';
import useQueryShopStore from '../../store/useQueryShopStore';
import { StyledPopup, StyledShopName } from './styles/ShopMap.styles';
import ShopPhoto from '../../utils/ShopPhoto';

type Props = {
  type: 'selectedShop' | 'hoveredShop';
};

const MapShop = ({ type }: Props) => {
  const station = useQueryShopStore.use.station();
  const shopData = useShopInfoStore.use[type]();

  if (!shopData) {
    return null;
  }

  const {
    id,
    name,
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
      <ShopPhoto id={id} photoNames={photoNames} />
      <StyledShopName>{name}</StyledShopName>

      <Box display='flex'>
        <StarIcon fontSize='small' />
        <Typography
          variant='body2'
          ml={0.5}
        >{`${rating} (${userRatingCount})`}</Typography>
      </Box>

      <Box display='flex' alignItems='center' mt={1}>
        <LocationOnIcon fontSize='small' />
        <Typography variant='body2' ml={0.5}>
          {address}
        </Typography>
      </Box>

      <Box display='flex' alignItems='center' mt={1}>
        <StraightenIcon fontSize='small' />
        <Typography variant='body2' ml={0.5}>
          距離{station}捷運站 {distance} 公尺
        </Typography>
      </Box>
    </StyledPopup>
  );
};

export default MapShop;
