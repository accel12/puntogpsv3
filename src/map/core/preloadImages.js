import { grey } from "@mui/material/colors";
import createPalette from "@mui/material/styles/createPalette";
import { loadImage, prepareIcon } from "./mapUtil";

import directionSvg from "../../resources/images/direction.svg";
import backgroundSvg from "../../resources/images/background.svg";
import animalSvg from "../../resources/images/icon/animal.svg";
import bicycleSvg from "../../resources/images/icon/bicycle.svg";
import boatSvg from "../../resources/images/icon/boat.svg";
import busSvg from "../../resources/images/icon/bus.svg";
import carSvg from "../../resources/images/icon/car.svg";
// import carPng from "../../resources/images/icon/car1.png";
import camperSvg from "../../resources/images/icon/camper.svg";
import craneSvg from "../../resources/images/icon/crane.svg";
import defaultSvg from "../../resources/images/icon/default.svg";
import startSvg from "../../resources/images/icon/start.svg";
import finishSvg from "../../resources/images/icon/finish.svg";
import helicopterSvg from "../../resources/images/icon/helicopter.svg";
import motorcycleSvg from "../../resources/images/icon/motorcycle.svg";
import personSvg from "../../resources/images/icon/person.svg";
import planeSvg from "../../resources/images/icon/plane.svg";
import scooterSvg from "../../resources/images/icon/scooter.svg";
import shipSvg from "../../resources/images/icon/ship.svg";
import tractorSvg from "../../resources/images/icon/tractor.svg";
import trailerSvg from "../../resources/images/icon/trailer.svg";
import trainSvg from "../../resources/images/icon/train.svg";
import tramSvg from "../../resources/images/icon/tram.svg";
import truckSvg from "../../resources/images/icon/truck.svg";
import vanSvg from "../../resources/images/icon/van.svg";
import m1 from "../../resources/images/vehiculos/1.png";
import m2 from "../../resources/images/vehiculos/2.png";
import m3 from "../../resources/images/vehiculos/3.png";
import m4 from "../../resources/images/vehiculos/4.png";
import m5 from "../../resources/images/vehiculos/5.png";
import m6 from "../../resources/images/vehiculos/6.png";
import m7 from "../../resources/images/vehiculos/7.png";
import m8 from "../../resources/images/vehiculos/8.png";
// import m9 from "../../resources/images/vehiculos/9.png";
// import m10 from "../../resources/images/vehiculos/10.png";
// import m11 from "../../resources/images/vehiculos/11.png";
// import m12 from "../../resources/images/vehiculos/12.png";
// import m13 from "../../resources/images/vehiculos/13.png";
import m14 from "../../resources/images/vehiculos/14.png";
// import m15 from "../../resources/images/vehiculos/15.png";
// import m16 from "../../resources/images/vehiculos/16.png";
// import m17 from "../../resources/images/vehiculos/17.png";
// import m18 from "../../resources/images/vehiculos/18.png";
// import m19 from "../../resources/images/vehiculos/19.png";
import m20 from "../../resources/images/vehiculos/20.png";
import m21 from "../../resources/images/vehiculos/21.png";
import m22 from "../../resources/images/vehiculos/22.png";
import m23 from "../../resources/images/vehiculos/23.png";
import m24 from "../../resources/images/vehiculos/24.png";
import m25 from "../../resources/images/vehiculos/25.png";
import m26 from "../../resources/images/vehiculos/26.png";
import m27 from "../../resources/images/vehiculos/27.png";
import m28 from "../../resources/images/vehiculos/28.png";
import m29 from "../../resources/images/vehiculos/29.png";
import m30 from "../../resources/images/vehiculos/30.png";
import m31 from "../../resources/images/vehiculos/31.png";
import m32 from "../../resources/images/vehiculos/32.png";
import m33 from "../../resources/images/vehiculos/33.png";
import m34 from "../../resources/images/vehiculos/34.png";
import m35 from "../../resources/images/vehiculos/35.png";
import m36 from "../../resources/images/vehiculos/36.png";
import m37 from "../../resources/images/vehiculos/37.png";
import m38 from "../../resources/images/vehiculos/38.png";
import m39 from "../../resources/images/vehiculos/39.png";
import m40 from "../../resources/images/vehiculos/40.png";
import m41 from "../../resources/images/vehiculos/41.png";
import m42 from "../../resources/images/vehiculos/42.png";
import m43 from "../../resources/images/vehiculos/43.png";
import m44 from "../../resources/images/vehiculos/44.png";
import m45 from "../../resources/images/vehiculos/45.png";
import m46 from "../../resources/images/vehiculos/46.png";
import m47 from "../../resources/images/vehiculos/47.png";
import m48 from "../../resources/images/vehiculos/48.png";
import m49 from "../../resources/images/vehiculos/49.png";
import m50 from "../../resources/images/vehiculos/50.png";
import m51 from "../../resources/images/vehiculos/51.png";
import m52 from "../../resources/images/vehiculos/52.png";
import m53 from "../../resources/images/vehiculos/53.png";
import m54 from "../../resources/images/vehiculos/54.png";
import m55 from "../../resources/images/vehiculos/55.png";
// import m56 from "../../resources/images/vehiculos/56.png";
// import m57 from "../../resources/images/vehiculos/57.png";
// import m58 from "../../resources/images/vehiculos/58.png";
// import m59 from "../../resources/images/vehiculos/59.png";
// import m60 from "../../resources/images/vehiculos/60.png";
import m61 from "../../resources/images/vehiculos/61.png";
import m62 from "../../resources/images/vehiculos/62.png";
import m63 from "../../resources/images/vehiculos/63.png";
import m64 from "../../resources/images/vehiculos/64.png";
import m65 from "../../resources/images/vehiculos/65.png";
import m66 from "../../resources/images/vehiculos/66.png";
import m67 from "../../resources/images/vehiculos/67.png";
import m68 from "../../resources/images/vehiculos/68.png";
import m69 from "../../resources/images/vehiculos/69.png";
import m70 from "../../resources/images/vehiculos/70.png";
import m71 from "../../resources/images/vehiculos/71.png";
import m72 from "../../resources/images/vehiculos/72.png";
import m73 from "../../resources/images/vehiculos/73.png";
import m74 from "../../resources/images/vehiculos/74.png";
import m75 from "../../resources/images/vehiculos/75.png";
import m76 from "../../resources/images/vehiculos/76.png";
import m77 from "../../resources/images/vehiculos/77.png";
import m78 from "../../resources/images/vehiculos/78.png";
import m79 from "../../resources/images/vehiculos/79.png";
import m80 from "../../resources/images/vehiculos/80.png";
import m81 from "../../resources/images/vehiculos/81.png";
import m82 from "../../resources/images/vehiculos/82.png";
import m83 from "../../resources/images/vehiculos/83.png";
import m84 from "../../resources/images/vehiculos/84.png";
import m85 from "../../resources/images/vehiculos/85.png";
import m86 from "../../resources/images/vehiculos/86.png";
import m87 from "../../resources/images/vehiculos/87.png";
import m88 from "../../resources/images/vehiculos/88.png";
import m89 from "../../resources/images/vehiculos/89.png";
import m90 from "../../resources/images/vehiculos/90.png";
// import m91 from "../../resources/images/vehiculos/91.png";
// import m92 from "../../resources/images/vehiculos/92.png";
// import m93 from "../../resources/images/vehiculos/93.png";
// import m94 from "../../resources/images/vehiculos/94.png";
// import m95 from "../../resources/images/vehiculos/95.png";
import m96 from "../../resources/images/vehiculos/96.png";
import m97 from "../../resources/images/vehiculos/97.png";
import m98 from "../../resources/images/vehiculos/98.png";
import m99 from "../../resources/images/vehiculos/99.png";
import m100 from "../../resources/images/vehiculos/100.png";
import m101 from "../../resources/images/vehiculos/101.png";
import m102 from "../../resources/images/vehiculos/102.png";
import m103 from "../../resources/images/vehiculos/103.png";
import m104 from "../../resources/images/vehiculos/104.png";
import m105 from "../../resources/images/vehiculos/105.png";
// import m106 from "../../resources/images/vehiculos/106.png";
import m107 from "../../resources/images/vehiculos/107.png";
import m108 from "../../resources/images/vehiculos/108.png";
// import m109 from "../../resources/images/vehiculos/109.png";
// import m110 from "../../resources/images/vehiculos/110.png";
// import m111 from "../../resources/images/vehiculos/111.png";
// import m112 from "../../resources/images/vehiculos/112.png";
// import m113 from "../../resources/images/vehiculos/113.png";
// import m114 from "../../resources/images/vehiculos/114.png";
// import m115 from "../../resources/images/vehiculos/115.png";
// import m116 from "../../resources/images/vehiculos/116.png";
// import m117 from "../../resources/images/vehiculos/117.png";
// import m118 from "../../resources/images/vehiculos/118.png";
// import m119 from "../../resources/images/vehiculos/119.png";
// import m120 from "../../resources/images/vehiculos/120.png";
// import m121 from "../../resources/images/vehiculos/121.png";
// import m122 from "../../resources/images/vehiculos/122.png";
// import m123 from "../../resources/images/vehiculos/123.png";
// import m124 from "../../resources/images/vehiculos/124.png";
// import m125 from "../../resources/images/vehiculos/125.png";
// import m126 from "../../resources/images/vehiculos/126.png";
// import m127 from "../../resources/images/vehiculos/127.png";
import m128 from "../../resources/images/vehiculos/128.png";
import m129 from "../../resources/images/vehiculos/129.png";
import m130 from "../../resources/images/vehiculos/130.png";
import m131 from "../../resources/images/vehiculos/131.png";
// import m132 from "../../resources/images/vehiculos/132.png";
// import m133 from "../../resources/images/vehiculos/133.png";
import m134 from "../../resources/images/vehiculos/134.png";
// import m135 from "../../resources/images/vehiculos/135.png";
// import m136 from "../../resources/images/vehiculos/136.png";
// import m137 from "../../resources/images/vehiculos/137.png";
import m138 from "../../resources/images/vehiculos/138.png";
// import m139 from "../../resources/images/vehiculos/139.png";
// import m140 from "../../resources/images/vehiculos/140.png";
// import m141 from "../../resources/images/vehiculos/141.png";
// import m142 from "../../resources/images/vehiculos/142.png";
// import m143 from "../../resources/images/vehiculos/143.png";
// import m144 from "../../resources/images/vehiculos/144.png";
// import m145 from "../../resources/images/vehiculos/145.png";
// import m146 from "../../resources/images/vehiculos/146.png";
// import m147 from "../../resources/images/vehiculos/147.png";
import m148 from "../../resources/images/vehiculos/148.png";
import m149 from "../../resources/images/vehiculos/149.png";
import m150 from "../../resources/images/vehiculos/150.png";
import m151 from "../../resources/images/vehiculos/151.png";
// import m152 from "../../resources/images/vehiculos/152.png";
// import m153 from "../../resources/images/vehiculos/153.png";
// import m154 from "../../resources/images/vehiculos/154.png";
// import m155 from "../../resources/images/vehiculos/155.png";
// import m156 from "../../resources/images/vehiculos/156.png";
// import m157 from "../../resources/images/vehiculos/157.png";
// import m158 from "../../resources/images/vehiculos/158.png";
// import m159 from "../../resources/images/vehiculos/159.png";
// import m160 from "../../resources/images/vehiculos/160.png";
// import m161 from "../../resources/images/vehiculos/161.png";
// import m162 from "../../resources/images/vehiculos/162.png";
// import m163 from "../../resources/images/vehiculos/163.png";
// import m164 from "../../resources/images/vehiculos/164.png";
// import m165 from "../../resources/images/vehiculos/165.png";
// import m166 from "../../resources/images/vehiculos/166.png";
import m167 from "../../resources/images/vehiculos/167.png";
// import m168 from "../../resources/images/vehiculos/168.png";
import m169 from "../../resources/images/vehiculos/169.png";
import m170 from "../../resources/images/vehiculos/170.png";
// import m171 from "../../resources/images/vehiculos/171.png";
// import m172 from "../../resources/images/vehiculos/172.png";
// import m173 from "../../resources/images/vehiculos/173.png";
// import m174 from "../../resources/images/vehiculos/174.png";
import m175 from "../../resources/images/vehiculos/175.png";
// import m176 from "../../resources/images/vehiculos/176.png";
// import m177 from "../../resources/images/vehiculos/177.png";
// import m178 from "../../resources/images/vehiculos/178.png";
// import m179 from "../../resources/images/vehiculos/179.png";
// import m180 from "../../resources/images/vehiculos/180.png";
// import m181 from "../../resources/images/vehiculos/181.png";
// import m182 from "../../resources/images/vehiculos/182.png";
// import m183 from "../../resources/images/vehiculos/183.png";
import m184 from "../../resources/images/vehiculos/184.png";
import m185 from "../../resources/images/vehiculos/185.png";

export const mapIcons = {
  animal: animalSvg,
  bicycle: bicycleSvg,
  boat: boatSvg,
  bus: busSvg,
  car: carSvg,
  camper: camperSvg,
  crane: craneSvg,
  default: defaultSvg,
  finish: finishSvg,
  helicopter: helicopterSvg,
  motorcycle: motorcycleSvg,
  person: personSvg,
  plane: planeSvg,
  scooter: scooterSvg,
  ship: shipSvg,
  start: startSvg,
  tractor: tractorSvg,
  trailer: trailerSvg,
  train: trainSvg,
  tram: tramSvg,
  truck: truckSvg,
  van: vanSvg,
  m1: m1,
  m2: m2,
  m3: m3,
  m4: m4,
  m5: m5,
  m6: m6,
  m7: m7,
  m8: m8,
  m14: m14,
  m20: m20,
  m21: m21,
  m22: m22,
  m23: m23,
  m24: m24,
  m25: m25,
  m26: m26,
  m27: m27,
  m28: m28,
  m29: m29,
  m30: m30,
  m31: m31,
  m32: m32,
  m33: m33,
  m34: m34,
  m35: m35,
  m36: m36,
  m37: m37,
  m38: m38,
  m39: m39,
  m40: m40,
  m41: m41,
  m42: m42,
  m43: m43,
  m44: m44,
  m45: m45,
  m46: m46,
  m47: m47,
  m48: m48,
  m49: m49,
  m50: m50,
  m51: m51,
  m52: m52,
  m53: m53,
  m54: m54,
  m55: m55,
  m61: m61,
  m62: m62,
  m63: m63,
  m64: m64,
  m65: m65,
  m66: m66,
  m67: m67,
  m68: m68,
  m69: m69,
  m70: m70,
  m71: m71,
  m72: m72,
  m73: m73,
  m74: m74,
  m75: m75,
  m76: m76,
  m77: m77,
  m78: m78,
  m79: m79,
  m80: m80,
  m81: m81,
  m82: m82,
  m83: m83,
  m84: m84,
  m85: m85,
  m86: m86,
  m87: m87,
  m88: m88,
  m89: m89,
  m90: m90,
  m96: m96,
  m97: m97,
  m98: m98,
  m99: m99,
  m100: m100,
  m101: m101,
  m102: m102,
  m103: m103,
  m104: m104,
  m105: m105,
  m107: m107,
  m108: m108,
  // m111: m111,
  // m112: m112,
  // m113: m113,
  // m114: m114,
  // m115: m115,
  // m116: m116,
  // m117: m117,
  // m118: m118,
  // m119: m119,
  // m120: m120,
  // m121: m121,
  // m122: m122,
  // m123: m123,
  // m124: m124,
  // m125: m125,
  // m126: m126,
  // m127: m127,
  m128: m128,
  m129: m129,
  m130: m130,
  m131: m131,
  m134: m134,
  m138: m138,
  // m139: m139,
  // m140: m140,
  // m141: m141,
  // m142: m142,
  // m143: m143,
  // m144: m144,
  // m145: m145,
  // m146: m146,
  // m147: m147,
  m148: m148,
  m149: m149,
  m150: m150,
  m151: m151,
  // m152: m152,
  // m153: m153,
  // m154: m154,
  // m155: m155,
  // m156: m156,
  // m157: m157,
  // m158: m158,
  // m159: m159,
  // m160: m160,
  // m161: m161,
  // m162: m162,
  // m163: m163,
  // m164: m164,
  // m165: m165,
  // m166: m166,
  m167: m167,
  // m168: m168,
  m169: m169,
  m170: m170,
  // m171: m171,
  // m172: m172,
  // m173: m173,
  // m174: m174,
  m175: m175,
  // m176: m176,
  // m177: m177,
  // m178: m178,
  // m179: m179,
  // m180: m180,
  // m181: m181,
  // m182: m182,
  // m183: m183,
  m184: m184,
  m185: m185,
};

export const mapIconKey = (category) => {
  switch (category) {
    case "offroad":
    case "pickup":
      return "car";
    case "trolleybus":
      return "bus";
    default:
      return mapIcons.hasOwnProperty(category) ? category : "default";
  }
};

export const mapImages = {};

const mapPalette = createPalette({
  neutral: { main: grey[500] },
});

export default async () => {
  const background = await loadImage(backgroundSvg);
  mapImages.background = await prepareIcon(background);
  mapImages.direction = await prepareIcon(await loadImage(directionSvg));
  await Promise.all(
    Object.keys(mapIcons).map(async (category) => {
      const results = [];
      ["info", "success", "error", "neutral"].forEach((color) => {
        results.push(
          loadImage(mapIcons[category]).then((icon) => {
            mapImages[`${category}-${color}`] = prepareIcon(
              background,
              icon,
              mapPalette[color].main
            );
          })
        );
      });
      await Promise.all(results);
    })
  );
};
