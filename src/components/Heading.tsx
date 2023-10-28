export const Heading = ({ name, victoryPtn }: { name: string; victoryPtn: number }) => {
  return (
    <span className="heading">
      <style>
        {`
        .heading {
            font-weight: bold;
            font-size: 30px;
            transform: translate(-30px);
        }
        .heading-img {
            height: 20px;
            width: 20px;
            margin-right: 10px;
        }
        `}
      </style>
      <img className="heading-img" src="/chevron-right.png" alt="title name icon " />
      {name} : {victoryPtn}
    </span>
  );
};

export default Heading;
