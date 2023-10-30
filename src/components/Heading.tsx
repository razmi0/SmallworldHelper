export const Heading = ({ name, victoryPtn }: { name: string; victoryPtn: number }) => {
  return (
    <span
      style={{
        fontWeight: "bold",
        fontSize: "30px",
      }}
    >
      {name} : {victoryPtn}
    </span>
  );
};

export default Heading;

//             -webkit-text-fill-color: transparent; -webkit-background-clip: text;
