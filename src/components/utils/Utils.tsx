import {
  ReactNode,
  CSSProperties,
  useState,
  useId,
  ElementType,
  KeyboardEvent,
  forwardRef,
  useMemo,
} from "react";
import { Close, IconAddPlayer, IconButton } from "@Components";
import { ContainerProps } from "@Types";
import { useNotif } from "@Hooks";
import styles from "./_.module.css";
import { getCardStyles } from "../players/helpers";

export const RisingStars = ({ color }: { color: string }) => {
  const risingStarStyle = useMemo(() => getRisingStarStyle(color), [color]);
  return (
    <>
      <style>{risingStarStyle}</style>
      <div className="rising-stars rising-stars-visible">
        <div style={{ height: "1px", width: "1px" }}></div>
        <div style={{ height: "2px", width: "2px" }}></div>
        <div style={{ height: "1px", width: "1px" }}></div>
      </div>
    </>
  );
};

const getRisingStarStyle = (color: string) => {
  const finalColor = color || "#FFF";
  return `
    @keyframes hue-rotate {
      0% {
          filter: hue-rotate(0deg)
      }

      to {
          filter: hue-rotate(360deg)
      }
    }

    .rising-stars {
      opacity: .7;
      pointer-events: none
    }

    .rising-stars-visible div {
      animation: risingStarsAnination linear infinite
    }

    .rising-stars div {
      background: transparent;
      border-radius: 50%
    }

    .rising-stars div:nth-child(1) {
      animation-duration: 100s!important;
      box-shadow: 693px 8435px ${finalColor},1921px 246px ${finalColor},1120px 872px ${finalColor},1614px 1319px ${finalColor},628px 1227px ${finalColor},144px 1298px ${finalColor},1152px 1529px ${finalColor},1486px 1897px ${finalColor},401px 1213px ${finalColor},1023px 73px ${finalColor},122px 509px ${finalColor},1264px 1265px ${finalColor},235px 1276px ${finalColor},514px 1138px ${finalColor},1019px 1915px ${finalColor},1214px 1058px ${finalColor},1740px 1354px ${finalColor},1947px 791px ${finalColor},1046px 438px ${finalColor},695px 1209px ${finalColor},58px 442px ${finalColor},1143px 1489px ${finalColor},1486px 607px ${finalColor},730px 1396px ${finalColor},402px 1177px ${finalColor},1533px 657px ${finalColor},1436px 657px ${finalColor},1567px 1081px ${finalColor},1632px 295px ${finalColor},460px 1293px ${finalColor},196px 800px ${finalColor},1554px 1284px ${finalColor},645px 1441px ${finalColor},467px 502px ${finalColor},1413px 497px ${finalColor},1468px 434px ${finalColor},34px 619px ${finalColor},1858px 1004px ${finalColor},834px 511px ${finalColor},693px 916px ${finalColor},330px 91px ${finalColor},1686px 1366px ${finalColor},36px 56px ${finalColor},390px 1355px ${finalColor},656px 99px ${finalColor},1695px 1869px ${finalColor},321px 1219px ${finalColor},271px 1082px ${finalColor},1730px 407px ${finalColor},1769px 1790px ${finalColor},1072px 780px ${finalColor},630px 1561px ${finalColor},1238px 1991px ${finalColor},26px 440px ${finalColor},998px 1604px ${finalColor},1865px 631px ${finalColor},289px 1635px ${finalColor},689px 547px ${finalColor},1691px 1147px ${finalColor},113px 1933px ${finalColor},1656px 949px ${finalColor},903px 1220px ${finalColor},1214px 503px ${finalColor},505px 1391px ${finalColor},1300px 1766px ${finalColor},56px 194px ${finalColor},1920px 572px ${finalColor},1704px 945px ${finalColor},1627px 278px ${finalColor},1659px 793px ${finalColor},1249px 1495px ${finalColor},1029px 1187px ${finalColor},1555px 408px ${finalColor},1030px 250px ${finalColor},725px 1744px ${finalColor},1787px 1643px ${finalColor},627px 199px ${finalColor},1151px 698px ${finalColor},1862px 81px ${finalColor},166px 1098px ${finalColor},896px 1022px ${finalColor},1313px 123px ${finalColor},1097px 1047px ${finalColor},1288px 1258px ${finalColor},691px 348px ${finalColor},573px 862px ${finalColor},277px 1220px ${finalColor},1039px 1041px ${finalColor},105px 634px ${finalColor},389px 1046px ${finalColor},1452px 914px ${finalColor},1636px 1264px ${finalColor},1809px 1362px ${finalColor},1796px 1460px ${finalColor},758px 131px ${finalColor},1116px 891px ${finalColor},837px 844px ${finalColor},996px 497px ${finalColor},270px 990px ${finalColor},1646px 1943px ${finalColor},1896px 734px ${finalColor},1237px 154px ${finalColor},795px 796px ${finalColor},1773px 1527px ${finalColor},1262px 1316px ${finalColor},1949px 499px ${finalColor},1987px 1438px ${finalColor},993px 1583px ${finalColor},1371px 423px ${finalColor},1596px 388px ${finalColor},878px 498px ${finalColor},1571px 1310px ${finalColor},1339px 290px ${finalColor},1323px 1028px ${finalColor},1224px 1001px ${finalColor},1211px 1638px ${finalColor},1877px 85px ${finalColor},300px 787px ${finalColor},1699px 1559px ${finalColor},506px 8px ${finalColor},703px 228px ${finalColor},1903px 233px ${finalColor},1740px 963px ${finalColor},1901px 1551px ${finalColor},34px 440px ${finalColor},660px 713px ${finalColor},953px 1397px ${finalColor},1292px 1730px ${finalColor},1733px 922px ${finalColor},844px 1972px ${finalColor},292px 85px ${finalColor},786px 284px ${finalColor},1716px 1293px ${finalColor},111px 1807px ${finalColor},1787px 1462px ${finalColor},1190px 1837px ${finalColor},224px 1552px ${finalColor},1532px 1693px ${finalColor},819px 594px ${finalColor},1441px 1037px ${finalColor},11px 1657px ${finalColor},580px 645px ${finalColor},1469px 330px ${finalColor},1532px 1057px ${finalColor},1146px 860px ${finalColor},1438px 784px ${finalColor},1365px 1858px ${finalColor},271px 1335px ${finalColor},1118px 712px ${finalColor},1261px 48px ${finalColor},1045px 447px ${finalColor},1325px 1454px ${finalColor},1517px 406px ${finalColor},1339px 386px ${finalColor},1375px 1652px ${finalColor},1719px 966px ${finalColor},581px 765px ${finalColor},1222px 599px ${finalColor},1567px 666px ${finalColor},1154px 1378px ${finalColor},1709px 480px ${finalColor},1862px 285px ${finalColor},286px 1888px ${finalColor},587px 870px ${finalColor},46px 832px ${finalColor},1036px 286px ${finalColor},1376px 261px ${finalColor},1794px 981px ${finalColor},1530px 1004px ${finalColor},1700px 1617px ${finalColor},1810px 253px ${finalColor},578px 521px ${finalColor},37px 1207px ${finalColor},1126px 151px ${finalColor},644px 603px ${finalColor},1897px 1995px ${finalColor},415px 579px ${finalColor},929px 718px ${finalColor},1025px 1952px ${finalColor},1779px 1959px ${finalColor},1955px 1752px ${finalColor},1991px 136px ${finalColor},659px 1463px ${finalColor},1113px 1052px ${finalColor},1628px 1806px ${finalColor},1891px 1064px ${finalColor},1782px 1329px ${finalColor},510px 526px ${finalColor},1348px 599px ${finalColor},1157px 1994px ${finalColor},936px 260px ${finalColor},227px 251px ${finalColor},24px 1290px ${finalColor},1944px 701px ${finalColor},1665px 745px ${finalColor},1648px 1817px ${finalColor},1446px 1941px ${finalColor},1552px 802px ${finalColor},483px 264px ${finalColor},974px 537px ${finalColor},966px 941px ${finalColor},1960px 1542px ${finalColor},281px 930px ${finalColor},1000px 863px ${finalColor},800px 1257px ${finalColor},1949px 1845px ${finalColor},43px 1126px ${finalColor},981px 36px ${finalColor},1355px 1949px ${finalColor},797px 43px ${finalColor},110px 906px ${finalColor},829px 853px ${finalColor},845px 1999px ${finalColor},565px 1058px ${finalColor},1424px 1028px ${finalColor},903px 1574px ${finalColor},1670px 632px ${finalColor},1417px 1997px ${finalColor},592px 1967px ${finalColor},843px 1894px ${finalColor},111px 341px ${finalColor},1868px 1896px ${finalColor},1846px 832px ${finalColor},1627px 1557px ${finalColor},1331px 723px ${finalColor},707px 770px ${finalColor},1589px 1422px ${finalColor},1960px 1137px ${finalColor},304px 572px ${finalColor},1275px 459px ${finalColor},707px 866px ${finalColor},914px 1524px ${finalColor},796px 551px ${finalColor},896px 1655px ${finalColor},1051px 182px ${finalColor},1834px 636px ${finalColor},278px 1663px ${finalColor},1197px 1203px ${finalColor},482px 1601px ${finalColor},199px 924px ${finalColor},1974px 1084px ${finalColor},1676px 668px ${finalColor},858px 1226px ${finalColor},1375px 1873px ${finalColor},415px 1817px ${finalColor},1112px 312px ${finalColor},1011px 1629px ${finalColor},1217px 991px ${finalColor},1418px 1998px ${finalColor},1645px 1226px ${finalColor},186px 1661px ${finalColor},1614px 1374px ${finalColor},732px 544px ${finalColor},458px 72px ${finalColor},1137px 1584px ${finalColor},1704px 1103px ${finalColor},329px 1958px ${finalColor},17px 141px ${finalColor},308px 1980px ${finalColor},1975px 675px ${finalColor},555px 330px ${finalColor},787px 712px ${finalColor},1062px 39px ${finalColor},1586px 1771px ${finalColor},1022px 1632px ${finalColor},559px 1316px ${finalColor},1254px 294px ${finalColor},799px 865px ${finalColor},672px 116px ${finalColor},1994px 575px ${finalColor},1733px 652px ${finalColor},1233px 894px ${finalColor},1369px 573px ${finalColor},237px 262px ${finalColor},1980px 200px ${finalColor},657px 1489px ${finalColor},1871px 1364px ${finalColor},1571px 891px ${finalColor},115px 617px ${finalColor},1711px 1178px ${finalColor},463px 183px ${finalColor},1148px 841px ${finalColor},566px 782px ${finalColor},844px 1056px ${finalColor},811px 1855px ${finalColor},97px 842px ${finalColor},1097px 10px ${finalColor},886px 1066px ${finalColor},1590px 1707px ${finalColor},1884px 1313px ${finalColor},1719px 408px ${finalColor},256px 319px ${finalColor},116px 253px ${finalColor},132px 1237px ${finalColor},912px 1912px ${finalColor},568px 1053px ${finalColor},840px 1523px ${finalColor},521px 1780px ${finalColor},1092px 554px ${finalColor},1833px 1018px ${finalColor},1897px 514px ${finalColor},1765px 1236px ${finalColor},415px 1512px ${finalColor},1457px 1382px ${finalColor},567px 1294px ${finalColor},777px 505px ${finalColor},1502px 635px ${finalColor},422px 933px ${finalColor},1609px 1030px ${finalColor},124px 550px ${finalColor},1839px 895px ${finalColor},671px 1187px ${finalColor},1445px 1668px ${finalColor},1457px 633px ${finalColor},363px 1250px ${finalColor},1770px 1598px ${finalColor},1802px 82px ${finalColor},1784px 1798px ${finalColor},1275px 1504px ${finalColor},888px 264px ${finalColor},157px 209px ${finalColor},1803px 1572px ${finalColor},722px 851px ${finalColor},732px 365px ${finalColor},485px 1277px ${finalColor},155px 974px ${finalColor},986px 339px ${finalColor},283px 49px ${finalColor},1605px 727px ${finalColor},55px 359px ${finalColor},468px 987px ${finalColor},789px 283px ${finalColor},97px 623px ${finalColor},237px 432px ${finalColor},577px 619px ${finalColor},891px 623px ${finalColor},861px 373px ${finalColor},510px 1655px ${finalColor},808px 1413px ${finalColor},1626px 1241px ${finalColor},368px 53px ${finalColor},796px 852px ${finalColor},1832px 152px ${finalColor},575px 1066px ${finalColor},1374px 1739px ${finalColor},951px 1313px ${finalColor},1305px 742px ${finalColor},607px 1560px ${finalColor},1735px 682px ${finalColor},827px 805px ${finalColor},270px 1759px ${finalColor},606px 1115px ${finalColor},569px 1730px ${finalColor},742px 158px ${finalColor},261px 1861px ${finalColor},1926px 1332px ${finalColor},461px 1982px ${finalColor},380px 855px ${finalColor},194px 1920px ${finalColor},423px 228px ${finalColor},498px 75px ${finalColor},480px 27px ${finalColor},1842px 769px ${finalColor},1587px 605px ${finalColor},721px 371px ${finalColor},1248px 20px ${finalColor},457px 1734px ${finalColor},1642px 895px ${finalColor},37px 282px ${finalColor},139px 856px ${finalColor},1863px 1254px ${finalColor},728px 419px ${finalColor},1930px 1638px ${finalColor},587px 1392px ${finalColor},52px 228px ${finalColor},483px 1150px ${finalColor},1127px 970px ${finalColor},20px 1909px ${finalColor},1427px 1208px ${finalColor},421px 951px ${finalColor},1552px 259px ${finalColor},688px 1070px ${finalColor},1618px 1896px ${finalColor},1422px 942px ${finalColor},902px 741px ${finalColor},340px 916px ${finalColor},1392px 1128px ${finalColor},1713px 539px ${finalColor},1213px 1312px ${finalColor},170px 1565px ${finalColor},1603px 719px ${finalColor},1504px 1666px ${finalColor},880px 440px ${finalColor},1611px 1247px ${finalColor},408px 1211px ${finalColor},624px 371px ${finalColor},1309px 531px ${finalColor},1913px 955px ${finalColor},170px 1921px ${finalColor},40px 1967px ${finalColor},1074px 1194px ${finalColor},1025px 632px ${finalColor},165px 277px ${finalColor},1685px 1842px ${finalColor},1840px 1925px ${finalColor},1534px 859px ${finalColor},411px 780px ${finalColor},1814px 618px ${finalColor},802px 1791px ${finalColor},724px 1305px ${finalColor},692px 603px ${finalColor},662px 1720px ${finalColor},682px 333px ${finalColor},962px 170px ${finalColor},845px 1277px ${finalColor},1692px 650px ${finalColor},810px 1576px ${finalColor},1812px 1536px ${finalColor},1031px 641px ${finalColor},1794px 1450px ${finalColor},496px 1923px ${finalColor},1410px 998px ${finalColor},1984px 1904px ${finalColor},989px 1970px ${finalColor},926px 1826px ${finalColor},1063px 1831px ${finalColor},586px 59px ${finalColor},769px 1816px ${finalColor},789px 993px ${finalColor},1228px 1880px ${finalColor},12px 1624px ${finalColor},1706px 787px ${finalColor},763px 1189px ${finalColor},1066px 1139px ${finalColor},1927px 182px ${finalColor},1058px 927px ${finalColor},463px 938px ${finalColor},1608px 564px ${finalColor},681px 1082px ${finalColor},1681px 1704px ${finalColor},499px 1586px ${finalColor},1270px 184px ${finalColor},731px 233px ${finalColor},500px 916px ${finalColor},1488px 1864px ${finalColor},38px 1593px ${finalColor},155px 639px ${finalColor},1210px 435px ${finalColor},671px 1152px ${finalColor},1671px 473px ${finalColor},424px 101px ${finalColor},1456px 1419px ${finalColor},1791px 1837px ${finalColor},1783px 411px ${finalColor},1355px 11px ${finalColor},1840px 536px ${finalColor},555px 538px ${finalColor},71px 683px ${finalColor},1375px 674px ${finalColor},269px 545px ${finalColor},1523px 79px ${finalColor},1960px 602px ${finalColor},828px 732px ${finalColor},723px 771px ${finalColor},712px 1505px ${finalColor},285px 606px ${finalColor},286px 1741px ${finalColor},1233px 778px ${finalColor},1717px 1221px ${finalColor},1225px 981px ${finalColor},691px 752px ${finalColor},829px 78px ${finalColor},1211px 1365px ${finalColor},1701px 1323px ${finalColor},1614px 87px ${finalColor},1974px 1744px ${finalColor},1227px 873px ${finalColor},549px 1357px ${finalColor},881px 1414px ${finalColor},321px 1381px ${finalColor},1378px 1339px ${finalColor},1331px 1263px ${finalColor},1997px 50px ${finalColor},149px 776px ${finalColor},1297px 1054px ${finalColor},1183px 757px ${finalColor},421px 58px ${finalColor},1847px 217px ${finalColor},1128px 1490px ${finalColor},681px 485px ${finalColor},486px 1455px ${finalColor},224px 804px ${finalColor},1971px 210px ${finalColor},699px 1124px ${finalColor},1210px 799px ${finalColor},521px 18px ${finalColor},1793px 1493px ${finalColor},36px 815px ${finalColor},1776px 462px ${finalColor},1701px 196px ${finalColor}
    }

    .rising-stars div:nth-child(2) {
      animation-duration: 150s!important;
      box-shadow: 1432px 8687px ${finalColor}, 281px 1550px ${finalColor}, 797px 588px ${finalColor}, 1219px 1750px ${finalColor}, 291px 20px ${finalColor}, 989px 1462px ${finalColor}, 321px 1536px ${finalColor}, 660px 1179px ${finalColor}, 630px 1097px ${finalColor}, 138px 1129px ${finalColor}, 317px 982px ${finalColor}, 1005px 692px ${finalColor}, 594px 770px ${finalColor}, 817px 1325px ${finalColor}, 1750px 516px ${finalColor}, 306px 784px ${finalColor}, 103px 1251px ${finalColor}, 1035px 897px ${finalColor}, 1598px 760px ${finalColor}, 1671px 1684px ${finalColor}, 473px 120px ${finalColor}, 1871px 422px ${finalColor}, 1416px 1596px ${finalColor}, 664px 469px ${finalColor}, 1706px 1842px ${finalColor}, 1830px 647px ${finalColor}, 1494px 831px ${finalColor}, 386px 209px ${finalColor}, 1804px 1120px ${finalColor}, 439px 1000px ${finalColor}, 1089px 7px ${finalColor}, 1293px 560px ${finalColor}, 102px 1926px ${finalColor}, 1219px 1667px ${finalColor}, 1364px 1107px ${finalColor}, 1270px 619px ${finalColor}, 1180px 1657px ${finalColor}, 1208px 521px ${finalColor}, 807px 1325px ${finalColor}, 478px 396px ${finalColor}, 995px 327px ${finalColor}, 1067px 352px ${finalColor}, 1620px 1648px ${finalColor}, 114px 1380px ${finalColor}, 24px 883px ${finalColor}, 1589px 883px ${finalColor}, 1365px 139px ${finalColor}, 778px 1926px ${finalColor}, 1390px 1943px ${finalColor}, 1755px 193px ${finalColor}, 1575px 292px ${finalColor}, 214px 1095px ${finalColor}, 372px 1011px ${finalColor}, 251px 31px ${finalColor}, 1249px 1150px ${finalColor}, 1481px 520px ${finalColor}, 1716px 499px ${finalColor}, 937px 1934px ${finalColor}, 743px 494px ${finalColor}, 1341px 1953px ${finalColor}, 670px 1523px ${finalColor}, 441px 940px ${finalColor}, 1056px 944px ${finalColor}, 1963px 1467px ${finalColor}, 1543px 852px ${finalColor}, 225px 763px ${finalColor}, 957px 1937px ${finalColor}, 1344px 460px ${finalColor}, 497px 512px ${finalColor}, 1676px 1196px ${finalColor}, 961px 438px ${finalColor}, 1721px 1580px ${finalColor}, 418px 1874px ${finalColor}, 316px 1597px ${finalColor}, 1897px 526px ${finalColor}, 640px 1420px ${finalColor}, 50px 1211px ${finalColor}, 1871px 726px ${finalColor}, 1672px 1990px ${finalColor}, 1258px 864px ${finalColor}, 62px 614px ${finalColor}, 314px 882px ${finalColor}, 878px 1076px ${finalColor}, 1724px 1142px ${finalColor}, 543px 46px ${finalColor}, 641px 425px ${finalColor}, 76px 57px ${finalColor}, 227px 927px ${finalColor}, 816px 1130px ${finalColor}, 1064px 1389px ${finalColor}, 1915px 671px ${finalColor}, 407px 1527px ${finalColor}, 257px 605px ${finalColor}, 983px 1012px ${finalColor}, 1576px 388px ${finalColor}, 1575px 1935px ${finalColor}, 68px 1594px ${finalColor}, 311px 107px ${finalColor}, 832px 144px ${finalColor}, 349px 1401px ${finalColor}, 1150px 1652px ${finalColor}, 627px 1663px ${finalColor}, 922px 1119px ${finalColor}, 720px 1629px ${finalColor}, 305px 642px ${finalColor}, 1125px 146px ${finalColor}, 898px 750px ${finalColor}, 642px 1538px ${finalColor}, 88px 782px ${finalColor}, 723px 1320px ${finalColor}, 355px 785px ${finalColor}, 1149px 1949px ${finalColor}, 1522px 1885px ${finalColor}, 1984px 957px ${finalColor}, 256px 1165px ${finalColor}, 1216px 1415px ${finalColor}, 777px 408px ${finalColor}, 819px 510px ${finalColor}, 1239px 1325px ${finalColor}, 1202px 326px ${finalColor}, 225px 384px ${finalColor}, 291px 498px ${finalColor}, 1349px 535px ${finalColor}, 1927px 1931px ${finalColor}, 1673px 507px ${finalColor}, 584px 1285px ${finalColor}, 486px 743px ${finalColor}, 1391px 1091px ${finalColor}, 541px 947px ${finalColor}, 1505px 1612px ${finalColor}, 231px 1371px ${finalColor}, 1336px 1722px ${finalColor}, 729px 1068px ${finalColor}, 1179px 1525px ${finalColor}, 203px 76px ${finalColor}, 1878px 736px ${finalColor}, 1704px 1381px ${finalColor}, 551px 1527px ${finalColor}, 1110px 1859px ${finalColor}, 313px 596px ${finalColor}, 543px 9px ${finalColor}, 1091px 951px ${finalColor}, 1178px 1081px ${finalColor}, 137px 1930px ${finalColor}, 705px 1554px ${finalColor}, 1427px 1999px ${finalColor}, 988px 1968px ${finalColor}, 271px 1720px ${finalColor}, 1234px 1857px ${finalColor}, 1559px 1284px ${finalColor}, 1353px 1409px ${finalColor}, 298px 1591px ${finalColor}, 602px 1198px ${finalColor}, 1451px 106px ${finalColor}, 1835px 1119px ${finalColor}, 1098px 324px ${finalColor}, 946px 842px ${finalColor}, 1308px 1879px ${finalColor}, 1013px 57px ${finalColor}, 1856px 1163px ${finalColor}, 266px 1889px ${finalColor}, 361px 657px ${finalColor}, 1450px 873px ${finalColor}, 1008px 644px ${finalColor}, 632px 1115px ${finalColor}, 45px 1126px ${finalColor}, 845px 1090px ${finalColor}, 582px 974px ${finalColor}, 671px 82px ${finalColor}, 561px 1442px ${finalColor}, 1417px 594px ${finalColor}, 931px 984px ${finalColor}, 1677px 1052px ${finalColor}, 1698px 844px ${finalColor}, 1043px 1059px ${finalColor}, 861px 1672px ${finalColor}, 1922px 1111px ${finalColor}, 1261px 310px ${finalColor}, 1940px 1966px ${finalColor}, 391px 1960px ${finalColor}, 1116px 158px ${finalColor}, 639px 1471px ${finalColor}, 526px 1349px ${finalColor}, 888px 1053px ${finalColor}, 547px 563px ${finalColor}, 1005px 1053px ${finalColor}, 67px 98px ${finalColor}, 9px 872px ${finalColor}, 693px 1422px ${finalColor}, 1303px 1524px ${finalColor}, 1765px 655px ${finalColor}, 66px 188px ${finalColor}, 1929px 1145px ${finalColor}, 1158px 1423px ${finalColor}, 1897px 302px ${finalColor}, 1421px 630px ${finalColor}, 120px 240px ${finalColor}, 777px 1748px ${finalColor}, 802px 1919px ${finalColor}, -9px 3px 16px 15px ${finalColor}, 1739px 897px ${finalColor}, 327px 972px ${finalColor}, 426px 1450px ${finalColor}, 1900px 1785px ${finalColor}, 431px 87px ${finalColor}, 394px 1871px ${finalColor}, 226px 1776px ${finalColor}, 698px 757px ${finalColor}, 944px 274px ${finalColor}, 1764px 899px ${finalColor}, 736px 858px ${finalColor}, 1581px 867px ${finalColor}, 1760px 594px ${finalColor}, 315px 1572px ${finalColor}, 612px 69px ${finalColor}, 491px 1784px ${finalColor}, 1487px 1998px ${finalColor}, 371px 1477px ${finalColor}, 1770px 638px ${finalColor}, 606px 1666px ${finalColor}, 347px 1014px ${finalColor}, 659px 585px ${finalColor}, 1762px 1819px ${finalColor}, 1795px 823px ${finalColor}, 486px 1488px ${finalColor}, 1424px 977px ${finalColor}, 1441px 1377px ${finalColor}, 372px 1103px ${finalColor}, 1736px 1114px ${finalColor}, 883px 789px ${finalColor}, 760px 456px ${finalColor}, 1475px 1368px ${finalColor}, 343px 415px ${finalColor}, 1221px 823px ${finalColor}, 894px 513px ${finalColor}, 1016px 713px ${finalColor}, 751px 22px ${finalColor}, 875px 595px ${finalColor}, 1999px 1266px ${finalColor}, 1340px 652px ${finalColor}, 1872px 540px ${finalColor}, 1957px 753px ${finalColor}, 308px 1242px ${finalColor}, 1551px 1124px ${finalColor}, 1417px 305px ${finalColor}, 1701px 1843px ${finalColor}, 539px 1505px ${finalColor}, 404px 1442px ${finalColor}, 146px 248px ${finalColor}, 1942px 602px ${finalColor}, 1019px 1240px ${finalColor}, 813px 1300px ${finalColor}, 1259px 1092px ${finalColor}, 1820px 10px ${finalColor}, 27px 222px ${finalColor}, 278px 1838px ${finalColor}, 1420px 1702px ${finalColor}, 367px 61px ${finalColor}, 433px 518px ${finalColor}, 253px 1444px ${finalColor}, 791px 954px ${finalColor}, 1768px 1504px ${finalColor}, 709px 1529px ${finalColor}, 198px 246px ${finalColor}, 1228px 131px ${finalColor}, 812px 1859px ${finalColor}, 1145px 784px ${finalColor}, 165px 377px ${finalColor}, 847px 535px ${finalColor}, 71px 1404px ${finalColor}, 1364px 1168px ${finalColor}, 410px 1120px ${finalColor}, 1265px 261px ${finalColor}, 1678px 1845px ${finalColor}, 305px 873px ${finalColor}, 1524px 1720px ${finalColor}, 608px 682px ${finalColor}, 1277px 991px ${finalColor}, 1865px 1097px ${finalColor}, 1426px 197px ${finalColor}, 435px 1774px ${finalColor}, 42px 470px ${finalColor}, 27px 453px ${finalColor}, 306px 1691px ${finalColor}, 60px 1692px ${finalColor}, 1097px 1408px ${finalColor}, 992px 136px ${finalColor}, 1082px 1688px ${finalColor}, 1925px 1301px ${finalColor}, 156px 1675px ${finalColor}, 164px 1147px ${finalColor}, 109px 480px ${finalColor}, 1597px 1391px ${finalColor}, 238px 1553px ${finalColor}, 1609px 303px ${finalColor}, 1932px 1158px ${finalColor}, 127px 891px ${finalColor}, 279px 1047px ${finalColor}, 909px 1389px ${finalColor}, 1517px 1647px ${finalColor}, 394px 1866px ${finalColor}, 1351px 838px ${finalColor}, 787px 660px ${finalColor}, 138px 871px ${finalColor}, 1228px 1149px ${finalColor}, 1251px 1946px ${finalColor}, 1766px 1350px ${finalColor}, 230px 1552px ${finalColor}, 1412px 1835px ${finalColor}, 1465px 1476px ${finalColor}, 288px 1472px ${finalColor}, 1608px 1698px ${finalColor}, 1503px 1254px ${finalColor}, 888px 1080px ${finalColor}, 962px 1952px ${finalColor}, 987px 249px ${finalColor}, 1516px 1971px ${finalColor}, 598px 1683px ${finalColor}, 740px 12px ${finalColor}, 1017px 1917px ${finalColor}, 1094px 894px ${finalColor}, 596px 71px ${finalColor}, 745px 1504px ${finalColor}, 1234px 1514px ${finalColor}, 13px 25px ${finalColor}, 1981px 758px ${finalColor}, 714px 853px ${finalColor}, 1964px 637px ${finalColor}, 373px 1568px ${finalColor}, 1580px 1172px ${finalColor}, 130px 605px ${finalColor}, 1736px 1281px ${finalColor}, 65px 1793px ${finalColor}, 436px 861px ${finalColor}, 33px 161px ${finalColor}, 1530px 1981px ${finalColor}, 1199px 1707px ${finalColor}, 1118px 1175px ${finalColor}, 470px 1959px ${finalColor}, 1552px 233px ${finalColor}, 1450px 1039px ${finalColor}, 1012px 543px ${finalColor}, 722px 621px ${finalColor}, 777px 1365px ${finalColor}, 1510px 1339px ${finalColor}, 95px 896px ${finalColor}, 60px 1765px ${finalColor}, 62px 1148px ${finalColor}, 720px 763px ${finalColor}, 1434px 1114px ${finalColor}, 250px 400px ${finalColor}, 1903px 490px ${finalColor}, 715px 762px ${finalColor}, 185px 1156px ${finalColor}, 1993px 907px ${finalColor}, 389px 95px ${finalColor}, 347px 1342px ${finalColor}, 189px 1186px ${finalColor}, 1498px 1760px ${finalColor}, 1525px 358px ${finalColor}, 479px 1712px ${finalColor}, 483px 418px ${finalColor}, 317px 815px ${finalColor}, 380px 1413px ${finalColor}, 1486px 922px ${finalColor}, 1379px 894px ${finalColor}, 1149px 1911px ${finalColor}, 1360px 1819px ${finalColor}, 140px 1776px ${finalColor}, 1167px 875px ${finalColor}, 332px 1193px ${finalColor}, 1252px 1232px ${finalColor}, 1713px 1820px ${finalColor}, 455px 58px ${finalColor}, 1045px 555px ${finalColor}, 377px 1058px ${finalColor}, 900px 1396px ${finalColor}, 288px 592px ${finalColor}, 399px 762px ${finalColor}, 590px 460px ${finalColor}, 126px 1925px ${finalColor}, 1429px 890px ${finalColor}, 1841px 1712px ${finalColor}, 1975px 182px ${finalColor}, 1559px 1169px ${finalColor}, 1661px 1463px ${finalColor}, 1723px 1948px ${finalColor}, 1280px 1703px ${finalColor}, 713px 1205px ${finalColor}, 334px 1816px ${finalColor}, 460px 724px ${finalColor}, 1573px 1084px ${finalColor}, 1543px 1086px ${finalColor}, 1319px 1241px ${finalColor}, 1014px 880px ${finalColor}, 1492px 18px ${finalColor}, 330px 153px ${finalColor}, 3px 1416px ${finalColor}, 1396px 166px ${finalColor}, 1482px 1299px ${finalColor}, 819px 1966px ${finalColor}, 281px 3px ${finalColor}, 1072px 1199px ${finalColor}, 510px 456px ${finalColor}, 1521px 1731px ${finalColor}, 1801px 643px ${finalColor}, 446px 529px ${finalColor}, 1888px 1169px ${finalColor}, 893px 683px ${finalColor}, 1588px 348px ${finalColor}, 1748px 566px ${finalColor}, 232px 481px ${finalColor}, 769px 200px ${finalColor}, 1649px 1016px ${finalColor}, 1675px 1930px ${finalColor}, 1018px 1607px ${finalColor}, 1137px 825px ${finalColor}, 491px 608px ${finalColor}, 28px 1383px ${finalColor}, 329px 746px ${finalColor}, 273px 1846px ${finalColor}, 1257px 1139px ${finalColor}, 258px 1278px ${finalColor}, 821px 1393px ${finalColor}, 237px 1117px ${finalColor}, 172px 771px ${finalColor}, 120px 608px ${finalColor}, 670px 939px ${finalColor}, 1412px 1095px ${finalColor}, 1257px 1094px ${finalColor}, 996px 1308px ${finalColor}, 953px 1799px ${finalColor}, 769px 11px ${finalColor}, 1586px 864px ${finalColor}, 1217px 1677px ${finalColor}, 1276px 1159px ${finalColor}, 1961px 488px ${finalColor}, 1888px 676px ${finalColor}, 1965px 634px ${finalColor}, 1372px 1360px ${finalColor}, 875px 1653px ${finalColor}, 939px 408px ${finalColor}, 1632px 1895px ${finalColor}, 1858px 802px ${finalColor}, 574px 1280px ${finalColor}, 1800px 1240px ${finalColor}, 1484px 537px ${finalColor}, 926px 1379px ${finalColor}, 1436px 1123px ${finalColor}, 136px 506px ${finalColor}, 920px 1692px ${finalColor}, 1640px 1581px ${finalColor}, 426px 528px ${finalColor}, 1531px 45px ${finalColor}, 634px 991px ${finalColor}, 629px 319px ${finalColor}, 808px 1818px ${finalColor}, 144px 1357px ${finalColor}, 69px 409px ${finalColor}, 284px 1280px ${finalColor}, 1975px 546px ${finalColor}, 817px 261px ${finalColor}, 1794px 575px ${finalColor}, 1747px 1141px ${finalColor}, 997px 1824px ${finalColor}, 783px 1897px ${finalColor}, 597px 1756px ${finalColor}, 464px 1327px ${finalColor}, 1041px 1795px ${finalColor}, 1341px 699px ${finalColor}, 1155px 1249px ${finalColor}, 1801px 1098px ${finalColor}, 1224px 922px ${finalColor}, 1548px 85px ${finalColor}, 1446px 1746px ${finalColor}, 898px 625px ${finalColor}, 1374px 742px ${finalColor}, 1587px 1468px ${finalColor}, 1720px 1268px ${finalColor}, 776px 667px ${finalColor}, 867px 128px ${finalColor}, 841px 1808px ${finalColor}, 1825px 1805px ${finalColor}, 411px 1851px ${finalColor}, 455px 1033px ${finalColor}, 1103px 612px ${finalColor}, 1066px 1433px ${finalColor}, 1068px 835px ${finalColor}, 1497px 1510px ${finalColor}, 1517px 1457px ${finalColor}, 793px 363px ${finalColor}, 983px 613px ${finalColor}, 655px 1820px ${finalColor}, 1244px 1592px ${finalColor}, 625px 264px ${finalColor}, 744px 248px ${finalColor}, 423px 1810px ${finalColor}, 36px 428px ${finalColor}, 797px 489px ${finalColor}, 152px 1855px ${finalColor};
      opacity: .5;
    }

    .rising-stars div:nth-child(3) {
      animation-duration: 200s!important;
      box-shadow: 1101px 12446px ${finalColor},1029px 11px ${finalColor},1085px 961px ${finalColor},1767px 1121px ${finalColor},78px 1112px ${finalColor},1969px 440px ${finalColor},743px 1548px ${finalColor},1005px 1473px ${finalColor},1843px 1450px ${finalColor},1062px 547px ${finalColor},1105px 1501px ${finalColor},316px 1466px ${finalColor},831px 1071px ${finalColor},879px 1157px ${finalColor},1400px 1368px ${finalColor},1491px 1832px ${finalColor},833px 1040px ${finalColor},1788px 1114px ${finalColor},312px 406px ${finalColor},447px 1127px ${finalColor},312px 1249px ${finalColor},577px 1906px ${finalColor},1673px 1170px ${finalColor},926px 1822px ${finalColor},1378px 770px ${finalColor},55px 1592px ${finalColor},1377px 419px ${finalColor},577px 933px ${finalColor},668px 576px ${finalColor},1347px 1630px ${finalColor},1994px 1661px ${finalColor},856px 1426px ${finalColor},262px 1304px ${finalColor},736px 895px ${finalColor},419px 329px ${finalColor},1248px 187px ${finalColor},1584px 1841px ${finalColor},789px 603px ${finalColor},1831px 1181px ${finalColor},1972px 11px ${finalColor},567px 1408px ${finalColor},203px 1943px ${finalColor},502px 961px ${finalColor},1992px 284px ${finalColor},153px 1236px ${finalColor},1395px 491px ${finalColor},133px 153px ${finalColor},699px 61px ${finalColor},511px 1467px ${finalColor},1069px 909px ${finalColor},1534px 1962px ${finalColor},561px 866px ${finalColor},1392px 1318px ${finalColor},1524px 369px ${finalColor},195px 1687px ${finalColor},707px 1428px ${finalColor},1528px 208px ${finalColor},1658px 669px ${finalColor},1579px 161px ${finalColor},757px 766px ${finalColor},72px 4px ${finalColor},372px 1622px ${finalColor},515px 1062px ${finalColor},581px 89px ${finalColor},818px 860px ${finalColor},1949px 779px ${finalColor},1085px 1014px ${finalColor},1677px 551px ${finalColor},502px 371px ${finalColor},1034px 1401px ${finalColor},1745px 1621px ${finalColor},857px 1349px ${finalColor},946px 1184px ${finalColor},376px 1131px ${finalColor},781px 1298px ${finalColor},481px 1846px ${finalColor},1052px 370px ${finalColor},1499px 872px ${finalColor},1606px 905px ${finalColor},363px 1429px ${finalColor},319px 177px ${finalColor},1119px 1019px ${finalColor},1056px 1981px ${finalColor},64px 1192px ${finalColor},572px 1714px ${finalColor},569px 1206px ${finalColor},795px 29px ${finalColor},1125px 1133px ${finalColor},1495px 862px ${finalColor},1298px 587px ${finalColor},1938px 1234px ${finalColor},1009px 1328px ${finalColor},1882px 684px ${finalColor},682px 1022px ${finalColor},844px 936px ${finalColor},1246px 1933px ${finalColor},1044px 1128px ${finalColor},1973px 395px ${finalColor},482px 1715px ${finalColor},695px 528px ${finalColor},1806px 1908px ${finalColor},1578px 998px ${finalColor},143px 1347px ${finalColor},998px 1688px ${finalColor},890px 1063px ${finalColor},1355px 1564px ${finalColor},1349px 350px ${finalColor},1225px 1779px ${finalColor},1841px 1934px ${finalColor},314px 1913px ${finalColor},143px 1167px ${finalColor},1974px 25px ${finalColor},615px 1143px ${finalColor},416px 1967px ${finalColor},1504px 1977px ${finalColor},1017px 1660px ${finalColor},580px 1086px ${finalColor},1974px 1626px ${finalColor},1014px 1610px ${finalColor},266px 1343px ${finalColor},963px 1117px ${finalColor},82px 1048px ${finalColor},1963px 1702px ${finalColor},1294px 1845px ${finalColor},1758px 1448px ${finalColor},1829px 1691px ${finalColor},1299px 279px ${finalColor},446px 1018px ${finalColor},1228px 1952px ${finalColor},1369px 1924px ${finalColor},1416px 532px ${finalColor},263px 1688px ${finalColor},1437px 792px ${finalColor},469px 692px ${finalColor},1904px 34px ${finalColor},1618px 1580px ${finalColor},663px 1204px ${finalColor},816px 1628px ${finalColor},340px 529px ${finalColor},1404px 287px ${finalColor},1149px 1846px ${finalColor},1883px 1682px ${finalColor},1637px 1057px ${finalColor},570px 951px ${finalColor},1623px 205px ${finalColor},988px 439px ${finalColor},519px 316px ${finalColor},1510px 1127px ${finalColor},120px 115px ${finalColor},145px 853px ${finalColor},772px 1379px ${finalColor},852px 155px ${finalColor},1741px 817px ${finalColor},593px 1083px ${finalColor},456px 260px ${finalColor},527px 393px ${finalColor},1763px 1510px ${finalColor},1643px 1437px ${finalColor},997px 1537px ${finalColor},1320px 1844px ${finalColor},611px 892px ${finalColor},1242px 879px ${finalColor},1556px 1491px ${finalColor},882px 264px ${finalColor},1632px 1402px ${finalColor},206px 378px ${finalColor},745px 1042px ${finalColor},1734px 26px ${finalColor},996px 352px ${finalColor},181px 634px ${finalColor},1609px 1890px ${finalColor},1995px 1687px ${finalColor},381px 547px ${finalColor},1779px 225px ${finalColor},1790px 1496px ${finalColor},1368px 1212px ${finalColor},140px 1516px ${finalColor},992px 1470px ${finalColor},748px 98px ${finalColor},1682px 1653px ${finalColor},21px 823px ${finalColor},539px 789px ${finalColor},1158px 1232px ${finalColor},437px 1554px ${finalColor},1224px 1078px ${finalColor},262px 254px ${finalColor},1618px 349px ${finalColor},945px 1054px ${finalColor},780px 131px ${finalColor},605px 157px ${finalColor},1586px 617px ${finalColor},1120px 1794px ${finalColor},1533px 751px ${finalColor},1391px 1941px ${finalColor},1920px 1852px ${finalColor},1860px 1543px ${finalColor},1621px 695px ${finalColor},42px 1618px ${finalColor},362px 428px ${finalColor},1354px 688px ${finalColor},1347px 228px ${finalColor},1956px 1145px ${finalColor},1160px 1979px ${finalColor},124px 597px ${finalColor},1491px 1234px ${finalColor},1552px 876px ${finalColor},1066px 1057px ${finalColor},1420px 316px ${finalColor},179px 590px ${finalColor},435px 142px ${finalColor},772px 861px ${finalColor},878px 53px ${finalColor},1172px 1627px ${finalColor},1847px 580px ${finalColor},1574px 1056px ${finalColor},281px 1326px ${finalColor},443px 1159px ${finalColor},1768px 1225px ${finalColor},1883px 1368px ${finalColor},1957px 1304px ${finalColor},1666px 1523px ${finalColor},1607px 593px ${finalColor},413px 549px ${finalColor},878px 1579px ${finalColor},1041px 766px ${finalColor},638px 1178px ${finalColor},1985px 534px ${finalColor},537px 142px ${finalColor},1376px 1133px ${finalColor},990px 430px ${finalColor},1062px 839px ${finalColor},1658px 1871px ${finalColor},20px 29px ${finalColor},336px 219px ${finalColor},1793px 323px ${finalColor},1538px 176px ${finalColor},558px 1227px ${finalColor},1826px 1132px ${finalColor},572px 1461px ${finalColor},1900px 1647px ${finalColor},1126px 1972px ${finalColor},703px 358px ${finalColor},1444px 1988px ${finalColor},980px 721px ${finalColor},240px 674px ${finalColor},1731px 1607px ${finalColor},49px 293px ${finalColor},1392px 1831px ${finalColor},101px 1661px ${finalColor},1834px 1163px ${finalColor},1709px 1336px ${finalColor},88px 1546px ${finalColor},1688px 1721px ${finalColor},624px 1058px ${finalColor},1347px 352px ${finalColor},1262px 677px ${finalColor},948px 1820px ${finalColor},1222px 224px ${finalColor},365px 633px ${finalColor},747px 1162px ${finalColor},527px 1874px ${finalColor},1146px 1467px ${finalColor},949px 1127px ${finalColor},92px 1714px ${finalColor},546px 657px ${finalColor},172px 1489px ${finalColor},587px 970px ${finalColor},359px 1225px ${finalColor},641px 1px ${finalColor},1577px 926px ${finalColor},608px 111px ${finalColor},46px 1967px ${finalColor},1339px 1895px ${finalColor},723px 1320px ${finalColor},329px 1730px ${finalColor},1485px 247px ${finalColor},824px 944px ${finalColor},1441px 1462px ${finalColor},1790px 193px ${finalColor},909px 219px ${finalColor},1161px 1469px ${finalColor},1037px 501px ${finalColor},1397px 999px ${finalColor},1863px 1019px ${finalColor},1956px 406px ${finalColor},1424px 1301px ${finalColor},1036px 676px ${finalColor},1080px 1177px ${finalColor},3px 696px ${finalColor},488px 311px ${finalColor},1907px 334px ${finalColor},174px 1634px ${finalColor},1975px 1271px ${finalColor},947px 64px ${finalColor},669px 767px ${finalColor},721px 1159px ${finalColor},1119px 902px ${finalColor},1498px 2px ${finalColor},372px 434px ${finalColor},1658px 1144px ${finalColor},178px 1549px ${finalColor},1207px 1874px ${finalColor},254px 393px ${finalColor},1965px 1954px ${finalColor},1688px 1283px ${finalColor},359px 1700px ${finalColor},1518px 394px ${finalColor},77px 1612px ${finalColor},216px 387px ${finalColor},1435px 1841px ${finalColor},1110px 1563px ${finalColor},1828px 1710px ${finalColor},527px 973px ${finalColor},1471px 674px ${finalColor},486px 851px ${finalColor},926px 1590px ${finalColor},1566px 1940px ${finalColor},1638px 76px ${finalColor},1369px 1201px ${finalColor},1852px 1309px ${finalColor},675px 1153px ${finalColor},75px 1758px ${finalColor},583px 1871px ${finalColor},170px 655px ${finalColor},710px 12px ${finalColor},908px 1634px ${finalColor},63px 1219px ${finalColor},974px 1654px ${finalColor},855px 1576px ${finalColor},655px 1377px ${finalColor},980px 1494px ${finalColor},45px 100px ${finalColor},1347px 969px ${finalColor},212px 1349px ${finalColor},676px 1443px ${finalColor},1727px 738px ${finalColor},1724px 513px ${finalColor},295px 1126px ${finalColor},582px 722px ${finalColor},222px 291px ${finalColor},1264px 731px ${finalColor},1895px 1348px ${finalColor},1234px 76px ${finalColor},47px 1101px ${finalColor},774px 1279px ${finalColor},1251px 1960px ${finalColor},1113px 1422px ${finalColor},1025px 1581px ${finalColor},1195px 953px ${finalColor},1402px 1616px ${finalColor},537px 92px ${finalColor},832px 887px ${finalColor},95px 1596px ${finalColor},351px 270px ${finalColor},1231px 1562px ${finalColor},830px 364px ${finalColor},664px 128px ${finalColor},1792px 879px ${finalColor},1847px 287px ${finalColor},1140px 615px ${finalColor},122px 69px ${finalColor},1881px 1138px ${finalColor},1221px 1144px ${finalColor},338px 1372px ${finalColor},1222px 1110px ${finalColor},1245px 1334px ${finalColor},775px 824px ${finalColor},1829px 1036px ${finalColor},966px 1438px ${finalColor},1256px 1511px ${finalColor},1313px 1398px ${finalColor},1641px 1165px ${finalColor},1112px 355px ${finalColor},69px 1672px ${finalColor},1251px 453px ${finalColor},733px 244px ${finalColor},665px 527px ${finalColor},829px 975px ${finalColor},332px 1765px ${finalColor},1332px 1562px ${finalColor},1445px 803px ${finalColor},899px 1365px ${finalColor},1791px 1417px ${finalColor},1766px 1682px ${finalColor},1995px 234px ${finalColor},407px 660px ${finalColor},97px 88px ${finalColor},158px 1614px ${finalColor},1474px 321px ${finalColor},776px 889px ${finalColor},199px 83px ${finalColor},1999px 1201px ${finalColor},1591px 1090px ${finalColor},640px 404px ${finalColor},92px 1325px ${finalColor},1802px 1062px ${finalColor},389px 1731px ${finalColor},64px 1986px ${finalColor},334px 25px ${finalColor},682px 1235px ${finalColor},19px 1285px ${finalColor},761px 259px ${finalColor},1129px 494px ${finalColor},1272px 677px ${finalColor},285px 1943px ${finalColor},938px 1838px ${finalColor},1942px 66px ${finalColor},1921px 595px ${finalColor},1767px 843px ${finalColor},1018px 1857px ${finalColor},1487px 904px ${finalColor},1541px 338px ${finalColor},842px 593px ${finalColor},1643px 1017px ${finalColor},463px 329px ${finalColor},1903px 1984px ${finalColor},105px 663px ${finalColor},975px 116px ${finalColor},274px 955px ${finalColor},1421px 1158px ${finalColor},784px 596px ${finalColor},218px 796px ${finalColor},763px 1015px ${finalColor},494px 36px ${finalColor},99px 1630px ${finalColor},91px 21px ${finalColor},929px 1894px ${finalColor},670px 1560px ${finalColor},1096px 1824px ${finalColor},313px 1784px ${finalColor},1512px 251px ${finalColor},1020px 1738px ${finalColor},714px 671px ${finalColor},278px 1287px ${finalColor},1251px 886px ${finalColor},1852px 545px ${finalColor},209px 1270px ${finalColor},128px 1874px ${finalColor},853px 1429px ${finalColor},150px 1984px ${finalColor},991px 709px ${finalColor},417px 1871px ${finalColor},1439px 1133px ${finalColor},702px 1448px ${finalColor},827px 1661px ${finalColor},630px 103px ${finalColor},589px 894px ${finalColor},1178px 297px ${finalColor},1202px 1982px ${finalColor},1728px 679px ${finalColor},1936px 1470px ${finalColor},1161px 1711px ${finalColor},1661px 1092px ${finalColor},46px 1100px ${finalColor},187px 388px ${finalColor},636px 1445px ${finalColor},171px 1213px ${finalColor},1646px 1200px ${finalColor},1182px 157px ${finalColor},1217px 1015px ${finalColor},1936px 807px ${finalColor},1743px 890px ${finalColor},1825px 27px ${finalColor},545px 21px ${finalColor},1895px 993px ${finalColor},1631px 1180px ${finalColor},1634px 411px ${finalColor},1998px 886px ${finalColor},1479px 906px ${finalColor},528px 970px ${finalColor},861px 1238px ${finalColor},881px 361px ${finalColor},960px 916px ${finalColor},280px 950px ${finalColor},1310px 986px ${finalColor},768px 1796px ${finalColor},1187px 980px ${finalColor},612px 1279px ${finalColor},377px 1876px ${finalColor},1170px 736px ${finalColor},1331px 733px ${finalColor},450px 233px ${finalColor},1875px 1317px ${finalColor},1868px 1315px ${finalColor},1874px 1018px ${finalColor},1062px 1949px ${finalColor},1266px 797px ${finalColor},1087px 443px ${finalColor},1984px 369px ${finalColor},1209px 1726px ${finalColor},1626px 501px ${finalColor},1991px 986px ${finalColor},1467px 356px ${finalColor},1163px 964px ${finalColor},1671px 1944px ${finalColor},374px 1634px ${finalColor},1556px 820px ${finalColor},1800px 1600px ${finalColor},1314px 1935px ${finalColor},1174px 1293px ${finalColor};
      opacity: .3
    }

    @keyframes risingStarsAnination {
      0% {
          transform: translateZ(0) translateY(0)
      }

      to {
          transform: translateZ(0) translateY(-2000px)
      }
    }`;
};

export const Toast = () => {
  const { notifs, removeNotif } = useNotif();

  return (
    <ListContainer>
      {notifs.map((notif, i) => {
        const { message, type } = notif;
        const color = getToastColorType(type);
        return (
          <ListElement color={color} key={i}>
            <ToastBody onClick={() => removeNotif(notifs[0].id)}>
              <ToastMessage message={message} />
            </ToastBody>
          </ListElement>
        );
      })}
    </ListContainer>
  );
};

const getToastColorType = (type: "success" | "error" | "warning" | "info") => {
  return type === "success"
    ? "green"
    : type === "error"
    ? "red"
    : type === "warning"
    ? "orange"
    : "blue";
};

const ListContainer = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <style>
        {`@keyframes slide {
        0% {
          transform: translateY(100%);
        }
        100% {
          transform: translateX(0%);
        }
    }`}
      </style>
      <ul className={styles["toast-list-ctn"]}>{children}</ul>
    </>
  );
};

const ListElement = ({ children, color }: { children: ReactNode; color: string }) => {
  const id = useId().replace(/:/g, "_") + "_list_element";
  const classes = getCardStyles("default");
  return (
    <>
      <style>
        {`
        ::view-transition-new(slide${id}) {
          animation: slide 0.2s ease-in;
        }
      `}
      </style>
      <li
        style={{
          viewTransitionName: `slide${id}`,
          boxShadow: ` 0 1px 1px ${color}`,
          overflow: "hidden",
        }}
        className={styles["toast-list-element"] + " " + classes}
      >
        {children}
      </li>
    </>
  );
};

type ToastHeaderProps = {
  children: ReactNode;
  onClick: () => void;
};
const ToastBody = ({ children, onClick }: ToastHeaderProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }} className="">
      <div className={styles["toast-body"]}>{children}</div>
      <IconButton
        onClick={onClick}
        icon={Close}
        iconName="close"
        variant="toaster"
        sx={{ position: "absolute", right: 0 }}
      />
    </div>
  );
};

const ToastMessage = ({ message }: { message: string }) => {
  return (
    <div className={styles["toast-message"]}>
      <span>{message}</span>
    </div>
  );
};

interface FocusManagerProps extends ContainerProps {
  onFocus: () => void;
  onBlur?: () => void;
  onClick?: () => void;
  as?: ElementType;
}
export const FocusManager = ({
  children,
  onFocus,
  onBlur,
  onClick,
  className = "",
  as: Element = "div",
}: FocusManagerProps) => {
  const id = `${useId()}_focus_manager`;
  return (
    <Element id={id} onFocus={onFocus} onBlur={onBlur} onClick={onClick} className={className}>
      {children}
    </Element>
  );
};

export const Separator = () => {
  return <hr className={styles["separator"]} />;
};

interface KeyboardManagerProps extends ContainerProps {
  onKeyUp: (e: KeyboardEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  as?: ElementType;
}

export const RefManager = forwardRef<HTMLDivElement, ContainerProps>((props, ref) => {
  const id = `${useId()}_ref_manager`;
  return (
    <div
      id={id}
      ref={ref}
      style={{
        width: "fit-content",
        height: "fit-content",
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
});

export const KeyboardManager = ({
  as: Element = "div",
  children,
  onKeyUp,
  onKeyDown,
}: KeyboardManagerProps) => {
  const id = `${useId()}_keyboard_manager`;
  return (
    <Element id={id} onKeyUp={onKeyUp} onKeyDown={onKeyDown}>
      {children}
    </Element>
  );
};

type FlexProps = {
  children: ReactNode;
  sx?: CSSProperties;
};
export const Spacer = ({ sx }: { sx?: CSSProperties }) => {
  const id = useId() + "_spacer";
  return <div style={{ ...sx, flex: 1 }} id={id}></div>;
};
export const Flex = ({ children, sx }: FlexProps) => {
  return <div style={{ ...sx, display: "flex" }}>{children}</div>;
};

type Clock = {
  seconds: number;
  minutes?: number;
};
export const Clock = () => {
  const [state, setClock] = useState<Clock>({ seconds: 0, minutes: 0 });

  setTimeout(() => {
    let s = state.seconds;
    let m = state.minutes || 0;
    m = s === 59 ? m + 1 : m;
    s = s === 59 ? 0 : s + 1;

    setClock({ seconds: s, minutes: m });
  }, 1000);

  return (
    <span style={{ position: "absolute", left: 0, top: 0, fontSize: 18 }}>
      Last refresh : {state.minutes} : {state.seconds}
    </span>
  );
};

type UndoRedo = {
  undo: () => void;
  redo: () => void;
  isUndoPossible: boolean;
  isRedoPossible: boolean;
};
export const UndoRedo = ({ undo, redo, isRedoPossible, isUndoPossible }: UndoRedo) => {
  return (
    <div>
      <button
        onClick={undo}
        disabled={!isUndoPossible}
        style={{ color: `${isUndoPossible ? "green" : "red"}` }}
      >
        Undo
      </button>
      <button
        onClick={redo}
        disabled={!isRedoPossible}
        style={{ color: `${isRedoPossible ? "green" : "red"}` }}
      >
        Redo
      </button>
      <button>Add</button>
    </div>
  );
};

type FreshStartButtonProps = {
  isNavOpen?: boolean;
  toggleOpenAddPlayer: () => void;
  isAddPlayerOpen: boolean;
  hasPlayers: boolean;
};
export const FreshStartButton = ({
  toggleOpenAddPlayer,
  isAddPlayerOpen,
  hasPlayers,
}: FreshStartButtonProps) => {
  return (
    <>
      {!hasPlayers && !isAddPlayerOpen && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            height: "100%",
            gap: 20,
          }}
        >
          <h3 style={{ fontSize: "1.3rem" }}>
            Start by adding a player and a start score, good game !
          </h3>
          <IconButton
            style={{ cursor: "pointer", transform: "scale(1.2)" }}
            variant="nav"
            icon={IconAddPlayer}
            iconName="addplayer"
            onClick={toggleOpenAddPlayer}
          />
        </div>
      )}
    </>
  );
};

type PositionType = "nav-extension";
interface PositionContainerProps extends ContainerProps {
  variant: PositionType;
}
export const Position = ({ variant, children }: PositionContainerProps) => {
  let classes: string;
  variant === "nav-extension" ? (classes = styles["nav-extension"]) : (classes = "");
  return <div className={classes}>{children}</div>;
};
