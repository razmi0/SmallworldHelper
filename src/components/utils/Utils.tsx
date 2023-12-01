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

export const RisingStars = () => {
  const risingStarStyle = useMemo(() => getRisingStarStyle(), []);
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

const getRisingStarStyle = () => {
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
      box-shadow: 693px 8435px #fff,1921px 246px #fff,1120px 872px #fff,1614px 1319px #fff,628px 1227px #fff,144px 1298px #fff,1152px 1529px #fff,1486px 1897px #fff,401px 1213px #fff,1023px 73px #fff,122px 509px #fff,1264px 1265px #fff,235px 1276px #fff,514px 1138px #fff,1019px 1915px #fff,1214px 1058px #fff,1740px 1354px #fff,1947px 791px #fff,1046px 438px #fff,695px 1209px #fff,58px 442px #fff,1143px 1489px #fff,1486px 607px #fff,730px 1396px #fff,402px 1177px #fff,1533px 657px #fff,1436px 657px #fff,1567px 1081px #fff,1632px 295px #fff,460px 1293px #fff,196px 800px #fff,1554px 1284px #fff,645px 1441px #fff,467px 502px #fff,1413px 497px #fff,1468px 434px #fff,34px 619px #fff,1858px 1004px #fff,834px 511px #fff,693px 916px #fff,330px 91px #fff,1686px 1366px #fff,36px 56px #fff,390px 1355px #fff,656px 99px #fff,1695px 1869px #fff,321px 1219px #fff,271px 1082px #fff,1730px 407px #fff,1769px 1790px #fff,1072px 780px #fff,630px 1561px #fff,1238px 1991px #fff,26px 440px #fff,998px 1604px #fff,1865px 631px #fff,289px 1635px #fff,689px 547px #fff,1691px 1147px #fff,113px 1933px #fff,1656px 949px #fff,903px 1220px #fff,1214px 503px #fff,505px 1391px #fff,1300px 1766px #fff,56px 194px #fff,1920px 572px #fff,1704px 945px #fff,1627px 278px #fff,1659px 793px #fff,1249px 1495px #fff,1029px 1187px #fff,1555px 408px #fff,1030px 250px #fff,725px 1744px #fff,1787px 1643px #fff,627px 199px #fff,1151px 698px #fff,1862px 81px #fff,166px 1098px #fff,896px 1022px #fff,1313px 123px #fff,1097px 1047px #fff,1288px 1258px #fff,691px 348px #fff,573px 862px #fff,277px 1220px #fff,1039px 1041px #fff,105px 634px #fff,389px 1046px #fff,1452px 914px #fff,1636px 1264px #fff,1809px 1362px #fff,1796px 1460px #fff,758px 131px #fff,1116px 891px #fff,837px 844px #fff,996px 497px #fff,270px 990px #fff,1646px 1943px #fff,1896px 734px #fff,1237px 154px #fff,795px 796px #fff,1773px 1527px #fff,1262px 1316px #fff,1949px 499px #fff,1987px 1438px #fff,993px 1583px #fff,1371px 423px #fff,1596px 388px #fff,878px 498px #fff,1571px 1310px #fff,1339px 290px #fff,1323px 1028px #fff,1224px 1001px #fff,1211px 1638px #fff,1877px 85px #fff,300px 787px #fff,1699px 1559px #fff,506px 8px #fff,703px 228px #fff,1903px 233px #fff,1740px 963px #fff,1901px 1551px #fff,34px 440px #fff,660px 713px #fff,953px 1397px #fff,1292px 1730px #fff,1733px 922px #fff,844px 1972px #fff,292px 85px #fff,786px 284px #fff,1716px 1293px #fff,111px 1807px #fff,1787px 1462px #fff,1190px 1837px #fff,224px 1552px #fff,1532px 1693px #fff,819px 594px #fff,1441px 1037px #fff,11px 1657px #fff,580px 645px #fff,1469px 330px #fff,1532px 1057px #fff,1146px 860px #fff,1438px 784px #fff,1365px 1858px #fff,271px 1335px #fff,1118px 712px #fff,1261px 48px #fff,1045px 447px #fff,1325px 1454px #fff,1517px 406px #fff,1339px 386px #fff,1375px 1652px #fff,1719px 966px #fff,581px 765px #fff,1222px 599px #fff,1567px 666px #fff,1154px 1378px #fff,1709px 480px #fff,1862px 285px #fff,286px 1888px #fff,587px 870px #fff,46px 832px #fff,1036px 286px #fff,1376px 261px #fff,1794px 981px #fff,1530px 1004px #fff,1700px 1617px #fff,1810px 253px #fff,578px 521px #fff,37px 1207px #fff,1126px 151px #fff,644px 603px #fff,1897px 1995px #fff,415px 579px #fff,929px 718px #fff,1025px 1952px #fff,1779px 1959px #fff,1955px 1752px #fff,1991px 136px #fff,659px 1463px #fff,1113px 1052px #fff,1628px 1806px #fff,1891px 1064px #fff,1782px 1329px #fff,510px 526px #fff,1348px 599px #fff,1157px 1994px #fff,936px 260px #fff,227px 251px #fff,24px 1290px #fff,1944px 701px #fff,1665px 745px #fff,1648px 1817px #fff,1446px 1941px #fff,1552px 802px #fff,483px 264px #fff,974px 537px #fff,966px 941px #fff,1960px 1542px #fff,281px 930px #fff,1000px 863px #fff,800px 1257px #fff,1949px 1845px #fff,43px 1126px #fff,981px 36px #fff,1355px 1949px #fff,797px 43px #fff,110px 906px #fff,829px 853px #fff,845px 1999px #fff,565px 1058px #fff,1424px 1028px #fff,903px 1574px #fff,1670px 632px #fff,1417px 1997px #fff,592px 1967px #fff,843px 1894px #fff,111px 341px #fff,1868px 1896px #fff,1846px 832px #fff,1627px 1557px #fff,1331px 723px #fff,707px 770px #fff,1589px 1422px #fff,1960px 1137px #fff,304px 572px #fff,1275px 459px #fff,707px 866px #fff,914px 1524px #fff,796px 551px #fff,896px 1655px #fff,1051px 182px #fff,1834px 636px #fff,278px 1663px #fff,1197px 1203px #fff,482px 1601px #fff,199px 924px #fff,1974px 1084px #fff,1676px 668px #fff,858px 1226px #fff,1375px 1873px #fff,415px 1817px #fff,1112px 312px #fff,1011px 1629px #fff,1217px 991px #fff,1418px 1998px #fff,1645px 1226px #fff,186px 1661px #fff,1614px 1374px #fff,732px 544px #fff,458px 72px #fff,1137px 1584px #fff,1704px 1103px #fff,329px 1958px #fff,17px 141px #fff,308px 1980px #fff,1975px 675px #fff,555px 330px #fff,787px 712px #fff,1062px 39px #fff,1586px 1771px #fff,1022px 1632px #fff,559px 1316px #fff,1254px 294px #fff,799px 865px #fff,672px 116px #fff,1994px 575px #fff,1733px 652px #fff,1233px 894px #fff,1369px 573px #fff,237px 262px #fff,1980px 200px #fff,657px 1489px #fff,1871px 1364px #fff,1571px 891px #fff,115px 617px #fff,1711px 1178px #fff,463px 183px #fff,1148px 841px #fff,566px 782px #fff,844px 1056px #fff,811px 1855px #fff,97px 842px #fff,1097px 10px #fff,886px 1066px #fff,1590px 1707px #fff,1884px 1313px #fff,1719px 408px #fff,256px 319px #fff,116px 253px #fff,132px 1237px #fff,912px 1912px #fff,568px 1053px #fff,840px 1523px #fff,521px 1780px #fff,1092px 554px #fff,1833px 1018px #fff,1897px 514px #fff,1765px 1236px #fff,415px 1512px #fff,1457px 1382px #fff,567px 1294px #fff,777px 505px #fff,1502px 635px #fff,422px 933px #fff,1609px 1030px #fff,124px 550px #fff,1839px 895px #fff,671px 1187px #fff,1445px 1668px #fff,1457px 633px #fff,363px 1250px #fff,1770px 1598px #fff,1802px 82px #fff,1784px 1798px #fff,1275px 1504px #fff,888px 264px #fff,157px 209px #fff,1803px 1572px #fff,722px 851px #fff,732px 365px #fff,485px 1277px #fff,155px 974px #fff,986px 339px #fff,283px 49px #fff,1605px 727px #fff,55px 359px #fff,468px 987px #fff,789px 283px #fff,97px 623px #fff,237px 432px #fff,577px 619px #fff,891px 623px #fff,861px 373px #fff,510px 1655px #fff,808px 1413px #fff,1626px 1241px #fff,368px 53px #fff,796px 852px #fff,1832px 152px #fff,575px 1066px #fff,1374px 1739px #fff,951px 1313px #fff,1305px 742px #fff,607px 1560px #fff,1735px 682px #fff,827px 805px #fff,270px 1759px #fff,606px 1115px #fff,569px 1730px #fff,742px 158px #fff,261px 1861px #fff,1926px 1332px #fff,461px 1982px #fff,380px 855px #fff,194px 1920px #fff,423px 228px #fff,498px 75px #fff,480px 27px #fff,1842px 769px #fff,1587px 605px #fff,721px 371px #fff,1248px 20px #fff,457px 1734px #fff,1642px 895px #fff,37px 282px #fff,139px 856px #fff,1863px 1254px #fff,728px 419px #fff,1930px 1638px #fff,587px 1392px #fff,52px 228px #fff,483px 1150px #fff,1127px 970px #fff,20px 1909px #fff,1427px 1208px #fff,421px 951px #fff,1552px 259px #fff,688px 1070px #fff,1618px 1896px #fff,1422px 942px #fff,902px 741px #fff,340px 916px #fff,1392px 1128px #fff,1713px 539px #fff,1213px 1312px #fff,170px 1565px #fff,1603px 719px #fff,1504px 1666px #fff,880px 440px #fff,1611px 1247px #fff,408px 1211px #fff,624px 371px #fff,1309px 531px #fff,1913px 955px #fff,170px 1921px #fff,40px 1967px #fff,1074px 1194px #fff,1025px 632px #fff,165px 277px #fff,1685px 1842px #fff,1840px 1925px #fff,1534px 859px #fff,411px 780px #fff,1814px 618px #fff,802px 1791px #fff,724px 1305px #fff,692px 603px #fff,662px 1720px #fff,682px 333px #fff,962px 170px #fff,845px 1277px #fff,1692px 650px #fff,810px 1576px #fff,1812px 1536px #fff,1031px 641px #fff,1794px 1450px #fff,496px 1923px #fff,1410px 998px #fff,1984px 1904px #fff,989px 1970px #fff,926px 1826px #fff,1063px 1831px #fff,586px 59px #fff,769px 1816px #fff,789px 993px #fff,1228px 1880px #fff,12px 1624px #fff,1706px 787px #fff,763px 1189px #fff,1066px 1139px #fff,1927px 182px #fff,1058px 927px #fff,463px 938px #fff,1608px 564px #fff,681px 1082px #fff,1681px 1704px #fff,499px 1586px #fff,1270px 184px #fff,731px 233px #fff,500px 916px #fff,1488px 1864px #fff,38px 1593px #fff,155px 639px #fff,1210px 435px #fff,671px 1152px #fff,1671px 473px #fff,424px 101px #fff,1456px 1419px #fff,1791px 1837px #fff,1783px 411px #fff,1355px 11px #fff,1840px 536px #fff,555px 538px #fff,71px 683px #fff,1375px 674px #fff,269px 545px #fff,1523px 79px #fff,1960px 602px #fff,828px 732px #fff,723px 771px #fff,712px 1505px #fff,285px 606px #fff,286px 1741px #fff,1233px 778px #fff,1717px 1221px #fff,1225px 981px #fff,691px 752px #fff,829px 78px #fff,1211px 1365px #fff,1701px 1323px #fff,1614px 87px #fff,1974px 1744px #fff,1227px 873px #fff,549px 1357px #fff,881px 1414px #fff,321px 1381px #fff,1378px 1339px #fff,1331px 1263px #fff,1997px 50px #fff,149px 776px #fff,1297px 1054px #fff,1183px 757px #fff,421px 58px #fff,1847px 217px #fff,1128px 1490px #fff,681px 485px #fff,486px 1455px #fff,224px 804px #fff,1971px 210px #fff,699px 1124px #fff,1210px 799px #fff,521px 18px #fff,1793px 1493px #fff,36px 815px #fff,1776px 462px #fff,1701px 196px #fff
    }

    .rising-stars div:nth-child(2) {
      animation-duration: 150s!important;
      box-shadow: 1432px 8687px #fff, 281px 1550px #fff, 797px 588px #fff, 1219px 1750px #fff, 291px 20px #fff, 989px 1462px #fff, 321px 1536px #fff, 660px 1179px #fff, 630px 1097px #fff, 138px 1129px #fff, 317px 982px #fff, 1005px 692px #fff, 594px 770px #fff, 817px 1325px #fff, 1750px 516px #fff, 306px 784px #fff, 103px 1251px #fff, 1035px 897px #fff, 1598px 760px #fff, 1671px 1684px #fff, 473px 120px #fff, 1871px 422px #fff, 1416px 1596px #fff, 664px 469px #fff, 1706px 1842px #fff, 1830px 647px #fff, 1494px 831px #fff, 386px 209px #fff, 1804px 1120px #fff, 439px 1000px #fff, 1089px 7px #fff, 1293px 560px #fff, 102px 1926px #fff, 1219px 1667px #fff, 1364px 1107px #fff, 1270px 619px #fff, 1180px 1657px #fff, 1208px 521px #fff, 807px 1325px #fff, 478px 396px #fff, 995px 327px #fff, 1067px 352px #fff, 1620px 1648px #fff, 114px 1380px #fff, 24px 883px #fff, 1589px 883px #fff, 1365px 139px #fff, 778px 1926px #fff, 1390px 1943px #fff, 1755px 193px #fff, 1575px 292px #fff, 214px 1095px #fff, 372px 1011px #fff, 251px 31px #fff, 1249px 1150px #fff, 1481px 520px #fff, 1716px 499px #fff, 937px 1934px #fff, 743px 494px #fff, 1341px 1953px #fff, 670px 1523px #fff, 441px 940px #fff, 1056px 944px #fff, 1963px 1467px #fff, 1543px 852px #fff, 225px 763px #fff, 957px 1937px #fff, 1344px 460px #fff, 497px 512px #fff, 1676px 1196px #fff, 961px 438px #fff, 1721px 1580px #fff, 418px 1874px #fff, 316px 1597px #fff, 1897px 526px #fff, 640px 1420px #fff, 50px 1211px #fff, 1871px 726px #fff, 1672px 1990px #fff, 1258px 864px #fff, 62px 614px #fff, 314px 882px #fff, 878px 1076px #fff, 1724px 1142px #fff, 543px 46px #fff, 641px 425px #fff, 76px 57px #fff, 227px 927px #fff, 816px 1130px #fff, 1064px 1389px #fff, 1915px 671px #fff, 407px 1527px #fff, 257px 605px #fff, 983px 1012px #fff, 1576px 388px #fff, 1575px 1935px #fff, 68px 1594px #fff, 311px 107px #fff, 832px 144px #fff, 349px 1401px #fff, 1150px 1652px #fff, 627px 1663px #fff, 922px 1119px #fff, 720px 1629px #fff, 305px 642px #fff, 1125px 146px #fff, 898px 750px #fff, 642px 1538px #fff, 88px 782px #fff, 723px 1320px #fff, 355px 785px #fff, 1149px 1949px #fff, 1522px 1885px #fff, 1984px 957px #fff, 256px 1165px #fff, 1216px 1415px #fff, 777px 408px #fff, 819px 510px #fff, 1239px 1325px #fff, 1202px 326px #fff, 225px 384px #fff, 291px 498px #fff, 1349px 535px #fff, 1927px 1931px #fff, 1673px 507px #fff, 584px 1285px #fff, 486px 743px #fff, 1391px 1091px #fff, 541px 947px #fff, 1505px 1612px #fff, 231px 1371px #fff, 1336px 1722px #fff, 729px 1068px #fff, 1179px 1525px #fff, 203px 76px #fff, 1878px 736px #fff, 1704px 1381px #fff, 551px 1527px #fff, 1110px 1859px #fff, 313px 596px #fff, 543px 9px #fff, 1091px 951px #fff, 1178px 1081px #fff, 137px 1930px #fff, 705px 1554px #fff, 1427px 1999px #fff, 988px 1968px #fff, 271px 1720px #fff, 1234px 1857px #fff, 1559px 1284px #fff, 1353px 1409px #fff, 298px 1591px #fff, 602px 1198px #fff, 1451px 106px #fff, 1835px 1119px #fff, 1098px 324px #fff, 946px 842px #fff, 1308px 1879px #fff, 1013px 57px #fff, 1856px 1163px #fff, 266px 1889px #fff, 361px 657px #fff, 1450px 873px #fff, 1008px 644px #fff, 632px 1115px #fff, 45px 1126px #fff, 845px 1090px #fff, 582px 974px #fff, 671px 82px #fff, 561px 1442px #fff, 1417px 594px #fff, 931px 984px #fff, 1677px 1052px #fff, 1698px 844px #fff, 1043px 1059px #fff, 861px 1672px #fff, 1922px 1111px #fff, 1261px 310px #fff, 1940px 1966px #fff, 391px 1960px #fff, 1116px 158px #fff, 639px 1471px #fff, 526px 1349px #fff, 888px 1053px #fff, 547px 563px #fff, 1005px 1053px #fff, 67px 98px #fff, 9px 872px #fff, 693px 1422px #fff, 1303px 1524px #fff, 1765px 655px #fff, 66px 188px #fff, 1929px 1145px #fff, 1158px 1423px #fff, 1897px 302px #fff, 1421px 630px #fff, 120px 240px #fff, 777px 1748px #fff, 802px 1919px #fff, -9px 3px 16px 15px #fff, 1739px 897px #fff, 327px 972px #fff, 426px 1450px #fff, 1900px 1785px #fff, 431px 87px #fff, 394px 1871px #fff, 226px 1776px #fff, 698px 757px #fff, 944px 274px #fff, 1764px 899px #fff, 736px 858px #fff, 1581px 867px #fff, 1760px 594px #fff, 315px 1572px #fff, 612px 69px #fff, 491px 1784px #fff, 1487px 1998px #fff, 371px 1477px #fff, 1770px 638px #fff, 606px 1666px #fff, 347px 1014px #fff, 659px 585px #fff, 1762px 1819px #fff, 1795px 823px #fff, 486px 1488px #fff, 1424px 977px #fff, 1441px 1377px #fff, 372px 1103px #fff, 1736px 1114px #fff, 883px 789px #fff, 760px 456px #fff, 1475px 1368px #fff, 343px 415px #fff, 1221px 823px #fff, 894px 513px #fff, 1016px 713px #fff, 751px 22px #fff, 875px 595px #fff, 1999px 1266px #fff, 1340px 652px #fff, 1872px 540px #fff, 1957px 753px #fff, 308px 1242px #fff, 1551px 1124px #fff, 1417px 305px #fff, 1701px 1843px #fff, 539px 1505px #fff, 404px 1442px #fff, 146px 248px #fff, 1942px 602px #fff, 1019px 1240px #fff, 813px 1300px #fff, 1259px 1092px #fff, 1820px 10px #fff, 27px 222px #fff, 278px 1838px #fff, 1420px 1702px #fff, 367px 61px #fff, 433px 518px #fff, 253px 1444px #fff, 791px 954px #fff, 1768px 1504px #fff, 709px 1529px #fff, 198px 246px #fff, 1228px 131px #fff, 812px 1859px #fff, 1145px 784px #fff, 165px 377px #fff, 847px 535px #fff, 71px 1404px #fff, 1364px 1168px #fff, 410px 1120px #fff, 1265px 261px #fff, 1678px 1845px #fff, 305px 873px #fff, 1524px 1720px #fff, 608px 682px #fff, 1277px 991px #fff, 1865px 1097px #fff, 1426px 197px #fff, 435px 1774px #fff, 42px 470px #fff, 27px 453px #fff, 306px 1691px #fff, 60px 1692px #fff, 1097px 1408px #fff, 992px 136px #fff, 1082px 1688px #fff, 1925px 1301px #fff, 156px 1675px #fff, 164px 1147px #fff, 109px 480px #fff, 1597px 1391px #fff, 238px 1553px #fff, 1609px 303px #fff, 1932px 1158px #fff, 127px 891px #fff, 279px 1047px #fff, 909px 1389px #fff, 1517px 1647px #fff, 394px 1866px #fff, 1351px 838px #fff, 787px 660px #fff, 138px 871px #fff, 1228px 1149px #fff, 1251px 1946px #fff, 1766px 1350px #fff, 230px 1552px #fff, 1412px 1835px #fff, 1465px 1476px #fff, 288px 1472px #fff, 1608px 1698px #fff, 1503px 1254px #fff, 888px 1080px #fff, 962px 1952px #fff, 987px 249px #fff, 1516px 1971px #fff, 598px 1683px #fff, 740px 12px #fff, 1017px 1917px #fff, 1094px 894px #fff, 596px 71px #fff, 745px 1504px #fff, 1234px 1514px #fff, 13px 25px #fff, 1981px 758px #fff, 714px 853px #fff, 1964px 637px #fff, 373px 1568px #fff, 1580px 1172px #fff, 130px 605px #fff, 1736px 1281px #fff, 65px 1793px #fff, 436px 861px #fff, 33px 161px #fff, 1530px 1981px #fff, 1199px 1707px #fff, 1118px 1175px #fff, 470px 1959px #fff, 1552px 233px #fff, 1450px 1039px #fff, 1012px 543px #fff, 722px 621px #fff, 777px 1365px #fff, 1510px 1339px #fff, 95px 896px #fff, 60px 1765px #fff, 62px 1148px #fff, 720px 763px #fff, 1434px 1114px #fff, 250px 400px #fff, 1903px 490px #fff, 715px 762px #fff, 185px 1156px #fff, 1993px 907px #fff, 389px 95px #fff, 347px 1342px #fff, 189px 1186px #fff, 1498px 1760px #fff, 1525px 358px #fff, 479px 1712px #fff, 483px 418px #fff, 317px 815px #fff, 380px 1413px #fff, 1486px 922px #fff, 1379px 894px #fff, 1149px 1911px #fff, 1360px 1819px #fff, 140px 1776px #fff, 1167px 875px #fff, 332px 1193px #fff, 1252px 1232px #fff, 1713px 1820px #fff, 455px 58px #fff, 1045px 555px #fff, 377px 1058px #fff, 900px 1396px #fff, 288px 592px #fff, 399px 762px #fff, 590px 460px #fff, 126px 1925px #fff, 1429px 890px #fff, 1841px 1712px #fff, 1975px 182px #fff, 1559px 1169px #fff, 1661px 1463px #fff, 1723px 1948px #fff, 1280px 1703px #fff, 713px 1205px #fff, 334px 1816px #fff, 460px 724px #fff, 1573px 1084px #fff, 1543px 1086px #fff, 1319px 1241px #fff, 1014px 880px #fff, 1492px 18px #fff, 330px 153px #fff, 3px 1416px #fff, 1396px 166px #fff, 1482px 1299px #fff, 819px 1966px #fff, 281px 3px #fff, 1072px 1199px #fff, 510px 456px #fff, 1521px 1731px #fff, 1801px 643px #fff, 446px 529px #fff, 1888px 1169px #fff, 893px 683px #fff, 1588px 348px #fff, 1748px 566px #fff, 232px 481px #fff, 769px 200px #fff, 1649px 1016px #fff, 1675px 1930px #fff, 1018px 1607px #fff, 1137px 825px #fff, 491px 608px #fff, 28px 1383px #fff, 329px 746px #fff, 273px 1846px #fff, 1257px 1139px #fff, 258px 1278px #fff, 821px 1393px #fff, 237px 1117px #fff, 172px 771px #fff, 120px 608px #fff, 670px 939px #fff, 1412px 1095px #fff, 1257px 1094px #fff, 996px 1308px #fff, 953px 1799px #fff, 769px 11px #fff, 1586px 864px #fff, 1217px 1677px #fff, 1276px 1159px #fff, 1961px 488px #fff, 1888px 676px #fff, 1965px 634px #fff, 1372px 1360px #fff, 875px 1653px #fff, 939px 408px #fff, 1632px 1895px #fff, 1858px 802px #fff, 574px 1280px #fff, 1800px 1240px #fff, 1484px 537px #fff, 926px 1379px #fff, 1436px 1123px #fff, 136px 506px #fff, 920px 1692px #fff, 1640px 1581px #fff, 426px 528px #fff, 1531px 45px #fff, 634px 991px #fff, 629px 319px #fff, 808px 1818px #fff, 144px 1357px #fff, 69px 409px #fff, 284px 1280px #fff, 1975px 546px #fff, 817px 261px #fff, 1794px 575px #fff, 1747px 1141px #fff, 997px 1824px #fff, 783px 1897px #fff, 597px 1756px #fff, 464px 1327px #fff, 1041px 1795px #fff, 1341px 699px #fff, 1155px 1249px #fff, 1801px 1098px #fff, 1224px 922px #fff, 1548px 85px #fff, 1446px 1746px #fff, 898px 625px #fff, 1374px 742px #fff, 1587px 1468px #fff, 1720px 1268px #fff, 776px 667px #fff, 867px 128px #fff, 841px 1808px #fff, 1825px 1805px #fff, 411px 1851px #fff, 455px 1033px #fff, 1103px 612px #fff, 1066px 1433px #fff, 1068px 835px #fff, 1497px 1510px #fff, 1517px 1457px #fff, 793px 363px #fff, 983px 613px #fff, 655px 1820px #fff, 1244px 1592px #fff, 625px 264px #fff, 744px 248px #fff, 423px 1810px #fff, 36px 428px #fff, 797px 489px #fff, 152px 1855px #fff;
      opacity: .5;
    }

    .rising-stars div:nth-child(3) {
      animation-duration: 200s!important;
      box-shadow: 1101px 12446px #fff,1029px 11px #fff,1085px 961px #fff,1767px 1121px #fff,78px 1112px #fff,1969px 440px #fff,743px 1548px #fff,1005px 1473px #fff,1843px 1450px #fff,1062px 547px #fff,1105px 1501px #fff,316px 1466px #fff,831px 1071px #fff,879px 1157px #fff,1400px 1368px #fff,1491px 1832px #fff,833px 1040px #fff,1788px 1114px #fff,312px 406px #fff,447px 1127px #fff,312px 1249px #fff,577px 1906px #fff,1673px 1170px #fff,926px 1822px #fff,1378px 770px #fff,55px 1592px #fff,1377px 419px #fff,577px 933px #fff,668px 576px #fff,1347px 1630px #fff,1994px 1661px #fff,856px 1426px #fff,262px 1304px #fff,736px 895px #fff,419px 329px #fff,1248px 187px #fff,1584px 1841px #fff,789px 603px #fff,1831px 1181px #fff,1972px 11px #fff,567px 1408px #fff,203px 1943px #fff,502px 961px #fff,1992px 284px #fff,153px 1236px #fff,1395px 491px #fff,133px 153px #fff,699px 61px #fff,511px 1467px #fff,1069px 909px #fff,1534px 1962px #fff,561px 866px #fff,1392px 1318px #fff,1524px 369px #fff,195px 1687px #fff,707px 1428px #fff,1528px 208px #fff,1658px 669px #fff,1579px 161px #fff,757px 766px #fff,72px 4px #fff,372px 1622px #fff,515px 1062px #fff,581px 89px #fff,818px 860px #fff,1949px 779px #fff,1085px 1014px #fff,1677px 551px #fff,502px 371px #fff,1034px 1401px #fff,1745px 1621px #fff,857px 1349px #fff,946px 1184px #fff,376px 1131px #fff,781px 1298px #fff,481px 1846px #fff,1052px 370px #fff,1499px 872px #fff,1606px 905px #fff,363px 1429px #fff,319px 177px #fff,1119px 1019px #fff,1056px 1981px #fff,64px 1192px #fff,572px 1714px #fff,569px 1206px #fff,795px 29px #fff,1125px 1133px #fff,1495px 862px #fff,1298px 587px #fff,1938px 1234px #fff,1009px 1328px #fff,1882px 684px #fff,682px 1022px #fff,844px 936px #fff,1246px 1933px #fff,1044px 1128px #fff,1973px 395px #fff,482px 1715px #fff,695px 528px #fff,1806px 1908px #fff,1578px 998px #fff,143px 1347px #fff,998px 1688px #fff,890px 1063px #fff,1355px 1564px #fff,1349px 350px #fff,1225px 1779px #fff,1841px 1934px #fff,314px 1913px #fff,143px 1167px #fff,1974px 25px #fff,615px 1143px #fff,416px 1967px #fff,1504px 1977px #fff,1017px 1660px #fff,580px 1086px #fff,1974px 1626px #fff,1014px 1610px #fff,266px 1343px #fff,963px 1117px #fff,82px 1048px #fff,1963px 1702px #fff,1294px 1845px #fff,1758px 1448px #fff,1829px 1691px #fff,1299px 279px #fff,446px 1018px #fff,1228px 1952px #fff,1369px 1924px #fff,1416px 532px #fff,263px 1688px #fff,1437px 792px #fff,469px 692px #fff,1904px 34px #fff,1618px 1580px #fff,663px 1204px #fff,816px 1628px #fff,340px 529px #fff,1404px 287px #fff,1149px 1846px #fff,1883px 1682px #fff,1637px 1057px #fff,570px 951px #fff,1623px 205px #fff,988px 439px #fff,519px 316px #fff,1510px 1127px #fff,120px 115px #fff,145px 853px #fff,772px 1379px #fff,852px 155px #fff,1741px 817px #fff,593px 1083px #fff,456px 260px #fff,527px 393px #fff,1763px 1510px #fff,1643px 1437px #fff,997px 1537px #fff,1320px 1844px #fff,611px 892px #fff,1242px 879px #fff,1556px 1491px #fff,882px 264px #fff,1632px 1402px #fff,206px 378px #fff,745px 1042px #fff,1734px 26px #fff,996px 352px #fff,181px 634px #fff,1609px 1890px #fff,1995px 1687px #fff,381px 547px #fff,1779px 225px #fff,1790px 1496px #fff,1368px 1212px #fff,140px 1516px #fff,992px 1470px #fff,748px 98px #fff,1682px 1653px #fff,21px 823px #fff,539px 789px #fff,1158px 1232px #fff,437px 1554px #fff,1224px 1078px #fff,262px 254px #fff,1618px 349px #fff,945px 1054px #fff,780px 131px #fff,605px 157px #fff,1586px 617px #fff,1120px 1794px #fff,1533px 751px #fff,1391px 1941px #fff,1920px 1852px #fff,1860px 1543px #fff,1621px 695px #fff,42px 1618px #fff,362px 428px #fff,1354px 688px #fff,1347px 228px #fff,1956px 1145px #fff,1160px 1979px #fff,124px 597px #fff,1491px 1234px #fff,1552px 876px #fff,1066px 1057px #fff,1420px 316px #fff,179px 590px #fff,435px 142px #fff,772px 861px #fff,878px 53px #fff,1172px 1627px #fff,1847px 580px #fff,1574px 1056px #fff,281px 1326px #fff,443px 1159px #fff,1768px 1225px #fff,1883px 1368px #fff,1957px 1304px #fff,1666px 1523px #fff,1607px 593px #fff,413px 549px #fff,878px 1579px #fff,1041px 766px #fff,638px 1178px #fff,1985px 534px #fff,537px 142px #fff,1376px 1133px #fff,990px 430px #fff,1062px 839px #fff,1658px 1871px #fff,20px 29px #fff,336px 219px #fff,1793px 323px #fff,1538px 176px #fff,558px 1227px #fff,1826px 1132px #fff,572px 1461px #fff,1900px 1647px #fff,1126px 1972px #fff,703px 358px #fff,1444px 1988px #fff,980px 721px #fff,240px 674px #fff,1731px 1607px #fff,49px 293px #fff,1392px 1831px #fff,101px 1661px #fff,1834px 1163px #fff,1709px 1336px #fff,88px 1546px #fff,1688px 1721px #fff,624px 1058px #fff,1347px 352px #fff,1262px 677px #fff,948px 1820px #fff,1222px 224px #fff,365px 633px #fff,747px 1162px #fff,527px 1874px #fff,1146px 1467px #fff,949px 1127px #fff,92px 1714px #fff,546px 657px #fff,172px 1489px #fff,587px 970px #fff,359px 1225px #fff,641px 1px #fff,1577px 926px #fff,608px 111px #fff,46px 1967px #fff,1339px 1895px #fff,723px 1320px #fff,329px 1730px #fff,1485px 247px #fff,824px 944px #fff,1441px 1462px #fff,1790px 193px #fff,909px 219px #fff,1161px 1469px #fff,1037px 501px #fff,1397px 999px #fff,1863px 1019px #fff,1956px 406px #fff,1424px 1301px #fff,1036px 676px #fff,1080px 1177px #fff,3px 696px #fff,488px 311px #fff,1907px 334px #fff,174px 1634px #fff,1975px 1271px #fff,947px 64px #fff,669px 767px #fff,721px 1159px #fff,1119px 902px #fff,1498px 2px #fff,372px 434px #fff,1658px 1144px #fff,178px 1549px #fff,1207px 1874px #fff,254px 393px #fff,1965px 1954px #fff,1688px 1283px #fff,359px 1700px #fff,1518px 394px #fff,77px 1612px #fff,216px 387px #fff,1435px 1841px #fff,1110px 1563px #fff,1828px 1710px #fff,527px 973px #fff,1471px 674px #fff,486px 851px #fff,926px 1590px #fff,1566px 1940px #fff,1638px 76px #fff,1369px 1201px #fff,1852px 1309px #fff,675px 1153px #fff,75px 1758px #fff,583px 1871px #fff,170px 655px #fff,710px 12px #fff,908px 1634px #fff,63px 1219px #fff,974px 1654px #fff,855px 1576px #fff,655px 1377px #fff,980px 1494px #fff,45px 100px #fff,1347px 969px #fff,212px 1349px #fff,676px 1443px #fff,1727px 738px #fff,1724px 513px #fff,295px 1126px #fff,582px 722px #fff,222px 291px #fff,1264px 731px #fff,1895px 1348px #fff,1234px 76px #fff,47px 1101px #fff,774px 1279px #fff,1251px 1960px #fff,1113px 1422px #fff,1025px 1581px #fff,1195px 953px #fff,1402px 1616px #fff,537px 92px #fff,832px 887px #fff,95px 1596px #fff,351px 270px #fff,1231px 1562px #fff,830px 364px #fff,664px 128px #fff,1792px 879px #fff,1847px 287px #fff,1140px 615px #fff,122px 69px #fff,1881px 1138px #fff,1221px 1144px #fff,338px 1372px #fff,1222px 1110px #fff,1245px 1334px #fff,775px 824px #fff,1829px 1036px #fff,966px 1438px #fff,1256px 1511px #fff,1313px 1398px #fff,1641px 1165px #fff,1112px 355px #fff,69px 1672px #fff,1251px 453px #fff,733px 244px #fff,665px 527px #fff,829px 975px #fff,332px 1765px #fff,1332px 1562px #fff,1445px 803px #fff,899px 1365px #fff,1791px 1417px #fff,1766px 1682px #fff,1995px 234px #fff,407px 660px #fff,97px 88px #fff,158px 1614px #fff,1474px 321px #fff,776px 889px #fff,199px 83px #fff,1999px 1201px #fff,1591px 1090px #fff,640px 404px #fff,92px 1325px #fff,1802px 1062px #fff,389px 1731px #fff,64px 1986px #fff,334px 25px #fff,682px 1235px #fff,19px 1285px #fff,761px 259px #fff,1129px 494px #fff,1272px 677px #fff,285px 1943px #fff,938px 1838px #fff,1942px 66px #fff,1921px 595px #fff,1767px 843px #fff,1018px 1857px #fff,1487px 904px #fff,1541px 338px #fff,842px 593px #fff,1643px 1017px #fff,463px 329px #fff,1903px 1984px #fff,105px 663px #fff,975px 116px #fff,274px 955px #fff,1421px 1158px #fff,784px 596px #fff,218px 796px #fff,763px 1015px #fff,494px 36px #fff,99px 1630px #fff,91px 21px #fff,929px 1894px #fff,670px 1560px #fff,1096px 1824px #fff,313px 1784px #fff,1512px 251px #fff,1020px 1738px #fff,714px 671px #fff,278px 1287px #fff,1251px 886px #fff,1852px 545px #fff,209px 1270px #fff,128px 1874px #fff,853px 1429px #fff,150px 1984px #fff,991px 709px #fff,417px 1871px #fff,1439px 1133px #fff,702px 1448px #fff,827px 1661px #fff,630px 103px #fff,589px 894px #fff,1178px 297px #fff,1202px 1982px #fff,1728px 679px #fff,1936px 1470px #fff,1161px 1711px #fff,1661px 1092px #fff,46px 1100px #fff,187px 388px #fff,636px 1445px #fff,171px 1213px #fff,1646px 1200px #fff,1182px 157px #fff,1217px 1015px #fff,1936px 807px #fff,1743px 890px #fff,1825px 27px #fff,545px 21px #fff,1895px 993px #fff,1631px 1180px #fff,1634px 411px #fff,1998px 886px #fff,1479px 906px #fff,528px 970px #fff,861px 1238px #fff,881px 361px #fff,960px 916px #fff,280px 950px #fff,1310px 986px #fff,768px 1796px #fff,1187px 980px #fff,612px 1279px #fff,377px 1876px #fff,1170px 736px #fff,1331px 733px #fff,450px 233px #fff,1875px 1317px #fff,1868px 1315px #fff,1874px 1018px #fff,1062px 1949px #fff,1266px 797px #fff,1087px 443px #fff,1984px 369px #fff,1209px 1726px #fff,1626px 501px #fff,1991px 986px #fff,1467px 356px #fff,1163px 964px #fff,1671px 1944px #fff,374px 1634px #fff,1556px 820px #fff,1800px 1600px #fff,1314px 1935px #fff,1174px 1293px #fff;
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
