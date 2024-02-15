import BoxContent from "src/components/BoxContent";
import TextContent from "src/components/TextContent";

const NoneCourseFound = () => {
  return (
    <BoxContent.BoxShadow
      style={{
        width: 1200,
        height: 300,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 0,
      }}
      shadow="type2"
    >
      <TextContent.NormalText
        type="title-content"
        content="Hiện tại chưa có khoá học nào"
      />
    </BoxContent.BoxShadow>
  );
};

export default NoneCourseFound;
