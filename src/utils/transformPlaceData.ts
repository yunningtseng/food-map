import * as turf from '@turf/turf';
import { RawPlace } from '../types/place';
import { LocationCenter } from '../types/queryShop';

export const transformPlaceData = (
  data: RawPlace[],
  center: LocationCenter
) => {
  const shopList = [];

  for (const item of data) {
    const id = item.id;
    const displayName = item.displayName.text;
    const latitude = item.location.latitude;
    const longitude = item.location.longitude;

    const turfDistance = turf.distance(
      turf.point([center.longitude, center.latitude]),
      turf.point([longitude, latitude])
    );
    const distance = Math.round((turfDistance * 1000) / 10) * 10;

    const primaryType = item.primaryType;

    const dinIn = item.dineIn;
    const takeout = item.takeout;
    const delivery = item.delivery;

    const googleMapsUri = item.googleMapsUri;

    const rating = item.rating;
    const userRatingCount = item.userRatingCount;

    const photoNames = item.photos?.map((photo) => photo.name) ?? [];
    const imgUrls = {};
    const editorialSummary = item.editorialSummary?.text ?? '';

    let establishment = '';
    let subpremise = '';
    let streetNumber = '';
    let route = '';
    let administrativeAreaLevel2 = '';
    let administrativeAreaLevel1 = '';

    item.addressComponents.forEach((component) => {
      if (component.types.includes('establishment')) {
        establishment = component.longText;
      } else if (component.types.includes('subpremise')) {
        if (component.longText[0] === '號') {
          component.longText = component.longText.substring(1);
        }
        subpremise = component.longText;
      } else if (component.types.includes('street_number')) {
        if (component.longText[component.longText.length - 1] !== '號') {
          component.longText += '號';
        }
        streetNumber = component.longText;
      } else if (component.types.includes('route')) {
        route = component.longText;
      } else if (component.types.includes('administrative_area_level_2')) {
        administrativeAreaLevel2 = component.longText;
      } else if (component.types.includes('administrative_area_level_1')) {
        administrativeAreaLevel1 = component.longText;
      }
    });

    const address =
      administrativeAreaLevel1 +
      administrativeAreaLevel2 +
      route +
      streetNumber +
      subpremise +
      establishment;

    const newData = {
      id,
      displayName,
      address,
      latitude,
      longitude,
      distance,
      primaryType,
      dinIn,
      takeout,
      delivery,
      googleMapsUri,
      rating,
      userRatingCount,
      photoNames,
      imgUrls,
      editorialSummary,
    };

    shopList.push(newData);
  }

  return shopList;
};
