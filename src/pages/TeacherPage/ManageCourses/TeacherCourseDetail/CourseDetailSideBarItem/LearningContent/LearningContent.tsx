import { Box, Button, Divider } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import chapterApi from "src/apis/chapterApi";
import BoxContent from "src/components/BoxContent";
import MediaContent from "src/components/MediaContent";
import TextContent from "src/components/TextContent";
import { isPending, isSuccess } from "src/reducers";
import Chapter, { IChapterUpload } from "../../Chapter";
import "./LearningContent.scss";

interface LearningContentProps {
  chapters: IChapterUpload[];
  isUpdateCompleted?: (status: boolean) => void;
}

const LearningContent: React.FC<LearningContentProps> = ({
  chapters,
  isUpdateCompleted,
}) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const nav = useNavigate();

  const handleUpdateChapter = (
    name: string,
    order: number,
    chapterId: string
  ) => {
    dispatch(isPending());
    isUpdateCompleted?.(false);
    chapterApi.updateChapter(chapterId, order, name).then(() => {
      dispatch(isSuccess());
      isUpdateCompleted?.(true);
      toast.success("Cập nhật thông tin Chapter thành công", {
        position: "bottom-right",
      });
    });
  };

  const handleDeleteChapter = (chapterId: string) => {
    dispatch(isPending());
    isUpdateCompleted?.(false);
    chapterApi.deleteChapter(chapterId).then(() => {
      dispatch(isSuccess());
      isUpdateCompleted?.(true);
      toast.success("Xóa Chapter thành công", {
        position: "bottom-right",
      });
    });
  };

  const handleAddChapter = (index: number) => {
    dispatch(isPending());
    isUpdateCompleted?.(false);
    chapterApi.addChapter(id, index, "default").then(() => {
      dispatch(isSuccess());
      isUpdateCompleted?.(true);
      toast.success("Thêm Chapter mới thành công", {
        position: "bottom-right",
      });
    });
  };

  return (
    <BoxContent.NormalContent>
      <BoxContent.NormalContent flexDirectionType="row" style={{ padding: 0 }}>
        <TextContent.NormalText
          type="title-header-large"
          content="Chương trình giảng dạy"
        />
        <Button
          variant="contained"
          color="warning"
          sx={{
            height: 45,
          }}
          onClick={() => nav(`/teacher/course/preview-course/${id}`)}
        >
          Xem trước khóa học
        </Button>
      </BoxContent.NormalContent>
      <Divider />
      <BoxContent.NormalContent style={{ padding: 0, gap: 10 }}>
        {chapters.map((chapter, index) => (
          <React.Fragment key={index}>
            <Box className="new">
              <MediaContent.Icon
                className="icon"
                icon="plus"
                color="black"
                size={20}
                onClick={() => handleAddChapter(index + 1)}
              />
            </Box>
            <Chapter
              chapter={chapter}
              index={index}
              handleUpdateChapter={handleUpdateChapter}
              handleDeleteChapter={handleDeleteChapter}
            />
          </React.Fragment>
        ))}
        <Box className="new">
          <MediaContent.Icon
            className="icon"
            icon="plus"
            color="black"
            size={20}
            onClick={() => handleAddChapter(chapters.length + 1)}
          />
        </Box>
      </BoxContent.NormalContent>
    </BoxContent.NormalContent>
  );
};
export default LearningContent;
