import React, { useEffect, useRef } from "react";
import ReactHlsPlayer from "react-hls-player/dist";
import { useSelector } from "react-redux";
import { Player } from "react-tuby";
import "react-tuby/css/main.css";
import myCourseApi from "src/apis/myCourseApi";
import { defaultIMG } from "src/assets";
import { selectAuthorization } from "src/reducers/authSlice";

interface VideoProps {
  currentTime?: number;
  duration?: any;
  courseId?: string;
  lessonId?: string;
  source?: any;
  poster?: string;
}

const Video: React.FC<VideoProps> = ({
  courseId,
  lessonId,
  currentTime,
  source,
  poster,
  duration,
}) => {
  const TIME = 1000;
  // console.log("currentTime", currentTime);
  const { isRole } = useSelector(selectAuthorization);

  const ref = useRef<any>(null);
  // const [timeline, setTimeline] = useState(0);

  // useEffect(() => {
  //   ref.current.currentTime = currentTime;
  // }, [currentTime]);

  useEffect(() => {
    if (!lessonId || !courseId || isRole !== "student") {
      return;
    }

    let timeline = 0;
    ref.current?.addEventListener("timeupdate", () => {
      timeline = ref.current?.currentTime;
    });
    const interval = setInterval(() => {
      const data = { lessonId, timeline };
      // console.log("đã lấy được time là", data);

      uploadTimeVideo(data);
    }, 5 * TIME);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId, courseId]);

  const uploadTimeVideo = async (data?: any) => {
    if (!courseId) return;
    // console.log("courseId", courseId);
    // console.log("đã lấy được time là", data);
    try {
      await myCourseApi.updateTimeLineVideoCourse(courseId, data);
      // console.log(response);
    } catch (error) {
      console.log("lỗi rồi");
    }
  };

  return (
    <Player
      src={source}
      // dimensions={{ width: "100%", height: "100%" }}
      subtitles={[
        {
          lang: "en",
          language: "English",
          url: "https://cdn.jsdelivr.net/gh/naptestdev/video-examples@master/en.vtt",
        },
        {
          lang: "fr",
          language: "French",
          url: "https://cdn.jsdelivr.net/gh/naptestdev/video-examples@master/fr.vtt",
        },
      ]}
      poster={poster || defaultIMG}
      playerRef={ref}
      keyboardShortcut={{
        pause: false,
        forward: false,
        rewind: false,
        fullScreen: false,
        mute: false,
        subtitle: false,
      }}
    >
      {(ref, props) => <ReactHlsPlayer playerRef={ref} {...props} />}
    </Player>
  );
};

export default Video;
